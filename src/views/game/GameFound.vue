<template>
    <div class="dark-bg text-center center-parent">
        <div class="container">
            <h1 class="game-text mb-6"><em>Game Found!</em></h1>
            <div class="row center-parent">
                <div class="col-sm-12 col-md-5 p-0">
                    <div class="standout-card card ptb-15 drop-shadow">
                        <h1 class="mb-0">
                            <i class="fa p-1 mr-2" v-bind:class="gameUsers[0].category.icon"></i>
                            {{gameUsers[0].name}}
                        </h1>
                    </div>
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
                    <div class="standout-card card ptb-15 drop-shadow">
                        <h1 class="mb-0">
                            <i class="fa p-1 mr-2" v-bind:class="gameUsers[1].category.icon"></i>
                            {{gameUsers[1].name}}
                        </h1>
                    </div>
                </div>
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
