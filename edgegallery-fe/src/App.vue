<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
    :class="{'app-new':pageModel==='newVersion','app-new-inner':!isIndex,'app-incubation':isIncubationPage}"
    ref="app"
  >
    <Navcomp
      :scroll-top-prop="scrollTop"
      class="clearfix"
      @clickLogo="clickLogo"
      @changeLange="changeLange"
      @logout="logout"
      @beforeLogout="beforeLogout"
      :json-data-prop="jsonData"
      :if-guest-prop="ifGuest"
      :user-name-prop="userName"
      :user-center-page-prop="userCenterPage"
      :nav-bgcolor-prop="navBgcolor"
      :nav-menu-fontsize-prop="navMenuFontsize"
    />
    <el-row>
      <el-col
        :span="zoom"
        v-if="!isIndex"
        class="app-list-comp"
      >
        <div
          class="left-pro-comp"
          :class="zoom>1?'left-pro-comp-show':''"
          ref="leftProComp"
        >
          <ProjectSideComp
            @zoomChanged="zoomChanged"
            v-if="zoom>1"
          />
        </div>
        <em
          class="icon-arrow-right"
          v-if="zoom ===1"
          @click.stop="enlarge()"
        />
      </el-col>
      <el-col
        :span="23-zoom"
        v-if="zoom<20"
      >
        <router-view />
      </el-col>
      <el-col
        :span="1"
        v-if="isShowTips"
      >
        <div class="tips-container">
          <div
            class="tips-box"
            @click="$router.push('/EG/developer/home')"
          >
            <el-tooltip
              :content="$t('home.returnHome')"
              effect="light"
              placement="left"
            >
              <img
                src="./assets/images/index/index_return.png"
                alt="return"
              >
            </el-tooltip>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navcomp from 'eg-view/src/components/EgNav.vue'
import navData from '../src/navdata/navData.js'
import navDataCn from '../src/navdata/navDataCn.js'
import { logoutApi, loginApi } from '../src/tools/tool.js'
import { FIRST_LEVEL_MENU_PATH } from '../src/constants.js'
import { PROXY_PREFIX_CURRENTSERVER } from '../src/tools/constant.js'
import { applicationApi, commonApi } from '../src/api/developerApi.js'
import ProjectSideComp from './pages/developer/application/ApplicationtList.vue'
export default {
  name: 'App',
  components: {
    Navcomp,
    ProjectSideComp
  },
  data () {
    return {
      scrollTop: 0,
      language: '',
      jsonData: [],
      pageModel: sessionStorage.getItem('pageModel') || 'newVersion',
      screenHeight: document.body.clientHeight,
      timer: false,
      isIndex: true,
      isIncubationPage: false,
      isShowTips: false,
      ifGuest: true,
      userName: '',
      loginPage: '',
      userCenterPage: '',
      wsSocketConn: null,
      wsMsgSendInterval: null,
      navBgcolor: '#3E279B',
      manualLoggout: false,
      navMenuFontsize: 25
    }
  },
  computed: {
    zoom (val) {
      return Number(this.$store.state.zoom)
    }
  },
  watch: {
    $route (to, from) {
      this.isIndex = window.location.hash.indexOf('/EG') < 0
      this.isIncubationPage = window.location.hash.indexOf('/EG/developer/home') > -1
      if (to.path.indexOf('EG') > -1 && to.path !== '/EG/developer/home') {
        this.isShowTips = true
      } else {
        this.isShowTips = false
      }
    },
    scrollTop (val) {
      this.scrollTop = val
    },
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    },
    '$i18n.locale': function () {
      this.loginFun()
    }
  },
  methods: {
    zoomChanged (val) {
      if (val === 1) {
        this.$store.commit('changeZoom', '1')
        this.$refs.leftProComp.style.width = '15%'
      } else if (val === 2) {
        this.$store.commit('changeZoom', '20')
        this.$refs.leftProComp.style.width = '100%'
      } else {
        this.$store.commit('changeZoom', '2')
      }
    },
    enlarge () {
      this.$store.commit('changeZoom', '2')
      this.$refs.leftProComp.style.width = '100%'
    },
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let _oDiv = document.getElementsByClassName('app-new')[0]
        if (_oDiv) {
          _oDiv.style.height = Number(screenHeight) + 'px'
        }
      })
    },
    getScrollTop () {
      this.scrollTop = this.$refs.app.getBoundingClientRect().top
    },
    logoutFun () {
      let _this = this
      this.bus.$on('logoutFun', function () {
        _this.logout()
      })
    },
    getResCodeInfo () {
      let datas = '[atp,developer,appstore]'
      commonApi.getResponseCodeInfo(encodeURI(datas))
        .then(res => {
          sessionStorage.setItem('devResCodeInfo', JSON.stringify(res.data))
        }).catch(() => {
          console.log('getResCodeInfo error')
        })
    },
    clickLogo () {
      this.$router.push('/index')
    },
    changeLange (lang) {
      let language
      if (lang === 'Cn' || lang === 'cn') {
        this.jsonData = navDataCn
        language = 'cn'
      } else {
        this.jsonData = navData
        language = 'en'
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
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
      this.$eg_messagebox(this.$t('homePromptMessage.logoutPage'), 'info', this.$t('common.cancel'), this.$t('common.confirm')).then(() => {
        sessionStorage.removeItem('applicationId')
        sessionStorage.removeItem('currentAppList')
        this.$store.commit('changeFlow', '0')
        this.$store.commit('changeApp', '5G')
        this.logout()
      })
    },
    enterLoginPage () {
      let _lang = this.language === 'En' ? 'cn' : 'en'
      window.location.href = this.loginPage + '&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER + '&lang=' + _lang
    },
    loginFun () {
      loginApi().then(res => {
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('accessToken', res.data.accessToken)
        this.userName = res.data.userName
        this.loginPage = res.data.loginPage
        let _lang = localStorage.getItem('language')
        this.userCenterPage = res.data.userCenterPage + '?lang=' + _lang
        this.ifGuest = res.data.userName === 'guest'
        if (!this.ifGuest && res.data.forceModifyPwPage) {
          window.location.href = res.data.forceModifyPwPage
          return
        }
        if (res.data.authorities.indexOf('ROLE_APPSTORE_ADMIN') > -1) {
          sessionStorage.setItem('userNameRole', 'admin')
        } else if (res.data.authorities.indexOf('ROLE_APPSTORE_TENANT') > -1) {
          sessionStorage.setItem('userNameRole', 'tenant')
        } else {
          sessionStorage.setItem('userNameRole', 'guest')
        }
        const authorities = res.data.authorities || []
        sessionStorage.setItem('userAuthorities', authorities)
        this.filterNavMenu(this.jsonData, authorities)
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
        let _gusetNum = 0
        authorities.forEach(item => {
          if (item.indexOf('ADMIN') > -1) {
            sessionStorage.setItem('pushAuthorities', 'show')
          } else {
            sessionStorage.setItem('pushAuthorities', 'hide')
          }
        })
        authorities.forEach(item => {
          if (item.indexOf('GUEST') > -1) {
            _gusetNum++
          }
        })
        if (_gusetNum > 0) {
          this.jsonData.forEach((item, index) => {
            if (item.id === '5') {
              this.jsonData.splice(index, 1)
            }
          })
        }
        this.startHttpSessionInvalidListener(res.data.sessId)
        // this.sendPageLoadedMsg(res.data.userId)
      })
    },
    filterNavMenu (jsonData, authorities) {
      let _developerNum = -1
      let _appstoreNum = -1
      let _mecmNum = -1
      authorities.forEach(item => {
        if (item.indexOf('DEVELOPER') !== -1) {
          _developerNum++
        } else if (item.indexOf('APPSTORE') !== -1) {
          _appstoreNum++
        } else if (item.indexOf('MECM') !== -1) {
          _mecmNum++
        }
      })
      if (_developerNum === -1) {
        jsonData.forEach((item, index) => {
          if (item.id === '1') {
            jsonData.splice(index, 1)
          }
        })
      }
      if (_appstoreNum === -1) {
        jsonData.forEach((item, index) => {
          if (item.id === '3') {
            jsonData.splice(index, 1)
          }
        })
      }
      if (_mecmNum === -1) {
        jsonData.forEach((item, index) => {
          if (item.id === '4') {
            jsonData.splice(index, 1)
          }
        })
      }
    },
    handleNavData (item, authorities, newArray, s, validateAuthority) {
      if (!item.authority || item.authority.some(a => authorities.includes(a))) {
        newArray.push(s)
        if (item.children) {
          s.children = validateAuthority(item.children)
        }
      }
    },
    filterMenuForClab () {
      applicationApi.getUseScene().then(res => {
        if (res && res.data) {
          if (res.data !== 'edgeGallery') {
            this.filterMecmMenu()
          }
        }
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
        _thisObj.$confirm(_hintInfo, _thisObj.$t('homePromptMessage.prompt'), {
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
    filterMecmMenu () {
      this.jsonData = this.jsonData.filter(item => item.path !== FIRST_LEVEL_MENU_PATH.MECM)
    },
    handleMessage (event) {
      const data = event.data
      if (data.cmd === 'subpageLoaded') {
        this.handleSubpageLoadedMsg(data)
      }
    },
    handleSubpageLoadedMsg (eventData) {
      if (eventData.params.userId !== sessionStorage.getItem('userId')) {
        this.$alert(this.$t('nav.accountInconsistent'), this.$t('homePromptMessage.prompt'), {
          confirmButtonText: this.$t('nav.reLogin'),
          type: 'warning',
          callback: () => {
            this.logout()
          }
        })
      }
    }
  },
  beforeMount () {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'cn')
    }
    let _language = localStorage.getItem('language') || 'cn'
    this.language = _language === 'en' ? 'Cn' : 'En'
    this.$i18n.locale = _language
    if (_language === 'en') {
      this.jsonData = navData
    } else {
      this.jsonData = navDataCn
    }
  },
  mounted () {
    this.logoutFun()
    this.loginFun()
    this.getResCodeInfo()
    let language = localStorage.getItem('language') || 'cn'
    this.$i18n.locale = language
    let _lanIndex = window.location.href.search('language')
    if (_lanIndex > 0) {
      let lan = window.location.href.substring(_lanIndex + 9, _lanIndex + 11)
      this.language = lan === 'en' ? 'En' : 'Cn'
      this.changeLange(lan)
    }
    window.addEventListener('message', (event) => {
      var data = event.data
      if (data.cmd === 'iframeLanguageChange') {
        let lang = data.params.lang
        this.changeLange(lang)
      } else if (data.cmd === 'subpageLoaded') {
        this.handleSubpageLoadedMsg(data)
      }
    })
    this.setDivHeight(this.screenHeight)
    window.addEventListener('scroll', this.getScrollTop, true)
    window.onresize = () => {
      return (() => {
        this.getScrollTop()
        this.screenHeight = document.body.clientHeight
        this.setDivHeight(this.screenHeight)
      })()
    }
    window.addEventListener('message', this.handleMessage)
  },
  updated () {
    if (this.zoom === 1) {
      this.$refs.leftProComp.style.width = '15%'
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getScrollTop, true)
    window.removeEventListener('message', this.handleMessage)
    clearTimeout(this.wsMsgSendInterval)
    this.wsMsgSendInterval = null
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  width: 100%;
  height: 100%;
  padding-top: 80px;
  position: relative;
}
.app-new{
  background: url('./assets/images/common_bg_index.png') #3E279B -10px 92% no-repeat;
  background-size: contain;
  min-height: 805px;
  overflow: hidden;
}
.app-new-inner{
  background: url('./assets/images/common_bg_inner1.png') #3E279B -10px 92% no-repeat;
  background-size: cover;
}
.app-incubation{
  min-width: 1600px;
}
.left-pro-comp{
  width: 100%;
  height: 95%;
  position: relative;
  border: 2px solid #838ACB;
  border-left: none;
  border-radius: 0 17px 17px 0;
  z-index: 15;
  overflow: hidden;
}
.app-list-comp .icon-arrow-right{
  width: 30px;
  height: 35px;
  background: url('./assets/images/application/app_arrow_icon.png') no-repeat center;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 0.5%;
  cursor: pointer;
}
.left-pro-comp-show{
  min-width: 150px!important;
}
.left-pro-comp::after {
  content: "";
  background: rgba(46,20,124,.7);
  backdrop-filter: blur(6px);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.el-row, .el-col{
  height: 100%;
}
.tips-box{
  width: 45px;
  height: 45px;
  background: #321985;
  text-align: center;
  line-height: 45px;
  border-radius: 6px;
  padding-top: 7px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
