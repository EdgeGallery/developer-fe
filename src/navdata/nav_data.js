
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
    name: 'Test',
    path: '/mecDeveloper/test/how',
    pageId: '2.2.3',
    display: true,
    children: [
      {
        id: '3.10',
        name: 'How To Test',
        path: '/mecDeveloper/test/how',
        pageId: '2.2.3.1',
        display: true
      },
      {
        id: '3.11',
        name: 'Test Specification',
        path: '/mecDeveloper/test/specification',
        pageId: '2.2.3.2',
        display: true
      },
      {
        id: '3.12',
        name: 'Test Application',
        path: '/mecDeveloper/test/apply',
        pageId: '2.2.3.3',
        display: true
      },
      {
        id: '3.13',
        name: 'Test Task Management',
        path: '/mecDeveloper/test/task',
        pageId: '2.2.3.4',
        display: true
      }
    ]
  },
  {
    id: '3.14',
    name: 'Community',
    path: '/mecDeveloper/community/Community',
    pageId: '2.2.4',
    display: true
  },
  {
    id: '3.15',
    name: 'Workspace',
    path: '/mecDeveloper/work',
    pageId: '2.2.5',
    display: true
  }
]

export default {
  mecDeveloper
}
