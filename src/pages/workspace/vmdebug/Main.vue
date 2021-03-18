<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div
    id="div_deploydebug_vm"
    class="deploydebug_vm"
  >
    <el-steps
      :active="active"
      finish-status="success"
      align-center
    >
      <el-step :title="$t('workspace.deploymentTest')" />
      <el-step :title="$t('workspace.deployDebugVm.createImage')" />
    </el-steps>
    <div>
      <component
        :is="currentComponent"
        :active="active"
        :all-step-data="allStepData"
        :project-id="projectId"
        @getStepData="getStepData"
        @getBtnStatus="getBtnStatus"
        @createImageStatus="createImageStatus"
        ref="currComponent"
      />
    </div>
    <div class="elButton">
      <el-button
        id="prevBtn"
        type="text"
        @click="previous"
        v-if="active>0"
        :disabled="isDeploying"
      >
        <strong>{{ $t('workspace.previous') }}</strong>
      </el-button>
      <el-button
        id="nextBtn"
        type="primary"
        @click="next"
        v-if="active<1"
      >
        <strong>{{ $t('workspace.next') }}</strong>
      </el-button>
    </div>
  </div>
</template>

<script>
import DeployDebugVMStep from './DeployDebugStep.vue'
import CreateVMImageStep from './CreateImageStep.vue'

export default {
  name: 'DeployDebugVMMain',
  components: {
    DeployDebugVMStep, CreateVMImageStep
  },
  props: {
    projectId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      active: 0,
      currentComponent: 'DeployDebugVMStep',
      allStepData: {},
      isDeploying: false
    }
  },
  methods: {
    changeComponent () {
      switch (this.active) {
        case 0: {
          this.currentComponent = 'DeployDebugVMStep'
          break
        }
        case 1: {
          this.currentComponent = 'CreateVMImageStep'
          break
        }
        default: {
          this.currentComponent = 'DeployDebugVMStep'
        }
      }
    },
    getStepData (data) {
      this.allStepData[data.step] = data.data
      this.allStepData.ifNext = data.ifNext
    },
    getBtnStatus (status) {
      this.isDeploying = status.status
    },
    next () {
      // 获取组件内部的值
      this.$refs.currComponent.emitStepData()
      if (this.allStepData.ifNext) {
        if (this.active < 1) {
          this.active++
          this.handleStep()
        }
      }
    },
    previous () {
      this.active--
      this.handleStep()
    },
    handleStep () {
      // 改变动态组件的值
      this.changeComponent()
      this.allStepData.ifNext = false
    },
    createImageStatus (data) {
      this.$emit('getImageStatus', data)
    }
  },
  mounted () {
    this.active = 0
    this.changeComponent()
  }
}
</script>

<style lang='less'>
.deploydebug_vm {
  padding: 0px 100px 0px 100px;
}
</style>
