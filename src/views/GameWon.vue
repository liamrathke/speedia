<template>
    <div>Game Won!</div>
</template>

<script>
export default {
  name: 'GameWon',
  props: {
    winnerInfo: {
      type: Object,
      required: true
    }
  }
}
</script>
