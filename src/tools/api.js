/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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

import { Get, Delete, Put, Post, urlPrefix, urlPrefixTool, downloadFile, GetFun, getResCode } from './tool.js'
import axios from 'axios'

let Plugin = {
  // Get the list of plugins
  getPluginListApi: function (limitSize, offsetPage, inputPluginName, selectCodeLanguage) {
    return Get('mec/developer/v1/plugins/?pluginType=1&limit=' + limitSize + '&offset=' + offsetPage + '&pluginName=' + inputPluginName + '&codeLanguage=' + selectCodeLanguage)
  },
  // Get plugin icon
  getImageUrlApi: function (pluginId) {
    return urlPrefix + 'mec/developer/v1/plugins/' + pluginId + '/action/get-logofile'
  },
  // Get plugin download path
  getDownloadUrlApi: function (pluginId) {
    return urlPrefix + 'mec/developer/v1/plugins/' + pluginId + '/action/download'
  },
  // Remove plugin
  deletePluginApi: function (pluginId, userId) {
    return Delete('mec/developer/v1/plugins/' + pluginId + '?userId=' + userId)
  },
  // Rate the plugin
  ratePluginApi: function (rateId, valueRate, userId, userName) {
    return Put('mec/developer/v1/plugins/' + rateId + '/action/score?score=' + valueRate + '&userId=' + userId + '&userName=' + userName)
  },
  // Upload plugin
  uploadPluginApi: function (params) {
    return Post('mec/developer/v1/plugins/', params)
  },
  // Get Plugin Detail Document
  getDetailDocsApi: function (pluginId) {
    return Get('mec/developer/v1/plugins/' + pluginId + '/action/content')
  },
  // Get the uploaded source code
  getSourceCodeApi: function (userId, type) {
    return Get('mec/toolchain/v1/porting/' + userId, '', type)
  },
  // Delete source code
  deleteSourceCodeApi: function (userId, type) {
    return Delete('mec/toolchain/v1/porting/' + userId, '', type)
  },
  // Upload source code
  uploadSourceCodeApi: function (userId, params, type) {
    return Post('mec/toolchain/v1/porting/' + userId, params, type)
  },
  // Analyze the source code
  analysisCodeApi: function (userId, params, type) {
    return Post('mec/toolchain/v1/porting/' + userId + '/tasks', params, type)
  },
  // Get a list of scan tasks
  getScanTaskApi: function (userId, type) {
    return Get('mec/toolchain/v1/porting/' + userId + '/tasks', '', type)
  },
  // Download report
  downLoadReportApi: function (userId, reportId) {
    return urlPrefixTool + 'mec/toolchain/v1/porting/' + userId + '/tasks/' + reportId + '/download'
  },
  // Delete report
  deleteReportApi: function (userId, reportId, type) {
    return Delete('mec/toolchain/v1/porting/' + userId + '/tasks/' + reportId, '', type)
  },
  // Get single report information
  getTaskInformationApi: function (userId, reportId, type) {
    return Get('mec/toolchain/v1/porting/' + userId + '/tasks/' + reportId, '', type)
  }
}

let Api = {
  // ObtainMepService list
  getMepServiceApi: function () {
    return Get('mec/developer/v2/capability-groups/openmep-api')
  },
  // ObtainMEP-EcoService list
  getMepEcoServiceApi: function () {
    return Get('mec/developer/v2/capability-groups/openmepeco-api')
  },
  // Get a list of services
  getServiceApi: function (type) {
    return Get('mec/developer/v1/query/capability-groups/type/' + type)
  },
  // ObtainApi-swaggerUIpath
  getSwaggerUrlApi: function (apiFileId) {
    return urlPrefix + 'mec/developer/v2/upload-files/' + apiFileId + '/action/get-file-stream'
  },
  // SDKdownload
  downloadSDKApi: function (fileId, lan) {
    return urlPrefix + 'mec/developer/v1/files/sdk/' + fileId + '/download/' + lan
  },
  // Delete publicAPI
  deletePublicApi: function (capabilityId, userId) {
    return Delete('mec/developer/v1/capabilities/' + capabilityId + '?userId=' + userId)
  }
}

let Capability = {
  getCapabilityByNameWithFuzzy: function (params) {
    return Get('mec/developer/v2/query/capabilities/name', params)
  },
  getCapabilityByNameEnWithFuzzy: function (params) {
    return Get('mec/developer/v2/query/capabilities/name-en', params)
  },
  createCapability: function (capability) {
    return Post('mec/developer/v2/capabilities', capability)
  },
  editCapability: function (capabilityId, capability) {
    return Put('mec/developer/v2/capabilities/' + capabilityId, capability)
  },
  deleteCapabilityById: function (id) {
    return Delete('mec/developer/v2/capabilities/' + id)
  },
  getAllCapability: function () {
    return Get('mec/developer/v2/query/capabilities/type/OPENMEP')
  },
  getCapabilityByGroupId: function (groupId) {
    return Get('mec/developer/v2/query/capabilities/group-id/' + groupId)
  },
  getCapabilityById: function (id) {
    return Get('mec/developer/v2/capabilities/' + id)
  },
  getCapabilityByProjectId: function (projectId) {
    return Get('mec/developer/v2/query/capabilities/project-id/' + projectId)
  },
  getAllCapabilityGroup: function () {
    return Get('mec/developer/v2/query/capability-groups/type/OPENMEP')
  },
  getCapabilityGroupByType: function (type) {
    return Get('mec/developer/v2/query/capability-groups/type/' + type)
  },
  getCapabilityGroupStats: function () {
    return Get('mec/developer/v2/query/capability-group-stats/type/OPENMEP')
  },
  getCapabilityGroupById: function (groupId) {
    return Get('mec/developer/v2/capability-groups/' + groupId)
  },
  getStandardCapabilities: function () {
    return Get('mec/developer/v2/query/capabilities/type/STANDARD')
  }
}

let Test = {
  // Upload applicationAPP
  uploadAppApi: function (params) {
    return Post('mec/developer/v1/apps/', params)
  },
  // Start the test task after uploading successfully
  startTestApi: function (appId, userId) {
    return Get('mec/developer/v1/apps/' + appId + '/action/start-test?userId=' + userId)
  },
  // Get a list of test tasks
  getTaskListApi: function (userId, params) {
    return Get('mec/developer/v1/apps/?userId=' + userId, params)
  },
  // Get test subtask
  getSubTaskApi: function (appId, taskId) {
    return Get('mec/developer/v1/apps/' + appId + '/task/' + taskId + '/subtasks')
  },
  // Upload toAppStore
  uploadTaskApi: function (appId, userId, userName) {
    return Post('mec/developer/v1/apps/' + appId + '/action/upload?userId=' + userId + '&userName=' + userName, '')
  }
}

let System = {
  deleteHost: function (mephostId) {
    return Delete(`mec/developer/v2/mephosts/${mephostId}`)
  },
  deleteService: function (params) {
    return Delete('mec/developer/v1/capabilities', params)
  },
  getLogData: function (hostId) {
    return Get(`mec/developer/v2/mephosts/${hostId}/logs`)
  },
  saveHostInfo: function (params) {
    const func = params.id ? Put : Post
    const path = params.id ? `mec/developer/v2/mephosts/${params.id}` : 'mec/developer/v2/mephosts'
    const data = { ...params }
    return func(path, data)
  },
  saveService: function (params) {
    const func = Post
    const path = 'mec/developer/v1/capabilities'
    return func(path, params)
  },
  saveCapabilityGroup: function (params) {
    const func = Post
    const path = 'mec/developer/v2/capability-groups'
    return func(path, params)
  },
  getHosts: function (params) {
    return Get('mec/developer/v2/mephosts', params)
  },
  getSerives: function (params) {
    return Get('mec/developer/v2/capabilities', params)
  },
  getFileInfo: function (fileId) {
    return Get('mec/developer/v2/upload-files/' + fileId)
  }
}

let Workspace = {
  // Test and save the node information in the details
  saveNodeInfo: function (userId, params) {
    const { ip, port } = params
    const func = params.hostId ? Put : Post
    const path = params.hostId ? `mec/developer/v1/hosts/${params.hostId}/?userId=${userId}` : `mec/developer/v1/hosts/?userId=${userId}`
    const data = { architecture: 'X86', userId, status: 'NORMAL', ip, port, name: ip, address: ip }
    return func(path, data)
  },
  // Get node information in details
  getNodeInfo: function (userId) {
    return Get('mec/developer/v1/hosts?userId=' + userId)
  },
  // Get a list of items
  getProjectListApi: function (userId, params) {
    return Get('mec/developer/v1/projects/?userId=' + userId, params)
  },
  // Get the project icon
  getIconApi: function (fileId) {
    return urlPrefix + 'mec/developer/v2/upload-files/' + fileId
  },
  getCapabilityIconApi: function (fileId) {
    return urlPrefix + 'mec/developer/v2/upload-files/' + fileId + '/action/get-file-stream'
  },
  // Delete item
  deleteProjectApi: function (itemId, userId) {
    return Delete('mec/developer/v1/projects/' + itemId + '?userId=' + userId)
  },
  // Staging icon generation iconID
  postIconFileIdApi: function (fileType, params) {
    return Post('/mec/developer/v2/upload-files?fileType=' + fileType, params)
  },
  // Get a list of capabilities details services
  getServiceListApi: function (groupId) {
    return Get('mec/developer/v2/capability-groups/' + groupId)
  },
  // Download sample code
  getSampleCodeApi: function (apiFileIdArr) {
    let params = {
      url: 'mec/developer/v1/files/samplecode',
      params: apiFileIdArr
    }
    return downloadFile(params)
  },
  // Get sample code structure
  getSampleListApi: function (apiFileIdArr) {
    return Post('mec/developer/v1/files/samplecode/get-pkg-structure', apiFileIdArr)
  },
  // Get sample code content
  getSampleContentApi: function (fileName) {
    return Get('mec/developer/v1/files/samplecode/get-file-content?fileName=' + fileName)
  },
  // New/Migration project
  newProjectApi: function (userId, params) {
    return Post('mec/developer/v1/projects/?userId=' + userId, params)
  },
  // Edit/Migration project
  editProjectApi: function (projectId, userId, params) {
    return Put('mec/developer/v1/projects/' + projectId + '?userId=' + userId, params)
  },
  // ObtainApiofswaggerUIpath
  getApiUrl: function (apiFileId, userId, type) {
    return urlPrefix + 'mec/developer/v1/files/' + apiFileId + '?userId=' + userId + '&type=' + type
  },
  // Get the previously submitted configuration
  getTestConfigApi: function (projectId) {
    return Get('mec/developer/v1/projects/' + projectId + '/test-config')
  },
  // Refresh the deployment status result
  refreshDeployStatusApi: function (projectId) {
    return Get('mec/developer/v1/projects/' + projectId + '/container/workStatus')
  },
  // Upload configuration
  postTestConfigApi: function (projectId, userId, params) {
    return Post('mec/developer/v1/projects/' + projectId + '/test-config?userId=' + userId, params)
  },
  // Change setting
  putTestConfigApi: function (projectId, userId, params) {
    return Put('mec/developer/v1/projects/' + projectId + '/test-config?userId=' + userId, params)
  },
  // Save the visualization configuration
  /* postConfigVisualApi: function (projectId, userId, params, configType) {
    return Post('mec/developer/v1/deploy/' + projectId + '?userId=' + userId + '&configType=' + configType, params)
  }, */
  postConfigVisualApi: function (projectId, userId, params, configType) {
    return Post('mec/developer/v1/deploy/' + projectId + '/action/save-yaml?userId=' + userId + '&configType=' + configType, params)
  },
  // Obtain the generated visualization configuration file
  getConfigVisualApi: function (fileId) {
    return Get('mec/developer/v1/deploy/' + fileId)
  },
  // Echo the generated visualization configuration file
  getEchoConfigFileApi: function (fileId) {
    return Get('mec/developer/v1/deploy/' + fileId + '/action/get-json')
  },
  // Edit the generated visualization configuration file
  editConfigVisualApi: function (fileId, params) {
    return Put('mec/developer/v1/deploy/' + fileId, params)
  },
  // Deploy build test
  deployTestApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/deploy?userId=' + userId, '')
  },
  // Terminate deployment
  terminateProjectAPI: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/terminate?userId=' + userId, '')
  },
  // Empty the test environment
  cleanTestEnvApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/clean?userId=' + userId, '')
  },
  // Add mirror
  addImageNameApi: function (projectId, params) {
    return Post('mec/developer/v1/projects/' + projectId + '/image', params)
  },
  // Delete mirror
  deleteImageNameApi: function (projectId, itemId) {
    return Delete('mec/developer/v1/projects/' + projectId + '/image/' + itemId)
  },
  // Uploadyamlfile
  submitYamlFileApi: function (userId, projectId, params, configType) {
    return Post('mec/developer/v1/files/helm-template-yaml?userId=' + userId + '&projectId=' + projectId + '&configType=' + configType, params)
  },
  // UploadApifile
  submitApiFileApi: function (userId, params) {
    return Post('mec/developer/v1/files?userId=' + userId, params)
  },
  // UploadConfigFile
  submitConfigFileApi: function (params) {
    return Post('mec/developer/v2/mephosts/action/upload-config-file', params)
  },
  // Get uploadedApifile
  getApiFileApi: function (fileId) {
    return Get('mec/developer/v2/upload-files/' + fileId)
  },
  // Get the added image
  getImageApi: function (projectId, params) {
    return Get('mec/developer/v1/projects/' + projectId + '/image', params)
  },
  // Get uploadedyamlfile
  getYamlFileApi: function (userId, projectId) {
    return Get('mec/developer/v1/files/helm-template-yaml?userId=' + userId + '&projectId=' + projectId)
  },
  // Delete uploadedyamlfile
  deleteYamlFileApi: function (fileId) {
    return Delete('mec/developer/v1/files/helm-template-yaml?fileId=' + fileId)
  },
  // Get server list
  getHostsApi: function () {
    return Get('mec/developer/v1/hosts')
  },
  // Get project information
  getProjectInfoApi: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '?userId=' + userId)
  },
  // ObtaincsarPackage structure
  getAppPackageListApi: function (projectId, csarId) {
    return Get('mec/developer/v1/apprelease/' + projectId + '/' + csarId + '/action/get-pkg-structure')
  },
  // ObtaincsarPackage file content
  getAppFileApi: function (projectId, fileName) {
    return GetFun('mec/developer/v1/apprelease/' + projectId + '/' + 'action/get-pkg-content?fileName=' + fileName)
  },
  // Get rule configuration
  getReleaseConfigApi (projectId) {
    return Get('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config')
  },
  // save/Modify rule configuration
  saveRuleConfig (projectId, params, releaseId) {
    let method = releaseId ? Put : Post
    return method('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config', params)
  },
  // Application test
  getAtpTestApi: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '/action/atp?userId=' + userId)
  },
  // Upload application release details
  PostReleaseApi: function (projectId, params) {
    return Post('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config', params)
  },
  // Get app release details
  getReleaseApi: function (projectId) {
    return Get('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config')
  },
  // Modify app release details
  PutReleaseApi: function (projectId, params) {
    return Put('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config', params)
  },
  // releaseAPPToAppstore
  isPublishApi: function (projectId, userId, userName, param) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/upload?userId=' + userId + '&userName=' + userName, param)
  },
  // publicAPPofAPIability
  isPublicApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/open-api?userId=' + userId, '')
  }

}

let vmService = {
  getProjectVmResList: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '/vm?userId=' + userId)
  },
  getVmConfigData: function () {
    return Get('mec/developer/v1/vmconfig')
  },
  applyVmResource: function (projectId, userId, params) {
    return Post('mec/developer/v1/projects/' + projectId + '/vm-package?userId=' + userId, params)
  },
  getApplyVmResourceList: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '/vm-package?userId=' + userId)
  },
  deleteVmResource: function (projectId, userId) {
    return Delete('mec/developer/v1/projects/' + projectId + '/vm-package?userId=' + userId)
  },
  uploadFile: function (projectId, vmId, userId, params) {
    return Post('mec/developer/v1/projects/' + projectId + '/vm/' + vmId + '/files?userId=' + userId, params)
  },
  // Empty the test environment
  cleanTestVmEnvApi: function (projectId) {
    return Post('mec/developer/v1/projects/' + projectId + '/vm/clean')
  },
  // Deployment and commissioning
  vmDeployTestApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/vm-create?userId=' + userId)
  },
  // Delete the commissioning result
  deleteVmDeployListApi: function (projectId, vmId, userId) {
    return Delete('mec/developer/v1/projects/' + projectId + '/vm/' + vmId + '?userId=' + userId)
  },
  // Generate mirror
  createVmImageApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/vm/image?userId=' + userId)
  },
  // Get mirror list
  getCreateImageListApi: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '/vm/image?userId=' + userId)
  },
  // Delete mirror
  deleteVmImageApi: function (projectId, userId) {
    return Delete('mec/developer/v1/projects/' + projectId + '/vm/image?userId=' + userId)
  },
  // Download mirror
  downloadVmImageApi: function (projectId, vmId, userId) {
    return urlPrefix + 'mec/developer/v1/projects/' + projectId + '/vm/' + vmId + '/package?userId=' + userId
  }
}

let imageMgmtService = {
  getImageDataList: function (queryData) {
    return Post('mec/developer/v2/vmimages/action/get-list', queryData)
  },
  newImage: function (imgData) {
    return Post('mec/developer/v2/vmimages', imgData)
  },
  modifyImage: function (imgData, id) {
    return Put('mec/developer/v2/vmimages/' + id, imgData)
  },
  deleteImage: function (id) {
    return Delete('mec/developer/v2/vmimages/' + id)
  },
  publishImage: function (id) {
    return Put('mec/developer/v2/vmimages/' + id + '/action/publish')
  },
  resetImageStatus: function (id) {
    return Put('mec/developer/v2/vmimages/' + id + '/action/reset')
  },
  mergeImage: function (id, fileName, identifier) {
    return Get('mec/developer/v2/vmimages/' + id + '/action/merge?fileName=' + fileName + '&identifier=' + identifier)
  },
  cancelUploadImage: function (id, identifier) {
    return Delete('mec/developer/v2/vmimages/' + id + '/action/upload?identifier=' + identifier)
  },
  downloadSystemImageUrl: function (id) {
    return urlPrefix + 'mec/developer/v2/vmimages/' + id + '/action/download'
  },
  slimImage: function (imageId) {
    return Post('mec/developer/v2/vmimages/' + imageId + '/action/slim', '')
  },
  getOperationInfo (operationId) {
    return Get('mec/developer/v2/operations/' + operationId)
  },
  // ContainerImage
  newContainerImage: function (imgData) {
    return Post('mec/developer/v2/containerimages/', imgData)
  },
  deleteContainerImage: function (imageId) {
    return Delete('mec/developer/v2/containerimages/' + imageId)
  },
  modifyContainerImage: function (imgData, imageId) {
    return Put('mec/developer/v2/containerimages/' + imageId, imgData)
  },
  getContainerImageDataList: function (queryData) {
    return Post('mec/developer/v2/containerimages/action/get-all-images', queryData)
  },
  mergeContainerImage: function (imageId, fileName, identifier) {
    return Get('mec/developer/v2/containerimages/' + imageId + '/action/merge?fileName=' + fileName + '&guid=' + identifier)
  },
  downloadContainerImageUrl: function (imageId) {
    return urlPrefix + 'mec/developer/v2/containerimages/' + imageId + '/action/download'
  },
  synchronizeContainerImageApi: function () {
    return GetFun('mec/developer/v2/containerimages/action/synchronize')
  },
  cancelUploadContainerImage: function (imageId) {
    return Delete('mec/developer/v2/containerimages/' + imageId + '/action/upload')
  }
}

let profileMgmtApi = {
  getProfileDataList: function (params) {
    return Get('mec/developer/v2/profiles', params)
  },
  addProfile: function (params) {
    return Post('mec/developer/v2/profiles', params)
  },
  modifyProfile: function (profileId, params) {
    return Put('mec/developer/v2/profiles/' + profileId, params)
  },
  deleteOneProfile: function (profileId) {
    return Delete('mec/developer/v2/profiles/' + profileId)
  },
  downLoadProfileApi: function (profileId, appName) {
    let url = urlPrefix + 'mec/developer/v2/profiles/' + profileId + '/action/download?type=profileFile' + '&name=' + appName
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

let applicationEditorApi = {
  getReleasedPackage: function (params) {
    return Get('mec/developer/v2/released-packages', params)
  },
  getAppData: function (params) {
    return Post('mec/appstore/v2/apps/action/query', params, 'appstore')
  },
  syncApplication: function (params) {
    return Post('mec/developer/v2/released-packages', params)
  },
  getPkgStucture: function (packageId) {
    return Get('mec/developer/v2/released-packages/' + packageId + '/action/get-pkg-structure')
  },
  getPkgContent: function (packageId, params) {
    return Post('mec/developer/v2/released-packages/' + packageId + '/action/get-file-content', params)
  },
  modifyPkgFile: function (packageId, params) {
    return Put('mec/developer/v2/released-packages/' + packageId + '/action/edit-file-content', params)
  },
  deleteModifyApp: function (packageId) {
    return Delete('mec/developer/v2/released-packages/' + packageId)
  },
  publishModifyApp: function (packageId, params) {
    return Post('mec/developer/v2/released-packages/' + packageId + '/action/release', params)
  }
}
let commonApi = {
  // Call webgateWay to get interface response information
  getResponseCodeInfo: function (params) {
    let url = 'error-info?modules=' + params
    return getResCode(url, '')
  }
}
export {
  Plugin,
  Api,
  Test,
  Workspace,
  System,
  vmService,
  imageMgmtService,
  Capability,
  profileMgmtApi,
  applicationEditorApi,
  commonApi
}
