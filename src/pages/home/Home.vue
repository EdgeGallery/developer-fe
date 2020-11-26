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
          <span />
          <p>
            {{ $t('home.bannerText3') }}
            <br>{{ $t('home.bannerText4') }}
          </p>
        </div>
      </div>
      <div class="common-appliaction">
        <div class="step">
          {{ $t('home.step') }}
        </div>
        <div class="tabs clear">
          <div
            class="tabsPart"
            v-for="(item,index) in commonApp"
            :key="index"
            :id="item.elementId"
          >
            <router-link :to="item.link">
              <div>
                <span>{{ index + 1 }}</span>
              </div>
              <img
                :src="item.src"
                alt=""
              >
              <h5 style="text-align: center;">
                {{ $t(item.title) }}
              </h5>
            </router-link>
          </div>
        </div>
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
    height: 400px;
    background: url("../../assets/images/bg1.jpg") no-repeat center center;
    background-size: cover;
    .title {
      color: #fff;
      padding: 110px 0 0 200px;
      h2{
        font-size: 30px;
      }
      span{
        display: inline-block;
        width: 75px;
        height: 3px;
        background: #fff;
        margin: 40px 0 10px;
      }
      p {
        font-size: 16px;
        line-height: 30px;
        color: #ddd;
      }
    }
  }
  @media screen and (max-width: 1380px) {
    .topLine {
      height: 360px;
      background: url("../../assets/images/bg1.jpg") no-repeat center center;
      background-size: cover;
      .title {
        padding: 100px 0 0 50px;
      }
    }
  }
  @media screen and (max-width: 640px){
    .topLine {
      height: auto;
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
    width: 95%;
    margin: 0 auto 20px;
    background: white;
    position: relative;
    margin-top: -35px;
    .step{
      position: absolute;
      top: 23px;
      left: 23px;
      font-size: 20px;
      color: #282B33;
    }
    .tabs {
      display: flex;
      justify-content: space-around;
      padding: 70px 0 55px;
      .tabsPart {
        height: 265px;
        width: 23%;
        box-shadow: 2px 2px 2px 2px #8888883f;
        overflow: hidden;
        a{
          display: block;
          height: 100%;
          text-align: center;
          padding-top: 50px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          div{
            height: 100px;
            width: 100px;
            background: rebeccapurple;
            position: absolute;
            top: -50px;
            left: -50px;
            border-radius: 50%;
            span{
              display: inline-block;
              position: absolute;
              left: 65px;
              top: 65px;
            }
          }
          img {
            width: 98px;
            height: 98px;
          }
          h5 {
            font-weight: bold;
            color: white;
            font-size: 26px;
            margin-top: 30px;
          }
          @media screen and (max-width: 1380px) {
              h5 {
                font-size: 22px;
                margin-top: 20px;
              }
          }
        }
      }
      @media screen and (max-width: 1380px){
        .tabsPart {
          height: 200px;
          a{
            padding-top: 30px;
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
      }
      .tabsPart:nth-child(1){
         background: linear-gradient(to top left, #8448d7 , #6c92fa 50%,#6c93ff );
         a{
           div{
             background: #7e6efb;
           }
         }
      }
      .tabsPart:nth-child(2){
         background: linear-gradient(to top left, #dac939, #acdb7e 50%, #a7dd82);
         a{
           div{
             background: #a8f742;
           }
         }
      }
      .tabsPart:nth-child(3){
         background: linear-gradient(to top left, #06dced, #80e1d9 50%, #80e1d9);
         a{
           div{
             background: #29dde2;
           }
         }
      }
      .tabsPart:nth-child(4){
         background: linear-gradient(to top left, #cdabff, #95c6ff 50%, #85caff);
         a{
           div{
             background: #70b9f1;
           }
         }
      }
    }
    @media screen and (max-width: 640px){
      .tabs{
        display: block;
        padding: 70px 0 0;
        .tabsPart {
          float: left;
          width: 50%;
          h5 {
            padding: 0 10px;
          }

        }
      }
      .tabs .tabsPart a h5 {
        font-size: 18px;
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
.el-button--primary {
  margin-top: 20px;
}
</style>
