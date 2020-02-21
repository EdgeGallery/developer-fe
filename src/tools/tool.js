import axios from 'axios'
import { MessageBox } from 'element-ui'
import i18n from '../locales/i18n.js'
import 'element-ui/lib/theme-chalk/index.css'

const URL_PREFIX = 'http://159.138.61.155:9080/'
// const URL_PREFIX = 'http://159.138.36.16:9080/'
// const URL_PREFIX = 'http://10.181.156.52:8090/'

function getuserId () {
  let userJsonStr = sessionStorage.getItem('user')
  let user = JSON.parse(userJsonStr)
  return user.userId
}
function getToken () {
  let strCookie = document.cookie
  let arrCookie = strCookie.split(';')
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=Basic')
    if (arr[0].trim() === 'token') {
      return 'Basic ' + arr[1]
    }
  }
  return ''
}

let codeErr = false
function getCode (err, resolve) {
  let resCode = err.response.status ? err.response.status : false
  if (resCode) {
    if (resCode === 401) {
      codeErr = true
      MessageBox.confirm(i18n.t('promptMessage.loginexpired'), {
        confirmButtonText: i18n.t('common.confirm'),
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      }).then(() => {
        window.location.href = '/'
      })
    } else {
      resolve(err)
    }
  } else {
    resolve(err)
  }
}

function Get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(URL_PREFIX + url, {
      params: params,
      headers: {
        'Authorization': getToken(),
        'userId': getuserId()
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err.response)
        getCode(err, resolve)
        // reject(err)
      })
  })
}

function Delete (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(URL_PREFIX + url, {
      params: params,
      headers: {
        'Authorization': getToken(),
        'userId': getuserId()
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        getCode(err, resolve)
      })
  })
}

function Post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(URL_PREFIX + url, params, {
      headers: {
        'Authorization': getToken(),
        'userId': getuserId()
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        getCode(err, resolve)
      })
  })
}

function Put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(URL_PREFIX + url, params, {
      headers: {
        'Authorization': getToken(),
        'userId': getuserId()
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        getCode(err, resolve)
      })
  })
}

function downloadFile ({ url, params, type = 'application/x-compressed' }) {
  axios.post(URL_PREFIX + url, params, {
    responseType: 'arraybuffer',
    headers: {
      'Authorization': getToken(),
      'userId': getuserId()
    }
  }).then(res => {
    let blob = new Blob([res.data], { type: type })
    if ('msSaveOrOpenBlob' in navigator) {
      window.navigator.msSaveBlob(blob)
    } else {
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.click()
    }
  })
}

export {
  Get,
  Post,
  codeErr,
  getuserId,
  getToken,
  Put,
  Delete,
  URL_PREFIX,
  downloadFile
}
