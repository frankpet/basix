<template>
  <div
    :style="{
      backgroundColor: dashboard.pattern.light,
      color: dashboard.pattern.dark
    }"
    class="container-fluid p-0 py-4  "
  >
    <div ref="element" class="row m-0">
      <div class=" col-lg-7  col-lx-5 mx-auto">
        <b-card
          :style="{
            backgroundColor: dashboard.pattern.light,
            color: dashboard.pattern.dark
          }"
          no-body
          class=" mt-5 mb-0  shadow ami-fade-down p-1"
        >
          <b-card-header
            :style="{
              color: dashboard.pattern.dark
            }"
            class="text-center p-1 shadow-sm"
          >
            <div class="d-inline-flex p-0 col-12">
              <div class="col-2 py-1 d-inline-flex">
                <a @click.prevent="goBack" href="#" class="py-0 my-1 mx-1"
                  ><button-rnd :colors="dashboard.pattern"
                    ><fa
                      :icon="['fas', 'reply']"
                      class="fnt-18"
                    ></fa></button-rnd
                ></a>
                <n-link
                  :to="{ path: localePath('/auth/register') }"
                  class="py-0 my-1 mx-1 "
                  tag="a"
                  ><button-rnd :colors="dashboard.pattern" class=""
                    ><fa :icon="['far', 'edit']" class="fnt-18 "></fa
                  ></button-rnd>
                </n-link>
              </div>
              <div
                :style="{ color: dashboard.dark }"
                class="col-8 text-center align-self-center fnt-22 text-sys"
              >
                <strong>{{ $t('auth.sign_up') }}</strong>
              </div>
            </div>
          </b-card-header>
          <b-card-body class="card-body  px-1">
            <form @submit.prevent="login" class="">
              <div
                :style="{ color: dashboard.dark }"
                class="form-group row fnt-22"
              >
                <label class="col-lg-4 col-form-label text-lg-right " for="">{{
                  $t('auth.login')
                }}</label>
                <div class="col-lg-6">
                  <input
                    ref="inputfocus"
                    v-model="form.username"
                    :class="{ 'is-invalid': errors.username }"
                    type="text"
                    class="form-control fnt-22  "
                    placeholder=""
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                  />
                  <div
                    v-if="errors.username"
                    class="invalid-feedback col-md-10 text-lg-right"
                  >
                    <strong>{{ errors.username[0] }}</strong>
                  </div>
                </div>
              </div>
              <div
                :style="{ color: dashboard.text }"
                class="form-group row fnt-20"
              >
                <label
                  class="col-lg-4 col-form-label    text-lg-right"
                  for=""
                  >{{ $t('auth.password') }}</label
                >
                <div class="col-lg-6">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control  fnt-22"
                  />
                </div>
              </div>

              <div class="form-group row   pb-0">
                <div class="col-lg-6 offset-lg-4">
                  <button-block :colors="dashboard.pattern" class="my-1"
                    ><span class="fnt-24 text-sys">{{
                      $t('auth.login')
                    }}</span></button-block
                  >
                  <div class="m-3">
                    <n-link
                      :to="{ path: localePath('/auth/forgot') }"
                      class="fnt-11 text-sys link"
                      >{{ $t('auth.forgot password') }}</n-link
                    >
                  </div>
                </div>
              </div>
            </form>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div id="pager3"></div>
    <transition name="hider">
      <div v-if="hider" class=" hider "></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'default',
  middleware: ['isGuest'],
  data() {
    return {
      hider: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  mounted() {
    this.setFocus()
    this.fix75()
  },
  methods: {
    login() {
      this.form.host = this.host
      this.form.locale = this.locale
      this.form.start = this.dashStart
      this.$auth
        .login({ data: this.form })
        .then(() => {
          if (!this.init) {
            this.$router.push(this.localePath('/init/init'))
          } else {
            const message = this.$t('auth.logged in')
            this.$router.push(
              this.$route.query.redirect
                ? this.$route.query.redirect
                : this.getUserPath()
            )
            setTimeout(() => {
              this.mtoast(message)
            }, 250)
          }
        })
        .catch(() => {
          const message = this.$t('errors.input failed')

          this.mtoast(message)
        })
    },
    getUserPath() {
      this.$store.commit('template/SET_DASHACTIVE', this.user.role)
      return this.localePath('/dashboards/' + this.user.role + '/dashboard')
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: var(--dashboard-a);
}

.link:hover {
  color: var(--dashboard-hover);
}
</style>
