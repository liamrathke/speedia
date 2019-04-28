<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import './assets/styles.css'

export default {
  sockets: {
    connect: function() {
      console.log('User connected to server!')
      this.$router.push('/')
    },
    enteredQueue: function(data) {
      console.log('User has entered the queue!')
      if (data.category) {
        this.$router.push({name: 'Queue', params: {category: data.category}})
      } else {
        console.error('Failed to enter the queue!')
      }
    },
    exitedQueue: function(data) {
      console.log('User has left the queue!')
      this.$router.push('/')
    },
    foundGame: function(data) {
      console.log('User has found a game!')
      this.$router.push({name: 'GameFound', params: {gameInfo: data}})
    },
    nextRound: function(data) {
      console.log('Next round starting!')
      this.$router.push({name: 'NextRound', params: {roundInfo: data}})
    },
    roundAction: function(data) {
      console.log('Round action starting!')
      this.$router.push({name: 'RoundAction', params: {actionInfo: data}})
    },
    gameWon: function(data) {
      console.log('Game won!')
      this.$router.push({name: 'GameWon', params: {winnerInfo: data}})
    }
  }
}
</script>
