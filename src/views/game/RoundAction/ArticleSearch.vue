<template>
    <div>
        Search Stuff
    </div>
</template>

<script>
export default {
  name: 'ArticleSearch',
  props: {
    searchString: {
      type: String,
      required: true
    }
  }
}
</script>
