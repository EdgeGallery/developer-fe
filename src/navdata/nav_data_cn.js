
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
    name: '首页',
    path: '/mecDeveloper',
    pageId: '2.2.0',
    display: true
  },
  {
    id: '3.2',
    name: '开发工具',
    path: '/mecDeveloper/plugin/list',
    pageId: '2.2.1',
    display: true,
    children: [
      {
        id: '3.3',
        name: '插件',
        path: '/mecDeveloper/plugin/list',
        pageId: '2.2.1.1',
        display: true
      },
      {
        id: '3.4',
        name: '上传',
        path: '/mecDeveloper/plugin/upload',
        pageId: '2.2.1.2',
        display: true
      },
      {
        id: '3.16',
        name: '工具链',
        path: '/mecDeveloper/plugin/toolchain',
        pageId: '2.2.1.3',
        display: true
      }
    ]
  },
  {
    id: '3.5',
    name: 'API',
    path: '/mecDeveloper/api/mep',
    pageId: '2.2.2',
    display: true,
    children: [
      {
        id: '3.6',
        name: 'MEP API',
        path: '/mecDeveloper/api/mep',
        pageId: '2.2.2.1',
        display: true
      },
      {
        id: '3.7',
        name: 'MEP-ECO API',
        path: '/mecDeveloper/api/mep-eco',
        pageId: '2.2.2.2',
        display: true
      }
    ]
  },
  {
    id: '3.9',
    name: '测试',
    path: '/mecDeveloper/test/how',
    pageId: '2.2.3',
    display: true,
    children: [
      {
        id: '3.10',
        name: '如何测试',
        path: '/mecDeveloper/test/how',
        pageId: '2.2.3.1',
        display: true
      },
      {
        id: '3.11',
        name: '测试规范',
        path: '/mecDeveloper/test/specification',
        pageId: '2.2.3.2',
        display: true
      },
      {
        id: '3.12',
        name: '测试应用',
        path: '/mecDeveloper/test/apply',
        pageId: '2.2.3.3',
        display: true
      },
      {
        id: '3.13',
        name: '测试任务管理',
        path: '/mecDeveloper/test/task',
        pageId: '2.2.3.4',
        display: true
      }
    ]
  },
  {
    id: '3.14',
    name: '社区',
    path: '/mecDeveloper/community/Community',
    pageId: '2.2.4',
    display: true
  },
  {
    id: '3.15',
    name: '工作空间',
    path: '/mecDeveloper/work',
    pageId: '2.2.5',
    display: true
  }
]

export default {
  mecDeveloper
}
