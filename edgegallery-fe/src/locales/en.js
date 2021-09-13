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
const en = {
  home: {
  },
  common: {
    developing: 'The page is under development.'
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
    prompt: 'Prompt'
  },
  ...enLocale
}
export default en
