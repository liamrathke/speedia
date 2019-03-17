<template>
    <div>
        List Stuff
    </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
