<template>
    <div class="dark-bg text-center center-parent">
        <article-title flag="GOAL" v-bind:text="roundInfo.end"></article-title>
        <div class="container container-mw-lg">
            <h1 class="game-text game-found-text m-0 mb-4"><em>Round {{roundInfo.currentRound}}!</em></h1>
            <div>
                <user-intro v-bind:user="gameUsers[0]"></user-intro>
            </div>
            <div class="my-5">
                <hr class="line-break-white">
            </div>
            <div>
                <user-intro v-bind:user="gameUsers[1]"></user-intro>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NextRound',
  props: {
    roundInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    gameUsers() {
      return this.roundInfo.exposedGameUsers
    }
  },
  mounted: function() {
    console.log('Game found!')
  }
}
</script>
