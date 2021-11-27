
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

const pathPre = NAV_PRE.DEVELOPER
const devNavData = [
  {
    id: '1.1',
    name: '概览',
    path: pathPre + '/mecDeveloper',
    display: true
  },
  {
    id: '1.2',
    name: '集成工具',
    path: pathPre + '/mecDeveloper/plugin/list',
    display: true,
    children: [
      {
        id: '1.2.1',
        name: '插件',
        path: pathPre + '/mecDeveloper/plugin/list',
        display: true
      },
      {
        id: '1.2.2',
        name: '上传',
        path: pathPre + '/mecDeveloper/plugin/upload',
        display: true
      }
    ]
  },
  {
    id: '1.3',
    name: '能力中心',
    path: pathPre + '/mecDeveloper/api/mep',
    display: true
  },
  {
    id: '1.7',
    name: '应用孵化',
    path: '/EG/developer/home',
    display: true
  },
  {
    id: '1.4',
    name: '工作空间',
    path: pathPre + '/mecDeveloper/work',
    display: true
  },
  {
    id: '1.5',
    name: '系统',
    display: true,
    path: pathPre + '/mecDeveloper/system',
    authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT'],
    children: [
      {
        id: '1.5.1',
        name: '沙箱管理',
        path: pathPre + '/mecDeveloper/system/host',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      },
      {
        id: '1.5.2',
        name: '能力中心管理',
        path: pathPre + '/mecDeveloper/system/mep',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      },
      {
        id: '1.5.3',
        name: '系统镜像管理',
        path: pathPre + '/mecDeveloper/system/imagemgmt',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT']
      }
    ]
  },
  {
    id: '1.6',
    name: '文档',
    path: pathPre + '/mecDeveloper/docs',
    display: true,
    children: [
      {
        id: '1.6.1',
        name: '平台指南',
        path: pathPre + '/mecDeveloper/docs',
        display: true
      },
      {
        id: '1.6.2',
        name: '界面组件',
        path: pathPre + '/mecDeveloper/docs/component',
        display: true
      }
    ]
  }
]

export {
  devNavData
}
