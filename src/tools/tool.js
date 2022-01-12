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

import axios from 'axios'
import Vue from 'vue'
import ElementUI from 'element-ui'
import i18n from '../locales/i18n.js'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import {
  PROXY_PREFIX_CURRENTSERVER
} from './constant.js'
Vue.use(VueCookies)

const urlPrefix = PROXY_PREFIX_CURRENTSERVER + '/mec-developer/'
const urlPrefixTool = PROXY_PREFIX_CURRENTSERVER + '/toolchain/'
const urlPrefixAppstore = PROXY_PREFIX_CURRENTSERVER + '/mec-appstore/'
const URL_PREFIX_GATEWAY = PROXY_PREFIX_CURRENTSERVER + '/mec/res/v2/'

let accessToken = JSON.stringify(sessionStorage.getItem('accessToken'))
let codeErr = false

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
        'Content-Type': 'application/json',
        'access_token': accessToken
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        guestPrompt(reject, err)
      })
  })
}

function guestPrompt (reject, err) {
  reject(err)
  if (err.response.data.code === 403) {
    ElementUI.Message.error(i18n.t('promptMessage.guestPrompt'))
  }
}

function Post (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  if (type === 'appstore') {
    prefixUrl = urlPrefixAppstore
  } else if (type !== 'developer') {
    prefixUrl = urlPrefixTool
  }
  return new Promise((resolve, reject) => {
    axios.post(prefixUrl + url, params, {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'access_token': accessToken
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        guestPrompt(reject, err)
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
        guestPrompt(reject, err)
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

function uniqueArray (arrData) {
  let _resultData = []
  for (let item of arrData) {
    if (_resultData.indexOf(item) === -1) {
      _resultData.push(item)
    }
  }
  return _resultData
}

function commonGetRequest (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

function GETRESCODE (url, params) {
  let baseUrl = URL_PREFIX_GATEWAY + url
  return commonGetRequest(baseUrl, params)
}

export {
  Get,
  Post,
  Put,
  Delete,
  urlPrefix,
  urlPrefixTool,
  urlPrefixAppstore,
  downloadFile,
  downLoadReport,
  logoutApi,
  loginApi,
  codeErr,
  GetFun,
  uniqueArray,
  getCookie,
  GETRESCODE
}
