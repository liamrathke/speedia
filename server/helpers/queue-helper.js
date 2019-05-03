let GameUser = require('../game/classes/game-user')

module.exports = class QueueHelper {
  constructor() {
    this.queueObject = []
  }
  getQueueLength() {
    return this.queueObject.length
  }
  addUserToQueue(userParameters, callback) {
    let user = new GameUser(userParameters)
    this.queueObject.push(user)
    this.queueHandler(callback)
    return user.getCategory()
  }
  removeUserFromQueue(userID) {
    this.queueObject = this.queueObject.filter(user => {
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