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
let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE2MzgyODYzMzUsInNzb1Nlc3Npb25JZCI6IkMxRDk4MTI4RkFCNTg2QjZEM0U3ODg0QTc5MTNFQjhBIiwidXNlck5hbWUiOiJhZG1pbiIsInVzZXJJZCI6IjM5OTM3MDc5LTk5ZmUtNGNkOC04ODFmLTA0Y2E4YzRmZTA5ZCIsImF1dGhvcml0aWVzIjpbIlJPTEVfTEFCX0FETUlOIiwiUk9MRV9ERVZFTE9QRVJfQURNSU4iLCJST0xFX0FQUFNUT1JFX0FETUlOIiwiUk9MRV9NRUNNX0FETUlOIiwiUk9MRV9BVFBfQURNSU4iXSwianRpIjoiMDgxMjk0OTgtYThjMC00NmE3LTgzNmMtYWI3NDdkODY3NDI3IiwiY2xpZW50X2lkIjoiZWRnZWdhbGxlcnktZmUiLCJlbmFibGVTbXMiOiJmYWxzZSIsImVuYWJsZU1haWwiOiJmYWxzZSJ9.DFdt_RX3V89BwbkThIDSEOirtfMXaYejQt3J-XadOa5M4qUsR_ZpR_xqYbGYYUJissYtT5QRf2jkcgm-wFABYCQk86sDiLY4OzolBvIDyWmsWVFRarHXRH41WsnpChvWFP-RnLBK9kcqnWXShULEp1fED0j_eIzwtuMi5QLdj1Be69Iqs2rY8ZD0dOPVvaNi5U0Sm5MWfcfg-XrJ8EMF0udUdsB3hJSC2ti8SEc8nma7muIj6_D7DHzQyGDLPRvA7befmHQxHNMDLKh3RGVpapDtookbKc7eQgkOGUjVdfxwncJlxC2YKs9zIUaQM-nwQJLakrfelMcO-aLyTo8ZeA'
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
        'access_token': token
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
        'access_token': token
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
        'access_token': token
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
        'access_token': token
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
