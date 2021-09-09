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

const pathPre = NAV_PRE.MECM

const NavData = [
  {
    'id': '3.1',
    'icon': '',
    'name': 'Overview',
    'path': pathPre + '/',
    'pageId': '2.0',
    'display': false
  },
  {
    'id': '3.2',
    'name': 'APP Management',
    'path': pathPre + '/app/pakage',
    'pageId': '2.0.1',
    'display': false,
    'children': [
      {
        'id': '3.3',
        'name': 'Package Management',
        'path': pathPre + '/mecm/app/package',
        'pageId': '2.0.1.1',
        'display': false
      },
      {
        'id': '3.5',
        'name': 'App Instance List',
        'path': pathPre + '/mecm/app/instance',
        'pageId': '2.0.1.3',
        'display': false
      }
    ]
  },
  {
    'id': '3.6',
    'name': 'Edge Nodes',
    'path': pathPre + '/mecm/node/index',
    'pageId': '2.0.2',
    'display': false
  },
  {
    'id': '3.9',
    'name': 'Systems',
    'path': pathPre + '/systems',
    'pageId': '2.0.3',
    'display': false,
    'children': [
      {
        'id': '3.11',
        'name': 'MEPM',
        'path': pathPre + '/mecm/system/mepm',
        'pageId': '2.0.3.1.1',
        'display': false
      },
      {
        'id': '3.12',
        'name': 'App Store',
        'path': pathPre + '/mecm/system/appstore',
        'pageId': '2.0.3.1.3',
        'display': false
      }
    ]
  }
]

export default NavData
