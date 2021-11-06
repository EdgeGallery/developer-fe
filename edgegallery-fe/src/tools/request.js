
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
let accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE2MzYyMDQwMzIsInNzb1Nlc3Npb25JZCI6IkFGNjkzMzFBNUM3OTkxRjgyMjhBNDc1MjhCNzk1MzZCIiwidXNlck5hbWUiOiJhZG1pbiIsInVzZXJJZCI6IjM5OTM3MDc5LTk5ZmUtNGNkOC04ODFmLTA0Y2E4YzRmZTA5ZCIsImF1dGhvcml0aWVzIjpbIlJPTEVfTEFCX0FETUlOIiwiUk9MRV9ERVZFTE9QRVJfQURNSU4iLCJST0xFX0FQUFNUT1JFX0FETUlOIiwiUk9MRV9NRUNNX0FETUlOIiwiUk9MRV9BVFBfQURNSU4iXSwianRpIjoiMGVhNTllOTMtMDcyZS00ZGM1LThiNWUtMmY3MjA4Zjc5M2Q1IiwiY2xpZW50X2lkIjoiZGV2ZWxvcGVyLWZlIiwiZW5hYmxlU21zIjoiZmFsc2UiLCJlbmFibGVNYWlsIjoiZmFsc2UifQ.k_gklzC6vz_0a5aC0tVdd8RMk424Eke-DNKNEKYBTo3Nf4BSheE7mTqaH-EiZ7HJS5OcjEKt-itakWeVG0xrBYJrELx1Nbm7vL8-LGukwwp7iiZ4U0hSAaV9pjMJygZ_1qTaaUh5tfVVqs-WNy7fkc6RKpbfmLzG3pUKA5G-vkeSOnnVFYVlvx6p2_rOOj6hJopsjTG-cwVNnmUR0994jdQGS1rZT0YnQ7LhgtBHbb-M1NxD6iBYImNW4DDPTjpNJqmx86e8JVUtiOKibVMvV9yyg__hHxHwanVFKwzmqQ3FNA0i9q1LhK2ldwg50Z_mX_9tVeoQgta9AyBMUW6Mow'

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
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'access_token': accessToken
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
