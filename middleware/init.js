export default function({ store, redirect, app }) {
  const locale = store.getters['i18n/getLanguage']
  const template = store.getters['template/getTemplate']

  let url = ''
  if (store.getters['init/getInit']) {
    template.dashboards.forEach(dashboard => {
      if (dashboard.is_start) {
        url = dashboard.name
      }
    })
    if (url === 'site') {
      // no redirect
    } else if (!store.getters['template/getOverride']) {
      store.commit('template/SET_DASHACTIVE', url)
      return redirect('/' + locale + '/dashboards/' + url + '/dashboard')
    } else {
      // no redirect
    }
  } else {
    return redirect('/' + locale + '/message')
  }
}
