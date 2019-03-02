let {parentPort, workerData} = require('worker_threads')

let GameUser = require('./game-user')
let GameInstance = require('./game-instance')

// Re-initialize the users as GameUsers, because the class is lost when data is passed between threads
let gameUsers = workerData.gameUsers.map(user => new GameUser(user))

let gameInstance = new GameInstance(workerData.gameID, gameUsers)
console.log(gameInstance.currentRound)
