
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
import {
  PROXY_PREFIX_CURRENTSERVER
} from '../tools/constant.js'
import axios from 'axios'

const URL_PREFIX_DEVELOPER = PROXY_PREFIX_CURRENTSERVER + '/mec-developer/mec/developer/v2/'
const URL_PREFIX_GATEWAY = PROXY_PREFIX_CURRENTSERVER + '/mec/res/v2/'
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
  // edit vmDetail
  editVmDetail (applicationId, vmId, parmas) {
    return PUT(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId, parmas)
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
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId + '/action/vnc')
  },
  sshLogin (applicationId, vmId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/vms/' + vmId + '/action/ssh')
  },
  getScriptByImageId (pkgSpecId, osType) {
    return GET(URL_PREFIX_DEVELOPER + 'user-datas?' + 'pkgSpecId=' + pkgSpecId + '&osType=' + osType)
  },
  getUpfFinished (applicationId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/appconfiguration')
  },
  addCustom (parmas) {
    return POST(URL_PREFIX_DEVELOPER + 'flavors', parmas)
  },
  deleteInternet (applicationid, networkId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + applicationid + '/networks/' + networkId)
  },
  container: {
    postHelmChartsFile (applicationId, parmas) {
      return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/helmcharts', parmas)
    },
    getHelmchartsFileList (applicationId) {
      return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/helmcharts')
    },
    getHelmChartFileContent (applicationId, helmChartId, filePath) {
      return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/helmcharts/' + helmChartId + '/action/get-inner-file?filePath=' + filePath)
    },
    saveHelmChartFile (applicationId, helmChartId, params) {
      return PUT(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/helmcharts/' + helmChartId + '/action/modify-inner-file', params)
    },
    deleteHelmChartsFile (applicationId, helmChartId) {
      return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/helmcharts/' + helmChartId)
    },
    deployContainer (applicationId) {
      return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/containers/action/launch')
    },
    getDeployContainerInfo (operationId) {
      return GET(URL_PREFIX_DEVELOPER + 'operations/' + operationId)
    },
    getApplicationDetail (applicationId) {
      return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/detail')
    },
    cleanContainerEnv (applicationId) {
      return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/clean-env')
    },
    vncLogin (applicationId) {
      return GET(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/containers/action/ssh')
    }
  }

}

let applicationApi = {
  getApplicationList: function (limit, offset) {
    return GET(URL_PREFIX_DEVELOPER + 'applications?limit=' + limit + '&offset=' + offset)
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
    return POST(URL_PREFIX_DEVELOPER + 'upload-files', params)
  },
  createNewApp: function (params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications', params)
  },
  getServiceList: function () {
    return GET(URL_PREFIX_DEVELOPER + 'query/capability-group-stats/type/OPENMEP')
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
    return URL_PREFIX_DEVELOPER + 'upload-files/' + apiFileId + '/action/get-file-stream'
  },
  publishService: function (appId, params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + appId + '/appconfiguration/serviceproduceds', params)
  },
  getPublishedService: function (appId) {
    return GET(URL_PREFIX_DEVELOPER + 'applications/' + appId + '/appconfiguration/serviceproduceds')
  },
  modifyPublishedService: function (appId, serId, params) {
    return PUT(URL_PREFIX_DEVELOPER + 'applications/' + appId + '/appconfiguration/serviceproduceds/' + serId, params)
  },
  deletePublishedService: function (appId, serId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'applications/' + appId + '/appconfiguration/serviceproduceds/' + serId)
  },
  publishApp: function (applicationId, params) {
    return POST(URL_PREFIX_DEVELOPER + 'applications/' + applicationId + '/action/release', params)
  },
  getProfileDataList: function (params) {
    return GET(URL_PREFIX_DEVELOPER + 'profiles', params)
  },
  createProfileNewApp: function (profileId, params) {
    return POST(URL_PREFIX_DEVELOPER + 'profiles/' + profileId + '/create-application', params)
  },
  getSpecOptions: function () {
    return GET(URL_PREFIX_DEVELOPER + 'pkg-specs')
  },
  getAbilityIconApi: function (fileId) {
    return URL_PREFIX_DEVELOPER + 'upload-files/' + fileId + '/action/get-file-stream'
  },
  getUseScene () {
    return GET(URL_PREFIX_DEVELOPER + 'pkg-specs/useScenes')
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
  getPackageFile: function (packageId, parmas) {
    return POST(URL_PREFIX_DEVELOPER + 'apppackages/' + packageId + '/action/get-file-content', parmas)
  },
  modifyPackageFile: function (packageId, params) {
    return PUT(URL_PREFIX_DEVELOPER + 'apppackages/' + packageId + '/action/update-file-content', params)
  },
  getFileInfo: function (fileId) {
    return GET(URL_PREFIX_DEVELOPER + 'upload-files/' + fileId)
  },
  packageToZip: function (packageId) {
    return POST(URL_PREFIX_DEVELOPER + 'apppackages/' + packageId + '/action/zip-package')
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

let commonApi = {
  // Call webgateWay to get interface response information
  getResponseCodeInfo: function (params) {
    return GET(URL_PREFIX_GATEWAY + 'error-info?modules=' + params, '')
  }
}

let systemApi = {
  submitConfigFileApi: function (params) {
    return POST(URL_PREFIX_DEVELOPER + 'mephosts/action/upload-config-file', params)
  },
  deleteHost: function (mephostId) {
    return DELETE(URL_PREFIX_DEVELOPER + `mephosts/${mephostId}`)
  },
  saveHostInfo: function (params) {
    const func = params.id ? PUT : POST
    const path = params.id ? URL_PREFIX_DEVELOPER + `mephosts/${params.id}` : URL_PREFIX_DEVELOPER + 'mephosts'
    const data = { ...params }
    return func(path, data)
  },
  getHosts: function (params) {
    return GET(URL_PREFIX_DEVELOPER + 'mephosts', params)
  }
}

let imageMgmtService = {
  getImageDataList: function (queryData) {
    return POST(URL_PREFIX_DEVELOPER + 'vmimages/action/get-list', queryData)
  },
  newImage: function (imgData) {
    return POST(URL_PREFIX_DEVELOPER + 'vmimages', imgData)
  },
  modifyImage: function (imgData, id) {
    return PUT(URL_PREFIX_DEVELOPER + 'vmimages/' + id, imgData)
  },
  deleteImage: function (id) {
    return DELETE(URL_PREFIX_DEVELOPER + 'vmimages/' + id)
  },
  publishImage: function (id) {
    return PUT(URL_PREFIX_DEVELOPER + 'vmimages/' + id + '/action/publish')
  },
  resetImageStatus: function (id) {
    return PUT(URL_PREFIX_DEVELOPER + 'vmimages/' + id + '/action/reset')
  },
  mergeImage: function (id, fileName, identifier) {
    return GET(URL_PREFIX_DEVELOPER + 'vmimages/' + id + '/action/merge?fileName=' + fileName + '&identifier=' + identifier)
  },
  cancelUploadImage: function (id, identifier) {
    return DELETE(URL_PREFIX_DEVELOPER + 'vmimages/' + id + '/action/upload?identifier=' + identifier)
  },
  downloadSystemImageUrl: function (id) {
    return PROXY_PREFIX_CURRENTSERVER + '/mec-developer/mec/developer/v2/vmimages/' + id + '/action/download'
  },
  slimImage: function (imageId) {
    return POST(URL_PREFIX_DEVELOPER + 'vmimages/' + imageId + '/action/slim', '')
  },
  getOperationInfo (operationId) {
    return GET(URL_PREFIX_DEVELOPER + 'operations/' + operationId)
  },
  // ContainerImage
  deleteContainerImage: function (imageId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'containerimages/' + imageId)
  },
  modifyContainerImage: function (imgData, imageId) {
    return PUT(URL_PREFIX_DEVELOPER + 'containerimages/' + imageId, imgData)
  },
  getContainerImageDataList: function (queryData) {
    return POST(URL_PREFIX_DEVELOPER + 'containerimages/action/get-all-images', queryData)
  },
  mergeContainerImage: function (imageId, fileName, identifier) {
    return GET(URL_PREFIX_DEVELOPER + 'containerimages/' + imageId + '/action/merge?fileName=' + fileName + '&guid=' + identifier)
  },
  downloadContainerImageUrl: function (imageId) {
    return PROXY_PREFIX_CURRENTSERVER + '/mec-developer/mec/developer/v2/containerimages/' + imageId + '/action/download'
  },
  synchronizeContainerImageApi: function () {
    return GET(URL_PREFIX_DEVELOPER + 'containerimages/action/synchronize')
  },
  cancelUploadContainerImage: function (imageId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'containerimages/' + imageId + '/action/upload')
  }
}

let Capability = {
  getCapabilityByNameWithFuzzy: function (params) {
    return GET(URL_PREFIX_DEVELOPER + 'query/capabilities/name', params)
  },
  createCapability: function (capability) {
    return POST(URL_PREFIX_DEVELOPER + 'capabilities', capability)
  },
  editCapability: function (capabilityId, capability) {
    return PUT(URL_PREFIX_DEVELOPER + 'capabilities/' + capabilityId, capability)
  },
  deleteCapabilityById: function (id) {
    return DELETE(URL_PREFIX_DEVELOPER + 'capabilities/' + id)
  },
  getAllCapability: function () {
    return GET(URL_PREFIX_DEVELOPER + 'query/capabilities/type/OPENMEP')
  },
  getAllCapabilityGroup: function () {
    return GET(URL_PREFIX_DEVELOPER + 'query/capability-groups/type/OPENMEP')
  },
  postIconFileIdApi: function (fileType, params) {
    return POST(URL_PREFIX_DEVELOPER + 'upload-files?fileType=' + fileType, params)
  },
  getCapabilityIconApi: function (fileId) {
    return PROXY_PREFIX_CURRENTSERVER + '/mec-developer/mec/developer/v2/upload-files/' + fileId + '/action/get-file-stream'
  },
  getApiFileApi: function (fileId) {
    return GET(URL_PREFIX_DEVELOPER + 'upload-files/' + fileId)
  }
}

let profileMgmtApi = {
  getProfileDataList: function (params) {
    return GET(URL_PREFIX_DEVELOPER + 'profiles', params)
  },
  addProfile: function (params) {
    return POST(URL_PREFIX_DEVELOPER + 'profiles', params)
  },
  modifyProfile: function (profileId, params) {
    return PUT(URL_PREFIX_DEVELOPER + 'profiles/' + profileId, params)
  },
  deleteOneProfile: function (profileId) {
    return DELETE(URL_PREFIX_DEVELOPER + 'profiles/' + profileId)
  },
  downLoadProfileApi: function (profileId, appName) {
    let url = PROXY_PREFIX_CURRENTSERVER + '/mec-developer/mec/developer/v2/profiles/' + profileId + '/action/download?type=profileFile' + '&name=' + appName
    return axios({
      method: 'get',
      url: url,
      responseType: 'blob'
    }).then((res) => {
      if (!res) {
        return
      }
      let objectUrl = window.URL.createObjectURL(res.data)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = objectUrl
      link.setAttribute('download', appName + '.' + 'zip')
      document.body.appendChild(link)
      link.click()
    })
  }
}

export {
  URL_PREFIX_DEVELOPER,
  sandbox,
  applicationApi,
  applicationRules,
  imageApi,
  atpTestApi,
  commonApi,
  systemApi,
  imageMgmtService,
  Capability,
  profileMgmtApi
}
