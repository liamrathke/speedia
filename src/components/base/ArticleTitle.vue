<template>
    <div class="standout-card card drop-shadow">
        <div v-if="flag" class="row m-0">
            <div class="col-2 col-md-1 center-parent">
                <h5 v-if="flag" class="card-flag">{{flag}}</h5>
            </div>
            <div class="col-10 col-md-9 ptb-15 bl-1">
                <p class="card-text">{{text}}</p>
            </div>
        </div>
        <div v-else>
            <p class="card-text">{{text}}</p>
        </div>
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
