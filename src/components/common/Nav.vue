<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="navgation">
    <el-row>
      <el-col
        :lg="7"
        :md="8"
        :sm="18"
        :xs="13"
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
      </el-col>
      <el-col
        :lg="11"
        :md="11"
        :sm="7"
        :xs="3"
        class="nav big"
      >
        <Topbar :json-data="jsonData" />
      </el-col>
      <el-col
        :lg="11"
        :md="11"
        :sm="2"
        :xs="3"
        class="nav small"
      >
        <em
          class="el-icon-menu"
          @click="clickSmallMenu"
        />
      </el-col>
      <el-col
        :lg="6"
        :md="5"
        :sm="4"
        :xs="8"
      >
        <div class="language rt">
          <span @click="changeLange">{{ language }}</span>
        </div>
        <div
          class="nav-tabs rt"
          v-if="ifGuest"
        >
          <span
            @click="logout()"
          >{{ $t('nav.logIn') }}</span>
        </div>
        <div
          class="nav-tabs rt"
          v-else
        >
          <span class="userName">{{ userName }}</span>
          <span
            class="userAccountCenter"
            @click="openUserAccountCenter()"
          >{{ $t('nav.userAccountCenter') }}</span>
          <span
            @click="beforeLogout()"
          >{{ $t('nav.logOut') }}</span>
        </div>
      </el-col>
    </el-row>
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
  data () {
    return {
      userType: '',
      jsonData: [],
      language: 'English',
      loginPage: '',
      userCenterPage: '',
      menu_small: false,
      screenHeight: document.body.clientHeight,
      timer: false,
      ifGuest: true,
      userName: ''
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
    '$i18n.locale': function () {
      this.showToolchain(this.jsonData)
    }
  },
  beforeMount () {
    localStorage.setItem('language', 'cn')
    let language = localStorage.getItem('language')
    this.language = language === 'en' ? '简体中文' : 'English'
    if (language === 'en') {
      this.jsonData = navData.mecDeveloper
    } else {
      this.jsonData = navDataCn.mecDeveloper
    }
  },
  mounted () {
    this.loginFun()
    // 国际化切换
    let lanIndex = window.location.href.search('language')
    if (lanIndex > 0) {
      let lan = window.location.href.substring(lanIndex + 9, lanIndex + 11)
      if (lan === 'en') {
        this.changeLange()
      }
    }
    // 监听到窗口大小变化时，重新给screenHeight变量赋值
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.setScreenHeight(this.screenHeight)
      })()
    }
  },
  methods: {
    loginFun () {
      loginApi().then(res => {
        console.log(1)
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('accessToken', res.data.accessToken)
        this.loginPage = res.data.loginPage
        this.userCenterPage = res.data.userCenterPage
        if (res.data.userName === 'guest') {
          this.ifGuest = true
        } else {
          this.ifGuest = false
        }
        this.showToolchain(this.jsonData)
        const authorities = res.data.authorities || []
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
    // 根据移动端屏幕高度设置导航外层div的高
    setScreenHeight (screenHeight) {
      let oDiv = document.getElementsByClassName('main-sidebar-small')
      oDiv[0].style.height = (Number(screenHeight) - 65) + 'px'
    },
    clickSmallMenu () {
      this.setScreenHeight(this.screenHeight)
      this.menu_small = !this.menu_small
    },
    // 移动端选择菜单后，收起菜单栏
    closeMenu (data) {
      this.menu_small = data
    },
    logout () {
      logoutApi().then(res => {
        window.location.href = this.loginPage + '&return_to=https://' + window.location.host
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
      if (this.language === 'English') {
        this.language = '简体中文'
        language = 'en'
        this.jsonData = navData.mecDeveloper
      } else {
        this.language = 'English'
        language = 'cn'
        this.jsonData = navDataCn.mecDeveloper
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
      this.$store.commit('changelanguage', language)
      this.$root.$emit('languageChange')
      let appDom = document.getElementById('app')
      if (language === 'en') {
        appDom.style.fontFamily = 'Huaweisans, Arial, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
      } else {
        if (this.os.isMac) {
          appDom.style.fontFamily = 'PingFang, FZLTXHJW, Hiragino Sans GB, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
        } else {
          appDom.style.fontFamily = 'Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
        }
      }
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
  background: #282b33;
  height: 65px;
  top: 0px;
  width: 100%;
  position: fixed;
  z-index: 99;
  .rt{
    span{
      height: 65px;
      line-height: 65px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      margin-right: 10px;
    }
    span.userName{
      border-right: 1px solid #686868;
      height: 12px;
      line-height: 12px;
      cursor: default;
      padding-right: 10px;
      display: inline-block;
    }
    span.userAccountCenter{
      border-right: 1px solid #686868;
      padding-right: 10px;
    }
  }
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
    height: 65px;
    text-align: center;
    .el-icon-menu{
      color: #fff;
      font-size: 30px;
      margin-top: 17px;
    }
  }
  .logo {
    height: 65px;
    line-height: 65px;
    margin-left: 17px;
    display: flex;

    img {
      height: 65px;
      cursor: pointer;
      margin-left: 25px;
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

  @media screen and (max-width: 1090px) {
    .el-menu-item{
      padding: 0 10px;
    }
    .el-submenu__title{
      padding: 0 10px;
    }
    .main-sidebar .el-menu .first-menu{
      font-size: 16px;
    }
    .logo{
      span{
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 991px) {
    .nav.big{
      display: none;
    }
    .nav.small{
      display: inline-block;
    }
    .el-col-md-5{
      float: right;
    }
    .el-col-md-11{
      float: right;
    }
  }
  @media screen and (max-width: 767px){
    .el-col-xs-8{
      max-width: 135px;
      float: right;
    }
    .el-col-xs-3{
      float: right;
    }
    .logo img{
      height: 50px;
      margin: 5px 0 0 0;
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
</style>
