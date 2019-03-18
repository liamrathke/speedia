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
  await showFoundGame(2000)
  if (true) {
  // while (!gameInstance.isGameDone()) {
    await showNextRound(5000)
    threadHelper.sendToParent('all', 'roundAction', gameInstance.getRoundInfo())
    await gameInstance.wait(10000)
  }
}

function showFoundGame(ms) {
  return new Promise(resolve => {
    threadHelper.sendToParent('all', 'foundGame', gameInstance.getGameInfo())
    setTimeout(() => {resolve()}, ms)
  })
}

function showNextRound(ms) {
  let initialTime = Date.now()
  threadHelper.sendToParent('all', 'nextRound', gameInstance.getRoundInfo())
  gameInstance.updateNextArticles()
  let delayLeft = ms - (Date.now() - initialTime)
  console.log(`${delayLeft} ms left after updating articles`)
  return new Promise(resolve => {
    setTimeout(() => {
      gameInstance.setupNextRound()
      resolve()
    }, delayLeft)
  })
}

async function showRoundAction(time) {

}

runGame()
