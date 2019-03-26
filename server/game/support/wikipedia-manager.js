let Wikipedia = require('wikijs').default

module.exports = class WikipediaManager {
  static async getLinks(title) {
    let page = await Wikipedia().find(title)
    return page.links()
  }
}
