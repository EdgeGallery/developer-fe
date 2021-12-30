
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
import { devNavData } from './devNav.js'
import { appStoreNavData } from './appStoreNav.js'
import { mecmNavData } from './mecmNav.js'
import { systemNavData } from './thirdSystem.js'
import { FIRST_LEVEL_MENU_PATH } from '../constants'

const navData = [
  {
    id: '0',
    name: 'Home',
    path: FIRST_LEVEL_MENU_PATH.HOME,
    display: true
  },
  {
    id: '1',
    name: 'Developer',
    path: FIRST_LEVEL_MENU_PATH.DEVELOPER,
    display: true,
    children: devNavData
  },
  {
    id: '3',
    name: 'APP Store',
    path: FIRST_LEVEL_MENU_PATH.APPSTORE,
    display: true,
    children: appStoreNavData
  },
  {
    id: '4',
    name: 'MECM',
    path: FIRST_LEVEL_MENU_PATH.MECM,
    display: true,
    children: mecmNavData
  },
  {
    id: '5',
    name: 'System',
    path: '/system',
    display: true,
    children: systemNavData
  }
]

export default navData
