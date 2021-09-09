
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
import devNavData from './devNav.js'
import appStoreNavData from './appStoreNav.js'
import atpNavData from './atpNav.js'
import mecmNavData from './mecmNav.js'

const navData = [
  {
    id: '0',
    name: 'Home',
    path: '/home',
    display: true
  },
  {
    id: '1',
    name: 'APP Integrate Platform',
    path: '/mecDeveloper',
    display: true,
    children: devNavData
  },
  {
    id: '2',
    name: 'Testing and Certification Center',
    path: '/atp',
    display: true,
    children: atpNavData
  },
  {
    id: '3',
    name: 'APP Store',
    path: '/appStore',
    display: true,
    children: appStoreNavData
  },
  {
    id: '4',
    name: 'MECM Management Platform',
    path: '/mec',
    display: true,
    children: mecmNavData
  }
]

export default navData
