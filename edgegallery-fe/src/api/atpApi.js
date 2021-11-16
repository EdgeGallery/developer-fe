
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

const URL_PREFIX = '/mec-atp/edgegallery/atp/v2/'

let testAppApi = {
  getAllSceneApi: function () {
    return GET(URL_PREFIX + 'testscenarios?limit=12&offset=0')
  },
  getSceneIconApi: function (appId) {
    return GET(URL_PREFIX + 'apps/' + appId)
  },
  getSceneCaseApi: function (params) {
    return POST(URL_PREFIX + 'testscenarios/testcases', params)
  },
  runTaskApi: function (taskId, params) {
    return POST(URL_PREFIX + 'tasks/' + taskId + '/action/run', params)
  },
  getTaskApi: function (taskId) {
    return GET(URL_PREFIX + 'tasks/' + taskId)
  },
  modifyStatusApi: function (taskId, params) {
    return PUT(URL_PREFIX + 'tasks/' + taskId + '/testcase', params)
  },
  contributionApi: function (params) {
    return POST(URL_PREFIX + 'contributions', params)
  },
  uploadReportApi: function (taskId, params) {
    return POST(URL_PREFIX + 'tasks/' + taskId + '/action/upload-report', params)
  }
}

export {
  URL_PREFIX, testAppApi
}
