
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
const navData = [
  {
    id: '1.1',
    name: 'Overview',
    path: pathPre + '/mecDeveloper',
    display: true
  },
  {
    id: '1.2',
    name: 'Integrated Tools',
    path: pathPre + '/mecDeveloper/plugin/list',
    display: true,
    children: [
      {
        id: '1.2.1',
        name: 'Plugin',
        path: pathPre + '/mecDeveloper/plugin/list',
        display: true
      },
      {
        id: '1.2.2',
        name: 'Upload',
        path: pathPre + '/mecDeveloper/plugin/upload',
        display: true
      }
    ]
  },
  {
    id: '1.3',
    name: 'Ability Center',
    path: pathPre + '/mecDeveloper/api/mep',
    display: true
  },
  {
    id: '1.4',
    name: 'Workspace',
    path: pathPre + '/mecDeveloper/work',
    display: true
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
  }
]

export default navData
