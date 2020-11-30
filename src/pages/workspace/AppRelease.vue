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
  <div class="appRelease">
    <!-- 项目详情 -->
    <h3 class="title">
      {{ $t('workspace.projectDetails') }}
    </h3>
    <div
      class="project_detail"
      v-for="(item,index) in projectDetailData"
      :key="index"
    >
      <el-row>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('workspace.projectName') }}</span>{{ item.appName }}
        </el-col>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('test.testApp.type') }}</span>{{ item.type }}
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('workspace.version') }}</span>{{ item.version }}
        </el-col>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('workspace.architecture') }}</span>{{ item.architecture }}
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('workspace.dependentApp') }}</span>{{ item.service }}
        </el-col>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('workspace.instantiateId') }}</span>{{ item.instantiateId }}
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('workspace.deploymentPlatform') }}</span>{{ item.platform }}
        </el-col>
        <el-col
          :sm="10"
          :xs="24"
        >
          <span class="span_left">{{ $t('test.testTask.testStatus') }}</span>{{ item.status }}
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :sm="24"
        >
          <span class="span_left lt">{{ $t('workspace.applicationDesc') }}</span>
          <el-upload
            class="upload-demo clear"
            action=""
            :limit="1"
            :on-change="changeAppStoreMd"
            :on-exceed="handleExceed"
            :file-list="appMdList"
            :auto-upload="false"
            :on-remove="removeAppStoreMd"
            accept=".md"
          >
            <el-button
              slot="trigger"
              size="small"
              class="featuresBtn"
            >
              {{ $t('workspace.uploadFile') }}
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              <em class="el-icon-warning" />{{ $t('workspace.apiFunctionMd') }}
            </div>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <!-- 能力发布详情 -->
    <h3 class="title">
      {{ $t('workspace.releaseDetails') }}
    </h3>
    <div class="release_detail">
      <!-- 应用规则配置 -->
      <p>{{ $t('workspace.ruleConfig') }}</p>
      <el-tabs
        class="ruleconfig_tab"
      >
        <el-tab-pane :label="$t('workspace.trafficRules')">
          <el-button
            size="small"
            class="featuresBtn"
            @click="trafficDialog=true"
          >
            {{ $t('workspace.add')+$t('workspace.trafficRules') }}
          </el-button>
          <!-- 流量规则列表 -->
          <trafficeRulesList />
          <!-- 流量规则弹框 -->
          <div v-if="trafficDialog">
            <addTrafficRules
              v-model="trafficDialog"
              @closeFatherDialog="closeDialog"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('workspace.dnsRules')">
          <el-button
            size="small"
            class="featuresBtn"
            @click="dnsDialog=true"
          >
            {{ $t('workspace.add')+$t('workspace.dnsRules') }}
          </el-button>
          <!-- DNS规则列表 -->
          <dnsRulesList />
          <!-- DNS规则弹框 -->
          <div v-if="dnsDialog">
            <addDnsRules
              v-model="dnsDialog"
              @closeFatherDialog="closeDialog"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 应用服务发布配置 -->
      <p>{{ $t('workspace.appPublishConfig') }}</p>
      <el-button
        size="small"
        class="featuresBtn margin_top"
        @click="appPublishDialog=true"
      >
        {{ $t('workspace.add')+$t('workspace.applicationRelease') }}
      </el-button>
      <appPublishConfigList />
      <!-- 应用服务发布配置弹框 -->
      <div v-if="appPublishDialog">
        <addAppPublishConfig
          v-model="appPublishDialog"
          @closeFatherDialog="closeDialog"
        />
      </div>
    </div>
    <!-- 应用发布测试 -->
    <h3 class="title">
      {{ $t('workspace.releaseTest') }}
    </h3>
    <div class="release_test">
      <el-button
        size="small"
        class="featuresBtn"
        @click="appDetaildialog=true"
      >
        {{ $t('workspace.appDetails') }}
      </el-button>
      <el-button
        class="bgBtn btn_width1"
      >
        {{ $t('workspace.appTest') }}
      </el-button>
      <span class="release_text">
        {{ $t('workspace.releaseText') }}
      </span>
      <!-- 应用包详情弹框 -->
      <div v-if="appDetaildialog">
        <appPackageDetail
          v-model="appDetaildialog"
        />
      </div>
      <!-- 应用测试任务列表 -->
      <el-table
        :data="appTestData"
        style="width: 100%"
      >
        <el-table-column
          prop="taskNumber"
          :label="$t('test.testTask.taskNumber')"
          width="160px"
        />
        <el-table-column
          prop="appName"
          :label="$t('test.testTask.appName')"
        />
        <el-table-column
          prop="appVersion"
          :label="$t('test.testTask.version')"
        />
        <el-table-column
          prop="beginTime"
          :label="$t('test.testTask.startTime')"
        />
        <el-table-column
          :label="$t('test.testTask.testStatus')"
        >
          <template slot-scope="scope">
            <span
              class="el-icon-error failed icon"
              v-if="scope.row.status!=='Success'"
              title="In Progress"
            />
            <span
              v-else
              class="el-icon-success success icon"
              title="Completed"
            />
            <span :class="scope.row.status==='Success'?'success':'failed'">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('test.testTask.operation')"
        >
          <template slot-scope="scope">
            <el-link class="test_info">
              {{ $t('workspace.detail') }}
            </el-link>
            <el-button
              class="bgBtn"
              size="small"
              :disabled="scope.row.status==='Success'?false:true"
              @click="dialogAppPublicSuccess=true"
            >
              {{ $t('workspace.publish') }}
            </el-button>
            <!-- 应用发布成功弹框 -->
            <el-dialog
              :title="$t('workspace.applicationRelease')"
              :close-on-click-modal="false"
              :visible.sync="dialogAppPublicSuccess"
              width="40%"
              class="appPublishSuccess"
            >
              <p>{{ $t('workspace.appPublishSuccess') }}</p>
              <el-link
                :href="appStoreUrl"
                target="_blank"
                class="appstore_link"
                :underline="false"
              >
                {{ appStoreUrl }}
              </el-link>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="dialogAppPublicSuccess = false"
                  size="medium"
                  class="confirm"
                >{{ $t('common.confirm') }}</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { urlPrefix } from '../../tools/tool.js'
import addTrafficRules from './AddTrafficRules.vue'
import trafficeRulesList from './TrafficRulesList.vue'
import addDnsRules from './AddDnsRules.vue'
import dnsRulesList from './DnsRulesList.vue'
import addAppPublishConfig from './AddAppPublishConfig.vue'
import appPublishConfigList from './AppPublishConfigList.vue'
import appPackageDetail from './AppPackageDetails.vue'
export default {
  name: 'AppRelease',
  components: {
    addTrafficRules,
    trafficeRulesList,
    addDnsRules,
    dnsRulesList,
    addAppPublishConfig,
    appPublishConfigList,
    appPackageDetail
  },
  data () {
    return {
      projectDetailData: [
        {
          appName: 'Video_Surveillance_app',
          type: 'Video Application',
          version: 'v1.0',
          architecture: 'X86',
          service: 'Face Recognition',
          instantiateId: 'sdre635',
          platform: 'Kubernetes',
          status: 'Success'
        }
      ],
      appMdList: [],
      ifAppstore: true,
      ifApiPublic: false,
      appTestData: [{
        'taskNumber': 'MEC20201110001',
        'appName': 'zoneminder',
        'appVersion': 'v1.0',
        'beginTime': '2020-11-10',
        'status': 'Success'
      },
      {
        'taskNumber': 'MEC20201110001',
        'appName': 'zoneminder',
        'appVersion': 'v1.0',
        'beginTime': '2020-11-10',
        'status': 'Failed'
      }],
      appDetaildialog: false,
      trafficDialog: false,
      dnsDialog: false,
      appPublishDialog: false,
      dialogAppPublicSuccess: false,
      appStoreUrl: 'https://demo.appstore.edgegallery.org/'
    }
  },
  methods: {
    // 检查上传文件类型
    checkFileType (fileList, fileTypeArr, uploadFileList) {
      let checkPassed = true
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
        this.$message.warning(this.$t('promptMessage.checkFileType'))
        checkPassed = false
      }
      return checkPassed
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    // 上传应用描述文件
    changeAppStoreMd (file, fileList) {
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$message.warning(this.$t('promptMessage.fileNameType'))
        this.appMdList = []
      } else {
        this.appMdList.push(file.raw)
      }
      let fileTypeArr = ['md']
      let checkPassed = this.checkFileType(fileList, fileTypeArr)
      if (!checkPassed) {
        this.appMdList = []
      }
    },
    removeAppStoreMd (file, fileList) {
      this.appMdList = fileList
    },
    // 关闭弹框
    closeDialog (data) {
      this.trafficDialog = data
      this.dnsDialog = data
      this.appPublishDialog = data
    },
    getAppstoreUrl () {
      let currUrl = window.location.href
      if (currUrl.indexOf('30092') !== -1) {
        this.appStoreUrl = 'https://' + currUrl.split('//')[1].split(':')[0] + ':30091'
      } else {
        this.appStoreUrl = currUrl.replace('developer', 'appstore')
      }
    }
  },
  created () {
  },
  mounted () {
    this.getAppstoreUrl()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      let spanLeft = document.getElementsByClassName('span_left')
      if (language === 'en') {
        spanLeft.forEach(item => {
          item.style.width = 160 + 'px'
        })
      } else {
        spanLeft.forEach(item => {
          item.style.width = 95 + 'px'
        })
      }
    }
  }
}
</script>

<style lang="less">
.appRelease{
  .margin_top{
    margin-top: 20px;
  }
  .el-table td, .el-table th{
    padding: 2px 0;
    text-align: center;
    .icon{
      margin-right: 5px;
    }
    .test_info{
      color: #688ef3;
      margin-right: 15px;
    }
    .release_btn{
      display: inline-block;
      background: #0099cc;
      border: 1px solid #0099cc;
      min-width: 60px;
      padding: 6px 8px;
    }
    .is-disabled{
      background: #aaa;
      border: 1px solid #aaa;
    }
  }
  .el-table th{
    background:#f5f5f6;
    padding: 5px 0;
  }
  .el-button.margin_left{
    margin-left: 10px;
  }
  .project_detail{
    margin: 25px 0 40px;
    padding: 0 30px;
    font-size: 14px;
    .el-col{
      line-height: 28px;
      padding: 5px;
      .span_left{
        color: #adb0b8;
        display: inline-block;
        min-width: 95px;
        text-align: right;
        padding-right: 20px;
      }
      .upload-demo{
        display: inline-block;
      }
      .el-upload-list{
        float: left;
        width: 100%;
        text-align: left;
        .el-upload-list__item:first-child{
          width: 50%;
        }
      }
      .el-upload{
        float: left;
      }
      .el-upload__tip{
        float: left;
        margin: 0 0 0 15px;
        color: #adb0b8;
      }
      .el-button--primary{
        margin-top: 0;
      }
    }
  }
  .release_detail{
    margin-bottom: 20px;
    padding: 0 30px;
    .el-tabs{
      .addBtn{
        margin-left: 15px;
      }
      .el-tabs__item{
        height: 15px;
        line-height: 15px;
        padding: 0 30px 0 0;
        font-size: 14px;
        margin:0 30px 18px 0;
        border-right: 1px solid #ddd;
        border-radius: 0;
      }
      .el-tabs__item:last-child{
        border-right: 0;
      }
      .el-tabs__item.is-active{
        color: #688ef3;
      }
      .el-tabs__active-bar{
        height: 4px;
      }
      .el-tab-pane{
        padding: 24px 0;
      }
    }
    .el-table{
      margin-top: 20px;
    }
    .ruleconfig_tab{
      margin: 15px 0;
      .el-tabs__content{
        border: none;
      }
    }
    .el-upload{
      float: left;
      margin-right: 20px;
    }
    .el-button--primary{
      margin-top: 0;
    }
    .el-upload__tip{
      float: left;
      line-height: 26px;
      margin-top: 0;
    }
    .el-checkbox{
      margin-bottom: 5px;
    }
    .routeconfig_div{
      font-size: 13px;
      .el-col{
        padding: 10px 0;
      }
      .el-input{
        width: 150px;
        .el-input__inner{
          height: 25px;
        }
      }
      .el-select .el-input{
        width: 80px;
        .el-input__icon{
          width: 15px;
        }
        .el-input__inner{
          padding-right: 15px;
        }
        .el-input__suffix{
          top: 2px;
        }
      }
    }
  }
  .release_test{
    padding: 0 30px;
    .test{
      display: block;
    }
    .btn_width1{
      color: #fff;
      padding: 9px 15px;
      font-size: 12px;
      min-width: 100px;
    }
    .test.appdetails{
      background: #888;
      border: 1px solid #888;
    }
    .test.apptest{
      background: #0099cc;
      border: 1px solid #0099cc;
      margin: 15px 0;
    }
    .release_text{
      color: #adb0b8;
      font-size: 12px;
      margin-left: 10px;
    }
    .el-table{
      margin-top: 14px;
    }
    .el-table td{
        padding: 12px;
      }
    .appstore_link{
      background: #688ef3;
      color: #fff;
      padding: 5px 20px;
      margin-top: 15px;
      border-radius: 8px;
    }
    .appPublishSuccess{
      .el-dialog__body {
        padding: 50px;
        padding-top: 50px !important;
      }
      .el-dialog__close{
        display: none;
      }
      .el-dialog__header{
        text-align: left;
      }
    }
  }
}
</style>
