<template>
    <div>
        <countdown end="TEST"></countdown>
        <article-search searchString="TEST"></article-search>
        <article-list v-bind:articles="['a', 'b', 'c']"></article-list>
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
  }
}
</script>
