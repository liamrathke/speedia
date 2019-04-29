let ArticleSelector = require('../support/article-selector')
let WikipediaManager = require('../support/wikipedia-manager')

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
    this.applyToEachUser(user => {
      user.updatePath(this.currentRound, this.startEnd[0].article)
    })
  }
  isGameDone() {
    let done = false
    let finalArticle = this.startEnd[1].article
    this.applyToEachUser(user => {
      if (user.getLastArticle().toUpperCase() === finalArticle.toUpperCase()) {
        done = true
      }
    })
    return done
  }
  getGameWinner() {
    if (this.isGameDone()) {
      let winnerIDs = []
      this.applyToEachUser(user => {
        if (user.getLastArticle().toUpperCase() === this.startEnd[1].article.toUpperCase()) {
          winnerIDs.push(user.getInfo().id)
        }
      })
      if (winnerIDs.length === 1) {
        return {
          tie: false,
          disconnect: false,
          name: this.gameUsers[winnerIDs[0]].getInfo().name,
          path: this.gameUsers[winnerIDs[0]].getPath()
        }
      } else if (winnerIDs.length === 2) {
        return {
          tie: true,
          disconnect: false
        }
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }
  getGameUserIDs() {
    return Object.keys(this.gameUsers)
  }
  applyToEachUser(callback) {
    this.getGameUserIDs().forEach(userID => {
      callback(this.gameUsers[userID])
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
  getLatestArticles() {
    let gameUsers = this.gameUsers
    return this.getGameUserIDs().map(userID => {
      return gameUsers[userID].getLastArticle()
    })
  }
  getActionInfo(userID) {
    return {
      end: this.startEnd[1].article,
      articles: this.gameUsers[userID].getNextArticles(),
      selectedArticle: this.gameUsers[userID].getLastArticle()
    }
  }
  setupNextRound() {
    this.currentRound++
    this.applyToEachUser(user => {
      user.startNextRound()
    })
  }
  async updateNextArticles() {
    let articleTitles = this.getLatestArticles()
    let linkLists = await Promise.all(articleTitles.map(function(title) {
      return WikipediaManager.getLinks(title)
    }))
    linkLists.forEach(function(linkList, linkIndex) {
      this.gameUsers[this.getGameUserIDs()[linkIndex]].setNextArticles(linkList)
    }, this)
  }
  selectArticle(userID, article) {
    this.gameUsers[userID].updatePath(this.getCurrentRound(), article)
  }
  getCurrentRound() {
    return this.currentRound
  }
  wait(ms) {
    return new Promise(done => setTimeout(done, ms))
  }
}