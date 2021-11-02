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

import Vue from 'vue'
import Router from 'vue-router'
import routesclassic from '../classic/router/router.js'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'newhome',
      component: () => import('../pages/homePage/Home.vue')
    },
    {
      path: '/incubation',
      name: 'incubation',
      component: () => import('../pages/developer/Index.vue')
    },
    {
      path: '/incubation/createApplication',
      name: 'createApplication',
      component: () => import('../pages/developer/application/CreateApplication.vue')
    },
    {
      path: '/incubation/capabilityCenter',
      name: 'capabilityCenter',
      component: () => import('../pages/developer/capabilityCenter/Index.vue')
    },
    {
      path: '/incubation/capabilityPublish',
      name: 'capabilityCenter',
      component: () => import('../pages/developer/capabilityCenter/CapabilityPublish.vue')
    },
    {
      path: '/application-rules',
      name: 'incubationRules',
      component: () => import('../pages/developer/sandbox/applicationRules/Index.vue')
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('../pages/developer/sandbox/Index.vue')
    },
    {
      path: '/sandboxFrame',
      name: 'sandboxFrame',
      component: () => import('../pages/developer/sandbox/Sandbox.vue')
    },
    {
      path: '/select-scenarios',
      name: 'selectScenarios',
      component: () => import('../pages/developer/atp/SelectScenarios.vue')
    },
    {
      path: '/test-process',
      name: 'testProcess',
      component: () => import('../pages/developer/atp/TestProcess.vue')
    }, {
      path: '/test-report',
      name: 'testReport',
      component: () => import('../pages/developer/atp/TestReport.vue')
    },
    {
      path: '/sandbox-detail',
      name: 'sandboxDetail',
      component: () => import('../pages/developer/sandbox/SandboxDetail.vue')
    },
    {
      path: '/appDeployDetail',
      name: 'appDeployDetail',
      component: () => import('../pages/mecm/AppDeployDetailList.vue')
    },
    {
      path: '/distributeDeploy',
      name: 'distributeDeploy',
      component: () => import('../pages/mecm/DistributeDeploy.vue')
    },
    {
      path: '/distribute',
      name: 'distribute',
      component: () => import('../pages/mecm/Distribute.vue')
    },
    {
      path: '/appPackageBuild',
      name: 'appPackageBuild',
      component: () => import('../pages/developer/application/AppPackageBuild.vue')
    },
    {
      path: '/appdPreview',
      name: 'appdPreview',
      component: () => import('../pages/developer/application/AppdPreview.vue')
    },
    {
      path: '/deployConfig',
      name: 'deployConfig',
      component: () => import('../pages/mecm/DeployConfig.vue')
    },

    ...routesclassic
  ],
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})
