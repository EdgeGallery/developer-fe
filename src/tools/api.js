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
  // 获取插件列表
  getPluginListApi: function (limitSize, offsetPage, inputPluginName, selectCodeLanguage) {
    return Get('mec/developer/v1/plugins/?pluginType=1&limit=' + limitSize + '&offset=' + offsetPage + '&pluginName=' + inputPluginName + '&codeLanguage=' + selectCodeLanguage)
  },
  // 获取插件图标
  getImageUrlApi: function (pluginId) {
    return urlPrefix + 'mec/developer/v1/plugins/' + pluginId + '/action/get-logofile'
  },
  // 获取插件下载路径
  getDownloadUrlApi: function (pluginId) {
    return urlPrefix + 'mec/developer/v1/plugins/' + pluginId + '/action/download'
  },
  // 删除插件
  deletePluginApi: function (pluginId, userId) {
    return Delete('mec/developer/v1/plugins/' + pluginId + '?userId=' + userId)
  },
  // 给插件评分
  ratePluginApi: function (rateId, valueRate, userId, userName) {
    return Put('mec/developer/v1/plugins/' + rateId + '/action/score?score=' + valueRate + '&userId=' + userId + '&userName=' + userName)
  },
  // 上传插件
  uploadPluginApi: function (params) {
    return Post('mec/developer/v1/plugins/', params)
  },
  // 获取已上传的源码
  getSourceCodeApi: function (userId, type) {
    return Get('mec/toolchain/v1/porting/' + userId, '', type)
  },
  // 删除源码
  deleteSourceCodeApi: function (userId, type) {
    return Delete('mec/toolchain/v1/porting/' + userId, '', type)
  },
  // 上传源码
  uploadSourceCodeApi: function (userId, params, type) {
    return Post('mec/toolchain/v1/porting/' + userId, params, type)
  },
  // 分析源码
  analysisCodeApi: function (userId, params, type) {
    return Post('mec/toolchain/v1/porting/' + userId + '/tasks', params, type)
  },
  // 获取扫描任务列表
  getScanTaskApi: function (userId, type) {
    return Get('mec/toolchain/v1/porting/' + userId + '/tasks', '', type)
  },
  // 下载报告
  downLoadReportApi: function (userId, reportId) {
    return urlPrefixTool + 'mec/toolchain/v1/porting/' + userId + '/tasks/' + reportId + '/download'
  },
  // 删除报告
  deleteReportApi: function (userId, reportId, type) {
    return Delete('mec/toolchain/v1/porting/' + userId + '/tasks/' + reportId, '', type)
  },
  // 获取单个报告信息
  getTaskInformationApi: function (userId, reportId, type) {
    return Get('mec/toolchain/v1/porting/' + userId + '/tasks/' + reportId, '', type)
  }
}

let Api = {
  // 获取Mep服务列表
  getMepServiceApi: function () {
    return Get('mec/developer/v1/capability-groups/openmep-api')
  },
  // 获取MEP-Eco服务列表
  getMepEcoServiceApi: function () {
    return Get('mec/developer/v1/capability-groups/openmepeco-api')
  },
  // 获取服务列表
  getServiceApi: function (type) {
    return Get('mec/developer/v1/capability-groups/open-api/' + type)
  },
  // 获取Api-swaggerUI路径
  getSwaggerUrlApi: function (apiFileId, userId) {
    return urlPrefix + 'mec/developer/v1/files/' + apiFileId + '?userId=' + userId + '&type=OPENMEP'
  },
  // SDK下载
  downloadSDKApi: function (fileId, lan) {
    return urlPrefix + 'mec/developer/v1/files/sdk/' + fileId + '/download/' + lan
  },
  // 删除公开的API
  deletePublicApi: function (capabilityId, userId) {
    return Delete('mec/developer/v1/capability-groups/capabilities/' + capabilityId + '?userId=' + userId)
  },
  // 获取所有能力组
  getCapabilityGroupsApi: function () {
    return Get('mec/developer/v1/capability-groups')
  },
  // 获取某group下的服务列表
  getServiceListApi: function (groupId) {
    return Get('mec/developer/v1/capability-groups/' + groupId)
  }
}

let Test = {
  // 上传应用APP
  uploadAppApi: function (params) {
    return Post('mec/developer/v1/apps/', params)
  },
  // 上传成功后开始测试任务
  startTestApi: function (appId, userId) {
    return Get('mec/developer/v1/apps/' + appId + '/action/start-test?userId=' + userId)
  },
  // 获取测试任务列表
  getTaskListApi: function (userId, params) {
    return Get('mec/developer/v1/apps/?userId=' + userId, params)
  },
  // 获取测试子任务
  getSubTaskApi: function (appId, taskId) {
    return Get('mec/developer/v1/apps/' + appId + '/task/' + taskId + '/subtasks')
  },
  // 测试完成后上传到AppStore
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
  // 测试并保存详情中节点信息
  saveNodeInfo: function (userId, params) {
    const { ip, port } = params
    const func = params.hostId ? Put : Post
    const path = params.hostId ? `mec/developer/v1/hosts/${params.hostId}/?userId=${userId}` : `mec/developer/v1/hosts/?userId=${userId}`
    const data = { architecture: 'X86', userId, status: 'NORMAL', ip, port, name: ip, address: ip }
    return func(path, data)
  },
  // 获取详情中节点信息
  getNodeInfo: function (userId) {
    return Get('mec/developer/v1/hosts?userId=' + userId)
  },
  // 获取项目列表
  getProjectListApi: function (userId) {
    return Get('mec/developer/v1/projects/?userId=' + userId)
  },
  // 获取项目图标
  getIconApi: function (fileId, userId) {
    return urlPrefix + 'mec/developer/v1/files/' + fileId + '?userId=' + userId + '&type=OPENMEP_ECO'
  },
  // 删除项目
  deleteProjectApi: function (itemId, userId) {
    return Delete('mec/developer/v1/projects/' + itemId + '?userId=' + userId)
  },
  // 暂存图标生成图标ID
  postIconFileIdApi: function (userId, params) {
    return Post('mec/developer/v1/files?userId=' + userId, params)
  },
  // 获取能力组
  getCapabilityListApi: function () {
    return Get('mec/developer/v1/capability-groups')
  },
  // 获取能力详情服务列表
  getServiceListApi: function (groupId) {
    return Get('mec/developer/v1/capability-groups/' + groupId)
  },
  // 下载样例代码
  getSampleCodeApi: function (apiFileIdArr) {
    let params = {
      url: 'mec/developer/v1/files/samplecode',
      params: apiFileIdArr
    }
    return downloadFile(params)
  },
  // 获取样例代码结构
  getSampleListApi: function (apiFileIdArr) {
    return Post('mec/developer/v1/files/samplecode/get-pkg-structure', apiFileIdArr)
  },
  // 获取样例代码内容
  getSampleContentApi: function (fileName) {
    return Get('mec/developer/v1/files/samplecode/get-file-content?fileName=' + fileName)
  },
  // 新建/迁移项目
  newProjectApi: function (userId, params) {
    return Post('mec/developer/v1/projects/?userId=' + userId, params)
  },
  // 获取Api的swaggerUI路径
  getApiUrl: function (apiFileId, userId, type) {
    return urlPrefix + 'mec/developer/v1/files/' + apiFileId + '?userId=' + userId + '&type=' + type
  },
  // 获取以前提交过的配置
  getTestConfigApi: function (projectId) {
    return Get('mec/developer/v1/projects/' + projectId + '/test-config')
  },
  // 刷新部署状态结果
  refreshDeployStatusApi: function (projectId) {
    return Get('mec/developer/v1/projects/' + projectId + '/container/workStatus')
  },
  // 上传配置
  postTestConfigApi: function (projectId, userId, params) {
    return Post('mec/developer/v1/projects/' + projectId + '/test-config?userId=' + userId, params)
  },
  // 修改配置
  putTestConfigApi: function (projectId, userId, params) {
    return Put('mec/developer/v1/projects/' + projectId + '/test-config?userId=' + userId, params)
  },
  // 保存可视化配置
  /* postConfigVisualApi: function (projectId, userId, params, configType) {
    return Post('mec/developer/v1/deploy/' + projectId + '?userId=' + userId + '&configType=' + configType, params)
  }, */
  postConfigVisualApi: function (projectId, userId, params, configType) {
    return Post('mec/developer/v1/deploy/' + projectId + '/action/save-yaml?userId=' + userId + '&configType=' + configType, params)
  },
  // 获取生成的可视化配置文件
  getConfigVisualApi: function (fileId) {
    return Get('mec/developer/v1/deploy/' + fileId)
  },
  // 回显生成的可视化配置文件
  getEchoConfigFileApi: function (fileId) {
    return Get('mec/developer/v1/deploy/' + fileId + '/action/get-json')
  },
  // 编辑生成的可视化配置文件
  editConfigVisualApi: function (fileId, params) {
    return Put('mec/developer/v1/deploy/' + fileId, params)
  },
  // 部署构建测试
  deployTestApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/deploy?userId=' + userId, '')
  },
  // 终止部署
  terminateProjectAPI: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/terminate?userId=' + userId, '')
  },
  // 清空测试环境
  cleanTestEnvApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/clean?userId=' + userId, '')
  },
  // 添加镜像
  addImageNameApi: function (projectId, params) {
    return Post('mec/developer/v1/projects/' + projectId + '/image', params)
  },
  // 删除镜像
  deleteImageNameApi: function (projectId, itemId) {
    return Delete('mec/developer/v1/projects/' + projectId + '/image/' + itemId)
  },
  // 上传yaml文件
  submitYamlFileApi: function (userId, projectId, params, configType) {
    return Post('mec/developer/v1/files/helm-template-yaml?userId=' + userId + '&projectId=' + projectId + '&configType=' + configType, params)
  },
  // 上传Api文件
  submitApiFileApi: function (userId, params) {
    return Post('mec/developer/v1/files?userId=' + userId, params)
  },
  // 获取上传的Api文件
  getApiFileApi: function (appApiFileId, userId) {
    return Get('mec/developer/v1/files/api-info/' + appApiFileId + '?userId=' + userId)
  },
  // 获取已添加的镜像
  getImageApi: function (projectId, params) {
    return Get('mec/developer/v1/projects/' + projectId + '/image', params)
  },
  // 获取已上传的yaml文件
  getYamlFileApi: function (userId, projectId) {
    return Get('mec/developer/v1/files/helm-template-yaml?userId=' + userId + '&projectId=' + projectId)
  },
  // 删除已上传的yaml文件
  deleteYamlFileApi: function (fileId) {
    return Delete('mec/developer/v1/files/helm-template-yaml?fileId=' + fileId)
  },
  // 获取服务器列表
  getHostsApi: function () {
    return Get('mec/developer/v1/hosts')
  },
  // 获取项目信息
  getProjectInfoApi: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '?userId=' + userId)
  },
  // 获取csar包结构
  getAppPackageListApi: function (projectId, csarId) {
    return Get('mec/developer/v1/apprelease/' + projectId + '/' + csarId + '/action/get-pkg-structure')
  },
  // 获取csar包文件内容
  getAppFileApi: function (projectId, fileName) {
    return GetFun('mec/developer/v1/apprelease/' + projectId + '/' + 'action/get-pkg-content?fileName=' + fileName)
  },
  // 获取规则配置
  getReleaseConfigApi (projectId) {
    return Get('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config')
  },
  // 保存/修改规则配置
  saveRuleConfig (projectId, params, releaseId) {
    let method = releaseId ? Put : Post
    return method('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config', params)
  },
  // 应用测试
  getAtpTestApi: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '/action/atp?userId=' + userId)
  },
  // 上传应用发布详情
  PostReleaseApi: function (projectId, params) {
    return Post('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config', params)
  },
  // 获取应用发布详情
  getReleaseApi: function (projectId) {
    return Get('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config')
  },
  // 修改应用发布详情
  PutReleaseApi: function (projectId, params) {
    return Put('mec/developer/v1/releaseconfig/' + projectId + '/action/release-config', params)
  },
  // 发布APP到Appstore
  isPublishApi: function (projectId, userId, userName) {
    return Post('mec/developer/v1/projects/' + projectId + '/action/upload?userId=' + userId + '&userName=' + userName, '')
  },
  // 公开APP的API能力
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
  // 部署调测
  vmDeployTestApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/vm-create?userId=' + userId)
  },
  // 删除调测结果
  deleteVmDeployListApi: function (projectId, vmId, userId) {
    return Delete('mec/developer/v1/projects/' + projectId + '/vm/' + vmId + '?userId=' + userId)
  },
  // 生成镜像
  createVmImageApi: function (projectId, userId) {
    return Post('mec/developer/v1/projects/' + projectId + '/vm/image?userId=' + userId)
  },
  // 获取镜像列表
  getCreateImageListApi: function (projectId, userId) {
    return Get('mec/developer/v1/projects/' + projectId + '/vm/image?userId=' + userId)
  },
  // 删除镜像
  deleteVmImageApi: function (projectId, userId) {
    return Delete('mec/developer/v1/projects/' + projectId + '/vm/image?userId=' + userId)
  },
  // 下载镜像
  downloadVmImageApi: function (projectId, vmId, userId) {
    return urlPrefix + 'mec/developer/v1/projects/' + projectId + '/vm/' + vmId + '/package?userId=' + userId
  }
}

export {
  Plugin,
  Api,
  Test,
  Workspace,
  System,
  vmService
}
