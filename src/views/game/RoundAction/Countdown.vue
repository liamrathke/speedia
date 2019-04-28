<template>
    <div class="card-text dark-theme m-0 row">
        <div class="col-9 col-md-11 text-left">GOAL</div>
        <div class="col-3 col-md-1">10</div>
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
  data: function() {
    return {
      actionDuration: ROUND_INTERVALS.ROUND_ACTION_MS
    }
  }
}
</script>
