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

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/home/Home.vue')
    },
    {
      path: '',
      component: () => import('../components/layout/Layout.vue'),
      meta: {
        id: '3.0'
      },
      children: [
        {
          path: 'mecDeveloper',
          name: 'home',
          component: () => import('../pages/home/Home.vue'),
          meta: {
            id: '3.0'
          }
        },
        {
          path: 'mecDeveloper/plugin/list',
          component: () => import('../pages/plugin/List.vue'),
          meta: {
            keepAlive: true, // 此组件需要被缓存
            id: '3.1.1'
          }
        },
        {
          path: 'mecDeveloper/plugin/upload',
          name: 'upload',
          component: () => import('../pages/plugin/Upload.vue'),
          meta: {
            id: '3.1.3'
          }
        },
        {
          path: 'mecDeveloper/plugin/detail',
          name: 'listDetail',
          component: () => import('../pages/plugin/Detail.vue'),
          meta: {
            id: '3.1.4'
          }
        },
        {
          path: 'mecDeveloper/api/mep',
          name: 'mep',
          component: () => import('../pages/api/MEP.vue'),
          meta: {
            id: '3.2.1'
          }
        },
        {
          path: 'mecDeveloper/api/mep-eco',
          name: 'mep-eco',
          component: () => import('../pages/api/MepEco.vue'),
          meta: {
            id: '3.2.2'
          }
        },
        {
          path: 'mecDeveloper/api/swagger',
          name: 'appapi',
          component: () => import('../pages/api/MecApi.vue'),
          meta: {
            id: '3.2.3'
          }
        },
        {
          path: 'mecDeveloper/api/detail',
          name: 'apidetail',
          component: () => import('../pages/api/ApiDetail.vue'),
          meta: {
            id: '3.2.4'
          }
        },
        {
          path: 'mecDeveloper/test/how',
          name: 'how',
          component: () => import('../pages/test/How.vue'),
          meta: {
            id: '3.3.1'
          }
        },
        {
          path: 'mecDeveloper/test/specification',
          name: 'how',
          component: () => import('../components/common/Developing.vue'),
          meta: {
            id: '3.3.4'
          }
        },
        {
          path: 'mecDeveloper/test/apply',
          name: 'apply',
          component: () => import('../pages/test/Apply.vue'),
          meta: {
            id: '3.3.2'
          }
        },
        {
          path: 'mecDeveloper/test/task',
          name: 'task',
          component: () => import('../pages/test/Task.vue'),
          meta: {
            id: '3.3.3'
          }
        },
        {
          path: 'mecDeveloper/test/report',
          name: 'report',
          component: () => import('../pages/test/Report.vue'),
          meta: {
            id: '3.3.4'
          }
        },
        {
          path: 'mecDeveloper/community/Community',
          name: 'devlopers',
          component: () => import('../components/common/Developing.vue'),
          meta: {
            id: '3.4'
          }
        },
        {
          path: '/mecDeveloper/work',
          name: 'workspace',
          component: () => import('../pages/workspace/Index.vue'),
          meta: {
            id: '3.5'
          }
        },
        {
          path: '/mecDeveloper/work/detail',
          name: 'appDetail',
          component: () => import('../pages/workspace/AppDetail.vue'),
          meta: {
            id: '3.6'
          }
        }
      ]
    }
  ]
})
