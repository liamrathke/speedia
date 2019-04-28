<template>
    <div>
        <countdown end="TEST"></countdown>
        <div class="container container-mw-lg">
            <article-search v-on:search="searchString = $event"></article-search>
            <br>
            <article-list v-bind:selectedArticle="selectedArticle" v-bind:articles="filteredArticles" v-on:select="selectArticle($event)"></article-list>
        </div>
    </div>
</template>

<script>
import {ArticleList, ArticleSearch, Countdown} from './RoundAction/index.js'

export default {
  name: 'RoundAction',
  components: {ArticleList, ArticleSearch, Countdown},
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
