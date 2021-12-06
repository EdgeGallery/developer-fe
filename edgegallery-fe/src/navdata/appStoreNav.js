
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

import { NAV_PRE } from '../constants.js'

const pathPre = NAV_PRE.APPSTORE

const appStoreNavData = [
  {
    id: '2.1',
    name: 'Overview',
    path: pathPre + '/home',
    display: true
  },
  {
    id: '2.2',
    name: 'APP Store',
    path: pathPre + '/index',
    display: true
  },
  {
    id: '2.3',
    name: 'My APP',
    path: pathPre + '/myapp',
    display: true,
    authority: ['ROLE_APPSTORE_ADMIN', 'ROLE_APPSTORE_TENANT']
  },
  {
    id: '2.1.8',
    name: 'Docs',
    path: pathPre + '/docs',
    display: true
  },
  {
    id: '2.4',
    name: 'APP Share',
    path: pathPre + '/appShare',
    display: true,
    authority: ['ROLE_APPSTORE_ADMIN'],
    children: [
      {
        id: '2.4.1',
        name: 'External AppStore Management',
        path: pathPre + '/apppromote',
        display: true
      }, {
        id: '2.4.2',
        name: 'App Promote',
        path: pathPre + '/apppromotion',
        display: true
      }, {
        id: '2.4.3',
        name: 'App Pull',
        path: pathPre + '/appPull',
        display: true
      }, {
        id: '2.4.4',
        name: 'Message Center',
        path: pathPre + '/msgCenter',
        display: true
      }, {
        id: '2.4.5',
        name: 'Operation Analyse',
        path: pathPre + '/operationAnalyse',
        display: true
      }
    ]
  },
  {
    id: '2.5',
    name: 'System',
    path: pathPre + '/system',
    display: true,
    authority: ['ROLE_APPSTORE_ADMIN'],
    children: [
      {
        id: '2.5.1',
        name: 'APP Manager',
        path: pathPre + '/appManager',
        display: true
      }, {
        id: '2.5.2',
        name: 'SystemHost',
        path: pathPre + '/systemHost',
        display: true
      }
    ]
  }
]

export {
  appStoreNavData
}
