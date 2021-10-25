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
import cnClassic from '../classic/locales/cn.js'
import cnHome from './home_cn.js'
import cnApplication from './application_cn.js'
import cnCapability from './capability_cn.js'
import cnSandbox from './sandbox_cn.js'
import cnImages from './images_cn.js'
import cnAtp from './atp_cn.js'
const cn = {
  normal: {
    newVersion: '新版',
    classic: '经典版'
  },
  ...zhLocale,
  ...cnClassic,
  ...cnHome,
  ...cnApplication,
  ...cnCapability,
  ...cnSandbox,
  ...cnImages,
  ...cnAtp
}
export default cn
