let ArticleSelector = require('./article-selector')
let WikipediaManager = require('./wikipedia-manager')

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
      if (user.getLastArticle() === finalArticle) {
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
  getActionInfo(userID) {
     // Return the data for each user that will be displayed in the action screen
  }
  setupNextRound() {
    this.currentRound++
    this.applyToEachUser(user => {
      user.startNextRound()
    })
  }
  async updateNextArticles() {
    let initialTime = Date.now()
    let latestTitles = this.getGameUserIDs().map(userID => this.gameUsers[userID].getLastArticle())
    let pages = await Promise.all(latestTitles.map(title => WikipediaManager.getPage(title)))
    console.log(`Pages collected in ${Date.now() - initialTime} ms`)
    let links = await Promise.all(pages.map(page => page.links()))
    console.log(`Links collected in ${Date.now() - initialTime} ms`)
    links.forEach(function(link, linkIndex) {
      this.gameUsers[this.getGameUserIDs()[linkIndex]].setNextArticles(links)
    })
  }
  getCurrentRound() {
    return this.currentRound
  }
  wait(ms) {
    return new Promise(done => setTimeout(done, ms))
  }
}