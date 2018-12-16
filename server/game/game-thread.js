let {parentPort, workerData} = require('worker_threads')

console.log(workerData)

// import GameInstance from './game/game-instance'

// let gameInstance = new GameInstance(workerData.gameID, workerData.gameUsers)
