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
        category: user.getCategoryInfo(), 
        article: articleSelector.getRandomArticle(user.getCategory())
      })
    })
    while (this.startEnd[0].article === this.startEnd[1].article) {
      this.startEnd[1].article = articleSelector.getRandomArticle(this.startEnd[1].category)
    }
    Object.keys(this.gameUsers).forEach(userID => {
      this.gameUsers[userID].updatePath(this.currentRound, this.startEnd[0].article)
    })
  }
  getGameUserIDs() {
    return Object.keys(this.gameUsers)
  }
  getMatchInfo() {
    return {
      exposedGameUsers: this.getGameUserIDs().map(userID => this.gameUsers[userID].getExposableInfo()),
      startEnd: this.startEnd
    }
  }
  getCurrentRound() {
    return this.currentRound
  }
}