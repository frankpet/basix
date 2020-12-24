<template>
  <div class="container-fluid p-0 py-4  ">
    <div>
      <div ref="element" :style="cssVars" class="row m-0">
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
                </div>
                <div
                  :style="{ color: dashboard.pattern.dark }"
                  class="col-8 text-center align-self-center fnt-20 text-sys-sm "
                >
                  <strong>{{ $t('auth.forgot') }}</strong>
                </div>
              </div>
            </b-card-header>
            <b-card-body class="card-body  px-1">
              <form @submit.prevent="forgot" class="" autocomplete="off">
                <div
                  :style="{ color: dashboard.pattern.dark }"
                  class="form-group row fnt-22"
                >
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for="email"
                    >email</label
                  >
                  <div class="col-lg-6">
                    <input
                      id="email"
                      ref="inputfocus"
                      v-model="form.email"
                      :class="{ 'is-invalid': errors.email }"
                      type="email"
                      class="form-control fnt-22  "
                      placeholder=""
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                    />
                    <div
                      v-if="errors.email"
                      class="invalid-feedback col-md-10 text-lg-right"
                    >
                      <strong>{{ errors.email[0] }}</strong>
                    </div>
                  </div>
                </div>

                <div class="form-group row   pb-0">
                  <div class="col-lg-6 offset-lg-4">
                    <button-block :colors="dashboard.pattern" class="my-1"
                      ><span class="fnt-24 text-sys">{{
                        $t('auth.send')
                      }}</span></button-block
                    >
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
  data() {
    return {
      email: null,
      has_error: false,
      form: {
        errors: []
      },
      showData: false,
      hider: false
    }
  },
  computed: {
    ...mapGetters({}),
    cssVars() {
      return {
        '--log-light': this.dashboard.light,
        '--log-dark': this.dashboard.dark,
        '--log-linkActive': this.dashboard.linkActive,
        '--log-link': this.dashboard.active
      }
    }
  },
  mounted() {
    this.setFocus()
    this.fix75()
    this.showData = true
    this.hider = true
  },
  methods: {
    forgot() {
      this.form.locale = this.locale
      this.$axios
        .$post('/auth/reset-email', this.form)
        .then(response => {
          this.$axios.$post('/auth/reset-password', this.form)
          this.mtoast(response.message)
          setTimeout(() => {
            this.goBack()
          }, 1000)
        })
        .catch(error => {
          if (error.response.status === 423) {
            this.mtoast(error.response.data.message)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  color: #fff;
}
.link:hover {
  color: #333;
}
</style>
