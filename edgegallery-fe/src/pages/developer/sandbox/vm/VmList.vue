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
  <div class="details-center-vm">
    <div
      class="clear"
      :class="'vm-list-'+vmIndexProp"
    >
      <ul
        class="ul-scoll lt"
        :class="'ul-scoll-'+vmIndexProp"
      >
        <li
          class="oneNet"
          v-for="(item,index) in networkLists"
          :key="index"
        >
          <p class="title">
            {{ item }}
          </p>
          <p class="clear">
            <span class="span-cicle lt" />
            <span class="span-line lt" />
            <span class="span-cicle rt" />
          </p>
        </li>
      </ul>
      <div class="vm-list-container lt">
        <p
          v-if="startFailed"
          class="failed hoverHands"
          @click="checkVmDetail"
        >
          {{ $t('sandboxPromptInfomation.startFailed') }}
        </p>
        <p
          v-if="exportFailed"
          class="failed hoverHands"
          @click="checkVmDetail"
        >
          {{ $t('sandboxPromptInfomation.exportFailed') }}
        </p>
        <div
          class="flex-center details-center-vm-img"
          :class="{'details-center-vm-img-finish':isStartUpVmSuccess}"
          @mouseleave="isShowRemote=false"
        >
          <img
            v-if="!isStartUpVmSuccess"
            class="vm-center-img"
            :class="{'vm-center-img-finish':isAddVmFinish,'breath':(!vmBreathStyle && !isAddVmFinish)}"
            src="../../../../assets/images/sandbox/vm_img.png"
            alt=""
          >
          <img
            v-else
            class="vm-center-img"
            src="../../../../assets/images/sandbox/vm_finish_icon.png"
            alt=""
          >
          <div
            class="vm-bg"
            @mouseleave="isAddVmFinish?vmBreathStyle=true:vmBreathStyle=false"
          >
            <div
              class="vm-btn flex-column vm-btn-add hoverHands"
              @click="deleteVm"
              @mouseleave="deleteGreen=false"
              @mouseenter="deleteGreen=true"
            >
              <img
                v-if="!deleteGreen"
                src="../../../../assets/images/sandbox/vm_delete.png"
                alt=""
                class="img-click"
              >
              <img
                v-else
                src="../../../../assets/images/sandbox/vm_delete_green.png"
                alt=""
                class="img-click"
              >
              {{ $t('common.delete') }}
            </div>
            <div
              class="vm-btn flex-column vm-btn-detail hoverHands"
              @click="checkVmDetail"
              @mouseleave="detailGreen=false"
              @mouseenter="detailGreen=true"
            >
              <img
                v-if="!detailGreen"
                src="../../../../assets/images/sandbox/vm_detail.png"
                alt=""
              >
              <img
                v-else
                src="../../../../assets/images/sandbox/vm_detail_green.png"
                alt=""
              >
              {{ $t('common.detail') }}
            </div>
            <div
              class="vm-btn flex-column hoverHands"
              :class="!isStartUpVmSuccess ? 'img-onlyRead':'img-click'"
              @mouseleave="loginGreen=false,isShowRemote=false"
              @mouseenter="isStartUpVmSuccess?loginGreen=true:loginGreen=false,isShowRemote=true"
            >
              <img
                v-if="!loginGreen"
                src="../../../../assets/images/sandbox/vm_login.png"
                alt=""
              >
              <img
                v-else
                src="../../../../assets/images/sandbox/vm_login_green.png"
                alt=""
              >
              {{ $t('common.login') }}
            </div>
            <div
              v-if="isShowRemote"
              class="down_div"
              @mouseleave="isShowRemote=false"
              @mouseenter="isShowRemote=true"
            >
              <div
                class="transition-box"
                @click="vmVncLogin"
              >
                <em />VNC
              </div>
              <div
                class="transition-box"
                @click="vmSshLogin"
              >
                <em />SSH
              </div>
            </div>
            <div
              class="vm-btn flex-column hoverHands"
              :class="!isStartUpVmSuccess ? 'img-onlyRead':'img-click'"
              @click="uploadVmFile"
              @mouseleave="uploadGreen=false"
              @mouseenter="isStartUpVmSuccess?uploadGreen=true:uploadGreen=false"
            >
              <img
                v-if="!uploadGreen"
                src="../../../../assets/images/sandbox/vm_upload.png"
                alt=""
              >
              <img
                v-else
                src="../../../../assets/images/sandbox/vm_upload_green.png"
                alt=""
              >
              {{ $t('common.upload') }}
            </div>
            <div
              class="vm-btn vm-btn-start flex-column hoverHands"
              @click="startUpVm(vmListsDetail.id)"
              :class="!isBtnStart ? 'img-onlyRead':'img-click'"
              @mouseleave="startGreen=false"
              @mouseenter="isBtnStart?startGreen=true:startGreen=false"
            >
              <img
                v-if="!startGreen"
                src="../../../../assets/images/sandbox/vm_start.png"
                alt=""
              >
              <img
                v-else
                src="../../../../assets/images/sandbox/vm_start_green.png"
                alt=""
              >
              {{ $t('common.start') }}
            </div>
            <div
              class="vm-btn vm-btn-export flex-column hoverHands"
              :class="!isStartUpVmSuccess ? 'img-onlyRead':'img-click'"
              @click="exportImage(vmListsDetail.id)"
              @mouseleave="imageGreen=false"
              @mouseenter="isStartUpVmSuccess?imageGreen=true:imageGreen=false"
            >
              <img
                v-if="!imageGreen"
                src="../../../../assets/images/sandbox/vm_export.png"
                alt=""
              >
              <img
                v-else
                src="../../../../assets/images/sandbox/vm_export_green.png"
                alt=""
              >
              {{ $t('sandbox.createImage') }}
            </div>
          </div>
          <div
            class="vm-status"
            v-if="!isClearVmImage"
          >
            <el-progress
              v-if="isStartupVm && !isStartupVmFinish"
              :percentage="percentages"
            />
            <p
              v-if="isStartupVm && isStartupVmFinish"
              class="start-up-result"
              :class="{'start-up-result-error':!isStartUpVmSuccess}"
            >
              <span
                v-for="(item,index) in 4"
                :key="index"
              />
            </p>
          </div>
          <div
            class="vm-status"
            v-if="!isExportImageFinish"
          >
            <el-progress
              :percentage="imagePercentages"
            />
          </div>
        </div>
        <p class="deploy-title defaultFontLight">
          {{ vmListsDetail.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../../api/developerApi.js'
export default {
  name: '',
  props: {
    vmListsDetailProp: {
      type: Object,
      default: () => ({})
    },
    vmIndexProp: {
      type: Number,
      default: 0
    },
    netWorkListShowProp: {
      type: Array,
      default: () => ([])
    },
    isAddVmFinishProp: {
      type: Boolean,
      default: false
    },
    vmBreathStyleProp: {
      type: Boolean,
      default: false
    },
    isClearVmImageProp: {
      type: Boolean,
      default: false
    },
    clearState: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      applicationId: sessionStorage.getItem('applicationId') || '',
      isAddVmFinish: this.isAddVmFinishProp,
      isStartupVm: false,
      vmBreathStyle: this.vmBreathStyleProp,
      isStartupVmFinish: false,
      isBtnStart: false,
      operationId: '',
      percentages: 0,
      imagePercentages: 0,
      timer: null,
      timerExport: null,
      isStartUpVmSuccess: false,
      vmId: this.vmListsDetailProp.id,
      vmImageInformation: {
        imageName: '',
        status: '',
        downloadUrl: ''
      },
      exportFailed: false,
      startFailed: false,
      isClearVmImage: this.isClearVmImageProp,
      deleteGreen: false,
      detailGreen: false,
      loginGreen: false,
      uploadGreen: false,
      startGreen: false,
      imageGreen: false,
      vmListsDetail: this.vmListsDetailProp,
      networkLists: [],
      isShowRemote: false,
      isExportImageFinish: true,
      getVmExportErr: '',
      getVmStartErr: ''
    }
  },
  methods: {
    getVmlistsStatus () {
      if (this.vmListsDetail.imageId !== 0) {
        this.isAddVmFinish = true
      }
      this.isBtnStart = !this.vmListsDetail.vmInstantiateInfo
      if (this.vmListsDetail.vmInstantiateInfo && this.vmListsDetail.vmInstantiateInfo.operationId) {
        this.getVmStatus(this.vmListsDetail.vmInstantiateInfo.operationId)
        this.timer = setInterval(() => {
          this.getVmStatus(this.vmListsDetail.vmInstantiateInfo.operationId)
        }, 5000)
        this.isStartupVm = true
      }
      if (this.vmListsDetail.imageExportInfo && this.vmListsDetail.imageExportInfo.operationId) {
        this.getVmExportStatus(this.vmListsDetail.imageExportInfo.operationId)
        this.timerExport = setInterval(() => {
          this.getVmExportStatus(this.vmListsDetail.imageExportInfo.operationId)
        }, 5000)
      }
    },
    getVmStatus (operationId) {
      sandbox.getVmStatus(operationId).then(res => {
        this.percentages = res.data.progress
        if (res.data.status === 'SUCCESS') {
          this.isStartUpVmSuccess = true
          this.isStartupVmFinish = true
          this.$emit('startUpVm', this.isStartupVmFinish)
          clearTimeout(this.timer)
        } else if (res.data.status === 'FAILED') {
          this.getVmStartErr = res.data.errorMsg
          this.isStartUpVmSuccess = false
          this.startFailed = true
          this.isStartupVmFinish = true
          this.$emit('startUpVm', this.isStartupVmFinish)
          clearTimeout(this.timer)
        } else {
          this.isStartupVmFinish = false
        }
        this.bus.$emit('getVmStartErr', this.getVmStartErr)
        this.isBtnStart = false
      }).catch(() => {
        this.isBtnStart = true
        clearTimeout(this.timer)
      })
    },
    getVmExportStatus (operationId) {
      sandbox.getVmStatus(operationId).then(res => {
        this.imagePercentages = res.data.progress
        this.isExportImageFinish = false
        this.exportFailed = res.data.status === 'FAILED'
        if (res.data.status === 'SUCCESS' || res.data.status === 'FAILED') {
          this.getVmExportErr = res.data.errorMsg
          sandbox.getVmlist(this.applicationId).then(response => {
            this.vmImageInformation.imageName = response.data[0].imageExportInfo.name
            this.vmImageInformation.status = response.data[0].imageExportInfo.status
            this.vmImageInformation.downloadUrl = response.data[0].imageExportInfo.downloadUrl
            setTimeout(() => {
              this.bus.$emit('getVmExportImageInfo', this.vmImageInformation)
            }, 0)
          })
          this.isExportImageFinish = true
          clearTimeout(this.timerExport)
        }
        this.bus.$emit('getVmExportErr', this.getVmExportErr)
      }).catch(() => {
        clearTimeout(this.timerExport)
      })
    },
    deleteVm () {
      this.$eg_messagebox(this.$t('promptInformation.confirmDelete'), 'warning', this.$t('common.cancel')).then(() => {
        sandbox.deleteVmImage(this.applicationId, this.vmId).then(() => {
          this.$emit('deleteVm')
        }).catch(() => {
          this.$eg_messagebox(this.$t('promptInformation.deleteFailed'), 'error')
        })
      }).catch(() => {
      })
    },
    checkVmDetail () {
      setTimeout(() => {
        this.bus.$emit('checkVmDetail', this.vmId, this.vmIndexProp)
        this.bus.$emit('getVmStartErr', this.getVmStartErr)
        this.bus.$emit('getVmExportErr', this.getVmExportErr)
      }, 0)
      this.$emit('checkVmDetail', 'showVmDetail')
      setTimeout(() => {
        this.bus.$emit('getVmExportImageInfo', this.vmImageInformation)
      }, 0)
    },
    startUpVm (data) {
      this.isClearVmImage = false
      this.isStartupVm = true
      this.isStartupVmFinish = false
      sandbox.getVmPullId(this.applicationId, data).then(res => {
        this.operationId = res.data.operationId
        this.timer = setInterval(() => {
          this.getVmStatus(this.operationId)
        }, 5000)
      })
    },
    exportImage (data) {
      this.isClearVmImage = true
      this.isExoprtImage = true
      sandbox.exportImage(this.applicationId, data).then(res => {
        this.timerExport = setInterval(() => {
          this.getVmExportStatus(res.data.operationId)
        }, 5000)
      })
    },
    vmVncLogin () {
      sandbox.vncLogin(this.applicationId, this.vmId).then(res => {
        window.open(res.data.vncUrl, '_blank')
      })
    },
    vmSshLogin () {
      sandbox.sshLogin(this.applicationId, this.vmId).then(res => {
        window.open(res.data.sshAddress + '?id=' + res.data.id + '&encoding=' + res.data.encoding, '_blank')
      }).then(error => {
        console.log(error)
        this.$eg_messagebox(this.$t('promptInformation.connectFailed'), 'error')
      })
    },
    uploadVmFile () {
      sessionStorage.setItem('vmId', this.vmId)
      this.$emit('uploadVmFile')
    },
    handleNetworkLists () {
      let _arrTemp = []
      this.vmListsDetail.portList.forEach(item => {
        _arrTemp.push(item.networkName)
      })
      this.networkLists = _arrTemp
    }
  },
  watch: {
    isClearVmImageProp: function (val) {
      this.isClearVmImage = val
      if (val) {
        this.isBtnStart = true
        this.isStartUpVmSuccess = false
      }
      this.getVmlistsStatus()
    },
    clearState: function (val) {
      if (val === 'clear') {
        this.startFailed = false
        this.exportFailed = false
      }
    }
  },
  mounted () {
    this.handleNetworkLists()
    this.getVmlistsStatus()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    clearTimeout(this.timerExport)
  }
}
</script>

<style lang="less">
.details-center-vm{
  position: relative;
  .failed{
    position: absolute;
    top:-34px;
    width: 300px;
    text-align: center;
    color: #e15050;
    font-size: 20px;
    text-decoration:underline
  }
  .vm-center-img{
    position:absolute;
    height: 186px;
    margin-top: 5px;
    opacity: 1;
  }
  .vm-center-img-finish{
    opacity: 1;
  }
  .vm-bg{
    width: 300px;
    height: 300px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .flex-column{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .vm-btn{
      display: none;
      width: 150px;
      height: 100px;
      background-size: 100% 100%;
      .img-click{
        opacity: 1;
      }
      img{
        margin-bottom: 7px;
      }
    }
    .vm-btn-add{
      border-radius: 20px 0 0 0;
    }
    .vm-btn-detail{
      border-radius: 0 20px 0 0;
    }
    .vm-btn-start{
      border-radius: 0 0 0 20px;
    }
    .vm-btn-export{
      border-radius: 0 0 20px 0;
    }
  }
  .vm-status{
    position: absolute;
    top: 256px;
    height: 30px;
    width: 100%;
    text-align: center;
    .el-progress{
      width: 80%;
      margin-left: 10%;
    }
    .el-progress__text {
      color: #fff;
      font-size: 12px;
    }
    .start-up-result{
      text-align: center;
      span{
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #4CD473;
        border-radius: 50%;
        margin: 0 5px;
      }
    }
    .start-up-result-error span{
      background: #E15050;
    }
  }
  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
    }
    40% {
      transform: scale(1.0);
    }
  }
}
.details-center-vm-img:hover{
  .vm-bg:hover{
    z-index: 1;
    opacity: 0.9;
    .vm-btn{
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(29, 13, 90, 0.7);
    }
    .img-onlyRead{
      pointer-events: none;
      color: #ababab;
      img{
        opacity: 0.4;
      }
    }
    .vm-btn:hover{
      background-color: rgba(27, 14, 75, 1);
    }
  }
  .vm-bg:hover::after{
    border-radius: 20px;
    z-index: -1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
  }
  .vm-status{
    display: none;
  }
  .vm-center-img{
    opacity: 0.1;
  }
}
.details-center-vm-img{
  width: 300px;
  height: 300px;
  position: relative;
  background: rgba(10, 9, 54, .25);
  border-radius: 20px;
  z-index: 1;
  backdrop-filter: blur(4px);
}
.details-center-vm-img-finish{
  background: rgba(212, 202, 255, .25);
  border-radius: 20px;
}
.down_div{
    width: 170px;
    position: fixed;
    z-index: 39999;
    left: 95px;
    top: 95px;
    border-radius: 4px;
    font-size: 14px;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    color: #ffffff;
    background: #290E74;
    .transition-box{
      height: 32px;
      line-height: 32px;
      position: relative;
      z-index: 2;
      padding-left: 20px;
      cursor: pointer;
      em{
        display: inline-block;
        width: 0;
        height: 0;
        position: absolute;
        top: 13px;
        left: 4px;
      }
    }
    .transition-box:hover{
      background: rgba(96, 86, 154, 0.5);
      border-radius: 4px;
      em{
        border-bottom: 5px solid #42F6AC;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        transform: rotate(90deg);
      }
    }
  }
</style>
