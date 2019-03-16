<template>
    <div class="dark-bg text-center center-parent">
        <exit-button v-bind:enabled="exitButtonEnabled" v-on:exit="exitQueue()"></exit-button>
        <div class="center-box">
            <h1 class="game-text"><em>Finding Game...</em></h1>
            <div>
                <div class="game-progress progress">
                    <div class="game-progress-bar progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
                </div>
                <div class="drop-shadow b-0 br-0">
                    <category-card v-bind:category-alias="category"></category-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Queue',
  props: {
    category: {
      type: String,
      required: false,
      default: 'GrabBag'
    }
  },
  data: function() {
    return {
      exitButtonEnabled: true
    }
  },
  methods: {
    exitQueue: function() {
      this.$socket.emit('exitQueue')
    }
  }
}
</script>
