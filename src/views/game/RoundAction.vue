<template>
    <div class="flex-column">
        <div>
            <countdown v-bind:end="actionInfo.end"></countdown>
            <br>
            <div class="container container-mw-lg">
                <article-search v-on:search="searchString = $event"></article-search>
            </div>
            <br>
        </div>
        <div class="container container-mw-lg f-1">
            <article-list v-bind:selectedArticle="selectedArticle" v-bind:articles="filteredArticles" v-on:select="selectArticle($event)"></article-list>
        </div>
        <selected-article v-bind:selectedArticle="selectedArticle"></selected-article>
    </div>
</template>

<script>
import {ArticleList, ArticleSearch, Countdown, SelectedArticle} from './RoundAction/index.js'

export default {
  name: 'RoundAction',
  components: {ArticleList, ArticleSearch, Countdown, SelectedArticle},
  props: {
    actionInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    filteredArticles() {
      return this.actionInfo.articles.filter(article => {
        return article.toUpperCase().includes(this.searchString.toUpperCase())
      })
    }
  },
  data: function() {
    return {
      selectedArticle: this.actionInfo.selectedArticle,
      searchString: ''
    }
  },
  methods: {
    selectArticle(article) {
      this.$socket.emit('selectArticle', article)
      this.selectedArticle = article
    }
  }
}
</script>
