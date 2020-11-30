/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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
import ElementUI from 'element-ui'
import i18n from '../locales/i18n.js'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

const urlPrefix = '/mec-developer/'
const urlPrefixTool = '/toolchain/'

let codeErr = false

function getCookie (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}

function Get (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
  }
  return new Promise((resolve, reject) => {
    axios.get(prefixUrl + url, {
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        codeErr = true
        console.log(err.response)
        reject(err)
        ElementUI.Message.error(i18n.t('promptMessage.getDataFail'))
      })
  })
}

function GetFun (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
  }
  return new Promise((resolve, reject) => {
    axios.get(prefixUrl + url, {
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function Delete (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
  }
  return new Promise((resolve, reject) => {
    axios.delete(prefixUrl + url, {
      params: params,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
        if (err.response.data.code === 403) {
          ElementUI.Message.error(i18n.t('promptMessage.guestPrompt'))
        }
      })
  })
}

function Post (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
  }
  return new Promise((resolve, reject) => {
    axios.post(prefixUrl + url, params, {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
        if (err.response.data.code === 403) {
          ElementUI.Message.error(i18n.t('promptMessage.guestPrompt'))
        }
      })
  })
}

function Put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(urlPrefix + url, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
        if (err.response.data.code === 403) {
          ElementUI.Message.error(i18n.t('promptMessage.guestPrompt'))
        }
      })
  })
}

function downloadFile ({ url, params, type = 'application/x-compressed' }) {
  axios.post(urlPrefix + url, params, {
    responseType: 'arraybuffer'
  }).then(res => {
    let blob = new Blob([res.data], { type: type })
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveBlob(blob)
    } else {
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.click()
    }
  }).catch(err => {
    if (err.response.data.code === 403) {
      ElementUI.Message.error(i18n.t('promptMessage.guestPrompt'))
    }
  })
}

function downLoadReport ({ url, reportId }) {
  axios({
    method: 'get',
    url: urlPrefixTool + url,
    responseType: 'blob'
  }).then((data) => {
    if (!data) {
      return
    }
    let objectUrl = window.URL.createObjectURL(data.data)
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = objectUrl
    link.setAttribute('download', reportId + '.csv')
    document.body.appendChild(link)
    link.click()
  })
}

function logoutApi () {
  return axios({
    method: 'POST',
    url: '/logout',
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
    url: '/auth/login-info',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export {
  Get,
  Post,
  Put,
  Delete,
  urlPrefix,
  urlPrefixTool,
  downloadFile,
  downLoadReport,
  logoutApi,
  loginApi,
  codeErr,
  GetFun
}
