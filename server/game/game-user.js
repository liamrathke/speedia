let CategoryInfo = require('./category-info')

module.exports = class GameUser {
  constructor(gameUser) {
    this.id = gameUser.id
    this.name = gameUser.name
    this.gameID = false
    this.path = []
    if (['History', 'News', 'Geography', 'Science', 'Culture'].indexOf(gameUser.selectedCategory) > -1) {
      this.category = gameUser.selectedCategory
    } else if (gameUser.category) {
      this.category = gameUser.category
    } else {
      this.category = 'GrabBag'
    }
    this.categoryInfo = CategoryInfo[this.category]
  }
  getInfo() {
    return {
      id: this.id,
      name: this.name
    }
  }
  getCategory() {
    return this.category
  }
  getCategoryInfo() {
    return this.categoryInfo
  }
  updatePath(index, article) {
    this.path.splice(index, 1, article)
    return this.path
  }
}