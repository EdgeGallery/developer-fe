
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
  GET,
  POST,
  PUT
} from '../tools/request.js'
import {
  PROXY_PREFIX_CURRENTSERVER
} from '../tools/constant.js'

const URL_PREFIX_ATP = PROXY_PREFIX_CURRENTSERVER + '/mec-atp/edgegallery/atp/v2/'

let atpApi = {
  getAllSceneApi: function () {
    return GET(URL_PREFIX_ATP + 'testscenarios?limit=12&offset=0')
  },
  getSceneIconApi: function (appId) {
    return GET(URL_PREFIX_ATP + 'apps/' + appId)
  },
  getSceneCaseApi: function (params) {
    return POST(URL_PREFIX_ATP + 'testscenarios/testcases', params)
  },
  runTaskApi: function (taskId, params) {
    return POST(URL_PREFIX_ATP + 'tasks/' + taskId + '/action/run', params)
  },
  getTaskApi: function (taskId) {
    return GET(URL_PREFIX_ATP + 'tasks/' + taskId)
  },
  modifyStatusApi: function (taskId, params) {
    return PUT(URL_PREFIX_ATP + 'tasks/' + taskId + '/testcase', params)
  },
  contributionApi: function (params) {
    return POST(URL_PREFIX_ATP + 'contributions', params)
  },
  uploadReportApi: function (taskId, params) {
    return POST(URL_PREFIX_ATP + 'tasks/' + taskId + '/action/upload-report', params)
  }
}

export {
  URL_PREFIX_ATP, atpApi
}
