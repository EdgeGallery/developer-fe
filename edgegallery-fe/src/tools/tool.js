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

import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import {
  PROXY_PREFIX_CURRENTSERVER
} from './constant.js'
Vue.use(VueCookies)

function getCookie (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

function logoutApi () {
  return axios({
    method: 'POST',
    url: PROXY_PREFIX_CURRENTSERVER + '/logout',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    }
  })
}

function loginApi () {
  return axios({
    method: 'GET',
    url: PROXY_PREFIX_CURRENTSERVER + '/auth/login-info',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

function healthCheck (url) {
  return axios({
    method: 'GET',
    url: url,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    },
    timeout: 3000
  })
}

export {
  logoutApi,
  loginApi,
  healthCheck,
  getCookie
}
