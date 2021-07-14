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

import { Get, Delete, Put, Post, urlPrefix, urlPrefixTool, downloadFile, GetFun } from './tool.js'

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
    return Get('mec/developer/v1/capability-groups/openmep-api')
  },
  // ObtainMEP-EcoService list
  getMepEcoServiceApi: function () {
    return Get('mec/developer/v1/capability-groups/openmepeco-api')
  },
  // Get a list of services
  getServiceApi: function (type) {
    return Get('mec/developer/v1/capability-groups/open-api/' + type)
  },
  // ObtainApi-swaggerUIpath
  getSwaggerUrlApi: function (apiFileId, userId) {
    return urlPrefix + 'mec/developer/v1/files/' + apiFileId + '?userId=' + userId + '&type=OPENMEP'
  },
  // SDKdownload
  downloadSDKApi: function (fileId, lan) {
    return urlPrefix + 'mec/developer/v1/files/sdk/' + fileId + '/download/' + lan
  },
  // Delete publicAPI
  deletePublicApi: function (capabilityId, userId) {
    return Delete('mec/developer/v1/capability-groups/capabilities/' + capabilityId + '?userId=' + userId)
  },
  // Get all ability groups
  getCapabilityGroupsApi: function () {
    return Get('mec/developer/v1/capability-groups')
  },
  // Get agroupList of services under
  getServiceListApi: function (groupId) {
    return Get('mec/developer/v1/capability-groups/' + groupId)
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
  deleteHost: function (hostId) {
    return Delete(`mec/developer/v1/system/hosts/${hostId}`)
  },
  deleteService: function (params) {
    return Delete('mec/developer/v1/system/capability', params)
  },
  getLogData: function (hostId) {
    return Get(`mec/developer/v1/system/hosts/${hostId}/log`)
  },
  saveHostInfo: function (params) {
    const func = params.hostId ? Put : Post
    const path = params.hostId ? `mec/developer/v1/system/hosts/${params.hostId}` : 'mec/developer/v1/system/hosts'
    const data = { ...params }
    return func(path, data)
  },
  saveService: function (params) {
    const func = Post
    const path = 'mec/developer/v1/system/capability'
    return func(path, params)
  },
  getHosts: function (params) {
    return Get('mec/developer/v1/system/hosts', params)
  },
  getSerives: function (params) {
    return Get('mec/developer/v1/system/capability', params)
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
  getProjectListApi: function (userId) {
    return Get('mec/developer/v1/projects/?userId=' + userId)
  },
  // Get the project icon
  getIconApi: function (fileId, userId) {
    return urlPrefix + 'mec/developer/v1/files/' + fileId + '?userId=' + userId + '&type=OPENMEP_ECO'
  },
  getServiceIconApi: function (fileId, userId) {
    return urlPrefix + 'mec/developer/v1/files/' + fileId + '?userId=' + userId + '&type=OPENMEP'
  },
  // Delete item
  deleteProjectApi: function (itemId, userId) {
    return Delete('mec/developer/v1/projects/' + itemId + '?userId=' + userId)
  },
  // Staging icon generation iconID
  postIconFileIdApi: function (userId, params) {
    return Post('mec/developer/v1/files?userId=' + userId, params)
  },
  // Get a list of capabilities details services
  getServiceListApi: function (groupId) {
    return Get('mec/developer/v1/capability-groups/' + groupId)
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
  // Get uploadedApifile
  getApiFileApi: function (appApiFileId, userId) {
    return Get('mec/developer/v1/files/api-info/' + appApiFileId + '?userId=' + userId)
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
  isPublishApi: function (projectId, userId, userName) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/upload?userId=' + userId + '&userName=' + userName, '')
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
  getImageDataList: function (queryData, userId) {
    return Post('mec/developer/v1/system/images/list?userId=' + userId, queryData)
  },
  newImage: function (imgData, userId) {
    return Post('mec/developer/v1/system/images?userId=' + userId, imgData)
  },
  modifyImage: function (imgData, systemId, userId) {
    return Put('mec/developer/v1/system/images/' + systemId + '?userId=' + userId, imgData)
  },
  deleteImage: function (systemId, userId) {
    return Delete('mec/developer/v1/system/images/' + systemId + '?userId=' + userId)
  },
  publishImage: function (systemId, userId) {
    return Put('mec/developer/v1/system/images/' + systemId + '/publish?userId=' + userId)
  },
  mergeImage: function (systemId, fileName, identifier) {
    return Get('mec/developer/v1/system/images/' + systemId + '/merge?fileName=' + fileName + '&identifier=' + identifier)
  },
  cancelUploadImage: function (systemId, identifier) {
    return Delete('mec/developer/v1/system/images/' + systemId + '/upload?identifier=' + identifier)
  },
  downloadSystemImageUrl: function (systemId, userId) {
    return urlPrefix + 'mec/developer/v1/system/images/' + systemId + '/download?userId=' + userId
  }
}

export {
  Plugin,
  Api,
  Test,
  Workspace,
  System,
  vmService,
  imageMgmtService
}
