let Articles = require('../articles/index')

module.exports = class ArticleSelector {
  getRandomArticle(category) {
    let categoryArticles = Articles[category]
    return categoryArticles[Math.floor(Math.random() * categoryArticles.length)]
  }
}