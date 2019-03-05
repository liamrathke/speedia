let GameUser = require('../game/game-user')

module.exports = class GameQueue {
  constructor() {
    this.queueObject = []
  }
  getQueueLength() {
    return this.queueObject.length
  }
  addUserToQueue(userQueueParameters, callback) {
    if (userQueueParameters.name && userQueueParameters.id && userQueueParameters.selectedCategory) {
      let user = new GameUser(userQueueParameters)
      this.queueObject.push(user)
      this.queueHandler(callback)
      return user.getCategoryInfo()
    } else {
      return false
    }
  }
  removeUserFromQueue(userID) {
    this.queueObject = this.queueObject.filter(user => {
      console.log(user.getInfo().id, userID, user.getInfo().id === userID)
      return user.getInfo().id !== userID
    })
  }
  queueHandler(callback) {
    if (this.queueObject.length > 1) {
      let newGameUsers = this.queueObject.splice(0, 2)
      callback(newGameUsers)
    }
  }
}