<template>
  <section class="container bg-primary">
    <div v-if="show">
      <h1 class="title">basix</h1>
      <h2 class="subtitle">naked app</h2>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'default',
  // middleware: ['ini'],
  data() {
    return {
      show: false
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
  mounted() {
    this.show = true
  },
  methods: {}
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
