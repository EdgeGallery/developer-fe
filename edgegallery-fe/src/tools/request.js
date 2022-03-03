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
let cookie = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE2NDQ2MTMzMjcsInVzZXJOYW1lIjoiYWRtaW4iLCJzc29TZXNzaW9uSWQiOiI3MjYyQTk1Mzk3NkI5MUU1NTQ5QTNDNEUyQjg3OTExNyIsInVzZXJJZCI6IjM5OTM3MDc5LTk5ZmUtNGNkOC04ODFmLTA0Y2E4YzRmZTA5ZCIsImF1dGhvcml0aWVzIjpbIlJPTEVfTEFCX0FETUlOIiwiUk9MRV9ERVZFTE9QRVJfQURNSU4iLCJST0xFX0FQUE1HTVRfQURNSU4iLCJST0xFX0FQUFNUT1JFX0FETUlOIiwiUk9MRV9NRUNNX0FETUlOIiwiUk9MRV9BVFBfQURNSU4iXSwianRpIjoiZDA3YWRmZjUtMzU1OC00YmIxLWJlNWUtY2UzNzYzOGVhYWMyIiwiY2xpZW50X2lkIjoiZWRnZWdhbGxlcnktZmUiLCJlbmFibGVTbXMiOiJmYWxzZSIsImVuYWJsZU1haWwiOiJmYWxzZSIsImVuYWJsZUV4dGVybmFsSWFtIjpmYWxzZX0.WaK6jjZqjRxz8XhZw9WyJLpMShi0FtjTrtFX03Q-2hK5lVuHpzFej4t3V49VC_imX4fVQNOY3hvv5RrB1fY8OlBrfuv-0f19dw0Afxayy9QisOaQ_4Nsdzwhx_XhlbQCAUWCIPx_YUUTJaxyw5nlGxIOYXx8qyim-VPddX9izrXOD52dWK61CkbgCQgfpZXc1BTvvoIc-N5a-TnhiXV03Zw1PqdGkfSVWbI9IpClm-UgSK1d54JgdXdxiPPVXeW54vNjRpCu6p6y_E9buFhKb-VyptXZRDzrClNqrAB3KLJ0V1HnAjQuQj11UKIJsi1UWTUiqAEBucIcXldNAVZCVw'
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
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'access_token': cookie
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
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'access_token': cookie
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
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'access_token': cookie
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
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'access_token': cookie
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
