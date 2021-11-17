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
    <div>
      <div
        class="flex-center details-center-vm-img"
        :class="{'details-center-vm-img-finish':isStartUpVmSuccess}"
      >
        <img
          class="vm-center-img"
          :class="{'vm-center-img-finish':isAddVmFinish,'breath':(!vmBreathStyle && !isAddVmFinish)}"
          src="../../../assets/images/sandbox/vm_img.png"
          alt=""
        >
        <div
          class="vm-bg"
          @mouseleave="isAddVmFinish?vmBreathStyle=true:vmBreathStyle=false"
        >
          <div
            class="vm-btn flex-center vm-btn-add hoverHands"
            @click="addVm"
          >
            <el-tooltip
              class="item edit-tooltip"
              effect="light"
              content="添加"
              placement="bottom-start"
            >
              <img
                src="../../../assets/images/sandbox/vm_add.png"
                alt=""
                class="img-click"
              >
            </el-tooltip>
          </div>
          <div
            class="vm-btn flex-center vm-btn-detail hoverHands"
            @click="checkVmDetail"
            :class="!isAddVmFinish ? 'img-onlyRead':'img-click'"
          >
            <el-tooltip
              class="item edit-tooltip"
              effect="light"
              content="详情"
              placement="bottom-start"
            >
              <img
                src="../../../assets/images/sandbox/vm_detail.png"
                alt=""
              >
            </el-tooltip>
          </div>
          <div
            class="vm-btn flex-center hoverHands"
            :class="!isStartupVmFinish ? 'img-onlyRead':'img-click'"
            @click="vmVncLogin"
          >
            <el-tooltip
              class="item edit-tooltip"
              effect="light"
              content="登录"
              placement="bottom-start"
            >
              <img
                src="../../../assets/images/sandbox/vm_login.png"
                alt=""
              >
            </el-tooltip>
          </div>
          <div
            class="vm-btn flex-center hoverHands"
            :class="!isStartupVmFinish ? 'img-onlyRead':'img-click'"
            @click="uploadVmFile"
          >
            <el-tooltip
              class="item edit-tooltip"
              effect="light"
              content="上传"
              placement="bottom-start"
            >
              <img
                src="../../../assets/images/sandbox/vm_upload.png"
                alt=""
              >
            </el-tooltip>
          </div>
          <div
            class="vm-btn vm-btn-start flex-center hoverHands"
            @click="startUpVm(vmLists.id)"
            :class="!isBtnStart ? 'img-onlyRead':'img-click'"
          >
            <el-tooltip
              class="item edit-tooltip"
              effect="light"
              content="启动"
              placement="bottom-start"
            >
              <img
                src="../../../assets/images/sandbox/vm_start.png"
                alt=""
              >
            </el-tooltip>
          </div>
          <div
            class="vm-btn vm-btn-export flex-center hoverHands"
            :class="!isStartupVmFinish ? 'img-onlyRead':'img-click'"
            @click="exportImage(vmLists.id)"
          >
            <el-tooltip
              class="item edit-tooltip"
              effect="light"
              content="生成镜像"
              placement="bottom-start"
            >
              <img
                src="../../../assets/images/sandbox/vm_export.png"
                alt=""
              >
            </el-tooltip>
          </div>
        </div>
        <div class="vm-status">
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
        虚拟机
      </p>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../api/developerApi.js'
export default {
  name: '',
  props: {
    isAddVmFinishProp: {
      type: Boolean,
      default: false
    },
    vmBreathStyleProp: {
      type: Boolean,
      default: false
    },
    isBtnStartProp: {
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
      vmLists: [],
      operationId: '',
      percentages: 0,
      timer: null,
      timerExport: null,
      isStartUpVmSuccess: false,
      vmId: '',
      vmImageInformation: {
        imageName: '',
        status: '',
        downloadUrl: ''
      }
    }
  },
  methods: {
    getVmlists () {
      sandbox.getVmlist(this.applicationId).then(res => {
        if (res.data.length === 0) {
          return
        }
        this.vmLists = res.data[0]
        this.vmId = res.data[0].id
        if (this.vmLists.imageId !== 0) {
          this.isBtnStart = true
          this.isAddVmFinish = true
        }
        if (this.vmLists.vmInstantiateInfo && this.vmLists.vmInstantiateInfo.operationId) {
          this.getVmStatus(this.vmLists.vmInstantiateInfo.operationId)
          this.timer = setInterval(() => {
            this.getVmStatus(this.vmLists.vmInstantiateInfo.operationId)
          }, 5000)
          this.isStartupVm = true
        }
        if (this.vmLists.imageExportInfo && this.vmLists.imageExportInfo.operationId) {
          this.getVmExportStatus(this.vmLists.imageExportInfo.operationId)
          this.timerExport = setInterval(() => {
            this.getVmExportStatus(this.vmLists.imageExportInfo.operationId)
          }, 5000)
        }
      })
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
            this.vmImageInformation.imageName = response.data.name
            this.vmImageInformation.status = response.data.status
            this.vmImageInformation.downloadUrl = response.data.downloadUrl
            this.bus.$emit('getVmExportImageInfo', this.vmImageInformation)
          })
          clearTimeout(this.timerExport)
        }
      }).catch(() => {
        clearTimeout(this.timerExport)
      })
    },
    addVm () {
      this.$emit('addVm', 'showAddVm')
    },
    checkVmDetail () {
      this.bus.$emit('checkVmDetail', this.vmId)
      this.$emit('checkVmDetail', 'showVmDetail')
    },
    startUpVm (data) {
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
    uploadVmFile () {
      this.bus.$emit('uploadVmFile', this.vmId)
      this.$emit('uploadVmFile', 'showVmUploadFile')
    }
  },
  created () {
  },
  mounted () {
    this.getVmlists()
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
  .vm-center-img{
    position:absolute;
    width: 77px;
    height: 81px;
    opacity: 0.1;
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
      background-color: rgba(10, 9, 54, 0.65);
      opacity: 0.5;
      .img-click{
        opacity: 1;
      }
    }
    .vm-btn-add{
      border-radius: 20px 0 0 0;
      opacity: 0.8;
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
    .vm-btn{
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.6;
    }
    .img-onlyRead{
      pointer-events: none;
    }
    .vm-btn:hover{
      opacity: 1;
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
  background: rgba(10, 9, 54, .25);
  border-radius: 20px;
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

</style>
