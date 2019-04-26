<template>
    <button class="card drop-shadow w-100 ai-center b-0 br-0" v-on:click="$emit('select', true)" v-bind:class="{'selected-category drop-shadow-heavy': selected}">
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
