<template>
    <div class="standout-card card ptb-15 drop-shadow">
        <h1 class="mb-0">
            <i class="fa p-1 mr-2" v-bind:class="user.category.icon"></i>
            {{user.name}}
        </h1>
    </div>
</template>

<script>
export default {
  props: {
    flag: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
