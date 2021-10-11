
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

import {
  GET,
  POST,
  PUT,
  DELETE
} from './requset.js'
const URL_SYSTEM = '/mec-appstore' + '/mec/appstore/v1/thirdsystem'

let system = {
  systemNum: function (params) {
    let url = URL_SYSTEM + '/count'
    return POST(url, params)
  },
  getOneSystem: function (params) {
    let url = URL_SYSTEM + '/systemType/' + params
    return GET(url)
  },
  addSystems: function (params) {
    let url = URL_SYSTEM
    return POST(url, params)
  },
  updateSystems: function (params) {
    let url = URL_SYSTEM
    return PUT(url, params)
  },
  deleteSystems: function (params) {
    let url = URL_SYSTEM + '/' + params
    return DELETE(url)
  },
  searchSystem: function (params) {
    let url = URL_SYSTEM + '/nameLike/' + params
    return GET(url)
  }
}
export {
  system,
  URL_SYSTEM
}
