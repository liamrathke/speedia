<template>
    <div class="dark-bg text-center center-parent">
        <exit-button v-bind:enabled="true" v-on:exit="$router.push('/')"></exit-button>
        <div class="container container-mw-lg">
            <div v-if="winnerInfo.disconnect" class="game-winner">
                <h3>Your opponent disconnected!</h3>
                <em>You win... I guess?</em>
            </div>
            <div v-else-if="!winnerInfo.tie">
                <div class="game-winner">
                    <h1><b>{{winnerInfo.name}}</b></h1>
                    <em>wins!</em>
                </div>
                <div v-for="(article, articleIndex) in winnerInfo.path" v-bind:key="article">
                    <article-title v-bind:flag="pathFlag[articleIndex]" v-bind:text="article"></article-title>
                </div>
            </div>
            <div v-else class="game-winner">
                <h3>Your opponent disconnected!</h3>
                <em>You win... I guess?</em>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GameWon',
  props: {
    winnerInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    pathFlag() {
      let pathEdited = this.winnerInfo.path.map((article, articleIndex) => {
        return ('ROUND ' + articleIndex)
      })
      pathEdited[0] = 'START'
      pathEdited[pathEdited.length - 1] = 'END'
      return pathEdited
    }
  }
}
</script>
