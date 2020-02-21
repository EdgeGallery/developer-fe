<template>
<div class="login">
  <div class="loginBox">
    <div class="login-top">
        <img src="../../assets/images/huawei_logo1.png" alt="">
    </div>
    <div class="login-area">
      <p>{{$t('login.userName')}}</p>
      <el-input id="uname" v-model="userData.username" type="text"></el-input>
      <p>{{$t('login.password')}}</p>
      <el-input id="upass" v-model="userData.password" type="password"></el-input>
    </div>
    <div class="login-certify">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-input id="ucode" v-model="code" type="text"></el-input>
        </el-col>
        <el-col :span="10">
          <span  @click="changeCode()">{{certifyCode}}</span>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-button id="loginBtn" type="primary" size="medium" :loading="loginBtnLoading" v-on:click="submitForm()">{{$t('login.loginBtn')}}</el-button>
      <el-button id="registerBtn" type="primary" size="medium" @click="jumpTo('/register#2')">{{$t('login.register')}}</el-button>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import util from '../../tools/util.js'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      userData: {
        username: '',
        password: ''
      },
      code: '',
      certifyCode: '',
      loginBtnLoading: false
    }
  },
  created () {
    this.keyupSubmit()
    this.changeCode()
  },
  methods: {
    changeCode () {
      this.certifyCode = parseInt(Math.random() * 100000).toString()
    },
    submitForm () {
      // this.code = this.certifyCode
      if (this.code.toLowerCase() === this.certifyCode.toLowerCase()) {
        this.loginBtnLoading = true
        let url = 'http://159.138.61.155:8067/v1/users/auth'
        axios({
          method: 'POST',
          url: url,
          data: this.userData
        }).then((res) => {
          if (res.status === 200) {
            document.cookie = 'token=Basic' + res.data.token
            url = 'http://159.138.61.155:8067/v1/users/' + res.data.userId
            axios({
              method: 'GET',
              url: url,
              headers: {
                'Authorization': 'Basic ' + res.data.token,
                'Content-Type': 'application/json'
              }
            }).then(response => {
              util.setUser(response.data)
              if (this.userData.username === 'admin') {
                this.jumpTo('/admin/home')
              } else if (response.data.permissions[0].role.toLowerCase() === 'guest') {
                this.jumpTo('/mecDeveloper')
              } else {
                this.jumpTo('/mecDeveloper')
              }
              sessionStorage.setItem('user', JSON.stringify(response.data))
              sessionStorage.setItem('usertype', this.userData.username === 'admin' ? 'admin' : response.data.permissions[0].role)
              sessionStorage.setItem('permissions', JSON.stringify(response.data.permissions))
              util.setSession()
              this.loginBtnLoading = false

            // eslint-disable-next-line handle-callback-err
            }, error => {
              this.$message.error(this.$t('promptMessage.checkNamePass'))
              this.loginBtnLoading = false
            })
          }
          // eslint-disable-next-line handle-callback-err
        }, error => {
          this.$message.error(this.$t('promptMessage.checkNamePass'))
          this.userData.password = ''
          this.code = ''
          this.loginBtnLoading = false
          this.changeCode()
        })
      } else {
        this.$message.error(this.$t('promptMessage.checkCaptcha'))
        this.code = ''
        this.changeCode()
      }
    },
    keyupSubmit () {
      document.onkeydown = e => {
        let _key = window.event.keyCode
        if (_key === 13) {
          this.submitForm()
        }
      }
    },
    resetForm () {
    },
    jumpTo (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less">
.login{
  height:100%;
  background: url('../../assets/images/login.png') center;
  background-size:cover;
  .loginBox{
    float: right;
    width: 30%;
    height: auto;
    text-align: center;
    margin: 10% 10% 0 0;
    padding:15px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
    .login-top{
      img{
        position: relative;
        top: 10px;
      }
      span{
        position: relative;
        top:1px;
        font-size: 16px;
        font-weight: bold;
        color:#333;
        left:20px;
        cursor:pointer;
      }
    }
    .login-area{
      padding: 0 25px;
      p{
        line-height: 35px;
        text-align: left;
        margin-top:15px;
      }
    }
    .login-certify{
      padding: 0 25px;
      margin:25px 0;
      span{
        display:inline-block;
        width:100%;
        height:100%;
        line-height: 38px;
        border:1px solid #ddd;
        border-radius: 5px;
        font-size:18px;
        font-weight:bold;
        cursor:pointer;
      }
    }
  }
}
</style>
