let express = require('express')
let app = express()
let {join} = require('path')
let server = require('http').createServer(app)
let io = require('socket.io')(server, {
  pingTimeout: 60000
})

let QueueHelper = require('./helpers/queue-helper')
let GameHelper = require('./helpers/game-helper')

server.listen(8079)

let queueHelper = new QueueHelper()

let gamePath = join(__dirname, './game/threading/game-thread.js')
let gameHelper = new GameHelper(gamePath, io)

io.on('connection', socket => {
  console.log(`User ${socket.id} has connected`)
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} has disconnected`)
    queueHelper.removeUserFromQueue(socket.id)
    gameHelper.disconnectUser(socket.id)
  })
  socket.on('enterQueue', userQueueParameters => {
    userQueueParameters.id = socket.id
    console.log(`Adding user ${socket.id} to queue`)
    let userCategory = queueHelper.addUserToQueue(userQueueParameters)
    io.to(socket.id).emit('enteredQueue', {category: userCategory})
    if (queueHelper.canCreateNewGame()) {
      gameHelper.createNewGame(queueHelper.pickNewGameUsers())
    }
  })
  socket.on('exitQueue', () => {
    console.log(`Removing user ${socket.id} from queue`)
    queueHelper.removeUserFromQueue(socket.id)
    io.to(socket.id).emit('exitedQueue', true)
  })
  socket.on('selectArticle', article => {
    gameHelper.selectArticleForUser(socket.id, article)
  })
})
