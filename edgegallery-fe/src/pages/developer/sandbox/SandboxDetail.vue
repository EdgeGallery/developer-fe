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
    <div v-show="showContent==='showDetail'">
      <div
        class="detail-top clear"
        v-if="isChangeStyle"
      >
        <div class="sandboxName-background flex-center">
          <el-button
            @click="showSandboxName = !showSandboxName"
            class="detail-top-title defaultFontBold"
          >
            {{ detailTitle }}
          </el-button>
        </div>
        <div class="sandbox-names">
          <el-collapse-transition>
            <div
              v-show="showSandboxName"
              class="sandbox-name-select"
            >
              <div
                class="one-select"
                v-for="(item,index) in sandboxNames"
                :key="index"
                @click="changeSandbox(item)"
              >
                <p class="triangle" />
                <p class="select-options defaultFontLight">
                  {{ item.label }}
                </p>
              </div>
            </div>
          </el-collapse-transition>
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
          class="deploy-detail-bg common-div-bg clear"
        >
          <div class="detail-top detail-top-inner clear">
            <div class="sandboxName-background flex-center">
              <el-button
                @click="showSandboxName = !showSandboxName"
                class="detail-top-title defaultFontBold"
              >
                {{ detailTitle }}
              </el-button>
            </div>
            <div class="sandbox-names">
              <el-collapse-transition>
                <div
                  v-show="showSandboxName"
                  class="sandbox-name-select"
                >
                  <div
                    class="one-select"
                    v-for="(item,index) in sandboxNames"
                    :key="index"
                    @click="changeSandbox(item)"
                  >
                    <p class="triangle" />
                    <p class="select-options defaultFontLight">
                      {{ item.label }}
                    </p>
                  </div>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="application-title">
            <div
              class="add-vm-small rt"
              v-if="appClass==='VM' && vmLists.length>=1"
              @click="addVm"
            >
              <img
                src="../../../assets/images/sandbox/vm_add_icon.png"
                alt=""
              >
            </div>
          </div>
          <div
            class="details-center clear"
            v-if="appClass==='VM'"
          >
            <UPF />
            <div class="details-center-deploy vm-div">
              <div class="details-center-deploy-img">
                <div
                  class="lt deploy-img flex-center hoverHands"
                  @click="selectNet"
                >
                  <img
                    class="deploy-img-center deploy-img-center-finish"
                    src="../../../assets/images/sandbox/deploy_img_finish.png"
                    alt=""
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
              class="ul-scoll lt"
              v-if="!isAddVmFinish"
            >
              <li
                class="oneNet"
                v-for="(item,index) in netWorkList"
                :key="index"
              >
                <p class="title">
                  {{ item.name }}
                </p>
                <p class="clear">
                  <span class="span-cicle lt" />
                  <span class="span-line lt" />
                  <span class="span-cicle rt" />
                </p>
              </li>
            </ul>
            <swiper
              v-show="vmLists.length>0"
              class="vm-swiper"
              :class="{'lt':vmLists.length<2}"
              :options="swiperOption"
              :key="swiperKey"
            >
              <swiper-slide
                v-for="(item,index) in vmLists"
                :key="index"
              >
                <VmList
                  :key="index"
                  class="vm-list-div"
                  v-show="!isChangeStyle"
                  @deleteVm="deleteVm"
                  @checkVmDetail="checkVmDetail"
                  :is-add-vm-finish-prop="isAddVmFinish"
                  @startUpVm="startUpVm"
                  :vm-breath-style-prop="vmBreathStyle"
                  @uploadVmFile="uploadVmFile"
                  :is-clear-vm-image-prop="isClearVmImage"
                  :vm-lists-detail-prop="item"
                  :vm-index-prop="index"
                  :net-work-list-show-prop="netWorkListShow"
                  :clear-state="clearState"
                />
              </swiper-slide>
              <div
                class="swiper-pagination"
                :class="{'swiper-pagination-none':vmLists.length<=1}"
                slot="pagination"
              />
            </swiper>
            <div
              class="details-center-deploy vm-div"
              v-if="vmLists.length<1"
            >
              <div class="details-center-deploy-img">
                <div
                  class="lt deploy-img flex-center hoverHands"
                  @click="addVm"
                >
                  <img
                    class="deploy-img-center-finish add-vm-big"
                    :class="{'breath':addVmBreathStyle}"
                    src="../../../assets/images/sandbox/vm_add_icon.png"
                    @mouseleave="addVmBreathStyle=true"
                    @mouseenter="addVmBreathStyle=false"
                    alt=""
                  >
                </div>
              </div>
              <div class="deploy-title">
                {{ $t('sandbox.vm') }}
              </div>
            </div>
          </div>
          <div
            class="details-center"
            v-if="appClass==='CONTAINER'"
          >
            <ContainerIndex
              ref="ContainerIndex"
              @importScript="importScript"
              @checkContainerDetail="checkContainerDetail"
              @deployContainerFinish="deployContainerFinish"
            />
          </div>
          <div class="details-bottom clear">
            <p class="details-bottom-title lt defaultFontBold">
              5G MEC
            </p>
            <div class="btn-container vm-btn">
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
                id="btn_cancelSandboxInner"
                v-if="appClass==='VM'"
                class="common-btn"
                @click="isChangeStyle=true"
              >
                {{ $t('common.back') }}
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
          v-if="isChangeStyle"
          src="../../../assets/images/sandbox/mec_failed.png"
          alt=""
          class="detail-center-line"
          :class="{'scale-small-line':!isChangeStyle}"
        >
      </div>
      <div
        class="detail-bottom"
        v-if="isChangeStyle"
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
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
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
          src="../../../assets/images/sandbox/sucess_line.png"
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
    <ConfigNetwork
      v-if="showContent==='showConfigNetwork'"
      @editNetwork="editNetwork"
    />
    <ContainerScript
      v-if="showContent==='showImportScript'"
      @finishUploadScript="finishUploadScript"
    />
    <ContainerDetail
      v-show="showContent==='showContainerDetail'"
      @closeContainerDetail="closeContainerDetail"
    />
    <el-dialog
      class="default_dialog"
      width="1100px"
      :class="isAddVmBtn?'showDialog':'hiddenDialog'"
      :visible.sync="showAddVm"
      :close-on-click-modal="false"
    >
      <AddVm
        @addVmFinish="addVmFinish"
        :is-add-vm-prop="isAddVm"
        @closeAddDialog="closeAddVm"
        ref="addVmChild"
        @getNetWorkList="getNetWorkList"
      />
      <span
        slot="footer"
        class="dialog-footer"
        v-if="isAddVmBtn"
      >
        <el-button
          id="btn_cancelAddVm"
          class="common-btn"
          @click="addVmConfirm('cancel')"
        >
          {{ $t('normal.cancel') }}
        </el-button>
        <el-button
          id="btn_confirmAddVm"
          class="common-btn"
          @click="addVmConfirm('confirm')"
        >
          {{ $t('normal.confirm') }}
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="default_dialog"
      width="900px"
      :visible.sync="showVmDetail"
      :close-on-click-modal="false"
    >
      <VmDetail
        @closeVmDetail="closeVmDetail"
        @editVmDetail="editVmDetail"
      />
    </el-dialog>
    <el-dialog
      class="default_dialog"
      width="700px"
      :visible.sync="showVmUploadFile"
      :close-on-click-modal="false"
    >
      <VmUploadFile
        :application-id="applicationId"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="btn_cancelVmUploadFile"
          class="common-btn"
          @click="showVmUploadFile=false"
        >
          {{ $t('common.close') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UPF from './Upf.vue'
import ConfigNetwork from './vm/ConfigNetwork.vue'
import AddVm from './vm/AddVm.vue'
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
    UPF,
    ConfigNetwork,
    AddVm,
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
      showSandboxName: false,
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
      addVmBreathStyle: true,
      vmBreathStyle: false,
      selectedNetworks: [],
      netWorkList: [],
      vmId: '',
      applicationName: '',
      isClearVmImage: false,
      appClass: '',
      vmLists: [],
      swiperOption: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        observer: true,
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          }
        }
      },
      netWorkListShow: [],
      vimType: sessionStorage.getItem('vimType'),
      architecture: sessionStorage.getItem('architecture'),
      sandboxNames: [],
      isChangeSandboxName: false,
      isAddVm: true,
      swiperKey: 1,
      clearState: '',
      showAddVm: false,
      showVmUploadFile: false,
      showVmDetail: false,
      isAddVmBtn: true
    }
  },
  methods: {
    getSandboxLists () {
      sandbox.getSandboxList(this.vimType, this.architecture).then(res => {
        if (res.data && res.data.results.length <= 0) {
          return
        }
        res.data.results.forEach(item => {
          this.sandboxNames.push({ 'label': item.name, 'id': item.id })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    changeSandbox (data) {
      this.mephostid = data.id
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
          if (res.data.vmApp && res.data.vmApp.vmList.length > 0) {
            res.data.vmApp.vmList.forEach(item => {
              if (item.vmInstantiateInfo !== '') {
                this.isChangeSandboxName = true
              }
            })
          }
        } else {
          if (res.data.containerApp && res.data.containerApp.instantiateInfo !== null) {
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
    addVm () {
      this.showAddVm = true
      this.isAddVm = true
      setTimeout(() => {
        this.$refs.addVmChild.handleAddVmData(true)
        this.$refs.addVmChild.getVmSpecs(0)
      }, 0)
    },
    deleteVm () {
      this.getVmList()
    },
    editVmDetail () {
      this.showAddVm = true
      this.showVmDetail = false
      this.isAddVm = false
    },
    addVmConfirm (type) {
      setTimeout(() => {
        this.$refs.addVmChild.addVmFinish(type)
      }, 0)
    },
    addVmFinish (data, confirm) {
      if (data && data.length > 0) {
        this.networkList = data
        this.isBtnStart = true
        this.isAddVmFinish = true
        this.configNetworkFinish = true
        this.vmBreathStyle = this.isAddVmFinish
        this.deployBreathStyle = this.configNetworkFinish
        this.netNum = data.length
        this.getVmList()
      }
      this.showAddVm = !confirm
      this.showContent = 'showDetail'
    },
    closeAddVm (data) {
      this.isAddVmBtn = data !== 'true'
    },
    editNetwork (data) {
      this.showContent = 'showDetail'
      if (data && data.length > 0) {
        this.netWorkList = data
        this.configNetworkFinish = true
        this.deployBreathStyle = this.configNetworkFinish
        this.netNum = data.length
      }
    },
    checkVmDetail () {
      this.showVmDetail = true
    },
    closeVmDetail (data, index) {
      this.showVmDetail = false
      this.vmLists[index] = data
    },
    uploadVmFile () {
      this.showVmUploadFile = true
    },
    closeVmUpload () {
      this.showContent = 'showDetail'
    },
    startUpVm (data) {
      this.isStartupVmFinish = data
    },
    getVmList () {
      sandbox.getVmlist(this.applicationId).then(res => {
        this.swiperKey = window.crypto.getRandomValues(new Uint8Array(1)) * 0.01
        this.vmLists = []
        this.netWorkListShow = []
        if (res.data.length === 0) {
          this.isAddVmFinish = false
          return
        }
        this.vmLists = res.data
        this.handleAllNetworkLists()
        let _num = 0
        this.vmLists.forEach(item => {
          if (item.vmInstantiateInfo) {
            _num++
          }
        })
        this.isStartupVmFinish = _num > 0
        this.isAddVmFinish = true
        this.configNetworkFinish = true
        this.deployBreathStyle = true
      })
    },
    clearVmList () {
      sandbox.clearVmImage(this.applicationId).then(() => {
        this.isClearVmImage = true
        this.isStartupVmFinish = false
        this.clearState = 'clear'
        this.getVmList()
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.cleanEnvSuccess'), 'success')
      }).catch(() => {
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.releaseEnvFailed'), 'error')
      })
    },
    getApplicationInfo () {
      applicationApi.getAppInfo(this.applicationId).then(res => {
        this.applicationName = res.data.name
        this.appClass = res.data.appClass
        if (res.data.status !== 'CREATED') {
          this.isAddVmFinish = true
        }
        if (this.appClass === 'VM') {
          this.getVmList()
        }
      })
    },
    importScript (data) {
      this.showContent = data
    },
    closeContainerDetail () {
      this.showContent = 'showDetail'
      this.$refs.ContainerIndex.getDeployStatus()
    },
    checkContainerDetail (data) {
      this.showContent = data
    },
    finishUploadScript () {
      this.showContent = 'showDetail'
      this.$refs.ContainerIndex.getHelmChartsFileList()
    },
    deployContainerFinish (data) {
      this.isAddVmFinish = data
    },
    handleAllNetworkLists () {
      let _arrTemp = []
      this.vmLists.forEach(item => {
        item.portList.forEach(itemSub => {
          _arrTemp.push(itemSub.networkName)
        })
      })
      this.netWorkListShow = [...new Set(_arrTemp)]
    },
    getNetWorkList (data) {
      this.netWorkList = data
    }
  },
  created () {
    this.getApplicationInfo()
  },
  mounted () {
    this.getSandboxLists()
    this.ischangeSandbox()
  },
  beforeDestroy () {
    sessionStorage.removeItem('applicationRules')
  }
}
</script>

<style lang="less" >
.detail{
  width: 100%;
  height: 100%;
  overflow: auto;
  font-size: 16px;
  color: #fff;
  .hiddenDialog{
    .el-dialog{
      background: rgba(250, 250, 250, 0) !important;
      box-shadow: none !important;
    }
  }
  .showDialog{
    .el-dialog{
      background: rgba(75,55,154,0.9) !important;
      box-shadow: 0 1px 3px rgb(0,0,0,0.3) !important;
    }
   }
  .detail-top{
    float: left;
    width: 50%;
    position: relative;
    left: 5%;
    .sandboxName-background{
      height: 88px;
      width: 300px;
      border-radius:9px ;
      .detail-top-title{
        height: 63px;
        padding-left: 10px;
        letter-spacing: 4px;
        background: url('../../../assets/images/sandbox/detail_title.png') no-repeat left;
        border: none;
        font-size: 28px;
        color: #fff;
      }
    }
    .sandboxName-background:hover{
      background-color: rgba(10,9,54,0.25);
    }
    .sandbox-names{
      z-index: 10;
      position: relative;
      margin-top: 10px;
      .sandbox-name-select{
        position: absolute;
        background-color:#290E74 ;
        border-radius:4px ;
        .one-select{
          line-height: 35px;
          width: 260px;
          display: flex;
          position: relative;
          .select-options{
            line-height: 35px;
            font-size: 20px;
            width: 180px;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
          }
          .triangle{
            opacity: 0;
            margin: 12px 20px;
            width:0;
            height:0;
            border-bottom: 4.4px solid transparent;
            border-left: 4.4px solid #42F6AC;
            border-top:4.4px solid transparent;
          }
        }
        .one-select:hover{
          background-color: rgb(96, 86, 154);
          cursor: pointer;
          .triangle{
            opacity: 1;
          }
        }
      }
      .sandbox-name-select  .one-select:first-child{
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .sandbox-name-select  .one-select:last-child{
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
  .application-title{
    float: left;
    width: 50%;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
  }
  .detail-top-inner{
    margin: 0;
    left: 30px;
  }
  .detail-center{
    margin: 50px auto 0;
    width: 460px;
    .detail-center-bg{
      position: relative;
      width: 460px;
      height: 300px;
      border-radius: 15px;
      background-color:rgba(46,20,124,0.7) ;
      .detail-center-img{
        height: 60%;
      }
      .detail-center-title{
        display: none;
      }
    }
    .detail-center-bg:hover{
      .detail-center-title{
        display: block;
        z-index: 0;
        width: 100%;
        height: 50px;
        opacity: 1;
        margin-top: -10px;
        line-height: 50px;
        font-size: 20px;
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
    .detail-center-name{
      font-size: 26px;
      text-align: center;
      margin-top: 14px;
    }
    .detail-center-line{
      display: block;
      margin: 25px auto;
      width: 4px;
      height: 37px;
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
      height: 4px;
      margin: 70px 10px 0px 10px;
    }
  }
  .deploy-detail-center{
    width: 88%;
    min-width: 1480px;
    .deploy-detail-bg{
      display:inline-block;
      text-align:left;
      min-width: 694px;
      width: 100%;
      padding: 40px 40px;
      .add-vm-small{
        width: 100px;
        height: 100px;
        border-radius: 20px;
        background: rgba(10, 9, 54, 1);
        opacity: 0.25;
        margin-right: 72px;
        cursor: pointer;
        img{
          width: 20px;
          height: 20px;
          padding: 10px;
          border: 4px solid #fff;
          border-radius: 50%;
          margin: 26px 0 0 26px;
        }
      }
      .add-vm-small:hover{
        opacity: 0.6;
      }
      .add-vm-big{
        padding: 58px;
        border: 8px solid #fff;
        border-radius: 50%;
      }
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
        float: left;
        width: 100%;
        padding: 0 0 0 40px;
        .sandbox-upf{
          width: 300px;
          height: 300px;
          border-radius: 20px;
          background-color: rgba(10, 9, 54, 0.25);
        }
        .sandbox-upf:hover{
          cursor: pointer;
        }
        .details-center-deploy{
          display: flex;
          flex-direction: column;
          margin-top: 40px;
          .details-center-deploy-img{
            .deploy-img{
              width: 300px;
              height: 300px;
              border-radius: 20px;
              background-color: rgba(10, 9, 54, 0.25);
              .deploy-img-center{
                width: 190px;
                height: 190px;
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
                width: 300px;
                height: 300px;
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
        .vm-div{
          width: 300px;
          float: left;
          margin-left: 40px;
        }
        .vm-list-div{
          width: 720px;
          padding-right: 72px;
          float: left;
        }
        .vm-list-div:hover{
          cursor: move;
        }
        .ul-scoll{
          width: 300px;
          margin: 72px 24px 0 24px;
          overflow: hidden;
          li{
            text-align: center;
            overflow: hidden;
            height: 52px;
            font-size: 18px;
            .title{
              display: block;
            }
            .span-cicle{
              width: 16px;
              height: 16px;
              background: #fff;
              border-radius: 50%;
              position: relative;
              top: -3px;
            }
            .span-line{
              width: calc(100% - 32px);
              height: 1px;
              background: #4F3AA4;
              margin-top: 4px;
            }
          }
        }
        .netLine-list{
          margin: 67px 0 0 16px;
        }
        .deploy-title{
          width: 104%;
          margin-left: -2%;
          margin-top: 10px;
          text-align: center;
          line-height: 50px;
          font-size: 24px;
        }
      }
      .details-bottom{
        float: left;
        width: 100%;
        margin-top: 35px;
        .details-bottom-title{
          font-size: 80px;
          color: rgba(238, 238, 238, 0.2);
          font-family: defaultFontBold, Arial, Helvetica, sans-serif;
        }
        .vm-btn{
          margin-top: 50px;
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
  .swiper-container.vm-swiper{
    padding: 40px 0;
    .swiper-slide{
      width: 720px !important;
    }
    .swiper-pagination-bullets{
      width: auto;
      bottom: 0px;
      right: 0px;
      text-align: right;
      .swiper-pagination-bullet{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #C4C4C4;
        font-size: 20px;
        color: #000;
      }
    }
    .swiper-pagination-none{
      opacity: 0;
    }
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
</style>
