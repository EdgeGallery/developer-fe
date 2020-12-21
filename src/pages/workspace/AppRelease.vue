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
      <el-step :title="$t('workspace.appRelease.appCertify')" />
      <el-step :title="$t('workspace.appRelease.appRelease')" />
    </el-steps>
    <div class="elSteps">
      <!-- 第一步“应用配置” -->
      <div v-show="step==='step1'">
        <!-- 项目详情 -->
        <h3 class="tit_gray_bg">
          {{ $t('workspace.projectDetails') }}
        </h3>
        <div class="project_detail">
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.projectName') }}</span>{{ projectDetailData.name }}
            </el-col>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('test.testApp.type') }}</span>{{ projectDetailData.type }}
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.version') }}</span>{{ projectDetailData.version }}
            </el-col>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.architecture') }}</span>{{ projectDetailData.platform }}
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.dependentApp') }}</span>{{ projectDetailData.dependent }}
            </el-col>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.instantiateId') }}</span>{{ projectDetailData.instantiateId }}
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.deploymentPlatform') }}</span>{{ projectDetailData.deployPlatform }}
            </el-col>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('test.testTask.testStatus') }}</span>{{ projectDetailData.status }}
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
                  <em class="el-icon-warning" />{{ $t('workspace.appStoreMd') }}
                </div>
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <!-- 能力发布详情 -->
        <h3 class="tit_gray_bg">
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
                    width="220px"
                    fixed="right"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="medium"
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
                :title="$t('devTools.detail')"
                :visible.sync="filterShow"
                width="70%"
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
                      :label="$t('workspace.appRelease.tgtTunnelAddress')"
                    />
                    <el-table-column
                      prop="dstTunnelPort"
                      :label="$t('workspace.appRelease.dstTunnelPort')"
                    />
                    <el-table-column
                      prop="srcTunnelAddress"
                      :label="$t('workspace.appRelease.srcTunnelAddress')"
                    />
                    <el-table-column
                      prop="srcTunnelPort"
                      :label="$t('workspace.appRelease.srcTunnelPort')"
                    />
                    <el-table-column
                      prop="tag"
                      :label="$t('workspace.appRelease.tag')"
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
                    {{ $t('workspace.appRelease.interfaceInfo') }}
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
                      :label="$t('workspace.appRelease.interfaceType')"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelType"
                      :label="$t('workspace.appRelease.tunnelType')"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelDstAddress"
                      :label="$t('workspace.appRelease.tgtTunnelAddress')"
                      width="120px"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelSrcAddress"
                      :label="$t('workspace.appRelease.srcTunnelAddress')"
                    />
                    <el-table-column
                      prop="tunnelInfo.tunnelSpecificData"
                      :label="$t('workspace.appRelease.tunnelParams')"
                    />
                    <el-table-column
                      prop="dstMACAddress"
                      :label="$t('workspace.appRelease.macAddress')"
                    />
                    <el-table-column
                      prop="srcMACAddress"
                      :label="$t('workspace.appRelease.sourceMacAddress')"
                    />
                    <el-table-column
                      prop="dstIPAddress"
                      :label="$t('workspace.appRelease.dstAddress')"
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
                    width="220px"
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
            <el-tab-pane
              :label="$t('workspace.appRelease.blackWhiteList')"
              disabled
            />
            <el-tab-pane
              :label="$t('workspace.appRelease.UEIdentity')"
              disabled
            />
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
                width="220px"
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
        </div>
      </div>
      <!-- 第二步“应用测试” -->
      <div v-show="step==='step2'">
        <div
          v-show="showAtp"
          class="atp_iframe mt20"
        >
          <iframe
            :src="iframeUrl"
            :title="$t('workspace.appRelease.appCertify')"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <!-- 第三步“应用发布” -->
      <div v-show="step==='step3'">
        <div class="release_test">
          <!-- 应用测试任务列表 -->
          <el-table
            :data="appTestData"
            style="width: 100%"
          >
            <el-table-column
              prop="appName"
              :label="$t('test.testTask.appName')"
            />
            <el-table-column
              prop="createTime"
              :label="$t('test.testTask.startTime')"
            />
            <el-table-column
              :label="$t('test.testTask.testStatus')"
            >
              <template slot-scope="scope">
                <span
                  class="el-icon-error failed icon"
                  v-if="scope.row.status!=='success'"
                />
                <span
                  v-else
                  class="el-icon-success success icon"
                />
                <span :class="scope.row.status==='success'?'success':'failed'">{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('test.testTask.operation')"
            >
              <template slot-scope="scope">
                <el-button
                  class="bgBtn"
                  size="small"
                  @click="releaseApp"
                  :disabled="scope.row.status==='success'?false:true"
                >
                  {{ $t('workspace.publish') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
    <div
      class="detail_btn"
      v-if="detail_btn"
    >
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
      projectDetailData: {
        name: '',
        type: '',
        version: '',
        platform: '',
        dependent: '',
        instantiateId: '',
        deployPlatform: '',
        status: ''
      },
      appMdList: [],
      appTestData: [],
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
      atpUrl: '',
      showAtp: false,
      iframeUrl: '',
      projectId: sessionStorage.getItem('mecDetailID'),
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      taskId: '',
      detail_btn: true
    }
  },
  methods: {
    getProjectInfo () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        let data = res.data
        this.projectDetailData.name = data.name
        this.projectDetailData.type = data.type
        this.projectDetailData.version = data.version
        this.projectDetailData.platform = data.platform[0]
        let dependent = res.data.capabilityList
        let arr = []
        dependent.forEach(item => {
          item.capabilityDetailList.forEach(itemSub => {
            arr.push(itemSub.service)
          })
        })
        arr = Array.from(new Set(arr))
        this.projectDetailData.dependent = arr.join('，')
      })
    },
    getTestConfig () {
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getTestConfigApi(projectId).then(res => {
        sessionStorage.setItem('csarId', res.data.appInstanceId)
        this.projectDetailData.instantiateId = res.data.appInstanceId
        this.projectDetailData.deployPlatform = res.data.platform
        this.projectDetailData.status = res.data.deployStatus
      })
    },
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
            this.$message.error(this.$t('promptMessage.editRuleFail'))
          } else {
            this.$message.error(this.$t('promptMessage.saveRuleFail'))
          }
        })
      })
    },
    getReleaseConfigFirst () {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        let releaseId = res.data.releaseId
        Workspace.saveRuleConfig(this.projectId, this.trafficAllData, releaseId)
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
        this.detail_btn = true
      } else if (active === 1) {
        this.step = 'step2'
        this.getAtpTest()
        this.detail_btn = false
      } else if (active === 2) {
        this.step = 'step3'
        this.getAtpList()
        this.detail_btn = false
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
      if (this.appMdList.length > 0) {
        this.uploadFile(this.appMdList)
      }
    },
    uploadFile (fileList) {
      let fd = new FormData()
      fd.append('file', fileList[0])
      Workspace.submitApiFileApi(this.userId, fd).then(res => {
        this.trafficAllData.guideFileId = res.data.fileId
        this.$message.success(this.$t('promptMessage.uploadSuccess'))
      }).catch(() => {
        fileList = []
        this.$message.error(this.$t('promptMessage.uploadFailure'))
      })
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
          apiJson: '',
          apiMd: '',
          trafficRulesList: '',
          dnsRulesList: '',
          groupId: ''
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
      this.trafficAllData.appInstanceId = sessionStorage.getItem('csarId')
      this.getReleaseConfig(this.trafficAllData)
    },
    // 集成应用测试页面
    getAtpTest () {
      Workspace.getAtpTestApi(this.projectId).then(res => {
        if (res.data) {
          Workspace.getReleaseApi(this.projectId).then(response => {
            this.taskId = response.data.atpTest.id
            this.setApiHeight()
            this.iframeUrl = this.atpUrl + '/#/atpprocess?taskid=' + this.taskId
            this.showAtp = true
          }).catch(() => {
            this.$message.error(this.$t('promptMessage.getDataFail'))
          })
        }
      })
    },
    // 获取集成测试列表
    getAtpList () {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        let data = res.data.atpTes
        data.createTime = this.dateChange(data.createTime)
        this.appTestData.push(data)
        console.log(this.appTestData)
      })
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let H = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        let changeDate = Y + '-' +
      (M > 9 ? M : ('0' + M)) + '-' +
      (D > 9 ? D : ('0' + D)) + ' ' +
      (H > 9 ? H : ('0' + H)) + ':' +
      (m > 9 ? m : ('0' + m)) + ':' +
      (s > 9 ? s : ('0' + s))
        return changeDate
      }
    },
    releaseApp () {
      Workspace.isPublishApi(this.projectId, this.userId, this.userName).then(() => {
        this.dialogAppPublicSuccess = true
      }).catch(() => {
        this.$message.error(this.$t('promptMessage.appReleaseFail'))
      })
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
        this.atpUrl = 'https://' + currUrl.split('//')[1].split(':')[0] + ':30094'
      } else {
        this.appStoreUrl = currUrl.replace('developer', 'appstore')
        this.atpUrl = currUrl.replace('developer', 'atp')
      }
    }
  },
  created () {
  },
  mounted () {
    this.getProjectInfo()
    this.getTestConfig()
    this.getAppstoreUrl()
    this.getAllListData()
    this.getReleaseConfigFirst()
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
    background:#eef3fe;
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
        padding: 0 20px;
        font-size: 14px;
        margin:0 0 18px 0;
        border-right: 1px solid #ddd;
        border-radius: 0;
      }
      .el-tabs__item:last-child{
        border-right: 0;
      }
      .el-tabs__item.is-active{
        color: #688ef3;
      }
      .el-tabs__item.is-disabled{
        cursor:not-allowed;
      }
      .el-tabs__item.is-disabled:hover{
        color: #C0C4CC;
      }
      .el-tabs__active-bar{
        height: 4px;
      }
      .el-tab-pane{
        padding: 24px 0;
      }
    }
    .el-table{
      margin: 20px 0;
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
  .detail_btn{
    width: 80%;
    margin: 0 10%;
    padding: 0 30px;
  }
  @media screen and (max-width: 1380px){
    .detail_btn{
      width: 100%;
      margin: 0;
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
    iframe{
      border: none;
    }
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
        text-align: center;
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
