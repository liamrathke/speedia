<template>
    <div class="exit-button-container">
        <button type="button" class="btn btn-lg btn-danger w-100 exit-button drop-shadow b-0" v-bind:disabled="!enabled" v-on:click="$emit('exit', true)">Exit</button>
    </div>
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      required: true
    }
  }
}
</script>
