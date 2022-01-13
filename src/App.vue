<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div
    id="app"
    class="defaultFont"
    ref="app"
  >
    <Navcomp
      :scroll-top-prop="scrollTop"
      class="clearfix"
      @clickLogo="clickLogo"
      @changeLange="changeLange"
      @logout="logout"
      :if-guest-prop="ifGuest"
      :user-name-prop="userName"
      :user-center-page-prop="userCenterPage"
      @beforeLogout="beforeLogout"
      :json-data-prop="jsonData"
    />
    <router-view />
  </div>
</template>

<script>
import Navcomp from 'eg-view/src/components/EgNav.vue'
import navData from '../src/navdata/nav_data.js'
import navDataCn from '../src/navdata/nav_data_cn.js'
import { logoutApi, loginApi } from '../src/tools/tool.js'
import { getCodeInfo } from '../src/tools/api.js'
import { PROXY_PREFIX_CURRENTSERVER } from './tools/constant.js'
export default {
  name: 'App',
  components: {
    Navcomp
  },
  data () {
    return {
      scrollTop: 0,
      jsonData: [],
      loginPage: '',
      userCenterPage: '',
      menu_small: false,
      screenHeight: document.body.clientHeight,
      timer: false,
      ifGuest: true,
      userName: '',
      showUserInfo: false,
      searchCon: '',
      select: '',
      isScroll: false,
      wsSocketConn: null,
      wsMsgSendInterval: null,
      manualLoggout: false
    }
  },
  methods: {
    getScrollTop () {
      this.scrollTop = this.$refs.app.getBoundingClientRect().top
    },
    clickLogo () {
      this.$router.push('/mecDeveloper')
    },
    changeLange (lang) {
      let language
      if (lang === 'Cn' || lang === 'cn') {
        this.jsonData = navDataCn.mecDeveloper
        language = 'cn'
      } else {
        this.jsonData = navData.mecDeveloper
        language = 'en'
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
    },
    loginFun () {
      loginApi().then(res => {
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('accessToken', res.data.accessToken)
        this.loginPage = res.data.loginPage
        let _lang = localStorage.getItem('language')
        this.userCenterPage = res.data.userCenterPage + '?lang=' + _lang
        this.ifGuest = res.data.userName === 'guest'
        if (!this.ifGuest && res.data.forceModifyPwPage) {
          window.location.href = res.data.forceModifyPwPage
          return
        }
        this.showToolchain(this.jsonData)
        const authorities = res.data.authorities || []
        sessionStorage.setItem('userAuthorities', authorities)
        const navJsonData = JSON.parse(JSON.stringify(this.jsonData))
        const validateAuthority = (array) => {
          const newArray = []
          array.forEach(item => {
            const s = { ...item }
            this.handleNavData(item, authorities, newArray, s, validateAuthority)
          })
          return newArray
        }
        this.jsonData = validateAuthority(navJsonData)
        this.startHttpSessionInvalidListener(res.data.sessId)
      })
    },
    startHttpSessionInvalidListener (sessId) {
      if (typeof (WebSocket) === 'undefined') {
        return
      }
      let _wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
      this.wsSocketConn = new WebSocket(_wsProtocol + window.location.host + PROXY_PREFIX_CURRENTSERVER + '/wsserver/' + sessId)
      let _thisObj = this
      this.wsSocketConn.onmessage = function (msg) {
        clearTimeout(_thisObj.wsMsgSendInterval)
        _thisObj.wsMsgSendInterval = null
        if (_thisObj.manualLoggout) {
          return
        }
        let _hintInfo = _thisObj.$t('nav.hsInvalidHint')
        if (msg && msg.data) {
          if (msg.data === '1') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForTimeout') + _hintInfo
          } else if (msg.data === '2') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForLogout') + _hintInfo
          } else if (msg.data === '3') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForServerStopped') + _hintInfo
          } else {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForTimeout') + _hintInfo
          }
        }
        if (_thisObj.ifGuest) {
          window.location.reload()
          return
        }
        _thisObj.$confirm(_hintInfo, _thisObj.$t('promptMessage.prompt'), {
          confirmButtonText: _thisObj.$t('nav.reLogin'),
          cancelButtonText: _thisObj.$t('nav.refresh'),
          type: 'warning'
        }).then(() => {
          _thisObj.logout()
        }).catch(() => {
          window.location.reload()
        })
      }
      this.wsMsgSendInterval = setInterval(() => {
        this.wsSocketConn.send('')
      }, 10000)
    },
    handleNavData (item, authorities, newArray, s, validateAuthority) {
      if (!item.authority || item.authority.some(a => authorities.includes(a))) {
        newArray.push(s)
        if (item.children) {
          s.children = validateAuthority(item.children)
        }
      }
    },
    showToolchain (jsonData) {
      this.userName = sessionStorage.getItem('userName')
      if (this.userName === 'guest') {
        jsonData.forEach(item => {
          if (item.children) {
            item.children.forEach((subItem, subIndex) => {
              if (subItem.name === '工具链' || subItem.name === 'ToolChain') {
                item.children.splice(subIndex, 1)
              }
            })
          }
        })
      }
    },
    closeMenu (data) {
      this.menu_small = data
    },
    logout () {
      this.manualLoggout = true
      logoutApi().then(res => {
        this.enterLoginPage()
      }).catch(err => {
        console.log(err)
        this.enterLoginPage()
      })
    },
    beforeLogout () {
      this.$confirm(this.$t('promptMessage.logoutPage'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    enterLoginPage () {
      let _lang = localStorage.getItem('language')
      window.location.href = this.loginPage + '&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER + '&lang=' + _lang
    },
    getResCodeInfo () {
      let datas = '[appstore,developer]'
      getCodeInfo.getResponseCodeInfo(encodeURI(datas))
        .then(res => {
          sessionStorage.setItem('resCodeInfo', JSON.stringify(res.data))
        }).catch(() => {
          console.log('getResCodeInfo error')
        })
    }
  },
  mounted () {
    this.getResCodeInfo()
    this.loginFun()
    let lanIndex = window.location.href.search('language')
    if (lanIndex > 0) {
      let lan = window.location.href.substring(lanIndex + 9, lanIndex + 11)
      if (lan === 'en') {
        this.changeLange()
      }
    }
    window.addEventListener('scroll', this.getScrollTop, true)
    // message listener, message from unified platform
    window.addEventListener('message', (event) => {
      var data = event.data
      if (data.cmd === 'iframeLanguageChange') {
        let lang = data.params.lang
        this.changeLange(lang)
      }
    })
    window.onresize = () => {
      return (() => {
        this.getScrollTop()
      })()
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.showToolchain(this.jsonData)
      this.loginFun()
    }
  },
  beforeMount () {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'cn')
    }
    let language = localStorage.getItem('language') || 'cn'
    this.$i18n.locale = language
    if (language === 'en') {
      this.jsonData = navData.mecDeveloper
    } else {
      this.jsonData = navDataCn.mecDeveloper
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getScrollTop, true)
    clearTimeout(this.wsMsgSendInterval)
    this.wsMsgSendInterval = null
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  background:#f6f5f8;
  padding-top: 80px;
}
</style>
