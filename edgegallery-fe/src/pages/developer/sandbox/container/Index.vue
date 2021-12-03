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
  <div class="container-index">
    <div class="details-center-deploy">
      <div class="details-center-deploy-img">
        <div
          class="lt deploy-img flex-center hoverHands"
          @click="importScript"
        >
          <img
            class="deploy-img-center script-icon"
            :class="{'deploy-img-center-finish':importScriptFinish,'breath':!importScriptFinish}"
            src="../../../../assets/images/sandbox/script_icon.png"
            @mouseleave="!importScriptFinish"
            alt=""
            v-if="!importScriptFinish"
          >
          <img
            class="deploy-img-center"
            :class="{'deploy-img-center-finish':importScriptFinish}"
            src="../../../../assets/images/sandbox/script_icon_finish.png"
            alt=""
            v-if="importScriptFinish"
          >
          <div class="deploy-edit flex-center">
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('container.import')"
              placement="bottom-start"
            >
              <img
                src="../../../../assets/images/sandbox/vm_upload_green.png"
                alt=""
              >
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="deploy-title">
        {{ $t('container.script') }}
      </div>
    </div>

    <div class="details-center-container">
      <div
        class="flex-center details-center-container-img"
        :class="{'details-center-container-img-finish':isDeployContainerSuccess}"
      >
        <img
          v-if="!isDeployContainerSuccess"
          class="container-center-img"
          :class="{'breath':containerBreathStyle && !isDeployContainer,'container-center-img-finish':isDeployContainer}"
          src="../../../../assets/images/sandbox/container_icon.png"
          alt=""
        >
        <img
          v-else
          class="container-center-img"
          :class="{'container-center-img-success':isDeployContainerSuccess}"
          src="../../../../assets/images/sandbox/container_icon_finish.png"
          alt=""
        >
        <div
          class="container-bg"
          @mouseleave="!isDeployContainer?containerBreathStyle=true:containerBreathStyle=false"
          @mouseenter="containerBreathStyle=false"
        >
          <div
            v-if="!isDeployContainer"
            class="container-btn flex-center hoverHands img-click"
            :class="scriptBreathStyle ? 'img-click':'img-onlyRead'"
            @click="deployContainer"
            @mouseleave="startGreen=false"
            @mouseenter="startGreen=true"
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
            class="container-btn flex-center hoverHands img-click"
            :class="isDeployContainerFinish ? 'img-click':'img-onlyRead'"
            @click="checkContainerDetail"
            @mouseleave="detailGreen=false"
            @mouseenter="detailGreen=true"
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
            v-if="isDeployContainer"
            class="container-btn flex-center hoverHands"
            :class="isDeployContainerFinish ? 'img-click':'img-onlyRead'"
            @click="cleanContainerEnv"
            @mouseleave="closeGreen=false"
            @mouseenter="isDeployContainerFinish?closeGreen=true:closeGreen=false"
          >
            <el-tooltip
              class="edit-tooltip"
              effect="light"
              :content="$t('sandbox.releaseResources')"
              placement="bottom-start"
            >
              <img
                v-if="!closeGreen"
                src="../../../../assets/images/sandbox/container_close.png"
                alt=""
              >
              <img
                v-else
                src="../../../../assets/images/sandbox/container_close_green.png"
                alt=""
              >
            </el-tooltip>
          </div>
        </div>
        <div
          class="container-status"
          v-if="!isClearContainer"
        >
          <el-progress
            v-if="isDeployContainer && !isDeployContainerFinish"
            :percentage="percentages"
          />
          <p
            v-if="isDeployContainer && isDeployContainerFinish"
            class="start-up-result"
            :class="{'start-up-result-error':!isDeployContainerSuccess}"
          >
            <span
              v-for="(item,index) in 4"
              :key="index"
            />
          </p>
        </div>
      </div>
      <p class="deploy-title defaultFontLight">
        {{ $t('container.container') }}
      </p>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../../api/developerApi.js'
export default {
  name: 'ContainerIndex',
  props: {
    isClearVmImageProp: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      importScriptFinish: false,
      applicationId: sessionStorage.getItem('applicationId') || '',
      isDeployContainer: false,
      containerBreathStyle: false,
      isDeployContainerFinish: false,
      operationId: '',
      percentages: 0,
      isDeployContainerSuccess: false,
      isClearContainer: this.isClearVmImageProp,
      startGreen: false,
      detailGreen: false,
      closeGreen: false,
      scriptBreathStyle: false,
      timer: null,
      containerApp: {}
    }
  },
  methods: {
    importScript () {
      this.$emit('importScript', 'showImportScript')
    },
    checkContainerDetail () {
      this.bus.$emit('getContainerDetail', this.containerApp)
      this.$emit('checkContainerDetail', 'showContainerDetail')
    },
    deployContainer () {
      sandbox.container.deployContainer(this.applicationId).then(res => {
        if (!res.data) {
          return
        }
        this.isDeployContainer = true
        this.operationId = res.data.operationId
        this.timer = setInterval(() => {
          this.getDeployContainerInfo(this.operationId)
        }, 5000)
      })
    },
    getDeployContainerInfo (operationId) {
      sandbox.container.getDeployContainerInfo(operationId).then(res => {
        if (!res.data) {
          return
        }
        this.isClearContainer = false
        this.percentages = res.data.progress
        if (res.data.status === 'SUCCESS') {
          this.isDeployContainerSuccess = true
          this.isDeployContainerFinish = true
          this.isDeployContainer = true
          this.$emit('deployContainerFinish', this.isDeployContainerFinish)
          clearTimeout(this.timer)
        } else if (res.data.status === 'FAILED') {
          this.isDeployContainerSuccess = false
          this.isDeployContainerFinish = true
          this.isDeployContainer = true
          this.$emit('deployContainerFinish', this.isDeployContainerFinish)
          clearTimeout(this.timer)
        } else {
          this.isDeployContainerFinish = false
        }
      }).catch(() => {
        clearTimeout(this.timer)
      })
    },
    cleanContainerEnv () {
      sandbox.container.cleanContainerEnv(this.applicationId).then(() => {
        this.isClearContainer = true
        this.isDeployContainer = false
        this.containerBreathStyle = true
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.cleanEnvSuccess'), 'success')
      }).catch(() => {
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.cleanEnvFailed'), 'error')
      })
    },
    getHelmChartsFileList () {
      sandbox.container.getHelmchartsFileList(this.applicationId).then(res => {
        if (res.data && res.data.length > 0) {
          this.importScriptFinish = true
          this.containerBreathStyle = true
          this.scriptBreathStyle = true
        }
      })
    },
    getApplicationDetail () {
      sandbox.container.getApplicationDetail(this.applicationId).then(res => {
        if (!res.data || !res.data.containerApp || !res.data.containerApp.instantiateInfo) {
          return
        }
        this.$emit('deployContainerFinish', true)
        this.containerApp = res.data.containerApp
        this.operationId = res.data.containerApp.instantiateInfo.operationId
        this.getDeployContainerInfo(this.operationId)
        this.timer = setInterval(() => {
          this.getDeployContainerInfo(this.operationId)
        }, 5000)
      })
    }
  },
  watch: {
    isClearVmImageProp: function (val) {
      this.isClearContainer = val
      if (val) {
        this.isDeployContainerSuccess = false
      }
    }
  },
  mounted () {
    this.getHelmChartsFileList()
    this.getApplicationDetail()
  }
}
</script>

<style lang="less">
.container-index{
  width: 100%;
  display: flex;
  justify-content: space-around;
  .details-center-container{
    position: relative;
    .container-center-img{
      position:absolute;
      width: 81px;
      height: 92px;
      opacity: .3;
    }
    .container-center-img-finish,.container-center-img-success{
      opacity: 1;
    }
    .container-bg{
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .container-btn{
        display: none;
        width: 100%;
        height: 75px;
        background-size: 100% 100%;
        .img-click{
          opacity: 1;
        }
      }
      .container-btn-add{
        border-radius: 20px 0 0 0;
      }
    }
    .container-status{
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
  .details-center-container:hover{
    .container-bg:hover{
      z-index: 1;
      opacity: 0.9;
      .container-btn{
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
      .container-btn:hover{
        background-color: rgba(27, 14, 75, 1);
      }
    }
    .container-bg:hover::after{
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
  .details-center-container-img{
    background: rgba(10, 9, 54, .25);
    border-radius: 20px;
    overflow: hidden;
  }
  .details-center-container-img-finish{
    background: rgba(212, 202, 255, .25);
    border-radius: 20px;
  }
  .details-center-container-img:hover{
    .container-status{
      display: none;
    }
  }
  .details-center-container:hover{
    .container-center-img{
      opacity: 0.1;
    }
  }
}
</style>
