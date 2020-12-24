<template>
  <div class="h-min-1400">
    logout
    <transition name="hider">
      <div v-if="hider" class=" hider "></div>
    </transition>
  </div>
</template>

<script>
export default {
  layout: 'initDark',
  // middleware: 'initAuth',
  data() {
    return {
      hider: false
    }
  },
  created() {
    this.signOut()
  },
  mounted() {
    this.hider = true
  },
  methods: {
    signOut() {
      this.$auth.logout().then(() => {
        this.$router.push({ path: this.localePath('/init/login') })
        const message = this.$t('auth.logged out')
        setTimeout(() => {
          this.mtoast(message)
        }, 400)
      })
    }
  }
}
</script>

<style lang="css"></style>
