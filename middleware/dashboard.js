export default function({ store, redirect, params }) {
  const locale = store.getters['i18n/getLanguage']
  const roles = store.getters['init/getRoles']
  const user = store.getters.getUser
  const dashboard = roles.filter(item => item.name === params.dashboard)
  if (store.getters.authenticated) {
    if (
      !user.roles.some(item => item.name === params.dashboard) &&
      !user.roles.some(item => item.name === 'system')
    ) {
      return redirect('/' + locale + '/message')
    }
  } else {
    // return redirect('/' + locale + '/message')
  }

  if (dashboard.length === 0) {
    return redirect('/' + locale + '/message')
  } else if (store.getters.authenticated) {
    if (dashboard[0].level > user.level) {
      return redirect('/' + locale + '/message')
    }
  } else {
    return redirect('/' + locale + '/auth/login')
  }
}
