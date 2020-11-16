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
      <div class="detail-table2">
        <table>
          <tr>
            <th>项目名称</th>
            <td><em
              class="header-icon el-icon-s-home"
              style="color:blue; "
            /> positioning-service</td>
            <th>部署平台</th>
            <td>Kubernetes</td>
          </tr>
          <tr>
            <th>镜像</th>
            <td>已上传</td>
            <th>部署配置</th>
            <td>文件名</td>
          </tr>
        </table>
      </div>
      <div class="detail-button-con">
        <el-button
          type="primary"
          @click="startDeploy"
        >
          {{ $t('workspace.startDeployment') }}
        </el-button>
        <el-button
          type="info"
          @click="testCompleted"
        >
          {{ $t('workspace.completeTest') }}
        </el-button>
        <el-button
          type="info"
          @click="testCompleted"
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
            v-if="testStarted"
          >
            <em
              class="header-icon el-icon-circle-check"
              style="color:lightgreen; "
            /> {{ $t('workspace.deploymentSuccess') }}
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
              <el-checkbox :label="6">
                {{ $t('workspace.deploymentComplete') }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-collapse-item>
        <el-collapse-item
          v-show="testStarted"
          name="1"
        >
          <template slot="title">
            {{ $t('workspace.deploymentResult') }}
          </template>
          <div class="status-result">
            <div class="result-item result-top">
              <p class="result-msg">
                {{ $t('workspace.testMsg') }}
              </p>
              <el-button type="primary">
                http://159.138.11.6:32115
              </el-button>
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

export default {
  name: 'Deployment',

  data () {
    return {

      testStarted: false,
      deploymentButtonType: 'primary',
      completeTestButtonType: 'information',
      recycleButtonType: 'information',
      activeNames: ['0'],
      positionImg: require('@/assets/images/position.png'),
      tableData: [
        {
          name: '镜像',
          state: '已上传',
          setting: '部署配置',
          fileName: '文件名'
        }
      ],
      checkbox: []
    }
  },
  methods: {
    startDeploy () {
      this.testStarted = true
      this.activeNames = ['1']
      this.checkbox = [1, 2, 3, 4, 5, 6]
    },
    testCompleted () {
      this.testStarted = false
      this.activeNames = ['0']
      this.checkbox = []
    }
  },
  created () { },
  mounted () { }
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
    .detail-table2 {

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
    // border: 1px solid #ddd;
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
        // border-top: 1px solid #ddd;
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
