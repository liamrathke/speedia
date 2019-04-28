<template>
    <div class="buttons-wrapper">
        <div class="article-button" v-for="article in articles" v-bind:key="article">
            <article-button v-bind:articleTitle="article" v-bind:selected="selectedArticle === article" v-on:select="$emit('select', article)"></article-button>
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
    selectedArticle: {
      type: String,
      required: true
    },
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
