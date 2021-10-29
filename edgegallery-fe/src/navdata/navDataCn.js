
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

import { FIRST_LEVEL_MENU_PATH } from '../constants'

const navDataCn = [
  {
    id: '0',
    name: '首页',
    path: FIRST_LEVEL_MENU_PATH.HOME,
    display: true
  },
  {
    id: '1',
    name: '应用孵化',
    path: FIRST_LEVEL_MENU_PATH.DEVELOPER,
    display: true
  },
  {
    id: '3',
    name: '应用商店',
    path: FIRST_LEVEL_MENU_PATH.APPSTORE,
    display: true
  },
  {
    id: '4',
    name: '应用部署',
    path: FIRST_LEVEL_MENU_PATH.MECM,
    display: true
  },
  {
    id: '5',
    name: '三方系统管理',
    path: FIRST_LEVEL_MENU_PATH.SYSTEM,
    display: true
  }
]

export default navDataCn
