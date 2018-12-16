export default class GameUser {
  constructor(gameUser) {
    this = {
      id: gameUser.id,
      name: gameUser.name,
      path: []
    }
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