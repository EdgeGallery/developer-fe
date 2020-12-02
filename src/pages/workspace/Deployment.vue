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
    <div class="deploy-detail-box">
      <h5 class="detail-box-title">
        {{ $t("workspace.appDetail") }}
      </h5>
      <div class="detail-table">
        <el-row
          type="flex"
          :gutter="20"
        >
          <el-col :span="12">
            <el-row
              type="flex"
              :gutter="20"
            >
              <el-col
                :span="9"
                class="detail-title-key"
              >
                {{ $t("workspace.projectName") }}
              </el-col>
              <el-col
                :pull="3"
                :span="12"
                class="detail-title-value"
              >
                {{ projectName }}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col
                :span="9"
                class="detail-title-key"
              >
                {{ $t("workspace.deploymentPlatform") }}
              </el-col>
              <el-col
                :pull="3"
                :span="12"
                class="detail-title-value"
              >
                {{ platform }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col
                :span="9"
                class="detail-title-key"
              >
                {{ $t("workspace.hostInfo") }}
              </el-col>
              <el-col
                class="detail-title-value"
                :pull="3"
                :span="12"
              >
                {{ privateHost }}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col
                :span="9"
                class="detail-title-key"
              >
                {{ $t("workspace.deployConfig") }}
              </el-col>
              <el-col
                :pull="3"
                :span="12"
                class="detail-title-value"
              >
                {{ deployField }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="deploy-btn-box">
          <el-button
            class="deploy-btn"
            :type="deployStatus !== 'DEPLOYING' ? 'primary' : 'info'"
            :disabled="deployStatus === 'DEPLOYING' || testFinished"
            @click="startDeploy"
          >
            {{ $t("workspace.startDeployment") }}
          </el-button>

          <el-button
            class="deploy-btn"
            :type="deployStatus !== 'DEPLOYING' ? 'primary' : 'info'"
            :disabled="(deployStatus === 'DEPLOYING' || !testFinished) "
            @click="cleanTestEnv"
          >
            {{ $t("workspace.recycle") }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="deploy-status-box">
      <!-- 状态头部 -->
      <div class="deploy-status-title-box">
        <h5 class="detail-box-title">
          {{ $t("workspace.deploymentStatus") }}
        </h5>
        <div class="select-icon">
          <em
            v-if="flowShow"
            @click="selectFlow = flowShow = false"
            class="el-icon-caret-top"
          />
          <em
            v-else
            @click="selectFlow = flowShow = true"
            class=" el-icon-caret-bottom"
          />
        </div>
      </div>
      <!-- 部署未完成时内容 -->
      <div
        v-if="flowShow"
        class="deploy-status-flow"
      >
        <!-- 时间线 -->
        <div class="timeline-box">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
        <!--流程图 -->
        <div class="flow-img">
          <img
            :src="flowImg"
            alt=""
          >
        </div>
      </div>
      <!-- 部署完成时内容 -->
      <div
        v-if="testFinished"
        class="deploy-finish-box"
        style="marginTop: 70px"
      >
        <h5
          class="detail-result-title"
        >
          {{ $t("workspace.deploymentResult") }}
        </h5>
        <!-- 中心内容 -->
        <div class="deploy-result-buttom">
          <div class="deploy-finish-center">
            <div v-if="deploySuccess">
              <img
                :src="deploySuccessImg"
                alt=""
              >
              <p class="marginTop10">
                {{ $t("workspace.deploymentSuccess") }}
              </p>
            </div>
            <div
              v-if="!deploySuccess"
            >
              <img
                :src="deployFailedImg"
                alt=""
              >
              <p class="marginTop10">
                {{ $t("workspace.startDeployFail") }}
              </p>
            </div>
            <p class="marginTop15 error-log">
              {{ errorLog }}
            </p>
            <p class="deploy-herf marginTop15">
              <el-link
                type="primary"
              >
                {{ accessUrl }}
              </el-link>
            </p>
          </div>
          <!-- 完成状态 -->
          <div class="deploy-finish-status-box">
            <!-- 此处根据返回数组数据渲染页面 -->
            <el-row>
              <el-col
                :lg="12"
                v-for="(item,index) in pods"
                :key="index"
              >
                <div class="pod_list">
                  <p class="pod_title">
                    <span class="span_left">{{ $t('workspace.PODName') }}</span>{{ item.podname }}
                  </p>
                  <p><span class="span_left">{{ $t('workspace.operatingStatus') }}</span>{{ item.podstatus }}</p>

                  <div
                    class="container_div"
                    v-for="(itemSub,indexSub) in item.containers"
                    :key="indexSub"
                  >
                    <div class="container_tit">
                      <span class="span_left">{{ $t('workspace.container') }}</span>
                    </div>
                    <p><span class="span_left">{{ $t('workspace.containerName') }}</span>{{ itemSub.containername }}</p>
                    <p class="resource clear">
                      <span class="span_left">{{ $t('workspace.containerResource') }}</span>
                      <span class="span_resource">cpuusage：{{ getPercentage(itemSub.metricsusage.cpuusage) }} <br> memusage：{{ getPercentage(itemSub.metricsusage.memusage) }} <br> diskusage：{{ getPercentage(itemSub.metricsusage.memusage) }}</span>
                    </p>
                  </div>

                  <el-button
                    type="text"
                    class="downloadLog"
                  >
                    {{ $t('workspace.downloadLog') }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
export default {
  name: 'Deployment',

  data () {
    return {
      flowImg: require('@/assets/images/flowImg.png'),
      deploySuccessImg: require('@/assets/images/deploySuccessImg.png'),
      deployFailedImg: require('@/assets/images/deployFailedImg.png'),
      deploySuccess: false,
      flowShow: true,
      testFinished: false,
      deployStatus: 'NOTDEPLOY',
      timer: '',
      pods: {},
      projectName: '',
      platform: '',
      privateHost: '',
      deployField: '未上传',
      CSAR: '',
      hostInfo: '',
      instantiateInfo: '',
      workStatus: '',
      projectId: '',
      userId: '',
      accessUrl: 'https://119.8.47.5',
      errorLog: '你的应用已经可以被EdgeGallery平台集成，请测试APP业务',
      activities: []
    }
  },
  methods: {
    startDeploy () {
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
    cleanTestEnv () {
      this.CSAR = ''
      this.hostInfo = ''
      this.instantiateInfo = ''
      this.workStatus = ''
      this.testFinished = false
      this.deployStatus = 'NOTDEPLOY'
      this.flowShow = true
      Workspace.cleanTestEnvApi(this.projectId, this.userId).then(response => {
        this.$message({
          message: '环境清空'
        })
        clearInterval(this.timer)
      }).catch(err => {
        console.log(err)
      })
    },
    getTestConfig () {
      Workspace.getTestConfigApi(this.projectId).then(res => {
        let status = res.data.stageStatus
        this.platform = res.data.platform
        this.deployField = res.data.deployField === null ? '未上传' : '已上传'
        this.privateHost = res.data.privateHost ? '私有节点' : '公有节点'
        if (status != null) {
          this.CSAR = status.csar === null ? null : status.csar
          this.hostInfo = status.hostInfo === null ? null : status.hostInfo
          this.instantiateInfo = status.instantiateInfo === null ? null : status.instantiateInfo
          this.workStatus = status.workStatus === null ? null : status.workStatus
        }
        this.deployStatus = res.data.deployStatus
        this.initialTimeline()
        if (this.deployStatus === 'SUCCESS') {
          clearInterval(this.timer)
          this.pods = JSON.parse(res.data.pods).pods
          this.flowShow = true
          this.testFinished = true
          this.deploySuccess = true
          this.accessUrl = res.data.accessUrl
          this.errorLog = res.data.errorLog
        }
        if (this.CSAR === 'Failed' || this.hostInfo === 'Failed' || this.instantiateInfo === 'Failed' || this.workStatus === 'Failed' || this.deployStatus === 'FAILED') {
          clearInterval(this.timer)
          this.pods = JSON.parse(res.data.pods).pods
          this.deployStatus = 'FAILED'
          this.testFinished = true
          this.deploySuccess = false
          this.flowShow = true
          this.accessUrl = res.data.accessUrl
          this.errorLog = res.data.errorLog
        }
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
      return (Math.round(s1 / s2 * 10000) / 100.00 + '%')
    },
    initialTimeline () {
      this.activities = [
        {
          content: '生成部署文件',
          size: 'large',
          icon: this.getIcon(this.CSAR),
          color: this.getColor(this.CSAR)
        },
        {
          content: '分配测试节点',
          size: 'large',
          icon: this.getIcon(this.hostInfo),
          color: this.getColor(this.hostInfo)
        },
        {
          content: '实例化应用',
          size: 'large',
          icon: this.getIcon(this.instantiateInfo),
          color: this.getColor(this.instantiateInfo)
        },
        {
          content: '获取部署状态',
          size: 'large',
          icon: this.getIcon(this.workStatus),
          color: this.getColor(this.workStatus)
        }
      ]
    },
    getIcon: function (field) {
      return (this.deployStatus === 'NOTDEPLOY' ? null : (field === 'Success' ? 'el-icon-check' : ((field === 'Failed' || this.deployStatus === 'FAILED') ? 'el-icon-close' : 'el-icon-loading')))
    },

    getColor: function (field) {
      return (this.deployStatus === 'NOTDEPLOY' ? '#ddd' : (field === 'Success' ? '#778FEF' : ((field === 'Failed' || this.deployStatus === 'FAILED') ? 'red' : '#778FEF')))
    }

  },
  created () { },
  mounted () {
    this.projectId = sessionStorage.getItem('mecDetailID')
    this.userId = sessionStorage.getItem('userId')
    this.fetchDataOnMounted()
    this.initialTimeline()
  }
}
</script>

<style lang="less">
.marginTop10 {
  margin-Top: 10px;
}
.marginTop15 {
  margin-top: 15px;
}
.deployment {
  width: 100%;
  height: 100%;
  //标题名
  .detail-title-key {
    color: #a7a1a3;
    font-size: 14px;
    line-height: 30px;
  }
  .detail-title-value {
    color: #292727;
    font-size: 14px;
    line-height: 30px;
  }
  //部署详情
  .deploy-detail-box {
    .detail-table {
      margin-top: 20px;
      margin-left: 30px;
      width: 70%;
      .deploy-btn-box {
        margin-top: 30px;
        width: 50%;
        display: flex;
        .deploy-btn {
          margin-left: 30px;
        }
      }
    }
  }
  //部署状态
  .deploy-status-box {
    margin-top: 30px;
    .deploy-status-title-box {
      display: flex;
      .select-icon {
        margin-left: 7px;
      }
    }
    .deploy-status-flow {
      width: 80%;
      margin-top: 20px;
      margin-left: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .timeline-box {
        float: left;
        width: 30%;
        .el-timeline-item__node--large {
          height: 20px;
          width: 20px;
        }
      }
      .el-timeline-item__icon {
        font-size: 15px;
        color : #fff
      }
      .el-timeline-item__content {
    margin-left: 15px;
}
      .el-timeline-item__wrapper {
     top: 0px;
}
      .el-timeline-item__tail{
        left: 7.5px;
      }
      .flow-img {
        float: left;
        width: 60%;
        margin-left: 5%;
        img{
          width: 100%;
          max-width: 520px;
        }
      }
    }
    .deploy-finish-box {
      width: 100%;
      .deploy-result-buttom {
        margin-top: 50px;
      }
      .deploy-finish-center {
        width: 340px;
        margin: 0 auto;
        text-align: center;
      }
      .error-log {
        font-size: 12px;
    color: gray;
      }
      .deploy-finish-status-box {
        height: 400px;
          .el-row{
            width: 100%;
            .pod_title{
              font-size: 16px;
              font-weight: bold;
            }
            p{
              line-height: 35px;
            }
            p.title{
              .span_left{
                color: #333;
              }
            }
            .span_left{
              color: #adb0b8;
              display: inline-block;
              min-width: 80px;
            }
            .container_div{
              .container_tit{
                line-height: 35px;
              }
              p{
                padding-left: 15px;
                .span_resource{
                  display: inline-block;
                }
              }
              p.resource{
                span{
                  float: left;
                }
              }
            }
            .downloadLog{
              float: right;
            }
            .el-col{
              padding: 30px;

              border-radius: 5px;
              .pod_list{
                padding: 20px;
                background: #f5f5f6;
                border-radius: 5px;
                height: 350px;
                overflow: auto;
              }
            }
            .pod_list::-webkit-scrollbar{
              width: 6px;
            }
            .pod_list::-webkit-scrollbar-thumb{
              border-radius: 10px;
              background: rgba(0,0,0,0.1);
            }
          }
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
</style>
