import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import VueElementDialog from '@'
// import VueElementDialog from '../dist/VueElementDialog.umd'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mini' })
Vue.use(VueElementDialog, {
  width: '400px',
  center: true,
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
