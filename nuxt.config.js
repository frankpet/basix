const pkg = require('./package')
const env = require('dotenv').config()

module.exports = {
  mode: 'universal',
  env: env.parsed,


  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },


  loading: {
    color: '#3B8070', height:'0px' , duration:0, throttle: 0
  },


  css: [

  ],


  plugins: [
    './plugins/mixins/startmix',
    './plugins/axios',
    './plugins/host',
  ],


  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-vue-multiselect',
    ['nuxt-i18n-module', {
       languages: ['en', 'de','nl'],
       redirectDefaultLang : true,
       defaultLanguage:process.env.SITE_LOCALE
    }]
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'token' },
          logout: { url:'auth/logout', method: 'get' },
          user: { url:'auth/me', method: 'get', propertyName: 'data' },
        },
        tokenRequired: true,
        tokenType: 'bearer'
      },
    },
    redirect:{
      //callback:'/'
    },
    plugins: [
      'plugins/auth',
    ]
  },

  axios: {
    baseURL:process.env.API_URL,
  },


  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
