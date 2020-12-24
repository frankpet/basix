export const state = () => ({
  toasts: [],
  toast: {}
})

export const getters = {
  getToasts(state) {
    return state.toasts
  }
}

export const mutations = {
  SET_TOAST_P(state, toast) {
    const obj = {}
    obj.message = toast
    obj.id = state.toasts.length
    obj.show = true
    state.toasts.push(obj)
  },
  SET_TOAST_S(state, toast) {
    state.toasts.shift()
  }
}

export const actions = {}
