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
  <div class="report">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/test/how' }">
        {{ $t('breadCrumb.test') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item><a>{{ $t('breadCrumb.testReport') }}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="report_main">
      <div class="report-tap">
        <h3>VR1.0.2test Report</h3>
        <p>{{ $t('test.testTask.report.ticket') }}: {{ taskNo }}</p>
      </div>
      <div class="title">
        {{ $t('test.testTask.report.basicInfo') }}
      </div>
      <div class="report-app--info">
        <el-row :gutter="20">
          <el-col
            :span="22"
            class="app-table"
          >
            <el-table
              :data="reportData"
              border
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="appName"
                :label="$t('test.testTask.appName')"
                width="200"
              />
              <el-table-column
                prop="appVersion"
                :label="$t('test.testTask.version')"
                width="120"
              />
              <el-table-column
                prop="appName"
                :label="$t('test.testTask.report.packageName')"
              />
              <el-table-column
                prop="task.beginTime"
                :label="$t('test.testTask.startTime')"
                width="180"
              />
              <el-table-column
                prop="task.endTime"
                :label="$t('test.testTask.endTime')"
                width="180"
              />
              <el-table-column
                :label="$t('test.testTask.report.status')"
                width="180"
              >
                <template slot-scope="scope">
                  <span
                    class="el-icon-loading primary"
                    v-if="scope.row.task.status!=='COMPLETED'"
                    title="In Progress"
                  />
                  <span
                    v-else
                    class="el-icon-success success"
                    title="Completed"
                  />
                  <span :class="scope.row.task.status==='COMPLETED'?'success':'failed'">{{ scope.row.task.status }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="title">
        {{ $t('test.testTask.report.details') }}
      </div>
      <div class="report-chart">
        <el-row :gutter="20">
          <el-col
            :span="12"
            class="chartPie"
          >
            <ve-pie :data="chartData1" />
          </el-col>
          <el-col
            :span="12"
            class="chartLine"
          >
            <ve-line :data="chartData2" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data () {
    return {
      reportData: [],
      taskNo: '',
      chartData1: {
        columns: ['status', 'case'],
        rows: [
          { 'status': 'pass', 'case': 4 },
          { 'status': 'failed', 'case': 1 }
        ]
      },
      chartData2: {
        columns: ['CPU', 'storage', 'GPU'],
        rows: [
          { 'CPU': '2', 'storage': 1393, 'GPU': 3 },
          { 'CPU': '4', 'storage': 1393, 'GPU': 4 },
          { 'CPU': '3', 'storage': 1393, 'GPU': 5 }
        ]
      }
    }
  },
  mounted () {
    this.reportData.push(JSON.parse(sessionStorage.getItem('taskData')))
    this.taskNo = this.reportData[0].task.taskNo
  },
  methods: {}
}
</script>

<style lang='less'>
.report{
  .report_main{
    background-color: #fff;
    padding: 40px;
  }
  .report-tap{
    h3{
      text-align:center;
      margin-bottom: 10px;
    }
    p{
      color:#3399FF;
      text-align: center;
    }
  }
  .app-img{
    text-align: center;
    border:1px solid #ddd;
    border-right:0;
    height:97px;
    img{
      width:85px;
    }
  }
  .app-table{
    padding-left:0!important;
    .success{
      color: #3399FF;
    }
    span::before{
      margin-right: 5px;
    }
  }
  .title{
    margin:15px 0;
  }
  .title::before{
    content:'';
    display: inline-block;
    width:3px;
    background:#3399FF;
    height:20px;
    position: relative;
    top:5px;
  }
  .report-chart{
    margin-top:25px;
  }
  .app-table{
    margin-left:25px;
  }
}

</style>
