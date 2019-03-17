let CategoryInfo = require('./category-info')

module.exports = class GameUser {
  constructor(gameUser) {
    this.id = gameUser.id
    this.name = gameUser.name
    this.gameID = false
    this.path = []
    this.nextArticles = []
    if (Object.keys(CategoryInfo).indexOf(gameUser.selectedCategory) > -1) {
      this.category = gameUser.selectedCategory
    } else if (gameUser.category) {
      this.category = gameUser.category
    } else {
      this.category = 'GrabBag'
    }
  }
  getInfo() {
    return {
      id: this.id,
      name: this.name
    }
  }
  getExposableInfo() {
    return {
      name: this.name,
      category: this.getCategory(),
      lastArticle: this.getLastArticle()
    }
  }
  getCategory() {
    return this.category
  }
  getLastArticle() {
    return this.path[this.path.length - 1]
  }
  updateNextArticles() {
    // Cache the available articles for the user to pick
  }
  getNextArticles() {
    // Return the cache for the next available articles
  }
  updatePath(index, article) {
    this.path.splice(index, 1, article)
    return this.path
  }
}