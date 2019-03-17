let WorkerMessage = require('./worker-message')

module.exports = class ThreadHelper {
  constructor(parentPort, gameUserIDs) {
    this.parentPort = parentPort
    WorkerMessage.prototype.gameUserIDs = JSON.parse(JSON.stringify(gameUserIDs))
  }
  sendToParent(target, name, data) {
    this.parentPort.postMessage(new WorkerMessage(target, name, data).convert())
  }
}