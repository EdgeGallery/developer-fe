
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

const atpPathPre = NAV_PRE.ATP
const pathPre = NAV_PRE.DEVELOPER
const devNavData = [
  {
    id: '1.7',
    name: '应用孵化',
    path: '/EG/developer/home',
    display: true
  },
  {
    id: '1.3',
    name: '能力中心',
    path: pathPre + '/mecDeveloper/api/mep',
    display: true
  },
  {
    id: '1.8',
    name: '工具箱',
    path: '',
    display: true,
    children: [
      {
        id: '1.8.1',
        name: '应用编辑',
        path: '',
        display: true
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
  },
  {
    id: '2',
    name: '测试认证中心',
    path: atpPathPre + '/index',
    display: true,
    children: [
      {
        name: '测试场景管理',
        path: atpPathPre + '/scenarios',
        display: true,
        id: '4.2.1'
      }, {
        name: '测试套管理',
        path: atpPathPre + '/suites',
        display: true,
        id: '4.2.2'
      }, {
        name: '测试用例管理',
        path: atpPathPre + '/testcasemanage',
        display: true,
        id: '4.2.3'
      },
      {
        name: '任务管理',
        path: atpPathPre + '/tasklist',
        display: true,
        id: '4.3'
      },
      {
        name: '贡献管理',
        path: atpPathPre + '/contributionlist',
        display: true,
        id: '4.4',
        authority: ['ROLE_APPSTORE_ADMIN']
      },
      {
        name: '配置管理',
        path: atpPathPre + '/configurationlist',
        display: true,
        id: '4.5'
      }
    ]
  },
  {
    id: '1.5',
    name: '系统管理',
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
  }
]

export {
  devNavData
}
