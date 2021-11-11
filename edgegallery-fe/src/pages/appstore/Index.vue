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
  <div
    class="padding_default"
  >
    <div
      class="rt"
      style="margin:50px 20px 20px;"
    >
      <el-button
        class="test-btn"
        @click="jumpToIncubation"
      >
        返回
      </el-button>
      <el-button
        class="test-light-btn"
        @click="jumpTo('/EG/appstore/apppromotion')"
      >
        应用推送
      </el-button>
    </div>
    <div
      class="common-div-bg"
      style="padding: 20px 20px;"
    >
      <div class="app-grid clearfix">
        <div
          class="curp content"
          v-for="(item, index) in pageData"
          :key="index"
          :id="item.appId"
        >
          <div
            class="application"
            @mouseover="hoverAppList(index)"
            @mouseout="activeIndex=-1"
            @click="jumpTo('/EG/appstore/appDetail');removeClass()"
          >
            <div
              class="img-box"
              :class="[item.experienceAble!==false ? (language==='cn'?'img-boxcn':'img-boxen'): '']"
            >
              <!-- <img
                :src="getAppIcon(item)"
                alt=""
              > -->
              <img
                class="newapp-breath"
                :src="item.images"
                alt=""
              >
            </div>
            <div
              class="scoreMode"
            >
              <p
                class="appNameStyle"
              >
                {{ item.name }}
              </p>
              <div class="scoreIcon">
                <div class="score">
                  <img
                    src="../../assets/images/appstore/score_icon.png"
                    alt
                  >
                  <span class="core">
                    {{ item.score }}
                  </span>
                </div>
                <p
                  class="deployMode"
                >
                  {{ item.deployMode==='container'?'容器':'虚拟机' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Pagination
          :table-data="pageData"
          @getCurrentPageData="getCurrentPageData"
          :list-total="listTotal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { URL_PREFIX, appstoreApi } from '../../api/appstoreApi'
import Pagination from '../../components/Pagination.vue'

export default {
  name: 'Application',
  components: { Pagination },
  data () {
    return {
      pageData: [
        {
          name: 'AI_Paint',
          version: '1.0',
          provider: 'HuaWeicompanyIntr',
          size: '12.00 k',
          score: '5',
          type: 'CSAR',
          experienceAble: false,
          images: require('../../assets/images/appstore/app_icon.png')
        }, {
          name: 'Game_2048',
          version: '1.0',
          provider: 'HuaWeicompanyIntr',
          size: '12.00 k',
          score: '5',
          type: 'CSAR',
          experienceAble: false,
          images: require('../../assets/images/appstore/game2048.png')
        }, {
          name: 'Mediawiki',
          version: '1.0',
          provider: 'HuaWeicompanyIntr',
          size: '12.00 k',
          score: '5',
          type: 'CSAR',
          experienceAble: true,
          images: require('../../assets/images/appstore/mediawiki.png')
        }, {
          name: 'Pacman',
          version: '1.0',
          provider: 'HuaWeicompanyIntr',
          size: '12.00 k',
          score: '5',
          type: 'CSAR',
          experienceAble: true,
          images: require('../../assets/images/appstore/pacman.png')
        }, {
          name: '飞船大战',
          version: '1.0',
          provider: 'HuaWeicompanyIntr',
          size: '12.00 k',
          score: '5',
          type: 'CSAR',
          experienceAble: false,
          images: require('../../assets/images/appstore/spaceships.png')
        }, {
          name: '飞船大战',
          version: '1.0',
          provider: 'HuaWeicompanyIntr',
          size: '12.00 k',
          score: '5',
          type: 'CSAR',
          experienceAble: false,
          images: require('../../assets/images/appstore/spaceships.png')
        }
      ],
      language: 'cn',
      activeIndex: -1,
      limitSize: 5,
      offsetPage: 0,
      listTotal: 0,
      currentPage: 1
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    },
    jumpToIncubation () {
      this.$store.commit('changeFlow', '6')
      this.$router.push('/EG/developer/home')
    },
    removeClass () {
      let _classBreaths = document.getElementsByClassName('newapp-breath')
      _classBreaths[0].classList.remove('newapp-breath')
    },
    hoverAppList (index) {
      this.activeIndex = index
    },
    getAppIcon (item) {
      return URL_PREFIX + 'apps/' + item.appId + '/packages/' + item.packageId + '/icon'
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    getAppData (searchCondition) {
      appstoreApi.getAppData(searchCondition).then((res) => {
        this.pageData = res.data.results
        this.listTotal = res.data.total
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang='less'>
.app-grid {
  min-height: 320px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  .content {
    box-sizing: border-box;
    width: 20%;
    padding: 0 2%;
    margin-bottom: 30px;
    .application {
      border: 2px solid;
      border-color: rgba(182, 164, 236, 0.6);
      border-radius: 16px;
      position: relative;
      background-image: url('../../assets/images/appstore/app_bg.png');
      background-size: 100% 100%;
      .img-box {
        position: relative;
        background-image: url('../../assets/images/appstore/app_icon_bg.png');
        background-size: 100% 100%;
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        height: 158px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px 16px 0 0;
        img {
          display: block;
          width: 50%;
          border-radius: 10%;
        }
      }
      .img-boxen {
        background-image: url(../../assets/images/appstore/experience_flag_en.png) ;
      }
      .img-boxcn {
        background-image: url(../../assets/images/appstore/experience_flag.png) ;
      }
      .scoreMode{
        border-radius: 0 0 16px 16px;
        width: 100%;
        padding: 12px 20px;
        .appNameStyle {
          width: 100%;
          font-size: 20px;
          max-height: 36px;
          padding-bottom: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .scoreIcon{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-content: center;
          .score{
            img{
              width: 14px;
              height: 14px;
              margin-right:6px ;
              margin-top: 4px;
            }
            .core{
              font-size: 14px;
              font-weight: 300;
              color: #fff;
            }
          }
          .deployMode{
            margin-top: 5px;
            font-size: 14px;
            font-weight: 300;
            color: #fff;
          }
        }
      }
    }
    .application:hover{
      transition: transform .3s ease-in-out, box-shadow .3s cubic-bezier(0, 0, 0, .715), border .3s linear .1s;
      box-shadow: 0px 3px 3px #c8c8c8 !important;
      -webkit-box-shadow: 0px 3px 3px #c8c8c8 !important;
      transform:translatey(-7px)
    }
  }
  .content:first-child{
    .application{
      .img-box{
         background-image: url(../../assets/images/appstore/new_app_flag.png) ;
      }
    }
    .newapp-breath{
      animation: breathe 2s ease-in 0s infinite;
      @keyframes breathe {
        0%{
          opacity: 0.3;
        }
        50%{
          opacity: 1;
        }
        100%{
          opacity: 0.3;
        }
      }
    }
  }
  @media screen and (max-width: 1224px){
    .content {
      width: 25%;
    }
  }
}
</style>
