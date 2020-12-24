export const state = () => ({
  site: null,
  drag: '.handle'
})

export const getters = {
  getSite(state) {
    return state.site
  },

  getDrag(state) {
    return state.drag
  }
}

export const mutations = {
  SET_SITE(state, site) {
    state.site = site
  },

  SET_DRAG_ON(state) {
    state.drag = null
  },
  SET_DRAG_OFF(state) {
    state.drag = 'handle'
  }
}

export const actions = {}
