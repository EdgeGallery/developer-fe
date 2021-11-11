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
    <div style="padding: 40px 0;text-align:right;">
      <el-button
        class="common-btn"
        @click="jumpToIncubation"
      >
        返回
      </el-button>
      <el-button
        class="common-btn"
        @click="publish()"
      >
        发布
      </el-button>
      <el-button
        :disabled="report || userName==='guest'"
        class="common-btn"
        icon="el-icon-upload"
        size="small"
        @click="isUploadPdf=true"
      >
        上传自测报告
      </el-button>
      <el-button
        size="small"
        :disabled="report"
        id="back_button"
        class="common-btn"
        icon="el-icon-document"
        @click="jumpToReport()"
      >
        查看报告
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
              <img
                src="../../../assets/images/atp/select_scene_icon.png"
                alt=""
                style="margin-right:10px;"
              >
              <span v-if=" isTest === 'running'"> 正在测试...</span>
              <span v-else>测试结果</span>
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
              v-if=" isTest === 'running'"
            >
              {{ language==='cn'?testingScene[0]:testingScene[1] }}
              <span
                v-show="!isManualTitle"
                style="margin-left:8px;"
              >: {{ language==='cn'?testingCase[0]:testingCase[1] }}</span>
            </span>
            <span
              v-show="isManualTitle"
              class="waitManual"
            >{{ $t('userpage.waitManual') }}</span>
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
            >所有场景共发现
              <em>
                {{ allfailNum }}
              </em>项问题</span>
          </div>
        </div>
        <!-- 顶部 -->

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
                      label="用例名称"
                      width="270"
                    >
                      <template slot-scope="scope">
                        <img
                          v-if="scope.row.result=='success'"
                          src="../../../assets/images/atp/success_icon.png"
                          alt=""
                        >
                        <img
                          v-else-if="scope.row.result=='failed'"
                          src="../../../assets/images/atp/fail_icon.png"
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
                      label="类型"
                      width="120"
                    >
                      <template slot-scope="scope">
                        {{ language==='en'?scope.row.type:scope.row.type==='automatic'?'自动化类型':'手动类型' }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="描述"
                    >
                      <template slot-scope="scope">
                        {{ language==='cn'?scope.row.descriptionCh:scope.row.descriptionEn }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      v-if="(authorities.indexOf('ROLE_ATP_ADMIN')!==-1)"
                      :label="$t('myApp.operation')"
                      width="100"
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
              :label="$t('userpage.name')"
            >
              <el-input
                width="100px"
                size="small"
                v-model="form.name"
              />
            </el-form-item>
            <el-form-item
              :label="$t('userpage.status')"
            >
              <el-select
                v-model="form.result"
                :placeholder="$t('userpage.choose')"
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
              :label="$t('userpage.failReason')"
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
import { Userpage } from '../../../api/atpApi.js'
import UploadSelfReportDig from './UploadSelfReportDlg.vue'
export default {
  name: 'TestProcess',
  components: { UploadSelfReportDig },
  data () {
    return {
      language: 'cn',
      report: true,
      isTest: '',
      statusTitle: [],
      percentage: 0,
      taskId: this.$route.query.taskId,
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
      userName: '',
      authorities: [],
      alltestCase: [],
      scoreColor: '',
      isUploadPdf: false,
      customColor: '#8097f7',
      isManualTitle: false,
      uploadUser: ''
    }
  },
  mounted () {
    this.getTaskProcess()
    this.interval = setInterval(() => {
      this.getTaskProcess()
    }, 1000)
  },
  methods: {
    publish () {
      this.$message({
        showClose: true,
        duration: 2000,
        message: '发布成功',
        type: 'success'
      })
      sessionStorage.setItem('currentFlow', 5)
      this.$router.push('/EG/developer/home')
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
      let data = res.data.testScenarios
      let taskStatus = res.data.status
      this.uploadUser = res.data.user.userName
      let reportPath = res.data.hasOwnProperty('reportPath')
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
      // }).catch(() => {
      //   this.$message({
      //     duration: 2000,
      //     showClose: true,
      //     type: 'warning',
      //     message: this.$t('promptMessage.getprocessFail')
      //   })
      //   this.clearInterval()
      // })
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
        message: this.$t('promptMessage.manualTip')
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
        processcDiv.style.maxHeight = appDiv.clientHeight - 230 + 'px'
        content.style.maxHeight = appDiv.clientHeight - 487 + 'px'
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
      Userpage.modifyStatusApi(this.taskId, param).then(res => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('promptMessage.modifySuccess'),
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
      margin-bottom: 45px;
      padding: 40px 55px;
      .left{
        .left-text{
          font-family: defaultFontBlod, Arial, Helvetica, sans-serif;
          position: relative;
          z-index: 2;
          border-radius: 12px;
          height: 47px;
          font-size: 24px;
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
              font-family: defaultFontBlod, Arial, Helvetica, sans-serif;
              font-size: 33px !important;
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
            font-size: 14px;
            margin-left: 20px;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          }
          .test-result{
            position: relative;
            font-family: defaultFontBlod, Arial, Helvetica, sans-serif;
            font-size: 24px;
            color: #FFF;
            margin-left: 40px;
          }
          .waitManual{
            font-family: defaultFontBlod, Arial, Helvetica, sans-serif;
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
            font-size: 14px;
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
              font-size: 14px;
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
      padding: 40px 55px;
      .el-tabs__header{
        margin: 0;
        border: none;
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        .el-tabs__nav,.el-tabs__item{
          border: none;
        }
        .el-tabs__item{
          color: #fff;
          font-size: 14px;
        }
        .el-tabs__item.is-active{
          font-size: 16px;
          font-family: defaultFontBlod, Arial, Helvetica, sans-serif;
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
            font-size: 18px;
            color: #fff;
            background-color: rgba(255, 255, 255,0.3);
            border: none;
          }
          .el-collapse-item__wrap{
             background-color: transparent;
             border: none;
          }
          .caseHearder{
            background-color: transparent;
            color: #fff;
            padding: 0 10px;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            font-weight: normal;
          }
          .el-table tr {
            height: 37px;
            background-color: transparent;
          }
          .el-table td{
            font-size: 16px;
            padding: 0 10px;
            color: #fff;
            vertical-align: top;
            height: 37px;
            line-height: 37px;
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
.blur-bg{
  filter: blur(5px);
}
</style>
