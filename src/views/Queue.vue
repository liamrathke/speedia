<template>
    <div class="dark-bg text-center center-parent">
        <ExitButton></ExitButton>
        <!-- <div class="exit-button-container">
            <button type="button" class="btn btn-lg btn-danger w-100 exit-button drop-shadow b-0" v-bind:disabled="!(exitButtonEnabled)" v-on:click="exitQueue()">Exit</button>
        </div>-->
        <div class="center-box">
            <h1 class="game-text"><em>Finding Game...</em></h1>
            <div>
                <div class="game-progress progress">
                    <div class="game-progress-bar progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
                </div>
                <div class="standout-card center-card card drop-shadow b-0 br-0">
                    <ul class="list-group list-group-flush text-center">
                        <li class="list-group-item b-0 bg-t"><i class="fa fs-10 mt-3 drop-shadow" v-bind:class="categoryInfo.icon"></i></li>
                        <li class="list-group-item b-0 pt-0 bg-t">
                            <h1 class="drop-shadow">{{categoryInfo.name}}</h1>
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
    categoryInfo: {
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
  methods: {
    exitQueue: function() {
      this.$socket.emit('exitQueue')
    }
  }
}
</script>
