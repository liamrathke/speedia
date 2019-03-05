<template>
    <div class="dark-bg text-center center-parent">
        <div class="center-box">
            <h1 class="game-text"><em>Game Starting</em></h1>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GameFound',
  data: function() {
    return {
      test: true
    }
  },
  sockets: {},
  mounted: function() {
    console.log('Game found!')
    this.sockets.subscribe('newRound', function(data) {
      this.$router.push('/')
      this.sockets.unsubscribe('newRound')
    })
  }
}
</script>
