<template>
  <div
    :style="{ backgroundColor: dashboard.light, color: dashboard.dark }"
    class="container-fluid p-0 py-4  "
  >
    <div ref="element" :style="cssVars" class="row m-0">
      <div class=" col-lg-7  col-lx-5 mx-auto">
        <b-card
          :style="{
            backgroundColor: dashboard.light,
            color: dashboard.dark
          }"
          no-body
          class=" mt-5 mb-0  shadow ami-fade-down p-1"
        >
          <b-card-header
            :style="{
              color: dashboard.title
            }"
            class="text-center p-1 shadow-sm"
          >
            <div class="d-inline-flex p-0 col-12">
              <div class="col-2 py-1 d-inline-flex">
                <a @click.prevent="goBack" href="#" class="py-0 my-1 mx-1"
                  ><button-rnd :colors="dashboard"
                    ><fa
                      :icon="['fas', 'reply']"
                      class="fnt-18"
                    ></fa></button-rnd
                ></a>
                <n-link
                  :to="{ path: localePath('/auth/register') }"
                  class="py-0 my-1 mx-1 "
                  tag="a"
                  ><button-rnd :colors="dashboard" class=""
                    ><fa :icon="['far', 'edit']" class="fnt-18 "></fa
                  ></button-rnd>
                </n-link>
              </div>
              <div
                :style="{ color: dashboard.title }"
                class="col-8 text-center align-self-center fnt-20 text-sys-sm "
              >
                {{ $t('auth.forgot') }}
              </div>
            </div>
          </b-card-header>
          <b-card-body class="card-body  px-1">
            <form @submit.prevent="forgot" class="">
              <div
                :style="{ color: dashboard.text }"
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
                  <button-block :colors="dashboard" class="my-1"
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
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      email: null,
      has_error: false,
      form: {
        errors: []
      }
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
  },
  methods: {
    forgot() {
      this.form.locale = this.locale
      this.$axios
        .$post('/auth/reset-email', this.form)
        .then(response => {
          this.goBack()
          this.$toast.show(response.message, { duration: 3500 })
          this.$axios.$post('/auth/reset-password', this.form)
        })
        .catch(error => {
          if (error.response.status === 423) {
            this.$toast.show(error.response.data.message)
          }
        })
    },
    requestResetPassword() {
      this.form.locale = this.locale

      this.$axios
        .$post('/auth/reset-password', this.form)
        .then(response => {
          this.goBack()
          this.$toasted.show(response.message)
        })
        .catch(error => {
          this.$toast.show(error.response.data.message)
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
