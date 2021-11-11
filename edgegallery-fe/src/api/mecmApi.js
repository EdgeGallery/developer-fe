
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
  DELETE
} from '../tools/request.js'

const apmApi = '/apm/v1'
const appoApi = '/appo/v1'

let apm = {
  getAppTemplateApi (userId, packageId) {
    return GET(apmApi + '/tenants/' + userId + '/packages/' + packageId + '/apptemplate')
  }
}

let appo = {
  confirmToDeploy (userId, params) {
    return POST(appoApi + '/tenants/' + userId + '/app_instances', params)
  },
  confirmToBatchDeploy (userId, params) {
    return POST(appoApi + '/tenants/' + userId + '/app_instances/batch_create', params)
  },
  getInstanceInfo (userId, instanceId) {
    return GET(appoApi + '/tenants/' + userId + '/app_instance_infos/' + instanceId)
  }
}

let appDeploy = {
  getDistributeDeployList: function (userId) {
    return GET(apmApi + 'tenants/' + userId + '/packages')
  },
  deleteDistributionApp (type, hostIp, packageId, userId) {
    let url = apmApi + 'tenants/' + userId + '/packages/' + packageId + '/hosts/' + hostIp
    if (type === 2) {
      url = apmApi + 'tenants/' + userId + '/packages/' + packageId
    }
    return DELETE(url)
  },
  initApmPackages () {
    return GET(apmApi + 'apps/syncstatus')
  }
}

export {
  apm,
  appo,
  appDeploy
}
