
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

function GET (url, params) {
  return commonGetRequest(url, params)
}
function commonPostRequest (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    }).then((res) => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

function POST (url, params) {
  return commonPostRequest(url, params)
}

function DELETE (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
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

function commonPutRequest (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    }).then((res) => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

function PUT (url, params) {
  return commonPutRequest(url, params)
}

export {
  GET,
  PUT,
  POST,
  DELETE
}
