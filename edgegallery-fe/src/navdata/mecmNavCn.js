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

const pathPre = NAV_PRE.MECM

const mecmNavData = [
  {
    'id': '3.1',
    'icon': '',
    'name': '概览',
    'path': pathPre + '/',
    'pageId': '2.0',
    'display': false
  },
  {
    'id': '3.2',
    'name': '应用管理',
    'path': pathPre + '/app/pakage',
    'pageId': '2.0.1',
    'display': false,
    'children': [
      {
        'id': '3.2.1',
        'name': '应用包管理',
        'path': pathPre + '/mecm/app/package',
        'pageId': '2.0.1.1',
        'display': false
      },
      {
        'id': '3.2.3',
        'name': '应用实例管理',
        'path': pathPre + '/mecm/app/instance',
        'pageId': '2.0.1.3',
        'display': false
      }
    ]
  },
  {
    'id': '3.3',
    'name': '边缘节点',
    'path': pathPre + '/mecm/node/index',
    'pageId': '2.0.2',
    'display': false
  },
  {
    'id': '3.4',
    'name': '系统',
    'path': pathPre + '/systems',
    'pageId': '2.0.3',
    'display': false,
    'children': [
      {
        'id': '3.4.1',
        'name': 'MEPM 注册系统',
        'path': pathPre + '/mecm/system/mepm',
        'pageId': '2.0.3.1.1',
        'display': false
      },
      {
        'id': '3.4.3',
        'name': '应用仓库注册系统',
        'path': pathPre + '/mecm/system/appstore',
        'pageId': '2.0.3.1.3',
        'display': false
      }
    ]
  }
]

export {
  mecmNavData
}
