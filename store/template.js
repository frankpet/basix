export const state = () => ({
  template: null,
  override: false, // override dashStart
  dashStart: '', // sets Start page/dashboard (see middleware)
  dashActive: null, // set active dashboard ( by navigation)
  dashboard: {
    pattern: {
      light: process.env.LIGHT,
      dark: process.env.DARK,
      link: process.env.LINK,
      linkActive: process.env.LINK_ACTIVE,
      active: process.env.ACTIVE,
      button: process.env.BUTTON,
      border: process.env.BORDER,
      shadow: process.env.SHADOW
    }
  },
  refresh: false,
  reset: false
})

export const getters = {
  getTemplate(state) {
    return state.template
  },

  getOverride(state) {
    return state.override
  },
  getStart(state) {
    return state.dashStart
  },
  getDashActive(state) {
    return state.dashActive
  },
  getDashboard(state) {
    return state.dashboard
  },
  getRefresh(state) {
    return state.refresh
  },
  getReset(state) {
    return state.reset
  }
}

export const mutations = {
  SET_TEMPLATE(state, template) {
    state.template = template
    template.dashboards.forEach(dashboard => {
      if (dashboard.is_start) {
        state.dashStart = dashboard.name
      }
    })
  },

  SET_OVERRIDE(state, override) {
    state.override = override
  },
  SET_DASHACTIVE(state, dash) {
    state.dashActive = dash
    state.reset = true
  },
  SET_DASHBOARD(state, dash) {
    state.dashboard = dash
  },
  SET_REFRESH(state, refresh) {
    state.refresh = refresh
  },
  SET_RESET(state, reset) {
    state.reset = reset
  }
}

export const actions = {
  SET_TEMPLATE(context, host, locale) {
    this.$axios.$get(`${host}/template?locale=${locale}`).then(response => {
      context.commit('SET_TEMPLATE', response.data)
    })
  },
  SET_DASHBOARD(context, host, locale, dash) {
    this.$axios
      .$get(`${host}/dashboard/${dash}?locale=${locale}`)
      .then(response => {
        context.commit('SET_DASHBOARD', response.data)
      })
  }
}
