
/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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

const mecDeveloper = [
  {
    id: '3.1',
    name: 'Home',
    path: '/mecDeveloper',
    display: true
  },
  {
    id: '3.2',
    name: 'Integrated Tools',
    path: '/mecDeveloper/plugin/list',
    display: true,
    children: [
      {
        id: '3.3',
        name: 'Plugin',
        path: '/mecDeveloper/plugin/list',
        display: true
      },
      {
        id: '3.4',
        name: 'Upload',
        path: '/mecDeveloper/plugin/upload',
        display: true
      }
      /* {
        id: '3.16',
        name: 'ToolChain',
        path: '/mecDeveloper/plugin/toolchain',
        display: true
      } */
    ]
  },
  {
    id: '3.7',
    name: 'ToolBox',
    path: '/mecDeveloper/toolbox',
    authority: ['ROLE_DEVELOPER_ADMIN'],
    display: true,
    children: [
      {
        id: '3.8',
        name: 'Application Editor ',
        path: '/mecDeveloper/toolbox/appedit',
        display: true
      }
    ]
  },
  {
    id: '3.5',
    name: 'Ability Center',
    path: '/mecDeveloper/api/mep',
    display: true
  },
  {
    id: '3.15',
    name: 'Workspace',
    path: '/mecDeveloper/work',
    display: true
  },
  /* {
    id: '3.17',
    name: 'Community Lab',
    display: true
  }, */
  {
    id: '3.18',
    name: 'System',
    display: true,
    path: '/mecDeveloper/system',
    authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT'],
    children: [
      {
        id: '3.20',
        name: 'Host Management',
        path: '/mecDeveloper/system/host',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      },
      {
        id: '3.21',
        name: 'Ability Center Management',
        path: '/mecDeveloper/system/mep',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      },
      {
        id: '3.22',
        name: 'System Image Management',
        path: '/mecDeveloper/system/imagemgmt',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT']
      },
      {
        id: '3.23',
        name: 'Profile Management',
        path: '/mecDeveloper/system/profilemgmt',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN', 'ROLE_DEVELOPER_TENANT']
      }
    ]
  },
  {
    id: '3.6',
    name: 'Document',
    path: '/mecDeveloper/docs',
    display: true,
    children: [
      {
        id: '3.23',
        name: 'Platform Guide',
        path: '/mecDeveloper/docs',
        display: true
      },
      {
        id: '3.24',
        name: 'Interface Components',
        path: '/mecDeveloper/docs/component',
        display: true
      }
    ]
  }
]

export default {
  mecDeveloper
}
