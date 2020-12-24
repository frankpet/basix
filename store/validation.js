export const state = () => ({
  errors: {}
})

export const getters = {
  errors(state) {
    return state.errors
  }
}

export const mutations = {
  SET_VALIDATION_ERRORS(state, errors) {
    state.errors = errors
  },
  RESET_ERRORS(state, errors) {
    state.errors = {}
  }
}

export const actions = {
  setErrors(context, errors) {
    context.commit('SET_VALIDATION_ERRORS', errors)
  },
  clearErrors(context) {
    context.commit('SET_VALIDATION_ERRORS', {})
  }
}
