<template>
    <div class="row w-100">
        <div class="col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4">
            <user-intro v-bind:user="user"></user-intro>
            <div class="text-white w-100 mt-2 fs-15">
                is at
                <h2 class="d-inline-block mb-0">{{user.lastArticle}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UserUpdate',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
