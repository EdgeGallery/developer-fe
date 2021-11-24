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
        class="common-btn"
        @click="jumpToIncubation"
      >
        {{ $t(common.back) }}
      </el-button>
      <el-button
        class="common-btn"
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
              class="img-box"
              :class="[item.experienceAble!==false ? (language==='cn'?'img-boxcn':'img-boxen'): '']"
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
                  {{ item.deployMode==='container' ? this.$t('store.deployContainer'):this.$t('store.deployVM') }}
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
      language: 'cn',
      activeIndex: -1,
      limitSize: 10,
      offsetPage: 0,
      listTotal: 0,
      currentPage: 1
    }
  },
  methods: {
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
    }
  },
  mounted () {
    this.getAppData()
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
  }
  @media screen and (max-width: 1224px){
    .content {
      width: 25%;
    }
  }
}
</style>
