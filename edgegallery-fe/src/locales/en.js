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
import enHome from './home_en.js'
import enApp from './app_en.js'
import enAppStore from './appstore_en.js'
import enCapability from './capability_en.js'
import enSandbox from './sandbox_en.js'
import enThirdsystem from './thirdsystem_en.js'
import enImages from './images_en.js'
import enAtp from './atp_en.js'
import enMecm from './mecm_en.js'
import enDevSystem from './devSystem_en.js'
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
    describe: 'Description',
    userName: 'User Name',
    enterUserName: 'Please enter user name',
    password: 'Password',
    enterPassword: 'Please enter password',
    pleaseSelect: 'Please select',
    back: 'Back',
    noData: 'No Data',
    exceptionServer: 'Service is abnormal, please double check',
    check: 'Check',
    download: 'Download',
    more: 'More',
    unknown: 'Unknown',
    all: 'All',
    reset: 'Reset'
  },
  promptInformation: {
    confirmDelete: 'Confirm to delete the data?',
    deleteFailed: 'Failed to delete data!',
    editDataSuccess: 'Edited data successfully!',
    editDataFailed: 'Failed to edit data!',
    noPermission: 'Guest user has no permissioin，please login and retry it!',
    fileIsEmpty: 'File content is empty!',
    addFailed: 'Failed to add data!',
    connectFailed: 'Failed to connect the VM. '
  },
  normal: {
    newVersion: 'New Version',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  nav: {
    logIn: 'Login',
    userAccountCenter: 'My Account',
    logOut: 'Logout',
    refresh: 'Refresh',
    reLogin: 'ReLogin',
    hsInvalidHintForTimeout: 'You have not operated for a long time, ',
    hsInvalidHintForLogout: 'You have logged in or logged out through other pages, ',
    hsInvalidHintForServerStopped: 'The server has been upgraded, ',
    hsInvalidHint: 'the current session has expired. Please choose to refresh the page or log in again.',
    accountInconsistent: 'Sorry! Maybe due to the browser\'s security policy, there is a problem that the cookie is blocked, resulting in the account being out of sync. Please clear the browser cookie cache and log in again.'
  },
  homePromptMessage: {
    prompt: 'Prompt',
    logoutPage: 'Are you sure to log out?',
    merging: 'File is merging',
    mergeSuccess: 'File merged successfully',
    mergeFailed: 'File merge failed'
  },
  ...enLocale,
  ...enHome,
  ...enAppStore,
  ...enCapability,
  ...enSandbox,
  ...enImages,
  ...enAtp,
  ...enMecm,
  ...enApp,
  ...enThirdsystem,
  ...enDevSystem
}
export default en
