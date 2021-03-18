
/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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
    pageId: '2.2.0',
    display: true
  },
  {
    id: '3.2',
    name: 'DevTools',
    path: '/mecDeveloper/plugin/list',
    pageId: '2.2.1',
    display: true,
    children: [
      {
        id: '3.3',
        name: 'Plugin',
        path: '/mecDeveloper/plugin/list',
        pageId: '2.2.1.1',
        display: true
      },
      {
        id: '3.4',
        name: 'Upload',
        path: '/mecDeveloper/plugin/upload',
        pageId: '2.2.1.2',
        display: true
      },
      {
        id: '3.16',
        name: 'ToolChain',
        path: '/mecDeveloper/plugin/toolchain',
        pageId: '2.2.1.3',
        display: true
      }, {
        id: '3.2.4',
        name: 'Document',
        path: '/mecDeveloper/plugin/docs',
        pageId: '2.2.1.4',
        display: true
      }
    ]
  },
  {
    id: '3.5',
    name: 'Ability Center',
    path: '/mecDeveloper/api/mep', // TODO path优化
    pageId: '2.2.2',
    display: true
  },
  {
    id: '3.14',
    name: 'Community',
    display: true
  },
  {
    id: '3.15',
    name: 'Workspace',
    path: '/mecDeveloper/work',
    pageId: '2.2.5',
    display: true
  },
  {
    id: '3.17',
    name: 'Community Lab',
    display: true
  }, {
    id: '3.18',
    name: 'System',
    display: true,
    pageId: '2.2.6',
    path: '/mecDeveloper/system',
    authority: ['ROLE_DEVELOPER_ADMIN'],
    children: [
      {
        id: '3.20',
        name: 'Host Management',
        path: '/mecDeveloper/system/host',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN'],
        pageId: '2.2.6.2'
      },
      {
        id: '3.21',
        name: 'Ability Center Management',
        path: '/mecDeveloper/system/mep',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN'],
        pageId: '2.2.6.3'
      }
    ]
  }
]

export default {
  mecDeveloper
}
