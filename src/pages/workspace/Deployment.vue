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
      <h4 class="detail-box-title grayline">
        {{ $t("workspace.appDetail") }}
      </h4>

      <div class="detail-table">
        <el-row>
          <el-col :lg="12">
            <span class="detail-title-key">{{ $t("workspace.projectName") }}</span>
            {{ projectName }}
          </el-col>
          <el-col :lg="12">
            <span class="detail-title-key">{{ $t("workspace.deploymentPlatform") }}</span>
            {{ platform }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="12">
            <span class="detail-title-key">{{ $t("workspace.hostInfo") }}</span>
            {{ privateHost ? $t("workspace.privateHost") : $t("workspace.publicHost") }}
          </el-col>
          <el-col :lg="12">
            <span class="detail-title-key">{{ $t("workspace.deployConfig") }}</span>
            {{ deployField === (null || '') ? $t("workspace.unUploaded") : $t("workspace.uploaded") }}
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="test-env">
      <el-row>
        <h4 class="grayline">
          {{ $t("workspace.selectEnv") }}
        </h4>
      </el-row>
      <el-row class="marginTop15">
        <el-col
          :span="12"
          :push="1"
        >
          <div class="env-img">
            <img
              :src="this.language === 'cn' ? sandboxUnclickedImg : sandboxUnclickedEngImg"
              alt=""
              @click="selectEnv = isPhysical = false"
              v-show="isPhysical"
            >
            <img
              :src="this.language === 'cn' ? sandboxClickedImg : sandboxClickedEngImg"
              alt=""
              @click="selectEnv = isPhysical = false"
              v-show="!isPhysical"
            >
          </div>
        </el-col>
        <el-col
          :span="12"
          :pull="4"
        >
          <div class="env-img">
            <img
              :src="this.language === 'cn' ? labUnclickedImg :labUnclickedEngImg "
              alt=""
              @click="selectEnv = isPhysical = true"
              v-show="!isPhysical"
            >
            <img
              :src="this.language === 'cn' ? labClickedImg :labClickedEngImg"
              alt=""
              @click="selectEnv = isPhysical = true"
              v-show="isPhysical"
            >
          </div>
        </el-col>
      </el-row>
      <div class="deploy-btn-box">
        <el-row>
          <el-col
            :span="24"
            :push="2"
          >
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
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="deploy-status-box">
      <!-- 状态头部 -->
      <div class="deploy-status-title-box grayline">
        <h4 class="detail-box-title">
          {{ $t("workspace.deploymentStatus") }}
        </h4>
      </div>
      <!-- 部署未完成时内容 -->
      <div class="deploy-status-flow-div">
        <div
          class="deploy-status-flow clear"
        >
          <!-- 时间线 -->
          <div class="timeline-box">
            <el-timeline class="timeline-class">
              <el-timeline-item
                v-for="(activity,index) in activities"
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
            <el-carousel
              :autoplay="false"
              arrow="never"
              ref="carousel"
            >
              <el-carousel-item name="1">
                <img
                  :src="this.language === 'cn' ? CSARImg : CSAREngImg"
                  alt=""
                >
              </el-carousel-item>
              <el-carousel-item name="2">
                <img
                  :src="this.language === 'cn' ? nodeInfoImg : nodeInfoEngImg"
                  alt=""
                >
              </el-carousel-item>
              <el-carousel-item name="3">
                <img
                  :src="this.language === 'cn' ? applicationImg : applicationEngImg"
                  alt=""
                >
              </el-carousel-item>
              <el-carousel-item name="4">
                <img
                  :src="this.language === 'cn' ? workStatusImg : workStatusEngImg"
                  alt=""
                >
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>

      <!-- 部署完成时内容 -->
      <div
        v-if="testFinished"
        class="deploy-finish-box"
      >
        <h4
          class="detail-result-title grayline"
        >
          {{ $t("workspace.deploymentResult") }}
        </h4>
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
              <div class="tip gray">
                {{ $t('workspace.recycleTip') }}
              </div>
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
            <p
              class="deploy-herf marginTop15   "
            >
              {{ $t("workspace.testNode") }} : {{ accessUrl }}
            </p>
          </div>

          <!-- 完成状态 -->
          <div class="deploy-finish-status-box">
            <!-- 此处根据返回数组数据渲染页面 -->
            <el-row>
              <el-table
                :data="containers"
                size="small"
                border
                style="width: 100%"
                class="containerTable"
                v-if="deploySuccess"
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
                  prop="metricsusage.cpuusage"
                  :label="$t('workspace.cpuUsage')"
                  sortable
                />
                <el-table-column
                  prop="metricsusage.memusage"
                  :label="$t('workspace.memUsage')"
                  sortable
                />
                <el-table-column
                  prop="metricsusage.diskusage"
                  :label="$t('workspace.diskUsage')"
                  sortable
                />
              </el-table>
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
      labClickedImg: require('@/assets/images/5GClicked.png'),
      labUnclickedImg: require('@/assets/images/5GUnclicked.png'),
      applicationImg: require('@/assets/images/application.png'),
      CSARImg: require('@/assets/images/CSAR.png'),
      nodeInfoImg: require('@/assets/images/nodeInfo.png'),
      workStatusImg: require('@/assets/images/workStatus.png'),
      sandboxClickedImg: require('@/assets/images/sandBoxClicked.png'),
      sandboxUnclickedImg: require('@/assets/images/sandBoxUnclicked.png'),

      labClickedEngImg: require('@/assets/images/5GClickedEng.png'),
      labUnclickedEngImg: require('@/assets/images/5GUnclickedEng.png'),
      applicationEngImg: require('@/assets/images/applicationEng.png'),
      CSAREngImg: require('@/assets/images/CSAREng.png'),
      nodeInfoEngImg: require('@/assets/images/nodeInfoEng.png'),
      workStatusEngImg: require('@/assets/images/workStatusEng.png'),
      sandboxClickedEngImg: require('@/assets/images/sandBoxClickedEng.png'),
      sandboxUnclickedEngImg: require('@/assets/images/sandBoxUnclickedEng.png'),
      deploySuccess: false,
      testFinished: false,
      deployStatus: 'NOTDEPLOY',
      timer: '',
      pods: {},
      projectName: '',
      platform: '',
      privateHost: '',
      deployField: '',
      CSAR: '',
      hostInfo: '',
      instantiateInfo: '',
      workStatus: '',
      projectId: '',
      userId: '',
      accessUrl: '',
      errorLog: '',
      activities: '',
      isPhysical: false,
      language: 'cn',
      containers: []
    }
  },
  methods: {
    startDeploy () {
      if (this.deployField === '' || this.deployField === null) {
        this.$message.error(this.$t('workspace.uploadConfigMessage'))
        return
      }
      this.deployStatus = 'DEPLOYING'
      this.initialTimeline()
      this.deployTest()
      this.timer = setInterval(this.getTestConfig, 2000)
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
      // 清空stageStatus
      this.CSAR = ''
      this.hostInfo = ''
      this.instantiateInfo = ''
      this.workStatus = ''

      this.testFinished = false
      this.deployStatus = 'NOTDEPLOY'
      this.initialTimeline()
      Workspace.cleanTestEnvApi(this.projectId, this.userId).then(response => {
        this.$message({
          message: this.$t('workspace.clearEnv')
        })
        clearInterval(this.timer)
      }).catch(err => {
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

      let status = cachedData.stageStatus
      this.platform = cachedData.platform
      this.deployField = cachedData.deployField
      this.privateHost = cachedData.privateHost
      if (status != null) {
        if (status.csar !== null && status.csar !== this.CSAR) {
          this.CSAR = status.csar
          this.initialTimeline()
        }

        if (status.hostInfo !== null && status.hostInfo !== this.hostInfo) {
          this.hostInfo = status.hostInfo
          this.initialTimeline()
        }

        if (status.instantiateInfo !== null && status.instantiateInfo !== this.instantiateInfo) {
          this.instantiateInfo = status.instantiateInfo
          this.initialTimeline()
        }

        if (status.workStatus !== null && status.workStatus !== this.workStatus) {
          this.workStatus = status.workStatus
          this.initialTimeline()
        }
      }

      this.deployStatus = cachedData.deployStatus
      this.initialTimeline()
      // update icon status according to stage status
      // deploy successfully
      if (this.deployStatus === 'SUCCESS') {
        clearInterval(this.timer)
        if (cachedData.pods !== null && cachedData.pods.length > 4) {
          this.pods = JSON.parse(cachedData.pods).pods
          if (this.pods !== null && this.pods !== {} && this.pods !== undefined) {
            this.podsToContainers()
          }
        }
        this.testFinished = true
        this.deploySuccess = true
        this.accessUrl = cachedData.accessUrl
        this.errorLog = cachedData.errorLog
      }
      // deploy failed
      if (this.CSAR === 'Failed' || this.hostInfo === 'Failed' || this.instantiateInfo === 'Failed' || this.workStatus === 'Failed' || this.deployStatus === 'FAILED') {
        clearInterval(this.timer)
        if (cachedData.pods !== null && cachedData.pods.length > 4) this.pods = JSON.parse(cachedData.pods).pods
        this.deployStatus = 'FAILED'
        this.initialTimeline() // update icon status according to stage status
        this.testFinished = true
        this.deploySuccess = false
        this.accessUrl = cachedData.accessUrl
        if (this.CSAR === 'Failed') {
          this.errorLog = this.$t('workspace.deployFailLog.CSAR')
        }
        if (this.hostInfo === 'Failed') {
          this.errorLog = this.$t('workspace.deployFailLog.hostInfo')
        }
        if (this.instantiateInfo === 'Failed') {
          this.errorLog = this.$t('workspace.deployFailLog.instantiateInfo')
        }
        if (this.workStatus === 'Failed') {
          this.errorLog = this.$t('workspace.deployFailLog.workStatus')
        }
      }
    },

    fetchDataOnMounted () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        this.projectName = res.data.name
      })
      this.getTestConfig()
      this.initialTimeline()
    },
    getPercentage (input) {
      var devide = input.indexOf('/')
      var s1 = input.substring(0, devide)
      var s2 = input.substring(devide + 1, input.length)
      return (Math.round(s1 / s2 * 10000) / 100.00 + '%')
    },
    initialTimeline () {
      this.getStatusPic()

      this.activities = [
        {
          content: this.$t('workspace.createDeploymentFile'),
          size: 'large',
          icon: this.getIcon(this.CSAR),
          color: this.getColor(this.CSAR)
        },
        {
          content: this.$t('workspace.assignTestNodes'),
          size: 'large',
          icon: this.getIcon(this.hostInfo),
          color: this.getColor(this.hostInfo)
        },
        {
          content: this.$t('workspace.instantiateApplication'),
          size: 'large',
          icon: this.getIcon(this.instantiateInfo),
          color: this.getColor(this.instantiateInfo)
        },
        {
          content: this.$t('workspace.getDeploymentStatus'),
          size: 'large',
          icon: this.getIcon(this.workStatus),
          color: this.getColor(this.workStatus)
        }
      ]
      this.$forceUpdate()
    },
    getIcon: function (status) {
      if (status === 'Success') {
        return 'el-icon-check'
      } else if (status === 'Failed' || this.deployStatus === 'FAILED') {
        return 'el-icon-close'
      } else if (this.deployStatus === null || this.deployStatus === 'NOTDEPLOY') {
        return null
      } else return 'el-icon-loading'
    },

    getColor: function (status) {
      if (status === 'Success') {
        return '#778FEF'
      } else if (status === 'Failed' || this.deployStatus === 'FAILED') {
        return 'red'
      } else if (this.deployStatus === null || this.deployStatus === 'NOTDEPLOY') {
        return '#ddd'
      } else return '#778FEF'
    },

    podsToContainers: function () {
      let temp = []
      for (let pod of this.pods) {
        for (let container of pod.containers) {
          container.podName = pod.podname
          container.containerStatus = pod.podstatus
          container.metricsusage.cpuusage = this.getPercentage(container.metricsusage.cpuusage)
          container.metricsusage.memusage = this.getPercentage(container.metricsusage.memusage)
          container.metricsusage.diskusage = this.getPercentage(container.metricsusage.diskusage)
          temp.push(container)
        }
      }
      this.containers = temp
    },

    getStatusPic: function () {
      if (this.deployStatus === 'NOTDEPLOY') {
        this.$refs.carousel.setActiveItem('1')
      } else if (this.workStatus === 'Success') {
        this.$refs.carousel.setActiveItem('4')
      } else if (this.instantiateInfo === 'Success') {
        this.$refs.carousel.setActiveItem('3')
      } else if (this.hostInfo === 'Success') {
        this.$refs.carousel.setActiveItem('3')
      } else if (this.CSAR === 'Success') {
        this.$refs.carousel.setActiveItem('2')
      } else {
        this.$refs.carousel.setActiveItem('1')
      }
    }
  },
  created () { },
  mounted () {
    this.projectId = sessionStorage.getItem('mecDetailID')
    this.language = localStorage.getItem('language')
    this.userId = sessionStorage.getItem('userId')
    this.fetchDataOnMounted()
  },
  watch: {
    '$i18n.locale': function () {
      this.fetchDataOnMounted()
      this.language = localStorage.getItem('language')
      let detailLeft = document.getElementsByClassName('detail-title-key')
      let deployDiv = document.getElementsByClassName('deploy-status-flow')[0]
      let deployLeft = document.getElementsByClassName('timeline-box')[0]
      let deployRight = document.getElementsByClassName('flow-img')[0]
      let language = localStorage.getItem('language')
      this.language = language
      if (this.language === 'en') {
        detailLeft.forEach(item => {
          item.style.width = 140 + 'px'
        })
        deployDiv.style.minWidth = 820 + 'px'
        deployLeft.style.width = 220 + 'px'
        deployRight.style.width = 'calc( 100% - 220px)'
      } else {
        detailLeft.forEach(item => {
          item.style.width = 70 + 'px'
        })
        deployDiv.style.minWidth = 760 + 'px'
        deployLeft.style.width = 160 + 'px'
        deployRight.style.width = 'calc( 100% - 160px)'
        console.log(deployRight.style.width)
      }
    }
  }
}
</script>

<style lang="less">

.grayline {
  background: #f0f0f0;
  padding:10px
}
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
    width: 70px;
    display: inline-block;
    text-align: right;
    padding-right: 10px;
    color: #adb0b8;
    font-size: 16px;
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
      width: 100%;
    }
  }
  .test-env {
    margin-top: 30px;
      .deploy-btn-box {
        margin-top: 30px;
        width: 50%;
        display: flex;
        .deploy-btn {
          margin-left: 30px;
        }

      }
      .env-img {
        margin-top: 20px;
        float: left;
        width: 50%;
        cursor: pointer;
        img{
          width: 100%;
          max-width: 300px;
          max-height: 200px;
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
    .deploy-status-flow-div{
      width: 100%;
      margin-top: 30px;
      padding-left: 30px;
      overflow-x: auto;
    }
    .deploy-status-flow {
      min-width: 760px;
      .flow-img {
        .el-carousel__item h3 {
          color: #475669;
          font-size: 14px;
          opacity: 0.75;
          line-height: 150px;
          margin: 0;
        }
        float: left;
        width: calc(100% - 160px);
        padding-left: 80px;
        box-sizing: border-box;
        img{
          width: 100%;
        }
        .el-carousel__container{
          width: 100%;
          max-width: 886px;
          min-width: 600px;
        }
        .el-carousel__indicators--horizontal{
          display: none;
        }
      }
      @media screen and (max-width:1495px){
        .flow-img{
          padding-left: 0;
        }
      }
      .timeline-box {
        float: left;
        width: 160px;
        .timeline-class {
        font-size: 16px;
        }
        .el-timeline-item__node--large {
          height: 20px;
          width: 20px;
        }
        .el-timeline-item {
          height : 92px
        }
        @media screen and (max-width: 1380px){
          .el-timeline-item {
            height : 76px
          }
        }
        @media screen and (max-width: 1201px){
          .el-timeline-item {
            height : 60px
          }
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

    }
    .deploy-finish-box {
      margin-top: 70px;
      width: 100%;
      .gray {
      color: #adb0b8;
    }
    .purple {
      color : #778FEF;
    }
    .tip {
      font-size: 12px;
      margin: 15px;
      line-height: 20px;
    }
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
        .containerTable{
          width:100%;
          margin-top: 35px;
        }
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
              float:right
            }
            .clearfix{
              clear: both;
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
