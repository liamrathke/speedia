<template>
    <div>
        <div class="card-text dark-theme m-0 row py-2">
            <div class="col-9 col-md-11 text-left">
                <small class="mr-1">Goal:</small>
                {{end}}
            </div>
            <div class="col-3 col-md-1">{{secondsLeft}}</div>
        </div>
        <div class="red-bg h-1" v-bind:style="{width: percentLeft}"></div>
    </div>
</template>

<script>
import {ROUND_INTERVALS} from '#/config'

export default {
  name: 'Countdown',
  props: {
    end: {
      type: String,
      required: true
    }
  },
  computed: {
    secondsLeft() {
      return (this.timeLeft / 1000).toFixed(1)
    },
    percentLeft() {
      return `${((100 * this.timeLeft) / this.originalTime).toFixed(0)}%`
    }
  },
  data: function() {
    return {
      originalTime: ROUND_INTERVALS.ROUND_ACTION_MS,
      timeLeft: ROUND_INTERVALS.ROUND_ACTION_MS,
      tickTime: 100,
      timer: false
    }
  },
  mounted: function() {
    this.timer = setInterval(this.decreaseTimer, this.tickTime)
  },
  methods: {
    decreaseTimer: function() {
      if (this.timeLeft > 0) {
        this.timeLeft -= this.tickTime
      } else {
        clearInterval(this.timer)
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
