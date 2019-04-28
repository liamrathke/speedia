<template>
    <div class="input-group text-center">
        <input type="text" class="name-enter bl-dark w-100 drop-shadow" v-model="searchString" placeholder="Search" v-on:keyup="updateSearch()">
    </div>
</template>

<script>
export default {
  name: 'ArticleSearch',
  data: function() {
    return {
      searchString: ''
    }
  },
  methods: {
    updateSearch: function() {
      let formattedString = this.searchString.trim()
      if (formattedString.length > 0) {
        this.$emit('search', formattedString)
      }
    }
  }
}
</script>
