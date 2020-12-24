<template>
  <div class="h-min-1400">
    <transition name="hider">
      <div v-if="hider" class=" hider "></div>
    </transition>
  </div>
</template>

<script>
export default {
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
        this.$router.push({ path: this.localePath('/auth/login') })
        this.$store.commit('template/SET_DASHACTIVE', 'site')
        const message = this.$t('auth.logged out')
        setTimeout(() => {
          this.mtoast(message)
        }, 750)
      })
    }
  }
}
</script>

<style lang="css"></style>
