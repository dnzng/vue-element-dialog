import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
// import VueElementDialog from '../src'
import VueElementDialog from '../dist/index.js'

import './styles/index.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'mini' })
Vue.use(VueElementDialog, {
  center: true
})

new Vue({
  render: (h) => h(App)
}).$mount('#app')
