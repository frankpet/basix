export default function({ store, redirect, app }) {
  const locale = store.getters['i18n/getLanguage']
  const check = store.getters['init/getInit']
  console.log(check)
  if (store.getters['init/getInit']) {
    return redirect('/' + locale + '/message')
  }
}
