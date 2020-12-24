<template>
  <div>
    <p class="text-center py-2 my-0 "><strong>init layout</strong></p>
    <div>
      <!-- <init-block v-if="show" /> -->
      <nuxt v-if="show" />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    // InitBlock: () => import('@/components/InitBlock.vue')
  },
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
<style lang="scss" scoped>
html,
body {
  background: #f6993f !important;
  color: red !important;
  transition: all 0.3s ease-in-out !important;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
