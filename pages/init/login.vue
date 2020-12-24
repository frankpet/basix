<template>
  <div class="container-fluid p-0 py-4 ">
    <div v-if="showData">
      <div ref="element" :style="cssVars" class="row m-0">
        <div class="col-lg-7  col-lx-5 mx-auto">
          <b-card
            :style="{
              backgroundColor: dashboard.pattern.light,
              color: dashboard.pattern.dark
            }"
            no-body
            class=" mt-5 mb-0 p-1  shadow-lg ami-fade-down "
          >
            <b-card-header class="text-center p-1 shadow-sm">
              <div class="d-inline-flex p-0 col-12">
                <div class="col-2 py-1 d-inline-flex">
                  <n-link
                    :to="{ path: localePath('/init/register') }"
                    class="py-0 my-1 mx-1 "
                    tag="a"
                    ><button-rnd :colors="dashboard.pattern" class=""
                      ><fa :icon="['far', 'edit']" class="fnt-18 "></fa
                    ></button-rnd>
                  </n-link>
                </div>
                <div
                  :style="{ color: dashboard.pattern.dark }"
                  class="col-8 text-center align-self-center fnt-24 text-sys"
                >
                  <strong class="">{{ $t('auth.member') }}</strong>
                </div>
              </div>
            </b-card-header>
            <b-card-body class=" px-1">
              <form @submit.prevent="login" class="" autocomplete="off">
                <div
                  :style="{ color: dashboard.pattern.dark }"
                  class="form-group row fnt-22"
                >
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for=""
                    >{{ $t('auth.login') }}</label
                  >
                  <div class="col-lg-6">
                    <input
                      ref="inputfocus"
                      v-model="form.username"
                      :class="{ 'is-invalid': errors.username }"
                      type="text"
                      class="form-control fnt-22 "
                      placeholder=""
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                    />
                    <div
                      v-if="errors.username"
                      class="invalid-feedback text-lg-right"
                    >
                      <strong>{{ errors.username[0] }}</strong>
                    </div>
                  </div>
                </div>
                <div
                  :style="{ color: dashboard.pattern.dark }"
                  class="form-group row fnt-22"
                >
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for=""
                    >{{ $t('auth.password') }}</label
                  >
                  <div class="col-lg-6">
                    <input
                      v-model="form.password"
                      type="password"
                      class="form-control fnt-22"
                    />
                  </div>
                </div>

                <div class="form-group row   pb-0">
                  <div class="col-lg-6 offset-lg-4">
                    <button-block
                      :colors="dashboard.pattern"
                      class="my-1 m-l-1 "
                      ><span class="fnt-24 text-sys">{{
                        $t('auth.login')
                      }}</span></button-block
                    >
                    <div class="m-3">
                      <n-link
                        :to="{ path: localePath('/init/forgot') }"
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
  layout: 'initDark',
  transition: 'page',
  middleware: ['initGuest', 'notInit'],
  data() {
    return {
      hider: false,
      form: {
        username: '',
        password: ''
      },
      showData: false
    }
  },
  computed: {
    ...mapGetters({}),
    getUser() {
      return this.$store.state.auth.user
    },
    cssVars() {
      return {
        '--log-light': this.dashboard.pattern.light,
        '--log-dark': this.dashboard.pattern.dark,
        '--log-linkActive': this.dashboard.pattern.linkActive,
        '--log-link': this.dashboard.pattern.link
      }
    }
  },
  mounted() {
    this.setFocus()
    this.initPage()
    this.showData = true
    this.hider = true
  },
  methods: {
    initPage() {
      setTimeout(() => {
        if (this.$refs.element) {
          this.fix75()
        }
      }, 10)
    },
    login() {
      this.form.host = this.host
      this.form.init = true
      this.form.locale = this.locale
      this.form.start = this.dashStart
      this.$auth
        .login({ data: this.form })
        .then(() => {
          this.$router.push({ path: this.localePath('/init/init') })
          const message = this.$t('auth.logged in')
          setTimeout(() => {
            this.mtoast(message, {
              className: 'toast'
            })
          }, 200)
        })
        .catch(() => {
          const message = this.$t('errors.input failed')
          this.mtoast(message)
        })
    }
  }
}
</script>

<style lang="css">
.link {
  color: var(--log-link);
}

.link:hover {
  color: var(--log-linkActive);
}
</style>
