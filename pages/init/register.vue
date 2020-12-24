<template>
  <div class="container-fluid py-4 pt-5">
    <div ref="element">
      <div class="row">
        <div class="col-lg-7  col-lx-5 mx-auto">
          <b-card
            :style="{
              backgroundColor: dashboard.pattern.light,
              color: dashboard.pattern.dark
            }"
            no-body
            class=" mt-5 shadow ami-fade-down p-1  "
          >
            <b-card-header
              :style="{
                color: dashboard.pattern.dark
              }"
              class=" text-center p-1 shadow-sm"
            >
              <div class="d-inline-flex p-0 col-12">
                <div class="col-2 py-1">
                  <a @click.prevent="goBack" href="#" class="py-0 my-10"
                    ><button-rnd :colors="dashboard.pattern"
                      ><fa
                        :icon="['fas', 'reply']"
                        class="fnt-18"
                      ></fa></button-rnd
                  ></a>
                </div>
                <div
                  :style="{ color: dashboard.pattern.dark }"
                  class="col-8 text-center align-self-center fnt-24 text-sys"
                >
                  <strong>{{ $t('auth.member') }}</strong>
                </div>
              </div>
            </b-card-header>
            <b-card-body class="px-1 fnt-22">
              <form @submit.prevent="register" class="" autocomplete="off">
                <div class="form-group row fnt-22">
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for=""
                    >{{ $t('auth.firstName') }}</label
                  >
                  <div class="col-lg-6">
                    <input
                      ref="inputfocus"
                      v-model="form.firstName"
                      :class="{ 'is-invalid': errors.firstName }"
                      type="text"
                      class="form-control  fnt-22"
                      placeholder=""
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                    />
                    <div
                      v-if="errors.firstName"
                      class="invalid-feedback  text-lg-right"
                    >
                      <strong>{{ errors.firstName[0] }}</strong>
                    </div>
                  </div>
                </div>
                <div class="form-group row fnt-22">
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for=""
                    >{{ $t('auth.lastName') }}</label
                  >
                  <div class="col-lg-6">
                    <input
                      v-model="form.lastName"
                      :class="{ 'is-invalid': errors.lastName }"
                      type="text"
                      class="form-control  fnt-22"
                      placeholder=""
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                    />
                    <div
                      v-if="errors.lastName"
                      class="invalid-feedback  text-lg-right"
                    >
                      <strong>{{ errors.lastName[0] }}</strong>
                    </div>
                  </div>
                </div>
                <div class="form-group row fnt-22">
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for=""
                    >{{ $t('auth.username') }}</label
                  >
                  <div class="col-lg-6">
                    <input
                      ref="username"
                      v-model="form.username"
                      :class="{ 'is-invalid': errors.username }"
                      type="text"
                      class="form-control  fnt-22"
                      placeholder=""
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                    />
                    <div
                      v-if="errors.username"
                      class="invalid-feedback  text-lg-right"
                    >
                      <strong>{{ errors.username[0] }}</strong>
                    </div>
                  </div>
                </div>
                <div class="form-group row fnt-22">
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for=""
                    >{{ $t('auth.email') }}</label
                  >
                  <div class="col-lg-6">
                    <input
                      v-model="form.email"
                      :class="{ 'is-invalid': errors.email }"
                      type="text"
                      class="form-control fnt-22"
                      placeholder=""
                      autocomplete="off"
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                    />
                    <div
                      v-if="errors.email"
                      class="invalid-feedback text-lg-right"
                    >
                      <strong>{{ errors.email[0] }}</strong>
                    </div>
                  </div>
                </div>
                <div class="form-group row fnt-22">
                  <label
                    class="col-lg-4 col-form-label text-lg-right "
                    for=""
                    >{{ $t('auth.password') }}</label
                  >
                  <div class="col-lg-6">
                    <input
                      v-model="form.password"
                      :class="{ 'is-invalid': errors.password }"
                      type="password"
                      class="form-control  fnt-22"
                    />
                    <div
                      v-if="errors.password"
                      class="invalid-feedback text-lg-right"
                    >
                      <strong>{{ errors.password[0] }}</strong>
                    </div>
                  </div>
                </div>
                <div class="form-group row pb-0  ">
                  <div class="col-lg-6 offset-lg-4">
                    <button-block :colors="dashboard.pattern" class="my-1 m-l-0"
                      ><span class="fnt-24 text-sys">{{
                        $t('auth.register')
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
    <div id="pager3" class=""></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'initDark',
  middleware: ['initGuest'],
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      },
      lang: '#fff'
    }
  },
  computed: {
    ...mapGetters({})
  },
  mounted() {
    this.resetError()
    this.setFocus()
    this.fix75()
  },
  methods: {
    register() {
      this.form.host = this.host
      this.form.init = true
      this.form.locale = this.locale
      this.$axios
        .$post('auth/register', this.form)
        .then(response => {
          if (!response.data.roles.includes('member')) {
            this.form.user = response.data.id
            this.$axios.post('init/member', this.form)
          }
          this.$router.push({ path: this.localePath('/init/login') })
          setTimeout(() => {
            this.mtoast(response.message)
          }, 400)
        })
        .catch(() => {
          const message = this.$t('errors.input failed')
          this.mtoast(message)
        })
    }
  }
}
</script>

<style lang="css"></style>
