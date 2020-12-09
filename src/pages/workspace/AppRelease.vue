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
    <el-steps
      :active="active"
      finish-status="success"
      align-center
    >
      <el-step :title="$t('workspace.appRelease.appConfig')" />
      <el-step :title="$t('workspace.appRelease.appTest')" />
      <el-step :title="$t('workspace.appRelease.appRelease')" />
    </el-steps>
    <div class="elSteps">
      <!-- 第一步“应用配置” -->
      <div v-show="step==='step1'">
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
                @click="openDialog('trafficRule')"
              >
                {{ $t('workspace.add')+$t('workspace.trafficRules') }}
              </el-button>
              <!-- 流量规则列表 -->
              <div class="trafficRulesList">
                <el-table
                  :data="trafficListData"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="trafficRuleId"
                    :label="$t('workspace.appRelease.trafficRuleId')"
                    width="120px"
                  />
                  <el-table-column
                    prop="action"
                    :label="$t('workspace.appRelease.filterType')"
                  />
                  <el-table-column
                    prop="priority"
                    :label="$t('workspace.appRelease.priority')"
                  />
                  <el-table-column
                    prop="filterType"
                    :label="$t('workspace.appRelease.action')"
                    width="120px"
                  />
                  <el-table-column
                    :label="$t('workspace.operation')"
                    width="120"
                    fixed="right"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        class="editBtn"
                        @click="checkFilter(scope.row)"
                      >
                        {{ $t('workspace.appRelease.checkRules') }}
                      </el-button>
                      <el-button
                        size="medium"
                        type="text"
                        class="editBtn"
                        @click="editTrafficRule(scope.$index, scope.row)"
                      >
                        {{ $t('api.modify') }}
                      </el-button>
                      <el-button
                        size="medium"
                        type="text"
                        class="deleteBtn"
                        @click="deleteTrafficData(scope.$index)"
                      >
                        {{ $t('devTools.delete') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 流量规则弹框 -->
              <div v-if="trafficDialog">
                <addTrafficRules
                  v-model="trafficDialog"
                  @closeFatherDialog="closeDialog"
                  @getAddTrafficData="getAddTrafficData"
                  :edit-rule-dataprop="editRuleData"
                />
              </div>
              <!-- 查看流量规则详情 -->
              <el-dialog
                title="详情"
                :visible.sync="filterShow"
                width="60%"
                :close-on-click-modal="false"
              >
                <div class="dialogContent">
                  <!-- 分流规则 -->
                  <p class="title">
                    {{ $t('workspace.appRelease.trafficFilter') }}
                  </p>
                  <el-table
                    class="mt20"
                    border
                    size="small"
                    style="width: 100%;"
                    :data="filterData"
                  >
                    <el-table-column
                      prop="srcAddress"
                      :label="$t('workspace.appRelease.srcAddress')"
                    />
                    <el-table-column
                      prop="srcPort"
                      :label="$t('workspace.appRelease.srcPort')"
                    />
                    <el-table-column
                      prop="dstAddress"
                      :label="$t('workspace.appRelease.dstAddress')"
                    />
                    <el-table-column
                      prop="dstPort"
                      :label="$t('workspace.appRelease.dstPort')"
                    />
                    <el-table-column
                      prop="protocol"
                      :label="$t('workspace.appRelease.protocol')"
                    />
                    <el-table-column
                      prop="tgtTunnelAddress"
                      label="隧道目的地址"
                    />
                    <el-table-column
                      prop="dstTunnelPort"
                      label="隧道目的端口"
                    />
                    <el-table-column
                      prop="srcTunnelAddress"
                      label="隧道源地址"
                    />
                    <el-table-column
                      prop="srcTunnelPort"
                      label="隧道源端口"
                    />
                    <el-table-column
                      prop="tag"
                      label="Tag"
                    />
                    <el-table-column
                      prop="qci"
                      label="QCI"
                    />
                    <el-table-column
                      prop="dscp"
                      label="DSCP"
                    />
                    <el-table-column
                      prop="tc"
                      label="TC"
                    />
                  </el-table>

                  <!-- 接口信息 -->
                  <p class="title">
                    接口信息
                  </p>
                  <el-table
                    class="mt20"
                    :data="interfaceData"
                    border
                    size="small"
                    style="width: 100%;"
                  >
                    <el-table-column
                      prop="interfaceType"
                      label="接口类型"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelType"
                      label="隧道类型"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelDstAddress"
                      label="隧道目的地址"
                      width="120px"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelSrcAddress"
                      label="隧道源地址"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelSpecificData"
                      label="隧道指定参数"
                    />
                    <el-table-column
                      prop="dstMACAddress"
                      label="目的MAC地址"
                    />
                    <el-table-column
                      prop="srcMACAddress"
                      label="源MAC地址"
                    />
                    <el-table-column
                      prop="dstIPAddress"
                      label="目的IP地址"
                    />
                  </el-table>
                </div>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane :label="$t('workspace.dnsRules')">
              <el-button
                size="small"
                class="featuresBtn"
                @click="openDialog('dnsRule')"
              >
                {{ $t('workspace.add')+$t('workspace.dnsRules') }}
              </el-button>
              <!-- DNS规则列表 -->
              <div class="dnsRulesList">
                <el-table
                  :data="dnsListData"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="dnsRuleId"
                    label="dnsRuleId"
                  />
                  <el-table-column
                    prop="domainName"
                    label="domainName"
                  />
                  <el-table-column
                    prop="ipAddressType"
                    label="ipAddressType"
                  />
                  <el-table-column
                    prop="ipAddress"
                    label="ipAddress"
                  />
                  <el-table-column
                    prop="ttl"
                    label="ttl"
                  />
                  <el-table-column
                    :label="$t('workspace.operation')"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="medium"
                        type="text"
                        class="editBtn"
                        @click="editDnsRule(scope.$index, scope.row)"
                      >
                        {{ $t('api.modify') }}
                      </el-button>
                      <el-button
                        size="medium"
                        type="text"
                        class="deleteBtn"
                        @click="deleteRuleData(scope.$index)"
                      >
                        {{ $t('devTools.delete') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- DNS规则弹框 -->
              <div v-if="dnsDialog">
                <addDnsRules
                  v-model="dnsDialog"
                  @closeFatherDialog="closeDialog"
                  @getAddDnsData="getAddDnsData"
                  :edit-rule-dataprop="editRuleData"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
          <!-- 应用服务发布配置 -->
          <p>{{ $t('workspace.appPublishConfig') }}</p>
          <el-button
            size="small"
            class="featuresBtn mt20"
            @click="openDialog('publicConfig')"
          >
            {{ $t('workspace.add')+$t('workspace.appPublishConfig') }}
          </el-button>
          <!-- 应用服务发布配置列表 -->
          <div class="appPublicConfig">
            <el-table
              :data="appPublishListData"
              style="width: 100%"
            >
              <el-table-column
                prop="serviceName"
                :label="$t('workspace.servicename')"
              />
              <el-table-column
                prop="internalPort"
                :label="$t('workspace.internalPort')"
              />
              <el-table-column
                prop="version"
                :label="$t('workspace.version')"
              />
              <el-table-column
                prop="protocol"
                :label="$t('workspace.protocol')"
              />
              <el-table-column
                prop="dnsRulesList"
                :label="$t('workspace.dnsRules')"
              />
              <el-table-column
                prop="trafficRulesList"
                :label="$t('workspace.trafficRules')"
              />
              <el-table-column
                :label="$t('workspace.operation')"
              >
                <template slot-scope="scope">
                  <el-button
                    size="medium"
                    type="text"
                    class="editBtn"
                    @click="editPublicConfigRule(scope.$index, scope.row)"
                  >
                    {{ $t('api.modify') }}
                  </el-button>
                  <el-button
                    size="medium"
                    type="text"
                    class="deleteBtn"
                    @click="deleteConfigData(scope.$index)"
                  >
                    {{ $t('devTools.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 应用服务发布配置弹框 -->
          <div v-if="appPublishDialog">
            <addAppPublishConfig
              v-model="appPublishDialog"
              @closeFatherDialog="closeDialog"
              @getAddPublicConfigData="getAddPublicConfigData"
              :edit-rule-dataprop="editRuleData"
            />
          </div>
          <el-button
            size="small"
            class="featuresBtn mt20"
            @click="appDetaildialog=true"
          >
            {{ $t('workspace.appDetails') }}
          </el-button>
          <!-- 应用包详情弹框 -->
          <div v-if="appDetaildialog">
            <appPackageDetail
              v-model="appDetaildialog"
            />
          </div>
        </div>
      </div>
      <!-- 第二步“应用测试” -->
      <div v-show="step==='step2'">
        <el-button
          class="bgBtn btn_width1"
          @click="getAtpTest"
        >
          {{ $t('workspace.appTest') }}
        </el-button>
        <span class="release_text">
          {{ $t('workspace.releaseText') }}
        </span>
        <div
          v-show="showAtp"
          class="atp_iframe mt20"
        >
          <iframe
            :src="iframeUrl"
            :title="$t('workspace.appTest')"
            width="100%"
            height="100%"
            frameborder="no"
          />
        </div>
      </div>
      <!-- 第三步“应用发布” -->
      <div v-show="step==='step3'">
        <!-- 应用发布测试 -->
        <h3 class="title">
          {{ $t('workspace.releaseTest') }}
        </h3>
        <div class="release_test">
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
                    type="primary"
                    target="_blank"
                    class="mt20"
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
    </div>
    <div class="elButton">
      <el-button
        type="text"
        v-if="active===0"
        @click="saveConfig"
      >
        <strong>{{ $t('workspace.saveData') }}</strong>
      </el-button>
      <el-button
        id="prevBtn"
        type="text"
        v-if="active>0"
        @click="previous"
      >
        <strong>{{ $t('workspace.previous') }}</strong>
      </el-button>
      <el-button
        id="nextBtn"
        type="primary"
        v-if="active<2"
        @click="next"
      >
        <strong>{{ $t('workspace.nextStep') }}</strong>
      </el-button>
    </div>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import addTrafficRules from './AddTrafficRules.vue'
import addDnsRules from './AddDnsRules.vue'
import addAppPublishConfig from './AddAppPublishConfig.vue'
import appPackageDetail from './AppPackageDetails.vue'
export default {
  name: 'AppRelease',
  components: {
    addTrafficRules,
    addDnsRules,
    addAppPublishConfig,
    appPackageDetail
  },
  data () {
    return {
      active: 0,
      step: 'step1',
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
      isAddRuleData: true,
      trafficDialog: false,
      dnsDialog: false,
      dnsListData: [],
      editRuleData: {},
      trafficListData: [],
      trafficAllData: {
        releaseId: '',
        projectId: sessionStorage.getItem('mecDetailID'),
        guideFileId: '',
        appInstanceId: '',
        capabilitiesDetail: {
          appTrafficRule: [],
          appDNSRule: [],
          serviceDetails: []
        },
        atpTest: {
          id: '',
          appName: '',
          status: '',
          createTime: ''
        },
        testStatus: '',
        createTime: ''
      },
      filterShow: false,
      filterData: [],
      interfaceData: [],
      appPublishListData: [],
      editIndex: 0,
      appPublishDialog: false,
      appDetaildialog: false,
      dialogAppPublicSuccess: false,
      appStoreUrl: '',
      showAtp: false,
      iframeUrl: '',
      projectId: sessionStorage.getItem('mecDetailID')
    }
  },
  methods: {
    getReleaseConfig (params) {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        let releaseId = res.data.releaseId
        Workspace.saveRuleConfig(this.projectId, params, releaseId).then(() => {
          if (releaseId) {
            this.$message.success(this.$t('promptMessage.editRuleSuccess'))
          } else {
            this.$message.success(this.$t('promptMessage.saveRuleSuccess'))
          }
        }).catch(() => {
          if (releaseId) {
            this.$message.success(this.$t('promptMessage.editRuleFail'))
          } else {
            this.$message.success(this.$t('promptMessage.saveRuleFail'))
          }
        })
      })
    },
    next () {
      this.active++
      this.showStepContent(this.active)
    },
    previous () {
      this.active--
      this.showStepContent(this.active)
    },
    showStepContent (active) {
      if (active === 0) {
        this.step = 'step1'
      } else if (active === 1) {
        this.step = 'step2'
      } else if (active === 2) {
        this.step = 'step3'
      }
    },
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
    // 获取规则列表
    getAllListData () {
      if (sessionStorage.getItem('dnsData')) {
        this.dnsListData = JSON.parse(sessionStorage.getItem('dnsData'))
      } else {
        this.dnsListData = []
      }
      if (sessionStorage.getItem('configData')) {
        this.appPublishListData = JSON.parse(sessionStorage.getItem('configData'))
      } else {
        this.appPublishListData = []
      }
      if (sessionStorage.getItem('trafficData')) {
        this.trafficListData = JSON.parse(sessionStorage.getItem('trafficData'))
      } else {
        this.trafficListData = []
      }
    },
    // 打开添加规则弹框
    openDialog (name) {
      this.isAddRuleData = true
      if (name === 'dnsRule') {
        this.dnsDialog = true
        this.editRuleData = {
          dnsRuleId: '',
          domainName: '',
          ipAddressType: 'IP_V4',
          ipAddress: '',
          ttl: ''
        }
      } else if (name === 'trafficRule') {
        this.trafficDialog = true
        this.editRuleData = {
          action: 'PASSTHROUGH',
          filterType: 'FLOW',
          priority: 1,
          trafficRuleId: '',
          trafficFilter: [],
          dstInterface: []
        }
      } else if (name === 'publicConfig') {
        this.appPublishDialog = true
        this.editRuleData = {
          serviceName: '',
          internalPort: 0,
          version: '',
          protocol: 'HTTP',
          trafficRulesList: '',
          dnsRulesList: ''
        }
      }
    },
    // 添加规则列表
    getAddDnsData (data) {
      if (this.isAddRuleData) {
        this.dnsListData.push(data)
        this.$message.success(this.$t('promptMessage.addSuccess'))
      } else {
        this.dnsListData.splice(this.editIndex, 1, data)
        this.$message.success(this.$t('promptMessage.editSuccess'))
      }
      sessionStorage.setItem('dnsData', JSON.stringify(this.dnsListData))
    },
    getAddTrafficData (data) {
      if (this.isAddRuleData) {
        this.trafficListData.push(data)
        this.$message.success(this.$t('promptMessage.addSuccess'))
      } else {
        this.trafficListData.splice(this.editIndex, 1, data)
        this.$message.success(this.$t('promptMessage.editSuccess'))
      }
      sessionStorage.setItem('trafficData', JSON.stringify(this.trafficListData))
    },
    getAddPublicConfigData (data) {
      if (this.isAddRuleData) {
        this.appPublishListData.push(data)
        this.$message.success(this.$t('promptMessage.addSuccess'))
      } else {
        this.appPublishListData.splice(this.editIndex, 1, data)
        this.$message.success(this.$t('promptMessage.editSuccess'))
      }
      sessionStorage.setItem('configData', JSON.stringify(this.appPublishListData))
    },
    // 编辑规则列表
    editTrafficRule (index, row) {
      this.isAddRuleData = false
      this.editIndex = index
      this.trafficDialog = true
      this.editRuleData = row
    },
    editDnsRule (index, row) {
      this.isAddRuleData = false
      this.editIndex = index
      this.dnsDialog = true
      this.editRuleData = row
    },
    editPublicConfigRule (index, row) {
      this.isAddRuleData = false
      this.editIndex = index
      this.appPublishDialog = true
      this.editRuleData = row
    },
    // 删除规则列表
    deleteRuleData (index) {
      this.dnsListData.splice(index, 1)
      sessionStorage.setItem('dnsData', JSON.stringify(this.dnsListData))
      this.$message.success(this.$t('devTools.deleteSucc'))
    },
    deleteTrafficData (index) {
      this.trafficListData.splice(index, 1)
      sessionStorage.setItem('trafficData', JSON.stringify(this.trafficListData))
      this.$message.success(this.$t('devTools.deleteSucc'))
    },
    deleteConfigData (index) {
      this.appPublishListData.splice(index, 1)
      sessionStorage.setItem('configData', JSON.stringify(this.appPublishListData))
      this.$message.success(this.$t('devTools.deleteSucc'))
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oDiv = document.getElementsByClassName('atp_iframe')[0]
        const screenHeight = document.documentElement.clientHeight
        oDiv.style.height = Number(screenHeight) - 330 + 'px'
      })
    },
    // 查看流量规则
    checkFilter (row) {
      console.log(row)
      this.filterShow = true
      this.filterData = row.trafficFilter
      this.interfaceData = row.dstInterface
    },
    strToArray (str) {
      let arr = []
      arr = str.split(',')
      return arr
    },
    // 保存配置的规则数据
    saveConfig () {
      let trafficDataTemp = JSON.parse(JSON.stringify(this.trafficListData))
      trafficDataTemp.forEach(item => {
        item.trafficFilter.forEach(subItem => {
          subItem.dstAddress = this.strToArray(subItem.dstAddress)
          subItem.dstPort = this.strToArray(subItem.dstPort)
          subItem.dstTunnelPort = this.strToArray(subItem.dstTunnelPort)
          subItem.protocol = this.strToArray(subItem.protocol)
          subItem.srcAddress = this.strToArray(subItem.srcAddress)
          subItem.srcPort = this.strToArray(subItem.srcPort)
          subItem.srcTunnelAddress = this.strToArray(subItem.srcTunnelAddress)
          subItem.srcTunnelPort = this.strToArray(subItem.srcTunnelPort)
          subItem.tag = this.strToArray(subItem.tag)
          subItem.tgtTunnelAddress = this.strToArray(subItem.tgtTunnelAddress)
        })
      })
      let appPublishConfigTemp = JSON.parse(JSON.stringify(this.appPublishListData))
      appPublishConfigTemp.forEach(item => {
        item.dnsRulesList = this.strToArray(item.dnsRulesList)
        item.trafficRulesList = this.strToArray(item.trafficRulesList)
      })
      this.trafficAllData.capabilitiesDetail.appTrafficRule = trafficDataTemp
      this.trafficAllData.capabilitiesDetail.appDNSRule = this.dnsListData
      this.trafficAllData.capabilitiesDetail.serviceDetails = appPublishConfigTemp
      console.log(this.trafficAllData)
      this.getReleaseConfig(this.trafficAllData)
    },
    // 集成应用测试页面
    getAtpTest () {
      Workspace.getAtpTestApi(this.projectId)
      this.setApiHeight()
      this.showAtp = true
      this.iframeUrl = 'https://www.baidu.com'
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
    this.getAllListData()
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
  .btn_width1{
    color: #fff;
    padding: 9px 15px;
    font-size: 12px;
    min-width: 100px;
  }
  .release_text{
    color: #adb0b8;
    font-size: 12px;
    margin-left: 10px;
  }
  .atp_iframe{
    border: 1px solid #ddd;
  }
  .release_test{
    padding: 0 30px;
    .test{
      display: block;
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
    .el-table{
      margin-top: 14px;
    }
    .el-table td{
      padding: 12px;
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
