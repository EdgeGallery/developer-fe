<template>
    <div class="toolreport" v-loading="reportLoading" :element-loading-text="$t('promptMessage.loadingText')">
      <p class="title"><i class="el-icon-arrow-left" @click="returnAnalysis"></i>{{reportId}}</p>
      <h2 class="reportname">{{reportId}}</h2>
      <div class="codeInfo">
        <el-row>
            <el-col :span="3">{{$t('workspace.sourceCodePath')}}</el-col>
            <el-col :span="7">/src</el-col>
            <el-col :span="3">{{$t('workspace.compilerVersion')}}</el-col>
            <el-col :span="4">{{compilerType}} {{compilerVersion}}</el-col>
            <el-col :span="3">{{$t('workspace.buildTools')}}</el-col>
            <el-col :span="4">{{taskInformation.constructtool}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="3">{{$t('workspace.compileCommand')}}</el-col>
            <el-col :span="7">{{taskInformation.compilecommand}}</el-col>
            <el-col :span="3">{{$t('workspace.targetOS')}}</el-col>
            <el-col :span="4">{{taskInformation.targetos}}</el-col>
            <el-col :span="3">{{$t('workspace.targetVersion')}}</el-col>
            <el-col :span="4">v{{taskInformation.targetkernel}}</el-col>
        </el-row>
      </div>
      <div class="analysisResults">
          <h3>{{$t('workspace.analysisResults')}}</h3>
          <el-row class="resultTitle">
            <el-col :span="12">
              <i class="show_icon" v-if="showicon" @click="showIcon"></i><i class="hide_icon" v-else @click="hideIcon"></i>
              <i class="result_yz"></i>{{$t('workspace.needtranscount')}}
            </el-col>
            <el-col :span="12">{{needtranscount}}</el-col>
          </el-row>
          <el-row class="show_result" v-if="!showicon">
            <el-col :span="12" v-for="(item,index) in needMigrateFiles" :key="index" :title="item">{{item}}</el-col>
          </el-row>
          <el-row class="resultTitle">
            <el-col :span="12"><i class="result_hs"></i>{{$t('workspace.codeCount')}}</el-col>
            <el-col :span="12">{{$t('workspace.makefileSourceCode')}}：{{analysisResults.codelines}}{{$t('workspace.lines')}}  {{$t('workspace.assemblyCode')}}：{{analysisResults.asmlines}}{{$t('workspace.lines')}}</el-col>
          </el-row>
      </div>
      <p class="downloadBtn"><el-button @click="clickdownLoadReport()">{{$t('workspace.downloadReport')}}（.csv）</el-button></p>
    </div>
</template>
<script>
import { Get, downLoadReport } from '../../../tools/tool.js'
export default {
  name: 'toolreport',
  data () {
    return {
      projectId: sessionStorage.getItem('mecDetailID'),
      reportId: sessionStorage.getItem('reportId'),
      reportLoading: true,
      taskInformation: {},
      compilerType: '',
      compilerVersion: '',
      analysisResults: {},
      needtranscount: '',
      showicon: true,
      needMigrateFiles: []
    }
  },
  mounted () {
    this.getTaskInformation()
  },
  methods: {
    returnAnalysis () {
      this.$emit('isViewReport', false)
      sessionStorage.setItem('reportId', '')
    },
    // 查询单个移植扫描任务信息
    getTaskInformation () {
      Get('mec/toolchain/v1/porting/' + this.projectId + '/tasks/' + this.reportId, '', 'toolchain').then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.taskInformation = res.data.data.info
          // console.log(this.taskInformation)
          this.compilerType = this.taskInformation.compiler.type
          this.compilerVersion = this.taskInformation.compiler.version
          this.analysisResults = res.data.data.portingresult
          this.needtranscount = res.data.data.portingresult.codefileinfo.needtranscount
          this.needMigrateFiles = res.data.data.portingresult.codefileinfo.files
          // console.log(this.analysisResults)
          this.reportLoading = false
        }
      })
    },
    // 下载报告
    clickdownLoadReport () {
      let reportId = this.reportId
      let url = 'mec/toolchain/v1/porting/' + this.projectId + '/tasks/' + reportId + '/download'
      downLoadReport({ url, reportId })
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
  padding: 0 5%;
  font-size: 14px;
  .title{
    i{
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
    margin: 30px 0 15px;
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
      i{
        float: left;
        width: 20px;
        height: 30px;
        margin-right: 10px;
      }
    }
    .result_yl{
      background: url('../../../assets/images/reportresult1.png') center center no-repeat;
    }
    .result_yz{
      background: url('../../../assets/images/reportresult2.png') center center no-repeat;
    }
    .result_hs{
      background: url('../../../assets/images/reportresult3.png') center center no-repeat;
    }
    i.show_icon{
      background: url('../../../assets/images/reportresult4.png') center center no-repeat;
      margin-left: -20px;
      margin-right: 0px;
      cursor: pointer;
    }
    i.hide_icon{
      background: url('../../../assets/images/reportresult5.png') center center no-repeat;
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
