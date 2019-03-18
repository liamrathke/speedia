let Wikipedia = require('wikijs').default

module.exports = class WikipediaManager {
  static getPage(title) {
    return Wikipedia().find(title)
  }
}
