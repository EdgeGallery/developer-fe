
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
  PUT
  // DELETE
} from '../tools/request.js'
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

export {
  sandbox
}
