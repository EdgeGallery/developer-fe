
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

// import {
//   GET,
//   POST,
//   PUT,
//   DELETE
// } from './request.js'

function formatDateTime (dateStr) {
  if (!dateStr) {
    return ''
  }
  let date = new Date(Date.parse(dateStr))
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let H = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  return Y +
      '-' +
      (M > 9 ? M : '0' + M) +
      '-' +
      (D > 9 ? D : '0' + D) +
      ' ' +
      (H > 9 ? H : '0' + H) +
      ':' +
      (m > 9 ? m : '0' + m) +
      ':' +
      (s > 9 ? s : '0' + s)
}
function promptJumpToClassic (path, next, _this) {
  if (path === '/appStore/home' || path === '/mecm/' || path === '/system') {
    _this.$eg_messagebox('点击确认跳转至经典版查看').then(() => {
      next()
    }).catch(() => {
      next(false)
    })
  } else {
    next()
  }
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
const CommonData = {
  port: '8080',
  protocol: 'ANY',
  address: '0.0.0.0/0',
  ip: '0.0.0.0',
  ttl: '85000'
}
export {
  formatDateTime,
  promptJumpToClassic,
  uniqueArray,
  CommonData
}
