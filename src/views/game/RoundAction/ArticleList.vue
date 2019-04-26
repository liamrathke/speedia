<template>
    <div class="container container-mw-lg">
        <div class="buttons-wrapper">
            <article-button v-for="(article, articleIndex) in articles" v-bind:key="article" v-bind:articleTitle="article" v-bind:selected="false" class="article-button"></article-button>
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
