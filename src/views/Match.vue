<template>
    <div class="dark-bg text-center center-parent">
        <div class="center-box">
            <h1 class="game-text"><em>Game Starting</em></h1>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Match',
  data: function() {
    return {
      test: true
    }
  },
  sockets: {},
  mounted: function() {
    this.sockets.subscribe('newRound', function(data) {
      this.$router.push('/')
      this.sockets.unsubscribe('newRound')
    })
  }
}
</script>

<style>
.center-parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
.center-card {
  z-index: 3;
  color: var(--off-black);
  background-color: #FFFFFF;
  padding-left: 2em;
  padding-right: 2em;
  border-width: 0;
  border-radius: 0;
}
.exit-button-container {
  position: absolute;
  top: 1em;
  right: 1em;
}
.exit-button {
  background: linear-gradient(45deg, rgb(241, 113, 167) 0%, rgb(222, 63, 99) 100%);
  border-radius: 0;
}
.game-text {
  color: #FFFFFF;
  margin: 2em 0 1em 0;
}
.game-progress-bar {
  width: 100%;
  background-color: #32BD70;
}
.game-progress {
  position: fixed;
  top: 55%;
  left: 0;
  width: 100vw;
  height: 9em;
  border-radius: 0;
}
.fs-10 {
  font-size: 10em;
}
.bg-t {
  background-color: transparent;
}
.b-0 {
  border-width: 0;
}
</style>
