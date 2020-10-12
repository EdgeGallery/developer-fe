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
      <el-col :span="7">
        <div
          class="logo lt"
          @click="jumpFromLogo('/mecDeveloper')"
        >
          <img
            src="../../assets/images/logo.png"
            alt
          >
          <span>{{ $t('home.mecDeveloper') }} V0.4</span>
        </div>
      </el-col>
      <el-col
        :span="11"
        class="nav"
      >
        <Topbar :json-data="jsonData" />
      </el-col>
      <el-col :span="5">
        <div class="language rt">
          <span @click="changeLange">{{ language }}</span>
        </div>
        <div class="nav-tabs rt">
          <span
            @click="beforeLogout()"
          >{{ $t('nav.logOut') }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { logoutApi, loginApi } from '../../tools/tool.js'
import navData from '../../../src/navdata/nav_data.js'
import navDataCn from '../../../src/navdata/nav_data_cn.js'
import Topbar from './Topbar.vue'
export default {
  name: 'Navgation',
  components: {
    Topbar
  },
  data () {
    return {
      userType: '',
      jsonData: [],
      language: 'English',
      loginPage: ''
    }
  },
  watch: {},
  beforeMount () {
    localStorage.setItem('language', 'cn')
    let language = localStorage.getItem('language')
    this.language = language === 'en' ? '简体中文' : 'English'
    if (language === 'English') {
      this.jsonData = navData.mecDeveloper
    } else {
      this.jsonData = navDataCn.mecDeveloper
    }
  },
  mounted () {
    this.getPageId()
    loginApi().then(res => {
      sessionStorage.setItem('userId', res.data.userId)
      sessionStorage.setItem('userName', res.data.userName)
      this.loginPage = res.data.loginPage
    })
  },
  methods: {
    logout () {
      logoutApi().then(res => {
        window.location.href = this.loginPage + '&return_to=https://' + window.location.host
      }).catch(err => {
        console.log(err)
      })
    },
    getPageId () {
      let data = [
        '2.2.0',
        '2.2.1',
        '2.2.1.1',
        '2.2.1.2',
        '2.2.2',
        '2.2.2.1',
        '2.2.2.2',
        '2.2.2.3',
        '2.2.3',
        '2.2.3.1',
        '2.2.3.2',
        '2.2.3.3',
        '2.2.3.4',
        '2.2.4',
        '2.2.5'
      ]
      this.initnavData(data)
    },
    initnavData (data) {
      for (let i = 0; i < this.jsonData.length; i++) {
        for (let j in data) {
          if (data[j].includes(this.jsonData[i].pageId)) {
            this.jsonData[i].display = true
          }
          if (this.jsonData[i] && this.jsonData[i].children) {
            for (let g = 0; g < this.jsonData[i].children.length; g++) {
              if (data[j].includes(this.jsonData[i].children[g].pageId)) {
                this.jsonData[i].children[g].display = true
              }
            }
            if (this.jsonData[i] && this.jsonData[i].children && this.jsonData[i].children.children) {
              for (let m = 0; m < this.jsonData[i].children.children.length; m++) {
                if (data[j].includes(this.jsonData[i].children.children[m].pageId)) {
                  this.jsonData[i].children.children[m].display = true
                }
              }
            }
          }
        }
      }
      return this.jsonData
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
    }
  }
}
</script>

<style lang='less' scoped>
.navgation {
  background: #282b33;
  height: 65px;
  top: 0px;
  width: 100%;
  position: fixed;
  z-index: 99;
  .nav{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    height: 65px;
    width: 355px;
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
    span.blue {
      color: #6c92fa;
    }
    span.blue::before {
      background: #6c92fa;
    }
    span::before {
      content: "";
      display: none;
      width: 2px;
      height: 18px;
      margin: 0 5px 0 10px;
      background: #333;
      position: relative;
      top: 3px;
    }
  }
  .nav-tabs {
    height: 100%;
    font-size: 20px;
    line-height: 50px;
    margin-right: 10px;
    a{
      height: 24px;
      margin-right: 10px;
      color: #888;
    }
    a.blue {
      color: #6c92fa;
    }
    span {
      display: inline-block;
      height: 24px;
      margin-right: 10px;
      position: relative;
      top: 5px;
      cursor: pointer;
      color:#f5f5f5;
      font-size: 14px;
    }
    span.el-icon-user-solid.blue {
      color: #6c92fa;
    }
    span.span_a{
      width: 80px;
    }
    .pop-txt {
      font-size: 21px;
      padding: 10%;
    }
    .promt-actions {
      text-align: center;
      padding: 2%;
    }
    .okbtn {
      font-size: 20px;
    }
  }
  .language {
    display: inline-block;
    line-height: 65px;
    font-size: 14px;
    color: #6c92fa;
    span {
      height: 21px;
      line-height: 21px;
      cursor: pointer;
      color: #fff;
    }
    span:hover {
      text-decoration: underline;
    }
  }
}
</style>
