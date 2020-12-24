export const state = () => ({
  status: null,
  message: {}
})

export const getters = {
  getStatus(state) {
    return state.status
  },
  getMessage(state) {
    return state.message
  }
}

export const mutations = {
  SET_MESSAGE(state, message) {
    state.message = message
  },
  SET_STATUS(state, status) {
    state.status = status
  }
}

export const actions = {}
