export default function({ store, redirect }) {
  const locale = store.getters['i18n/getLanguage']
  if (store.getters.authenticated) {
    if (store.getters['init/getInit']) {
      return redirect('/' + locale + '/message')
    } else {
      return redirect('/' + locale + '/init/init')
    }
  } else if (store.getters['init/getInit']) {
    return redirect('/' + locale + '/')
  }
}
