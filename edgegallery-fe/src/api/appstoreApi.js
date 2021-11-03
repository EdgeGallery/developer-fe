
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
  },
  getCommentsApi: function (appId, limit, offset) {
    let url = URL_PREFIXV2 + 'apps/' + appId + '/comments?limit=' + limit + '&offset=' + offset
    return GET(url)
  },
  submitAppCommentApi: function (appId, params, userId, userName) {
    let url = URL_PREFIX + 'apps/' + appId + '/comments?userId=' + userId + '&userName=' + userName
    return POST(url, params)
  },
  getNodePort: function (appId, packageId, userId, name, ip) {
    let url = URL_PREFIX + 'experience/deploy?appId=' + appId + '&packageId=' + packageId + '&userId=' + userId + '&name=' + name + '&ip=' + ip
    return GET(url)
  },
  getThirdSystemByType: function (type) {
    let url = URL_PREFIX + 'thirdsystem/systemType/' + type
    return GET(url, '')
  },
  getProgressByPackageId: function (packageId) {
    let url = URL_PREFIX + 'upload_progress/package/' + packageId
    return GET(url, '')
  },
  synchronizedPakageApi: function (currentData, meaoId) {
    let url = URL_PREFIX + 'apps/' + currentData.appId + '/packages/' + currentData.packageId + '/meao/' + meaoId + '/action/sync'
    return GET(url)
  },
  cleanTestEnv: function (packageId, userId, name, ip) {
    let url = URL_PREFIX + 'experience/clean?packageId=' + packageId + '&userId=' + userId + '&name=' + name + '&ip=' + ip
    return POST(url)
  },
  getNodeStatus: function (packageId, userId, name, ip) {
    let url = URL_PREFIX + 'experience/container/workStatus?packageId=' + packageId + '&userId=' + userId + '&name=' + name + '&ip=' + ip
    return GET(url)
  },
  getAppDetailTableApi: function (appId, userId, limit, offset) {
    let url = ''
    if (userId == null) {
      url = URL_PREFIXV2 + 'apps/' + appId + '/packages?limit=' + limit + '&offset=' + offset
    } else {
      url = URL_PREFIXV2 + 'apps/' + appId + '/packages?userId=' + userId + '&limit=' + limit + '&offset=' + offset
    }
    return GET(url)
  },
  getAppListApi: function (appId) {
    let url = URL_PREFIX + 'apps/' + appId
    return GET(url)
  },
  getPackageDetailApi: function (appId, packageId) {
    let url = URL_PREFIX + 'apps/' + appId + '/packages/' + packageId
    return GET(url)
  },
  getMechosts: function () {
    return GET(URL_PREFIX + 'mechosts')
  },
  createOrder: function (param) {
    return POST(URL_PREFIX + 'orders', param)
  }

}
export {
  URL_PREFIX, URL_PREFIXV2, appstoreApi
}
