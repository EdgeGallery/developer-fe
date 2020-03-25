import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

// const urlPrefix = 'http://159.138.61.155:9080/'
// const urlPrefixTool = 'http://159.138.61.155:8059/'
const urlPrefix = '/mec-developer/'
const urlPrefixTool = '/toolchain/'
const urlAuth = '/user-mgmt-be/v1/users/auth'
const urlUsers = '/user-mgmt-be/v1/users/'
const urlLogout = '/user-mgmt-be/v1/users/logout'

function Get (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
  }
  return new Promise((resolve, reject) => {
    axios.get(prefixUrl + url, {
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err.response)
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
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function Post (url, params, type = 'developer') {
  let prefixUrl = urlPrefix
  if (type !== 'developer') {
    prefixUrl = urlPrefixTool
  }
  return new Promise((resolve, reject) => {
    axios.post(prefixUrl + url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function Put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(urlPrefix + url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
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
  Put,
  Delete,
  urlPrefix,
  urlPrefixTool,
  urlAuth,
  urlUsers,
  urlLogout,
  downloadFile,
  downLoadReport
}
