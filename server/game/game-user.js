module.exports = class GameUser {
  constructor(gameUser) {
    this.id = gameUser.id
    this.name = gameUser.name
    this.path = []
    if (['History', 'News', 'Geography', 'Science', 'Culture'].indexOf(gameUser.selectedCategory) > -1) {
      this.category = gameUser.selectedCategory
    } else {
      this.category = 'GrabBag'
    }
  }
  getCategory() {
    return this.category
  }
  updatePath(index, article) {
    this.path.splice(index, 1, article)
    return this.path
  }
}