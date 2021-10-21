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
import navDataCn from '../navdata/navDataCn.js'
import { NAV_PRE, FIRST_LEVEL_MENU_PATH } from '../constants'
import routes from '../../new/router/router.js'

Vue.use(Router)

function getRouterComponent (routerPath) {
  if (routerPath.startsWith(FIRST_LEVEL_MENU_PATH.HOME)) {
    return () => import('../pages/Home.vue')
  } else if (routerPath.startsWith(NAV_PRE.APPSTORE) || routerPath.startsWith(NAV_PRE.DEVELOPER) || routerPath.startsWith(NAV_PRE.MECM) || routerPath.startsWith(NAV_PRE.ATP)) {
    return () => import('../pages/pageContainer.vue')
  } else if (routerPath.startsWith(FIRST_LEVEL_MENU_PATH.SYSTEM)) {
    return () => import('../pages/system.vue')
  } else {
    return () => import('../pages/Home.vue')
  }
}

function getRouterConfigItem (navItem) {
  return {
    path: navItem.path,
    component: getRouterComponent(navItem.path)
  }
}

function getRouterConfigRecursively (navParam) {
  let routerConfig = []
  navParam.forEach(item => {
    if (item.children && item.children.length > 0) {
      routerConfig = routerConfig.concat(getRouterConfigRecursively(item.children))
    } else {
      routerConfig.push(getRouterConfigItem(item))
    }
  })
  return routerConfig
}

function getRouterConfig () {
  return getRouterConfigRecursively(navDataCn).concat([
    {
      path: '/',
      redirect: 'new/home'
      // component: () => import('../pages/Home.vue')
    },
    {
      path: '/home',
      redirect: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../pages/detail.vue')
    },
    ...routes
  ])
}

export default new Router({
  routes: getRouterConfig(),
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) { return originalReplace.call(this, location, onResolve, onReject) }
  return originalReplace.call(this, location).catch(err => err)
}
