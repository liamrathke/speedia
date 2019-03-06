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
      if (data.categoryInfo.name) {
        this.$router.push({name: 'Queue', params: {categoryInfo: data.categoryInfo}})
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
    }
  }
}
</script>
