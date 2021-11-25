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
      path: '/EG/developer/home',
      name: 'incubation',
      component: () => import('../pages/developer/Index.vue')
    },
    {
      path: '/EG/developer/createApplication',
      name: 'createApplication',
      component: () => import('../pages/developer/application/CreateApplication.vue')
    },
    {
      path: '/EG/developer/capabilityCenter',
      name: 'capabilityCenter',
      component: () => import('../pages/developer/capabilityCenter/Index.vue')
    },
    {
      path: '/EG/developer/capabilityPublish',
      name: 'capabilityPublish',
      component: () => import('../pages/developer/capabilityCenter/CapabilityPublish.vue')
    },
    {
      path: '/EG/developer/applicationRules',
      name: 'incubationRules',
      component: () => import('../pages/developer/sandbox/applicationRules/Index.vue')
    },
    {
      path: '/EG/developer/sandbox',
      name: 'sandbox',
      component: () => import('../pages/developer/sandbox/Index.vue')
    },
    {
      path: '/EG/developer/sandboxFrame',
      name: 'sandboxFrame',
      component: () => import('../pages/developer/sandbox/Sandbox.vue')
    },
    {
      path: '/EG/developer/selectScenarios',
      name: 'selectScenarios',
      component: () => import('../pages/developer/atp/SelectScenarios.vue')
    },
    {
      path: '/EG/developer/testProcess',
      name: 'testProcess',
      component: () => import('../pages/developer/atp/TestProcess.vue')
    }, {
      path: '/EG/developer/testReport',
      name: 'testReport',
      component: () => import('../pages/developer/atp/TestReport.vue')
    },
    {
      path: '/EG/developer/sandboxDetails',
      name: 'sandboxDetail',
      component: () => import('../pages/developer/sandbox/SandboxDetail.vue')
    },
    {
      path: '/EG/images/appPackageBuild',
      name: 'appPackageBuild',
      component: () => import('../pages/developer/image/AppPackageBuild.vue')
    },
    {
      path: '/EG/images/appdPreview',
      name: 'appdPreview',
      component: () => import('../pages/developer/image/AppdPreview.vue')
    },
    {
      path: '/EG/mecm/appDeployDetail',
      name: 'appDeployDetail',
      component: () => import('../pages/mecm/AppDeployDetailList.vue')
    },
    {
      path: '/EG/mecm/distributeDeploy',
      name: 'distributeDeploy',
      component: () => import('../pages/mecm/DistributeDeploy.vue')
    },
    {
      path: '/EG/mecm/distribute',
      name: 'distribute',
      component: () => import('../pages/mecm/Distribute.vue')
    },
    {
      path: '/EG/mecm/deployConfig',
      name: 'deployConfig',
      component: () => import('../pages/mecm/DeployConfig.vue')
    },
    {
      path: '/EG/mecm/distributeFinish',
      name: 'distributeFinish',
      component: () => import('../pages/mecm/DistributeFinish.vue')
    },
    {
      path: '/EG/appstore/appWarehouse',
      name: 'appWarehouse',
      component: () => import('../pages/appstore/Index.vue')
    },
    {
      path: '/EG/appstore/apppromotion',
      name: 'appPromotion',
      component: () => import('../pages/appstore/AppPromotion.vue')
    },
    {
      path: '/EG/appstore/appDetail',
      name: 'appDetail',
      component: () => import('../pages/appstore/detail/AppDetail.vue')
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
