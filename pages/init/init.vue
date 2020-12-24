<template>
  <div class="container-fluid py-4">
    <div ref="element">
      <div class="row">
        <div class="col-md-8   mx-auto ">
          <transition name="slowfade">
            <div v-if="showText" class="text-block">
              <p class="fnt-40 text-center text-white fnt-montserrat">
                {{ $t('auth.user') }} :
                <strong class="fnt-44">{{ user.name }}</strong>
              </p>
              <p
                v-if="!user.sites.length"
                class="text-caplight fnt-20 fnt-montserrat mt-2 p-1 text-center"
              >
                {{ $t('init.description') }}
              </p>
              <p
                v-else
                class="text-caplight fnt-20 fnt-montserrat mt-2 p-1 text-center"
              >
                {{ $t('init.link') }}
              </p>
            </div>
          </transition>

          <b-card class=" mt-5 shadow-lg bg-caplight ami-fade-down ">
            <b-card-header
              class="bg-capdark text-caplight text-center p-1 shadow"
            >
              <h3 class="m-0 p-1 ">Sites</h3>
            </b-card-header>
            <div class="card-body px-4">
              <div class="fnt-24 p-0 m-0 ml-1">
                <a @click.prevent="createForm()">
                  <button-rnd
                    v-if="!creating.active && countCreated < 1"
                    size="34"
                    ><fa :icon="['fas', 'plus']" class="fnt-18"></fa
                  ></button-rnd>
                  <button-rnd
                    v-if="creating.active & (countCreated < 1)"
                    size="34"
                    ><fa :icon="['fas', 'reply']" class="fnt-18"></fa
                  ></button-rnd>
                </a>
              </div>
              <transition name="expand">
                <div
                  v-if="creating.active && countCreated < 1"
                  class="container bg-caplight shadow border border-mgrey p-3 rounded mt-3 create-block"
                >
                  <form @submit.prevent="createSite()" class="">
                    <div class="form-group row fnt-20 p-1 px-3">
                      <label
                        class="col-lg-4 col-form-label text-lg-right pl-0"
                        for=""
                        >{{ $t('site.name') }}</label
                      >
                      <input
                        ref="inputfocus"
                        v-model="creating.form.name"
                        :class="{ 'is-invalid': creating.errors.name }"
                        type="text"
                        class="form-control fnt-20 col-lg-5"
                        placeholder=""
                      />
                      <div
                        v-if="creating.errors.name"
                        class="invalid-feedback col-md-9 text-lg-right"
                      >
                        <strong>{{ creating.errors.name[0] }}</strong>
                      </div>
                    </div>

                    <div class="form-group row mx-0 px-0 m-t-40 mb-0 pb-0">
                      <button-block class="my-1"
                        ><span class="fnt-24">{{
                          $t('site.create')
                        }}</span></button-block
                      >
                    </div>
                  </form>
                </div>
              </transition>
              <div class="row mt-1 px-3">
                <div
                  v-if="user.sites.length && showSites"
                  class="table-responsive col-md-10 p-2 mx-auto"
                >
                  <table cellspacing="0" class="table w-max-600 mx-auto ">
                    <tbody class="text-capdark">
                      <tr
                        v-for="record in user.sites"
                        :key="record.id"
                        class="border-bottom border-capdark p-0 m-0"
                      >
                        <td class="p-0 pt-2  m-0 fnt-28 border-0">
                          {{ record.name }}
                        </td>
                        <td
                          class="p-0 m-0 text-center border-0"
                          style="width: 15%;"
                        >
                          <a
                            @click.prevent="createHost(record)"
                            v-if="record.is_migrated"
                            class=""
                          >
                            <button-rnd size="32" class="py-1 px-auto "
                              ><fa :icon="['fas', 'link']" class="fnt-16 "></fa
                            ></button-rnd>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
  // middleware: ['initAuth', 'notInit'],
  data() {
    return {
      hider: false,
      creating: {
        active: false,
        errors: [],
        form: {}
      },
      creatingHost: {
        form: {}
      },
      countCreated: 0,
      showText: false,
      showSites: true,
      showPage: false,
      migrated: false,
      counter: 0
    }
  },
  computed: {
    ...mapGetters({}),
    roles() {
      return this.user.roles
    },
    sites() {
      return this.user.sites
    }
  },
  mounted() {
    this.showPage = true
    this.hider = true
    this.initPage()
    this.showText = true
  },
  methods: {
    initPage() {
      // this.fix75()
    },
    createForm() {
      this.creating.active = !this.creating.active
      this.creating.form = {}
      if (this.creating.active) {
        this.setFocus()
        this.showSites = false
      }
    },
    createSite() {
      this.creating.form.locale = this.locale
      this.$axios
        .$post(`admin/data/sites`, this.creating.form)
        .then(response => {
          this.$axios.$get(`auth/me`).then(response => {
            this.$store.commit('SET_USER', response.data)
          })

          setTimeout(() => {
            this.countCreated++
            this.showSites = true
            this.creating.active = false
            setTimeout(() => {
              this.checkMigration(response.data)
              this.mtoast(response.message, {})
            }, 1000)
          }, 10)
        })
        .catch(() => {
          this.creating.errors = this.errors
          this.mtoast(this.$t('errors.input failed'))
        })
    },
    checkMigration(site) {
      if (this.counter < 10) {
        setTimeout(() => {
          this.$axios.$get(`admin/data/sites/${site.id}`).then(response => {
            if (!response.data.is_migrated) {
              this.counter++
              this.checkMigration(site)
            }
          })
        }, 1000)
      } else {
        this.mtoast(this.$t('errors.input failed'))
      }
    },
    createHost(record) {
      this.creatingHost.form.host = this.host
      this.creatingHost.form.site = record.id
      this.creatingHost.form.locale = this.locale
      this.$axios
        .$post(`admin/data/hosts`, this.creatingHost.form)
        .then(response => {
          this.$store.commit('init/SET_INIT', true)
          this.$store.commit('site/SET_SITE', response.site)
          this.$router.push({
            path: this.localePath('/dashboards/member/dashboard')
          })
          this.mtoast(response.message)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="css" scoped>
.text-block {
  opacity: 1;
}
.create-block {
  height: auto;
  max-height: 350px;
  opacity: 1;
}

.expand-enter-active {
  transition: max-height 0.25s ease-in-out, opacity 1.45s;
  overflow: hidden;
}

.expand-leave-active {
  transition: opacity 0.2s, max-height 0.1s 0.2;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.slowfade-enter-active,
.slowfade-leave-active {
  transition: opacity 1.7s 1.2s;
}
.slowfade-enter, .slowfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
