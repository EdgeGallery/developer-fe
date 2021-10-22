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
import routesnew from '../classic/router/router.js'
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
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/incubation',
      name: 'incubation',
      component: () => import('../pages/Incubation/Index.vue')
    },
    ...routesnew
  ],
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})
