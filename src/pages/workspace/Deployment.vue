<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="deployment">
    <!-- Select test environment div -->
    <div class="selet-test-envs">
      <div class="deployment__header work-title">
        {{ $t("workspace.selectEnv") }}
      </div>
      <div class="deployment__body">
        <SelectTestEnvironment
          :deploy-status="deployStatus"
          :test-finished="testFinished"
          @startDeploy="startDeploy"
          @cleanTestEnv="cleanTestEnv"
        />
        <ProgressBar
          v-if="showProgressBar"
          class="deployment-progress-bar"
          :progress-bar-process="deployProgress"
          :label-list="deploymentSteps"
          :language="language"
          :stage-status="stageStatus"
        />
      </div>
    </div>
    <!-- Deploy result -->
    <div
      v-if="testFinished"
      class="deployment-result"
    >
      <div class="deployment__header work-title">
        {{ $t("workspace.deploymentResult") }}
      </div>
      <div class="deployment__body">
        <DeploymentStatus
          class="deployment-result__comp"
          :test-node-i-p="accessUrl"
          :status="isDeploySuccess"
          :error-content="errorLog"
        />
        <div
          v-if="isDeploySuccess"
          class="deployment-result__detail"
        >
          <el-button
            class="deployment-result__button"
            @click="refToVNC"
          >
            VNC
          </el-button>
          <el-button
            class="deployment-result__button"
            @click="refreshDeployStatus"
          >
            {{ $t("workspace.refresh") }}
          </el-button>
          <div class="deployment_table__wrapper">
            <el-table
              :data="containers"
            >
              <el-table-column
                prop="containername"
                :label="$t('workspace.containerName')"
              />
              <el-table-column
                prop="containerStatus"
                :label="$t('workspace.operatingStatus')"
              />
              <el-table-column
                prop="podName"
                :label="$t('workspace.podBelongsTo')"
              />
              <el-table-column
                prop="podEventsInfo"
                :label="$t('workspace.podEventsInfo')"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="seeDetails(scope.row.podEventsInfo)"
                  >
                    {{ $t('workspace.podEventsInfo') }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="metricsusage.cpuusage"
                :label="$t('workspace.cpuUsage')"
              >
                <template slot-scope="scope">
                  {{ scope.row.metricsusage.cpuusage }}%
                </template>
              </el-table-column>
              <el-table-column
                prop="metricsusage.memusage"
                :label="$t('workspace.memUsage')"
              >
                <template slot-scope="scope2">
                  {{ scope2.row.metricsusage.memusage }}%
                </template>
              </el-table-column>
              <el-table-column
                prop="metricsusage.diskusage"
                :label="$t('workspace.diskUsage')"
              >
                <template slot-scope="scope3">
                  {{ scope3.row.metricsusage.diskusage }}%
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import ProgressBar from '../../components/deployment/ProgressBar.vue'
import DeploymentStatus from '../../components/deployment/DeploymentStatus.vue'
import SelectTestEnvironment from '../../components/deployment/SelectTestEnvironment.vue'

export default {
  name: 'Deployment',
  components: {
    DeploymentStatus,
    ProgressBar,
    SelectTestEnvironment
  },
  data () {
    return {
      isDeploySuccess: false,
      testFinished: false,
      deployStatus: 'NOTDEPLOY',
      timer: '',
      pods: {},
      projectName: '',
      deployField: '',
      projectId: '',
      userId: '',
      accessUrl: '',
      errorLog: '',
      isPhysical: false,
      language: 'cn',
      containers: [],
      isCleanTestEnv: sessionStorage.getItem('isCleanTestEnv') || '',
      // Process percentage of progress-bar, default to be 0.
      deployProgress: 0,
      // Display status of progress-bar, default to be false
      showProgressBar: false,
      // Store deployment steps
      deploymentSteps: [],
      stageStatus: null
    }
  },
  methods: {
    /**
     * This function will be called if the "Start Deployment" button was clicked.
     * Parameter deploymentEnv indexs for the sandbox or 5G environment: '0' for sandbox
     * environment and '1' for 5G environment.
     */
    startDeploy (deploymentEnv) {
      if (deploymentEnv === '1') {
        this.isPhysical = true
      } else {
        this.isPhysical = false
      }

      if (this.deployField === '' || this.deployField === null) {
        this.$eg_messagebox(this.$t('workspace.uploadConfigMessage'), 'error')
        return
      }
      this.deployStatus = 'DEPLOYING'
      this.deployTest()
      this.showProgressBar = true
      this.deployProgress = 0
      this.stageStatus = null
      this.timer = setInterval(this.getTestConfig, 2000)
    },
    /**
     * This function will be and only will be called by function startDeploy.
     */
    deployTest () {
      Workspace.deployTestApi(this.projectId, this.userId).then(response => {
        if (response.data.status === 'DEPLOYING') {
          this.$eg_messagebox(this.$t('workspace.startDeploySucc'), 'info')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    testEnvReleased () {
      this.$emit('checkCleanEnv', true)
      this.deployProgress = 0
      this.testFinished = false
      this.deployStatus = 'NOTDEPLOY'
    },
    cleanTestEnv () {
      // Clear stage status
      Workspace.cleanTestEnvApi(this.projectId, this.userId).then(response => {
        this.$emit('checkCleanEnv', true)
        this.deployStatus = 'NOTDEPLOY'
        this.testFinished = false
        this.deployProgress = 0
        this.showProgressBar = false
        this.$eg_messagebox(this.$t('workspace.clearEnv'), 'success')
        clearInterval(this.timer)
      }).catch(err => {
        this.testFinished = true
        this.$eg_messagebox(this.$t('workspace.clearEnvFail'), 'error')
        console.log(err)
      })
    },
    async getTestConfig () {
      let cachedData = ''
      await Workspace.getTestConfigApi(this.projectId).then(res => {
        cachedData = res.data
      })

      if (cachedData === null || cachedData === '') {
        return
      }

      this.stageStatus = cachedData.stageStatus
      this.deployStatus = cachedData.deployStatus
      this.deployField = cachedData.deployField
      this.updateDeployProgress()

      if (this.deployStatus === 'SUCCESS' || this.deployStatus === 'FAILED' || this.deployStatus === 'DEPLOYING') {
        this.showProgressBar = true
      }

      if (this.deployStatus === 'SUCCESS') {
        clearInterval(this.timer)
        this.handlePodsData(cachedData)
        this.testFinished = true
        this.isDeploySuccess = true
        this.accessUrl = cachedData.accessUrl
        this.errorLog = cachedData.errorLog
      } else if (this.deployStatus === 'FAILED') {
        clearInterval(this.timer)
        if (cachedData.pods !== null && cachedData.pods.length > 4) {
          this.pods = JSON.parse(cachedData.pods).pods
        }
        this.testFinished = true
        this.isDeploySuccess = false
        this.accessUrl = cachedData.accessUrl
        this.errorLog = cachedData.errorLog
      }
    },
    handlePodsData (cachedData) {
      if (cachedData.pods !== null && cachedData.pods.length > 4) {
        this.pods = JSON.parse(cachedData.pods).pods
        if (this.pods !== null && this.pods !== {} && this.pods !== undefined) {
          this.podsToContainers()
        }
      }
    },
    updateDeployProgress () {
      if (this.stageStatus === null) {
        return
      }
      if (this.stageStatus.workStatus === 'Success') {
        this.deployProgress = 100
      } else if (this.stageStatus.instantiateInfo === 'Success') {
        this.deployProgress = 75
      } else if (this.stageStatus.hostInfo === 'Success') {
        this.deployProgress = 50
      } else if (this.stageStatus.csar === 'Success') {
        this.deployProgress = 25
      } else {
        this.deployProgress = 0
      }
    },
    refreshDeployStatus () {
      Workspace.refreshDeployStatusApi(this.projectId).then(() => {
        this.getTestConfig()
      })
    },
    fetchDataOnMounted () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        this.projectName = res.data.name
      })
      this.getTestConfig()
    },
    getPercentage (input) {
      var devide = input.indexOf('/')
      var s1 = input.substring(0, devide)
      var s2 = input.substring(devide + 1, input.length)
      let res = (Math.round(s1 / s2 * 10000) / 100.00)
      if (res > 100) {
        res = 100
      }
      return res
    },
    refToVNC () {
      window.open('webssh.html', 'webssh')
    },
    podsToContainers: function () {
      let temp = []
      if (this.pods === null) {
        return
      }
      for (let pod of this.pods) {
        if (pod === null || pod.containers === null || pod.containers === undefined) {
          continue
        }
        for (let container of pod.containers) {
          if (container === null || container === undefined) {
            continue
          }
          container.podName = pod.podname
          container.podEventsInfo = pod.podEventsInfo
          container.containerStatus = pod.podstatus
          this.handleContainerProgress(container)
          temp.push(container)
        }
      }
      this.containers = temp
    },
    handleContainerProgress (container) {
      if (container.metricsusage.cpuusage) {
        container.metricsusage.cpuusage = this.getPercentage(container.metricsusage.cpuusage)
      }
      if (container.metricsusage.memusage) {
        container.metricsusage.memusage = this.getPercentage(container.metricsusage.memusage)
      }
      if (container.metricsusage.diskusage) {
        container.metricsusage.diskusage = this.getPercentage(container.metricsusage.diskusage)
      }
    },
    seeDetails: function (events) {
      this.$alert(events, this.$t('workspace.podEventsInfo'), {
        confirmButtonText: this.$t('common.confirm')
      })
    },
    initDeploymentSteps () {
      this.deploymentSteps = [
        this.$t('workspace.createDeploymentFile'),
        this.$t('workspace.assignTestNodes'),
        this.$t('workspace.instantiateApplication'),
        this.$t('workspace.getDeploymentStatus')
      ]
    }
  },
  mounted () {
    if (this.isCleanTestEnv === 'Releaseed') {
      this.testEnvReleased()
    }
    this.projectId = sessionStorage.getItem('mecDetailID')
    this.language = localStorage.getItem('language')
    this.userId = sessionStorage.getItem('userId')
    this.fetchDataOnMounted()
    this.initDeploymentSteps()
  },
  beforeDestroy () {
    sessionStorage.removeItem('isCleanTestEnv')
  },
  watch: {
    '$i18n.locale': function () {
      this.fetchDataOnMounted()
      this.initDeploymentSteps()
      this.language = localStorage.getItem('language')
    }
  }
}
</script>

<style lang="less">
.deployment__body {
  margin: 25px 53px;
}

.deployment-result {
  margin-top: 50px;
}

.deployment-result__comp {
  padding-top: 20px;
}

.deployment-result__button {
  height: 39px;
  margin-top: 20px;
  background-color: #8278b7;
  border-radius: 8px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-family: defaultFontLight;
}

.deployment-result__button:hover {
  background-color: #8278b7;
  color: #fff;
}

.deployment-result__button:focus {
  background-color: #8278b7;
  color: #fff;
}

.deployment_table__wrapper {
  margin-top: 20px;

  .el-table__body {
    background-color: transparent;
  }

  .el-table__header-wrapper {
    border-radius: 0;
  }

  .el-table {
    font-size: 14px;
    font-family: defaultFontLight;
    background-color: #f1f2f6;
    border-radius: 12px;
    box-shadow: 0 0 10px 1px #e5e5ee inset;
  }

  .el-table tr td {
    height: 36px !important;
    line-height: 36px !important;
    background-color: transparent;
    color: #62517a;
  }

  .has-gutter tr th {
    height: 36px;
    padding: 0;
    font-weight: normal;
    background-color: transparent;
    overflow: hidden;
    color: #62517a;
  }

  .el-table .has-gutter tr:first-child {
    background-color: #dedae9;
    box-shadow: 0 3px 10px 2px #d6d1dfd3 inset;
  }

  .el-table__empty-block {
    border-radius: 0 0 12px 12px;
    background-color: transparent;
    min-height: 36px;
  }

  .el-table__empty-text {
    height: 36px;
    line-height: 36px;
  }
}
</style>
