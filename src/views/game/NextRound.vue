<template>
    <div class="dark-bg text-center center-parent ai-end">
        <div class="goal-text">
            <article-title flag="GOAL" v-bind:text="roundInfo.end"></article-title>
        </div>
        <div class="container container-mw-lg">
            <div class="center-parent">
                <h1 class="game-text game-found-text m-0 mb-4"><em>Round {{roundInfo.currentRound}}!</em></h1>
                <div class="center-parent">
                    <user-update v-bind:user="gameUsers[0]"></user-update>
                    <div class="my-2">
                        <hr class="line-break-white start-edge">
                    </div>
                    <user-update v-bind:user="gameUsers[1]"></user-update>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserUpdate from './NextRound/UserUpdate.vue'

export default {
  name: 'NextRound',
  components: {
    UserUpdate
  },
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
