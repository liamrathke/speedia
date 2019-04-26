let {parentPort, workerData} = require('worker_threads')

let GameUser = require('../classes/game-user')
let GameInstance = require('../classes/game-instance')
let PortHelper = require('./port-helper')

// Re-initialize the users as GameUsers, because the class is lost when data is passed between threads
let gameUsers = workerData.gameUsers.map(user => new GameUser(user))

let gameInstance = new GameInstance(workerData.gameID, gameUsers)
let portHelper = new PortHelper(parentPort, gameInstance.getGameUserIDs())

parentPort.on('message', message => {
  switch (message.name) {
    case 'selectArticle': {
      gameInstance.selectArticle(message.target, message.data)
      console.log('Article Selected!', message.target, message.data)
      break
    }
  }
})

// Run the game asynchronously to add delays
async function runGame() {
  await showFoundGame(2000)
  // if (true) {
  while (!gameInstance.isGameDone()) {
    await showNextRound(5000)
    await showRoundAction(10000)
  }
}

function showFoundGame(ms) {
  return new Promise(resolve => {
    portHelper.sendToPort('all', 'foundGame', gameInstance.getGameInfo())
    setTimeout(() => {resolve()}, ms)
  })
}

async function showNextRound(ms) {
  let initialTime = Date.now()
  portHelper.sendToPort('all', 'nextRound', gameInstance.getRoundInfo())
  await gameInstance.updateNextArticles()
  let delayLeft = ms - (Date.now() - initialTime)
  delayLeft = (delayLeft < 0) ? 0 : delayLeft
  console.log(`${delayLeft} ms left to wait after updating articles`)
  return new Promise(resolve => {
    setTimeout(() => {
      gameInstance.setupNextRound()
      resolve()
    }, delayLeft)
  })
}

function showRoundAction(ms) {
  gameInstance.getGameUserIDs().forEach(userID => {
    portHelper.sendToPort(userID, 'roundAction', gameInstance.getActionInfo(userID))
  })
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function showGameWon() {
  let gameWinnerInfo = gameInstance.getGameWinner()
  if (gameWinnerInfo) {
    console.log('Game done, sending winning information!')
    portHelper.sendToPort('all', 'gameWinner', gameWinnerInfo)
  }
}

runGame()
