let {parentPort, workerData} = require('worker_threads')

let GameInstance = require('./game-instance')

let gameInstance = new GameInstance(workerData.gameID, workerData.gameUsers)
console.log(gameInstance.currentRound)
