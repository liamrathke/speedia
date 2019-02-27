let GameUser = require('./game-user')
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
    Object.keys(this.gameUsers).forEach(userID => {
      this.gameUsers[userID].updatePath(this.currentRound, this.startEnd[0].article)
    })
  }
  getMatchData() {
    
  }
  getCurrentRound() {
    return this.currentRound
  }
}