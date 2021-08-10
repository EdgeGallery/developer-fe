/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './locales/i18n.js'
import VueCookies from 'vue-cookies'
import uploader from 'vue-simple-uploader'
import 'eg-view/src/assets/style/element-variables.scss'
import 'eg-view/src/assets/style/normal.css'
import VCharts from 'v-charts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../src/assets/css/common.css'
import EgMessageBox from './components/common/MessageBox'

Vue.use(EgMessageBox)
Vue.use(VueAwesomeSwiper)
Vue.use(VCharts)
Vue.use(ElementUI, { locale })
Vue.use(mavonEditor)
Vue.use(VueCookies)
Vue.use(uploader)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
