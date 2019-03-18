let Wikipedia = require('wikijs')

module.exports = class WikipediaManager {
  static getPage(title) {
    console.log(`Requesting page for ${title}`)
    return Wikipedia.page(title)
  }
}
