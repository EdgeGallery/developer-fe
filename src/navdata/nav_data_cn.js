
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
    name: '首页',
    path: '/mecDeveloper',
    display: true
  },
  {
    id: '3.2',
    name: '集成工具',
    path: '/mecDeveloper/plugin/list',
    display: true,
    children: [
      {
        id: '3.3',
        name: '插件',
        path: '/mecDeveloper/plugin/list',
        display: true
      },
      {
        id: '3.4',
        name: '上传',
        path: '/mecDeveloper/plugin/upload',
        display: true
      },
      {
        id: '3.16',
        name: '工具链',
        path: '/mecDeveloper/plugin/toolchain',
        display: true
      }, {
        id: '3.2.4',
        name: '文档',
        path: '/mecDeveloper/plugin/docs',
        display: true
      }
    ]
  },
  {
    id: '3.5',
    name: '能力中心',
    path: '/mecDeveloper/api/mep',
    display: true
  },
  {
    id: '3.15',
    name: '工作空间',
    path: '/mecDeveloper/work',
    display: true
  },
  {
    id: '3.17',
    name: '社区实验室',
    display: true
  }, {
    id: '3.18',
    name: '系统',
    display: true,
    path: '/mecDeveloper/system',
    authority: ['ROLE_DEVELOPER_ADMIN'],
    children: [
      {
        id: '3.20',
        name: '沙箱管理',
        path: '/mecDeveloper/system/host',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      },
      {
        id: '3.21',
        name: '能力中心管理',
        path: '/mecDeveloper/system/mep',
        display: true,
        authority: ['ROLE_DEVELOPER_ADMIN']
      }
    ]
  }
]

export default {
  mecDeveloper
}
