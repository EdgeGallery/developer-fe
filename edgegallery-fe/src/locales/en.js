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

import enLocale from 'element-ui/lib/locale/lang/en'
import enClassic from '../classic/locales/en.js'
import enHome from './home_en.js'
import enAppStore from './appstore_en.js'
import enCapability from './capability_en.js'
import enSandbox from './sandbox_en.js'
import enImages from './images_en.js'
import enAtp from './atp_en.js'
import enMecm from './mecm_en.js'
const en = {
  common: {
    classic: 'Classic',
    operation: 'Operation',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    finish: 'Finish',
    save: 'Save',
    close: 'Close',
    detail: 'Detail',
    select: 'Select',
    add: 'Add',
    login: 'Login',
    upload: 'Upload',
    start: 'Start',
    name: 'Name',
    describe: 'Describe',
    userName: 'User Name',
    enterUserName: 'Please enter user name',
    password: 'Password',
    enterPassword: 'Please enter password',
    pleaseSelect: 'Please select'
  },
  promptInformation: {
    confirmDelete: 'Confirm to delete the data?',
    deleteFailed: 'Failed to delete data!',
    editDataFailed: 'Failed to edit data!'
  },
  ...enLocale,
  ...enClassic,
  ...enHome,
  ...enAppStore,
  ...enCapability,
  ...enSandbox,
  ...enImages,
  ...enAtp,
  ...enMecm
}
export default en
