export default function({ store, redirect, app }) {
  const locale = store.getters['i18n/getLanguage']
  if (store.getters['init/getInit']) {
    return redirect('/' + locale + '/')
  }
}
