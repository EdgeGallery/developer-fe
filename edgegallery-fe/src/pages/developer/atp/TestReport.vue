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
    id="pdfDom"
  >
    <div class="report-content">
      <div class="logo">
        <h3> EdgeGallery测试认证报告</h3>
        <div>
          <el-button
            class="test-btn"
            @click="jumpToIncubation()"
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
// import { Userpage } from '../../../api/atpApi.js'
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
    jumpToIncubation () {
      this.$router.push('/EG/developer/home')
    },
    getReport () {
      // Userpage.getTaskApi(this.taskId).then(res => {
      let res = {
        'data': {
          'id': 'b150303a-1de8-4895-9ce3-b8e00a3dd119',
          'appName': 'GoWalk',
          'appVersion': 'v1.0',
          'status': 'success',
          'createTime': '2021-10-29T08:01:14.601+0000',
          'endTime': '2021-10-29T08:01:35.100+0000',
          'user': {
            'userId': '39937079-99fe-4cd8-881f-04ca8c4fe09d',
            'userName': 'admin'
          },
          'testScenarios': [{
            'id': '4d203111-1111-4f62-aabb-8ebcec357f87',
            'nameCh': '社区通用场景',
            'nameEn': 'EdgeGallery Community Common Scenario',
            'label': 'EdgeGallery',
            'testSuites': [{
              'id': '522684bd-d6df-4b47-aab8-b43f1b4c19c0',
              'nameCh': '通用遵从性测试',
              'nameEn': 'Common Compliance Test',
              'testCases': [{
                'id': '4d203173-9999-4f62-aabb-8ebcec357f87',
                'nameCh': 'APPD文件目录校验',
                'nameEn': 'APPD File Dir Validation',
                'descriptionCh': '根目录下必须包含APPD文件目录',
                'descriptionEn': 'Root directory must contain APPD file dir',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1002-4f62-aabb-8ebcec357f87',
                'nameCh': 'yaml描述文件校验',
                'nameEn': 'Yaml Description File Validation',
                'descriptionCh': 'APPD/Definition/目录下必须存在yaml描述文件',
                'descriptionEn': 'There must contain yaml file in APPD/Definition/ dir',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1000-4f62-aabb-8ebcec357f87',
                'nameCh': 'Artifacts文件目录校验',
                'nameEn': 'Artifacts File Dir Validation',
                'descriptionCh': '根目录下必须包含Artifacts文件目录',
                'descriptionEn': 'Root directory must contain Artifacts file dir',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-2222-4f62-aabb-8ebcec357f87',
                'nameCh': 'MF文件必填字段校验',
                'nameEn': 'Manifest File Field Validation',
                'descriptionCh': '.mf文件必须包含如下字段： app_product_name, app_provider_id, app_package_version, app_release_date_time, app_class and app_package_description',
                'descriptionEn': '.mf file must contain the following field: app_product_name, app_provider_id, app_package_version, app_release_date_time, app_class and app_package_description',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1015-4f62-aabb-8ebcec357f87',
                'nameCh': '容器helm模板镜像文件校验',
                'nameEn': 'Container Helm Tgz File Validation',
                'descriptionCh': '容器的应用包，必须存在helm模板的镜像文件',
                'descriptionEn': 'There must exist .tgz file of helm for container app package',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1016-4f62-aabb-8ebcec357f87',
                'nameCh': '容器tgz中templates文件夹校验',
                'nameEn': 'Container Tgz Templates Validaion',
                'descriptionCh': '容器的应用包，在helm模板的.tgz文件中，必须存在templates文件夹',
                'descriptionEn': 'There must exist templates file dir in .tgz file of helm for container app package',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1017-4f62-aabb-8ebcec357f87',
                'nameCh': '容器tgz中chart文件校验',
                'nameEn': 'Container Tgz Chart Validaion',
                'descriptionCh': '容器的应用包，在helm模板的.tgz文件中，必须存在chart.yaml文件',
                'descriptionEn': 'There must exist chart.yaml file in .tgz file of helm for container app package',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1018-4f62-aabb-8ebcec357f87',
                'nameCh': '容器tgz中values文件校验',
                'nameEn': 'Container Tgz Values Validaion',
                'descriptionCh': '容器的应用包，在helm模板的.tgz文件中，必须存在values.yaml文件',
                'descriptionEn': 'There must exist values.yaml file in .tgz file of helm for container app package',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-3333-4f62-aabb-8ebcec357f87',
                'nameCh': 'MF文件Source路径校验',
                'nameEn': 'Manifest File Source Path Validation',
                'descriptionCh': 'Source字段的值必须是正确的文件路径，文件必须存在',
                'descriptionEn': 'The value of Source filed must be right path, the corresponding file must exist',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1004-4f62-aabb-8ebcec357f87',
                'nameCh': 'CPU数量描述字段校验',
                'nameEn': 'CPU Number Description Validation',
                'descriptionCh': 'yaml描述文件中必须有对cpu数量的描述字段：num_virtual_cpu',
                'descriptionEn': 'There must contain cpu number description in yaml file',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1001-4f62-aabb-8ebcec357f87',
                'nameCh': 'TOSCA-Metadata文件目录校验',
                'nameEn': 'Tosca Metadata File Dir Validation',
                'descriptionCh': '根目录下必须包含TOSCA-Metadata文件目录',
                'descriptionEn': 'Root directory must contain TOSCA-Metadata file dir',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1111-4f62-aabb-8ebcec357f87',
                'nameCh': 'MF文件路径校验',
                'nameEn': 'Manifest File Path Validation',
                'descriptionCh': '根目录必须包含以.mf结尾的文件',
                'descriptionEn': 'Root path must contain the file which name ends of .mf',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1005-4f62-aabb-8ebcec357f87',
                'nameCh': '虚拟内存描述字段校验',
                'nameEn': 'Virtual Memory Description Validation',
                'descriptionCh': 'yaml文件中有对虚拟内存大小的描述字段：virtual_mem_size',
                'descriptionEn': 'There must contain virtual memory size description in yaml file',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-4444-4f62-aabb-8ebcec357f87',
                'nameCh': 'TOSCA文件校验',
                'nameEn': 'Tosca File Validation',
                'descriptionCh': 'TOSCA.meta文件必须存在，该文件必须包含字段Entry-Definitions，且其值对应的路径必须是正确的路径，路径中的文件必须存在',
                'descriptionEn': 'ToscaFileValidation  TOSCA.meta file must exist, and it must contain the field: Entry-Definitions, and the the value of the filed must be right path, the corresponding file must exist.',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }]
            }, {
              'id': '6d04da1b-1f36-4295-920a-8074f7f9d942',
              'nameCh': '通用沙箱测试',
              'nameEn': 'Common Sandbox Test',
              'testCases': [{
                'id': '4d203173-5555-4f62-aabb-8ebcec357f87',
                'nameCh': '应用实例化',
                'nameEn': 'Application Instantiation',
                'descriptionCh': '将应用包部署到边缘节点',
                'descriptionEn': 'Instantiate application and its dependency application on one edge host',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1025-4f62-aabb-8ebcec357f87',
                'nameCh': 'MEP服务注册校验',
                'nameEn': 'Register Service To Mep Validation',
                'descriptionCh': '向MEP平台注册服务',
                'descriptionEn': 'Register service to mep',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1021-4f62-aabb-8ebcec357f87',
                'nameCh': '边缘节点连通性校验',
                'nameEn': 'Mec Host Access Validation',
                'descriptionCh': '检查MEC平台的边缘站点连通性',
                'descriptionEn': 'Validate mec host accessible in MEC platform',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1027-4f62-aabb-8ebcec357f87',
                'nameCh': '向MEP更新已注册的服务校验',
                'nameEn': 'Update Registered Service To Mep Validation',
                'descriptionCh': '向MEP平台更新已注册的服务',
                'descriptionEn': 'update registered service to mep',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1026-4f62-aabb-8ebcec357f87',
                'nameCh': 'MEP服务二次注册校验',
                'nameEn': 'Secondary Register Service To Mep Validation',
                'descriptionCh': '向MEP平台二次注册服务',
                'descriptionEn': 'Secondary Register service to mep',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1010-4f62-aabb-8ebcec357f87',
                'nameCh': '依赖服务存在性校验',
                'nameEn': 'Dependency Service Existence Validation',
                'descriptionCh': '依赖服务存在性校验',
                'descriptionEn': 'Dependency Service Existence Validation',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1028-4f62-aabb-8ebcec357f87',
                'nameCh': 'MEP服务取消注册校验',
                'nameEn': 'Unregister Service To Mep Validation',
                'descriptionCh': '向MEP平台取消已注册的服务',
                'descriptionEn': 'unregister service to mep',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }]
            }, {
              'id': '743abd93-57a3-499d-9591-fa7db86a4778',
              'nameCh': '通用安全性测试',
              'nameEn': 'Common Security Test',
              'testCases': [{
                'id': '4d203173-1009-4f62-aabb-8ebcec357f87',
                'nameCh': '文件目录层深校验',
                'nameEn': 'File Dir Depth Validation',
                'descriptionCh': '文件目录层深校验',
                'descriptionEn': 'File Dir Depth Validation',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1007-4f62-aabb-8ebcec357f87',
                'nameCh': '文件数量校验',
                'nameEn': 'File Number Validation',
                'descriptionCh': '应用包包含的文件数量校验',
                'descriptionEn': 'The number of files app package contains validation',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1029-4f62-aabb-8ebcec357f87',
                'nameCh': '漏洞扫描',
                'nameEn': 'Vulnerable Scanning Validation',
                'descriptionCh': '检查应用部署的边缘节点是否包含常见漏洞',
                'descriptionEn': 'Validate common vulnerables in app instantiated edge node',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1006-4f62-aabb-8ebcec357f87',
                'nameCh': '文件大小校验',
                'nameEn': 'File Size Validation',
                'descriptionCh': '应用包大小校验',
                'descriptionEn': 'The size of app package validation',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1019-4f62-aabb-8ebcec357f87',
                'nameCh': '签名校验',
                'nameEn': 'Signature Validation',
                'descriptionCh': 'mf文件中签名值校验',
                'descriptionEn': 'Signature value in mf file validation',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1008-4f62-aabb-8ebcec357f87',
                'nameCh': '解压后文件大小校验',
                'nameEn': 'Unzip File Size Validation',
                'descriptionCh': '解压后文件大小校验',
                'descriptionEn': 'The size of unzip app package validation',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1020-4f62-aabb-8ebcec357f87',
                'nameCh': '端口扫描',
                'nameEn': 'Port Scanning Validation',
                'descriptionCh': '检查应用部署的边缘节点端口号使用情况',
                'descriptionEn': 'Validate the usage of port in app instantiated edge node',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1003-4f62-aabb-8ebcec357f87',
                'nameCh': 'mf文件hash值列表校验',
                'nameEn': 'Manifest File Hash List Validation',
                'descriptionCh': '.mf文件中，每个文件必须有对应的hash值描述',
                'descriptionEn': 'Every Source file must has Hash field in manifest file',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }]
            }, {
              'id': '743abd93-1111-499d-9591-fa7db86a4778',
              'nameCh': '通用性能测试',
              'nameEn': 'Common Performance Test',
              'testCases': [{
                'id': '4d203173-1023-4f62-aabb-8ebcec357f87',
                'nameCh': 'Cpu使用率校验',
                'nameEn': 'Cpu Usage Validation',
                'descriptionCh': '校验应用部署后的cpu使用率',
                'descriptionEn': 'Validate cpu usage after app instantiated',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1024-4f62-aabb-8ebcec357f87',
                'nameCh': '内存使用率校验',
                'nameEn': 'Memory Usage Validation',
                'descriptionCh': '校验应用部署后的内存使用率',
                'descriptionEn': 'Validate memory usage after app instantiated',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-1022-4f62-aabb-8ebcec357f87',
                'nameCh': '网络延时校验',
                'nameEn': 'Network Delay Validation',
                'descriptionCh': '检查边缘站点的网络延时',
                'descriptionEn': 'Validate mec host network delay time',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }, {
                'id': '4d203173-6666-4f62-aabb-8ebcec357f87',
                'nameCh': '应用实例化终止',
                'nameEn': 'Application Termination',
                'descriptionCh': '将实例化后的应用包卸载',
                'descriptionEn': 'Uninstantiate application and its dependency application on one edge host',
                'type': 'automatic',
                'result': 'success',
                'reason': ''
              }]
            }]
          }],
          'providerId': 'EdgeGallery'
        },
        'retCode': 0,
        'message': 'get task by id successfully.'
      }
      let data = res.data
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
      // }).catch(() => {
      //   this.$message({
      //     duration: 2000,
      //     showClose: true,
      //     type: 'warning',
      //     message: this.$t('promptMessage.getTaskListFail')
      //   })
      // })
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
    max-height: 85%;
    overflow: auto;
    margin: 20px 0;
  .report-content {
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
        color: #380879;
        font-size: 24px;
        font-weight: 800;
      }
    }
    .baseInfo{
      margin: 30px 0;
      border-radius: 16px;
      padding: 40px;
      border: solid 1px #8f80d9;
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
              border: solid 1px #8f80d9;
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
      border: solid 1px #8f80d9;
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
              background-color: rgba(255, 255, 255,0.3);
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
