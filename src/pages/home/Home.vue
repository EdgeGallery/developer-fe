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
          class="to_project linearGradient"
          @click="jumpToProject()"
        >
          {{ $t('workspace.addNewProject') }}
        </el-button>
      </div>
      <!-- Platform capabilities -->
      <div class="home_capability">
        <div
          class="capa_div title_top_home"
          id="capa_div"
        >
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
                  @click="jumpTo('mep',item)"
                >
                  {{ language==='cn'?item.name:item.nameEn }}
                </p>
              </div>
            </swiper-slide>
            <div
              class="swiper-button-prev swiperBtn"
              slot="button-prev"
            >
              <span class="spanText">{{ buttonPrev }}</span>
            </div>
            <div
              class="swiper-button-next swiperBtn"
              slot="button-next"
            >
              <span class="spanText">></span>
            </div>
          </swiper>
          <div id="homeProjectPos" />
        </div>
      </div>
      <!-- Application integration and development -->
      <div>
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
import { aLinkList } from './home.js'
import { Capability } from '../../tools/api.js'
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
        {
          name: 'Platform services',
          src: require('../../../src/assets/images/home_capa_platform_services.png')
        },
        {
          name: 'Telecom network',
          src: require('../../../src/assets/images/home_capa_telecom_network.png')
        },
        {
          name: 'Ascend AI',
          src: require('../../../src/assets/images/home_capa_ascend_AI.png')
        },
        {
          name: 'AI capabilities',
          src: require('../../../src/assets/images/home_capa_AI_capabilities.png')
        },
        {
          name: 'Video processing',
          src: require('../../../src/assets/images/home_capa_video_processing.png')
        },
        {
          name: 'DateBase',
          src: require('../../../src/assets/images/home_capa_datebase.png')
        },
        {
          name: 'Public framework',
          src: require('../../../src/assets/images/home_capa_public_framework.png')
        }
      ],
      capabilityGroupData: [],
      dataLoading: true,
      oneLevelMap: new Map(),
      buttonPrev: '<'
    }
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
      sessionStorage.setItem('toDetailType', 'addNewPro')
      document.getElementById('homeProjectPos').scrollIntoView()
    },
    jumpTo (name, capabilityGroup) {
      sessionStorage.setItem('fromHome', 'home')
      this.$router.push({ name: name, params: { id: capabilityGroup.id } })
    },
    // Get all ability groups
    getCapabilityGroups () {
      Capability.getAllCapabilityGroup().then(res => {
        let data = res.data.reverse()
        this.dataLoading = false

        data.forEach(item => {
          if (item.nameEn === 'ETSI' || item.nameEn === '3GPP') {
            return
          }
          this.capabilityGroupData.push(item)
          this.capabilityGroupPic.forEach(itemPic => {
            if (item.nameEn === itemPic.name) {
              item.imgSrc = itemPic.src
            }
          })
        })
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
  },
  beforeRouteEnter (to, from, next) {
    // vm is an instance of vue, instead of this
    next(vm => {
      let isFromCapabilityCenter = from.path.indexOf('mecDeveloper/api/mep')
      if (isFromCapabilityCenter !== -1) {
        document.getElementById('capa_div').scrollIntoView()
      }
    })
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
      border: none;
      font-size: 20px;
      color: #fff;
      border-radius: 30px;
      margin: 118px 0 0 140px;
      position: relative;
    }
  }
  .home_capability{
    padding-bottom: 0;
    position: relative;
    .capa_div{
      position: relative;
      background: url('../../assets/images/home_capa_bg.png') bottom center no-repeat;
      background-size: contain;
    }
    .title{
      height: 111px;
      padding: 0 10%;
      .capa_center{
        float: right;
        margin-right: 40px;
      }
    }
    .swiper-container{
      padding-top: 160px;
      top: -100px;
      padding-right: 13%;
      background: transparent;
      .swiper-wrapper:hover{
        cursor: move;
      }
      .swiper-slide:first-child{
        margin-left: 13%;
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
        box-shadow: 0 3px 15px 0 rgba(27, 7, 118, 0.13);
      }
      .capa_list:hover{
        box-shadow: 0 6px 20px 0 rgba(27, 7, 118, 0.35);
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
    .spanText{
      float: left;
      height: 19px;
      line-height: 18px;
      text-align: center;
      transform: scale(1.0,1.5);
    }
    .swiperBtn{
      width: 28px;
      height: 28px;
      border: 1px solid #2bcfe0;
      opacity: 1;
      border-radius: 50%;
      color: #fff;
    }
    .swiper-button-prev{
      right: 10%;
      top: 30px;
      left: auto;
      margin-right: 110px;
      background-image: linear-gradient(90deg, #2bcfe0, #2bcfe0);
    }
    .swiper-button-prev::after {
      content: '';
      width: 70%;
      height: 100%;
      position: absolute;
      right: 15%;
      bottom: -3px;
      background: inherit;
      filter: blur(0.35rem);
      opacity: 0.7;
      z-index: -1;
    }
    .swiper-button-next{
      right: 10%;
      top: 30px;
      background-image: linear-gradient(90deg, #2bcfe0, #2bcfe0);
    }
    .swiper-button-next::after {
      content: '';
      width: 70%;
      height: 100%;
      position: absolute;
      right: 15%;
      bottom: -3px;
      background: inherit;
      filter: blur(0.35rem);
      opacity: 0.7;
      z-index: -1;
    }
    .swiper-button-prev:after, .swiper-button-next:after{
      content: '';
    }
    .swiper-button-prev.swiper-button-disabled,.swiper-button-next.swiper-button-disabled{
      background: none;
      span{
        color: #2bcfe0;
      }
    }
    #homeProjectPos{
      position: absolute;
      bottom: 79px;
    }
  }
  .showLogo {
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
      img {
        width: 80%;
        max-width: 110px;
      }
    }
    a:hover{
      box-shadow: 3px 3px 10px 0 rgba(40, 6, 85, 0.2), 3px 3px 8px 0 rgba(40, 6, 85, 0.1) inset;
      cursor: pointer;
    }
  }
}
</style>
