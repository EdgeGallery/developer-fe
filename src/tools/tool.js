import axios from 'axios'
import { MessageBox } from 'element-ui'
import i18n from '../locales/i18n.js'
import 'element-ui/lib/theme-chalk/index.css'

const urlPrefix = 'http://159.138.61.155:9080/'
const urlPrefixTool = 'http://159.138.61.155:8059/'
// const urlPrefix = 'http://159.138.36.16:9080/'
// const urlPrefix = 'http://10.181.156.52:8090/'

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

function Get (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  let headers = {
    'Authorization': getToken(),
    'userId': getuserId()
  }
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
    headers = {
      'Authorization': getToken()
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(prefixUrl + url, {
      params: params,
      headers
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

function Delete (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  let headers = {
    'Authorization': getToken(),
    'userId': getuserId()
  }
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
    headers = {
      'Authorization': getToken()
    }
  }
  return new Promise((resolve, reject) => {
    axios.delete(prefixUrl + url, {
      params: params,
      headers
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        getCode(err, resolve)
      })
  })
}

function Post (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  let header = {
    headers: {
      'Authorization': getToken(),
      'userId': getuserId()
    }
  }
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
    header = {
      headers: {
        'Authorization': getToken(),
        'Content-Type': 'application/json'
      }
    }
  }
  return new Promise((resolve, reject) => {
    axios.post(prefixUrl + url, params, header)
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
    axios.put(urlPrefix + url, params, {
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
  axios.post(urlPrefix + url, params, {
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

function downLoadReport ({ url, reportId }) {
  axios({
    method: 'get',
    url: urlPrefixTool + url,
    responseType: 'blob'
  }).then((data) => {
    if (!data) {
      return
    }
    let url = window.URL.createObjectURL(data.data)
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', reportId + '.csv')
    document.body.appendChild(link)
    link.click()
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
  urlPrefix,
  urlPrefixTool,
  downloadFile,
  downLoadReport
}
