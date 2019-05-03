let {Worker} = require('worker_threads')

let WorkerMessage = require('../game/threading/worker-message')

module.exports = class GameHelper {
  constructor(gamePath, io) {
    this.gamePath = gamePath
    this.io = io
    this.gameThreads = {}
    this.userGameMap = {}
  }
  createNewGame(gameUsers) {
    console.log('Creating new game')
    let gameID = this.generateGameID(gameUsers)
    gameUsers.forEach(user => {this.userGameMap[user.id] = gameID})
    let worker = new Worker(this.gamePath, {workerData: {gameID, gameUsers}})
    let sendMessageToUser = this.sendMessageToUser.bind(this)
    worker.on('message', function(message) {
      if (message === 'TERMINATE') {
        worker.terminate()
      } else {
        console.log(typeof sendMessageToUser)
        WorkerMessage.handleMessage(message, sendMessageToUser)
      }
    })
    this.gameThreads[gameID] = worker
    console.log('New game created!')
  }
  generateGameID(gameUsers) {
    return gameUsers.map(user => user.id).sort().join('')
  }
  sendMessageToUser(userID, messageName, messageData) {
    this.io.to(userID).emit(messageName, messageData)
  }
  selectArticleForUser(userID, article) {
    let gameID = this.userGameMap[userID]
    this.gameThreads[gameID].postMessage(new WorkerMessage(userID, 'selectArticle', article))
  }
  leaveGame(userID) {
    // Handles a user disconection, terminates game
  }
}