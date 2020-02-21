import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './locales/i18n.js'

import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/common.css'
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(VCharts)
Vue.use(ElementUI, { locale })
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
