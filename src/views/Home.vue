<template>
    <div class="container">
        <br>
        <div class="row">
            <div class="col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">
                <div class="input-group text-center">
                    <input type="text" class="w-100" v-model="name" placeholder="Username">
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-sm-12 col-md-10 offset-md-1">
                <div class="row">
                    <div class="col-6 col-lg-4" v-for="category in categories" v-bind:key="category.name">
                        <div class="card">
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
            <div class="col-6 col-md-4 offset-3 offset-md-4">
                <button type="button" class="btn btn-primary btn-lg w-100">Go!</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
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
