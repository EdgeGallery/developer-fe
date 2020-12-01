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
  <div class="workdetail">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/work' }">
        {{ $t('breadCrumb.workspace') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.detail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs
      class="elTabs"
      v-model="activeName"
      tab-position="left"
    >
      <el-tab-pane
        :label="$t('workspace.capabilityDetails')"
        class="elTabPane"
        name="1"
        lazy
      >
        <api />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('workspace.applicationDev')"
        class="elTabPane"
        name="2"
        lazy
        v-loading="isPublic"
      >
        <el-steps
          :active="active"
          finish-status="success"
          align-center
        >
          <el-step :title="$t('workspace.environmentPreparation')" />
          <el-step :title="$t('workspace.choosePlatform')" />
          <el-step :title="$t('workspace.selectImage')" />
          <el-step :title="$t('workspace.configureYaml')" />
        </el-steps>
        <div class="elSteps">
          <component
            :is="currentComponent"
            :active="active"
            @getStepData="getStepData"
            @getBtnStatus="getBtnStatus"
            :project-before-config="projectBeforeConfig"
            :all-step-data="allStepData"
            @getAppapiFileId="getAppapiFileId"
            ref="currentComponet"
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
            v-loading="apiDataLoading"
            @click="next"
          >
            <strong>{{ btnName }}</strong>
          </el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('workspace.deploymentTest')"
        class="elTabPane"
        name="3"
        lazy
      >
        <deployment />
      </el-tab-pane>
      <el-tab-pane
        :label="$t('workspace.applicationRelease')"
        class="elTabPane"
        name="4"
        lazy
      >
        <appRelease />
      </el-tab-pane>
      <div v-if="dialogVisible">
        <publishAppDialog
          v-model="dialogVisible"
          :app-api-file-id-temp="appApiFileIdTemp"
        />
      </div>
    </el-tabs>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import imageSelect from './ImageSelect.vue'
import configYaml from './ConfigYaml.vue'
import EnvPreparation from './EnvPreparation.vue'
import choosePlatform from './ChoosePlatform.vue'
import publishAppDialog from './detail/PublishAppDialog.vue'
import api from './detail/Api.vue'
import deployment from './Deployment.vue'
import appRelease from './AppRelease.vue'
export default {
  name: 'AppDetail',
  components: {
    imageSelect,
    configYaml,
    EnvPreparation,
    choosePlatform,
    publishAppDialog,
    api,
    deployment,
    appRelease
  },
  data () {
    return {
      firstEnter: true,
      apiDataLoading: false,
      projecDetailList: [],
      dialogVisible: false,
      activeName: '1',
      active: 0,
      nextButtonName: this.$t('workspace.nextStep'),
      currentComponent: 'EnvPreparation',
      allStepData: {},
      projectBeforeConfig: {},
      viewReport: false,
      isDeploying: false,
      deployed: false,
      isCompleted: false,
      userId: sessionStorage.getItem('userId'),
      isPublic: false,
      isfail: true,
      appApiFileIdTemp: true
    }
  },
  computed: {
    btnName: function () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.nextButtonName = this.active >= 3 ? this.$t('workspace.saveData') : this.$t('workspace.nextStep')
      return this.nextButtonName
    }
  },
  methods: {
    changeComponent () {
      switch (this.active) {
        case 0:
          this.currentComponent = 'EnvPreparation'
          break
        case 1:
          this.currentComponent = 'choosePlatform'
          break
        case 2:
          this.currentComponent = 'imageSelect'
          break
        case 3:
          this.currentComponent = 'configYaml'
          break
        default:
          this.currentComponent = 'EnvPreparation'
      }
    },
    next () {
      // 获取组件内部的值
      this.$refs.currentComponet.emitStepData()
      if (this.allStepData.ifNext) {
        if (this.active < 3) {
          this.active++
          this.handleStep()
        } else {
          this.submitData()
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
    handleClose () {
      this.$router.push({
        name: 'workspace'
      })
    },
    getStepData (data) {
      this.allStepData[data.step] = data.data
      this.allStepData.ifNext = data.ifNext
    },
    getBtnStatus (status) {
      this.isDeploying = status.status
      this.deployed = status.deploy
      this.isCompleted = status.isCompleted
      this.isfail = status.isFail
    },
    getAppapiFileId (data) {
      this.appApiFileIdTemp = data
    },
    submitData () {
      this.apiDataLoading = true
      const projectId = sessionStorage.getItem('mecDetailID')
      const params = {
        testId: this.projectBeforeConfig.testId,
        privateHost: !!this.allStepData.third.enable,
        deployFileId: this.allStepData.fourth.appYamlFileId,
        platform: 'KUBERNETES',
        hosts: this.allStepData.third.hostId ? [
          {
            hostId: this.allStepData.third.hostId,
            userId: this.userId
          }
        ] : []
      }
      const func = params.testId ? Workspace.putTestConfigApi : Workspace.postTestConfigApi
      func(projectId, this.userId, params).then(res => {
        this.$message.success(this.$t('promptMessage.saveSuccess'))
        this.getTestConfig()
        this.activeName = '3'
      }, (error) => {
        if (error.response.data.code === 403) {
          this.$message.error(this.$t('promptMessage.guestPrompt'))
        } else {
          this.$message.error(this.$t('promptMessage.saveFail'))
        }
      }).finally(() => {
        this.apiDataLoading = false
      })
    },
    // 部署
    deployTest (projectId) {
      Workspace.deployTestApi(projectId, this.userId).then(response => {
        if (response.data.status === 'DEPLOYING') {
          this.$message({
            message: this.$t('workspace.startDeploySucc')
          })
        }
      })
    },
    // 清空测试环境
    cleanTestEnv (deployed) {
      this.isPublic = true
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.cleanTestEnvApi(projectId, deployed, this.userId).then(res => {
        if (res.data === true) {
          this.isPublic = false
        }
        if (res.data === true && deployed) {
          this.dialogVisible = true
        }
      })
    },
    getViewReport (data) {
      this.viewReport = data
    },
    // 获取以前提交过的配置
    getTestConfig () {
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getTestConfigApi(projectId).then(res => {
        this.projectBeforeConfig = res.data || {}
        if (res.data.appInstanceId) {
          sessionStorage.setItem('csarId', res.data.appInstanceId)
        }
      })
    }
  },
  mounted () {
    this.handleStep()
    this.getTestConfig()
  }
}
</script>

<style lang="less">
.el-steps{
  margin-bottom: 40px;
  .el-step__icon-inner{
    color: #adb0b8;
  }
  .el-step__icon.is-text{
    border: none;
  }
  .el-step__icon-inner{
    color: #fff;
  }
  .is-process .el-step__icon{
    background-color: #688ef3;
  }
  .el-step__title.is-process{
    font-weight: normal;
  }
  .is-wait .el-step__icon{
    background: #fff;
    border: 1px solid #adb0b8;
    .el-step__icon-inner{
      color: #adb0b8;
    }
  }
  .is-success .is-text{
    background-color: #6b92fa;
  }
  .el-step__title.is-success{
    color: #688ef3;
  }
  .el-step__head.is-success{
    border-color: #688ef3;
    .el-step__line{
      background-color: #6b92fa;
    }
  }
}
.workdetail {
  // height: 100%;
  .el-tree-node__content{
    height: 35px;
    line-height: 35px;
  }
  .el-tabs--left .el-tabs__item.is-left{
    text-align: center;
    background: #fff;
  }
  .el-tabs--left .el-tabs__header.is-left{
    margin-right: 20px;
  }
  .el-tabs__nav-wrap.is-left::after{
    width: 0;
  }
  .el-tabs--left .el-tabs__active-bar.is-left{
    display: none;
  }
  .el-tabs__item{
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 16px;
  }
  .el-tabs--left .el-tabs__item.is-left.is-active{
    background:#688ef3;
    color: #fff;
  }
  .el-tabs__item:hover{
    color: #688ef3;
  }
  .elTabs {
    padding: 20px 20px 20px 0;
    .el-tabs__header{
      min-width: 195px;
    }
    .el-tabs__content{
      background: #fff;
      border-radius: 5px;
    }
    .elTabPane {
      padding: 30px;
      min-height: 300px;
    }
    .elButton {
      width: 80%;
      margin: 15px 10% 0;
      text-align: right;
      button {
        height: 30px;
        width: 110px;
        line-height: 30px;
        padding: 0;
      }
      .el-button--text {
        border: 1px solid #688ef3;
      }
      .el-button--primary {
        background-color: #688ef3;
        color: #fff;
      }
    }
    .elSteps {
      margin: 0px 10% 0;
      width: 80%;
      padding: 20px 0;
      box-sizing: border-box;
      border-bottom:  1px dashed #dfe1e6;
    }
    @media screen and (max-width: 1380px) {
      .elSteps {
        margin: 0 0 0;
        width: 100%;
      }
    }
    .elDatePicker {
      margin-top: 20px;
    }
    .elProgress {
      text-align: center;
      margin-top: 20px;
    }
  }
  .title{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
}
</style>
