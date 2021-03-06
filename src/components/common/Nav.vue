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
    class="navgation padding_default"
    :class="{'isScroll':isScroll}"
  >
    <div
      class="logo lt"
      @click="jumpFromLogo('/mecDeveloper')"
    >
      <img
        src="../../assets/images/logo.png"
        alt
      >
    </div>
    <div class="nav big lt">
      <Topbar :json-data="jsonData" />
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
          src="../../assets/images/nav_user.png"
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
        v-show="menu_small"
        id="menu-div"
      >
        <TopbarSmall
          :json-data="jsonData"
          @closeMenu="closeMenu"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { logoutApi, loginApi } from '../../tools/tool.js'
import navData from '../../../src/navdata/nav_data.js'
import navDataCn from '../../../src/navdata/nav_data_cn.js'
import Topbar from './Topbar.vue'
import TopbarSmall from './TopbarSmall.vue'
export default {
  name: 'Navgation',
  components: {
    Topbar,
    TopbarSmall
  },
  props: {
    scrollTopProp: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      userType: '',
      jsonData: [],
      language: 'En',
      languageIcon: require('../../assets/images/nav_en.png'),
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
      scrollTop: this.scrollTopProp,
      isScroll: false
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
      this.showToolchain(this.jsonData)
      this.loginFun()
    }
  },
  beforeMount () {
    localStorage.setItem('language', 'cn')
    let language = localStorage.getItem('language')
    this.language = language === 'en' ? 'Cn' : 'En'
    if (language === 'en') {
      this.jsonData = navData.mecDeveloper
    } else {
      this.jsonData = navDataCn.mecDeveloper
    }
  },
  mounted () {
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
  },
  methods: {
    getPageScroll (scrollTop) {
      if (scrollTop < 0) {
        this.isScroll = true
      } else {
        this.isScroll = false
      }
    },
    loginFun () {
      loginApi().then(res => {
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('accessToken', res.data.accessToken)
        this.loginPage = res.data.loginPage
        this.userCenterPage = res.data.userCenterPage
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
      })
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
    // According to the height of mobile device, adjust the height of external layer div
    setScreenHeight (screenHeight) {
      let oDiv = document.getElementsByClassName('main-sidebar-small')
      oDiv[0].style.height = (Number(screenHeight) - 65) + 'px'
    },
    clickSmallMenu () {
      this.setScreenHeight(this.screenHeight)
      this.menu_small = !this.menu_small
    },
    // When mobile user selects menu, close the menu tab
    closeMenu (data) {
      this.menu_small = data
    },
    logout () {
      logoutApi().then(res => {
        window.location.href = window.location.href.indexOf('https') > -1
          ? this.loginPage + '&return_to=' + 'https://' + window.location.host
          : this.loginPage + '&return_to=' + 'http://' + window.location.host
      }).catch(err => {
        console.log(err)
      })
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
        this.languageIcon = require('../../assets/images/nav_cn.png')
        language = 'en'
        this.jsonData = navData.mecDeveloper
      } else {
        this.language = 'En'
        this.languageIcon = require('../../assets/images/nav_en.png')
        language = 'cn'
        this.jsonData = navDataCn.mecDeveloper
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
      this.$store.commit('changelanguage', language)
      this.$root.$emit('languageChange')
    },
    jumpFromLogo (newPath) {
      this.$router.push(newPath)
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
    openUserAccountCenter () {
      window.open(this.userCenterPage)
    }
  }
}
</script>

<style lang='less'>
.navgation {
  background: #280b4e;
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
    margin-right: 80px;
    display: flex;

    img {
      height: 29px;
      cursor: pointer;
      margin-top: 25px;
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
        font-size: 14px;
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
}
.navgation.isScroll{
  box-shadow: 0 6px 10px 0 rgba(27, 7, 118, 0.2)
}
</style>
