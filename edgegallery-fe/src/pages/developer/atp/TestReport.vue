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
  <div
    class="report padding_default"
  >
    <div
      class="report-content"
      id="pdfDom"
    >
      <div class="logo">
        <h3> EdgeGallery测试认证报告</h3>
        <div>
          <el-button
            class="test-btn"
            @click="back()"
          >
            返回
          </el-button>
          <el-button
            v-if="downloadBtn"
            class="test-light-btn"
            icon="el-icon-download"
            @click="downLoadReport()"
          >
            下载报告
          </el-button>
        </div>
      </div>
      <div class="baseInfo common-div-bg">
        <div class="title">
          <div class="title-text">
            <span class="titletext">
              基本信息
            </span>
          </div>
        </div>
        <div class="report-app-info">
          <el-table
            class="common-table"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="appName"
              label="应用名称"
            />
            <el-table-column
              prop="appVersion"
              label="版本"
            />
            <el-table-column
              prop="providerId"
              label="供应商"
            />
            <el-table-column
              prop="user.userName"
              label="上传人"
            />
            <el-table-column
              prop="createTime"
              label="提交时间"
            />
            <el-table-column
              prop="endTime"
              label="结束时间"
            />
            <el-table-column
              label="测试结果"
              width="180"
            >
              <template slot-scope="scope">
                <span
                  :class="scope.row.status==='success'?'success':'failed'"
                >{{ scope.row.status }}</span>
              </template>
            </el-table-column>
          </el-table>
          <img
            :src="resultIcon"
            alt=""
            class="resulticon"
          >
        </div>
      </div>
      <div class="report-chart">
        <div
          class="left common-div-bg"
          id="chartwidth"
        >
          <div class="title">
            <div class="title-text">
              <span class="titletext">
                场景用例分布
              </span>
            </div>
          </div>
          <div
            class="sumchart"
            id="leftchart"
          />
        </div>
        <div
          class="right common-div-bg"
          id="chartwidth"
        >
          <div class="title">
            <div class="title-text">
              <span class="titletext">
                测试用例成功率
              </span>
            </div>
          </div>
          <div
            class="detailchart"
            id="rightchart"
          />
        </div>
      </div>
      <div class="report-detail common-div-bg">
        <div class="title">
          <div class="title-text">
            <span
              class="titletext"
            >
              测试用例详情
            </span>
          </div>
        </div>
        <div
          v-for="(item,index) in testScenarios"
          :key="index"
          class="detail-content"
        >
          <div>
            <span class="scene">{{ language==='cn'?item.nameCh:item.nameEn }}</span>
          </div>
          <el-collapse
            v-model="activeNameList"
          >
            <el-collapse-item
              v-for="(suiteItem,dex) in item.testSuites"
              :key="dex"
              :title="language==='cn'?suiteItem.nameCh:suiteItem.nameEn"
              :name="item.nameEn+suiteItem.nameEn"
            >
              <el-table
                class="common-table"
                :data="suiteItem.testCases"
                header-cell-class-name="tableheaderStyle"
              >
                <el-table-column
                  label="用例名称"
                >
                  <template slot-scope="scope">
                    {{ language==='cn'?scope.row.nameCh:scope.row.nameEn }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="result"
                  label="结果"
                />
                <el-table-column
                  prop="reason"
                  label="失败原因"
                />
                <el-table-column
                  label="类型"
                >
                  <template slot-scope="scope">
                    {{ language==='en'?scope.row.type:scope.row.type==='automatic'?'自动化类型':'手动类型' }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="描述"
                  width="500"
                >
                  <template slot-scope="scope">
                    {{ language==='cn'?scope.row.descriptionCh:scope.row.descriptionEn }}
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <div v-if="pdfShow">
      <p
        class="reportTitle"
      >
        {{ $t('userpage.applicationReport') }}
      </p>
      <div
        class="pdf-main"
        v-show="printShow"
      >
        <div class="totalnum">
          <span class="curp"> {{ $t('userpage.pageNum') }}:{{ pageNum }}/{{ pageTotalNum }}</span>
        </div>
        <div class="pdf-content">
          <div class="pagearrow">
            <span
              class="el-icon-arrow-left"
              @click.stop="prePage"
            />
          </div>
          <div
            class="pdf"
          >
            <pdf
              ref="pdf"
              :src="pdfUrl"
              :page="pageNum"
              @num-pages="pageTotalNum=$event"
              @error="pdfError($event)"
              @link-clicked="page = $event"
            />
          </div>
          <div class="pagearrow">
            <span
              class="el-icon-arrow-right"
              @click.stop="nextPage"
            />
          </div>
        </div>
      </div>
      <div
        v-show="!printShow"
      >
        <pdf
          v-for="i in numPages"
          :key="i"
          :src="pdfUrl"
          :page="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { atpApi } from '../../../api/atpApi.js'
import pdf from 'vue-pdf'
import { formatDateTime } from '../../../tools/common.js'

export default {
  name: 'TestReport',
  components: {
    pdf
  },
  data () {
    return {
      testScenarios: [],
      language: 'cn',
      activeNameList: [],
      resultIcon: '',
      htmlTitle: '',
      currUrl: window.location.href,
      taskId: this.$route.query.taskId,
      scenarioId: '',
      tableData: [],
      chartData: [],
      finishActiveNameList: [],
      downloadBtn: true,
      pdfUrl: '',
      pdfShow: true,
      printShow: true,
      pageNum: 1,
      pageTotalNum: 1,
      numPages: 1
    }
  },
  mounted () {
    this.getReport()
  },
  methods: {
    back () {
      this.$router.push('/EG/developer/testProcess')
    },
    getReport () {
      atpApi.getTaskApi(this.taskId).then(res => {
        let data = res.data.data
        // pdf report
        if (data.reportPath) {
          this.pdfShow = true
          this.pdfUrl = this.currUrl.split('#')[0] + 'mec-atp' + data.reportPath
          this.getNumPages(this.pdfUrl)
        } else {
          this.pdfShow = false
        }
        this.htmlTitle = data.id
        this.tableData.push(data)
        this.resultIcon = this.tableData[0].status === 'success' ? require('../../../assets/images/atp/success.png') : require('../../../assets/images/atp/fail.png')
        this.tableData.forEach(item => {
          item.createTime = formatDateTime(item.createTime)
          item.endTime = formatDateTime(item.endTime)
        })
        this.testScenarios = data.testScenarios
        this.activeNameList = []
        this.finishActiveNameList = []
        let _chartObj = {
          dataRight: [],
          nameRightCh: [],
          nameRightEn: [],
          dataCh: [],
          dataEn: []
        }
        this.getResultData(_chartObj)
        this.$nextTick(() => {
          this.drawLeftLine()
          this.drawRightLine()
        })
      }).catch(() => {
        this.$message({
          duration: 2000,
          showClose: true,
          type: 'warning',
          message: this.$t('promptMessage.getTaskListFail')
        })
      })
    },
    getResultData (chartObj) {
      this.testScenarios.forEach(scenarios => {
        this.activeNameList.push(scenarios.nameEn + scenarios.testSuites[0].nameEn)
        this.activeNameList.push(scenarios.nameEn)
        chartObj.nameRightCh.push(scenarios.nameCh)
        chartObj.nameRightEn.push(scenarios.nameEn)
        scenarios.totalNum = 0
        scenarios.successNum = 0
        scenarios.failNum = 0
        scenarios.testSuites.forEach(ele => {
          this.finishActiveNameList.push(scenarios.nameEn + ele.nameEn)
          this.finishActiveNameList.push(scenarios.nameEn)
          ele.testCases.forEach(item => {
            scenarios.totalNum++
            if (item.result === 'success') {
              item.reason = '---'
              scenarios.successNum++
            } else if (item.result === 'failed') {
              scenarios.failNum++
            }
          })
        })
        let objDataCh = {
          name: '', value: 0
        }
        let objDataEn = {
          name: '', value: 0
        }
        objDataCh.name = scenarios.nameCh
        objDataEn.name = scenarios.nameEn
        objDataCh.value = scenarios.totalNum
        objDataEn.value = scenarios.totalNum
        chartObj.dataCh.push(objDataCh)
        chartObj.dataEn.push(objDataEn)
        let passRate = Number((scenarios.successNum / scenarios.totalNum * 100).toFixed(0))
        chartObj.dataRight.push(passRate)
        this.chartData.push(chartObj)
      })
    },
    drawLeftLine () {
      let _chart = this.$echarts.init(document.getElementById('leftchart'))
      let colors = ['#3AC372', '#ffd65e', '#616cf7', '#ff509f', '#9ed0c9']
      let option = {
        color: colors,
        legend: {
          top: '0%',
          orient: 'vertical',
          left: 'right',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '测试场景',
            type: 'pie',
            radius: ['30%', '60%'],
            label: {
              formatter: '{b} \n用例数量: {@2012} ({d}%)',
              minMargin: 10,
              edgeDistance: 10,
              lineHeight: 20
            },
            labelLine: {
              show: true,
              length: 30
            },
            data: []
          }
        ]
      }
      if (this.language === 'en') {
        option.series[0].name = 'Test Scenarios'
        option.series[0].data = this.chartData[0].dataEn
        option.series[0].label.formatter = '{b} Cases: {@2012} ({d}%)'
      } else if (this.language === 'cn') {
        option.series[0].name = '测试场景'
        option.series[0].data = this.chartData[0].dataCh
      }
      _chart.setOption(option)
      window.addEventListener('resize', () => {
        if (_chart) {
          _chart.resize()
        }
      })
    },
    drawRightLine () {
      let _chart = this.$echarts.init(document.getElementById('rightchart'))
      let option = {
        grid: {
          x: 80,
          y: 20,
          x2: 50,
          y2: 50
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#c77bf4',
          axisPointer: {
            animation: false,
            type: 'line',
            lineStyle: {
              color: '#fff',
              width: 4,
              type: 'dotted',
              opacity: 0.2
            }
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            color: '#fff',
            fontSize: '16'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
              type: 'dotted'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %',
              color: '#fff',
              fontSize: '16'
            },
            show: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                type: 'dotted'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                width: 2,
                type: 'dashed'
              }
            }
          }
        ],
        series: [{
          data: [],
          type: 'line',
          symbol: 'circle',
          symbolSize: 20,
          lineStyle: {
            color: '#b44ef1',
            width: 2,
            type: 'dashed'
          },
          itemStyle: {
            borderWidth: 4,
            borderColor: '#b44ef1',
            color: '#fff',
            label: { show: true }
          }
        }]
      }
      if (this.language === 'en') {
        option.xAxis.data = this.chartData[0].nameRightEn
        option.series[0].data = this.chartData[0].dataRight
      } else if (this.language === 'cn') {
        option.xAxis.data = this.chartData[0].nameRightCh
        option.series[0].data = this.chartData[0].dataRight
      }
      _chart.setOption(option)
      window.addEventListener('resize', () => {
        if (_chart) {
          _chart.resize()
        }
      })
    },
    downLoadReport () {
      this.activeNameList = this.finishActiveNameList
      this.downloadBtn = false
      this.printShow = false
      let _timer = setTimeout(() => {
        clearTimeout(_timer)
        this.getPdf('#pdfDom')
        this.downloadBtn = true
        this.printShow = true
      }, 3000)
    },
    // pdf
    getNumPages (pdfUrl) {
      this.pdfUrl = pdf.createLoadingTask(pdfUrl)
      this.pdfUrl.promise.then(pdfitem => {
        this.numPages = pdfitem.numPages
      })
    },
    prePage () {
      let p = this.pageNum
      p = p > 1 ? p - 1 : this.pageTotalNum
      this.pageNum = p
    },
    nextPage () {
      let p = this.pageNum
      p = p < this.pageTotalNum ? p + 1 : 1
      this.pageNum = p
    },
    pdfError (error) {
      console.error(error)
    }
  }
}
</script>

<style lang='less'>
.report {
    max-height: 93%;
    overflow: auto;
    margin: 20px 0;
  .report-content {
    padding: 10px;
     .logo {
      display: flex;
      justify-content: space-between;
      height: 65px;
      line-height: 65px;
      img {
        height: 65px;
      }
      h3{
        font-family: sans-serif;
        color: #fff;
        font-size: 24px;
        font-weight: 800;
      }
    }
    .baseInfo{
      margin: 30px 0;
      border-radius: 16px;
      padding: 40px;
      .report-app-info{
        position: relative;
        padding-top: 15px;
        .resulticon{
          position: absolute;
          right: 20px;
          top: -50px;
        }
      }
    }
    .title {
      font-size: 20px;
      .title-text{
        position: relative;
        z-index: 100;
      }
      .title-text::before{
        content: '';
        display:inline-block;
        width:9px;
        height:9px;
        border-radius: 50%;
        margin-right: 11px;
        background-color: #76E1E9;
        position: absolute;
        top: 9px;
        left: -18px;
      }
    }
      .report-chart{
        display: flex;
        margin-bottom: 30px;
            .left{
              margin-right: 30px;
            }
            .left,.right{
              padding: 40px;
              width: 100%;
              border-radius: 16px;
            }
            .sumchart{
              width: 100%;
              height: 300px;
            }
            .detailchart{
              width: 100%;
              height: 300px;
            }
      }
    .report-detail{
      padding: 40px;
      border-radius: 16px;
      .detail-content{
        .scene{
          padding-left: 10px;
          line-height: 40px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }
          .el-collapse{
            border: none;
            .el-collapse-item{
              padding: 8px 0;
            }
            .el-collapse-item__header{
              font-family: defaultFontLight, Arial, Helvetica, sans-serif;
              height: 40px;
              padding-left: 15px;
              font-size: 18px;
              color: #fff;
              background-color: #5F499D;
              border-radius: 19.5px;
              border: none;
            }
            .el-collapse-item__content{
              padding-bottom: 0;
            }
            .el-collapse-item__wrap{
              border: none;
            }
          }
          .tableheaderStyle{
            padding: 0;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
          }
          .el-table::before {
            width: 0;
          }
          .el-table td{
            font-size: 16px;
            padding: 0;
            height: 45px;
            line-height: 45px;
          }
          .el-table tr{
            background-color: transparent;
          }
          .el-table {
            background-color: transparent;
          }
          table th,table td{
            border-bottom: none !important;
            background-color: transparent;
          }
          .el-collapse-item__wrap {
            background-color: transparent;
           }
           .el-table, .el-table__expanded-cell {
            background-color: transparent;
          }
        }
    }
  }
  .pdf-main{
    .totalnum{
      text-align: center;
      font-size: xx-large;
    }
    .pdf-content{
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 16px;
      margin: 20px;
      .pagearrow{
        font-size: xxx-large;
      }
      .pdf{
        width: 100%;
      }
    }
  }
  .pdfpage{
    text-align: center;
    font-size: xx-large;
    padding-bottom: 20px;
    span{
      padding: 0 20px;
    }
  }
  .reportTitle{
    color: #380879;
    padding: 10px;
    font-size: 30px;
    font-weight: bolder;
  }
}
</style>
