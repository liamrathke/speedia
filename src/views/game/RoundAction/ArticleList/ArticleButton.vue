<template>
    <button class="standout-card card drop-shadow w-100 ai-center">
        <p class="card-text">{{articleTitle}}</p>
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
