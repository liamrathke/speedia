console.log('Starting backend server...')

let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)

let {Worker} = require('worker_threads')
let {join} = require('path')

let gameThreads = {}

let QueueInstance = require('./queue/queue-instance')

server.listen(8079)

let queueInstance = new QueueInstance()

io.on('connection', socket => {
  console.log(`User ${socket.id} has connected`)
  socket.on('disconnect', () => {
    queueInstance.removeUserFromQueue(socket.id)
    console.log(`User ${socket.id} has disconnected`)
  })
  socket.on('enterQueue', userQueueParameters => {
    userQueueParameters.id = socket.id
    let userCategoryInfo = queueInstance.addUserToQueue(userQueueParameters, createNewGame)
    io.to(socket.id).emit('enteredQueue', userCategoryInfo)
    console.log(`Added user ${socket.id} to queue`)
  })
  socket.on('exitQueue', () => {
    queueInstance.removeUserFromQueue(socket.id)
    io.to(socket.id).emit('exitedQueue', true)
    console.log(`Removed user ${socket.id} from queue`)
    console.log(`Current queue length: ${queueInstance.getQueueLength()}`)
  })
})

function generateGameID(gameUsers) {
  return gameUsers.map(user => user.id).sort().join('')
}

function createNewGame(newGameUsers) {
  console.log('Creating new game')
  let gameID = generateGameID(newGameUsers)
  let gameThreadFile = join(__dirname, './game/game-thread.js')
  let worker = new Worker(gameThreadFile, {
    workerData: {
      gameID: gameID,
      gameUsers: newGameUsers
    }
  })
  worker.on('message', message => {
    workerMessageHandler(message)
  })
  gameThreads[gameID] = worker
  console.log('New game created!')
}

function workerMessageHandler(message) {
  switch (message.target) {
    case 'all': {
      message.gameUserIDs.forEach(userID => {
        io.to(userID).emit(message.name, message.data)
      })
      console.log('Sending message to all users')
      break
    }
    case 'individuals': {
      console.log('Sending message to each user individually')
      break
    }
    default: {
      console.log('Keeping message internal')
    }
  }
}
