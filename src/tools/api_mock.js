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

import axios from 'axios'
require('../mock.js')

let Workspace = {
  getProjectListApi: function (userId) {
    return axios.get('/mock/developer/projectlist')
  },
  getIconApi: function (fileId, userId) {
    return ''
  },
  getProjectInfoApi: function () {
    return axios.get('/mock/developer/projectinfo')
  }
}
let vmService = {
  getProjectVmResList: function () {
    return axios.get('/mock/developer/project/vmlist')
  },
  getVmConfigData: function () {
    return axios.get('/mock/developer/vmconfig')
  },
  applyVmResource: function (projectId, params) {
    return axios.get('/mock/donothing')
  },
  deleteVmResource: function (projectId, vmId) {
    return axios.get('/mock/donothing')
  },
  uploadFile: function (projectId, params) {
    return axios.get('/mock/donothing')
  },
  getCreateImageListApi: function () {
    return axios.get('/mock/developer/imageList')
  }
}
let imageMgmtService = {
  getImageDataList: function (queryData, userId) {
    return axios.get('/mock/developer/system/systemimage/list')
  },
  newImage: function (imgData, userId) {
    return axios.get('/mock/donothing')
  },
  modifyImage: function (imgData, systemId, userId) {
    return axios.get('/mock/donothing')
  },
  deleteImage: function (systemId, userId) {
    return axios.get('/mock/donothing')
  },
  publishImage: function (systemId, userId) {
    return axios.get('/mock/donothing')
  },
  resetImageStatus: function (systemId, userId) {
    return axios.get('/mock/donothing')
  },
  mergeImage: function (systemId, fileName, identifier) {
    return axios.get('/mock/donothing')
  },
  cancelUploadImage: function (systemId, identifier) {
    return axios.get('/mock/donothing')
  },
  downloadSystemImageUrl: function (systemId, userId) {
    return 'mec/developer/v1/system/images/' + systemId + '/download?userId=' + userId
  }
}

export {
  Workspace,
  vmService,
  imageMgmtService
}
