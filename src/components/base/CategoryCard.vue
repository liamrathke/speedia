<template>
    <div class="card drop-shadow b-0 br-0 unselected-category" v-bind:class="{'selected-category': selected}">
        <ul class="list-group list-group-flush text-center">
            <li class="list-group-item bg-t"><i class="fa fs-5 mt-3" v-bind:class="categoryInfo.icon"></i></li>
            <li class="list-group-item pt-0 bg-t">
                <h4 class="category-name">{{categoryInfo.name}}</h4>
            </li>
        </ul>
    </div>
</template>

<script>
import CategoryInfo from '#/game/support/category-info.js'

export default {
  props: {
    selected: {
      type: Boolean,
      required: false
    },
    categoryAlias: {
      type: String,
      required: true
    }
  },
  computed: {
    categoryInfo() {
      return CategoryInfo[this.categoryAlias]
    }
  }
}
</script>
