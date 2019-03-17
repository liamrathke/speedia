<template>
    <div class="dark-bg text-center center-parent">
        <div class="container container-mw-lg">
            <h1 class="game-text game-found-text m-0 mb-4"><em>Game Found!</em></h1>
            <div class="row center-parent">
                <div class="col-sm-12 col-md-5 p-0">
                    <user-intro v-bind:user="gameUsers[0]"></user-intro>
                </div>
                <div class="col-sm-12 col-md-2 p-0">
                    <div class="text-center ptb-1 progress-bar progress-bar-striped progress-bar-animated red-bg">
                        <div class="post-n2">
                            <div class="post-2 drop-shadow">
                                <h2 class="m-0 drop-shadow-heavy">VS</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-5 p-0">
                    <user-intro v-bind:user="gameUsers[1]"></user-intro>
                </div>
            </div>
            <div class="d-none d-md-block mt-4">
                <hr class="line-break-white">
            </div>
            <br>
            <div class="mt-4">
                <article-title flag="START" v-bind:text="startEnd[0].article"></article-title>
                <div class="row m-0">
                    <span class="col-10 col-md-9 offset-2 offset-md-1">
                        <i class="pointer-arrow fa fa-angle-double-down"></i>
                        <i class="pointer-arrow fa fa-angle-double-down"></i>
                        <i class="pointer-arrow fa fa-angle-double-down"></i>
                    </span>
                </div>
                <article-title flag="END" v-bind:text="startEnd[1].article"></article-title>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'GameFound',
  props: {
    gameInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    gameUsers() {
      return this.gameInfo.exposedGameUsers
    },
    startEnd() {
      return this.gameInfo.startEnd
    }
  }
}
</script>
