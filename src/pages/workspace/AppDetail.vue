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
            @click="next"
            :disabled="active===3 && isCompleted"
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
      apiDataLoading: true,
      projecDetailList: [],
      dialogVisible: false,
      activeName: '1',
      active: 0,
      nextButtonName: this.$t('workspace.nextStep'),
      currentComponent: 'imageSelect',
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
      this.nextButtonName = this.active === 3 ? this.$t('workspace.saveData') : this.$t('workspace.nextStep')
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
        this.active++
        this.handleStep()
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
      if (this.active === 2 && this.deployed && !this.isfail) {
        this.cleanTestEnv(false)
      }
      if (this.active === 3) {
        // 第三部提交数据
        this.submitData()
      }
      if (this.active === 4) {
        this.cleanTestEnv(true)
      }
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
      let projectId = sessionStorage.getItem('mecDetailID')
      let getParams = (type) => {
        let subparams = []
        if (type === 'image') {
          this.allStepData.second.appImage.forEach(item => {
            subparams.push(item.id)
          })
        } else {
          subparams.push(this.allStepData.third)
        }
        return subparams
      }
      let params = {
        // 第一步的apifileID
        appApiFileId: this.allStepData.first.appApiFileId,
        // 第二步填入的服务连接端口号
        agentConfig: {
          serviceName: this.allStepData.second.serviceName,
          href: this.allStepData.second.serviceHref,
          port: Number(this.allStepData.second.servicePort)
        },
        // 第一二步上传，选择的image
        imageFileIds: getParams('image'),
        // 第三步选择的服务
        hosts: getParams('host')

      }
      // 根据第一步的状态判断是新建还是修改

      let methodsType = 1
      if (this.projectBeforeConfig.testId) {
        methodsType = 2
        // 修改需要
        params.status = this.projectBeforeConfig.status
        params.accessUrl = this.projectBeforeConfig.accessUrl
        params.errorLog = this.projectBeforeConfig.errorLog
      }

      if (methodsType === 1) {
        Workspace.postTestConfigApi(projectId, this.userId, params).then(res => {
          this.deployTest(projectId)
        })
      } else {
        Workspace.putTestConfigApi(projectId, params).then(res => {
          this.deployTest(projectId)
        })
      }
    },
    // 部署
    deployTest (projectId) {
      Workspace.deployTestApi(projectId, this.userId).then(response => {
        if (response.data.status === 'DEPLOYING') {
          this.$message({
            message: this.$t('workspace.startDeploySucc')
          })
        }
      }).catch(err => {
        console.log(err)
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
        if (res.data.status === 'Running') {
          this.activeName = '2'
          this.active = 3
          this.changeComponent()
        }
        this.projectBeforeConfig = res.data ? res.data : {}
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
    width: 8px;
    height: 8px;
    background-color: #fff;
    text-indent: 99px;
    border-radius: 50%;
    overflow: hidden;
  }
  .el-step__icon.is-text{
    border: none;
  }
  .el-step__head.is-success .el-step__line{
    background-color: #6b92fa;
  }
  .el-step__head.is-success{
    border-color: #6b92fa;
  }
  .el-step__title.is-success{
    color: #303133;
  }
  .el-step__head.is-wait .el-step__icon.is-text{
    width: 24px;
    height: 24px;
    background-color: #b8becc;
    border-radius: 50%;
  }
  .el-step__head.is-process .el-step__icon.is-text,.el-step__head.is-success .el-step__icon.is-text{
    width: 24px;
    height: 24px;
    background-color: #6b92fa;
    border-radius: 50%;
  }
  .el-step__head.is-success .el-step__icon-inner{
    width: 16px;
    height: 16px;
    background: url('../../assets/images/step_success.png') no-repeat;
    background-size: cover;
  }
}
.upload-demo{
  .el-button--primary{
    background-color: #fff;
    border-color: #688ef3;
    color: #688ef3;
    padding: 6px 20px;
    margin-top: 8px;
  }
  .el-icon-warning{
    color: #688ef3;
    margin-right: 5px;
    font-size: 14px;
  }
  .el-upload__tip{
    margin-top: 10px;
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
  }
  .el-tabs--left .el-tabs__header.is-left{
    margin-right: 0;
  }
  .el-tabs__item{
    padding: 0 10px;
  }
  .el-tabs--left .el-tabs__item.is-left.is-active{
    background:#41c7db;
    color: #333;
  }
  .el-tabs__active-bar{
    background-color: #138da0;
  }
  .el-tabs__item:hover{
    color: #21c6e0;
  }
  .elTabs {
    background: #fff;
    padding: 20px 20px 20px 0;
    .el-tabs__header{
      width: 195px;
    }
    .el-tabs__content{
      border: 1px solid #ddd;
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
      padding: 20px 40px;
      box-sizing: border-box;
      border: 1px solid #ddd;
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
    font-size: 18px;
    font-weight: normal;
    border-left: 2px solid #41c7db;
    padding-left: 10px;
    margin-bottom: 15px;
  }
}
</style>
