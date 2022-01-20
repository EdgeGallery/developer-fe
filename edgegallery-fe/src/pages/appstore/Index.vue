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
    <p class="appstore-title defaultFontBold">
      {{ $t('workflow.appstore') }}
    </p>
    <div
      class="rt"
      style="margin:50px 20px 20px;"
    >
      <el-button
        class="common-btn"
        @click="jumpToIncubation"
      >
        {{ $t('common.back') }}
      </el-button>
      <el-button
        class="common-btn"
        :disabled="ifPushBtn"
        @click="jumpTo('/EG/appstore/apppromotion')"
      >
        {{ $t('apppromotion.appPromotion') }}
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
            @click="jumpToDetail(item)"
          >
            <div
              class="img-box img-common"
              :class="[item.experienceAble!==false ? (language==='cn'?'img-boxcn':'img-boxen'): '',index==0 && this.offsetPage===0 ? (language==='cn'?'new-boxcn':'new-boxen'): '']"
            >
              <img
                :src="getAppIcon(item)"
                alt=""
              >
            </div>
            <div
              class="scoreMode"
            >
              <p
                class="appNameStyle defaultFontLight"
              >
                {{ item.name }}
              </p>
              <div class="scoreIcon">
                <div class="score">
                  <img
                    src="../../assets/images/appstore/score_icon.png"
                    alt
                  >
                  <span class="core defaultFontLight">
                    {{ item.score }}
                  </span>
                </div>
                <p
                  class="deployMode defaultFontLight"
                >
                  {{ item.deployMode==='container' ? $t('store.deployContainer'):$t('store.deployVM') }}
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
import { URL_PREFIX_APPSTORE, appstoreApi } from '../../api/appstoreApi'
import Pagination from '../../components/Pagination.vue'

export default {
  name: 'AppWarehouse',
  components: { Pagination },
  data () {
    return {
      pageData: [],
      language: localStorage.getItem('language'),
      activeIndex: -1,
      limitSize: 10,
      offsetPage: 0,
      listTotal: 0,
      currentPage: 1,
      ifPushBtn: true
    }
  },
  methods: {
    ifClickPush () {
      this.ifPushBtn = sessionStorage.getItem('pushAuthorities') !== 'show'
    },
    jumpTo (path) {
      this.$router.push(path)
    },
    jumpToDetail (item) {
      this.$router.push({ path: '/EG/appstore/appDetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'index')
    },
    jumpToIncubation () {
      this.$store.commit('changeFlow', 6)
      this.$router.push('/EG/developer/home')
    },
    hoverAppList (index) {
      this.activeIndex = index
    },
    getAppIcon (item) {
      return URL_PREFIX_APPSTORE + 'apps/' + item.appId + '/packages/' + item.packageId + '/icon'
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    getAppData () {
      let searchCondition = {
        types: [],
        affinity: [],
        industry: [],
        showType: ['public', 'inner-public'],
        workloadType: [],
        userId: '',
        queryCtrl: {
          appName: '',
          status: ['Published'],
          offset: this.offsetPage,
          limit: this.limitSize,
          sortItem: 'createTime',
          sortType: 'desc'
        }
      }
      appstoreApi.getAppData(searchCondition).then((res) => {
        this.pageData = res.data.results
        this.listTotal = res.data.total
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('promptMessage.getfail'),
          type: 'error'
        })
      })
    }
  },
  watch: {
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getAppData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getAppData()
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getAppData()
    }
  },
  mounted () {
    this.getAppData()
    this.ifClickPush()
  }
}
</script>
<style lang='less'>
.appstore-title{
  letter-spacing: 5px;
  font-size: 24px;
  position: relative;
  top: 84px;
  left: 2px;
  width: 300px;
}
.app-grid {
  height: 573px;
  overflow-y: auto;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  .content {
    box-sizing: border-box;
    width: 20%;
    padding: 0 2%;
    margin-bottom: 30px;
    .application {
      border-radius: 16px;
      position: relative;
      background-size: 100% 100%;
      .img-box {
        position: relative;
        background: #ffffff;
        text-align: center;
        width: 100%;
        height: 158px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px 8px 0 0;
        img {
          display: block;
          width: 50%;
          border-radius: 10%;
        }
      }
      .img-common{
        background-size: 40%;
        background-repeat: no-repeat;
        background-position-x: right;
      }
      .img-boxen {
        background-image: url(../../assets/images/appstore/experience_flag_en.png) ;
      }
      .img-boxcn {
        background-image: url(../../assets/images/appstore/experience_flag.png) ;
      }
      .new-boxcn{
        background-image: url(../../assets/images/appstore/new-boxcn.png) ;
      }
      .new-boxen{
        background-image: url(../../assets/images/appstore/new-boxen.png) ;
      }
      .scoreMode{
        border-radius: 0 0 8px 8px;
        width: 100%;
        padding: 12px 20px;
        background: #4E3494;
        .appNameStyle {
          width: 100%;
          font-size: 18px;
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
            margin-top: 4px;
            img{
              width: 14px;
              height: 14px;
              position: relative;
              top: 1px;
              margin-right: 6px;
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
      transform:translatey(-7px)
    }
  }
  @media screen and (max-width: 1224px){
    .content {
      width: 25%;
    }
  }
}
</style>
