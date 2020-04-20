
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

import navData from '../../src/navdata/nav_data.js'
import navDataCn from '../../src/navdata/nav_data_cn.js'
let user = {}
let jsonData = []
let permissions = {}
let sessionTimeOut = 30 * 60 * 1000
export default {
  getUser: function () {
    return user
  },
  setUser: function (usr) {
    user = usr
    permissions = {}
    if (user) {
      for (let i = 0; i < user.permissions.length; i++) {
        if (permissions[user.permissions[i].role]) {
          permissions[user.permissions[i].role] = permissions[user.permissions[i].role].concat(user.permissions[i].pageIds)
        } else {
          permissions[user.permissions[i].role] = user.permissions[i].pageIds
        }
      }
    }
  },
  getPermissions: function (data) {
    for (let i = 0; i < data.length; i++) {
      data[i].display = true
    }

    return data
  },
  getNavPermissions: function () {
    let obj = {
      showONAPaas: false,
      showHoup: false,
      showMEC: false
    }
    for (let j in permissions) {
      if (permissions[j].includes('0')) {
        obj.showONAPaas = true
      }
      if (permissions[j].includes('1')) {
        obj.showHoup = true
      }
      if (permissions[j].includes('2')) {
        obj.showMEC = true
      }
    }
    return obj
  },
  init (path) {
    let language = localStorage.getItem('language')
    if (language === 'en') {
      let data
      if (sessionStorage.getItem('userId') !== '') {
        data = JSON.parse(sessionStorage.getItem('userId'))
        sessionStorage.setItem('sessionTimeCounter', parseInt(new Date().getTime()) + sessionTimeOut)
        this.setUser(data)
        if (path === '/') {
          jsonData = []
        } else {
          if (path.indexOf('mecDeveloper') > -1) {
            jsonData = this.getPermissions(navData['mecDeveloper'])
          } else {
            jsonData = []
          }
        }
      } else {
        jsonData = []
      }
      return jsonData
    } else if (language === 'cn') {
      let data
      if (sessionStorage.getItem('userId') !== '') {
        data = JSON.parse(sessionStorage.getItem('userId'))
        sessionStorage.setItem('sessionTimeCounter', parseInt(new Date().getTime()) + sessionTimeOut)
        this.setUser(data)
        if (path === '/') {
          jsonData = []
        } else {
          if (path.indexOf('mecDeveloper') > -1) {
            jsonData = this.getPermissions(navDataCn['mecDeveloper'])
          } else {
            jsonData = []
          }
        }
      } else {
        jsonData = []
      }
      return jsonData
    }
  },
  keepSessionAlive () {
    let sessionTimeCounter = sessionStorage.getItem('sessionTimeCounter')
    let keepAlive = true
    if (sessionTimeCounter !== '' && sessionStorage.getItem('userId') !== '') {
      let currentTime = parseInt(new Date().getTime())
      if (currentTime > sessionTimeCounter) {
        keepAlive = false
      } else {
        sessionStorage.setItem('sessionTimeCounter', currentTime + sessionTimeOut)
        keepAlive = true
      }
    }
    return keepAlive
  },
  setSession () {
    sessionStorage.setItem('sessionTimeCounter', parseInt(new Date().getTime()) + sessionTimeOut)
  }
}
