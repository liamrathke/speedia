let WorkerMessage = require('./worker-message')

module.exports = class PortHelper {
  constructor(port, gameUserIDs) {
    this.port = port
    if (gameUserIDs) {
      WorkerMessage.prototype.gameUserIDs = JSON.parse(JSON.stringify(gameUserIDs))
    }
  }
  sendToPort(target, name, data) {
    this.port.postMessage(new WorkerMessage(target, name, data).convert())
  }
  terminateThread() {
    this.port.postMessage('TERMINATE')
  }
}