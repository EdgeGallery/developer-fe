<template>
<div class="register">
  <div class="loginBox">
    <div class="login-top">
        <span>{{$t('register.registerUser')}}</span>
    </div>
    <el-form :model="userData" status-icon :rules="rules" ref="userData" class="demo-ruleForm">
      <div class="login-area">
        <el-form-item prop="username">
          <p>{{$t('register.userName')}}</p>
          <el-input id="uname" v-model="userData.username" auto-complete="new-accounts" type="text" :placeholder="$t('login.namePla')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <p>{{$t('register.password')}}</p>
          <el-input id="upass" v-model="userData.password" auto-complete="new-password" type="password" :placeholder="$t('login.pwdPla')"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <p>{{$t('register.confirmPass')}}</p>
          <el-input id="verifypass" v-model="userData.confirmPassword" type="password" :placeholder="$t('login.pwdConfPla')"></el-input>
        </el-form-item>
        <el-form-item prop="telephone">
          <p>{{$t('register.contactNumber')}}</p>
          <el-input id="contact" v-model="userData.telephone" type="text" :placeholder="$t('login.telPla')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row style="margin-top:18px;">
            <el-col :span="16">
              <el-input v-model="userData.verificationCode" type="text" :placeholder="$t('login.capPla')"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button style="float:right;" type="primary" size="middle" @click="getCaptcha" :disabled="ifBtnAble"><span v-if="!showTime">{{$t('login.getCap')}}</span><span v-if="showTime">&nbsp;&nbsp;{{time}}s</span></el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <p>{{$t('register.company')}}</p>
          <el-input id="company" v-model="userData.company" type="text" :placeholder="$t('login.compPla')"></el-input>
        </el-form-item>
        <el-form-item id="gender">
          <p style="padding:5px 0;">
            {{$t('register.gender')}}:
            <el-radio v-model="userData.gender" label="1">{{$t('register.male')}}</el-radio>
            <el-radio v-model="userData.gender" label="2">{{$t('register.female')}}</el-radio>
          </p>
        </el-form-item>
      </div>
      <div>
        <el-button id="confirmBtn" type="primary" size="medium" :loading="regBtnLoading" v-on:click="submitForm('userData')">{{$t('register.submitBtn')}}</el-button>
        <el-button id="cancelBtn" type="primary" size="medium" @click="closeSucessPop()">{{$t('register.cancelBtn')}}</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>
<script>
import { urlUsers } from '../../tools/tool.js'
import axios from 'axios'
export default {
  name: 'register',
  components: {

  },
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('register.userNameEmpty')))
      } else {
        if (this.userData.checkPass !== '') {
          this.$refs.userData.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('register.passwordEmpty')))
      } else {
        if (this.userData.checkPass !== '') {
          this.$refs.userData.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePassConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('register.confirmPassEmpty')))
      } else if (value !== this.userData.password) {
        callback(new Error(this.$t('register.differentPasswords')))
      } else {
        callback()
      }
    }
    let validatetelephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('register.contactNumberEmpty')))
      } else {
        if (this.userData.checkPass !== '') {
          this.$refs.userData.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      visible: false,
      ifBtnAble: false,
      time: 60,
      showTime: false,
      interval: '',
      userData: {
        username: '',
        password: '',
        confirmPassword: '',
        telephone: '',
        company: '',
        gender: '',
        type: '',
        verificationCode: ''
      },
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' },
          { pattern: /^.{6,50}$/, message: this.$t('register.nameFormat') }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { pattern: /^.{6,16}$/, message: this.$t('register.passwordFormat') }
        ],
        confirmPassword: [
          { validator: validatePassConfirm, trigger: 'blur' }
        ],
        telephone: [
          { validator: validatetelephone, trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: this.$t('register.contactNumberFormat') }
        ]
      },
      regBtnLoading: false
    }
  },
  created () {
    this.keyupSubmit()
    if (this.$route.hash === '#1') {
      this.type = 1
    } else {
      this.type = 2
    }
    if (sessionStorage.getItem('time')) {
      this.time = sessionStorage.getItem('time')
      this.ifBtnAble = true
      this.showTime = true
      this.intervalStart()
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    },
    to () {
      if (this.type === 1) {
        this.jumpTo('/admin/users')
      } else {
        this.jumpTo('/')
      }
    },
    intervalStart () {
      this.interval = setInterval(() => {
        this.time--
        sessionStorage.setItem('time', this.time)
        if (this.time === 0) {
          clearTimeout(this.interval)
          this.interval = null
          this.ifBtnAble = false
          this.showTime = false
          this.time = 60
          sessionStorage.removeItem('time')
        }
      }, 1000)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.regBtnLoading = true
          // let url = 'http://159.138.61.155:8067/v1/users/'
          let url = urlUsers
          axios({
            method: 'POST',
            url: url,
            data: this.userData,
            headers: {
              'Authorization': this.getToken(),
              'Content-Type': 'application/json'
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: this.$t('promptMessage.registerSuccess')
            })
            this.regBtnLoading = false
            sessionStorage.setItem('time', 1)
            this.to()
          }, error => {
            if (error) {
              this.$message({
                type: 'error',
                message: this.$t('promptMessage.resisterFail')
              })
            }
            this.regBtnLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closePop () {
      this.userData = ''
    },
    closeSucessPop () {
      if (this.type === 1) {
        this.jumpTo('/admin/users')
      } else {
        this.jumpTo('/')
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
    getCaptcha () {
      this.ifBtnAble = true
      this.showTime = true
      this.intervalStart()
      axios({
        method: 'POST',
        url: '/rest/user-mgmt-be/v1/identity/sms',
        data: { telephone: this.userData.telephone },
        headers: {
          'Authorization': this.getToken(),
          'Content-Type': 'application/json'
        }
      }).then(res => {
        // console.log(res)
      }).catch(err => {
        this.ifBtnAble = false
        this.$message({
          type: 'err',
          message: this.$t('register.captchaFailed')
        })
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less">
.register{
  height:100%;
  background: url('../../assets/images/login.png') center;
  background-size:cover;
  overflow-y: auto;
  .loginBox{
    float: right;
    width: 30%;
    height: auto;
    text-align: center;
    margin: 8% 10% 6% 0;
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
        line-height: 25px;
        text-align: left;
        margin-top:15px;
        margin-bottom: 0px;
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
      }
    }
  }
  .el-input{
    height:30px;
  }
  .el-form-item{
    margin-bottom: 0px;
  }
}
</style>
