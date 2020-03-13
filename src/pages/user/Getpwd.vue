<template>
<div class="getpwd">
  <div class="loginBox">
    <el-form :model="userData" status-icon :rules="rules" ref="userData" class="demo-ruleForm">
      <div class="login-area">
        <el-form-item prop="telephone">
          <p>{{$t('login.contact')}}</p>
          <el-input id="contact" v-model="userData.telephone" type="text" :placeholder="$t('login.telPla')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row style="margin-top:18px;">
            <el-col :span="16">
              <el-input v-model="userData.captcha" type="text" :placeholder="$t('login.capPla')"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button style="float:right;" type="primary" size="middle" @click="getCaptcha" :disabled="ifBtnAble"><span v-if="!showTime">{{$t('login.getCap')}}</span><span v-if="showTime">&nbsp;&nbsp;{{time}}s</span></el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="password">
          <p>{{$t('login.newPwd')}}</p>
          <el-input id="upass" v-model="userData.password" auto-complete="new-password" type="password" :placeholder="$t('login.pwdPla')"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <p>{{$t('login.confirmNewPwd')}}</p>
          <el-input id="verifypass" v-model="userData.confirmPassword" type="password" :placeholder="$t('login.pwdConfPla')"></el-input>
        </el-form-item>
      </div>
      <div style="margin-top:20px;">
        <el-button id="submitBtn" type="primary" size="medium" :loading="regBtnLoading" v-on:click="submitForm('userData')">{{$t('common.confirm')}}</el-button>
        <el-button id="cancelBtn" type="primary" size="medium" @click="closeSucessPop()">{{$t('common.cancel')}}</el-button>
      </div>
    </el-form>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'register',
  components: {

  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Password cannot be empty'))
      } else {
        if (this.userData.checkPass !== '') {
          this.$refs.userData.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePassConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Confirm Password cannot be empty'))
      } else if (value !== this.userData.password) {
        callback(new Error('Two different passwords'))
      } else {
        callback()
      }
    }
    var validatetelephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Contact Number cannot be empty'))
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
      time: 300,
      showTime: false,
      interval: '',
      userData: {
        password: '',
        confirmPassword: '',
        telephone: '',
        captcha: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
          { pattern: /^.{6,16}$/, message: '6-16 digit Numbers, letters, underline' }
        ],
        confirmPassword: [
          { validator: validatePassConfirm, trigger: 'blur' }
        ],
        telephone: [
          { validator: validatetelephone, trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: 'The phone number is not in accordance with the rules' }
        ]
      },
      regBtnLoading: false
    }
  },
  created () {
    this.keyupSubmit()
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
          this.time = 300
          sessionStorage.removeItem('time')
        }
      }, 1000)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.regBtnLoading = true
          let url = '/rest/user-mgmt-be/v1/users/'
          axios({
            method: 'POST',
            url: url,
            data: this.userData,
            headers: {
              'Authorization': this.getToken(),
              'Content-Type': 'application/json'
            }
          }).then(res => {
            this.$message.success(this.$t('register.regUserSuc'))
            this.regBtnLoading = false
            this.to()
          }, error => {
            if (error) {
              this.$message.error(this.$t('register.failedReg'))
            }
            this.regBtnLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeSucessPop () {
      this.$router.go(-1)
    },
    keyupSubmit () {
      document.onkeydown = e => {
        let _key = window.event.keyCode
        if (_key === 13) {
          this.submitForm()
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
        this.$message({
          type: 'success',
          message: this.$t('register.regUserSuc')
        })
      }, error => {
        if (error) {
          this.$message.error(this.$t('register.failedReg'))
        }
        this.regBtnLoading = false
      })
    }
  }
}
</script>
<style lang="less">
.getpwd{
  height:100%;
  background: url('../../assets/images/login.png') no-repeat center;
  background-size:cover;
  .loginBox{
    float: right;
    width: 30%;
    height: auto;
    text-align: center;
    margin: 8% 10% 0 0;
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
