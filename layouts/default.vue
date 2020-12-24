<template>
  <div>
    <p>default layout</p>
    <div>
      <init-block v-if="show" />
      <nuxt v-if="show" />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    InitBlock: () => import('@/components/InitBlock.vue')
  },
  data() {
    return {
      show: true
    }
  },
  // fetch() {
  //   this.$axios
  //     .$post(`${this.host}/init/test`, {
  //       host: this.host,
  //       locale: this.locale
  //     })
  //     .then(response => {
  //       console.log(response)
  //       this.show = true
  //     })
  //     .catch(() => {})
  // },
  created() {
    //this.start()
  },
  methods: {
    // start() {
    //   this.$axios
    //     .$post(`${this.host}/init/test`, {
    //       host: this.host,
    //       locale: this.locale
    //     })
    //     .then(response => {
    //       console.log(response)
    //       this.show = true
    //     })
    //     .catch(() => {})
    // }
  }
}
</script>
<style lang="scss" src="@/assets/start/start.scss"></style>
