<template>
  <div class="navgation">
    <el-row>
      <el-col :span="6">
        <div class="logo lt" @click="jumpFromLogo('/mecDeveloper')">
          <img src="../../assets/images/huawei_logo.png" alt />
          <span>{{$t('home.mecDeveloper')}} V0.15</span>
        </div>
      </el-col>
      <el-col :span="12" class="nav">
        <Topbar :jsonData="jsonData"></Topbar>
      </el-col>
      <el-col :span="5">
        <div class="language rt">
          <span @click="changeLange">{{language}}</span>
        </div>
        <div class="nav-tabs rt">
          <span></span>
          <el-tooltip
            class="item el-icon-user-solid"
            :class="content === 'Log Out'?'blue':''"
            effect="dark"
            :content="content"
            placement="bottom-start"
          >
            <span v-if="content === 'Log Out'" @click="beforeLogout()"></span>
            <span v-else @click="login()"></span>
          </el-tooltip>
          <span></span>
          <span></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { urlLogout } from '../../tools/tool.js'
import navData from '../../../src/navdata/nav_data.js'
import axios from 'axios'
import Topbar from './Topbar.vue'
import util from '../../tools/util.js'
// import { getCookie } from '../../tools/cookies.js'
import { deleteCookie } from '../../tools/cookies.js'
export default {
  name: 'navgation',
  components: {
    Topbar
  },
  data () {
    return {
      content: 'Log In',
      userType: '',
      permissions: [],
      previousPath: '',
      jsonData: [],
      appData: navData.navAppData,
      language: 'English'
    }
  },
  watch: {
    $route (to, from) {
      this.previousPath = to.path
      this.jsonData = util.init(to.path)
      this.onLogining()
      if (to.path === '/') {
        this.resetPage()
      } else if (to.path === '/admin/users') {
        this.checkIfAdmin(to.path, from.path)
      }
    }
  },
  beforeMount () {
    let keepAlive = util.keepSessionAlive()
    if (!keepAlive) {
      this.logout()
    }
  },
  mounted () {
    let language = localStorage.getItem('language')
    language
      ? localStorage.setItem('language', language)
      : localStorage.setItem('language', 'cn')
    language = localStorage.getItem('language')
    this.language = language === 'en' ? '简体中文' : 'English'

    // this.token = getCookie(token)
    this.checktoken()
    this.jsonData = util.init(this.$route.fullPath)
    this.previousPath = this.$route.fullPath
    this.onLogining()
  },
  methods: {
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
      } else {
        this.language = 'English'
        language = 'cn'
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
      this.$store.commit('changelanguage', language)
      this.jsonData = util.init(this.$route.fullPath)
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
    onLogining () {
      if (sessionStorage.getItem('user')) {
        this.content = 'Log Out'
        this.userType = sessionStorage.getItem('usertype')
        this.permissions = JSON.parse(sessionStorage.getItem('permissions'))
      } else {
        this.resetPage()
      }
    },
    resetPage () {
      this.content = 'Log In'
      this.userType = 'guest'
      this.permissions = ''
      if (document.cookie) {
        let strCookie = document.cookie
        deleteCookie(strCookie)
      }
      sessionStorage.setItem('user', '')
      sessionStorage.setItem('usertype', '')
      sessionStorage.setItem('permissions', '')
    },
    checktoken () {
      let token = this.getToken()
      if (token === '') {
        this.$router.push('/')
      } else {
        this.content = 'Log Out'
      }
    },
    checkIfAdmin (path, oldPath) {
      let permission = ''
      let user = JSON.parse(sessionStorage.getItem('user'))
      if (user.username === 'admin') {
        return true
      } else {
        user.permissions.forEach(item => {
          if (item.platform === 'MEO') {
            permission = item.role
          }
        })
        if (permission && permission.toLowerCase() !== 'admin') {
          this.$message.error(this.$t('promptMessage.noPermission'))
          this.$router.push(oldPath)
        }
      }
    },
    getToken () {
      let strCookie = document.cookie
      let arrCookie = strCookie.split(';')
      for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split('=Basic')
        if (arr[0].trim() === 'token') {
          return 'Basic ' + arr[1]
        }
      }
      return ''
    },
    jumpTo (path) {
      let newPath = '/tenant' + path
      let usr = sessionStorage.getItem('usertype')
      if (usr.toLowerCase() === 'guest' || usr.toLowerCase() === '') {
        // update by wenson
        newPath = '/paas' + path
      }
      this.$router.push(newPath)
    },
    jumpFromLogo (newPath) {
      let usr = sessionStorage.getItem('usertype')
      if (this.userType === 'admin') {
        this.$router.push('/admin/home')
      } else if (usr.toLowerCase() === 'guest' || usr.toLowerCase() === '') {
        // update by wenson
        this.$router.push(newPath)
      } else {
        this.$router.push('/mecDeveloper')
      }
    },
    login () {
      this.$router.push('/')
    },
    beforeLogout () {
      let keepAlive = util.keepSessionAlive()
      if (keepAlive) {
        this.$confirm(this.$t('promptMessage.logoutPage'), 'Warning', {
          confirmButtonText: this.$t('promptMessage.yesBtn'),
          cancelButtonText: this.$t('promptMessage.noBtn'),
          type: 'warning'
        }).then(() => {
          this.logout()
        })
      } else {
        this.logout()
      }
    },
    logout () {
      // let url = 'http://159.138.61.155:8067/v1/users/logout'
      let url = urlLogout
      axios({
        method: 'POST',
        url: url,
        data: '',
        headers: {
          Authorization: this.getToken(),
          'Content-Type': 'application/json'
        }
      }).then(
        res => {
          if (res.status === 200) {
            let strCookie = document.cookie
            // console.log('before', strCookie)
            deleteCookie(strCookie)
            this.jsonData = []
            this.resetPage()
            this.$router.push('/')
          }
          // eslint-disable-next-line handle-callback-err
        }, error => {
          this.$router.push('/')
        }
      )
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
  z-index: 9999;
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
    span {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 20px;
      position: relative;
      top: 13px;
      cursor: pointer;
    }
    span:first-child {
      background: url("../../assets/images/search.png") center;
    }
    span:nth-child(2) {
      position: relative;
      top: 10px;
      font-size: 25px;
      color: #9ca2b1;
    }
    span.el-icon-user-solid.blue {
      color: #6c92fa;
    }
    span:nth-child(3) {
      background: url("../../assets/images/help.png") center;
    }
    span:nth-child(4) {
      background: url("../../assets/images/chat.png") center;
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
