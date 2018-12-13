console.log('Starting backend server...')

let express = require('express')
let app = express()
let server = require('http').createServer(app)
let io = require('socket.io')(server)

let queue = []
let games = {}

server.listen(8079)

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`)
  })
  socket.on('enterQueue', queueParameters => {
    console.log(queueParameters)
    if (queueParameters.name && queueParameters.selectedCategory) {
      console.log(`User ${socket.id} has entered the queue as ${queueParameters.name}`)
      queueParameters.id = socket.id
      queue.push(queueParameters)
      io.to(socket.id).emit('enteredQueue', true)
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

function queueHandler() {
  if (queue.length > 2) {
    let newGameUsers = queue.splice(0, 2).map(user => user.id)
    createNewGame(newGameUsers)
  }
}

function createNewGame(newGameUsers) {
  let gameID = generateGameID(newGameUsers)
  // games follow
}

function generateGameID(gameUsers) {
  return gameUsers.sort().join('')
}
