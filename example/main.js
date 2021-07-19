import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import Dialog from '@'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mini' })
Vue.use(Dialog)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
