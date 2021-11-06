
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
  GET, POST
  // POST,
  // PUT,
  // DELETE
} from '../tools/request.js'

const applicationApi = {
  getApplicationList: function () {
    return GET('/mec/developer/v2/applications?limit=12&offset=0')
  },
  getIcon: function (iconFileId) {
    return GET('/mec/developer/v2/files/' + iconFileId + '/action/get-file-stream')
  },
  uploadAppIcon: function (params) {
    return POST('/mec/developer/v2/files', params)
  },
  createNewApp: function (params) {
    return POST('/mec/developer/v2/applications', params)
  },
  getServiceList: function () {
    return GET('/mec/developer/v2/query/capability-groups/type/OPENMEP')
  },
  getCapabilityByGroupId: function (groupId) {
    return GET('mec/developer/v2/query/capabilities/group-id/' + groupId)
  },
  getApiUrl: function (apiFileId) {
    return 'mec/developer/v2/files/' + apiFileId
  }
}

export {
  applicationApi
}
