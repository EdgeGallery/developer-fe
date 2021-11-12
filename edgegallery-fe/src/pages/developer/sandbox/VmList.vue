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
        :class="{'details-center-vm-img-finish':isExportImage}"
      >
        <img
          class="vm-center-img"
          :class="{'vm-center-img-finish':isAddVmFinish,'breath':!vmBreathStyle}"
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
            :class="!isBtnStart ? 'img-onlyRead':'img-click'"
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
              content="导出镜像"
              placement="bottom-start"
            >
              <img
                src="../../../assets/images/sandbox/vm_export.png"
                alt=""
              >
            </el-tooltip>
          </div>
        </div>
        <div
          class="vmStatus"
          v-if="isprogess"
        >
          <el-progress
            :percentage="percentages"
            :format="format"
          />
        </div>
      </div>
      <p class="deploy-title defaultFontLight">
        虚拟机
      </p>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../api/developerApi'
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
      isAddVmFinish: false,
      isExportImage: false,
      vmBreathStyle: this.vmBreathStyleProp,
      isStartupVmFinish: false,
      isBtnStart: false,
      applicationId: 'dee8696f-c1ac-49e1-b0f7-7de1d99bcdb1',
      vmLists: [],
      operationId: '',
      percentages: 0,
      isprogess: false
    }
  },
  methods: {
    getVmlists () {
      sandbox.getVmlist(this.applicationId).then(res => {
        this.vmLists = res.data[0]
        if (this.vmLists.imageId !== 0) {
          this.isBtnStart = true
        }
        if (this.vmLists.vmInstantiateInfo.operationId !== '') {
          let isvmFinish = setInterval(() => {
            sandbox.getVmStatus(this.operationId).then(res => {
              this.percentages = res.data.progress
              if (res.data.status === 'SUCCESS') {
                this.isStartupVmFinish = true
                this.isBtnStart = false
                this.isExportImage = true
                this.$emit('startUpVm', this.isStartupVmFinish)
                clearTimeout(isvmFinish)
              }
            }).catch(() => {
            })
          }, 5000)
          this.isprogess = true
        }
      }).catch(() => {
      })
    },
    deleteVm () {
      sandbox.deleteVmImage(this.applicationId, 'c92a375f-0f53-417e-af1a-169f04b7e6e8').then(() => {
      }).catch(() => {
      })
    },
    clearVmList () {
      sandbox.clearVmImage(this.applicationId).then(() => {
      }).catch(() => {
      })
    },
    addVm () {
      this.$emit('addVm', 'showAddVm')
    },
    checkVmDetail () {
      this.$emit('checkVmDetail', 'showVmDetail')
    },
    startUpVm (data) {
      this.isprogess = true
      sandbox.getVmPullId(this.applicationId, data).then(res => {
        this.operationId = res.data.operationId
        let vmFinish = setInterval(() => {
          sandbox.getVmStatus(this.operationId).then(res => {
            this.percentages = res.data.progress
            if (res.data.status === 'SUCCESS') {
              this.isStartupVmFinish = true
              this.isBtnStart = false
              this.isExportImage = true
              this.$emit('startUpVm', this.isStartupVmFinish)
              clearTimeout(vmFinish)
            }
          }).catch(() => {
          })
        }, 5000)
      }).catch(() => {
      })
    },
    exportImage (data) {
      sandbox.exportImage(this.applicationId, data).then(() => {
      })
    },
    format (percentage) {
      return percentage === 100 ? '完成' : `${percentage}%`
    }
  },
  created () {
  },
  mounted () {
    this.getVmlists()
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
  .vmStatus{
    position: absolute;
    top: 124px;
    height: 30px;
    width: 100px;
    margin-left: 30px;
    .el-progress__text {
      color: #fff;
      font-size: 12px;
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
  background-image: url('../../../assets/images/sandbox/deploy_internet.png');
}
.details-center-vm-img-finish{
  background-image: url('../../../assets/images/sandbox/deploy_internet_finish.png');
}
.details-center-vm-img:hover{
  .vmStatus{
    display: none;
  }
}
.details-center-vm:hover{
  .vm-center-img{
    opacity: 0.1;
  }
}

</style>
