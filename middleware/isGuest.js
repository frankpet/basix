export default function({ store, redirect }) {
  const locale = store.getters['i18n/getLanguage']
  if (store.getters.authenticated) {
    return redirect('/' + locale + '/')
  }
}
