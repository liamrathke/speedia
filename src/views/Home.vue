<template>
    <div class="vh-80" v-bind:class="{'center-parent': !smallDeviceHeight}">
        <navbar class="as-fs"></navbar>
        <div class="container">
            <div>
                <br>
                <div class="row">
                    <div class="col-md-10 col-lg-6 offset-md-1 offset-lg-3">
                        <div class="input-group text-center">
                            <input type="text" class="name-enter w-100 drop-shadow" v-bind:class="{'name-enter-success': verifyName()}" v-model="name" placeholder="Username" maxlength="30">
                        </div>
                        <br>
                    </div>
                    <div class="col-sm-12 col-md-10 offset-md-1">
                        <div class="row">
                            <div class="col-6 col-lg-4" v-for="category in categories" v-bind:key="category.name">
                                <div v-on:click="changeCategory(category.name)">
                                    <div class="card drop-shadow b-0 br-0 unselected-category" v-bind:class="{'selected-category': selectedCategory === category.name}">
                                        <ul class="list-group list-group-flush text-center">
                                            <li class="list-group-item bg-t"><i class="fa fs-5 mt-3" v-bind:class="category.icon"></i></li>
                                            <li class="list-group-item pt-0 bg-t">
                                                <h4 v-if="!smallDeviceWidth">{{category.name}}</h4>
                                                <h6 v-else>{{category.name}}</h6>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-lg-6 offset-md-1 offset-lg-3 pb-3">
                        <button type="button" class="btn btn-lg btn-success w-100 go-button drop-shadow" v-bind:class="{'go-button-success': verifyName()}" v-bind:disabled="!(verifyName() && queueButtonEnabled)" v-on:click="enterQueue()">Go!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

import Categories from '@/assets/categories.js'

export default {
  name: 'Home',
  components: {Navbar},
  data: function() {
    return {
      name: 'Testing',
      selectedCategory: 'Grab Bag',
      queueButtonEnabled: true,
      categories: Categories
    }
  },
  computed: {
    smallDeviceWidth() {
      return window.innerWidth < 380
    },
    smallDeviceHeight() {
      return window.innerHeight < document.body.clientHeight
    }
  },
  sockets: {},
  methods: {
    changeCategory: function(newCategory) {
      this.selectedCategory = newCategory
    },
    verifyName: function() {
      return (this.name.trim().length > 0)
    },
    enterQueue: function() {
      if (this.verifyName) {
        let queueParameters = {
          name: this.name,
          selectedCategory: this.selectedCategory
        }
        this.queueButtonEnabled = false
        this.sockets.subscribe('enteredQueue', function(selectedCategory) {
          if (selectedCategory.name) {
            this.$router.push({name: 'Queue', params: {category: selectedCategory}})
          } else {
            this.queueButtonEnabled = true
            console.error('Failed to enter the queue!')
          }
          this.sockets.unsubscribe('enteredQueue')
        })
        this.$socket.emit('enterQueue', queueParameters)
      }
    }
  }
}
</script>
