console.log('Starting backend server...')

let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)

let {Worker} = require('worker_threads')
let join = require('path').join

let queue = []
let gameThreads = {}

let GameUser = require('./game/game-user')

server.listen(8079)

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`)
  })
  socket.on('enterQueue', queueParameters => {
    if (queueParameters.name && queueParameters.selectedCategory) {
      console.log(`User ${socket.id} has entered the queue as ${queueParameters.name}`)
      queueParameters.id = socket.id
      let user = new GameUser(queueParameters)
      queue.push(user)
      io.to(socket.id).emit('enteredQueue', user.getCategoryInfo())
      queueHandler()
    } else {
      console.log(`User ${socket.id} has failed to enter the queue`)
      io.to(socket.id).emit('enteredQueue', false)
    }
  })
  socket.on('exitQueue', () => {
    queue = queue.filter(user => {
      return user.id === socket.id
    })
    console.log(`User ${socket.id} has been removed from the queue`)
    io.to(socket.id).emit('exitedQueue', true)
  })
})

function generateGameID(gameUsers) {
  return gameUsers.map(user => user.id).sort().join('')
}

function queueHandler() {
  if (queue.length > 1) {
    let newGameUsers = queue.splice(0, 2)
    createNewGame(newGameUsers)
  }
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
  worker.on('message')
  gameThreads[gameID] = worker
  console.log('New game created!')
}
