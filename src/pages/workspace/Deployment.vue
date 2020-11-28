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
  <div class="deployment">
    <h3 class="title">
      {{ $t('workspace.appDetail') }}
    </h3>
    <div class="main detail-main">
      <div class="detail-table">
        <table>
          <caption />
          <tr>
            <th id="projectName">
              项目名称
            </th>
            <td>
              {{ projectName }}
            </td>
            <th id="platform">
              部署平台
            </th>
            <td>{{ platform }}</td>
          </tr>
          <tr>
            <th id="hostInfo">
              节点信息
            </th>
            <td>{{ privateHost }}</td>
            <th id="config">
              部署配置
            </th>
            <td>{{ deployField }}</td>
          </tr>
        </table>
      </div>
      <div class="detail-button-con">
        <el-button
          :type="deployStatus !== 'DEPLOYING' ? 'primary' : 'info'"
          :disabled="deployStatus === 'DEPLOYING'"
          @click="startDeploy"
        >
          {{ $t('workspace.startDeployment') }}
        </el-button>
        <el-button
          :type="deployStatus !== 'DEPLOYING' ? 'primary' : 'info'"
          :disabled="(deployStatus === 'DEPLOYING' || !testFinished) "
          @click="terminateTest"
        >
          {{ $t('workspace.completeTest') }}
        </el-button>
        <el-button
          :type="deployStatus !== 'DEPLOYING' ? 'primary' : 'info'"
          :disabled="(deployStatus === 'DEPLOYING' || !testFinished) "
          @click="cleanTestEnv"
        >
          {{ $t('workspace.recycle') }}
        </el-button>
      </div>
      <div class="main-msg-con">
        <span class="msg">{{ $t('workspace.completeMsg') }}</span>
      </div>
    </div>
    <h3 class="title">
      {{ $t('workspace.deploymentStatus') }}
    </h3>
    <div class="main status-main">
      <el-collapse
        v-model="activeNames"
      >
        <el-collapse-item name="0">
          <template
            slot="title"
            v-if="testFinished && deploySuccess"
          >
            <em
              class="header-icon el-icon-success"
              style="color:lightgreen; "
            /> {{ $t('workspace.deploymentSuccess') }}
          </template>
          <template
            slot="title"
            v-if="testFinished && !deploySuccess"
          >
            <em
              class="header-icon el-icon-error"
              style="color:red; "
            /> 部署失败
          </template>
          <div class="status-center">
            <el-checkbox-group
              v-model="checkbox"
              text-color="#66cccc"
            >
              <el-checkbox :label="1">
                {{ $t('workspace.createDeploymentFile') }}
              </el-checkbox>
              <el-checkbox :label="2">
                {{ $t('workspace.assignTestNodes') }}
              </el-checkbox>
              <el-checkbox :label="3">
                {{ $t('workspace.applicationRelease2') }}
              </el-checkbox>
              <el-checkbox :label="4">
                {{ $t('workspace.instantiateApplication') }}
              </el-checkbox>
              <el-checkbox :label="5">
                {{ $t('workspace.getDeploymentStatus') }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-collapse-item>
        <el-collapse-item
          v-show="testFinished"
          name="1"
        >
          <template slot="title">
            {{ $t('workspace.deploymentResult') }}
          </template>
          <div class="status-result">
            <div class="result-item result-top">
              <div v-if="testFinished && deploySuccess">
                <p class="result-msg">
                  {{ errorLog }}
                </p>
                <el-link
                  :href="accessUrl"
                  target="_blank"
                >
                  {{ accessUrl }}
                </el-link>
              </div>
              <div v-if="testFinished && !deploySuccess">
                <p class="result-msg">
                  {{ errorLog }}
                </p>
                <el-link
                  :href="accessUrl"
                  target="_blank"
                >
                  {{ accessUrl }}
                </el-link>
              </div>
            </div>
            <div class="result-item result-bottom">
              <div class="result-bottom-title">
                {{ $t('workspace.PODStatus') }}
              </div>
              <div class="result-bottom-center">
                <div class="center-item">
                  <el-row :gutter="5">
                    <el-col :span="6">
                      {{ $t('workspace.PODName') }}
                    </el-col>
                    <el-col :span="18">
                      positioning-service-app-654654
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :span="6">
                      {{ $t('workspace.operatingStatus') }}
                    </el-col>
                    <el-col :span="18">
                      Running
                    </el-col>
                  </el-row>
                  <el-row
                    :gutter="5"
                  >
                    <el-col
                      :span="6"
                    >
                      {{ $t('workspace.container') }}
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col
                      :span="6"
                      class="indent"
                    >
                      {{ $t('workspace.containerName') }}
                    </el-col>
                    <el-col :span="18">
                      positioning-service
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col
                      :span="6"
                      class="indent"
                    >
                      {{ $t('workspace.containerResource') }}
                    </el-col>
                    <el-col :span="18">
                      cpuusage：30% | memusage：23% | diskusage：0%
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col
                      :span="24"
                      class="download-log"
                    >
                      <el-button>{{ $t('workspace.downloadLog') }}</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div class="center-item">
                  <el-row :gutter="5">
                    <el-col :span="4">
                      {{ $t('workspace.PODName') }}
                    </el-col>
                    <el-col :span="20">
                      positioning-service-app-654654
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :span="4">
                      {{ $t('workspace.operatingStatus') }}
                    </el-col>
                    <el-col :span="20">
                      Running
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col :span="4">
                      {{ $t('workspace.container') }}
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col
                      :span="4"
                      class="indent"
                    >
                      {{ $t('workspace.containerName') }}
                    </el-col>
                    <el-col :span="20">
                      positioning-service
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col
                      :span="4"
                      class="indent"
                    >
                      {{ $t('workspace.containerResource') }}
                    </el-col>
                    <el-col :span="20">
                      cpuusage：30% | memusage：23% | diskusage：0%
                    </el-col>
                  </el-row>
                  <el-row :gutter="5">
                    <el-col
                      :span="24"
                      class="download-log"
                    >
                      <el-button>{{ $t('workspace.downloadLog') }}</el-button>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
export default {
  name: 'Deployment',

  data () {
    return {
      deploySuccess: false,
      deployButtonDisable: false,
      testCompletedButtonDisable: false,
      cleanEnvButtonDisable: false,
      testFinished: false,
      deployStatus: 'NOTDEPLOY',
      activeNames: ['0'],
      timer: '',
      isShow: false,
      projectName: '',
      platform: '',
      privateHost: '',
      deployField: '未上传',
      checkbox: [],
      CSAR: '',
      hostInfo: '',
      instantiateInfo: '',
      workStatus: '',
      pods: [],
      projectId: '',
      userId: '',
      accessUrl: 'https://119.8.47.5',
      errorLog: ''
    }
  },
  methods: {
    startDeploy () {
      this.deployButtonDisable = true // 开始部署后禁止掉按钮
      this.deployStatus = 'DEPLOYING'
      this.deployTest()
      this.timer = setInterval(this.getTestConfig, 5000)
    },

    deployTest () {
      Workspace.deployTestApi(this.projectId, this.userId).then(response => {
        if (response.data.status === 'DEPLOYING') {
          this.$message({
            message: this.$t('workspace.startDeploySucc')
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },

    terminateTest () {
      Workspace.terminateProjectAPI(this.projectId, this.userId).then(response => {
        this.$message({
          message: '测试结束'
        })
        clearInterval(this.timer)
        this.checkbox = []
        this.activeNames = ['0']
        this.testFinished = false
      }).catch(err => {
        console.log(err)
      })
    },

    cleanTestEnv () {
      Workspace.cleanTestEnvApi(this.projectId, this.userId).then(response => {
        this.$message({
          message: '环境清空'
        })
        clearInterval(this.timer)
        this.checkbox = []
        this.activeNames = ['0']
        this.testFinished = false
      }).catch(err => {
        console.log(err)
      })
    },

    getTestConfig () {
      Workspace.getTestConfigApi(this.projectId).then(res => {
        let status = res.data.stageStatus
        if (status != null) {
          this.CSAR = status.csar === null ? null : status.csar
          this.hostInfo = status.hostInfo === null ? null : status.hostInfo
          this.instantiateInfo = status.instantiateInfo === null ? null : status.instantiateInfo
          this.workStatus = status.workStatus === null ? null : status.workStatus
        }
        this.deployStatus = res.data.deployStatus
        if (this.CSAR === 'Success') {
          this.checkbox.push(1)
        }
        if (this.hostInfo === 'Success') {
          this.checkbox.push(2)
        }
        if (this.instantiateInfo === 'Success') {
          this.checkbox.push(3)
        }
        if (this.workStatus === 'Success') {
          this.checkbox.push(4)
        }
        if (this.deployStatus === 'SUCCESS') {
          this.checkbox.push(5)
          this.activeNames = ['1']
          clearInterval(this.timer)
          this.testFinished = true
          this.deploySuccess = true
          this.accessUrl = res.data.accessUrl
          this.errorLog = res.data.errorLog
        }
        if (this.CSAR === 'Failed' || this.hostInfo === 'Failed' || this.instantiateInfo === 'Failed' || this.workStatus === 'Failed' || this.deployStatus === 'FAILED') {
          clearInterval(this.timer)
          this.activeNames = ['1']
          this.deployStatus = 'FAILED'
          this.testFinished = true
          this.deploySuccess = false
          this.accessUrl = res.data.accessUrl
          this.errorLog = res.data.errorLog
        }
      })
    },

    fetchDataOnMounted () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        this.projectName = res.data.name
      })
      Workspace.getTestConfigApi(this.projectId).then(res => {
        this.platform = res.data.platform
        this.deployField = res.data.deployField === null ? '未上传' : '已上传'
        this.privateHost = res.data.privateHost ? '私有节点' : '公有节点'
      })
      this.getTestConfig()
    }
  },
  created () { },
  mounted () {
    this.projectId = sessionStorage.getItem('mecDetailID')
    this.userId = sessionStorage.getItem('userId')
    this.fetchDataOnMounted()
  }
}
</script>

<style lang="less">
.border {
  border: 1px solid red;
  box-sizing: border-box;
}
.deployment {
  .main {
    height: auto;
    margin: 15px 0;
    font-size: 16px;
  }
  .detail-main {
    height: auto;
    .detail-table {

        margin: 0;
        padding: 0;

      html,
      body {
        width: 100%;
        height: 100%;
      }
      table {
        width: 100%;
        height: 80px;
        border: 1px solid  #c5c5c5;
        margin: 0 auto;
        border-collapse: collapse;
        text-align: center;
      }
      table th {
        height: 20px;
        border: 1px solid  #c5c5c5;
      }
      table td {
        height: 20px;
        border: 1px solid  #c5c5c5;
      }
    }

    .detail-button-con {
      width: 100%;
      height: 100px;
      margin: 15px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button {
        width: 138px;
        height: 42px;
        margin-left: 80px;
      }
    }
    .main-msg-con {
      width: 100%;
      margin: 15px auto;
      .msg {
        color: red;
      }
    }
  }
  .status-main {
    width: 100%;
    height: auto;
    height: auto;
    background-color: #f8f8f8;
    .el-collapse {
      width: 100%;
      background-color: #fff;
      .el-collapse-item {
        width: 100%;
        border: 1px solid #ddd;

        .el-icon-arrow-right::before {
          content: '\e6eb';
          font-size: 16px;
        }
      }
      .el-collapse-item:last-child {
        margin-top: 20px;
      }
      .el-collapse-item__header {
        padding-left: 30px;
        box-sizing: border-box;
        background-color: #f8f8f8;
        border-bottom: 1px solid #ddd;
      }
    }

    .status-center {
      width: 96%;
      height: 370px;
      margin: 15px auto;
      .border();
      border: 1px solid #ddd;
      background-color: #fff;
      display: flex;
      align-items: center;
      .el-checkbox-group {
        width: 30%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10%;

        .el-checkbox {
          .el-checkbox__inner {
            border-radius: 50%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #b8becc;
          }
          .el-checkbox__inner::before {
            position: absolute;
            content: '';
            width: 4px;
            height: 4px;
            background-color: #fff;
            border-radius: 50%;
          }
        }
        .el-checkbox .is-checked {
          .el-checkbox__inner {
            border-radius: 50%;
            background-color: #66cccc;
            border-color: #66cccc;
          }
          .el-checkbox__inner::before {
            position: absolute;
            content: '';
            width: 0px;
            height: 0px;
            background-color: #fff;
            border-radius: 50%;
          }
        }
        /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #000;
        }
      }
    }
    // 部署结果
    .status-result {
      height: 620px;
      .result-item {
        height: 50%;
      }
      .result-top {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .result-msg {
          margin-bottom: 10px;
          color: #000;
          font-size: 14px;
        }
      }
      .result-bottom {
        .result-bottom-title {
          height: 48px;
          background-color: #f8f8f8;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          padding-left: 30px;
          box-sizing: border-box;
          line-height: 48px;
          font-size: 14px;
        }
        .result-bottom-center {
          height: calc(100% - 48px);
          display: flex;
          justify-content: space-around;
          align-items: center;
          .center-item {
            width: 40%;
            height: 80%;
            border: 1px solid #ddd;
            padding: 20px 100px;
            .indent {
              text-indent: 16px;
            }
            .el-row {
              height: calc(100% / 6);
            }
            .el-row:first-child {
              font-weight: 900;
            }
            .download-log {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              .el-button {
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
