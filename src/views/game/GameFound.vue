<template>
    <div class="dark-bg text-center center-parent">
        <div class="container container-mw-lg">
            <h1 class="game-text mb-6"><em>Game Found!</em></h1>
            <div class="row center-parent">
                <div class="col-sm-12 col-md-5 p-0">
                    <user-intro v-bind:user="gameUsers[0]"></user-intro>
                </div>
                <div class="col-sm-12 col-md-2 p-0">
                    <div class="text-center ptb-1 progress-bar progress-bar-striped progress-bar-animated red-bg">
                        <div class="post-n2">
                            <div class="post-2 drop-shadow">
                                <h2 class="m-0 drop-shadow-heavy">VS</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-5 p-0">
                    <user-intro v-bind:user="gameUsers[1]"></user-intro>
                </div>
            </div>
            <div class="d-none d-md-block">
                <br>
                <hr class="line-break-white">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GameFound',
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
  },
  mounted: function() {
    console.log('Game found!')
  }
}
</script>
