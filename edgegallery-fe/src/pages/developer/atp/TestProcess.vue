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
  <div class="padding_default">
    <div
      class="top-btn"
    >
      <el-button
        class="common-btn"
        @click="jumpToIncubation"
      >
        {{ $t('common.back') }}
      </el-button>
      <el-button
        class="common-btn"
        :disabled="report"
        @click="testAgain()"
      >
        {{ $t('atpTestProcess.testAgain') }}
      </el-button>
      <el-button
        class="common-btn"
        :disabled="report || allfailNum!==0"
        @click="publish()"
      >
        {{ $t('atpTestProcess.publish') }}
      </el-button>
      <el-button
        :disabled="report || userName==='guest'"
        class="common-btn"
        icon="el-icon-upload"
        size="small"
        @click="isUploadPdf=true"
      >
        {{ $t('atpTestProcess.uploadReport') }}
      </el-button>
      <el-button
        size="small"
        :disabled="report"
        id="back_button"
        class="common-btn"
        icon="el-icon-document"
        @click="jumpToReport()"
      >
        {{ $t('atpTestProcess.viewReport') }}
      </el-button>
    </div>
    <div
      class="testing-main"
      :class="isUploadPdf?'blur-bg':''"
    >
      <div
        class="process"
        id="process"
      >
        <div class="toptitle common-div-bg">
          <div class="left">
            <div class="left-text">
              <span v-if=" isTest === 'running'">{{ language==='cn' ? '正在测试...' : 'Testing...' }}</span>
              <span v-else>{{ language==='cn' ? '测试结果' : 'Test Results' }}</span>
            </div>
          </div>
          <div class="header">
            <el-progress
              :stroke-width="20"
              :percentage="percentage"
              :color="customColor"
              class="percenprocess"
            />
            <span
              class="testing-case point"
              v-if=" isTest === 'running' && !isManualTitle"
            >
              {{ language==='cn'?testingScene[0]:testingScene[1] }}
              <span
                v-show="!isManualTitle"
                style="margin-left:8px;"
              >: {{ language==='cn'?testingCase[0]:testingCase[1] }}</span>
            </span>
            <span
              v-show="isManualTitle && isTest === 'running'"
              class="waitManual"
            >{{ $t('atpTestProcess.waitManual') }}</span>
            <span
              v-if=" isTest !== 'running'"
              class="test-result"
              :class="{'testFailed': statusTitle[0]==='测试失败','testSuccessful': statusTitle[0]==='测试成功',}"
            >
              {{ language==='cn'?statusTitle[0]:statusTitle[1] }}
            </span>
            <span
              v-if="allfailNum!==0"
              class="findproblem point"
            >{{ $t('atpTestProcess.find') }}
              <em>
                {{ allfailNum }}
              </em>{{ $t('atpTestProcess.issue') }}</span>
          </div>
        </div>

        <div
          class="content common-div-bg"
          id="content"
        >
          <el-tabs
            v-model="activeNameTabs"
          >
            <el-tab-pane
              v-for="(item,index) in testScenarios"
              :key="index"
              :label="language==='cn'?item.nameCh:item.nameEn"
              :name="item.nameEn"
              class="tab-pan-height"
            >
              <el-collapse
                v-model="activeName"
                @change="handleChange"
              >
                <el-collapse-item
                  v-for="(suiteItem,dex) in item.testSuites"
                  :key="dex"
                  :title="language==='cn'?suiteItem.nameCh:suiteItem.nameEn"
                  :name="item.nameEn+suiteItem.nameEn"
                >
                  <el-table
                    :data="suiteItem.testCases"
                    header-cell-class-name="caseHearder"
                  >
                    <el-table-column
                      :label="$t('atpTestProcess.name')"
                      min-width="25%"
                    >
                      <template slot-scope="scope">
                        <img
                          class="testing-icon"
                          v-if="scope.row.result=='success'"
                          src="../../../assets/images/atp/testSuccessful.png"
                          alt=""
                        >
                        <img
                          v-else-if="scope.row.result=='failed'"
                          src="../../../assets/images/atp/testFailed.png"
                          alt=""
                        >
                        <img
                          v-else-if="scope.row.result=='running'"
                          src="../../../assets/images/atp/testing_icon.png"
                          alt=""
                          class="icon-loading"
                        >
                        <img
                          v-else
                          src="../../../assets/images/atp/wait_icon.png"
                          alt=""
                        >
                        {{ language==='cn'?scope.row.nameCh:scope.row.nameEn }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('atpTestProcess.type')"
                      min-width="15%"
                    >
                      <template slot-scope="scope">
                        {{ language==='en'?scope.row.type:scope.row.type==='automatic'?'自动化类型':'手动类型' }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('atpTestProcess.description')"
                      min-width="40%"
                    >
                      <template slot-scope="scope">
                        {{ language==='cn'?scope.row.descriptionCh:scope.row.descriptionEn }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-if="(authorities.indexOf('ROLE_ATP_ADMIN')!==-1)"
                      :label="$t('myApp.operation')"
                      min-width="20%"
                    >
                      <template slot-scope="scope">
                        <el-button
                          :disabled="scope.row.type==='automatic' || scope.row.result!=='running'"
                          type="text"
                          style="font-size:xx-large;"
                          class="el-icon-edit"
                          @click="modify(scope.row,item.id,suiteItem.id)"
                        />
                      </template>
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-dialog
          :title="$t('process.modifyStatus')"
          :visible.sync="dialogVisible"
          width="30%"
        >
          <el-form
            :model="form"
            label-width="100px"
          >
            <el-form-item
              :label="$t('atpTestProcess.name')"
            >
              <el-input
                width="100px"
                size="small"
                v-model="form.name"
              />
            </el-form-item>
            <el-form-item
              :label="$t('atpTestProcess.status')"
            >
              <el-select
                v-model="form.result"
                :placeholder="$t('atpTestProcess.choose')"
              >
                <el-option
                  label="success"
                  value="success"
                />
                <el-option
                  label="failed"
                  value="failed"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('atpTestProcess.failReason')"
            >
              <el-input
                type="textarea"
                autosize
                v-model="form.reason"
              />
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              size="small"
              @click="dialogVisible = false"
            >
              {{ $t('common.cancel') }}
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="confirmModify()"
            >
              {{ $t('common.confirm') }}
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <UploadSelfReportDig
      :is-upload-pdf="isUploadPdf"
      :task-id="taskId"
      @closeDig="closeDig"
    />
  </div>
</template>
<script>
import { atpApi } from '../../../api/atpApi.js'
import { applicationApi, atpTestApi } from '../../../api/developerApi.js'
import UploadSelfReportDig from './UploadSelfReportDlg.vue'
export default {
  name: 'TestProcess',
  components: { UploadSelfReportDig },
  data () {
    return {
      language: localStorage.getItem('language') || 'cn',
      report: true,
      isTest: '',
      statusTitle: [],
      percentage: 0,
      taskId: '',
      testingScene: [],
      testingCase: [],
      testScenarios: [],
      activeName: [],
      finishActiveName: [],
      activeNameTabs: '',
      interval: null,
      allfailNum: 0,
      hasFailActiveName: [],
      firstScene: '',
      form: {
        name: '',
        result: '',
        reason: ''
      },
      dialogVisible: false,
      userName: sessionStorage.getItem('userName'),
      authorities: [],
      alltestCase: [],
      scoreColor: '',
      isUploadPdf: false,
      customColor: '#ad4bc9cc',
      isManualTitle: false,
      uploadUser: '',
      applicationId: sessionStorage.getItem('applicationId')
    }
  },
  mounted () {
    this.getTaskId()
  },
  methods: {
    getTaskId () {
      atpTestApi.getTestId(this.applicationId).then(res => {
        if (res.data.length > 0) {
          this.taskId = res.data[0].id
        } else {
          this.taskId = this.$route.query.taskId
        }
        this.getTaskProcess()
        this.interval = setInterval(() => {
          this.getTaskProcess()
        }, 1000)
      })
    },
    testAgain () {
      this.$router.push('/EG/developer/selectScenarios')
    },
    publish () {
      let _parameter = {
        free: true,
        price: 0
      }
      applicationApi.publishApp(this.applicationId, _parameter).then(res => {
        this.$message.success(this.$t('atpTestProcess.publishSuc'))
        this.handleCurrentAppStatus()
      }).catch(() => {
        this.$message.success(this.$t('atpTestProcess.publishFail'))
      })
    },
    handleCurrentAppStatus () {
      let _currentAppList = JSON.parse(sessionStorage.getItem('currentAppList'))
      let _currentApplicationId = sessionStorage.getItem('currentApplicationId')
      if (_currentAppList && _currentApplicationId) {
        applicationApi.getAppInfo(_currentApplicationId).then(response => {
          _currentAppList.forEach(item => {
            if (item.id === _currentApplicationId) {
              item.status = response.data.status
            }
          })
          this.$store.commit('currentAppList', _currentAppList)
          this.$store.commit('changeFlow', '5')
          this.$router.push('/EG/developer/home')
        })
      }
    },
    closeDig () {
      this.isUploadPdf = false
    },
    jumpToIncubation () {
      this.$router.push('/EG/developer/home')
    },
    jumpToReport () {
      this.$router.push({ path: '/EG/developer/testReport', query: { taskId: this.taskId } })
    },
    handleChange (val) {
      this.activeName = val
    },
    getTaskProcess () {
      atpApi.getTaskApi(this.taskId).then(res => {
        let data = res.data.data.testScenarios
        let taskStatus = res.data.data.status
        this.uploadUser = res.data.data.user.userName
        let reportPath = res.data.data.hasOwnProperty('reportPath')
        this.testScenarios = data
        this.setCollaspe()
        this.setCollaspe = function () {}
        this.hasFailActiveName = []
        this.finishActiveName = []
        this.firstScene = data[0].nameEn
        this.alltestCase = []
        let allsuccessNum = 0
        let allfailNum = 0
        let allNum = 0
        data.forEach(element => {
          element.testSuites.forEach(ele => {
            this.finishActiveName.push(element.nameEn + ele.nameEn)
            ele.testCases.forEach(item => {
              this.alltestCase.push(item)
              allNum++
              if (item.result === 'success') {
                allsuccessNum++
              } else if (item.result === 'failed') {
                allfailNum++
                this.hasFailActiveName.push(element.nameEn + ele.nameEn)
              } else if (item.result === 'running') {
                this.activeNameTabs = element.nameEn
                if (item.type === 'automatic') {
                  this.testingCase = [item.nameCh, item.nameEn]
                  this.testingScene = [element.nameCh, element.nameEn]
                }
              }
            })
          })
        })
        this.percentage = Number(((allsuccessNum + allfailNum) / allNum * 100).toFixed(0))
        this.allfailNum = allfailNum
        this.isFinish(reportPath)
        this.setTitle(taskStatus, data)
        this.isManualPrompt()
        this.setDivHeight()
      }).catch(() => {
        this.$message({
          duration: 2000,
          showClose: true,
          type: 'warning',
          message: this.$t('atpPromptMessage.getprocessFail')
        })
        this.clearInterval()
      })
    },
    isFinish (reportPath) {
      if (this.percentage === 100) {
        this.report = false
        this.isTest = 'finished'
        this.activeNameTabs = this.firstScene
        this.activeName = this.finishActiveName
        this.clearInterval()
        if (!reportPath && this.uploadUser === this.userName && this.userName !== 'guest') {
          this.isUploadPdf = true
        }
      } else {
        this.statusTitle = ['正在测试...', 'Testing...']
        this.isTest = 'running'
      }
    },
    setTitle (taskStatus, data) {
      if (taskStatus === 'success') {
        this.scoreColor = 'successScoreColor'
        this.statusTitle = ['测试成功', 'Test Successful']
      } else if (taskStatus === 'failed') {
        this.scoreColor = 'failScoreColor'
        this.statusTitle = ['测试失败', 'Test Failed']
      }
    },
    promptWait () {
      this.isManualTitle = true
      this.activeName = this.finishActiveName
      this.$message({
        offset: 200,
        duration: 5000,
        showClose: true,
        type: 'success',
        message: this.$t('atpPromptMessage.manualTip')
      })
    },
    isManualPrompt () {
      let everyBoolan = this.alltestCase.some(function (item) {
        return (item.result === 'running' && item.type === 'manual')
      })
      let automaticBoolan = this.alltestCase.some(function (item) {
        return ((item.result === 'running' || item.result === 'waiting') && item.type === 'automatic')
      })
      if (everyBoolan && !automaticBoolan && this.percentage !== 100) {
        this.promptWait()
        this.promptWait = function () { }
      }
    },
    setCollaspe () {
      this.testScenarios.forEach(element => {
        element.testSuites.forEach(ele => {
          this.activeName.push(element.nameEn + ele.nameEn)
        })
      })
    },
    setDivHeight () {
      this.$nextTick(() => {
        const processcDiv = document.getElementById('process')
        const appDiv = document.getElementById('app')
        const content = document.getElementById('content')
        processcDiv.style.maxHeight = appDiv.clientHeight - 207 + 'px'
        content.style.maxHeight = appDiv.clientHeight - 402 + 'px'
      })
    },
    modify (row, testScenarioId, testSuiteId) {
      this.dialogVisible = true
      this.form.testCaseId = row.id
      this.form.testSuiteId = testSuiteId
      this.form.testScenarioId = testScenarioId
      this.form.name = this.language === 'cn' ? row.nameCh : row.nameEn
    },
    confirmModify () {
      this.dialogVisible = false
      let param = [{
        testScenarioId: this.form.testScenarioId,
        testSuiteId: this.form.testSuiteId,
        testCaseId: this.form.testCaseId,
        result: this.form.result,
        reason: this.form.reason
      }]
      atpApi.modifyStatusApi(this.taskId, param).then(res => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('atpPromptMessage.modifySuccess'),
          type: 'success'
        })
        this.getTaskProcess()
      })
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getTaskProcess()
    }
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>
<style lang="less">
.testing-main{
  .process{
      min-width: 660px;
      display: block;
    .toptitle{
      margin-bottom: 25px;
      padding: 18px 45px;
      .left{
        .left-text{
          position: relative;
          z-index: 2;
          border-radius: 12px;
          height: 47px;
          font-size: 26px;
        }
        .left-text::before{
          display: inline-block;
          content: '';
          width: 9px;
          height: 9px;
          background: #76E1E9;
          border-radius: 50%;
          position: relative;
          top: -2px;
          left: -15px;
        }
      }
      .header{
        .title{
          position: relative;
          z-index: 100;
          span{
            color: #333333;
            font-size: 28px;
            font-weight: bolder;
          }
        }
        .percenprocess{
            display: flex;
            align-items: center;
            margin: 10px 0;
            .el-progress-bar{
              padding-right: 15%;
            }
            .el-progress__text{
              font-family: defaultFontBold, Arial, Helvetica, sans-serif;
              font-size: 30px !important;
              color: #fff;
              margin-left: -30px;
            }
            .el-progress-bar__outer{
              border: solid 3px #ddd8d8;
            }
        }
        .point::before{
          content: '';
          display:inline-block;
          width:6px;
          height:6px;
          border-radius: 50%;
          margin-right: 11px;
          background-color: #fff;
          position: absolute;
          top: 7px;
          left: -15px;
        }
          .testing-case{
            position: relative;
            color: #fff;
            font-size: 16px;
            margin-left: 20px;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          }
          .test-result{
            position: relative;
            font-family: defaultFontBold, Arial, Helvetica, sans-serif;
            font-size: 24px;
            color: #FFF;
            margin-left: 40px;
          }
          .waitManual{
            font-family: defaultFontBold, Arial, Helvetica, sans-serif;
            font-size: 16px;
            color: #fff;
          }
          .testFailed::before{
            content: '';
            display:inline-block;
            width:30px;
            height:30px;
            background-image: url('../../../assets/images/atp/test_failed.png');
            background-position: center;
            background-size: 100% 100%;
            position: absolute;
            left: -40px;
          }
          .testSuccessful::before{
            content: '';
            display:inline-block;
            width:30px;
            height:30px;
            background-image: url('../../../assets/images/atp/test_successful.png');
            background-position: center;
            background-size: 100% 100%;
            position: absolute;
            left: -40px;
          }
          .findproblem{
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            position: relative;
            font-size: 16px;
            color: #fff;
            margin-left: 120px;
            em{
              padding: 0 5px;
              margin: 0 5px;
              background-color: #9987ec;
              border-radius: 50%;
              width: 20px;
              height: 20px;
              color: #fff;
              font-size: 16px;
            }
          }
      }
    }

    .icon-loading{
      animation: rotate 2s infinite linear ;
    }
        @keyframes rotate {
          from {
              transform: rotate(0deg);
          }
          to {
              transform: rotate(360deg);
          }
      }
      @keyframes rotateinside {
          from {
              transform: rotate(360deg);
          }
          to {
              transform: rotate(0deg);
          }
      }
    .content{
      padding: 20px 45px;
      .el-tabs__header{
        margin: 0;
        border: none;
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        .el-tabs__nav,.el-tabs__item{
          border: none;
        }
        .el-tabs__item{
          color: #fff;
          font-size: 16px;
        }
        .el-tabs__item.is-active{
          font-size: 20px;
          font-family: defaultFont, Arial, Helvetica, sans-serif;
        }
        .el-tabs__active-bar{
          background-color: #6A52CA;
        }
      }
      .el-tabs__content{
        padding: 35px 0;
      }
      .el-collapse {
        border: none;
        padding: 0;
        .el-collapse-item {
          margin-bottom: 15px;
          .el-collapse-item__content{
            padding: 0;
          }
          .el-collapse-item__header{
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            height: 40px;
            padding-left: 15px;
            font-size: 19px;
            color: #fff;
            background-color: #5F499D;
            border-radius: 19.5px;
            border: none;
          }
          .el-collapse-item__wrap{
            padding-left: 15px;
            background-color: transparent;
            border: none;
          }
          .caseHearder{
            background-color: transparent;
            color: #fff;
            padding: 0 10px;
            height: 35px;
            line-height: 35px;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            font-size: 16px;
          }
          .testing-icon{
            margin-top: -5px;
          }
          .el-table tr {
            height: 37px;
            background-color: transparent;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            font-size: 16px;
          }
          .el-table td{
            padding: 0 10px;
            color: #fff;
            vertical-align: top;
            height: 37px;
            line-height: 37px;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            font-size: 16px;
          }
          .el-table__body{
            .cell{
              padding-top: 5px;
            }
          }
         .el-table::before {
          width: 0;
        }
        .el-table{
          background-color: transparent;
          .cell{
            display: table-cell;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            font-size: 16px;
            img{
              vertical-align: middle;
              margin-right: 10px;
              width: 20px;
              height: 20px;
            }
          }
        }
        }
      }
    }
  }
    .el-tooltip__popper.is-light{
      border: 1px solid #688ef3!important;
    }

}
.top-btn{
  padding: 30px 0 20px;
  text-align:right;
}
.blur-bg{
  filter: blur(5px);
}
</style>
