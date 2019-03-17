let {parentPort, workerData} = require('worker_threads')

let WorkerMessage = require('./worker-message')

let GameUser = require('./game-user')
let GameInstance = require('./game-instance')

// Re-initialize the users as GameUsers, because the class is lost when data is passed between threads
let gameUsers = workerData.gameUsers.map(user => new GameUser(user))

let gameInstance = new GameInstance(workerData.gameID, gameUsers)
WorkerMessage.prototype.gameUserIDs = JSON.parse(JSON.stringify(gameInstance.getGameUserIDs()))

// Run the game asynchronously to add delays
async function runGame() {
  parentPort.postMessage(new WorkerMessage('all', 'foundGame', gameInstance.getGameInfo()).convert())
  await gameInstance.wait(5000)
  if (true) {
  // while (!gameInstance.isGameDone()) {
    parentPort.postMessage(new WorkerMessage('all', 'nextRound', gameInstance.getRoundInfo()).convert())
    await gameInstance.wait(10000)
  }
}

runGame()
