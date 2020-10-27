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
  <div class="toolreport">
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
          <el-col :span="3">
            {{ $t('workspace.sourceCodePath') }}
          </el-col>
          <el-col :span="7">
            /src
          </el-col>
          <el-col :span="3">
            {{ $t('workspace.compilerVersion') }}
          </el-col>
          <el-col :span="4">
            {{ taskInformation.compiler.type }} {{ taskInformation.compiler.version }}
          </el-col>
          <el-col :span="3">
            {{ $t('workspace.buildTools') }}
          </el-col>
          <el-col :span="4">
            {{ taskInformation.constructtool }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            {{ $t('workspace.compileCommand') }}
          </el-col>
          <el-col :span="7">
            {{ taskInformation.compilecommand }}
          </el-col>
          <el-col :span="3">
            {{ $t('workspace.targetOS') }}
          </el-col>
          <el-col :span="4">
            {{ taskInformation.targetos }}
          </el-col>
          <el-col :span="3">
            {{ $t('workspace.targetVersion') }}
          </el-col>
          <el-col :span="4">
            v{{ taskInformation.targetkernel }}
          </el-col>
        </el-row>
      </div>
      <div class="analysisResults">
        <h3>{{ $t('workspace.analysisResults') }}</h3>
        <el-row class="resultTitle">
          <el-col :span="12">
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
          <el-col :span="12">
            {{ analysisResults.codefileinfo.needtranscount }}
          </el-col>
        </el-row>
        <el-row
          class="show_result"
          v-if="!showicon"
        >
          <el-col
            :span="12"
            v-for="(item,index) in needMigrateFiles"
            :key="index"
            :title="item"
          >
            {{ item }}
          </el-col>
        </el-row>
        <el-row class="resultTitle">
          <el-col :span="12">
            <em class="result_hs" />{{ $t('workspace.codeCount') }}
          </el-col>
          <el-col :span="12">
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
        <el-button @click="downloadReport()">
          {{ $t('workspace.downloadReport') }}（.csv）
        </el-button>
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
    // 查询单个移植扫描任务信息
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
    // 下载报告
    downloadReport () {
      let reportId = this.reportId
      Plugin.downLoadReportApi(this.userId, reportId)
    },
    // 点击展开分析结果
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
  }
}
</style>
