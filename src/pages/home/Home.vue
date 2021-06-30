<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
      <div class="banner_home padding_default">
        <img
          :src="bannerTextUrl"
          alt=""
          class="banner_text"
          :class="{'banner_en':language==='en'}"
        >
        <el-button
          class="to_project"
          @click="jumpToProject()"
        >
          {{ $t('home.enterDev') }}<span class="right">></span>
        </el-button>
      </div>
      <!-- Platform capabilities -->
      <div class="home_capability">
        <div class="title_bg" />
        <div class="capa_div title_top_home">
          <div class="title clear">
            <div class="title_left defaultFontBlod lt">
              {{ $t('workspace.platformCapabilities') }}
              <span class="line_bot1" />
            </div>
            <img
              src="../../assets/images/home_capa_center.png"
              class="capa_center"
              alt=""
            >
          </div>

          <swiper
            :options="swiperOption"
            ref="mySwiper"
            v-loading="dataLoading"
          >
            <swiper-slide
              v-for="(item,index) in capabilityGroupData"
              :key="index"
            >
              <div class="capa_list">
                <div class="icon_box">
                  <img
                    :src="item.imgSrc"
                    alt=""
                  >
                </div>
                <p
                  class="app_name"
                  @click="jumpTo('mep',index)"
                >
                  {{ language==='cn'?item.name:item.nameEn }}
                </p>
              </div>
            </swiper-slide>
            <div
              class="swiper-button-prev"
              slot="button-prev"
            />
            <div
              class="swiper-button-next"
              slot="button-next"
            />
          </swiper>
        </div>
      </div>
      <!-- Application integration and development -->
      <div
        id="homeProject"
      >
        <ProjectHome
          :screen-width-prop="screenWidth"
          :screen-height-prop="screenHeight"
        />
      </div>

      <!-- Partner -->
      <div class="showLogo padding_default title_top_home">
        <div class="tit_parnter title_left defaultFontBlod">
          {{ $t('home.partner') }}
          <span class="line_bot1" />
        </div>
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
import { Api } from '../../tools/api.js'
import ProjectHome from '../../components/common/ProjectHome.vue'
export default {
  name: '',
  components: {
    ProjectHome
  },
  data () {
    return {
      aLinkList: aLinkList,
      language: localStorage.getItem('language'),
      userName: sessionStorage.getItem('userName'),
      screenHeight: document.body.clientHeight,
      screenWidth: document.body.clientWidth,
      bannerTextUrl: require('../../assets/images/home_banner_text.png'),
      timer: false,
      swiperOption: {
        slidesPerView: 4.5,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      capabilityGroupPic: [
        require('../../assets/images/home_capa_pic0.png'),
        require('../../assets/images/home_capa_pic1_ptjc.png'),
        require('../../assets/images/home_capa_pic2_dxwl.png'),
        require('../../assets/images/home_capa_pic3_ascend.png'),
        require('../../assets/images/home_capa_pic4_ai.png'),
        require('../../assets/images/home_capa_pic5_spcl.png'),
        require('../../assets/images/home_capa_pic6_sjk.png'),
        require('../../assets/images/home_capa_pic7_ggkj.png'),
        require('../../assets/images/home_capa_pic8_3gpp.png'),
        require('../../assets/images/home_capa_pic9_etsi.png')
      ],
      capabilityGroupData: [],
      dataLoading: true
    }
  },
  computed: {
    ...mapState(['activeTab'])
  },
  methods: {
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let oDiv = document.getElementsByClassName('banner_home')
        if (oDiv[0]) {
          oDiv[0].style.height = (Number(screenHeight) - 80) + 'px'
        }
      })
    },
    jumpToProject () {
      document.getElementById('homeProject').scrollIntoView()
    },
    jumpTo (name, index) {
      sessionStorage.setItem('fromHome', 'home')
      this.$router.push({ name: name, params: { index: index } })
    },
    // Get all ability groups
    getCapabilityGroups () {
      Api.getCapabilityGroupsApi().then(res => {
        let oneLevelNameEn = []
        let oneLevelNameCn = []
        let groupData = res.data
        groupData.forEach(item => {
          if (item.oneLevelName !== 'ETSI' && item.oneLevelName !== '3GPP') {
            oneLevelNameEn.push(item.oneLevelNameEn)
            oneLevelNameCn.push(item.oneLevelName)
          }
        })
        oneLevelNameEn = Array.from(new Set(oneLevelNameEn))
        oneLevelNameCn = Array.from(new Set(oneLevelNameCn))
        let length = oneLevelNameEn.length
        this.dataLoading = false
        for (let i = 0; i < length; i++) {
          let obj = {
            imgSrc: '',
            name: '',
            nameEn: ''
          }
          if (oneLevelNameEn[i] === 'Platform services') {
            obj.imgSrc = this.capabilityGroupPic[1]
          } else if (oneLevelNameEn[i] === 'Telecom network') {
            obj.imgSrc = this.capabilityGroupPic[2]
          } else if (oneLevelNameEn[i] === 'Ascend AI') {
            obj.imgSrc = this.capabilityGroupPic[3]
          } else if (oneLevelNameEn[i] === 'AI capabilities') {
            obj.imgSrc = this.capabilityGroupPic[4]
          } else if (oneLevelNameEn[i] === 'Video processing') {
            obj.imgSrc = this.capabilityGroupPic[5]
          } else if (oneLevelNameEn[i] === 'DateBase') {
            obj.imgSrc = this.capabilityGroupPic[6]
          } else if (oneLevelNameEn[i] === 'Public framework') {
            obj.imgSrc = this.capabilityGroupPic[7]
          } else {
            obj.imgSrc = this.capabilityGroupPic[0]
          }
          obj.name = oneLevelNameCn[i]
          obj.nameEn = oneLevelNameEn[i]
          this.capabilityGroupData.push(obj)
        }
      }).catch(() => {
        setTimeout(() => {
          this.dataLoading = false
        }, 2000)
      })
    }
  },
  created () {
    this.getCapabilityGroups()
  },
  mounted () {
    if (this.language === 'en') {
      this.bannerTextUrl = require('../../assets/images/home_banner_text_en.png')
    } else {
      this.bannerTextUrl = require('../../assets/images/home_banner_text.png')
    }
    this.setDivHeight(this.screenHeight)
    // Listen to the window size change
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.screenWidth = document.body.clientWidth
        this.setDivHeight(this.screenHeight)
      })()
    }
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      if (this.language === 'en') {
        this.bannerTextUrl = require('../../assets/images/home_banner_text_en.png')
      } else {
        this.bannerTextUrl = require('../../assets/images/home_banner_text.png')
      }
    }
  }
}
</script>

<style lang='less'>
.home {
  width: 100%;
  .banner_home{
    background: url('../../assets/images/home_banner_bg.jpg');
    background-size:cover;
    display: flex;
    min-height:500px;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    .banner_text{
      margin-left:140px;
      width: 40%;
      max-width: 566px;
    }
    .banner_text.banner_en{
      height: 40%;
      max-width: 868px;
      width: auto;
      min-height: 200px;
    }
    .el-button.to_project{
      min-width: 200px;
      height: 60px;
      background: none;
      border: 2px solid #fff;
      font-size: 20px;
      color: #fff;
      border-radius: 8px;
      margin: 118px 0 0 140px;
      .right{
        font-size: 14px;
        margin-left: 20px;
      }
    }
    .el-button.to_project:hover{
      background: #fff;
      color: #542c8a;
    }
  }
  .home_capability{
    padding-bottom: 0;
    position: relative;
    .capa_div{
      position: relative;
    }
    .title{
      height: 111px;
      padding: 0 10%;
      .capa_center{
        float: right;
        margin-right: 30px;
      }
    }
    .swiper-container{
      padding-top: 160px;
      top: -100px;
      padding-right: 10%;
      background: transparent;
      .swiper-wrapper:hover{
        cursor: move;
      }
      .swiper-slide:first-child{
        margin-left: 10%;
      }
    }
    .swiper-slide {
      padding: 10px 16px 30px;
      max-width: 380px;
      .icon_box{
        text-align: center;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .capa_list{
        border-radius: 10px;
      }
      .capa_list:hover{
        box-shadow: 0 6px 20px 0 rgba(27, 7, 118, 0.23);
      }
      .app_name{
        padding:8%;
        font-size: 1.5rem;
        color: #380879;
        background: url('../../assets/images/home_capa_name_bg.png') 92% center #fff no-repeat;
        border-radius: 0 0 10px 10px;
      }
      .app_name:hover{
        cursor: pointer;
      }
      .el-rate__icon{
        margin-right: 5px;
      }
    }
    .swiper-button-prev{
      right: 10%;
      top: 30px;
      left: auto;
      margin-right: 110px;
      width: 11px;
      height: 20px;
      background: url('../../assets/images/home_capa_left.png');
    }
    .swiper-button-next{
      right: 10%;
      top: 30px;
      width: 11px;
      height: 20px;
      background: url('../../assets/images/home_capa_right.png');
    }
    .swiper-button-prev:after, .swiper-button-next:after{
      content: '';
    }
  }
  .showLogo {
    background: #fff;
    .tit_parnter{
      margin-bottom: 110px;
      display: block;
    }
    a {
      display: inline-block;
      width: 18%;
      margin: 0 1% 2%;
      padding: 5px 0;
      border: 1px solid #9186b7;
      text-align: center;
      border-radius: 12px;
      background: transparent;
      img {
        width: 80%;
        max-width: 110px;
      }
    }
    a:hover{
      box-shadow: 3px 3px 10px 0 rgba(40, 6, 85, 0.2), 3px 3px 8px 0 rgba(40, 6, 85, 0.1) inset;
      cursor: pointer;
      background: transparent;
    }
  }
  @media screen and (max-width: 768px){
    .showLogo{
      a{
        width: 31%;
      }
    }
    .banner_home .banner_text,.banner_home .el-button.to_project{
      margin-left: 10%;
    }
  }
  @media screen and (max-width: 640px){
    .showLogo{
      a{
        width: 31%;
      }
    }
  }

  .common-appliaction {
    position: relative;
    padding-bottom: 26px;
    background: url('../../assets/images/home_link_bg.png') center bottom / cover no-repeat;
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
      padding: 20px;
    }
    .platform_link>div{
      float: left;
      width: 100%;
    }
    .bg_process{
      z-index: 1;
      position: relative;
      height: 210px;
      margin-top: -230px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        height: 100%;
        max-height: 222px;
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
      height: 457px;
      img{
        height: 100%;
        max-height: 457px;
        display: block;
      }
    }
    .process_div a{
      display: inline-block;
      border-radius: 15px;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      top: -100%;
      transition: transform 0.3s;
      -webkit-transition: transform 0.3s;
    }
    .process_div a:hover{
      box-shadow:0 2px 5px 0 rgba(0,0,0,0.4)
    }
    @media screen and (max-width: 1860px){
      .process_div{
        height: 400px;
      }
      .bg_process{
        height: 180px;
        margin-top: -190px;
      }
    }
    @media screen and (max-width: 1680px){
      .process_div{
        height: 360px;
      }
      .bg_process{
        height: 165px;
        margin-top: -175px;
      }
    }
    @media screen and (max-width: 1480px){
      .process_div{
        height: 320px;
      }
      .bg_process{
        height: 155px;
        margin-top: -155px;
      }
    }
    @media screen and (max-width: 1280px){
      .process_div{
        height: 280px;
      }
      .bg_process{
        height: 130px;
        margin-top: -135px;
      }
    }
    @media screen and (max-width: 1150px){
      .process_div{
        height: 260px;
      }
      .bg_process{
        height: 120px;
        margin-top: -130px;
      }
    }
    @media screen and (max-width: 1030px){
      .bg_process{
        height: 130px;
        margin-top: -130px;
      }
      .platform_link{
        overflow-x: auto;
        overflow-y: hidden;
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
