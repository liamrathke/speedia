module.exports = class Game {
  constructor(gameID, gameUsers) {
    gameUsers.splice(2)
    this = {
      gameID: gameID,
      gameUsers: gameUsers,
      currentRound: 0
    }
  }
}