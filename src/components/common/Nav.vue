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
          <span>{{ $t('home.mecDeveloper') }} V0.15</span>
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
import navData from '../../../src/navdata/nav_data.js'
import navDataCn from '../../../src/navdata/nav_data_cn.js'
import axios from 'axios'
import Topbar from './Topbar.vue'
// import util from '../../tools/util.js'
export default {
  name: 'Navgation',
  components: {
    Topbar
  },
  data () {
    return {
      userType: '',
      permissions: [],
      previousPath: '',
      jsonData: [],
      language: 'English',
      clientUrl: [],
      logoutUrl: ''
    }
  },
  watch: {},
  beforeMount () {
    let language = localStorage.getItem('language')
    language
      ? localStorage.setItem('language', language)
      : localStorage.setItem('language', 'cn')
    language = localStorage.getItem('language')
    this.language = language === 'en' ? '简体中文' : 'English'
    this.previousPath = this.$route.fullPath
    if (language === 'English') {
      this.jsonData = navData.mecDeveloper
    } else {
      this.jsonData = navDataCn.mecDeveloper
    }
  },
  mounted () {
    this.getPageId()
    axios.get('/mec/v1/jwt-info').then(res => {
      sessionStorage.setItem('userId', res.data.userId)
      this.clientUrl = res.data.clientLogoutUrlList
      this.logoutUrl = res.data.authServerLogoutUrl
    })
  },
  methods: {
    async logoutAll () {
      await this.clientUrl.forEach(item => {
        axios({
          method: 'POST',
          url: item,
          withCredentials: true
        }).then(res => {
          console.log(res)
        })
      })
    },
    async logout () {
      await this.logoutAll()
      let url = this.logoutUrl
      axios({
        method: 'POST',
        url: url,
        withCredentials: true
      }).then(res => {
        if (res.data) {
          let url = res.data.login_page_url
          window.location.href = url
        }
      }).catch(error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '错误请求'
              break
          }
          this.$message.error(error.message)
        }
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
        // if (sessionStorage.getItem('userId')) {
        this.jsonData = navData.mecDeveloper
        // }
      } else {
        this.language = 'English'
        language = 'cn'
        // if (sessionStorage.getItem('userId')) {
        this.jsonData = navDataCn.mecDeveloper
        // }
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
      this.$store.commit('changelanguage', language)
      // this.jsonData = util.init(this.$route.fullPath)
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
    jumpTo (path) {
      this.active = !this.active
      this.$router.push(path)
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
    beforeLogout () {
      this.$confirm('Are you sure to log out?', 'Promt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
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
      width: 40px;
      height: 24px;
      margin-right: 0px;
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
