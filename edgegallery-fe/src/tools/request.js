
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

let accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE2MzYzOTk1NzUsInNzb1Nlc3Npb25JZCI6IjkxNEQzNDcwMTA0NTlCNTU3MUZBQ0E1ODE5MkY5OUNGIiwidXNlck5hbWUiOiJhZG1pbiIsInVzZXJJZCI6IjM5OTM3MDc5LTk5ZmUtNGNkOC04ODFmLTA0Y2E4YzRmZTA5ZCIsImF1dGhvcml0aWVzIjpbIlJPTEVfTEFCX0FETUlOIiwiUk9MRV9ERVZFTE9QRVJfQURNSU4iLCJST0xFX0FQUFNUT1JFX0FETUlOIiwiUk9MRV9NRUNNX0FETUlOIiwiUk9MRV9BVFBfQURNSU4iXSwianRpIjoiNzUxNTk5ZGYtYzg0YS00NmJlLTliNzMtY2U1NjAxYzlhZDIyIiwiY2xpZW50X2lkIjoibWVjbS1mZSIsImVuYWJsZVNtcyI6ImZhbHNlIiwiZW5hYmxlTWFpbCI6ImZhbHNlIn0.lQCfp__Ylyq4rSAVp5B3qg0HLud6cZmgTrRTCixynQI0qLnmK0L7JICTM_JajHBPo4tIxaS5vI_OwuWvqPzo67uFIsXBj-uooFsEb09gvwvMAo8yEzOFZjR1OeEEsIknZzT2bMsN7XG0SrxaFuQ16f1N7wc_t_NZkK_jBGluLHcIM9FZ7re44lOWnseBcfAP8yk2Da4up0pkbNys5w247Z9I08cmsymFGTNVaeQNe6jqehL-XY7o_zu9GCKS9lBFGlX8oduX5ubJSzMBanLQUdLYoU-QlfWpSUREFtiRFMB-JL2z13XorL8B8qAkBR5SoECGggjyY0GtSg2Z97C94A'

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
        'access_token': accessToken
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
