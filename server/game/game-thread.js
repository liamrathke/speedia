let {parentPort, workerData} = require('worker_threads')

let WorkerMessage = require('./worker-message')

let GameUser = require('./game-user')
let GameInstance = require('./game-instance')
let ThreadHelper = require('./thread-helper')

// Re-initialize the users as GameUsers, because the class is lost when data is passed between threads
let gameUsers = workerData.gameUsers.map(user => new GameUser(user))

let gameInstance = new GameInstance(workerData.gameID, gameUsers)
let threadHelper = new ThreadHelper(parentPort, gameInstance.getGameUserIDs())

// Run the game asynchronously to add delays
async function runGame() {
  threadHelper.sendToParent('all', 'foundGame', gameInstance.getGameInfo())
  await gameInstance.wait(5000)
  if (true) {
  // while (!gameInstance.isGameDone()) {
    threadHelper.sendToParent('all', 'nextRound', gameInstance.getRoundInfo())
    await gameInstance.wait(5000)
    threadHelper.sendToParent('all', 'roundAction', gameInstance.getRoundInfo())
    await gameInstance.wait(10000)
  }
}

runGame()
