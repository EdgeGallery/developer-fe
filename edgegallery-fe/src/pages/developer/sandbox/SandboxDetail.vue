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
          <el-select
            v-model="detailTitle"
            @change="changeSandbox"
            :disabled="isChangeSandboxName"
          >
            <el-option
              v-for="item in sandboxNames"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <div
        class="detail-center"
        :class="{'deploy-detail-center':!isChangeStyle}"
      >
        <div
          class="detail-center-bg flex-center  hoverHands"
          v-if="isChangeStyle"
          @mouseleave="egBreathStyle=false"
          @mouseenter="egBreathStyle=true"
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
            {{ $t('sandbox.edgeApplication') }}
          </p>
        </div>
        <div
          v-else
          class="deploy-detail-bg common-div-bg"
        >
          <div class="common-dlg-title">
            {{ applicationName }}
          </div>
          <div
            class="details-center"
            v-if="appClass==='VM'"
          >
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
                      class="edit-tooltip"
                      effect="light"
                      :content="$t('common.edit')"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/edit_green.png"
                        alt=""
                      >
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div class="deploy-title">
                {{ $t('sandbox.configureNetwork') }}
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
              @uploadVmFile="uploadVmFile"
              :is-clear-vm-image-prop="isClearVmImage"
            />
          </div>
          <div
            class="details-center"
            v-if="appClass==='CONTAINER'"
          >
            <ContainerIndex
              @importScript="importScript"
              @checkContainerDetail="checkContainerDetail"
              @deployContainerFinish="deployContainerFinish"
            />
          </div>
          <div class="details-bottom clear">
            <p class="details-bottom-title lt defaultFontBold">
              5G MEC
            </p>
            <div class="btn-container">
              <el-button
                id="btn_clearVmList"
                v-if="appClass==='VM'"
                class="common-btn"
                :disabled="!this.isStartupVmFinish"
                @click="clearVmList"
              >
                {{ $t('sandbox.releaseResources') }}
              </el-button>
              <el-button
                id="btn_sandboxFinish"
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
          class="detail-center-name"
          :class="{'hide-div':!isChangeStyle}"
        >
          5G MEC
        </div>
        <img
          v-if="!isMecSucess"
          src="../../../assets/images/sandbox/mec_failed.png"
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
          <div class="one-content flex-center">
            <img
              src="../../../assets/images/sandbox/terminal.png"
              alt=""
            >
          </div>
          <p>
            {{ $t('sandbox.terminal') }}
          </p>
        </div>
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <div class="detail-bottom-one">
          <div class="one-content flex-center">
            <img
              src="../../../assets/images/sandbox/base_station.png"
              alt=""
            >
          </div>
          <p>
            {{ $t('sandbox.baseStation') }}
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
          <div class="one-content flex-center">
            <img
              src="../../../assets/images/sandbox/edge.png"
              alt=""
            >
          </div>
          <p>
            {{ $t('sandbox.upf') }}
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
          <p>
            {{ $t('sandbox.upf') }}
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
          class="detail-bottom-line"
        >
        <div class="detail-bottom-one">
          <div class="one-content flex-center">
            <img
              src="../../../assets/images/sandbox/core.png"
              alt=""
            >
          </div>
          <p>
            {{ $t('sandbox.coreNetwork') }}
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
          class="detail-bottom-line"
        >
        <div class="detail-bottom-one">
          <div class="one-content flex-center">
            <img
              src="../../../assets/images/sandbox/internet.png"
              alt=""
            >
          </div>
          <p>
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
      v-if="showContent==='showVmUploadFile'"
      @closeVmUpload="closeVmUpload"
      :application-id="applicationId"
      :vm-id="vmId"
    />
    <ContainerScript
      v-if="showContent==='showImportScript'"
      @finishUploadScript="finishUploadScript"
    />
    <ContainerDetail
      v-show="showContent==='showContainerDetail'"
      @closeContainerDetail="closeContainerDetail"
    />
  </div>
</template>

<script>
import ConfigNetwork from './vm/ConfigNetwork.vue'
import AddVm from './vm/AddVm.vue'
import NetScroll from './vm/NetScroll.vue'
import VmDetail from './vm/VmDetail.vue'
import VmList from './vm/VmList.vue'
import VmUploadFile from './vm/VmUploadFile.vue'
import ContainerIndex from './container/Index.vue'
import ContainerScript from './container/ContainerScript.vue'
import ContainerDetail from './container/ContainerDetail.vue'
import { sandbox, applicationApi } from '../../../api/developerApi.js'
export default {
  name: 'SandboxDetail',
  components: {
    ConfigNetwork,
    AddVm,
    NetScroll,
    VmDetail,
    VmList,
    VmUploadFile,
    ContainerIndex,
    ContainerScript,
    ContainerDetail
  },
  data () {
    return {
      applicationId: sessionStorage.getItem('applicationId') || '',
      detailTitle: sessionStorage.getItem('sandboxName'),
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
      isClearVmImage: false,
      appClass: '',
      vimType: sessionStorage.getItem('vimType'),
      architecture: sessionStorage.getItem('architecture'),
      sandboxNames: [],
      isChangeSandboxName: false
    }
  },
  methods: {
    getSandboxLists () {
      sandbox.getSandboxList(this.vimType, this.architecture).then(res => {
        if (res.data && res.data.results.length <= 0) {
          return
        }
        res.data.results.forEach(item => {
          this.sandboxNames.push({ 'value': item.name, 'label': item.name, 'id': item.id })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    changeSandbox (value) {
      this.mephostid = value
      let mepHostId = { mepHostId: this.mephostid }
      sandbox.selectSandbox(this.applicationId, mepHostId).then(() => {
        sandbox.getSandboxByMepHostId(this.mephostid).then(res => {
          sessionStorage.setItem('mepHostId', this.mephostid)
          sessionStorage.setItem('sandboxName', res.data.name)
          this.detailTitle = res.data.name
        })
      }).catch(err => {
        console.log(err)
      })
    },
    ischangeSandbox () {
      sandbox.container.getApplicationDetail(this.applicationId).then(res => {
        if (sessionStorage.getItem('loadtype') === 'vm') {
          if (res.data.vmApp.vmList.length > 0) {
            res.data.vmApp.vmList.forEach(item => {
              if (item.vmInstantiateInfo !== '') {
                this.isChangeSandboxName = true
              }
            })
          }
        } else {
          if (res.data.containerApp.instantiateInfo !== null) {
            this.isChangeSandboxName = true
          }
        }
      })
    },
    returnHome () {
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
    getUpfFinish () {
      sandbox.getUpfFinished(this.applicationId).then(res => {
        if (res.data.dnsRuleList.length !== 0 || res.data.trafficrulelist.length !== 0) {
          this.isMecSucess = true
        }
      }).catch(() => {})
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
      this.getVmList()
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
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.releaseEnvFailed'), 'error')
      })
    },
    getApplicationInfo () {
      applicationApi.getAppInfo(this.applicationId).then(res => {
        this.applicationName = res.data.name
        this.appClass = res.data.appClass
        if (this.appClass === 'VM') {
          this.getVmList()
        }
        if (res.data.status !== 'CREATED') {
          this.isAddVmFinish = true
        }
      })
    },
    importScript (data) {
      this.showContent = data
    },
    closeContainerDetail () {
      this.showContent = 'showDetail'
    },
    checkContainerDetail (data) {
      this.showContent = data
    },
    finishUploadScript () {
      this.showContent = 'showDetail'
    },
    deployContainerFinish (data) {
      this.isAddVmFinish = data
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
    this.getUpfFinish()
    this.getSandboxLists()
    this.ischangeSandbox()
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
  font-size: 16px;
  color: #fff;
  .detail-top{
    .detail-top-title{
      height: 63px;
      margin: 1% 0 0 13%;
      padding-left: 10px;
      letter-spacing: 4px;
      background: url('../../../assets/images/sandbox/detail_title.png') no-repeat left;
      .el-input__inner {
        margin: 14px 0 0 10px;
        background-color:#3e279b ;
        border:none;
        font-size: 24px;
        color: #fff;
        padding: 0;
        width: 200px;
      }
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
      border-radius: 15px;
      background-color:rgba(46,20,124,0.7) ;
      .detail-center-img{
        width: 154px;
        height: 127px;
      }
      .detail-center-title{
        display: none;
      }
    }
    .detail-center-bg:hover{
      .detail-center-title{
        display: block;
        z-index: 0;
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
        background-color:rgba(10, 9, 54, 0.4) ;
        backdrop-filter: blur(4px);
      }
    }
    .detail-center-bg:hover{
      .detail-center-title{
        opacity: 1;
      }
    }
    .detail-center-name{
      font-size: 26px;
      text-align: center;
      margin-top: 14px;
    }
    .detail-center-line{
      display: block;
      margin: 25px auto;
      width: 16px;
      height: 76px;
    }
  }
  .detail-bottom{
    display: flex;
    align-items: flex-start;
    margin: 10px auto 0;
    width: 1140px;
    .detail-bottom-one{
      .one-content{
        width: 152.45px;
        height: 152.45px;
        border-radius:50%;
        background-color: rgba(46,20,124, 0.7);
      }
      p{
        text-align: center;
        font-size: 26px;
        margin-top: 10px;
      }
    }
    .detail-bottom-line{
      width: 76px;
      height: 16px;
      margin: 65px 10px 0px 10px;
    }
  }
  .deploy-detail-center{
    width: 694px;
    height: 474px;
    transition: all  0.4s;
    .deploy-detail-bg{
      width: 694px;
      height: 474px;
      overflow: hidden;
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
        padding-top: 37px;
        margin: 0 60px;
        .details-center-deploy{
          display: flex;
          flex-direction: column;
          .details-center-deploy-img{
            .deploy-img{
              width: 150px;
              height: 150px;
              border-radius: 20px;
              background-color: rgba(10, 9, 54, 0.25);
              .deploy-img-center{
                width: 96px;
                height: 96px;
                opacity: 0.1;
                position:absolute;
              }
              .deploy-img-center.script-icon{
                width: 82px;
                height: 84px;
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
          width: 104%;
          margin-left: -2%;
          text-align: center;
          line-height: 50px;
          font-size: 18px;
        }
      }
      .details-bottom{
        margin-top: 35px;
        .details-bottom-title{
          font-size: 40px;
          color: rgba(238, 238, 238, 0.2);
          font-family: defaultFontBold, Arial, Helvetica, sans-serif;
        }
        .el-button{
          margin-top: 15px;
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
    transform: translate(-70px,50px);
    transition: all 0.4s ;
    height: 130px;
    .detail-bottom-one{
      width: 120px;
      margin-top: -20px;
      .one-content{
        transform: scale(0.42);
      }
      p{
        margin-left: 30px;
        margin-top: -35px;
        font-size: 16px;
      }
    }
    .detail-bottom-line{
      margin: 45px -36px 0 -10px ;
      transform: scale(0.8);
    }
    .edgePuf{
      width: 100px;
      height: 109px;
      margin: 25px 10px 0 40px;
      cursor: pointer;
      border-radius:20px ;
      background-color: rgba(46, 20, 124, 0.7);
      display: flex;
      align-items: center;
      flex-direction: column;
      img{
        width: 38px;
        height: 38px;
        margin: 22px 0 11px 0;
        border-radius:50%;
      }
    }
  }
  .scale-small-line{
    transform: translate(-250px,-10px) scale(0.8);
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
  .el-progress .el-progress-bar__inner:before {
    content:"";
    width:100%;
    height:100%;
    display:block;
    background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,0.3) 0,rgba(255,255,255,0.3) 12.5%,transparent 0,transparent 25%);
    background-size:80px 80px;
    animation:move 2.5s linear infinite;
  }
  @keyframes move {
    from {
      background-position: 80px 0;
    }
    to {
      background-position:  0;
    }
  }
}
.el-icon-arrow-up:before {
    content: "";
}
.el-scrollbar {
  width: 210px;
}
.el-select-dropdown {
  margin: 40px 0 0 0 !important;
  border: none;
  background: none ;
}
.el-popper[x-placement^=bottom] .popper__arrow{
  display: none !important;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background-color: #60569A;
}
.el-select-dropdown__item{
  background-color: #290E74;
  color: #fff;
}
</style>
