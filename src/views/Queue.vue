<template>
    <div class="dark-bg text-center center-parent">
        <div class="exit-button-container">
            <button type="button" class="btn btn-lg btn-danger w-100 exit-button drop-shadow b-0" v-bind:disabled="!(exitButtonEnabled)" v-on:click="exitQueue()">Exit</button>
        </div>
        <div class="center-box">
            <h1 class="game-text"><em>Finding Game...</em></h1>
            <div>
                <div class="game-progress progress">
                    <div class="game-progress-bar progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
                </div>
                <div class="center-card card drop-shadow b-0 br-0">
                    <ul class="list-group list-group-flush text-center">
                        <li class="list-group-item b-0 bg-t"><i class="fa fs-10 mt-3 drop-shadow" v-bind:class="category.icon"></i></li>
                        <li class="list-group-item b-0 pt-0 bg-t">
                            <h1 class="drop-shadow">{{category.name}}</h1>
                        </li>
                    </ul>
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
      type: Object,
      required: false,
      default: function() {
        return {
          icon: 'fa-question-circle',
          name: 'Grab Bag'
        }
      }
    }
  },
  data: function() {
    return {
      exitButtonEnabled: true
    }
  },
  sockets: {},
  mounted: function() {
    this.sockets.subscribe('matchFound', function(data) {
      this.$router.push('Match')
      this.sockets.unsubscribe('matchFound')
    })
  },
  methods: {
    exitQueue: function() {
      this.exitButtonEnabled = false
      this.sockets.subscribe('exitedQueue', function(confirmation) {
        if (confirmation) {
          this.$router.push('/')
        }
        this.sockets.unsubscribe('exitedQueue')
      })
      this.$socket.emit('exitQueue')
    }
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
