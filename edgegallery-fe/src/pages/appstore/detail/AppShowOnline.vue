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
  <div class="appShowOnline">
    <div class="show_app clearfix">
      <div
        class="show_common lt"
      >
        <img
          :src="appTry"
          alt=""
        >
        <p class="show_btn">
          <el-button
            type="primary"
            class="batchProButton"
            style="width:110px;height:35px;"
            :disabled="btnInstantiate"
            @click="getNodePort(currentData)"
          >
            {{ $t('store.showOnline') }}
          </el-button>
          <el-button
            type="primary"
            class="batchProButton"
            style="width:110px;height:35px;margin-left:40px;"
            :disabled="btnClean"
            @click="cleanTestEnv(currentData)"
          >
            {{ $t('store.releaseResource') }}
          </el-button>
        </p>
      </div>

      <div class="show_step lt">
        <p class="top_titile">
          {{ $t('store.experiencePhase') }}
        </p>
        <div
          class="card_content"
        >
          <el-timeline class="timeline-class">
            <el-timeline>
              <el-timeline-item
                placement="top"
                :type="primary"
                :autofocus="true"
                icon="el-icon-more"
                class="line_top"
              />
              <el-timeline-item
                placement="top"
                :class="{'line_list':btnType==='primary'}"
              >
                <el-button
                  :plain="true"
                  :type="btnType"
                  @click="changeStep"
                  :autofocus="true"
                  disabled="true"
                  style="width:170px;margin-bottom:15px;"
                  :icon="el-icon-check"
                >
                  {{ $t('store.assignTestNodes') }}
                </el-button>

                <p v-show="TestNodeFirstStepFlag">
                  {{ $t('store.TestNodeFirstStep') }}
                </p>
                <p v-show="TestNodeSecondStepFlag">
                  {{ $t('store.TestNodeSecondStep') }}
                </p>
                <p v-show="TestNodeThirdStepFlag">
                  {{ $t('store.TestNodeThirdStep') }}
                </p>
              </el-timeline-item>
              <el-timeline-item
                placement="top"
                :class="{'line_list':instanceBtnType==='primary'}"
              >
                <el-button
                  :plain="true"
                  :type="instanceBtnType"
                  @click="changeDeploySecondStep"
                  :autofocus="true"
                  disabled="true"
                  style="width:170px;margin-bottom:15px;"
                >
                  {{ $t('store.instantiateApplication') }}
                </el-button>

                <p v-show="isShowInstanceFirstStep">
                  {{ $t('store.pleaseInstantiateApp') }}
                </p>
                <p v-show="isShowInstanceSecondStep">
                  {{ $t('store.waitInstantiatedApp') }}
                </p>
                <p v-show="isShowInstanceThirdStep">
                  {{ $t('store.StartDeployApp') }}
                </p>
              </el-timeline-item>
              <el-timeline-item
                placement="top"
                :class="{'line_list':deploymentBtnType==='primary'}"
              >
                <el-button
                  :plain="true"
                  :type="deploymentBtnType"
                  @click="changeDeployThirdStep"
                  disabled="true"
                  style="width:170px;margin-bottom:15px;"
                >
                  {{ $t('store.getDeploymentStatus') }}
                </el-button>
                <p v-show="isShowDeployFirstStep">
                  {{ $t('store.queryDeployStatus') }}
                </p>
                <p v-show="isShowDeploySecondStep">
                  {{ $t('store.waitQueryStatus') }}
                </p>
                <p v-show="isShowDeployThirdStep">
                  {{ $t('store.deployFinished') }}
                </p>
              </el-timeline-item>
              <el-timeline-item
                icon="el-icon-more"
                placement="top"
                class="line_top"
              />
            </el-timeline>
          </el-timeline>
        </div>
        <div v-if="displayDom">
          <p class="bottom_titile">
            {{ $t('store.tryAppDes') }}
          </p>
          <div class="footer_title">
            <p class="bottom_titile1">
              {{ $t('store.serviceNodeInfo') }}
            </p>
            <div
              class="el-upload__tip"
              slot="tip"
            >
              <em class="el-icon-warning" />
              {{ $t('store.releaseAppResource') }}
            </div>
          </div>
          <div
            class="experienceData"
          >
            <el-table
              :data="experienceData"
              header-cell-class-name="headerStyle"
            >
              <el-table-column
                prop="serviceName"
                :label="$t('store.serviceName')"
                width="235"
              />
              <el-table-column
                prop="mecHost"
                :label="$t('store.Ip')"
                width="235"
              />
              <el-table-column
                prop="nodePort"
                :label="$t('store.port')"
                width="235"
              />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appstoreApi } from '../../../api/appstoreApi'
import appTry from '@/assets/images/appstore/apptry.png'
import startTry from '@/assets/images/appstore/startTry.png'
export default {
  name: 'AppShowOnline',
  props: {
    packageId: {
      required: true,
      type: String
    },
    appId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      appTry: appTry,
      startTry: startTry,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      name: '',
      ip: '',
      nodePort: '',
      experienceData: [],
      btnInstantiate: false,
      btnClean: true,
      btnType: 'info',
      instanceBtnType: 'info',
      deploymentBtnType: 'info',
      TestNodeFirstStepFlag: true,
      TestNodeSecondStepFlag: false,
      TestNodeThirdStepFlag: false,

      isShowInstanceFirstStep: true,
      isShowInstanceSecondStep: false,
      isShowInstanceThirdStep: false,

      isShowDeployFirstStep: true,
      isShowDeploySecondStep: false,
      isShowDeployThirdStep: false,
      displayDom: false
    }
  },
  methods: {
    goStep () {
      this.btnType = 'primary'
      this.TestNodeFirstStepFlag = false
      this.TestNodeSecondStepFlag = true
      setTimeout(() => this.changeStep(), 3000)
      this.TestNodeSecondStepFlag = false
      this.TestNodeThirdStepFlag = true
    },
    changeStep () {
      this.instanceBtnType = 'primary'
      this.isShowInstanceFirstStep = false
      this.isShowInstanceSecondStep = true
      appstoreApi.getNodePort(this.appId, this.packageId, this.userId, this.name, this.ip).then(
        (res) => {
          let experienceInfo = res.data
          if (experienceInfo.message.indexOf('please register host') !== -1) {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.registerHost')
            })
          } else if (experienceInfo.message.indexOf('instantiate application failed.') !== -1) {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.instantiateFailed')
            })
          } else if (experienceInfo.message.indexOf('get app nodeport url failed.') !== -1) {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.getNodePortFailed')
            })
          } else if (experienceInfo.message.indexOf('get app url success.') !== -1) {
            setTimeout(() => this.changeDeploySecondStep(experienceInfo), 3000)
          } else {
            this.stepClean()
            this.$message({
              duration: 2000,
              type: 'warning',
              message: experienceInfo.message
            })
          }
        })
    },
    changeDeploySecondStep (experienceInfo) {
      this.isShowInstanceSecondStep = false
      this.isShowInstanceThirdStep = true
      this.isShowDeployFirstStep = false
      this.isShowDeploySecondStep = true
      this.deploymentBtnType = 'primary'
      setTimeout(() => this.changeDeployThirdStep(experienceInfo), 1000)
    },
    changeDeployThirdStep (experienceInfo) {
      this.isShowDeploySecondStep = false
      this.isShowDeployThirdStep = true
      if (experienceInfo.data) {
        let tmpExperienceData = experienceInfo.data
        this.filterExperienceInfo(tmpExperienceData)
        this.displayDom = true
      }
      this.handleUploadSuccess()
    },
    stepClean () {
      this.btnClean = true
      this.btnInstantiate = false
      this.isShowDeployThirdStep = false
      this.isShowDeployFirstStep = true
      this.btnType = 'info'
      this.isShowInstanceThirdStep = false
      this.isShowInstanceSecondStep = false
      this.isShowInstanceFirstStep = true
      this.instanceBtnType = 'info'
      this.TestNodeThirdStepFlag = false
      this.TestNodeFirstStepFlag = true
      this.deploymentBtnType = 'info'
    },
    getNodePort () {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('system.guestPrompt'))
      } else {
        this.goStep()
        this.btnInstantiate = true
        this.btnClean = false
      }
    },
    filterExperienceInfo (tmpExperienceData) {
      this.experienceData = []
      for (let item of tmpExperienceData) {
        let object = {
          serviceName: '',
          nodePort: '',
          mecHost: ''
        }
        object.serviceName = item.serviceName
        object.nodePort = item.nodePort === '' ? this.$t('promptMessage.uninvolved') : item.nodePort
        object.mecHost = item.mecHost
        this.experienceData.push(object)
      }
    },
    cleanTestEnv () {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('system.guestPrompt'))
      } else {
        appstoreApi.cleanTestEnv(this.packageId, this.userId, this.name, this.ip).then(
          (res) => {
            let result = res.data
            if (result) {
              this.stepClean()
              this.experienceData = []
              this.displayDom = false
              this.$message({
                duration: 2000,
                type: 'success',
                class: 'btnPasses',
                message: this.$t('promptMessage.cleanEnvSuccess')
              })
            } else {
              this.$message({
                duration: 2000,
                message: this.$t('promptMessage.cleanEnvFailed'),
                type: 'warning'
              })
            }
          })
      }
    },
    initStatus () {
      appstoreApi.getNodeStatus(this.packageId, this.userId, this.name, this.ip).then(
        (res) => {
          let experienceInfo = res.data
          this.initData(experienceInfo)
          if (experienceInfo.message.indexOf('please register host.') === -1) {
            this.initData(experienceInfo)
          }
        })
    },
    initData (experienceInfo) {
      if (experienceInfo.data) {
        let tmpExperienceData = experienceInfo.data
        this.filterExperienceInfo(tmpExperienceData)
        this.displayDom = true
        this.initeStatus()
      } else {
        this.btnInstantiate = false
        this.btnClean = true
      }
    },
    initeStatus () {
      this.btnInstantiate = true
      this.btnClean = false
      this.btnType = 'primary'
      this.instanceBtnType = 'primary'
      this.deploymentBtnType = 'primary'
      this.TestNodeFirstStepFlag = false
      this.isShowInstanceFirstStep = false
      this.isShowDeployFirstStep = false
      this.TestNodeSecondStepFlag = false
      this.isShowInstanceSecondStep = false
      this.isShowDeploySecondStep = false
      this.TestNodeThirdStepFlag = true
      this.isShowInstanceThirdStep = true
      this.isShowDeployThirdStep = true
    },
    handleUploadSuccess () {
      this.$message({
        duration: 2000,
        message: this.$t('promptMessage.getNodePortSuccess'),
        type: 'success'
      })
    }
  },
  watch: {
    appId (newVal, oldVal) {
      this.appId = newVal
    },
    packageId (newStr) {
      this.packageId = newStr
      if (this.packageId) {
        this.initStatus()
      }
    }
  },
  mounted () {
    this.experienceData = []
  }
}
</script>
<style lang="less">
.appShowOnline {
  margin: auto;
  border-radius: 16px;
  .show_app {
    .show_common {
      display: inline-block;
      width: 43%;
      margin-top: 20px;
      text-align: center;
      .show_btn{
        display: inline-block;
      }
    }
    .show_step{
      display: inline-block;
      width: 57%;
      .top_titile{
        font-size: 18px;
        font-weight: bold;
        color: #282B33;
        margin-bottom: 20px;
        margin-top: 35px;
      }
      .bottom_titile{
        font-size: 14px;
        font-weight: 400;
        color: #A680D7;
        margin-bottom: 20px;
      }
      .footer_title{
        width: 575px;
        .bottom_titile1{
        width: 20%;
        font-size: 18px;
        font-weight: bold;
        color: #282B33;
        }
        .el-upload__tip{
          width: 86%;
          font-size: 14px;
          font-weight: 400;
          color: #8E8E8E;
        }
      }
      .card_content{
        margin-left: 30px;
        margin-bottom: 20px;
        .line_top{
          background: url('../../../assets/images/appstore/startTry.png') left top no-repeat;
          .el-timeline-item__node{
            background: none;
          }
          .el-timeline-item__tail{
            top: 12px;
          }
        }
        .line_list{
          .el-timeline-item__node--normal{
            background: url('../../../assets/images/appstore/inprogressTry.png') left top no-repeat;
          }
        }
        .el-timeline-item__tail{
          border-left: 1px dashed #7093EF;
          left: 9px;
        }
        .el-timeline-item__node--normal{
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
.btnPasses{
  background: #fff !important;
  color:#67C23A !important;
}
</style>
