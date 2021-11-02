
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

import {
  // GET
  POST
  // PUT
  // DELETE
} from '../tools/request.js'

const URL_PREFIX = '/mec-appstore/mec/appstore/v1/'
const URL_PREFIXV2 = '/mec-appstore/mec/appstore/v2/'

let appstoreApi = {
  getAppDataApi: function (params) {
    let url = URL_PREFIXV2 + 'query/apps'
    return POST(url, params)
  }
}
export {
  URL_PREFIX, URL_PREFIXV2, appstoreApi
}
