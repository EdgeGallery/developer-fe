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
        <div class="devProcess" />
        <el-row>
          <el-button
            type="primary"
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
import { commonApp, aLinkList } from './home.js'
export default {
  name: '',
  data () {
    return {
      commonApp: commonApp,
      showMain: false,
      inputValue: '',
      showError: false,
      dialogVisible: false,
      aLinkList: aLinkList
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
    background: url("../../assets/images/banner.png") no-repeat center center #205361;
    .title {
      color: #fff;
      padding: 65px 0 0 200px;
      h2{
        font-size: 30px;
      }
      p {
        margin-top: 20px;
        font-size: 18px;
        line-height: 30px;
      }
    }
  }
  @media screen and (max-width: 1380px) {
    .topLine {
      height: 300px;
      background: url("../../assets/images/banner.png") no-repeat center center #205361;
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
      .el-button{
        margin-top: 0px !important;
        font-size: 25px;
        height: 55px;
        width: 650px;
        border-radius: 30px;
      }
    }
    .devProcess{
      height: 600px;
      margin-left: 5%;
      margin-right: 6%;
      background: url("../../assets/images/devProcess.png") no-repeat center center;
      background-size: contain;
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
.el-button--primary {
  margin-top: 20px;
}
</style>
