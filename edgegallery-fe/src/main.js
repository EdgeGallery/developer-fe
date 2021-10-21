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
import router from './classic/router/router.js'
import store from './classic/store/store.js'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './classic/locales/i18n.js'
import VueCookies from 'vue-cookies'
import 'eg-view/src/assets/style/element-variables.scss'
import 'eg-view/src/assets/style/normal.css'
import '../src/classic/assets/css/common.css'

Vue.use(ElementUI, { locale })
Vue.use(VueCookies)

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
