<template>
    <div class="container container-mw-lg">
        <div v-for="(article, articleIndex) in articles" v-bind:key="article">
            <article-button v-bind:articleTitle="article" v-bind:selected="false"></article-button>
        </div>
    </div>
</template>

<script>
import ArticleButton from './ArticleList/ArticleButton.vue'

export default {
  name: 'ArticleList',
  components: {
    ArticleButton
  },
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
