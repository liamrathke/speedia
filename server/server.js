console.log('Starting backend server...')

let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server, {
  pingTimeout: 60000
})

let {Worker} = require('worker_threads')
let {join} = require('path')

let gameThreads = {}
let userGameMap = {}

let QueueHelper = require('./helpers/queue-helper')


let WorkerMessage = require('./game/threading/worker-message')

server.listen(8079)

let queueHelper = new QueueHelper()

io.on('connection', socket => {
  console.log(`User ${socket.id} has connected`)
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} has disconnected`)
    queueHelper.removeUserFromQueue(socket.id)
    // If the user is in a game, end it
  })
  socket.on('enterQueue', userQueueParameters => {
    userQueueParameters.id = socket.id
    console.log(`Adding user ${socket.id} to queue`)
    let userCategory = queueHelper.addUserToQueue(userQueueParameters, createNewGame)
    io.to(socket.id).emit('enteredQueue', {category: userCategory})
  })
  socket.on('exitQueue', () => {
    console.log(`Removing user ${socket.id} from queue`)
    queueHelper.removeUserFromQueue(socket.id)
    io.to(socket.id).emit('exitedQueue', true)
  })
  socket.on('selectArticle', article => {
    let gameID = userGameMap[socket.id]
    gameThreads[gameID].postMessage(new WorkerMessage(socket.id, 'selectArticle', article))
  })
})

function sendMessageToUser(userID, messageName, messageData) {
  io.to(userID).emit(messageName, messageData)
}

function generateGameID(gameUsers) {
  return gameUsers.map(user => user.id).sort().join('')
}

function createNewGame(newGameUsers) {
  console.log('Creating new game')
  let gameID = generateGameID(newGameUsers)
  newGameUsers.map(user => user.id).forEach(userID => {
    userGameMap[userID] = gameID
  })
  let gameThreadFile = join(__dirname, './game/threading/game-thread.js')
  let worker = new Worker(gameThreadFile, {
    workerData: {
      gameID: gameID,
      gameUsers: newGameUsers
    }
  })
  worker.on('message', message => {
    if (message === 'TERMINATE') {
      console.log('Game finished, terminating thread')
      worker.terminate()
    } else {
      WorkerMessage.handleMessage(message, sendMessageToUser)
    }
  })
  gameThreads[gameID] = worker
  console.log('New game created!')
}
