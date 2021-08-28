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
  <div class="deploy-debug-k8s__wrapper">
    <el-steps
      class="work-steps"
      :active="currentStep"
      finish-status="success"
      space="90px"
    >
      <el-step
        v-for="(item, index) in steps"
        :key="index"
      />
    </el-steps>
    <div class="work-div">
      <component
        :is="currentComponent"
        :current-step="currentStep"
        @getStepData="getStepData"
        @getBtnStatus="getBtnStatus"
        :project-before-config="projectBeforeConfig"
        :all-step-data="allStepData"
        @getAppapiFileId="getAppapiFileId"
        ref="currentComponet"
        @checkCleanEnv="checkCleanEnv"
      />
    </div>
    <div class="button-wrapper">
      <el-button
        class="work-button"
        type="primary"
        @click="handleClickPrevStep"
        v-if="currentStep > 0"
        :disabled="isDeploying"
      >
        {{ $t('workspace.previous') }}
      </el-button>
      <el-button
        class="work-button"
        type="primary"
        v-loading="apiDataLoading"
        @click="handleClickNextStep"
        v-if="currentStep < 1"
      >
        {{ $t('workspace.next') }}
      </el-button>
      <el-button
        class="work-button"
        type="primary"
        v-loading="apiDataLoading"
        @click="handleClickNextPanel"
        v-if="currentStep == 1"
      >
        {{ $t('workspace.next') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { Workspace } from '../../../tools/api.js'
import configYaml from '../ConfigYaml.vue'
import deployment from '../Deployment.vue'

export default {
  name: 'MainK8s',
  components: {
    configYaml,
    deployment
  },
  props: {
    projectBeforeConfig: {
      type: Object,
      required: true
    },
    apiDataLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      steps: 2,
      allStepData: {
        ifNext: false,
        third: {
          enable: false,
          hostId: '',
          ip: '',
          port: ''
        }
      },
      currentComponent: 'configYaml',
      deployed: false,
      isCompleted: false,
      isDeploying: false,
      isFail: false,
      projectId: '',
      userId: '',
      currentStep: 0
    }
  },
  methods: {
    getStepData (data) {
      this.allStepData[data.step] = data.data
      this.allStepData.ifNext = data.ifNext
    },
    getBtnStatus (status) {
      this.isDeploying = status.status
      this.deployed = status.deploy
      this.isCompleted = status.isCompleted
      this.isFail = status.isFail
    },
    getAppapiFileId (data) {
      this.appApiFileIdTemp = data
    },
    getProjectInfo () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        let data = res.data
        if (data.status !== 'ONLINE') {
          this.currentStep = 1
        } else {
          this.currentStep = 0
        }
      })
    },
    changeComponent () {
      switch (this.currentStep) {
        case 0:
          this.currentComponent = 'configYaml'
          break
        case 1:
          this.currentComponent = 'deployment'
          break
        default:
          this.currentComponent = 'configYaml'
      }
    },
    handleClickNextStep () {
      this.$refs.currentComponet.emitStepData()
      if (this.allStepData.ifNext) {
        if (this.currentStep < 1) {
          this.currentStep++
          this.handleStep()
        }
      }
    },
    handleClickPrevStep () {
      this.currentStep--
      this.handleStep()
    },
    handleClickNextPanel () {
      this.$emit('handleClickNextBtn', 'DEPLOY_DEBUG_K8S')
    },
    // Change dynamic component value
    handleStep () {
      this.changeComponent()
      this.allStepData.ifNext = false
    },
    checkCleanEnv (data) {
      this.$emit('checkCleanEnv', data)
    }
  },
  created () {
    this.projectId = sessionStorage.getItem('mecDetailID')
    this.userId = sessionStorage.getItem('userId')
    this.getProjectInfo()
    this.changeComponent()
  }
}
</script>

<style lang="less">
.deploy-debug-k8s__wrapper {
  margin-bottom: 0px;
}

.deploy-debug-k8s__wrapper .work-div {
  margin-top: 45px;
  padding: 46px 39px;
}

.deploy-debug-k8s__wrapper .button-wrapper {
  float: right;
  position: relative;
  margin-bottom: 50px;
  bottom: -50px;
  right: 0;
}
</style>
