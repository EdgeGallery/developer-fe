
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
const atpPathPre = NAV_PRE.ATP
const devNavData = [
  {
    id: '1.7',
    name: 'Incubation',
    path: '/EG/developer/home',
    display: true
  },
  {
    id: '1.3',
    name: 'Ability Center',
    path: pathPre + '/mecDeveloper/api/mep',
    display: true
  },
  {
    id: '1.8',
    name: 'Toolbox',
    path: '',
    display: true,
    children: [
      {
        id: '1.8.1',
        name: 'Application Editor',
        path: '',
        display: true
      }
    ]
  },
  {
    id: '1.6',
    name: 'Document',
    path: pathPre + '/mecDeveloper/docs',
    display: true,
    children: [
      {
        id: '1.6.1',
        name: 'Platform Guide',
        path: pathPre + '/mecDeveloper/docs',
        display: true
      },
      {
        id: '1.6.2',
        name: 'Interface Components',
        path: pathPre + '/mecDeveloper/docs/component',
        display: true
      }
    ]
  },
  {
    id: '4',
    name: 'Testing Center',
    path: atpPathPre + '/index',
    display: true,
    children: [
      {
        name: 'Scenarios Management',
        path: atpPathPre + '/scenarios',
        display: true,
        id: '4.2.1'
      }, {
        name: 'Suites Management',
        path: atpPathPre + '/suites',
        display: true,
        id: '4.2.2'
      }, {
        name: 'Case Management',
        path: atpPathPre + '/testcasemanage',
        display: true,
        id: '4.2.3'
      },
      {
        name: 'Task',
        path: atpPathPre + '/tasklist',
        display: true,
        id: '4.3'
      },
      {
        name: 'Contribution Case',
        path: atpPathPre + '/contributionlist',
        display: true,
        id: '4.4',
        authority: ['ROLE_APPSTORE_ADMIN']
      },
      {
        name: 'Configuration',
        path: atpPathPre + '/configurationlist',
        display: true,
        id: '4.5'
      }
    ]
  },
  {
    id: '1.5',
    name: 'System',
    display: true,
    path: pathPre + '/mecDeveloper/system',
    authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT'],
    children: [
      {
        id: '1.5.1',
        name: 'Host Management',
        path: pathPre + '/mecDeveloper/system/host',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      },
      {
        id: '1.5.2',
        name: 'Ability Center Management',
        path: pathPre + '/mecDeveloper/system/mep',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      },
      {
        id: '1.5.3',
        name: 'System Image Management',
        path: pathPre + '/mecDeveloper/system/imagemgmt',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT']
      },
      {
        id: '1.5.4',
        name: 'Profile Management',
        path: pathPre + '/mecDeveloper/system/profilemgmt',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT']
      }
    ]
  }
]

export {
  devNavData
}
