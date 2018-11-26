<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <br>
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
                            <div class="card drop-shadow">
                                <img class="card-img-top" v-bind:src="category.image">
                                <div class="card-body">
                                    <p class="card-text">{{category.name}}</p>
                                </div>
                            </div>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6 col-md-4 offset-3 offset-md-4 pb-3">
                    <button type="button" class="btn btn-primary btn-lg w-100">Go!</button>
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
        {name: 'Grab Bag', image: require('../assets/grab-bag.png')},
        {name: 'History', image: require('../assets/history.png')},
        {name: 'News', image: require('../assets/news.png')},
        {name: 'Geography', image: require('../assets/geography.png')},
        {name: 'Science', image: require('../assets/science.png')},
        {name: 'Culture', image: require('../assets/culture.png')}
      ]
    }
  }
}
</script>

<style>
.name-enter {
  border-width: 0;
  border-left: 0.5em solid #343A40;
  padding: 0.5em;
  font-size: 2em;
}
</style>

