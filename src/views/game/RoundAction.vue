<template>
    <div>
        <countdown end="TEST"></countdown>
        <article-search searchString="TEST"></article-search>
        <article-list v-bind:selectedArticle="selectedArticle" v-bind:articles="actionInfo.articles" v-on:select="selectArticle($event)"></article-list>
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
  data: function() {
    return {
      selectedArticle: this.actionInfo.selectedArticle
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
