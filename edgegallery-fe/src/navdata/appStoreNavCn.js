
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

import { NAV_PRE } from '../constants'

const pathPre = NAV_PRE.APPSTORE

const appStoreNavData = [
  {
    id: '2.1',
    name: '概览',
    path: pathPre + '/home',
    display: true
  },
  {
    id: '2.2',
    name: '应用仓库',
    path: pathPre + '/index',
    display: true
  },
  {
    id: '2.3',
    name: '我的应用',
    path: pathPre + '/myapp',
    display: true,
    authority: ['ROLE_APPSTORE_ADMIN', 'ROLE_APPSTORE_TENANT']
  },
  {
    id: '2.6',
    name: '文档',
    path: pathPre + '/docs',
    display: true
  },
  {
    id: '2.4',
    name: '应用共享',
    path: pathPre + '/appShare',
    display: true,
    authority: ['ROLE_APPSTORE_ADMIN'],
    children: [
      {
        id: '2.4.1',
        name: '外部应用仓库管理',
        path: pathPre + '/apppromote',
        display: true
      }, {
        id: '2.4.2',
        name: '应用推送',
        path: pathPre + '/apppromotion',
        display: true
      }, {
        id: '2.4.3',
        name: '应用拉取',
        path: pathPre + '/appPull',
        display: true
      }, {
        id: '2.4.4',
        name: '消息中心',
        path: pathPre + '/msgCenter',
        display: true
      }, {
        id: '2.4.5',
        name: '操作分析',
        path: pathPre + '/operationAnalyse',
        display: true
      }
    ]
  },
  {
    id: '2.5',
    name: '系统管理',
    path: pathPre + '/system',
    display: true,
    authority: ['ROLE_APPSTORE_ADMIN'],
    children: [
      {
        id: '2.5.1',
        name: '应用管理',
        path: pathPre + '/appManager',
        display: true
      }, {
        id: '2.5.2',
        name: '沙箱管理',
        path: pathPre + '/systemHost',
        display: true
      }
    ]
  }
]

export {
  appStoreNavData
}
