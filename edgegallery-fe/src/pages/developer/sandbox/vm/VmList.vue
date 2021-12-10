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
    <div :class="'vm-list-'+vmIndexProp">
      <ul
        class="ul-scoll defaultFontLight"
        :class="'ul-scoll-'+vmIndexProp"
      >
        <li
          v-for="(item, index) in networkLists"
          :key="index"
        >
          <div v-if="item!==''">
            <p class="clear">
              <span class="span-line lt" />
              <span class="span-cicle lt" />
            </p>
          </div>
        </li>
      </ul>
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
            class="vm-btn flex-center vm-btn-add hoverHands"
            @click="deleteVm"
            @mouseleave="deleteGreen=false"
            @mouseenter="deleteGreen=true"
          >
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('common.delete')"
              placement="bottom-start"
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
            </el-tooltip>
          </div>
          <div
            class="vm-btn flex-center vm-btn-detail hoverHands"
            @click="checkVmDetail"
            :class="!isAddVmFinish ? 'img-onlyRead':'img-click'"
            @mouseleave="detailGreen=false"
            @mouseenter="isAddVmFinish?detailGreen=true:detailGreen=false"
          >
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('common.detail')"
              placement="bottom-start"
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
            </el-tooltip>
          </div>
          <div
            class="vm-btn flex-center hoverHands"
            :class="!isStartUpVmSuccess ? 'img-onlyRead':'img-click'"
            @mouseleave="loginGreen=false"
            @mouseenter="isStartUpVmSuccess?loginGreen=true:loginGreen=false,isShowRemote=true"
          >
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('common.login')"
              placement="bottom-start"
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
            </el-tooltip>
          </div>
          <div
            v-if="isShowRemote"
            class="down_div"
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
            class="vm-btn flex-center hoverHands"
            :class="!isStartUpVmSuccess ? 'img-onlyRead':'img-click'"
            @click="uploadVmFile"
            @mouseleave="uploadGreen=false"
            @mouseenter="isStartUpVmSuccess?uploadGreen=true:uploadGreen=false"
          >
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('common.upload')"
              placement="bottom-start"
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
            </el-tooltip>
          </div>
          <div
            class="vm-btn vm-btn-start flex-center hoverHands"
            @click="startUpVm(vmListsDetail.id)"
            :class="!isBtnStart ? 'img-onlyRead':'img-click'"
            @mouseleave="startGreen=false"
            @mouseenter="isBtnStart?startGreen=true:startGreen=false"
          >
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('common.start')"
              placement="bottom-start"
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
            </el-tooltip>
          </div>
          <div
            class="vm-btn vm-btn-export flex-center hoverHands"
            :class="!isStartUpVmSuccess ? 'img-onlyRead':'img-click'"
            @click="exportImage(vmListsDetail.id)"
            @mouseleave="imageGreen=false"
            @mouseenter="isStartUpVmSuccess?imageGreen=true:imageGreen=false"
          >
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('sandbox.createImage')"
              placement="bottom-start"
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
            </el-tooltip>
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
      </div>
      <p class="deploy-title defaultFontLight">
        {{ vmListsDetail.name }}
      </p>
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
      timer: null,
      timerExport: null,
      isStartUpVmSuccess: false,
      vmId: this.vmListsDetailProp.id,
      vmImageInformation: {
        imageName: '',
        status: '',
        downloadUrl: ''
      },
      isClearVmImage: this.isClearVmImageProp,
      deleteGreen: false,
      detailGreen: false,
      loginGreen: false,
      uploadGreen: false,
      startGreen: false,
      imageGreen: false,
      vmListsDetail: this.vmListsDetailProp,
      networkLists: [],
      isShowRemote: false
    }
  },
  methods: {
    getVmlistsStatus () {
      if (this.vmListsDetail.imageId !== 0) {
        this.isBtnStart = true
        this.isAddVmFinish = true
      }
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
          this.isBtnStart = false
          this.$emit('startUpVm', this.isStartupVmFinish)
          clearTimeout(this.timer)
        }
        if (res.data.status === 'FAILED') {
          this.isStartUpVmSuccess = false
          this.isStartupVmFinish = true
          this.$emit('startUpVm', this.isStartupVmFinish)
          clearTimeout(this.timer)
        }
      }).catch(() => {
        clearTimeout(this.timer)
      })
    },
    getVmExportStatus (operationId) {
      sandbox.getVmStatus(operationId).then(res => {
        if (res.data.status === 'SUCCESS' || res.data.status === 'FAILED') {
          sandbox.getVmlist(this.applicationId).then(response => {
            this.vmImageInformation.imageName = response.data[0].imageExportInfo.name
            this.vmImageInformation.status = response.data[0].imageExportInfo.status
            this.vmImageInformation.downloadUrl = response.data[0].imageExportInfo.downloadUrl
            this.bus.$emit('getVmExportImageInfo', this.vmImageInformation)
          })
          clearTimeout(this.timerExport)
        }
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
      }).catch(() => {})
    },
    checkVmDetail () {
      this.bus.$emit('checkVmDetail', this.vmId)
      this.$emit('checkVmDetail', 'showVmDetail')
    },
    startUpVm (data) {
      this.isClearVmImage = false
      this.isStartupVm = true
      sandbox.getVmPullId(this.applicationId, data).then(res => {
        this.operationId = res.data.operationId
        this.timer = setInterval(() => {
          this.getVmStatus(this.operationId)
        }, 5000)
      })
    },
    exportImage (data) {
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
      })
    },
    uploadVmFile () {
      sessionStorage.setItem('vmId', this.vmId)
      this.$emit('uploadVmFile', 'showVmUploadFile')
    },
    handleNetworkLists () {
      let _arrTemp = []
      this.vmListsDetail.portList.forEach(item => {
        _arrTemp.push(item.networkName)
      })
      let _arr = ['', '', '', '']
      for (let i = 0; i < this.netWorkListShowProp.length; i++) {
        for (let j = 0; j < _arrTemp.length; j++) {
          if (this.netWorkListShowProp[i] === _arrTemp[j]) {
            _arr[i] = _arrTemp[j]
          }
        }
      }
      this.networkLists = _arr
    },
    getVmListLeft () {
      this.$nextTick(() => {
        let _oDivNet = document.getElementsByClassName('netScroll')[0]
        let _oDivVm = document.getElementsByClassName('vm-list-' + this.vmIndexProp)[0]
        let _oDivNetwork = document.getElementsByClassName('ul-scoll-' + this.vmIndexProp)[0]
        if (_oDivNet && _oDivVm && _oDivNetwork) {
          let _num = _oDivVm.getBoundingClientRect().left - _oDivNet.getBoundingClientRect().left - 154
          _oDivNetwork.style.width = (_num + 150 * this.vmIndexProp) + 'px'
          _oDivNetwork.style.left = -(_num + 150 * this.vmIndexProp + 10) + 'px'
          _oDivNetwork.style.zIndex = -this.vmIndexProp
        }
      })
    }
  },
  watch: {
    isClearVmImageProp: function (val) {
      this.isClearVmImage = val
      if (val) {
        this.isBtnStart = true
        this.isStartUpVmSuccess = false
      }
    }
  },
  created () {
  },
  mounted () {
    this.getVmListLeft()
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
  .ul-scoll{
    position: absolute;
    top: 30px;
    li{
      text-align: right;
      overflow: hidden;
      height: 24px;
      padding-top: 16px;
      font-size: 10px;
      .span-cicle{
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
      }
      .span-line{
        width: calc(100% - 8px);
        height: 1px;
        background: #4F3AA4;
        margin-top: 4px;
      }
    }
  }
  .vm-center-img{
    position:absolute;
    width: 77px;
    height: 81px;
    opacity: 1;
  }
  .vm-center-img-finish{
    opacity: 1;
  }
  .vm-bg{
    width: 150px;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .vm-btn{
      display: none;
      width: 75px;
      height: 50px;
      background-size: 100% 100%;
      .img-click{
        opacity: 1;
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
    top: 124px;
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
        width: 6px;
        height: 6px;
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
.details-center-vm:hover{
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
}
.details-center-vm-img{
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
.details-center-vm-img:hover{
  .vm-status{
    display: none;
  }
}
.details-center-vm:hover{
  .vm-center-img{
    opacity: 0.1;
  }
}
.down_div{
    width: 85px;
    position: fixed;
    z-index: 9999;
    left: 85px;
    top: 15px;
    border-radius: 4px;
    font-size: 14px;
    font-family: defaultFontLight;
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
