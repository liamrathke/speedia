<template>
    <div class="card-text dark-theme m-0">
        <small class="mr-1">Selected Article:</small>
        {{selectedArticle}}
    </div>
</template>

<script>
export default {
  name: 'SelectedArticle',
  props: {
    selectedArticle: {
      type: String,
      required: true
    }
  }
}
</script>

