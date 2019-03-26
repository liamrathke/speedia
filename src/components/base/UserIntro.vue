<template>
    <div class="standout-card card ptb-15 drop-shadow">
        <h1 class="mb-0">
            <i class="fa p-1 mr-2" v-bind:class="categoryInfo[user.category].icon"></i>
            {{user.name}}
        </h1>
    </div>
</template>

<script>
import CategoryInfo from '#/game/support/category-info.js'

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      categoryInfo: CategoryInfo
    }
  }
}
</script>
