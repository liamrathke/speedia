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
}
