import * as Articles from '../articles'

export default class ArticleSelector {
  getRandomArticle(category) {
    let categoryArticles = Articles[category]
    return categoryArticles[Math.floor(Math.random() * categoryArticles.length)]
  }
}