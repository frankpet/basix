export const state = () => ({
  init: true,
  host: null,
  roles: []
})

export const getters = {
  getInit(state) {
    return state.init
  },
  getRoles(state) {
    return state.roles
  },
  getHost(state) {
    return state.host
  }
}

export const mutations = {
  SET_INIT(state, init) {
    state.init = init
  },
  SET_HOST(state, host) {
    state.host = host
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  }
}
export const actions = {
  SET_ROLES(context, host, locale) {
    this.$axios
      .$get(`${host}/admin/data/roles?locale=${locale}`)
      .then(response => {
        context.commit('SET_ROLES', response.data)
      })
  }
}
