let {Worker} = require('worker_threads')
let {join} = require('path')

let WorkerMessage = require('../game/threading/worker-message')

module.exports = class GameHelper {
  constructor() {
    this.gameWorkers = {}
    this.userGameMap = {}
  }
  createNewGame() {
    // Creates a new game
  }
  generateGameID(userIDs) {
    // Generates a predictable game ID
  }
  sendMessageToUser(userID, messageName, messageData) {
    // Sends a message to a user currently in a game
  }
  selectArticleForUser(userID, article) {
    // Selects an article for a user, provided their ID
  }
  leaveGame(userID) {
    // Handles a user disconection, terminates game
  }
}