
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
  PUT,
  DELETE
} from '../tools/request.js'

const urlPrefix = '/mec/developer/v2/'

let applicationRules = {
  getAppTrafficRules: function (applicationId) {
    return GET(urlPrefix + 'applications/' + applicationId + '/appconfiguration/trafficrules')
  },
  postAppTrafficRule: function (applicationId, params) {
    return POST(urlPrefix + 'applications/' + applicationId + '/appconfiguration/trafficrules', params)
  },
  editAppTrafficRule: function (applicationId, ruleId, params) {
    return PUT(urlPrefix + 'applications/' + applicationId + '/appconfiguration/trafficrules/' + ruleId, params)
  },
  deleteAppTrafficRule: function (applicationId, ruleId) {
    return DELETE(urlPrefix + 'applications/' + applicationId + '/appconfiguration/trafficrules/' + ruleId)
  },
  getAppDnsRules: function (applicationId) {
    return GET(urlPrefix + 'applications/' + applicationId + '/appconfiguration/dnsrules')
  },
  postAppDnsRule: function (applicationId, params) {
    return POST(urlPrefix + 'applications/' + applicationId + '/appconfiguration/dnsrules', params)
  },
  editAppDnsRule: function (applicationId, ruleId, params) {
    return PUT(urlPrefix + 'applications/' + applicationId + '/appconfiguration/dnsrules/' + ruleId, params)
  },
  deleteAppDnsRule: function (applicationId, ruleId) {
    return DELETE(urlPrefix + 'applications/' + applicationId + '/appconfiguration/dnsrules/' + ruleId)
  }
}

export {
  applicationRules
}
