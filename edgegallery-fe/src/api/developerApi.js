
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
const URL_PREFIX_DEVELOPER = '/mec-developer/mec/developer/v2/'
let sandbox = {
  // determine whether to select sandbox by applicationid
  getUserSelectSandbox (applicationid) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationid)
  },
  // get all sandboxlist
  getSandboxList: function (vimtype, architecture) {
    return GET(URL_PREFIX_DEVELOPER + 'mephosts' + '?vimType=' + vimtype + '&architecture=' + architecture + '&limit=12&offset=0')
  },
  // get sandboxname by mephostid
  getSandboxByMepHostId: function (mepHostId) {
    return GET(URL_PREFIX_DEVELOPER + 'mephosts/' + mepHostId)
  },
  // Judge whether the sandbox is selected successfully
  selectSandbox: function (applicationId, mepHostId) {
    return PUT(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/sel-mephost', mepHostId)
  },
  // get all internet type
  getAllInternetType (applicationid) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationid + '/networks')
  },
  // add internet type
  addInternetType (applicationid, parmas) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationid + '/networks', parmas)
  },
  // get vm specs
  getVmspec () {
    return GET(URL_PREFIX_DEVELOPER + 'flavors/')
  },
  // get vm image list
  getVmImageList (parmas) {
    return POST(URL_PREFIX_DEVELOPER + 'vmimages/action/get-list', parmas)
  },
  // add vm image
  addVmImage (applicationId, parmas) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms', parmas)
  },
  // get vmList
  getVmlist (applicationId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms')
  },
  // delete vmImage
  deleteVmImage (applicationId, vmId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId)
  },
  // get vm operationId
  getVmPullId (applicationId, vmId) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId + '/action/launch')
  },
  // look vm status
  getVmStatus (operationId) {
    return GET(URL_PREFIX_DEVELOPER + 'operations/' + operationId)
  },
  // clearVmImage
  clearVmImage (applicationId) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/clean-env')
  },
  // export Image
  exportImage (applicationId, vmId) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId + '/action/export-image')
  },
  getVmList (applicationId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms')
  },
  getVmDetail (applicationId, vmId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId)
  },
  getVmDetailImage (imageId) {
    return GET(URL_PREFIX_DEVELOPER + 'vmimages/' + imageId)
  },
  getVmDetailFlavor (flavorId) {
    return GET(URL_PREFIX_DEVELOPER + 'flavors/' + flavorId)
  },
  vncLogin (applicationId, vmId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId + '/vnc')
  }
}

let applicationApi = {
  getApplicationList: function () {
    return GET(URL_PREFIX_DEVELOPER + 'applications?limit=12&offset=0')
  },
  getAppInfo: function (appId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + appId)
  },
  deleteApp: function (appId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + appId)
  },
  modifyApp: function (appId, params) {
    return PUT(URL_PREFIX_DEVELOPER + 'applications/' + appId, params)
  },
  getFileStream: function (fileId) {
    return URL_PREFIX_DEVELOPER + 'upload-files/' + fileId + '/action/get-file-stream'
  },
  getFileInfo: function (fileId) {
    return GET(URL_PREFIX_DEVELOPER + 'upload-files/' + fileId)
  },
  uploadFileApi: function (params) {
    return POST('/mec-developer/mec/developer/v2/upload-files', params)
  },
  createNewApp: function (params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications', params)
  },
  getServiceList: function () {
    return GET(URL_PREFIX_DEVELOPER + 'query/capability-groups/type/OPENMEP')
  },
  getCapabilityByGroupId: function (groupId) {
    return GET(URL_PREFIX_DEVELOPER + 'query/capabilities/group-id/' + groupId)
  },
  addService: function (appId, params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + appId + '/appconfiguration/servicerequireds', params)
  },
  getServiceDependencies (appId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + appId + '/appconfiguration/servicerequireds')
  },
  deleteService: function (appId, serId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + appId + '/appconfiguration/servicerequireds/' + serId)
  },
  getApiUrl: function (apiFileId) {
    return '/mec-developer/mec/developer/v2/upload-files/' + apiFileId + '/action/get-file-stream'
  },
  publishService: function (appId, params) {
    return POST('/mec-developer/mec/developer/v2/applications/' + appId + '/appconfiguration/serviceproduceds', params)
  },
  getPublishedService: function (appId) {
    return GET('/mec-developer/mec/developer/v2/applications/' + appId + '/appconfiguration/serviceproduceds')
  },
  modifyPublishedService: function (appId, serId, params) {
    return PUT('/mec-developer/mec/developer/v2/applications/' + appId + '/appconfiguration/serviceproduceds/' + serId, params)
  },
  deletePublishedService: function (appId, serId) {
    return DELETE('/mec-developer/mec/developer/v2/applications/' + appId + '/appconfiguration/serviceproduceds/' + serId)
  },
  publishApp: function (applicationId, params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/release', params)
  }
}

let applicationRules = {
  getAppTrafficRules: function (applicationId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/trafficrules')
  },
  postAppTrafficRule: function (applicationId, params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/trafficrules', params)
  },
  editAppTrafficRule: function (applicationId, ruleId, params) {
    return PUT(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/trafficrules/' + ruleId, params)
  },
  deleteAppTrafficRule: function (applicationId, ruleId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/trafficrules/' + ruleId)
  },
  getAppDnsRules: function (applicationId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/dnsrules')
  },
  postAppDnsRule: function (applicationId, params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/dnsrules', params)
  },
  editAppDnsRule: function (applicationId, ruleId, params) {
    return PUT(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/dnsrules/' + ruleId, params)
  },
  deleteAppDnsRule: function (applicationId, ruleId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration/dnsrules/' + ruleId)
  }
}
let imageApi = {
  getAppInfo: function (applicationId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/detail')
  },
  getVmFlavors: function (flavorId) {
    return GET(URL_PREFIX_DEVELOPER + 'flavors/' + flavorId)
  },
  getImage: function (imageId) {
    return GET(URL_PREFIX_DEVELOPER + 'vmimages/' + imageId)
  },
  generatePackage: function (applicationId) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/generate-package')
  },
  getPackageStructure: function (packageId) {
    return GET(URL_PREFIX_DEVELOPER + 'apppackages/' + packageId + '/action/get-pkg-structure')
  },
  getPackageFile: function (packageId, fileName) {
    return GET(URL_PREFIX_DEVELOPER + 'apppackages/' + packageId + '/action/get-file-content?fileName=' + fileName)
  },
  modifyPackageFile: function (packageId, fileName, params) {
    return PUT(URL_PREFIX_DEVELOPER + 'apppackages/' + packageId + '/action/update-file-content?fileName' + fileName, params)
  },
  getFileInfo: function (fileId) {
    return GET(URL_PREFIX_DEVELOPER + 'upload-files/' + fileId)
  }
}
let atpTestApi = {
  submitTest: function (applicationId) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/atp-tests')
  },
  getTestId: function (applicationId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/atp-tests')
  }
}

export {
  sandbox,
  applicationApi,
  applicationRules,
  imageApi,
  atpTestApi
}
