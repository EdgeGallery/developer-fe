/*
 *  Copyright 2021 Huawei Technologies Co., Ltd.
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
import * as echarts from 'echarts'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './locales/i18n.js'
import VueCookies from 'vue-cookies'
import 'eg-view/src/assets/style/element-variables.scss'
import 'eg-view/src/assets/style/normal.css'
import htmlToPdf from './tools/htmlToPdf'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import EgMessageBox from '../src/components/MessageBox/index.js'
import uploader from 'vue-simple-uploader'
import '../src/assets/css/common.css'
Vue.prototype.bus = new Vue()

Vue.use(ElementUI, { locale })
Vue.prototype.$echarts = echarts
Vue.use(VueCookies)
Vue.use(EgMessageBox)
Vue.use(mavonEditor)
Vue.use(VueAwesomeSwiper)
Vue.use(uploader)
Vue.use(htmlToPdf)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

router.afterEach(() => {
  window.scrollTo(0, 0)
})
