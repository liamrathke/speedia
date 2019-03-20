module.exports = class WorkerMessage {
  constructor(target, name, data) {
    this.target = target
    this.name = name
    this.data = data
  }
  convert() {
    return {
      target: this.target,
      name: this.name,
      data: this.data,
      gameUserIDs: this.gameUserIDs || []
    }
  }
  static handleMessage(message, callback) {
    switch (message.target) {
      case 'all': {
        message.gameUserIDs.forEach(userID => {
          callback(userID, message.name, message.data)
        })
        break
      }
      default: {
        callback(message.target, message.name, message.data)
      }
    }
  }
}
