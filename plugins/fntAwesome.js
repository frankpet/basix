import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faReply } from '@fortawesome/free-solid-svg-icons/faReply'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons/faEdit'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default () => {
  library.add(faEdit, faReply)
  Vue.component('fa', FontAwesomeIcon)
}
