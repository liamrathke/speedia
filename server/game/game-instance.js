let ArticleSelector = require('./article-selector')

let articleSelector = new ArticleSelector()

module.exports =  class GameInstance {
  constructor(gameID, gameUsers) {
    this.gameID = gameID
    this.gameUsers = {}
    this.currentRound = 0
    this.startEnd = []
    gameUsers.forEach(user => {
      this.gameUsers[user.getInfo().id.toString()] = user
      this.startEnd.push({
        category: user.getCategory(), 
        article: articleSelector.getRandomArticle(user.getCategory())
      })
    })
    while (this.startEnd[0].article === this.startEnd[1].article) {
      this.startEnd[1].article = articleSelector.getRandomArticle(this.startEnd[1].category)
    }
    this.applyToEachUser(userID => {
      this.gameUsers[userID].updatePath(this.currentRound, this.startEnd[0].article)
    })
  }
  isGameDone() {
    let done = false
    let finalArticle = this.startEnd[1].article
    this.applyToEachUser(userID => {
      if (this.gameUsers[userID].getLastArticle() === finalArticle) {
        done = true
      }
    })
    return done
  }
  getGameUserIDs() {
    return Object.keys(this.gameUsers)
  }
  applyToEachUser(callback) {
    this.getGameUserIDs().forEach(userID => {
      callback(userID)
    })
  }
  getExposedGameUsers() {
    return this.getGameUserIDs().map(userID => this.gameUsers[userID].getExposableInfo())
  }
  getGameInfo() {
    return {
      exposedGameUsers: this.getExposedGameUsers(),
      startEnd: this.startEnd
    }
  }
  getRoundInfo() {
    return {
      exposedGameUsers: this.getExposedGameUsers(),
      currentRound: this.getCurrentRound(),
      end: this.startEnd[1].article,
    }
  }
  getActionInfo(userID) {
     // Return the data for each user that will be displayed in the action screen
  }
  getCurrentRound() {
    return this.currentRound
  }
  wait(ms) {
    return new Promise(done => setTimeout(done, ms))
  }
}