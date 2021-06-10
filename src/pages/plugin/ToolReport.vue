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
  <div class="toolreport padding_default">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/list' }">
        {{ $t('breadCrumb.devTools') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/toolchain' }">
        {{ $t('workspace.toolChain') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('workspace.historicalReport') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="toolreport-main"
      v-loading="reportLoading"
      :element-loading-text="$t('promptMessage.loadingText')"
    >
      <p class="title">
        {{ reportId }}
      </p>
      <h2 class="reportname">
        {{ reportId }}
      </h2>
      <div class="codeInfo">
        <el-row>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            {{ $t('workspace.sourceCodePath') }}
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            ： /src
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            {{ $t('workspace.compilerVersion') }}
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            ： {{ taskInformation.compiler.type }}gcc {{ taskInformation.compiler.version }}4.8.5
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            {{ $t('workspace.buildTools') }}
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            ： {{ taskInformation.constructtool }}make
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            {{ $t('workspace.compileCommand') }}
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            ： {{ taskInformation.compilecommand }}make
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            {{ $t('workspace.targetOS') }}
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            ： {{ taskInformation.targetos }}centos7.6
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            {{ $t('workspace.targetVersion') }}
          </el-col>
          <el-col
            :md="4"
            :sm="6"
            :xs="6"
          >
            ： v{{ taskInformation.targetkernel }}v4.14.0
          </el-col>
        </el-row>
      </div>
      <div class="analysisResults">
        <h3>{{ $t('workspace.analysisResults') }}</h3>
        <el-row class="resultTitle">
          <el-col
            :sm="12"
            :xs="24"
          >
            <em
              class="show_icon"
              v-if="showicon"
              @click="showIcon"
            /><em
              class="hide_icon"
              v-else
              @click="hideIcon"
            />
            <em class="result_yz" />{{ $t('workspace.needtranscount') }}
          </el-col>
          <el-col
            :sm="12"
            :xs="24"
          >
            {{ analysisResults.codefileinfo.needtranscount }}
          </el-col>
        </el-row>
        <el-row
          class="show_result"
          v-if="!showicon"
        >
          <el-col
            :sm="12"
            :xs="24"
            v-for="(item,index) in needMigrateFiles"
            :key="index"
            :title="item"
          >
            {{ item }}
          </el-col>
        </el-row>
        <el-row class="resultTitle">
          <el-col
            :sm="12"
            :xs="24"
          >
            <em class="result_hs" />{{ $t('workspace.codeCount') }}
          </el-col>
          <el-col
            :sm="12"
            :xs="24"
          >
            {{ $t('workspace.makefileSourceCode') }}：{{ analysisResults.codelines }}{{ $t('workspace.lines') }}  {{ $t('workspace.assemblyCode') }}：{{ analysisResults.asmlines }}{{ $t('workspace.lines') }}
          </el-col>
        </el-row>
      </div>
      <div
        class="reportPromt"
        v-if="reportPromt"
      >
        {{ $t('workspace.reportPromt') }}
      </div>
      <p class="downloadBtn">
        <el-link
          :href="downloadReport()"
          :underline="false"
        >
          {{ $t('workspace.downloadReport') }}（.csv）
        </el-link>
      </p>
    </div>
  </div>
</template>
<script>
import { Plugin } from '../../tools/api.js'
export default {
  name: 'Toolreport',
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      reportId: sessionStorage.getItem('reportId'),
      reportLoading: true,
      taskInformation: {
        compiler: {}
      },
      analysisResults: {
        codefileinfo: {}
      },
      showicon: true,
      needMigrateFiles: [],
      reportPromt: false
    }
  },
  mounted () {
    this.getTaskInformation()
  },
  methods: {
    // Look up certain scan task info
    getTaskInformation () {
      Plugin.getTaskInformationApi(this.userId, this.reportId, '', 'toolchain').then(res => {
        if (res.status === 200) {
          if (res.data.status === 0) {
            this.reportPromt = false
            this.taskInformation = res.data.data.info
            this.analysisResults = res.data.data.portingresult
            this.needMigrateFiles = res.data.data.portingresult.codefileinfo.files
          } else {
            this.reportPromt = true
          }
          this.reportLoading = false
        }
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.reportLoading = false
        }, 2000)
      })
    },
    // Download report
    downloadReport () {
      let reportId = this.reportId
      return Plugin.downLoadReportApi(this.userId, reportId)
    },
    // Click to expand analysis result
    showIcon () {
      this.showicon = false
    },
    hideIcon () {
      this.showicon = true
    }
  }
}
</script>
<style lang='less'>
.toolreport{
  font-size: 14px;
  .toolreport-main{
    padding:40px;
    background: #fff;
  }
  .title{
    em{
      color: #409EFF;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .reportname{
    text-align: center;
    font-weight: normal;
  }
  .codeInfo{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1);
    padding: 20px;
    margin: 30px 0;
    .el-row{
      padding: 10px 0;
    }
    .el-col{
      height: 36px;
      line-height: 18px;
    }
    .el-col:nth-child(odd){
      text-align: right;
    }
    .el-col:nth-child(even){
      padding-left: 5px;
    }
    @media screen and (max-width:580px){
      .el-col-xs-6{
        width: 50%;
      }
      .el-col:nth-child(odd){
        text-align: left;
      }
    }
  }
  .analysisResults{
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1);
    padding: 20px;
    h3{
      font-weight: normal;
      margin-bottom: 20px;
      font-size: 16px;
    }
    .el-row{
      padding: 0 3%;
    }
    .resultTitle{
      margin-bottom: 20px;
      .el-col{
        height: 30px;
        line-height: 30px;
      }
      em{
        float: left;
        width: 20px;
        height: 30px;
        margin-right: 10px;
      }
    }
    .result_yl{
      background: url('../../assets/images/reportresult1.png') center center no-repeat;
    }
    .result_yz{
      background: url('../../assets/images/reportresult2.png') center center no-repeat;
    }
    .result_hs{
      background: url('../../assets/images/reportresult3.png') center center no-repeat;
    }
    em.show_icon{
      background: url('../../assets/images/reportresult4.png') center center no-repeat;
      margin-left: -20px;
      margin-right: 0px;
      cursor: pointer;
    }
    em.hide_icon{
      background: url('../../assets/images/reportresult5.png') center center no-repeat;
      margin-left: -20px;
      margin-right: 0px;
      cursor: pointer;
    }
    .show_result{
      padding: 20px;
      margin: 10px 3%;
      border-left: 2px solid #6c92fa;
      .el-col{
        padding-right: 30px;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .downloadBtn{
    text-align: center;
    margin-top: 25px;
    a{
      color: #6c92fa;
      border: 1px solid #6c92fa;
      padding: 5px;
    }
  }
}
</style>
