<template lang="html">
  <div
    class="errorpage vh-90 vw-100 d-flex align-items-center justify-content-center"
  >
    <div v-if="show" class="container">
      <div class="row justify-content-center">
        <h1 class="fnt-100">Help</h1>
      </div>
      <div class="row justify-content-center">
        <div class="">
          <i>{{ host }}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'init',
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style lang="css" scoped>
.errorpage {
  background: red;
  color: white;
  display: flex;
}
</style>
