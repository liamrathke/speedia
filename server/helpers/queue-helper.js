let GameUser = require('../game/classes/game-user')

module.exports = class QueueHelper {
  constructor() {
    this.queueObject = []
  }
  getQueueLength() {
    return this.queueObject.length
  }
  addUserToQueue(userParameters) {
    let user = new GameUser(userParameters)
    this.queueObject.push(user)
    return user.getCategory()
  }
  removeUserFromQueue(userID) {
    this.queueObject = this.queueObject.filter(user => {
      return user.getInfo().id !== userID
    })
  }
  canCreateNewGame() {
    return (this.queueObject.length >= 2)
  }
  pickNewGameUsers() {
    if (this.canCreateNewGame()) {
      return this.queueObject.splice(0, 2)
    } else {
      return false
    }
  }
}