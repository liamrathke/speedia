<template>
    <div class="vh-80" v-bind:class="{'center-parent': !smallDeviceHeight}">
        <navbar class="as-fs"></navbar>
        <div class="container">
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
                        <div class="col-6 col-lg-4" v-for="category in categoryInfo" v-bind:key="category">
                            <div v-on:click="changeCategory(category)">
                                <category-card v-bind:selected="selectedCategory === category" v-bind:category-alias="category"></category-card>
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
</template>

<script>
import Navbar from '@/components/Navbar'

import CategoryInfo from '#/game/support/category-info.js'

export default {
  name: 'Home',
  components: {Navbar},
  data: function() {
    return {
      name: 'Testing',
      selectedCategory: 'GrabBag',
      queueButtonEnabled: true,
      categoryInfo: Object.keys(CategoryInfo)
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
  methods: {
    changeCategory: function(newCategory) {
      this.selectedCategory = newCategory
    },
    verifyName: function() {
      return (this.name.trim().length > 0)
    },
    enterQueue: function() {
      if (this.verifyName) {
        this.$socket.emit('enterQueue', {name: this.name, selectedCategory: this.selectedCategory})
      }
    }
  }
}
</script>
