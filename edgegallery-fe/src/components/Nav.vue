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
    class="navgation-new padding_default"
  >
    <div
      class="logo lt"
      @click="jumpFromLogo('/mecDeveloper')"
    >
      <img
        src="../assets/images/logo.png"
        alt
      >
    </div>
    <div class="nav big lt">
      <Topbar
        :json-data="jsonData"
        :index-name-prop="indexName"
      />
    </div>
    <div class="user_right rt">
      <div class="language rt">
        <span>
          <img
            :src="languageIcon"
            alt=""
            @click="changeLange"
          ></span>
      </div>
      <div
        class="user_icon rt"
        v-if="ifGuest"
      >
        <img
          src="../assets/images/nav_user.png"
          alt=""
          :title="$t('nav.logIn')"
          @click="logout()"
        >
      </div>
      <div
        class="nav-tabs rt"
        v-if="!ifGuest"
      >
        <div
          class="userName"
          @mouseenter="showUserInfo=true"
          @mouseleave="showUserInfo=false"
        >
          {{ userName }}
          <el-collapse-transition>
            <div
              class="user_info"
              v-show="showUserInfo"
            >
              <span
                class="userAccountCenter"
                @click="openUserAccountCenter()"
              >{{ $t('nav.userAccountCenter') }}</span>
              <span
                @click="beforeLogout()"
              >{{ $t('nav.logOut') }}</span>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </div>
    <div class="nav small rt">
      <em
        class="el-icon-menu"
        @click="clickSmallMenu"
      />
    </div>
    <el-collapse-transition>
      <div
        v-show="menuSmall"
        id="menu-div"
      >
        <TopbarSmall
          :json-data="jsonData"
          :index-name-prop="indexName"
          @closeMenu="closeMenu"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { logoutApi, loginApi, healthCheck } from '../tools/tool.js'
import navData from '../navdata/navData.js'
import navDataCn from '../navdata/navDataCn.js'
import Topbar from './Topbar.vue'
import TopbarSmall from './TopbarSmall.vue'
import { NAV_PRE, FIRST_LEVEL_MENU_PATH, MODULES, HEALTH_URL } from '../constants.js'
import {
  PROXY_PREFIX_CURRENTSERVER,
  PLATFORMNAME_APPSTORE,
  PLATFORMNAME_DEVELOPER,
  PLATFORMNAME_MECM,
  PLATFORMNAME_ATP
} from '../tools/constant.js'
import { getPlatformUrlPrefix } from '../tools/common.js'
export default {
  name: 'NavgationNew',
  components: {
    Topbar,
    TopbarSmall
  },
  props: {
    scrollTopProp: {
      type: Number,
      default: 0
    },
    toPathProp: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      jsonData: [],
      language: '',
      languageIcon: require('../assets/images/nav_en.png'),
      loginPage: '',
      userCenterPage: '',
      menuSmall: false,
      screenHeight: document.body.clientHeight,
      timer: false,
      ifGuest: true,
      userName: '',
      showUserInfo: false,
      scrollTop: this.scrollTopProp,
      isScroll: false,
      wsSocketConn: null,
      wsMsgSendInterval: null,
      manualLoggout: false,
      indexName: this.toPathProp,
      isHome: true,
      toPath: this.toPathProp
    }
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
      }
    },
    scrollTopProp (val) {
      this.getPageScroll(val)
    },
    '$i18n.locale': function () {
      this.loginFun()
    },
    $route (to, from) {
      this.toPath = to.path
      if (to.path === '/home') {
        this.isHome = true
      } else {
        this.isHome = false
      }
    }
  },
  beforeMount () {
    let _language = localStorage.getItem('language') || 'cn'
    this.language = _language === 'en' ? 'Cn' : 'En'
    this.languageIcon = _language === 'cn' ? require('../assets/images/nav_en.png') : require('../assets/images/nav_cn.png')
    if (_language === 'en') {
      this.jsonData = navData
    } else {
      this.jsonData = navDataCn
    }
  },
  mounted () {
    this.language = localStorage.getItem('language') || 'cn'
    this.loginFun()
    // Switch language
    let lanIndex = window.location.href.search('language')
    if (lanIndex > 0) {
      let lan = window.location.href.substring(lanIndex + 9, lanIndex + 11)
      if (lan === 'en') {
        this.changeLange()
      }
    }
    // When window size changes, adjust the value of screenHeight
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.setScreenHeight(this.screenHeight)
      })()
    }
    window.addEventListener('message', this.handleMessage)
  },
  beforeDestroy () {
    clearTimeout(this.wsMsgSendInterval)
    this.wsMsgSendInterval = null
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    changeModel () {
      this.$router.push('/home')
      sessionStorage.setItem('pageModel', 'Classic')
    },
    filterDeveloperMenu () {
      this.jsonData = this.jsonData.filter(item => item.path !== FIRST_LEVEL_MENU_PATH.DEVELOPER)
    },
    filterAppstoreMenu () {
      this.jsonData = this.jsonData.filter(item => item.path !== FIRST_LEVEL_MENU_PATH.APPSTORE)
    },
    filterAtpMenu () {
      this.jsonData = this.jsonData.filter(item => item.path !== FIRST_LEVEL_MENU_PATH.ATP)
    },
    filterMecmMenu () {
      this.jsonData = this.jsonData.filter(item => item.path !== FIRST_LEVEL_MENU_PATH.MECM)
    },
    filterMenu () {
      let mecmHealthCheckUrl = getPlatformUrlPrefix(PLATFORMNAME_MECM) + HEALTH_URL
      healthCheck(mecmHealthCheckUrl).then(res1 => {
        if (res1.status !== 200) {
          this.filterMecmMenu()
        }
      }).catch(() => {
        this.filterMecmMenu()
      })

      let appstoreHealthCheckUrl = getPlatformUrlPrefix(PLATFORMNAME_APPSTORE) + HEALTH_URL
      healthCheck(appstoreHealthCheckUrl).then(res2 => {
        if (res2.status !== 200) {
          this.filterAppstoreMenu()
        }
      }).catch(() => {
        this.filterAppstoreMenu()
      })

      let atpHealthCheckUrl = getPlatformUrlPrefix(PLATFORMNAME_ATP) + HEALTH_URL
      healthCheck(atpHealthCheckUrl).then(res3 => {
        if (res3.status !== 200) {
          this.filterAtpMenu()
        }
      }).catch(() => {
        this.filterAtpMenu()
      })

      let developerHealthCheckUrl = getPlatformUrlPrefix(PLATFORMNAME_DEVELOPER) + HEALTH_URL
      healthCheck(developerHealthCheckUrl).then(res4 => {
        if (res4.status !== 200) {
          this.filterDeveloperMenu()
        }
      }).catch(() => {
        this.filterDeveloperMenu()
      })
    },
    transPath (params) {
      let activeMenuPath
      let path
      if (params.module === MODULES.DEVELOPER.name) {
        activeMenuPath = NAV_PRE.DEVELOPER + params.activeMenuPath
        path = NAV_PRE.DEVELOPER + params.path
      } else if (params.module === MODULES.APPSTORE.name) {
        activeMenuPath = NAV_PRE.APPSTORE + params.activeMenuPath
        path = NAV_PRE.APPSTORE + params.path
      } else if (params.module === MODULES.MECM.name) {
        activeMenuPath = NAV_PRE.MECM + params.activeMenuPath
        path = NAV_PRE.MECM + params.path
      } else if (params.module === MODULES.ATP.name) {
        activeMenuPath = NAV_PRE.ATP + params.activeMenuPath
        path = NAV_PRE.ATP + params.path
      } else {
        activeMenuPath = FIRST_LEVEL_MENU_PATH.HOME
        path = FIRST_LEVEL_MENU_PATH.HOME
      }
      return {
        activeMenuPath: activeMenuPath,
        path: path
      }
    },
    handleMessage (event) {
      const data = event.data
      if (data.cmd === 'routeTo') {
        let params = this.transPath(data.params)
        this.indexName = params.activeMenuPath
      }
    },
    getPageScroll (scrollTop) {
      if (scrollTop < 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
      if (this.toPath === '/home' && scrollTop >= 0) {
        this.isHome = true
      } else {
        this.isHome = false
      }
    },
    loginFun () {
      loginApi().then(res => {
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('accessToken', res.data.accessToken)
        sessionStorage.setItem('loginPage', res.data.loginPage)
        this.userName = res.data.userName
        this.loginPage = res.data.loginPage
        this.userCenterPage = res.data.userCenterPage
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
      })
      // this.filterMenu()
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
    handleNavData (item, authorities, newArray, s, validateAuthority) {
      if (!item.authority || item.authority.some(a => authorities.includes(a))) {
        newArray.push(s)
        if (item.children) {
          s.children = validateAuthority(item.children)
        }
      }
    },
    // According to the height of mobile device, adjust the height of external layer div
    setScreenHeight (screenHeight) {
      let oDiv = document.getElementsByClassName('main-sidebar-small')
      oDiv[0].style.height = (Number(screenHeight) - 65) + 'px'
    },
    clickSmallMenu () {
      this.setScreenHeight(this.screenHeight)
      this.menuSmall = !this.menuSmall
    },
    // When mobile user selects menu, close the menu tab
    closeMenu (data) {
      this.menuSmall = data
    },
    logout () {
      this.manualLoggout = true
      logoutApi().then(() => {
        this.enterLoginPage()
      }).catch(err => {
        console.log(err)
        this.enterLoginPage()
      })
    },
    enterLoginPage () {
      window.location.href = this.loginPage + '&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER
    },
    os () {
      let UserAgent = navigator.userAgent.toLowerCase()
      return {
        isWindows: /windows/.test(UserAgent),
        isMac: /mac/.test(UserAgent)
      }
    },
    changeLange () {
      let language
      if (this.language === 'En') {
        this.language = 'Cn'
        this.languageIcon = require('../assets/images/nav_cn.png')
        language = 'en'
        this.jsonData = navData
      } else {
        this.language = 'En'
        this.languageIcon = require('../assets/images/nav_en.png')
        language = 'cn'
        this.jsonData = navDataCn
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
    },
    jumpFromLogo (newPath) {
      this.$router.push(newPath)
    },
    beforeLogout () {
      this.$confirm(this.$t('homePromptMessage.logoutPage'), this.$t('homePromptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('applicationId')
        sessionStorage.removeItem('currentAppList')
        sessionStorage.removeItem('currentApplicationId')
        this.$store.commit('changeFlow', '0')
        sessionStorage.removeItem('appName')
        this.logout()
      })
    },
    openUserAccountCenter () {
      window.open(this.userCenterPage)
    }
  }
}
</script>

<style lang='less'>
.navgation-new {
  background: #3e279b;
  height: 80px;
  top: 0px;
  width: 100%;
  position: fixed;
  z-index: 1999;
  .nav{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav.big{
    display: inline-block;
  }
  .nav.small{
    display: none;
    height: 80px;
    text-align: center;
    .el-icon-menu{
      color: #fff;
      font-size: 46px;
      margin: 17px 20px 0 0;
    }
  }
  .logo {
    height: 80px;
    line-height: 80px;
    margin-right: 120px;
    display: flex;

    img {
      height: 36px;
      cursor: pointer;
      margin-top: 27px;
    }
    span {
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
  }
  .menu-div{
    overflow-y: auto;
  }
  .el-menu-item{
    padding: 0;
  }
  .el-submenu__title{
    padding: 0;
  }
  .user_right{
    color: #fff;
    height: 23px;
    margin-top: 28px;
    .language{
      width: 23px;
      height: 23px;
      cursor: pointer;
    }
    .user_icon{
      margin: 0 20px 0;
      cursor: pointer;
    }
    .userName{
      position: relative;
      cursor: pointer;
      margin:0 20px;
      height: 23px;
      line-height: 23px;
    }
    .user_info{
      background: #6319c2;
      position: absolute;
      width: 90px;
      padding-bottom: 2px;
      border-radius: 6px;
      top: 30px;
      span{
        display: inline-block;
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        background: #3b0b7a;
        border-radius: 6px;
        margin-top: 2px;
        text-align: center;
        color: #acacac;
      }
      span:hover{
        background: #2b0064;
        color: #fff;
      }
    }
  }
  .search_div{
    margin-top: 20px;
    position: relative;
    .selectInput{
      position: absolute;
      top: 2px;
      left: 2px;
      background-color: #3f0c81;
      z-index: 3;
      width: 70px;
      .el-input__inner{
        height: 36px;
        border: none;
        background-color: #3f0c81;
        padding: 0;
        text-align: left;
        padding-left: 10px;
      }
      .el-input__icon{
        width: 15px;
      }
      .el-icon-arrow-up:before{
        top: -2px;
        position: relative;
      }
    }
    .el-input__inner{
      background-color: #280b4e;
      border: 1px solid #9c8dd3;
    }
    .el-input.is-active .el-input__inner,.el-input__inner:focus {
      border-color: #fff;
    }
    .el-select .el-input {
      width: 70px;
    }
    .input-with-select{
      width: 180px;
      position: relative;
      .el-input__inner{
        width: 100%;
      }

    }
    .input-with-select .el-input-group__prepend {
      background-color: #3f0c81;
      border: 1px solid #9c8dd3;
      border-right: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 40px;
      margin: 0 -20px;
    }
  }

  @media screen and (max-width: 1090px) {
    .main-sidebar .el-menu .first-menu{
      font-size: 16px;
    }
    .logo{
      span{
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    .nav.big{
      display: none;
    }
    .nav.small{
      display: inline-block;
    }
  }
  @media screen and (max-width: 553px){
    .logo{
      margin-left: 0;
      img{
        height: 40px;
        margin: 12px 0 0 0;
      }
    }
  }
  @media screen and (max-width: 385px) {
    .logo{
      img{
        height: 34px;
        margin: 15px 0 0 0;
      }
      span{
        font-size: 13px;
      }
    }
  }
  @media screen and (max-width: 320px) {
    .rt span{
      font-size: 13px;
    }
    .rt:first-child span{
      margin-right: 0;
    }
  }
  @media screen and (min-width: 1091px) {
    .main-sidebar-small{
      display: none;
    }
  }
}
.navgation-new.isScroll{
  box-shadow: 0 6px 10px 0 rgba(27, 7, 118, 0.2)
}
.navgation-new.isHome{
  background: transparent !important;
  .el-menu--horizontal,.el-menu-item,.el-submenu__title{
    background-color: transparent !important;
  }
}
</style>
