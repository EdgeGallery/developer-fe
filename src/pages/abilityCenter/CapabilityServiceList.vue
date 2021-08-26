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
  <div class="service_div">
    <div
      v-for="(item,index) in capabilityServiceList.slice(0,showNum)"
      :key="index"
      class="service_list"
      :style="{height:divHeight+'px'}"
      @mouseenter="hoverServiceList(index)"
      @mouseleave="activeInfo=-1"
      @click="viewServiceDetail(item,index)"
    >
      <img
        :src="getImageUrl(item.iconFileId)"
        class="pic"
        alt=""
      >
      <div
        class="service_info"
        :class="{'service_hover':activeInfo===index}"
      >
        <p class="tit">
          {{ language==='cn'?item.name:item.nameEn }}
        </p>
        <p class="sort">
          <span class="hot">
            {{ item.selectCount }}
          </span>
          <span class="time">
            {{ formatDate(item.uploadTime) }}
          </span>
          <span
            class="detail"
            :class="{'show':activeInfo===index}"
          >
            {{ $t('devTools.detail') }}
          </span>
        </p>
        <p
          class="desc"
          :class="{'all':activeInfo===index}"
        >
          {{ language==='cn'?item.description:item.descriptionEn }}
        </p>
      </div>
    </div>
    <!-- 服务详情弹框 -->
    <div
      v-for="(item,index) in serviceDetail"
      :key="index"
    >
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div class="service_detail">
          <p class="title">
            {{ language==='cn'?item.name:item.nameEn }}
          </p>
          <div class="user_div clear">
            <img
              src="../../assets/images/capa_service_user.jpg"
              alt=""
            >
            <p class="user_info">
              {{ $t('devTools.author') }}: {{ item.group.author }}
            </p>
            <p>{{ $t('workspace.releaseTime') }}: {{ formatDate(item.uploadTime) }}</p>
          </div>
          <div class="service_div clear">
            <img
              :src="getImageUrl(item.iconFileId)"
              class="pic"
              alt=""
            >
            <div class="service_right rt">
              <div>
                <p class="service_desc">
                  {{ $t('nav.introduction') }}:
                </p>
                <p class="service_desc">
                  {{ language==='cn'?item.description:item.descriptionEn }}
                </p>
              </div>
              <div>
                <p class="service_level clear">
                  <span class="lt">{{ $t('api.partition') }}</span>
                  <span class="level_right rt">{{ language==='cn'?item.group.name:item.group.nameEn }}</span>
                </p>
                <p class="service_level clear">
                  <img
                    src="../../assets/images/capa_service_detail_tag.png"
                    alt=""
                    class="icon lt"
                  >
                  <span class="lt">{{ $t('workspace.appRelease.tag') }}</span>
                  <span class="tag rt">{{ item.group.type }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="service_footer">
          <el-button
            class="defaultBtn"
            @click="serviceDocClick(item)"
          >
            {{ $t('api.serviceDoc') }}
          </el-button>
          <el-button
            class="defaultBtn"
            @click="amulatorClick(item)"
          >
            {{ $t('api.onlineEmulator') }}
          </el-button>
          <el-button
            v-if="toOnline"
            class="defaultBtn"
            @click="toOnlineExperience(item)"
          >
            {{ $t('api.onlineExperience') }}
            <img
              src="../../assets/images/capa_service_detail_hot.png"
              alt=""
              class="button_hot"
            >
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { Api, Workspace } from '../../tools/api.js'
import { Workspace } from '../../tools/api.js'
import { common } from '../../tools/common.js'
export default {
  name: '',
  props: {
    capabilityServiceList: {
      require: true,
      type: Array,
      default: () => []
    },
    language: {
      require: true,
      type: String,
      default: ''
    },
    showNum: {
      require: true,
      type: Number,
      default: 12
    },
    userId: {
      require: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeInfo: -1,
      serviceDetail: [],
      dialogVisible: false,
      toOnline: false,
      divHeight: 0
    }
  },
  mounted () {
    this.setDivHeight()
    window.onresize = () => {
      return (() => {
        this.setDivHeight()
      })()
    }
  },
  methods: {
    setDivHeight () {
      this.$nextTick(() => {
        let oDiv = document.getElementsByClassName('service_list')
        let width = Number(oDiv[0].offsetWidth)
        console.log(width)
        if (width > 320 && width < 430) {
          this.divHeight = width - 100
        } else {
          this.divHeight = width - 50
        }
      })
    },
    formatDate (timestamp) {
      return common.formatDate(timestamp)
    },
    hoverServiceList (index) {
      this.activeInfo = index
    },
    getImageUrl (iconFileId) {
      return Workspace.getIconApi(iconFileId, this.userId)
    },
    viewServiceDetail (item, index) {
      sessionStorage.setItem('capaSelectDetailIndex', index)
      this.dialogVisible = true
      this.serviceDetail = []
      this.serviceDetail.push(item)
      if (item.nameEn === 'Location service' || item.nmeEn === 'AI Image Repair' || item.nameEn === 'Edge Detection' || item.nameEn === 'Image Cartoonization' || item.nameEn === 'Image Coloring' || item.nameEn === 'Object Classification' || item.nameEn === 'Object Detection') {
        this.toOnline = true
      } else {
        this.toOnline = false
      }
    },
    serviceDocClick (item) {
      this.$router.push({ name: 'serviceDoc', query: { guideFileId: item.guideFileId, guideFileIdEn: item.guideFileIdEn, language: this.$i18n.locale } })
    },
    amulatorClick (item) {
      this.$router.push({ name: 'apiAmulator', query: { serviceId: item.id, apiFileId: item.apiFileId, language: this.$i18n.locale } })
    },
    toOnlineExperience (item) {
      if (item.host) {
        let onLineUrl = item.protocol + '://' + item.host + ':' + item.port + '/#/' + item.nameEn.replace(/\s*/g, '')
        window.open(onLineUrl, '_blank')
      } else {
        this.$message.warning(this.$t('api.onlineService'))
      }
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less">
.service_div{
  .el-dialog{
    width: 40%;
    min-width: 910px;
    background: #efefef;
    border-radius: 15px;
    .el-dialog__header{
      border-radius: 15px;
      background: #efefef !important;
    }
    .el-icon-close:before{
      font-size: 32px;
      color: #787878 !important;
    }
    .el-dialog__body{
      padding: 10px 0 0 !important;
    }
    .service_footer{
      border-top: 1px solid #7a6e8a;
      padding: 35px 0;
      margin-top: 45px;
      text-align: center;
      .el-button{
        font-size: 14px;
        color: #ffffff;
        height: 40px;
        line-height: 24px;
        border-radius: 10px;
        padding: 8px 45px;
        position: relative;
      }
      .el-button + .el-button {
        margin-left: 25px;
      }
      .button_hot{
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  @media screen and (max-width:1290px){
    .el-dialog{
      width: 60%;
    }
  }
  .service_detail{
    padding: 0 90px;
    .title{
      font-size: 25px;
      color: #380879;
    }
    .user_div{
      margin: 35px 0;
      img{
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      p{
        float: right;
        width: calc(100% - 60px);
        font-size: 15px;
        color: #7a6e8a;
        height: 25px;
        line-height: 25px;
        padding-left: 15px;
      }
      p.user_info{
        margin-top: 5px;
      }
    }
    .service_div{
      position: relative;
      .pic{
        float: left;
        width: 432px;
        height: 252px;
        border-radius: 10px;
      }
      .service_right{
        width: calc(100% - 432px);
        height: 252px;
        padding-left: 45px;
        font-size: 14px;
        color: #7a6e8a;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .service_desc{
          line-height: 22px;
        }
        .service_level{
          border-top: 1px solid #bdbec0;
          min-height: 50px;
          line-height: 20px;
          padding: 15px 0;
          .icon{
            margin-right: 10px;
          }
          .level_right{
            width: 60%;
            text-align: right;
          }
          .tag{
            font-size: 12px;
            background: #e1dde6;
            border-radius: 10px;
            padding: 3px 6px;
          }
        }
      }
    }
  }
  .service_list{
    float: left;
    width: 31%;
    margin: 0 0 3% 2%;
    padding-bottom: 82px;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    box-shadow: 0 6px 24px -7px rgba(27, 7, 118, 0.14);
    overflow: hidden;
    img{
      width: 100%;
      display: block;
      border-radius: 12px 12px 0 0;
    }
    .service_info{
      background: #fff;
      border-radius: 12px;
      position: absolute;
      width: 100%;
      bottom: 0px;
      right: 0;
      z-index: 2;
      padding: 20px 20px 10px;
      color: #535353;
      .tit{
        font-size: 19px;
        margin-bottom: 10px;
        color: #5844be;
      }
      .detail{
        float: right;
        font-size: 14px;
        color: #fff;
        padding: 1px 10px;
        border-radius: 15px;
        position: relative;
        top: -2px;
        opacity: 0;
        transition: all 0.3s ease-in-out;
        background-image: linear-gradient(127deg, #78b8ef, #53dabd);
      }
      .detail.show{
        opacity: 1;
        transition: all 0.4s ease-in-out 0.5s;
      }
      .detail::after {
        content: '';
        width: 80%;
        height: 100%;
        position: absolute;
        right: 10%;
        bottom: -5px;
        background: inherit;
        filter: blur(0.25rem);
        opacity: 0.7;
        z-index: -1;
      }
      .detail:active{
        background-image: linear-gradient(127deg, #60a9e7, #4cc1a8);
      }
      .sort{
        color: #5844be;
        .hot{
          background: url('../../assets/images/capa_service_icon_hot.png') no-repeat left center;
          padding-left: 20px;
          margin-right: 15px;
        }
        .time{
          background: url('../../assets/images/capa_service_icon_time.png') no-repeat left center;
          padding-left: 20px;
        }
      }
      .desc{
        font-size: 14px;
        width: 100%;
        max-height: 0px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.6s ease-in-out;
        margin-top: 10px;
      }
      .desc.all{
        max-height: 80px;
        white-space: normal;
        transition: all 0.6s ease-in-out;
      }
    }
    .service_info.service_hover{
      padding: 20px;
    }
  }
  .service_list:hover{
    box-shadow: 0 10px 20px -7px rgba(27, 7, 118, 0.24);
  }
  @media screen and (max-width:1500px){
    .service_list{
      width: 48%;
    }
  }
}
</style>
