<template>
    <div>
        <countdown end="TEST"></countdown>
        <article-search searchString="TEST"></article-search>
        <article-list v-bind:articles="['a', 'b', 'c']"></article-list>
    </div>
</template>

<script>
import {ArticleList, ArticleSearch, Countdown} from './RoundAction'

export default {
  name: 'RoundAction',
  components: {ArticleList, ArticleSearch, Countdown},
  props: {
    gameInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    gameUsers() {
      return this.gameInfo.exposedGameUsers
    },
    startEnd() {
      return this.gameInfo.startEnd
    }
  }
}
</script>
