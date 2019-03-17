<template>
    <div class="row w-100">
        <div class="col-10 col-md-6 col-lg-4 offset-1 offset-md-3 offset-lg-4">
            <user-intro v-bind:user="user"></user-intro>
            <h3 class="text-white">
                <span class="mr-1">is at</span>
                <span>{{user.lastArticle}}</span>
            </h3>
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
