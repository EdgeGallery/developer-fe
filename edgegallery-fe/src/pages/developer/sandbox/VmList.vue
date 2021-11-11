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
          @click="startUpVm"
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
        v-if="isStartupVm"
        :class="{'vmStatus':vmloading}"
      >
        <div
          class="vmStatus-loading"
          v-for="(item,index) in 4"
          :key="index"
        />
      </div>
      <div
        v-else
        :class="{'vmStatus':vmloading}"
      >
        <div
          v-for="(item,index) in 4"
          :key="index"
        />
      </div>
    </div>
    <p class="deploy-title defaultFontLight">
      虚拟机
    </p>
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
      vmloading: false,
      isExportImage: false,
      vmBreathStyle: this.vmBreathStyleProp,
      isStartupVmFinish: false,
      isBtnStart: this.isBtnStartProp,
      vmId: ''
    }
  },
  methods: {
    addVm () {
      this.$emit('addVm', 'showAddVm')
    },
    checkVmDetail () {
      this.bus.$emit('checkVmDetail', this.vmId)
      this.$emit('checkVmDetail', 'showVmDetail')
    },
    startUpVm () {
      this.isStartupVm = true
      this.vmloading = true
      let _timer = setTimeout(() => {
        this.isStartupVmFinish = true
        this.isStartupVm = false
        this.isExportImage = true
        this.$emit('startUpVm', this.isStartupVmFinish)
        clearTimeout(_timer)
      }, 3000)
    },
    getVmList () {
      sandbox.getVmList(this.applicationId).then(res => {
        this.vmId = res.data[0].id
      })
    }
  },
  created () {
  },
  mounted () {
    // this.getVmList()
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
  }
  .vmStatus .vmStatus-loading:first-child{
    animation-delay: -0.48s;
  }
  .vmStatus .vmStatus-loading:nth-child(2){
    animation-delay: -0.32s;
  }
  .vmStatus .vmStatus-loading:nth-child(3){
    animation-delay: -0.16s;
  }
  .vmStatus > div {
    width: 6px;
    height: 6px;
    margin-right: 4px;
    background-color: #42F6AC;
    border-radius: 100%;
    display: inline-block;
  }
  .vmStatus .vmStatus-loading{
    animation: bouncedelay 1.4s infinite ease-in-out;
    animation-fill-mode: both;
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
