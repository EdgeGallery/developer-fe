
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
} from '../tools/request.js'
import {
  PROXY_PREFIX_CURRENTSERVER
} from '../tools/constant.js'

const URL_PREFIX_APPSTORE = PROXY_PREFIX_CURRENTSERVER + '/mec-appstore/mec/appstore/v1/'
const URL_PREFIX_APPSTORE_V2 = PROXY_PREFIX_CURRENTSERVER + '/mec-appstore/mec/appstore/v2/'

let appstoreApi = {
  getAppData: function (params) {
    let url = URL_PREFIX_APPSTORE_V2 + 'apps/action/query'
    return POST(url, params)
  },
  getAppPromTable: function (limit, offset, appName, sortType, sortItem) {
    let url = URL_PREFIX_APPSTORE_V2 + 'packages/pushable?limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortType=' + sortType + '&sortItem=' + sortItem
    return GET(url, '')
  },
  promProviderInfo: function (curPageSize, offset, appStoreName) {
    let url = URL_PREFIX_APPSTORE_V2 + 'appstores?limit=' + curPageSize + '&offset=' + offset + '&appStoreName=' + appStoreName
    return GET(url, '')
  },
  promTask: function (packageId, param) {
    let url = URL_PREFIX_APPSTORE + 'packages/' + packageId + '/action/push'
    return POST(url, param)
  },
  getComments: function (appId, limit, offset) {
    let url = URL_PREFIX_APPSTORE_V2 + 'apps/' + appId + '/comments?limit=' + limit + '&offset=' + offset
    return GET(url)
  },
  submitAppComment: function (appId, params, userId, userName) {
    let url = URL_PREFIX_APPSTORE + 'apps/' + appId + '/comments?userId=' + userId + '&userName=' + userName
    return POST(url, params)
  },
  getNodePort: function (appId, packageId, userId) {
    let url = URL_PREFIX_APPSTORE + 'experience/deploy?appId=' + appId + '&packageId=' + packageId + '&userId=' + userId
    return POST(url)
  },
  getExperienceStatus: function (packageId) {
    let url = URL_PREFIX_APPSTORE + 'experience/packages/' + packageId + '/status'
    return GET(url)
  },
  getThirdSystemByType: function (type) {
    let url = URL_PREFIX_APPSTORE + 'thirdsystem/systemType/' + type
    return GET(url, '')
  },
  getProgressByPackageId: function (packageId) {
    let url = URL_PREFIX_APPSTORE + 'upload_progress/package/' + packageId
    return GET(url, '')
  },
  synchronizedPakage: function (currentData, meaoId) {
    let url = URL_PREFIX_APPSTORE + 'apps/' + currentData.appId + '/packages/' + currentData.packageId + '/meao/' + meaoId + '/action/sync'
    return GET(url)
  },
  cleanTestEnv: function (packageId) {
    let url = URL_PREFIX_APPSTORE + 'experience/clean?packageId=' + packageId
    return POST(url)
  },
  getNodeStatus: function (packageId, userId) {
    let url = URL_PREFIX_APPSTORE + 'experience/container/workStatus?packageId=' + packageId + '&userId=' + userId
    return GET(url)
  },
  getAppDetailTable: function (appId, userId, limit, offset) {
    let url = ''
    if (userId == null) {
      url = URL_PREFIX_APPSTORE_V2 + 'apps/' + appId + '/packages?limit=' + limit + '&offset=' + offset
    } else {
      url = URL_PREFIX_APPSTORE_V2 + 'apps/' + appId + '/packages?userId=' + userId + '&limit=' + limit + '&offset=' + offset
    }
    return GET(url)
  },
  getAppList: function (appId) {
    let url = URL_PREFIX_APPSTORE + 'apps/' + appId
    return GET(url)
  },
  getPackageDetail: function (appId, packageId) {
    let url = URL_PREFIX_APPSTORE + 'apps/' + appId + '/packages/' + packageId
    return GET(url)
  },
  getMechosts: function () {
    return GET(URL_PREFIX_APPSTORE + 'mechosts')
  },
  createOrder: function (param) {
    return POST(URL_PREFIX_APPSTORE + 'orders', param)
  },
  downloadAppPakageApi: function (appId, row, isDownloadImage) {
    let URL = URL_PREFIX_APPSTORE + 'apps/' + appId + '/packages/' + row.packageId + '/action/download?isDownloadImage=' + isDownloadImage
    window.open(URL)
  }
}
export {
  URL_PREFIX_APPSTORE, URL_PREFIX_APPSTORE_V2, appstoreApi
}
