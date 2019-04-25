<template>
    <button class="standout-card card drop-shadow w-100">
        <p class="card-text w-100 text-center w-100">{{articleTitle}}</p>
    </button>
</template>

<script>
export default {
  name: 'ArticleButton',
  props: {
    articleTitle: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  }
}
</script>
