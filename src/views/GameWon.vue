<template>
    <div class="dark-bg text-center center-parent">
        <exit-button v-bind:enabled="true" v-on:exit="$router.push('/')"></exit-button>
        <div class="container container-mw-lg">
            <div v-if="winnerInfo.disconnect" class="game-winner">
                <h2>Your opponent disconnected!</h2>
                <em>You win... I guess?</em>
            </div>
            <div v-else-if="!winnerInfo.tie">
                <div class="game-winner">
                    <h1 class="d-inline mr-2">
                        <b>{{winnerInfo.name}}</b>
                    </h1>
                    <h2 class="d-inline">
                        <em>wins!</em>
                    </h2>
                </div>
                <br>
                <hr class="line-break-white start-edge w-100">
                <br>
                <div class="game-winner">
                    <h3><em>Winning Article Path:</em></h3>
                </div>
                <div v-for="(article, articleIndex) in winnerInfo.path" v-bind:key="article">
                    <article-title v-bind:flag="pathFlag[articleIndex]" v-bind:text="article" class="mb-2"></article-title>
                </div>
            </div>
            <div v-else class="game-winner">
                <h2>It's a tie!</h2>
                <em>Well, this is awkward...</em>
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
        return ('RD. ' + articleIndex)
      })
      pathEdited[0] = 'START'
      pathEdited[pathEdited.length - 1] = 'END'
      return pathEdited
    }
  }
}
</script>
