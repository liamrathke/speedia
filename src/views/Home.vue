<template>
    <div class="vh-100" v-bind:class="{'center-parent': !true}">
        <navbar class="as-fs"></navbar>
        <br>
        <div class="container">
            <div>
                <div class="row">
                    <div class="col-md-10 col-lg-6 offset-md-1 offset-lg-3">
                        <div class="input-group text-center">
                            <input type="text" class="name-enter w-100 drop-shadow" v-model="name" placeholder="Username">
                        </div>
                        <br>
                    </div>
                    <div class="col-sm-12 col-md-10 offset-md-1">
                        <div class="row">
                            <div class="col-6 col-lg-4" v-for="category in categories" v-bind:key="category.name">
                                <div v-on:click="changeCategory(category.name)">
                                    <div class="card drop-shadow b-0 br-0 unselected-category" v-bind:class="{'selected-category': selectedCategory === category.name}">
                                        <ul class="list-group list-group-flush text-center">
                                            <li class="list-group-item bg-t"><i class="fa fs-5" v-bind:class="category.icon"></i></li>
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
                        <button type="button" class="btn btn-primary btn-lg w-100">Go!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: {Navbar},
  data: function() {
    return {
      name: '',
      selectedCategory: 'Grab Bag',
      categories: [
        {name: 'Grab Bag', icon: 'fa-question-circle'},
        {name: 'History', icon: 'fa-monument'},
        {name: 'News', icon: 'fa-newspaper'},
        {name: 'Geography', icon: 'fa-globe-americas'},
        {name: 'Science', icon: 'fa-flask'},
        {name: 'Culture', icon: 'fa-music'}
      ]
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
    }
  }
}
</script>

<style scoped>
.name-enter {
  border-width: 0;
  border-left: 0.5em solid #343A40;
  padding: 0.5em;
  font-size: 2em;
  color: var(--off-black);
  filter: drop-shadow(3px 6px 9px var(--off-black-80));
}
.name-enter::placeholder {
  filter: drop-shadow(3px 6px 9px var(--off-black-50));
}
.unselected-category {
  color: var(--off-black);
  background-color: #FFFFFF;
  cursor: pointer;
}
.selected-category {
  color: #FFFFFF;
  background-color: var(--off-black);
}
.b-0, .list-group-item {
  border: 0;
}
.br-0 {
  border-radius: 0;
}
.fs-5 {
  font-size: 5em;
}
.bg-t {
  background-color: transparent;
}
.vh-100 {
  min-height: 100vh;
}
.center-parent {
  display: flex;
  flex-direction: column;
}
.as-fs {
  flex-basis: 100%;
  align-self: flex-start;
}
</style>

