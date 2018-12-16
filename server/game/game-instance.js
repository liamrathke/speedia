import GameUser from './game-user'
import ArticleSelector from './article-selector'

let articleSelector = new ArticleSelector()

export default class GameInstance {
  constructor(gameID, gameUsers) {
    this = {
      gameID: gameID,
      gameUsers: {},
      currentRound: 0,
      startEnd: []
    }
    gameUsers.forEach(user => {
      let newUser = new GameUser(user)
      this.gameUsers[user.id.toString()] = newUser
      this.startEnd.push({
        category: newUser.getCategory(), 
        article: articleSelector.getRandomArticle(newUser.getCategory())
      })
    })
    while (this.startEnd[0].article === this.startEnd[1].article) {
      this.startEnd[1].article = articleSelector.getRandomArticle(this.startEnd[1].category)
    }
    Object.keys(this.gameUsers).forEach(userID => {
      this.gameUsers[userID].updatePath(currentRound, this.startEnd[0].article)
    })
  }
}