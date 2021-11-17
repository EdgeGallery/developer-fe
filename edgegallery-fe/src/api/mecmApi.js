
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

const URL_PREFIX_MECM_APM = '/mecm-apm/apm/v1'
const URL_PREFIX_MECM_APPO = '/mecm-appo/appo/v1'
const URL_PREFIX_MECM_INVENTORY = '/mecm-inventory/inventory/v1'

let appo = {
  toDeploy (userId, params) {
    return POST(URL_PREFIX_MECM_APPO + '/tenants/' + userId + '/app_instances', params)
  },
  toBatchDeploy (userId, params) {
    return POST(URL_PREFIX_MECM_APPO + '/tenants/' + userId + '/app_instances/batch_create', params)
  },
  getInstanceInfo (userId, instanceId) {
    return GET(URL_PREFIX_MECM_APPO + '/tenants/' + userId + '/app_instance_infos/' + instanceId)
  },
  instantiateApp (userId, instanceId, params) {
    return POST(URL_PREFIX_MECM_APPO + '/tenants/' + userId + '/app_instances/' + instanceId, params)
  },
  batchInstantiateApp (userId, params) {
    return POST(URL_PREFIX_MECM_APPO + '/tenants/' + userId + '/app_instances/batch_instantiate', params)
  }
}

let apm = {
  getDistributeDeployList: function (userId) {
    return GET(URL_PREFIX_MECM_APM + '/tenants/' + userId + '/packages')
  },
  deleteDistributionApp (type, hostIp, packageId, userId) {
    let url = URL_PREFIX_MECM_APM + '/tenants/' + userId + '/packages/' + packageId + '/hosts/' + hostIp
    if (type === 2) {
      url = URL_PREFIX_MECM_APM + '/tenants/' + userId + '/packages/' + packageId
    }
    return DELETE(url)
  },
  initApmPackages () {
    return GET(URL_PREFIX_MECM_APM + '/apps/syncstatus')
  },
  distributeApp (params, userId) {
    return POST(URL_PREFIX_MECM_APM + '/tenants/' + userId + '/packages', params)
  },
  getAppTemplateApi (userId, packageId) {
    return GET(URL_PREFIX_MECM_APM + '/tenants/' + userId + '/packages/' + packageId + '/apptemplate')
  }
}

let inventory = {
  getEdgeNodeList () {
    return GET(URL_PREFIX_MECM_INVENTORY + '/mechosts')
  }
}

export {
  appo,
  apm,
  inventory
}
