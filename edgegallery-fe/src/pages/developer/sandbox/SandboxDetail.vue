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
  <div class="detail">
    <div v-if="showContent==='showDetail'">
      <div class="detail-top clear">
        <div class="detail-top-title lt">
          {{ detailTitle }}
        </div>
        <img
          src="../../../assets/images/sandbox/question.png"
          alt=""
          class="question hoverHands"
        >
      </div>
      <div
        class="detail-center"
        :class="{'deploy-detail-center':!isChangeStyle}"
      >
        <div
          class="detail-center-bg flex-center  hoverHands"
          v-if="isChangeStyle"
          @mouseleave="egBreathStyle=false"
          @click="deployInternet"
        >
          <img
            src="../../../assets/images/sandbox/mec_img.png"
            alt=""
            class="detail-center-img"
            :class="{'breath':!egBreathStyle}"
          >
          <p
            class="detail-center-title defaultFontLight"
          >
            边缘应用
          </p>
        </div>
        <div
          v-else
          class="deploy-detail-bg common-div-bg"
        >
          <div class="details-top">
            <p class="deploy-detail-circle" />
            <p class="deploy-detail-title defaultFontLight">
              {{ applicationName }}
            </p>
          </div>
          <div class="details-center">
            <div class="details-center-deploy">
              <div class="details-center-deploy-img">
                <div
                  class="lt deploy-img flex-center hoverHands"
                  @click="selectNet"
                >
                  <img
                    class="deploy-img-center"
                    :class="{'deploy-img-center-finish':configNetworkFinish,'breath':!deployBreathStyle}"
                    src="../../../assets/images/sandbox/deploy_img.png"
                    @mouseleave="!configNetworkFinish"
                    alt=""
                    v-if="!configNetworkFinish"
                  >
                  <img
                    class="deploy-img-center"
                    :class="{'deploy-img-center-finish':configNetworkFinish}"
                    src="../../../assets/images/sandbox/deploy_img_finish.png"
                    alt=""
                    v-if="configNetworkFinish"
                  >
                  <div class="deploy-edit flex-center">
                    <el-tooltip
                      class="item edit-tooltip"
                      effect="light"
                      content="编辑"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/edit.png"
                        alt=""
                      >
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div class="deploy-title defaultFontLight">
                配置网络
              </div>
            </div>
            <ul
              class="netLine"
              v-if="!isAddVmFinish"
            >
              <li
                class="oneNet"
                v-for="(item,index) in netNum"
                :key="index"
              />
            </ul>
            <NetScroll
              v-else
              class="netLine-list"
              :network-list-prop="networkList"
            />
            <VmList
              v-show="!isChangeStyle"
              @addVm="addVm"
              @checkVmDetail="checkVmDetail"
              :is-add-vm-finish-prop="isAddVmFinish"
              @startUpVm="startUpVm"
              :vm-breath-style-prop="vmBreathStyle"
              :is-btn-start-prop="isBtnStart"
              @uploadVmFile="uploadVmFile"
              :is-clear-vm-image-prop="isClearVmImage"
            />
          </div>
          <div class="details-bottom">
            <p class="details-bottom-title lt defaultFontBlod">
              5G MEC
            </p>
            <div class="btn-container">
              <el-button
                class="common-btn"
                :disabled="!this.isStartupVmFinish"
                @click="clearVmList"
              >
                释放环境
              </el-button>
              <el-button
                class="common-btn"
                :disabled="!this.isAddVmFinish"
                @click="returnHome"
              >
                {{ $t('common.finish') }}
              </el-button>
            </div>
          </div>
        </div>
        <div
          class="detail-center-name defaultFontLight"
          :class="{'hide-div':!isChangeStyle}"
        >
          5G MEC
        </div>
        <img
          v-if="!isMecSucess"
          src="../../../assets/images/sandbox/failed_line.png"
          alt=""
          class="detail-center-line"
          :class="{'scale-small-line':!isChangeStyle}"
        >
        <img
          v-else
          src="../../../assets/images/sandbox/mec_sucess.png"
          alt=""
          class="detail-center-line"
          :class="{'scale-small-line':!isChangeStyle}"
        >
      </div>
      <div
        class="detail-bottom"
        :class="{'scale-small':!isChangeStyle}"
      >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/terminal.png"
            alt=""
          >
          <p class="defaultFontLight">
            5G终端
          </p>
        </div>
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/base_station.png"
            alt=""
          >
          <p class="defaultFontLight">
            5G基站
          </p>
        </div>
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <div
          class="detail-bottom-one"
          v-if="isChangeStyle"
        >
          <img
            src="../../../assets/images/sandbox/edge.png"
            alt=""
          >
          <p class="defaultFontLight">
            边缘UPF
          </p>
        </div>
        <div
          v-else
          class="edgePuf"
          @click="addApplicationRules"
          @mouseleave="upfBreathStyle=false"
        >
          <img
            :class="{'breath':!isUpfSucess}"
            :src="isUpfSucess ? require('@/assets/images/sandbox/upf_finish.png'): require('@/assets/images/sandbox/upf_btn.png')"
            alt=""
          >
          <p
            class="defaultFontLight"
          >
            边缘UPF
          </p>
        </div>
        <img
          v-if="!isMecSucess"
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <img
          v-else
          src="../../../assets/images/sandbox/internet_failed.png"
          alt=""
          class="detail-bottom-line detail-bottom-line-failed"
        >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/core.png"
            alt=""
          >
          <p class="defaultFontLight">
            5G核心网
          </p>
        </div>
        <img
          v-if="!isMecSucess"
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <img
          v-else
          src="../../../assets/images/sandbox/internet_failed.png"
          alt=""
          class="detail-bottom-line detail-bottom-line-failed"
        >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/internet.png"
            alt=""
          >
          <p class="defaultFontLight">
            INTERNET
          </p>
        </div>
      </div>
    </div>
    <AddVm
      v-if="showContent==='showAddVm'"
      @addVmFinish="addVmFinish"
      :net-work-list-prop="netWorkList"
      :selected-networks-prop="selectedNetworks"
    />
    <ConfigNetwork
      v-if="showContent==='showConfigNetwork'"
      @editNetwork="editNetwork"
    />
    <VmDetail
      v-show="showContent==='showVmDetail'"
      @closeVmDetail="closeVmDetail"
    />
    <VmUploadFile
      v-show="showContent==='showVmUploadFile'"
      @closeVmUpload="closeVmUpload"
      :application-id="applicationId"
      :vm-id="vmId"
    />
  </div>
</template>

<script>
import ConfigNetwork from './ConfigNetwork.vue'
import AddVm from './AddVm.vue'
import NetScroll from './NetScroll.vue'
import VmDetail from './VmDetail.vue'
import VmList from './VmList.vue'
import VmUploadFile from './VmUploadFile.vue'
import { sandbox, applicationApi } from '../../../api/developerApi.js'
export default {
  name: 'SandboxDetail',
  components: {
    ConfigNetwork,
    AddVm,
    NetScroll,
    VmDetail,
    VmList,
    VmUploadFile
  },
  data () {
    return {
      applicationId: sessionStorage.getItem('applicationId') || '',
      detailTitle: JSON.parse(sessionStorage.getItem('sandboxName')),
      isChangeStyle: true,
      showContent: 'showDetail',
      isBtnDetail: false,
      isBtnStart: false,
      isAddVmFinish: false,
      configNetworkFinish: false,
      isStartupVmFinish: false,
      netNum: 3,
      egBreathStyle: false,
      upfBreathStyle: false,
      deployBreathStyle: false,
      vmBreathStyle: false,
      selectedNetworks: [],
      netWorkList: [],
      isMecSucess: false,
      isUpfSucess: false,
      vmId: '',
      applicationName: '',
      isClearVmImage: false
    }
  },
  methods: {
    returnHome () {
      this.$store.commit('changeFlow', '3')
      this.$router.push('/EG/developer/home')
    },
    deployInternet () {
      this.isChangeStyle = false
    },
    selectNet () {
      this.showContent = 'showConfigNetwork'
    },
    addVm (data) {
      this.showContent = data
    },
    addVmFinish (data) {
      if (data && data.length > 0) {
        this.networkList = data
        this.isBtnStart = true
        this.isAddVmFinish = true
        this.configNetworkFinish = true
        this.vmBreathStyle = this.isAddVmFinish
        this.deployBreathStyle = this.configNetworkFinish
        this.netNum = data.length
      }
      this.showContent = 'showDetail'
    },
    editNetwork (data, selectedData) {
      this.showContent = 'showDetail'
      if (data && data.length > 0) {
        this.netWorkList = data
        this.configNetworkFinish = true
        this.deployBreathStyle = this.configNetworkFinish
        this.netNum = data.length
        this.selectedNetworks = selectedData
      }
    },
    checkVmDetail (data) {
      this.showContent = data
    },
    closeVmDetail () {
      this.showContent = 'showDetail'
    },
    uploadVmFile (data) {
      this.showContent = data
    },
    closeVmUpload () {
      this.showContent = 'showDetail'
    },
    startUpVm (data) {
      this.isStartupVmFinish = data
    },
    addApplicationRules () {
      this.$router.push('/EG/developer/applicationRules')
    },
    getVmList () {
      sandbox.getVmList(this.applicationId).then(res => {
        if (res.data.length === 0) {
          return
        }
        let _data = res.data[0]
        this.vmId = _data.id
        this.isStartupVmFinish = !!_data.vmInstantiateInfo
        this.isAddVmFinish = true
        this.configNetworkFinish = true
        this.deployBreathStyle = true
        let _arrTemp = []
        _data.portList.forEach(item => {
          _arrTemp.push(item.networkName)
        })
        this.networkList = _arrTemp
      })
    },
    clearVmList () {
      sandbox.clearVmImage(this.applicationId).then(() => {
        this.isClearVmImage = true
        this.isStartupVmFinish = false
      }).catch(() => {
        this.$eg_messagebox('释放环境失败！', 'error')
      })
    },
    getApplicationInfo () {
      applicationApi.getAppInfo(this.applicationId).then(res => {
        this.applicationName = res.data.name
      })
    }
  },
  mounted () {
    if (sessionStorage.getItem('applicationRules') === 'confirm') {
      this.isChangeStyle = false
      this.isMecSucess = true
      this.isUpfSucess = true
    } else if (sessionStorage.getItem('applicationRules') === 'cancel') {
      this.isChangeStyle = false
      this.isMecSucess = false
    }
    this.getApplicationInfo()
    this.getVmList()
  },
  beforeDestroy () {
    sessionStorage.removeItem('applicationRules')
  }
}
</script>

<style lang="less">
.detail{
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #fff;
  .detail-top{
    .detail-top-title{
      height: 63px;
      margin: 1% 0 0 13%;
      font-size: 30px;
      line-height: 50px;
      padding-left: 10px;
      letter-spacing: 4px;
      background: url('../../../assets/images/sandbox/detail_title.png') no-repeat left;
    }
  }
  .detail-center{
    margin: 50px auto 0;
    width: 259px;
    height: 350px;
    .detail-center-bg{
      position: relative;
      width: 259px;
      height: 200px;
      background: url('../../../assets/images/sandbox/mec_bg.png') no-repeat center;
      .detail-center-img{
        width: 154px;
        height: 127px;
      }
      .detail-center-title{
        z-index: 1;
        width: 259px;
        height: 38px;
        opacity: 1;
        margin-top: -10px;
        line-height: 38px;
        position: absolute;
        text-align: center;
      }
      .detail-center-title::after{
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:rgba(10, 9, 54, 0.8) ;
        backdrop-filter: blur(4px);
      }
    }
    .detail-center-bg:hover{
      .detail-center-title{
        opacity: 1;
      }
    }
    .detail-center-name{
      text-align: center;
      line-height: 34px;
    }
    .detail-center-line{
      display: block;
      margin: 10px auto;
      width: 16px;
      height: 96px;
    }
  }
  .detail-bottom{
    display: flex;
    align-items: center;
    margin: 10px auto 0;
    width: 1140px;
    .detail-bottom-one{
      p{
        text-align: center;
        line-height: 30px;
      }
    }
    .detail-bottom-line{
      width: 76px;
      height: 22px;
      margin: 0 10px;
    }
    .detail-bottom-line-failed{
      height: 14px !important;
      margin-top: -1px !important;
    }
  }
  .deploy-detail-center{
    width: 694px;
    height: 464px;
    transition: all  0.4s;
    .deploy-detail-bg{
      width: 694px;
      height: 464px;
      max-height: 100%;
      padding: 40px 40px;
       .details-top{
        display: flex;
        .deploy-detail-circle{
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: #76E1E9;
          margin: 6px 10px 0 0;
        }
        .deploy-detail-title{
          font-size: 16px;
          color: #fff;
        }
      }
      .details-center{
        display: flex;
        padding-top: 60px;
        margin: 0 60px;
        .details-center-deploy{
          display: flex;
          flex-direction: column;
          .details-center-deploy-img{
            .deploy-img{
              width: 150px;
              height: 150px;
              background-image: url('../../../assets/images/sandbox/deploy_internet.png');
              .deploy-img-center{
                width: 96px;
                height: 96px;
                opacity: 0.1;
                position:absolute;
                border-radius:50%;
              }
              .deploy-img-center-finish{
                opacity: 1;
              }
              .deploy-edit{
                position: relative;
                width: 150px;
                height: 150px;
                border-radius:20px ;
                opacity: 0;
              }
            }
            .deploy-img:hover{
              .deploy-edit{
                opacity: 1;
                z-index: 1;
              }
              .deploy-edit::after{
                border-radius:20px ;
                z-index: -1;
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color:rgba(10, 9, 54, 0.5) ;
                backdrop-filter: blur(4px);
              }
            }
            .internet-num{
              margin: 30px 0 0 10px;
            }
          }
        }
        .netLine{
          width: 154px;
          height: 100px;
          margin: 32px 16px 0 16px;
          overflow: hidden;
          li{
            width: 8px;
            height:8px;
            border-radius:50%;
            background-color: #fff;
            margin-bottom: 18px;
          }
        }
        .netLine-list{
          margin: 30px 16px 0 16px;
        }
        .deploy-title{
          text-align: center;
          line-height: 50px;
        }
      }
      .details-bottom{
        margin-top: 60px;
        .details-bottom-title{
          font-size: 40px;
          color: #0a0936;
          font-family: defaultFontBlod, Arial, Helvetica, sans-serif;
          opacity: 0.2;
        }
        .exportImage_btn_show{
          display: block;
        }
      }
    }
  }
  .hide-div{
    display: none;
  }
  .scale-small{
    transform: translate(-64px,50px);
    transition: all 0.4s ;
    height: 130px;
    .detail-bottom-one{
      width: 120px;
      img{
        transform: scale(0.42);
      }
      p{
        margin-left: 30px;
        margin-top: -40px;
      }
    }
    .detail-bottom-line{
      margin: 10px -36px 0 0 ;
      width: 60px;
      height: 18px;
    }
    .edgePuf{
      width: 100px;
      height: 109px;
      margin: 40px 10px 0 40px;
      cursor: pointer;
      background-image: url('../../../assets/images/sandbox/upf_bg.png');
      display: flex;
      align-items: center;
      flex-direction: column;
      img{
        width: 38px;
        height: 38px;
        margin: 22px 0 18px 0;
        border-radius:50%;
      }
    }
  }
  .scale-small-line{
    transform: translate(-250px,-10px) scale(0.7);
    transition: all  0.4s;
  }
  .breath{
    animation-timing-function:ease-in-out;
    animation-name:breathe;
    animation-duration:2000ms;
    animation-iteration-count:infinite;
    animation-direction:alternate;
    @keyframes breathe  {
      0%{
         opacity:.2;
         filter: drop-shadow(0px 0px 20px rgba(255, 255, 255,0.1));
      }
      100%{
        opacity:1;
         filter: drop-shadow(0px 0px 20px rgba(255, 255, 255,.8));
      }
    }
  }
}
</style>
