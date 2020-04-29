let Wikipedia = require('wikijs').default

let headers = { 'User-Agent': 'Speedia (https://github.com/liamrathke/speedia; larathke@wpi.edu) wiki.js' }

module.exports = class WikipediaManager {
  static async getLinks(title) {
    let page = await Wikipedia({headers}).find(title)
    return page.links()
  }
}
