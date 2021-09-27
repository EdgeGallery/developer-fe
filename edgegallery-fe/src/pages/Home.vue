
<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
    <div class="banner_home padding_default">
      <img
        src="../assets/images/home_banner_eg.png"
        alt=""
        class="banner_eg"
      >
      <div class="banner_icon">
        <div class="icon">
          <img
            src="../assets/images/home_banner_icon_dev.png"
            alt=""
          >
          <p>应用上车</p>
        </div>
        <div class="fg" />
        <div class="icon">
          <img
            src="../assets/images/home_banner_icon_atp.png"
            alt=""
          >
          <p>认证中心</p>
        </div>
        <div class="fg" />
        <div class="icon">
          <img
            src="../assets/images/home_banner_icon_app.png"
            alt=""
          >
          <p>APP商店</p>
        </div>
        <div class="fg" />
        <div class="icon">
          <img
            src="../assets/images/home_banner_icon_mecm.png"
            alt=""
          >
          <p>应用部署</p>
        </div>
      </div>
    </div>
    <div class="home_developer padding_default">
      <div class="title_center title_color1">
        应用上车
        <span class="line_bot1" />
      </div>
      <div class="dev_list">
        <div class="list_div">
          <img
            src="../assets/images/home_developer_img1.png"
            alt=""
          >
          <div class="list_info clear">
            <p class="title lt">
              能力中心
            </p>
            <p class="detail lt">
              丰富的边缘能力随心选择，极致的5G体验触手可及
              <!-- 各种简易服务都在其中 -->
            </p>
            <p
              class="btn rt"
              @click="jumpToDetail('capability')"
            >
              详情
            </p>
          </div>
        </div>
        <div class="list_div">
          <img
            src="../assets/images/home_developer_img2.png"
            alt=""
          >
          <div class="list_info clear">
            <p class="title lt">
              工作空间
            </p>
            <p class="detail lt">
              真实的5G沙箱环境可供选择，开始您的应用集成开发之旅
            </p>
            <p
              class="btn rt"
              @click="jumpToDetail('workspace')"
            >
              详情
            </p>
          </div>
        </div>
        <div class="list_div">
          <img
            src="../assets/images/home_developer_img3.png"
            alt=""
          >
          <div class="list_info clear">
            <p class="title lt">
              镜像管理
            </p>
            <p class="detail lt">
              统一管理镜像仓库，方便应用部署调测
            </p>
            <p
              class="btn rt"
              @click="jumpToDetail('systemImage')"
            >
              详情
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="home_atp clear">
      <div class="atp_left" />
      <div class="atp_right">
        <p class="title_atp title_left defaultFontBlod">
          认证中心
          <span class="line_bot1" />
        </p>
        <div class="atp_right_bg_filter">
          <ul class="atp_list clear">
            <li>
              <div class="img">
                <img
                  src="../assets/images/home_atp_icon1.png"
                  alt=""
                >
              </div>
              <p>应用测试</p>
            </li>
            <li>
              <div class="img">
                <img
                  src="../assets/images/home_atp_icon2.png"
                  alt=""
                >
              </div>
              <p>测试模型管理</p>
            </li>
            <li>
              <div class="img">
                <img
                  src="../assets/images/home_atp_icon3.png"
                  alt=""
                >
              </div>
              <p>测试任务管理</p>
            </li>
            <li>
              <div class="img">
                <img
                  src="../assets/images/home_atp_icon4.png"
                  alt=""
                >
              </div>
              <p>测试报告</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="home_appstore padding_default">
      <div class="title_center title_color1">
        APP商店
        <span class="line_bot1" />
      </div>
      <div class="app_hot_list">
        <ul>
          <li
            v-for="(item,index) in appstoreList"
            :key="index"
          >
            <img
              :src="item.icon"
              alt=""
            >
            <p class="name">
              {{ item.name }}
            </p>
            <el-rate
              v-model="item.score"
              disabled
            />
            <p class="score">
              {{ item.score }}
            </p>
          </li>
        </ul>
      </div>
      <p class="btn_more">
        <el-button
          class="to_project linearGradient"
          @click="jumpToDetail('appstore')"
        >
          查看更多
        </el-button>
      </p>
    </div>
    <div class="home_mecm">
      <div class="right_pic" />
      <div class="home_mecm_bg_filter padding_default">
        <div class="title_center title_color2">
          应用部署
          <span class="line_bot3" />
        </div>
        <div class="mecm_list">
          <p>
            <img
              src="../assets/images/home_mecm_icon1.png"
              alt=""
            >
            边缘节点管理
          </p>
          <p>
            <img
              src="../assets/images/home_mecm_icon2.png"
              alt=""
            >
            应用生命周期管理
          </p>
        </div>
        <p class="btn_more">
          <el-button
            class="to_project linearGradient"
            @click="jumpToDetail('package')"
          >
            查看详情
          </el-button>
        </p>
        <div class="home_bottom">
          <div class="bottom_icon">
            <el-link
              href=""
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
              @mouseenter.native="showWechat=true"
              @mouseleave.native="showWechat=false"
            >
              <img
                src="../assets/images/home_bottom_icon1.png"
                alt=""
              >
              <el-collapse-transition>
                <div
                  class="showDiv footer_wechat"
                  v-show="showWechat"
                  @mouseenter="showWechat=true"
                  @mouseleave="showWechat=false"
                >
                  <img
                    src="../assets/images/home_footer_wechat_eg.png"
                    alt=""
                  >
                </div>
              </el-collapse-transition>
            </el-link>
            <el-link
              href="https://weibo.com/u/7575392977?is_all=1"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              <img
                src="../assets/images/home_bottom_icon2.png"
                alt=""
              >
            </el-link>
            <el-link
              href="https://gitee.com/edgegallery"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              <img
                src="../assets/images/home_bottom_icon3.png"
                alt=""
              >
            </el-link>
            <el-link
              href="https://edgegallery.groups.io/g/main"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              <img
                src="../assets/images/home_bottom_icon4.png"
                alt=""
              >
            </el-link>
          </div>
          <div class="bottom_link lt">
            <el-link
              href="https://www.edgegallery.org/"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              EdgeGallery官网
            </el-link>
            <el-link
              href="https://www.edgegallery.org/videa-tutorial/"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              视频教程
            </el-link>
            <el-link
              href="https://www.edgegallery.org/introduction/"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              Edgegallery简介
            </el-link>
            <el-link
              href="https://www.edgegallery.org/software-download-3/"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              软件下载
            </el-link>
            <el-link
              href="https://www.edgegallery.org/how-to-members/"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              社区会员
            </el-link>
            <el-link
              href="https://www.edgegallery.org/contact-us-3/"
              target="_blank"
              rel="noopener noreferrer"
              :underline="false"
            >
              联系我们
            </el-link>
          </div>
          <div class="bottom_link rt">
            Copyright © 1988-2021 Tencent Inc. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import devNavData from '../navdata/devNavCn.js'
import appstoreNavData from '../navdata/appStoreNavCn.js'
import mecmNavData from '../navdata/mecmNavCn.js'
export default {
  components: {

  },
  data () {
    return {
      language: localStorage.getItem('language'),
      screenHeight: document.body.clientHeight,
      timer: false,
      showWechat: false,
      appstoreList: [
        {
          icon: require('../assets/images/home_appstore_icon1.png'),
          name: '智能货架',
          score: 5.0
        },
        {
          icon: require('../assets/images/home_appstore_icon2.png'),
          name: '易ocr',
          score: 5.0
        },
        {
          icon: require('../assets/images/home_appstore_icon3.png'),
          name: '福克斯',
          score: 5.0
        },
        {
          icon: require('../assets/images/home_appstore_icon4.png'),
          name: '人类段',
          score: 5.0
        },
        {
          icon: require('../assets/images/home_appstore_icon5.png'),
          name: 'vdecandvenc',
          score: 5.0
        },
        {
          icon: require('../assets/images/home_appstore_icon6.png'),
          name: 'ai-paint',
          score: 5.0
        }
      ],
      devNavData: devNavData,
      appstoreNavData: appstoreNavData,
      mecmNavData: mecmNavData
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    }
  },
  methods: {
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let oDiv = document.getElementsByClassName('banner_home')
        if (oDiv[0]) {
          oDiv[0].style.height = (Number(screenHeight)) + 'px'
        }
      })
    },
    jumpToDetail (path) {
      if (path === 'capability') {
        this.$router.push(this.devNavData[2].path)
      } else if (path === 'workspace') {
        this.$router.push(this.devNavData[3].path)
      } else if (path === 'systemImage') {
        this.$router.push(this.devNavData[4].children[2].path)
      } else if (path === 'appstore') {
        this.$router.push(this.appstoreNavData[1].path)
      } else if (path === 'package') {
        this.$router.push(this.mecmNavData[1].children[0].path)
      }
    }
  },
  mounted () {
    this.setDivHeight(this.screenHeight)
    // Listen to the window size change
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.screenWidth = document.body.clientWidth
        this.setDivHeight(this.screenHeight)
      })()
    }
  }
}
</script>

<style lang='less'>
.home {
  width: 100%;
  margin-top: -80px;
  .banner_home{
    background: url('../assets/images/home_banner_bg.jpg');
    background-size:cover;
    display: flex;
    min-height:500px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    .banner_eg{
      width: 905;
    }
    .banner_icon{
      width: 80%;
      display: flex;
      margin-top: 70px;
      .icon{
        width: 17.5%;
        text-align: center;
        p{
          color: #fff;
          font-size: 14px;
          margin-top: 25px;
        }
      }
      .fg{
        width: 10%;
        background: url('../assets/images/home_banner_fg.png') center 30% no-repeat;
      }
    }
  }
  .home_developer{
    background: url('../assets/images/home_developer_bg.png') center bottom no-repeat;
    background-size: contain;
    padding-top: 80px;
    padding-bottom: 180px;
    .dev_list{
      display: flex;
      justify-content: space-between;
      margin-top: 70px;
      flex-grow: 1;
      .list_div{
        max-width: 376px;
        background: #fff;
        border-radius: 17px;
        box-shadow: 0 20px 20px -1px rgba(95,89,155,0.3);
        img{
          width: 100%;
          display: block;
        }
        .list_info{
          padding: 40px 25px 40px 40px;
          .title{
            width: 80%;
            font-size: 16px;
            color: #636363;
          }
          .detail{
            width: 80%;
            font-size: 12px;
            color: #656565;
            margin-top: 5px;
          }
          .title:before{
            content: '';
            display: block;
            width: 5px;
            height: 5px;
            background: #5E40C8;
            border-radius: 50%;
            position: relative;
            top: 15px;
            left: -10px;
          }
          .btn{
            background: #5E40C8;
            color: #fff;
            padding: 3px 15px;
            border-radius: 10px;
            transform: scale(0.83);
            font-family: defaultFontLight;
            cursor: pointer;
            margin-top: -10px;
          }
        }
      }
    }
  }
  .home_atp{
    background: url('../assets/images/home_atp_bg.png') right bottom no-repeat;
    height: 598px;
    position: relative;
    .atp_left{
      width: 50%;
      height: 100%;
      background: url('../assets/images/home_atp_left_pic.png') right center no-repeat;
      background-size: cover;
    }
    .atp_right{
      width: 645px;
      position: absolute;
      top: 0;
      left: 50%;
      .title_atp{
        margin-top: 80px;
      }
      .atp_right_bg_filter{
        margin-left: -215px;
        margin-top: 65px;
        border-radius: 17px;
        background: rgba(97,205,208,0.7);
        backdrop-filter: blur(8px);
      }
      .atp_list{
        padding-top: 60px;
        li{
          float: left;
          width: 215px;
          text-align: center;
          .img{
            border-right: 1px solid #fff;
            padding: 20px 0 30px;
          }
          p{
            font-size: 18px;
            color: #fff;
            margin: 10px 0 20px;
          }
        }
        li:last-child{
          .img{
            border-right: none;
          }
        }
      }
    }
    @media screen and (max-width:1380px){
      .atp_left{
        width: 40%;
      }
      .atp_right{
        left: 40%;
      }
    }
  }
  .home_appstore{
    padding-bottom: 80px;
    padding-top: 80px;
    .app_hot_list{
      margin: 60px 0 50px;
      ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          text-align: center;
          .name{
            font-size: 18px;
            color: #000;
            margin: 6px 0;
          }
          .score{
            color: #000;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .btn_more{
    text-align: center;
    .el-button.to_project{
      min-width: 180px;
      height: 50px;
      border: none;
      font-size: 20px;
      color: #fff;
      border-radius: 30px;
      position: relative;
    }
  }
  .home_mecm{
    position: relative;
    .right_pic{
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 600px;
      background: url('../assets/images/home_mecm_bg.png') right top no-repeat;
    }
    .home_mecm_bg_filter{
      padding-bottom: 80px;
      padding-top: 80px;
      background: rgba(56,17,189,0.73);
      backdrop-filter: blur(8px);
    }
    .mecm_list{
      position: relative;
      width: 50%;
      left: 50%;
      margin: 80px 0 90px -140px;
      p{
        color: #fff;
        font-size: 30px;
        margin-top: 15px;
        font-family: defaultFontLight;
        img{
          vertical-align: middle;
          margin-right: 15px;
          position: relative;
          top: -2px;
        }
      }
    }
    .home_bottom{
      .el-link.el-link--default{
        color: #fff;
      }
      .bottom_icon{
        text-align: center;
        margin: 160px 0 60px;
        position: relative;
        .el-link{
          margin: 0 23px;
          position: relative;
        }
        .showDiv{
          width: 160px;
          text-align: center;
          position: absolute;
          left: -160px;
          bottom: 0;
          padding-right: 10px;
          img{
            float: right;
            width: 130px;
          }
        }
      }
      .bottom_link{
        .el-link{
          margin-right: 32px;
        }
      }
      .bottom_link.rt{
        text-align: right;
        color: #fff;
        font-family: defaultFontLight;
      }
    }
  }
}
</style>
