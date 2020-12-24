export const state = () => ({})

export const getters = {
  authenticated(state) {
    return state.auth.loggedIn
  },
  getUser(state) {
    return state.auth.user
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.auth.user = user
  }
}
