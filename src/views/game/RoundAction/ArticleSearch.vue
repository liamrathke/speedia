<template>
    <div class="input-group text-center">
        <input type="text" class="name-enter bl-dark w-100 drop-shadow" v-model="searchString" placeholder="Search">
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
  watch: {
    searchString() {
      this.updateSearch()
    }
  },
  methods: {
    updateSearch: function() {
      this.$emit('search', this.searchString.trim())
    }
  }
}
</script>
