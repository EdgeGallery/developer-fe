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
  <div class="home">
    <div class="main-div">
      <div class="topLine">
        <div class="title">
          <h2>{{ $t('home.bannerTitle') }}</h2>
          <p>
            {{ $t('home.bannerText1') }}
            <br>{{ $t('home.bannerText2') }}
            <br>{{ $t('home.bannerText3') }}
            <br>{{ $t('home.bannerText4') }}
            <br>{{ $t('home.bannerText5') }}
          </p>
        </div>
      </div>
      <div class="common-appliaction">
        <div class="platform_link clear">
          <div class="devProcess">
            <div class="process_div">
              <img
                :src="img_dev"
                alt=""
              >
              <a />
            </div>
            <div class="process_div">
              <img
                :src="img_app"
                alt=""
              >
              <a
                :href="appStoreUrl"
                target="_blank"
              />
            </div>
            <div class="process_div">
              <img
                :src="img_mecm"
                alt=""
              >
              <a
                :href="mecmUrl"
                target="_blank"
              />
            </div>
          </div>
          <div class="bg_process">
            <img
              :src="img_process"
              alt=""
            >
          </div>
        </div>
        <el-row>
          <el-button
            type="primary"
            class="start_btn"
            round
            @click="jumpToWorkSpace"
          >
            {{ $t('home.travelStart') }}
          </el-button>
        </el-row>
      </div>
      <div class="showLogo">
        <el-link
          target="_blank"
          v-for="item in aLinkList"
          :key="item.id"
          :href="item.url"
          :underline="false"
        >
          <img
            :src="item.src"
            :title="item.title"
            :alt="item.title"
          >
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { aLinkList } from './home.js'
export default {
  name: '',
  data () {
    return {
      showMain: false,
      inputValue: '',
      showError: false,
      dialogVisible: false,
      aLinkList: aLinkList,
      img_dev: require('../../assets/images/home_link_dev_cn.png'),
      img_app: require('../../assets/images/home_link_app_cn.png'),
      img_mecm: require('../../assets/images/home_link_mecm_cn.png'),
      img_process: require('../../assets/images/home_link_process_cn.png'),
      appStoreUrl: '',
      mecmUrl: ''
    }
  },
  computed: {
    ...mapState(['activeTab'])
  },
  methods: {
    jumpToWorkSpace () {
      this.$router.push({ name: 'workspace', params: { from: 'index' } })
    },
    jumpTo (item) {
      this.$store.commit('changeTab', item.id)
      this.$router.push(item.path)
    },
    getInputValue () {
      this.$store.commit('getKeyValue', this.inputValue)
    },
    getPlatformUrl () {
      let currUrl = window.location.origin
      if (currUrl.indexOf('30092') !== -1) {
        this.appStoreUrl = currUrl.replace('30092', '30091')
        this.mecmUrl = currUrl.replace('30092', '30093')
      } else {
        this.appStoreUrl = currUrl.replace('developer', 'appstore')
        this.mecmUrl = currUrl.replace('developer', 'mecm')
      }
    }
  },
  created () {
    if (sessionStorage.getItem('key')) {
      this.showMain = true
    } else {
      this.dialogVisible = true
    }
  },
  mounted () {
    this.getPlatformUrl()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      if (language === 'cn') {
        this.img_dev = require('../../assets/images/home_link_dev_cn.png')
        this.img_app = require('../../assets/images/home_link_app_cn.png')
        this.img_mecm = require('../../assets/images/home_link_mecm_cn.png')
        this.img_process = require('../../assets/images/home_link_process_cn.png')
      } else {
        this.img_dev = require('../../assets/images/home_link_dev_en.png')
        this.img_app = require('../../assets/images/home_link_app_en.png')
        this.img_mecm = require('../../assets/images/home_link_mecm_en.png')
        this.img_process = require('../../assets/images/home_link_process_en.png')
      }
      console.log(this.img_dev)
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  position: absolute;
  width: 100%;
  left: 0;
  height: calc(100% - 65px);
  overflow-y: auto;
  top:65px;
  .topLine {
    height: 300px;
    background: url("../../assets/images/banner.png") no-repeat center center #222a3f;
    .title {
      color: #fff;
      padding: 65px 0 0 200px;
      h2{
        font-size: 30px;
      }
      p {
        margin-top: 20px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
  @media screen and (max-width: 1380px) {
    .topLine {
      height: 300px;
      background: url("../../assets/images/banner.png") no-repeat center center #222a3f;
      .title {
        padding: 60px 0 0 50px;
      }
    }
  }
  @media screen and (max-width: 640px){
    .topLine {
      height: 300px;
      .title{
        padding: 60px 20px 100px;
      }
    }
  }
  .showLogo {
    padding: 25px 10%;
    text-align: center;
    position: relative;
    z-index: 999999;
    a {
      display: inline-block;
      width: 9%;
      margin: 0 1% 1%;
      img {
        width: 80%;
        max-width: 110px;
        opacity: 0.7;
      }
      img:hover {
        opacity: 1;
      }
    }
  }
  .showLogo a:first-child {
    width: 12%;
  }
  .showLogo a:first-child img {
    width: 90%;
    max-width: 180px;
  }
  .showLogo a:last-child {
    width: 14%;
  }
  .showLogo a:last-child img {
    width: 100%;
    max-width: 210px;
  }
  @media screen and (max-width: 1024px){
    .showLogo{
      padding: 25px 5%;
      a{
        width: 10.1%;
        margin: 0 0.5% 1%;
      }
    }
  }
  @media screen and (max-width: 768px){
    .showLogo{
      a{
        width: 14.6%;
      }
    }
  }
  @media screen and (max-width: 640px){
    .showLogo{
      a{
        width: 24%;
      }
      a:last-child {
        width: 24%;
      }
    }
  }

  .common-appliaction {
    padding-left: 18px;
    background: white;
    position: relative;
    padding-bottom: 26px;
    .el-row{
      text-align: center;
      .el-button.start_btn{
        background: #6c63ff;
        margin: 30px 0 20px;
        font-size: 18px;
        padding: 15px 60px;
        border-radius: 30px;
        position: relative;
        z-index: 9999;
      }
    }
    .platform_link{
      padding: 40px 0 20px;
    }
    .platform_link>div{
      float: left;
      width: 100%;
    }
    .bg_process{
      z-index: 1;
      position: relative;
      height: 210px;
      margin-top: -255px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        height: 100%;
      }
    }
    .devProcess{
      display: flex;
      justify-content: center;
    }
    .process_div:nth-child(2){
      margin: 0 30px;
    }
    .process_div{
      text-align: center;
      position: relative;
      z-index: 999;
      height: 500px;
      img{
        height: 100%;
      }
    }
    .process_div a{
      display: inline-block;
      border-radius: 12px;
      width: 100%;
      height: 78.5%;
      position: relative;
      z-index: 2;
      top: -79.5%;
      transition: transform 0.3s;
      -webkit-transition: transform 0.3s;
    }
    .process_div a:hover{
      box-shadow:0 8px 10px 0 rgba(0,0,0,0.4)
    }
    @media screen and (max-width: 1680px){
      .process_div{
        height: 400px;
      }
      .bg_process{
        height: 170px;
        margin-top: -200px;
      }
    }
    @media screen and (max-width: 1380px){
      .process_div{
        height: 360px;
      }
      .bg_process{
        height: 160px;
        margin-top: -180px;
      }
    }
    @media screen and (max-width: 1280px){
      .process_div{
        height: 335px;
      }
      .bg_process{
        height: 150px;
        margin-top: -170px;
      }
    }
    @media screen and (max-width: 1150px){
      .process_div{
        height: 300px;
      }
      .bg_process{
        height: 135px;
        margin-top: -150px;
      }
    }
    @media screen and (max-width: 1030px){
      .platform_link{
        overflow-x: auto;
      }
      .platform_link>div{
        width: auto;
      }
      .el-row{
        .el-button.start_btn{
          font-size: 16px;
          padding: 15px 35px;
        }
      }
    }
  }
}
.el-row {
  margin: 0 !important;
}
.dialog {
  width: 30%;
  height: 200px;
  border: 1px solid #ddd;
  padding: 2%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -15%;
  margin-top: -180px;
}
.keyInput {
  margin: 20px 0 10px;
}
.keyerror {
  color: #f66f6a;
}
</style>
