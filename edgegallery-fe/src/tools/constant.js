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

const PROXY_PREFIX_CURRENTSERVER = window.location.pathname.slice(0, window.location.pathname.length - 1)
const PORT_CURRENTSERVER = '30095'
const DOMAIN_CURRENTSERVER = 'edgegallery'

const PLATFORMNAME_APPSTORE = 'APPSTORE'
const PLATFORMNAME_DEVELOPER = 'DEVELOPER'
const PLATFORMNAME_MECM = 'MECM'
const PLATFORMNAME_ATP = 'ATP'
const PLATFORMNAME_LAB = 'LAB'
const PLATFORMNAME_EGVIEWDOC = 'EGVIEWDOC'

const PLATFORM_LIST = [
  {
    name: PLATFORMNAME_APPSTORE,
    port: '30091',
    domain: 'appstore',
    proxyPrefix: '/edgegallery/appstore'
  },
  {
    name: PLATFORMNAME_DEVELOPER,
    port: '30092',
    domain: 'developer',
    proxyPrefix: '/edgegallery/developer'
  },
  {
    name: PLATFORMNAME_MECM,
    port: '30093',
    domain: 'mecm',
    proxyPrefix: '/edgegallery/mecm'
  },
  {
    name: PLATFORMNAME_ATP,
    port: '30094',
    domain: 'atp',
    proxyPrefix: '/edgegallery/atp'
  },
  {
    name: PLATFORMNAME_LAB,
    port: '30096',
    domain: 'lab',
    proxyPrefix: '/edgegallery/lab'
  },
  {
    name: PLATFORMNAME_EGVIEWDOC,
    port: '30089',
    domain: 'egviewdoc',
    proxyPrefix: '/edgegallery/egviewdoc'
  }
]

export {
  PROXY_PREFIX_CURRENTSERVER,
  PORT_CURRENTSERVER,
  DOMAIN_CURRENTSERVER,
  PLATFORMNAME_APPSTORE,
  PLATFORMNAME_DEVELOPER,
  PLATFORMNAME_MECM,
  PLATFORMNAME_ATP,
  PLATFORMNAME_EGVIEWDOC,
  PLATFORMNAME_LAB,
  PLATFORM_LIST
}
