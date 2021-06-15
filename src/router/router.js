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

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../pages/home/Home.vue')
    },
    {
      path: '/index',
      redirect: '/',
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
            keepAlive: true, // this component needs to be cached
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
          path: 'mecDeveloper/plugin/toolchain',
          name: 'toolChain',
          component: () => import('../pages/plugin/ToolChain.vue'),
          meta: {
            id: '3.1.5'
          }
        },
        {
          path: 'mecDeveloper/plugin/toolreport',
          name: 'toolReport',
          component: () => import('../pages/plugin/ToolReport.vue'),
          meta: {
            id: '3.1.6'
          }
        },
        {
          path: 'mecDeveloper/plugin/docs',
          name: 'devDocs',
          component: () => import('../pages/plugin/Document.vue'),
          meta: {
            id: '3.1.6'
          }
        },
        {
          path: 'mecDeveloper/api/mep',
          name: 'mep',
          component: () => import('../pages/abilityCenter/AbilityHome.vue'),
          meta: {
            id: '3.2.1'
          }
        },
        {
          path: 'mecDeveloper/api/mep/serviceDoc',
          name: 'serviceDoc',
          component: () => import('../pages/abilityCenter/ServiceDoc.vue'),
          meta: {
            id: '3.2.1'
          }
        },
        {
          path: 'mecDeveloper/api/mep/apiAmulator',
          name: 'apiAmulator',
          component: () => import('../pages/abilityCenter/ApiAmulator.vue'),
          meta: {
            id: '3.2.1'
          }
        },
        {
          path: 'mecDeveloper/api/mep/ascend',
          name: 'ascend',
          component: () => import('../pages/abilityCenter/Ascend.vue'),
          meta: {
            id: '3.2.1'
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
        },
        {
          path: '/mecDeveloper/system/mep',
          name: 'systemProject',
          component: () => import('../pages/system/MepList.vue'),
          meta: {
            id: '3.8'
          }
        },
        {
          path: '/mecDeveloper/system/host',
          name: 'systemHost',
          component: () => import('../pages/system/HostList.vue'),
          meta: {
            id: '3.9'
          }
        },
        {
          path: '/mecDeveloper/system/imagemgmt',
          name: 'systemImage',
          component: () => import('../pages/system/imagemgmt/Index.vue'),
          meta: {
            id: '3.10'
          }
        }
      ]
    }
  ]
})
