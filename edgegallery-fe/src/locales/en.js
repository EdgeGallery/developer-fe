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
    pleaseSelect: 'Please select',
    back: 'Back'
  },
  promptInformation: {
    confirmDelete: 'Confirm to delete the data?',
    deleteFailed: 'Failed to delete data!',
    editDataFailed: 'Failed to edit data!',
    noPermission: 'Guest user has no permissioin，please login and retry it!'
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
    hsInvalidHint: 'the current session has expired. Please choose to refresh the page or log in again.'
  },
  promptMessage: {
    prompt: 'Prompt',
    logoutPage: 'Are you sure to log out?'
  },
  thirdSystem: {
    threeSystem: 'Third party system management',
    search: 'Please enter name to search',
    allNum: 'allNum',
    active: 'active',
    invalid: 'invalid',
    systemName: 'name',
    url: 'URL',
    region: 'region',
    product: 'product',
    vendor: 'factory',
    version: 'vison',
    status: 'state',
    username: 'user',
    password: 'password',
    operation: 'operation',
    delete: 'delete',
    edit: 'edit',
    systemDetail: 'System details',
    add: 'add',
    sure: 'sure',
    cancel: 'cancle',
    icon: 'icon',
    deleteSucess: 'delete sucess',
    tootipSystemName: 'Please enter the system name',
    tootipProduct: 'Please enter the product name',
    tootipUrl: 'Please enter URL',
    tootipVersion: 'Please enter version information',
    tooltipRegion: 'Please enter deployment area',
    tooltipVendor: 'Please enter the vendor ',
    tooltipUsername: 'Please enter the username',
    tooltipPassword: 'Please enter the password',
    addStstemSucess: 'New message succeeded!',
    updateStstemSucess: 'Update succeeded!'
  },
  ...enLocale,
  ...enHome,
  ...enAppStore,
  ...enCapability,
  ...enSandbox,
  ...enImages,
  ...enAtp,
  ...enMecm,
  ...enApp
}
export default en
