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
    let terminateGame = this.terminateGame.bind(this)
    worker.on('message', function(message) {
      if (message === 'TERMINATE') {
        terminateGame(gameID)
      } else {
        WorkerMessage.handleMessage(message, sendMessageToUser)
      }
    })
    this.gameThreads[gameID] = worker
    console.log('New game created!')
  }
  generateGameID(gameUsers) {
    return gameUsers.map(user => user.id).sort().join('#')
  }
  sendMessageToUser(userID, messageName, messageData) {
    this.io.to(userID).emit(messageName, messageData)
  }
  selectArticleForUser(userID, article) {
    let gameID = this.userGameMap[userID]
    if (gameID) {
      this.gameThreads[gameID].postMessage(new WorkerMessage(userID, 'selectArticle', article))
    }
  }
  disconnectUser(userID) {
    let gameID = this.userGameMap[userID]
    if (gameID) {
      let otherUserID = JSON.parse(JSON.stringify(gameID)).replace(userID, '').replace('#', '')
      this.sendMessageToUser(otherUserID, 'gameWon', {
        disconnect: true
      })
      this.terminateGame(gameID)
    }
  }
  terminateGame(gameID) {
    gameID.split('#').forEach(function(userID) {
      delete this.userGameMap[userID]
    }, this)
    this.gameThreads[gameID].terminate()
    delete this.gameThreads[gameID]
  }
}