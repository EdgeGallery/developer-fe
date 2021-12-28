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
  <div class="deployment-vm work-div">
    <div class="p-vm-top">
      <p class="p-vm-select">
        {{ $t('workspace.deployDebugVm.deploySelect') }}
      </p>
      <p class="p-vm-tips">
        {{ $t('workspace.deployDebugVm.deployTips') }}
      </p>
    </div>
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
    <!-- Deploy detail -->
    <div
      class="deploy-detail"
      v-if="testFinished"
    >
      <div class="deployment__header work-title">
        {{ $t("workspace.deployDetail") }}
      </div>
      <el-row
        :gutter="24"
        v-for="(item,index) in deployListData"
        :key="index"
        v-loading="vmDataLoading"
      >
        <el-col :span="13">
          <div>
            <el-form
              :label-width="language==='en' ? '150px' : '120px'"
              class="formDetail"
            >
              <el-form-item :label="$t('workspace.deployDebugVm.vmNameLbl')">
                {{ item.vmName }}
              </el-form-item>
              <el-form-item label="MecHost">
                {{ item.host?item.host.mecHost:null }}
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="11">
          <div>
            <el-form
              label-width="120px"
              class="formDetail"
            >
              <el-form-item :label="$t('workspace.deployDebugVm.vmStatusLbl')">
                <em
                  v-if="item.status==='SUCCESS'"
                  class="el-icon-success success icon"
                />
                <em
                  v-if="item.status==='FAILED'"
                  class="el-icon-error error icon"
                />
                {{ item.status }}
              </el-form-item>
              <el-form-item :label="$t('workspace.deployDebugVm.vmApplyTimeLbl')">
                {{ item.createTime }}
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="24">
          <p class="deployment-button__wrapper detail-button">
            <el-button
              class="deploy-btn"
              @click="handleVNC(item)"
              :disabled="item.status==='CREATING'"
            >
              {{ $t('workspace.deployDebugVm.vncBtnLbl') }}
            </el-button>
            <el-button
              class="deploy-btn"
              @click="handleUploadFile(item)"
              :disabled="item.status==='CREATING'"
            >
              {{ $t('workspace.configYaml.uploadFile') }}
            </el-button>
          </p>
        </el-col>
      </el-row>
      <div v-if="showUploadAppDlg">
        <UploadApp
          v-model="showUploadAppDlg"
          :project-id="projectId"
          :vm-id="operatingVmId"
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
      </div>
    </div>
    <!-- Image -->
    <div
      v-if="isDeploySuccess"
      class="image"
    >
      <div class="deployment__header work-title">
        {{ $t("workspace.deployDebugVm.vmImageLbl") }}
      </div>
      <div class="deployment__body">
        <div class="image-tips">
          {{ $t("workspace.deployDebugVm.createImageText") }}
        </div>
        <div class="deployment-button__wrapper detail-button">
          <el-button
            type="primary"
            class="deploy-btn"
            @click="createVmImage"
            :disabled="imageList.length>0"
          >
            {{ $t('workspace.deployDebugVm.generate') }}
          </el-button>
        </div>
        <!-- image list -->
        <div
          class="work-table"
        >
          <el-table
            :data="imageList"
            style="width: 100%"
          >
            <el-table-column
              :label="$t('workspace.deployDebugVm.vmName')"
            >
              <template slot-scope="scope">
                <em
                  v-if="scope.row.status==='CREATING'"
                  class="el-icon-loading"
                />{{ scope.row.vmName }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('workspace.imagename')"
            >
              <template slot-scope="scope">
                <em
                  v-if="scope.row.status==='CREATING'"
                  class="el-icon-loading"
                />
                <em
                  v-if="scope.row.status==='FAILED'"
                  class="el-icon-error error icon"
                />
                {{ scope.row.imageName }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('workspace.deployDebugVm.stageStatus')"
            >
              <template slot-scope="scope">
                <em
                  v-if="scope.row.status==='CREATING'"
                  class="el-icon-loading deploying icon"
                />
                <em
                  v-if="scope.row.status==='FAILED'"
                  class="el-icon-error error icon"
                />
                <em
                  v-if="scope.row.status==='SUCCESS'"
                  class="el-icon-success success icon"
                />{{ scope.row.log }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('workspace.deployDebugVm.vmStatusLbl')"
            >
              <template slot-scope="scope">
                <em
                  v-if="scope.row.status==='CREATING'"
                  class="el-icon-loading deploying icon"
                />
                <em
                  v-if="scope.row.status==='FAILED'"
                  class="el-icon-error error icon"
                />
                <em
                  v-if="scope.row.status==='SUCCESS'"
                  class="el-icon-success success icon"
                />{{ scope.row.status }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('workspace.operation')"
            >
              <template slot-scope="scope">
                <el-link
                  :href="downloadVmImage(scope.row.vmId)"
                  :underline="false"
                  :disabled="scope.row.status==='CREATING'"
                  class="download_btn"
                  rel="noopener noreferrer"
                >
                  {{ $t('common.download') }}
                </el-link>
                <el-button
                  @click="deleteVmImage"
                  :disabled="scope.row.status==='CREATING'"
                >
                  {{ $t('workspace.deployDebugVm.deleteBtnLbl') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
import { PROXY_PREFIX_CURRENTSERVER } from '../../../tools/constant.js'
import ProgressBar from '../../../components/deployment/ProgressBar.vue'
import DeploymentStatus from '../../../components/deployment/DeploymentStatus.vue'
import SelectTestEnvironment from '../../../components/deployment/SelectTestEnvironment.vue'
import UploadApp from './UploadApp.vue'

export default {
  name: 'DeploymentVm',
  components: {
    DeploymentStatus,
    ProgressBar,
    SelectTestEnvironment,
    UploadApp
  },
  data () {
    return {
      deployListData: [],
      vmDataLoading: true,
      isDisabled: false,
      operatingVmId: '',
      showUploadAppDlg: false,
      imageCreateTimer: '',
      isDeploySuccess: false,
      testFinished: false,
      deployStatus: 'NOTDEPLOY',
      timer: '',
      projectName: '',
      projectId: '',
      userId: '',
      accessUrl: '',
      errorLog: '',
      isPhysical: false,
      language: 'cn',
      isCleanTestEnv: sessionStorage.getItem('isCleanTestEnv') || '',
      // Process percentage of progress-bar, default to be 0
      deployProgress: 0,
      // Display status of progress-bar, default to be false
      showProgressBar: false,
      // Store deployment steps
      deploymentSteps: [],
      imageList: [],
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

      this.stageStatus = null
      this.deployTest()
    },
    /**
     * This function will be and only will be called by function startDeploy.
     */
    deployTest () {
      vmService.vmDeployTestApi(this.projectId, this.userId).then(response => {
        this.deployStatus = 'CREATING'
        this.showProgressBar = true
        this.deployProgress = 0
        this.timer = setInterval(this.getProjectVmList, 2000)
      }).catch(err => {
        this.vmDataLoading = false
        if (err.response.data.message === 'Can not get vm package config') {
          this.$eg_messagebox(this.$t('workspace.deployDebugVm.resourceConfigPromt'), 'warning')
        }
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
      vmService.cleanTestVmEnvApi(this.projectId).then(response => {
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
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let H = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        return Y +
          '-' +
          (M > 9 ? M : '0' + M) +
          '-' +
          (D > 9 ? D : '0' + D) +
          ' ' +
          (H > 9 ? H : '0' + H) +
          ':' +
          (m > 9 ? m : '0' + m) +
          ':' +
          (s > 9 ? s : '0' + s)
      }
    },
    getProjectVmList () {
      vmService.getProjectVmResList(this.projectId, this.userId).then(res => {
        this.deployListData = []
        let cachedData = ''
        if (res.data.length === 0) {
          clearInterval(this.timer)
        } else {
          cachedData = res.data[0]
          if (cachedData.status !== 'CREATING') {
            clearInterval(this.timer)
          }
          this.deployListData.push(cachedData)
          if (cachedData.createTime !== null) {
            cachedData.createTime = this.dateChange(cachedData.createTime)
          }
          if (cachedData === null || cachedData === '') {
            return
          }

          this.handleDeployStatus(cachedData)
        }
        this.vmDataLoading = false
      }).catch(() => {
        clearInterval(this.timer)
        this.vmDataLoading = false
      })
    },
    handleDeployStatus (cachedData) {
      this.stageStatus = cachedData.stageStatus
      this.deployStatus = cachedData.status
      this.updateDeployProgress()
      if (this.deployStatus === 'SUCCESS' || this.deployStatus === 'FAILED' || this.deployStatus === 'CREATING') {
        this.showProgressBar = true
      }

      // deploy successfully
      if (this.deployStatus === 'SUCCESS') {
        clearInterval(this.timer)
        this.getCreateImageList()
        this.testFinished = true
        this.isDeploySuccess = true
        this.accessUrl = this.getVmDeployIp(cachedData)
        this.errorLog = cachedData.log
      }
      // deploy failed
      if (this.deployStatus === 'FAILED') {
        clearInterval(this.timer)
        this.deployStatus = 'FAILED'
        this.testFinished = true
        this.isDeploySuccess = false
        this.accessUrl = this.getVmDeployIp(cachedData)
        this.errorLog = cachedData.log
      }
    },
    getVmDeployIp (data) {
      let accessUrl = ''
      data.vmInfo.forEach(element => {
        element.networks.forEach(item => {
          accessUrl += item.ip + ', '
        })
      })
      return accessUrl
    },
    updateDeployProgress () {
      if (this.stageStatus === null) {
        return
      }
      if (this.stageStatus.workStatus === 'Success') {
        this.deployProgress = 100
      } else if (this.stageStatus.instantiateInfo === 'Success') {
        this.deployProgress = 75
      } else if (this.stageStatus.distributeInfo === 'Success') {
        this.deployProgress = 50
      } else if (this.stageStatus.hostInfo === 'Success') {
        this.deployProgress = 25
      } else {
        this.deployProgress = 0
      }
    },
    fetchDataOnMounted () {
      this.getProjectVmList()
    },
    handleVNC (vmData) {
      if (PROXY_PREFIX_CURRENTSERVER) {
        window.open(PROXY_PREFIX_CURRENTSERVER + '/webssh.html', 'webssh')
      } else {
        window.open('webssh.html', 'webssh')
      }
    },
    handleUploadFile (vmData) {
      this.showUploadAppDlg = true
      this.operatingVmId = vmData.vmId
    },
    // Create image
    createVmImage () {
      vmService.createVmImageApi(this.projectId, this.userId).then(res => {
        this.imageCreateTimer = setInterval(this.getCreateImageList, 5000)
        if (res.data) {
          this.getCreateImageList()
        }
      })
    },
    // Get image
    getCreateImageList () {
      this.imageList = []
      vmService.getCreateImageListApi(this.projectId, this.userId).then(res => {
        if (res.data === '') {
          clearInterval(this.imageCreateTimer)
        } else {
          this.imageList.push(res.data)
          if (res.data.status !== 'CREATING') {
            clearInterval(this.imageCreateTimer)
          }
        }
      }).catch(() => {
        clearInterval(this.imageCreateTimer)
      })
    },
    // Download image
    downloadVmImage (vmId) {
      return vmService.downloadVmImageApi(this.projectId, vmId, this.userId)
    },
    // Delete image
    deleteVmImage () {
      this.$confirm(this.$t('devTools.deleteProject'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        vmService.deleteVmImageApi(this.projectId, this.userId).then(() => {
          this.$eg_messagebox(this.$t('devTools.deleteSucc'), 'success')
          this.getCreateImageList()
        }).catch(() => {
          this.$eg_messagebox(this.$t('devTools.deleteFail'), 'error')
        })
      })
    },
    initDeploymentSteps () {
      this.deploymentSteps = [
        this.$t('workspace.assignTestNodes'),
        this.$t('workspace.distributeInfo'),
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
.deployment-vm {
  margin-top: 12px;
  padding: 46px 39px;
  .p-vm-top {
    color: #380879;
    font-size: 16px;
    .p-vm-select {
      margin-bottom: 13px;
    }
    .p-vm-tips {
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;
      margin-bottom: 22px;
    }
  }
  .detail-button {
    padding-top: 10px;
  }
  .deploy-detail {
    .el-row {
      padding: 15px 50px 25px 23px;
    }
    .formDetail {
      .el-form-item {
        margin-bottom:0px !important;
        .el-form-item__label {
          color: #380879;
          padding-right: 20px;
          font-size: 16px;
        }
        .el-form-item__content{
          line-height: 40px;
          font-size: 16px;
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        }
      }
      .vm_log .el-form-item__content{
        max-height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
        line-clamp:2;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
      }
    }
  }
  .image {
    .image-tips {
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;
      color: #380879;
      font-size: 16px;
    }
    .deployment-button__wrapper {
      margin: 12px 0;
    }
    .el-table {
      border-radius: 12px 12px 12px 12px;
    }
    .work-table {
      .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover, .el-link.el-link--default:after, .el-link.el-link--default.is-disabled, .el-link.el-link--default, .el-link.el-link--default:hover {
        color: #62517a !important;
        background-color: transparent;
        border-color: transparent;
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
      }
      .el-link.el-link--default:after, .el-link.el-link--default.is-disabled, .el-link.el-link--default, .el-link.el-link--default:hover {
        margin-bottom: 4px;
      }
    }
  }
  .deployment-result {
    margin-top: 0px;
  }
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
  font-family: defaultFontLight, Arial, Helvetica, sans-serif;
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
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
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
}
</style>
