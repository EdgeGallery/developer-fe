
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

import { NAV_PRE } from './constants'

const pathPre = NAV_PRE.ATP

const navData = [
  {
    name: 'Overview',
    path: pathPre + '/index',
    display: true,
    id: '4.1'
  },
  {
    name: 'Test Model',
    display: true,
    id: '4.2',
    children: [
      {
        name: 'Scenarios Management',
        path: pathPre + '/scenarios',
        display: true,
        id: '4.2.1'
      }, {
        name: 'Suites Management',
        path: pathPre + '/suites',
        display: true,
        id: '4.2.2'
      }, {
        name: 'Case Management',
        path: pathPre + '/testcasemanage',
        display: true,
        id: '4.2.3'
      }
    ]
  },
  {
    name: 'Task',
    path: pathPre + '/tasklist',
    display: true,
    id: '4.3'
  },
  {
    name: 'Contribution Case',
    path: pathPre + '/contributionlist',
    display: true,
    id: '4.4',
    authority: ['ROLE_APPSTORE_ADMIN']
  },
  {
    name: 'Configuration',
    path: pathPre + '/configurationlist',
    display: true,
    id: '4.5'
  }
]

export default navData
