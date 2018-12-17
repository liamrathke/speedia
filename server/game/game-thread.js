let {parentPort, workerData} = require('worker_threads')

console.log(workerData)

let GameInstance = require('./game-instance')

let gameInstance = new GameInstance(workerData.gameID, workerData.gameUsers)
console.log(gameInstance.currentRound)
