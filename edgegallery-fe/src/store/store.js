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
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTab: sessionStorage.getItem('activeTab'),
    keyValue: sessionStorage.getItem('keyValue'),
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
    currentFlow: sessionStorage.getItem('currentFlow') || '0',
    zoom: sessionStorage.getItem('zoom') || '2',
    appName: sessionStorage.getItem('appName') ? sessionStorage.getItem('appName') : '5G',
    currentAppListTemp: JSON.parse(sessionStorage.getItem('currentAppList')) || []
  },
  mutations: {
    changeTab (state, data) {
      state.activeTab = data
      sessionStorage.setItem('activeTab', data)
    },
    getKeyValue (state, data) {
      state.keyValue = data
      sessionStorage.setItem('keyValue', data)
    },
    changelanguage (state, data) {
      state.language = data
    },
    changeZoom (state, data) {
      state.zoom = data
      sessionStorage.setItem('zoom', data)
    },
    changeFlow (state, data) {
      state.currentFlow = data
      sessionStorage.setItem('currentFlow', data)
    },
    changeApp (state, data) {
      state.appName = data
      sessionStorage.setItem('appName', data)
    },
    currentAppList (state, data) {
      state.currentAppListTemp = data
      sessionStorage.setItem('currentAppList', JSON.stringify(data))
    }
  },
  actions: {

  }
})
