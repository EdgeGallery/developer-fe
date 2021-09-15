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

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  home: {
  },
  common: {
    developing: '页面正在开发中。'
  },
  nav: {
    logIn: '登录',
    userAccountCenter: '我的帐号',
    logOut: '注销',
    refresh: '刷新',
    reLogin: '重新登录',
    hsInvalidHintForTimeout: '您长时间未操作，',
    hsInvalidHintForLogout: '您通过其它页面执行了登录或注销操作，',
    hsInvalidHintForServerStopped: '后台服务升级，',
    hsInvalidHint: '当前会话已失效。请选择刷新页面或重新登录。'
  },
  promptMessage: {
    prompt: '提示'
  },
  ...zhLocale
}
export default cn
