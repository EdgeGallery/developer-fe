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
          <el-input id="uname" v-model="userData.username" auto-complete="new-accounts" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <p>{{$t('register.password')}}</p>
          <el-input id="upass" v-model="userData.password" auto-complete="new-password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <p>{{$t('register.confirmPass')}}</p>
          <el-input id="verifypass" v-model="userData.confirmPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="telephone">
          <p>{{$t('register.contactNumber')}}</p>
          <el-input id="contact" v-model="userData.telephone" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <p>{{$t('register.company')}}</p>
          <el-input id="company" v-model="userData.company" type="text"></el-input>
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
      userData: {
        username: '',
        password: '',
        confirmPassword: '',
        telephone: '',
        company: '',
        gender: '',
        type: ''
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.regBtnLoading = true
          // let url = 'http://159.138.61.155:8067/v1/users/'
          let url = '/user-mgmt-be/v1/users/'
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
            this.to()
          }, error => {
            if (error) {
              this.$message({
                type: 'error',
                message: this.$t('promptMessage.resisterFail') + error.response.data
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
    }
  }
}
</script>
<style lang="less">
.register{
  height:100%;
  background: url('../../assets/images/login.png') center;
  background-size:cover;
  .loginBox{
    float: right;
    width: 30%;
    height: auto;
    text-align: center;
    margin: 5% 10% 0 0;
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
