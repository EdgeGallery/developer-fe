
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
const urlPrefix = '/mec-developer/mec/developer/v2/'
let sandbox = {
  // determine whether to select sandbox by applicationid
  getUserSelectSandbox (applicationid) {
    return GET('/mec/developer/v2/applications/' + applicationid)
  },
  // get all sandboxlist
  getSandboxList: function (vimtype, architecture) {
    return GET('/mec/developer/v2/mephosts' + '?vimType=' + vimtype + '&architecture=' + architecture + '&limit=12&offset=0')
  },
  // get sandboxname by mephostid
  getSandboxByMepHostId: function (mepHostId) {
    return GET('/mec/developer/v2/mephosts/' + mepHostId)
  },
  // Judge whether the sandbox is selected successfully
  selectSandbox: function (applicationId, mepHostId) {
    return PUT('/mec/developer/v2/applications/' + applicationId + '/action/sel-mephost', mepHostId)
  },
  // get all internet type
  getAllInternetType (applicationid) {
    return GET('/mec/developer/v2/applications/' + applicationid + '/networks')
  },
  // add internet type
  addInternetType (applicationid, parmas) {
    return POST('/mec/developer/v2/applications/' + applicationid + '/networks', parmas)
  },
  // get vm specs
  getVmspec () {
    return GET('/mec/developer/v2/flavors/')
  },
  // get vm image list
  getVmImageList (parmas) {
    return POST('/mec/developer/v2/vmimages/list', parmas)
  },
  // add vm image
  addVmImage (applicationId, parmas) {
    return POST('/mec/developer/v2/applications/' + applicationId + '/vms', parmas)
  }
}

let applicationApi = {
  getApplicationList: function () {
    return GET('/mec-developer/mec/developer/v2/applications?limit=12&offset=0')
  },
  getAppInfo: function (appId) {
    return GET('/mec-developer/mec/developer/v2/applications/' + appId)
  },
  deleteApp: function (appId) {
    return DELETE('/mec-developer/mec/developer/v2/applications/' + appId)
  },
  modifyApp: function (appId, params) {
    return PUT('/mec-developer/mec/developer/v2/applications/' + appId, params)
  },
  getFileStream: function (fileId) {
    return '/mec-developer/mec/developer/v2/upload-files/' + fileId + '/action/get-file-stream'
  },
  getFileInfo: function (fileId) {
    return GET('/mec-developer/mec/developer/v2/upload-files/' + fileId)
  },
  uploadAppIcon: function (params) {
    return POST('/mec-developer/mec/developer/v2/upload-files', params)
  },
  createNewApp: function (params) {
    return POST('/mec-developer/mec/developer/v2/applications', params)
  },
  getServiceList: function () {
    return GET('/mec-developer/mec/developer/v2/query/capability-groups/type/OPENMEP')
  },
  getCapabilityByGroupId: function (groupId) {
    return GET('/mec-developer/mec/developer/v2/query/capabilities/group-id/' + groupId)
  },
  addService: function (appId, params) {
    return POST('/mec-developer/mec/developer/v2/applications/' + appId + '/appconfiguration/servicerequireds', params)
  },
  getServiceDependencies (appId) {
    return GET('/mec-developer/mec/developer/v2/applications/' + appId + '/appconfiguration/servicerequireds')
  },
  deleteService: function (appId, serName) {
    return DELETE('/mec-developer/mec/developer/v2/applications/' + appId + '/appconfiguration/servicerequireds/' + serName)
  },
  getApiUrl: function (apiFileId) {
    return '/mec-developer/mec/developer/v2/upload-files/' + apiFileId + '/action/get-file-stream'
  }
}

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
let imageApi = {
  getAppInfo: function (applicationId) {
    return GET(urlPrefix + 'applications/' + applicationId + '/detail')
  },
  getVmFlavors: function (flavorId) {
    return GET(urlPrefix + 'flavors/' + flavorId)
  },
  getImage: function (imageId) {
    return GET(urlPrefix + 'vmimages/' + imageId)
  },
  generatePackage: function (applicationId) {
    return POST(urlPrefix + 'applications/' + applicationId + '/action/generate-package')
  },
  getPackageStructure: function (packageId) {
    return GET(urlPrefix + 'apppackages/' + packageId + '/action/get-pkg-structure')
  },
  getPackageFile: function (packageId, fileName) {
    return GET(urlPrefix + 'apppackages/' + packageId + '/action/get-file-content?fileName=' + fileName)
  },
  modifyPackageFile: function (packageId, fileName, params) {
    return PUT(urlPrefix + 'apppackages/' + packageId + '/action/update-file-content?fileName' + fileName, params)
  },
  getFileInfo: function (fileId) {
    return GET(urlPrefix + 'upload-files/' + fileId)
  }
}
let atpTestApi = {
  submitTest: function (applicationId) {
    return POST(urlPrefix + 'applications/' + applicationId + '/action/atp-tests')
  },
  getTestId: function (applicationId) {
    return GET(urlPrefix + 'applications/' + applicationId + '/action/atp-tests')
  }
}

export {
  sandbox,
  applicationApi,
  applicationRules,
  imageApi,
  atpTestApi
}
