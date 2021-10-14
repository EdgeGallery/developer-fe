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

const NAV_PRE = {
  DEVELOPER: '/developer',
  APPSTORE: '/appStore',
  MECM: '/mecm',
  ATP: '/atp'
}

const FIRST_LEVEL_MENU_PATH = {
  HOME: '/home',
  DEVELOPER: '/mecDeveloper',
  APPSTORE: '/appStore',
  MECM: '/mecm',
  ATP: '/atp',
  SYSTEM: '/system'
}

const MODULES = {
  DEVELOPER: {
    name: 'developer',
    port: '30092'
  },
  APPSTORE: {
    name: 'appStore',
    port: '30091'
  },
  MECM: {
    name: 'mecm',
    port: '30093'
  },
  ATP: {
    name: 'atp',
    port: '30094'
  }
}
const systemName = [
  {
    labelcn: '大数据系统',
    labelen: 'Big data system'
  },
  {
    labelcn: '公有云',
    labelen: 'Public Cloud'
  },
  {
    labelcn: '3dr 边缘系统',
    labelen: '3dr Limbic system'
  },
  {
    labelcn: '应用',
    labelen: 'Application'
  },
  {
    labelcn: '5G 网元',
    labelen: '5G Network element'
  },
  {
    labelcn: 'laaS',
    labelen: 'laaS'
  },
  {
    labelcn: 'Meao',
    labelen: 'Meao'
  }
]

const HEALTH_URL = '/health'

export {
  NAV_PRE,
  FIRST_LEVEL_MENU_PATH,
  MODULES,
  HEALTH_URL,
  systemName
}
