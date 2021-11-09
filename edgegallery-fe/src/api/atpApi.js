
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
  // DELETE
} from '../tools/request.js'

const URL_PREFIX = '/mec-atp/edgegallery/atp/v2/'

let Userpage = {
  getAllSceneApi: function () {
    let url = URL_PREFIX + 'testscenarios?limit=12&offset=0'
    return GET(url)
  },
  getSceneIconApi: function (appId) {
    let url = URL_PREFIX + 'apps/' + appId
    return GET(url)
  },
  getSceneCaseApi: function (params) {
    let url = URL_PREFIX + 'testscenarios/testcases'
    return POST(url, params)
  },
  runTaskApi: function (taskId, params) {
    let url = URL_PREFIX + 'tasks/' + taskId + '/action/run'
    return POST(url, params)
  },
  getTaskApi: function (taskId) {
    let url = URL_PREFIX + 'tasks/' + taskId
    return GET(url)
  },
  modifyStatusApi: function (taskId, params) {
    let url = URL_PREFIX + 'tasks/' + taskId + '/testcase'
    return PUT(url, params)
  },
  contributionApi: function (params) {
    let url = URL_PREFIX + 'contributions'
    return POST(url, params)
  },
  uploadReportApi: function (taskId, params) {
    let url = URL_PREFIX + 'tasks/' + taskId + '/action/upload-report'
    return POST(url, params, 'v2')
  }
}

export {
  URL_PREFIX, Userpage
}
