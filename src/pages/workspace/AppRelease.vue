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
  <div class="appRelease">
    <el-steps
      class="work-steps"
      :active="active"
      finish-status="success"
      space="90px"
    >
      <el-step
        v-for="(item, index) in 3"
        :key="index"
      />
    </el-steps>

    <div
      class="release_steps"
      :class="{'release_steps2':step==='step2'}"
    >
      <!-- First step Application config -->
      <div
        class="firststep"
        v-show="step==='step1'"
      >
        <!-- Project detail -->
        <div class="work-title defaultFontLight">
          {{ $t('workspace.projectDetails') }}
        </div>

        <div class="app_detail">
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.projectName') }}</span><p class="right_content defaultFontLight">
                {{ projectDetailData.name }}
              </p>
            </el-col>
            <el-col
              :sm="14"
              :xs="24"
            >
              <span class="span_left">{{ $t('test.testApp.type') }}</span><p class="right_content defaultFontLight">
                {{ projectDetailData.type }}
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.version') }}</span><p class="right_content defaultFontLight">
                {{ projectDetailData.version }}
              </p>
            </el-col>
            <el-col
              :sm="14"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.architecture') }}</span><p class="right_content defaultFontLight">
                {{ projectDetailData.platform }}
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.deployType') }}</span><p class="right_content defaultFontLight">
                {{ deployPlatform==='KUBERNETES'?$t('workspace.containerImage'):$t('workspace.vmImage') }}
              </p>
            </el-col>
            <el-col
              :sm="14"
              :xs="24"
            >
              <span class="span_left">{{ $t('test.testTask.testStatus') }}</span><p class="right_content defaultFontLight">
                {{ projectDetailData.status }}
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              :sm="10"
              :xs="24"
            >
              <span class="span_left">{{ $t('workspace.dependentApp') }}</span>
              <span
                class="span_right"
                :class="{'span_right_en':language==='en'}"
              >
                <p class="right_content defaultFontLight">{{ dependentNum===0 ? $t('workspace.noDependent') : projectDetailData.dependent }}</p>
              </span>
            </el-col>
            <el-col
              :sm="14"
              :xs="24"
            >
              <span
                class="span_left"
                :class="{'span_left_en':language==='en'}"
              >{{ $t('workspace.createDate') }}</span><p class="right_content defaultFontLight">
                {{ projectDetailData.createDate }}
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="appdesc">
              <span class="span_left lt">{{ $t('workspace.applicationDesc') }}</span>
              <el-upload
                class="upload-demo clear defaultFontLight"
                :class="{'upload-demo_en':language==='en'}"
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
                >
                  {{ $t('workspace.configYaml.uploadFile') }}
                </el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="this.$t('workspace.appStoreMd')"
                    placement="right"
                  >
                    <em class="el-icon-info" />
                  </el-tooltip>
                </div>
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <!-- Application rule config -->
        <div class="work-title defaultFontLight">
          {{ $t('workspace.ruleConfig') }}
        </div>
        <div class="release_detail defaultFontLight">
          <!-- Traffic rule config -->
          <div class="work-table traffic-rule">
            <div class="work-table-title">
              {{ $t('workspace.trafficRules') }}
              <span
                class="addBtn"
                @click="openDialog('trafficRule')"
              ><i class="el-icon-circle-plus-outline" /> {{ $t('workspace.add')+$t('workspace.trafficRules') }}</span>
            </div>
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
              >
                <template slot-scope="scope">
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
            <!-- Traffic rule pop up -->
            <div v-if="trafficDialog">
              <addTrafficRules
                v-model="trafficDialog"
                @closeFatherDialog="closeDialog"
                @getAddTrafficData="getAddTrafficData"
                :edit-rule-dataprop="editRuleData"
              />
            </div>
          </div>
          <!-- dns rule config -->
          <div class="work-table dns-rule">
            <div class="work-table-title">
              {{ $t('workspace.dnsRules') }}
              <span
                class="addBtn"
                @click="openDialog('dnsRule')"
              ><i class="el-icon-circle-plus-outline" /> {{ $t('workspace.add')+$t('workspace.dnsRules') }}</span>
            </div>
            <el-table
              :data="dnsListData"
              style="width: 100%"
            >
              <el-table-column
                prop="dnsRuleId"
                :label="$t('workspace.appRelease.dnsRuleId')"
              />
              <el-table-column
                prop="domainName"
                :label="$t('workspace.appRelease.domainName')"
              />
              <el-table-column
                prop="ipAddressType"
                :label="$t('workspace.appRelease.ipAddressType')"
              />
              <el-table-column
                prop="ipAddress"
                :label="$t('workspace.appRelease.ipAddress')"
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
            <!-- DNS rules pop up -->
            <div v-if="dnsDialog">
              <addDnsRules
                v-model="dnsDialog"
                @closeFatherDialog="closeDialog"
                @getAddDnsData="getAddDnsData"
                :edit-rule-dataprop="editRuleData"
              />
            </div>
          </div>
        </div>
        <!-- Application publish config -->
        <div class="work-title defaultFontLight">
          {{ $t('workspace.appPublishConfig') }}
        </div>
        <div class="release_detail">
          <div class="work-table">
            <div class="work-table-title">
              {{ $t('workspace.appPublishConfig') }}
              <span
                class="addBtn"
                @click="openDialog('publicConfig')"
              ><i class="el-icon-circle-plus-outline" /> {{ $t('workspace.add')+$t('workspace.appPublishConfig') }}</span>
            </div>
            <!-- Application service pulish config -->
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
            <!-- Application publish dialog -->
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
        <div class="step1 defaultFontLight">
          <el-button
            v-if="active===0"
            class="work-button"
            @click="saveConfig"
            :disabled="isRelease"
          >
            {{ $t('workspace.saveData') }}
          </el-button>
          <el-button
            v-if="active===0"
            class="work-button"
            @click="appDetaildialog=true"
            :disabled="isRelease"
          >
            {{ $t('workspace.appDetails') }}
          </el-button>
        </div>
      </div>
      <!-- Second step “App test” -->
      <div
        class="second-step"
        v-show="step==='step2'"
      >
        <div class="btn-wrapper">
          <el-button
            type="primary"
            class="atp_button"
            @click="intoAtpTest"
          >
            {{ $t('workspace.appRelease.enterAtp') }}
          </el-button>
          <el-button
            type="primary"
            class="atp_button"
            @click="getAtpTest"
          >
            {{ $t('workspace.appRelease.startTest') }}
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="this.$t('workspace.releaseText')"
              placement="right"
            >
              <em class="el-icon-info" />
            </el-tooltip>
          </div>
        </div>
        <div
          v-show="showAtp"
          class="atp_iframe mt20"
          v-loading="iframeLoading"
        >
          <iframe
            v-if="isRouterAlive"
            :src="iframeUrl"
            :title="$t('workspace.appRelease.appCertify')"
            width="100%"
            height="100%"
          />
        </div>
      </div>
      <!--Third step “App publish” -->
      <div
        class="third-step"
        v-show="step==='step3'"
      >
        <div class="work-title defaultFontLight">
          {{ $t('workspace.ruleConfig') }}
        </div>
        <div class="release_test">
          <!-- App test list -->
          <div class="work-table">
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
                    class="el-icon-loading Running icon"
                    v-if="scope.row.status==='running'"
                  />
                  <span
                    class="el-icon-error failed icon"
                    v-if="scope.row.status==='failed'"
                  />
                  <span
                    v-if="scope.row.status==='success'"
                    class="el-icon-success success icon"
                  />
                  <span :class="scope.row.status">{{ scope.row.status }}</span>
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
                    :loading="publishLoading"
                  >
                    {{ $t('workspace.publish') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- App publish success dialog-->
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
    <div class="elButton defaultFontLight">
      <el-button
        id="prevBtn"
        type="primary"
        v-if="active>0"
        @click="previous"
      >
        {{ $t('workspace.previous') }}
      </el-button>
      <el-button
        id="nextBtn"
        type="primary"
        v-if="active<2"
        @click="next"
        :disabled="isRelease"
      >
        {{ $t('workspace.nextStep') }}
      </el-button>
    </div>
    <!-- Application details pop up -->
    <div v-if="appDetaildialog">
      <appPackageDetail
        v-model="appDetaildialog"
      />
    </div>
    <!-- Resouce release pop up -->
    <el-dialog
      :title="$t('promptMessage.prompt')"
      :visible.sync="isCleanEnvDialog"
      width="50%"
      :before-close="handleClose"
      center
    >
      <el-button
        type="primary"
        @click="cleanTestEnvRelease"
        class="mt20"
      >
        {{ $t('workspace.recycle') }}
      </el-button>
      <p class="mt20">
        {{ $t('workspace.recycleTip') }}
      </p>
    </el-dialog>
  </div>
</template>
<script>
import { Workspace, vmService, Capability } from '../../tools/api.js'
import { Type } from '../../tools/project_data.js'
import addTrafficRules from './AddTrafficRules.vue'
import addDnsRules from './AddDnsRules.vue'
import addAppPublishConfig from './AddAppPublishConfig.vue'
import appPackageDetail from './AppPackageDetails.vue'
export default {
  name: 'AppRelease',
  props: {
    isCleanEnvProp: {
      type: Boolean,
      default: false
    },
    deployPlatformProp: {
      type: String,
      default: 'KUBERNETES'
    }
  },
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
        appInstanceId: '',
        status: 'NOTDEPLOY',
        createDate: ''
      },
      language: localStorage.getItem('language'),
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
      isRouterAlive: true,
      iframeUrl: '',
      projectId: sessionStorage.getItem('mecDetailID'),
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      taskId: '',
      interval: null,
      mdFileId: '',
      iframeLoading: true,
      dependentNum: 0,
      isCleanEnv: this.isCleanEnvProp,
      isCleanEnvDialog: false,
      publishLoading: false,
      imageStatus: 'NOTDEPLOY',
      deployPlatform: this.deployPlatformProp,
      isRelease: true,
      vmRelease: false
    }
  },
  methods: {
    handleClose () {
      this.isCleanEnvDialog = false
    },
    // Release resources
    cleanTestEnvRelease () {
      Workspace.cleanTestEnvApi(this.projectId, this.userId).then(response => {
        this.$message({
          message: this.$t('workspace.clearEnv')
        })
        this.isCleanEnv = true
        this.isCleanEnvDialog = false
        sessionStorage.setItem('isCleanTestEnv', 'Releaseed')
      }).catch(err => {
        console.log(err)
      })
    },
    checkProjectData () {
      Type.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.projectDetailData.type === itemFe.label[1]) {
            this.projectDetailData.type = itemFe.label[0]
          }
        } else {
          if (this.projectDetailData.type === itemFe.label[0]) {
            this.projectDetailData.type = itemFe.label[1]
          }
        }
      })
    },
    getProjectInfo () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        let data = res.data
        this.projectDetailData.name = data.name
        this.projectDetailData.type = data.type
        this.projectDetailData.version = data.version
        this.projectDetailData.platform = data.platform[0]
        this.projectDetailData.createDate = data.createDate
        this.projectDetailData.status = this.imageStatus = data.status

        Capability.getCapabilityByProjectId(this.projectId).then(result => {
          let capabilities = result.data
          this.dependentNum = capabilities.length
          let capabilityDesc = []
          for (let capability of capabilities) {
            if (this.language === 'cn') {
              capabilityDesc.push(capability.name)
            } else {
              capabilityDesc.push(capability.nameEn)
            }
          }
          this.projectDetailData.dependent = capabilityDesc.join('，')
        })

        if (this.imageStatus === 'ONLINE' && this.deployPlatform === 'KUBERNETES') {
          this.isRelease = true
          this.showEgMessageBox('warning', this.$t('promptMessage.notDeploy'))
        } else if (this.imageStatus === 'ONLINE' && this.deployPlatform === 'VIRTUALMACHINE') {
          this.isRelease = true
        } else {
          this.isRelease = false
        }
        if ((data.deployPlatform === 'VIRTUALMACHINE') && (data.status !== 'ONLINE')) {
          this.getReleaseConfigFirst()
        }
      })
    },
    getTestConfig () {
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getTestConfigApi(projectId).then(res => {
        if (res.data.testId && res.data.appInstanceId) {
          sessionStorage.setItem('csarId', res.data.appInstanceId)
          this.projectDetailData.appInstanceId = res.data.appInstanceId
          if (this.deployPlatform === 'KUBERNETES' && res.data.deployStatus) {
            this.getReleaseConfigFirst()
          }
        }
        let deployStatus = res.data.deployStatus === 'SUCCESS' || res.data.deployStatus === 'FAILED'
        if (deployStatus && !this.isCleanEnv) {
          this.isCleanEnvDialog = true
        }
      })
    },
    // Echo the APP description document
    getReleaseConfigList () {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        this.mdFileId = res.data.guideFileId
        if (this.mdFileId) {
          this.getFileList()
        }
      })
    },
    // Manually click the Save Rules button
    getReleaseConfig (params) {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        let releaseId = res.data.releaseId
        Workspace.saveRuleConfig(this.projectId, params, releaseId).then(() => {
          if (releaseId) {
            this.showEgMessageBox('success', this.$t('promptMessage.editRuleSuccess'))
          } else {
            this.showEgMessageBox('success', this.$t('promptMessage.saveRuleSuccess'))
          }
        }).catch(() => {
          if (releaseId) {
            this.showEgMessageBox('error', this.$t('promptMessage.editRuleFail'))
          } else {
            this.showEgMessageBox('error', this.$t('promptMessage.saveRuleFail'))
          }
        })
      })
    },
    // Save/modify configuration rules by default
    getReleaseConfigFirst () {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        let releaseId = res.data.releaseId
        if (res.data.atpTest) {
          this.trafficAllData.atpTest = res.data.atpTest
        }
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
        this.clearInterval()
      } else if (active === 1) {
        this.step = 'step2'
        this.getAtpData()
        this.clearInterval()
      } else if (active === 2) {
        this.step = 'step3'
        this.getAtpList()
        this.interval = setInterval(() => {
          this.getAtpList()
        }, 1000)
      }
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    // Check upload file type
    checkFileType (fileList, fileTypeArr, uploadFileList) {
      let checkPassed = true
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
        this.showEgMessageBox('warning', this.$t('promptMessage.checkFileType'))
        checkPassed = false
      }
      return checkPassed
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.showEgMessageBox('warning', this.$t('promptMessage.onlyOneFile'))
      }
    },
    // Upload application description file
    changeAppStoreMd (file, fileList) {
      if (file.raw.name.indexOf(' ') !== -1) {
        this.showEgMessageBox('warning', this.$t('promptMessage.fileNameType'))
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
        this.getReleaseConfigFirst()
        this.showEgMessageBox('success', this.$t('promptMessage.uploadSuccess'))
      }).catch(() => {
        fileList = []
        this.showEgMessageBox('error', this.$t('promptMessage.uploadFailure'))
      })
    },
    removeAppStoreMd (file, fileList) {
      this.appMdList = fileList
    },
    // Get the list of rules
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
    // Open the add rule popup
    openDialog (name) {
      this.isAddRuleData = true
      if (name === 'dnsRule') {
        this.dnsDialog = true
        this.editRuleData = {
          dnsRuleId: '',
          domainName: 'domainName',
          ipAddressType: 'IP_V4',
          ipAddress: '0.0.0.0',
          ttl: '85000'
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
          twoLevelName: '',
          description: '',
          serviceName: '',
          internalPort: 0,
          version: '',
          protocol: 'https',
          apiJson: '',
          apiMd: '',
          trafficRulesList: '',
          dnsRulesList: '',
          oneLevelName: '',
          oneLevelNameEn: ''
        }
      }
    },
    // Add rule list
    getAddDnsData (data) {
      if (this.isAddRuleData) {
        this.dnsListData.push(data)
        this.showEgMessageBox('success', this.$t('promptMessage.addSuccess'))
      } else {
        this.dnsListData.splice(this.editIndex, 1, data)
        this.showEgMessageBox('success', this.$t('promptMessage.editSuccess'))
      }
      sessionStorage.setItem('dnsData', JSON.stringify(this.dnsListData))
    },
    getAddTrafficData (data) {
      if (this.isAddRuleData) {
        this.trafficListData.push(data)
        this.showEgMessageBox('success', this.$t('promptMessage.addSuccess'))
      } else {
        this.trafficListData.splice(this.editIndex, 1, data)
        this.showEgMessageBox('success', this.$t('promptMessage.editSuccess'))
      }
      sessionStorage.setItem('trafficData', JSON.stringify(this.trafficListData))
    },
    getAddPublicConfigData (data) {
      if (this.isAddRuleData) {
        this.appPublishListData.push(data)
        this.showEgMessageBox('success', this.$t('promptMessage.addSuccess'))
      } else {
        this.appPublishListData.splice(this.editIndex, 1, data)
        this.showEgMessageBox('success', this.$t('promptMessage.editSuccess'))
      }
      this.trafficAllData.capabilitiesDetail.serviceDetails.push(data)
      sessionStorage.setItem('configData', JSON.stringify(this.appPublishListData))
    },
    // Edit rule list
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
    // Delete rule list
    deleteRuleData (index) {
      this.dnsListData.splice(index, 1)
      sessionStorage.setItem('dnsData', JSON.stringify(this.dnsListData))
      this.showEgMessageBox('success', this.$t('devTools.deleteSucc'))
    },
    deleteTrafficData (index) {
      this.trafficListData.splice(index, 1)
      sessionStorage.setItem('trafficData', JSON.stringify(this.trafficListData))
      this.showEgMessageBox('success', this.$t('devTools.deleteSucc'))
    },
    deleteConfigData (index) {
      this.appPublishListData.splice(index, 1)
      sessionStorage.setItem('configData', JSON.stringify(this.appPublishListData))
      this.showEgMessageBox('success', this.$t('devTools.deleteSucc'))
    },
    showEgMessageBox (infoType, infoContent) {
      this.$eg_messagebox({
        type: infoType,
        title: '',
        desc: infoContent,
        cancelText: this.$t('common.cancelText')
      }).then(() => {}).catch(() => {})
    },
    strToArray (str) {
      let arr = []
      arr = str.split(',')
      return arr
    },
    // Save configured rule data
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
      if (this.projectDetailData.appInstanceId || this.vmRelease) {
        this.getReleaseConfig(this.trafficAllData)
        this.isRelease = false
      } else {
        this.showEgMessageBox('warning', this.$t('promptMessage.notDeploy'))
        this.isRelease = true
      }
    },
    // Integrated application test page
    getAtpTest () {
      this.showAtp = false
      this.iframeUrl = ''
      Workspace.getAtpTestApi(this.projectId, this.userId).then(res => {
        if (res.data) {
          this.getAtpData()
        }
      })
    },
    // Into ATP Test
    intoAtpTest () {
      window.open(this.atpUrl, '_blank')
    },
    // Reload the integrated ATP test page
    rebuildComponents () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
        this.getAtpData()
      })
    },
    getAtpData () {
      Workspace.getReleaseApi(this.projectId).then(response => {
        this.taskId = response.data.atpTest.id
        let testStatus = response.data.atpTest.status
        if (this.taskId) {
          if (testStatus === 'success' || testStatus === 'failed' || testStatus === 'running') {
            this.iframeUrl = this.atpUrl + '/#/atpprocess?taskId=' + this.taskId + '&language=' + this.language
          } else {
            this.iframeUrl = this.atpUrl + '/#/selectscene?taskId=' + this.taskId + '&language=' + this.language
          }
          this.showAtp = true
          this.iframeLoading = false
        }
      }).catch(() => {
        this.showEgMessageBox('error', this.$t('promptMessage.getDataFail'))
        setTimeout(() => {
          this.iframeLoading = false
        }, 2000)
      })
    },
    // Get the list of integration tests
    getAtpList () {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        this.appTestData = []
        let data = res.data.atpTest
        data.createTime = this.dateChange(data.createTime)
        this.appTestData.push(data)
        if (data.status === 'success' || data.status === 'failed') {
          this.clearInterval()
        }
        if (data.status === '') {
          this.clearInterval()
          this.appTestData = []
        }
      }).catch(() => {
        this.clearInterval()
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
        return Y + '-' +
      (M > 9 ? M : ('0' + M)) + '-' +
      (D > 9 ? D : ('0' + D)) + ' ' +
      (H > 9 ? H : ('0' + H)) + ':' +
      (m > 9 ? m : ('0' + m)) + ':' +
      (s > 9 ? s : ('0' + s))
      }
    },
    releaseApp () {
      this.publishLoading = true
      Workspace.isPublishApi(this.projectId, this.userId, this.userName).then(() => {
        this.dialogAppPublicSuccess = true
        this.publishLoading = false
      }).catch(err => {
        console.log(err.response)
        this.showEgMessageBox('warning', this.$t('promptMessage.appReleaseFail'))
        this.publishLoading = false
      })
    },
    // Close the bullet box
    closeDialog (data) {
      this.trafficDialog = data
      this.dnsDialog = data
      this.appPublishDialog = data
    },
    getAppstoreUrl () {
      let currUrl = window.location.origin
      if (currUrl.indexOf('30092') !== -1) {
        this.appStoreUrl = currUrl.replace('30092', '30091')
        this.atpUrl = currUrl.replace('30092', '30094')
      } else {
        this.appStoreUrl = currUrl.replace('developer', 'appstore')
        this.atpUrl = currUrl.replace('developer', 'atp')
      }
    },
    getFileList () {
      Workspace.getApiFileApi(this.mdFileId, this.userId).then(res => {
        let obj = { name: '' }
        obj.name = res.data.fileName
        this.appMdList.push(obj)
      })
    },
    getVmResourceList () {
      vmService.getApplyVmResourceList(this.projectId, this.userId).then(res => {
        if ((this.deployPlatform === 'VIRTUALMACHINE') && (JSON.stringify(res.data) === '""')) {
          this.showEgMessageBox('warning', this.$t('workspace.deployDebugVm.releasePromt'))
          this.isRelease = true
        } else if ((this.deployPlatform === 'VIRTUALMACHINE') && (JSON.stringify(res.data) !== '""')) {
          sessionStorage.setItem('csarId', res.data.appInstanceId)
          this.isRelease = false
          this.vmRelease = true
        }
      })
    }
  },
  mounted () {
    this.getProjectInfo()
    this.getTestConfig()
    this.getVmResourceList()
    this.getAppstoreUrl()
    this.getAllListData()
    this.getReleaseConfigList()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      let spanLeft = document.getElementsByClassName('span_left')
      this.language = language
      this.rebuildComponents()
      this.getAppstoreUrl()
      this.checkProjectData()
      this.getProjectInfo()
      if (language === 'en') {
        spanLeft.forEach(item => {
          item.style.width = 165 + 'px'
        })
      } else {
        spanLeft.forEach(item => {
          item.style.width = 95 + 'px'
        })
      }
    }
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>
<style lang="less">
 @media screen and (max-width: 1650px){
  .addAppPublish{
       .el-button.featuresBtn{
       width:100% !important;
      }
      }
 }
  @media screen and (max-width: 1500px){
  .addAppPublish{
      .f55_en{
        width:100% !important;
        margin-bottom:0px !important;
      }
      }
 }
.appRelease{
  .release_steps2{
    background-color: #fbfbfb !important;
    box-shadow:none !important;
  }
  .release_steps{
    width: 100%;
    padding: 46px 0 40px 0;
    border-radius: 16px;
    box-shadow: 6px 4px 45px 0 rgba(36, 20, 119, 0.11) inset;
    background-color: #f1f2f6;
    margin-top: 60px;
    .firststep, .third-step {
      padding: 0 30px 0 39px;
      .step1 {
        margin: 40px 0 0 !important;
        text-align: right;
        .work-button {
          margin-left: 30px;
          height:40px;
          line-height:40px;
          font-size:16px;
          padding:0px 12px;
          min-width:auto;
        }
        .work-button.el-button.is-disabled, .work-button.el-button.is-disabled:hover {
          background-color: #5844be;
        }
      }
    }
    .second-step {
      min-height: 464px;
      .btn-wrapper {
        margin-top: -122px;
        float: right;
      }
      .atp_button {
        font-size: 16px;
        background-color: #5844be !important;
        height: 39px;
        border-radius: 8px;
        font-family: defaultFontLight !important;
      }
    }
  }
  .release_btn{
    width: 96%;
    margin: 100px 2% 20px;
    text-align: right;
    .el-button{
      padding: 8px 12px;
      strong{
        font-weight: normal;
      }
    }
  }
  .addBtn {
    float: right;
    padding-right: 12px;
    font-size: 14px !important;
    cursor: pointer;
  }
  .el-table td, .el-table th{
    text-align: center;
    .icon{
      margin-right: 5px;
    }
    .test_info{
      color: #688ef3;
      margin-right: 15px;
    }
    .is-disabled{
      background: #aaa;
      border: 1px solid #aaa;
    }
  }
  .el-button.margin_left{
    margin-left: 10px;
  }
  .app_detail{
    margin: 13px 0 30px;
    padding: 0 40px;
    font-size: 14px;
    .appdesc {
      padding: 10px 10px 10px 0 !important;
      .span_left {
        padding-top: 9px;
      }
    }
    .el-col{
      padding: 6px 10px 6px 0px;
      font-size: 16px;
      line-height: 25px;
      span{
        line-height: 25px;
      }
      .span_left{
        float: left;
        text-align: right;
        color: #380879 !important;
        width: 97px;
        min-width: 97px;
        padding-right: 22px;
      }
      .span_left_en{
        width: 165px;
      }
      .upload-demo_en{
        padding-top:14px;
      }
      .right_content {
        color: #380879;
      }
      .span_right {
        float: left;
        width: calc(100% - 115px);
      }
      .span_right_en  {
        width: calc(100% - 185px);
      }
      .upload-demo {
        display: inline-block;
      }
      .el-upload  {
        float: left;
        .el-button  {
          font-size: 16px !important;
          background: #5844be !important;
          border: 1px solid #5844be !important;
          color: #ffffff !important;
          border-radius: 8px;
          padding: 10px 20px;
          span{
            line-height: 0;
          }
        }
      }
      .el-upload__tip {
        font-size: 14px;
        float: left;
        margin: 0 0 0 2px;
        color: #380879;
        text-align: left;
        padding-top: 8px;
      }
      .el-button--primary {
        margin-top: 0;
      }
      .el-upload-list__item:hover {
        background-color: #f1f2f6;
        border-radius: 8px;
        box-shadow: 3px 3px 25px 0 rgba(36, 20, 119, 0.11) inset;
      }
      .el-upload-list__item.is-success .el-upload-list__item-name:focus,.el-icon-close:before, .el-upload-list__item-name, .el-upload-list__item-name .el-icon-document,.el-upload-list__item .el-icon-upload-success {
        color: #7965e0 !important;
      }
      .el-upload-list__item {
        margin-top: 0;
        min-width: 145px !important;
        font-size: 16px !important;
        width: 100%;
      }
      .el-upload-list__item-name {
        margin-right: 0px;
        line-height: 23px;
        padding: 0 30px 0 10px;
      }
      .el-upload-list__item-status-label {
        top: -1px;
      }
      .el-upload-list__item:first-child {
        margin-top: 0;
      }
      .el-upload-list {
        float: right;
        margin: 6px 0 0 10px;
        width: auto;
        border-radius: 8px;
        background-color: #f1f2f6;
        height: 26px;
        box-shadow: 3px 3px 25px 0 rgba(36, 20, 119, 0.11) inset;
      }
    }
  }
  .release_detail, .release_test{
    font-size: 14px !important;
    margin-top: 25px;
    padding: 0 0 0 52px;
    .work-table-title {
      font-size: 16px;
    }
    .traffic-rule {
      .el-table {
        border-radius: 0 0 0 0 !important;
      }
    }
    .dns-rule {
      .el-table {
        margin-bottom: 45px;
      }
      .work-table-title {
        border-radius: 0 0 0 0 !important;
        background-color: #9f97cb !important;
      }
    }
    .el-button--text {
      color: #62517a !important;
    }
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
        padding: 24px 0 0;
      }
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
      font-size: 14px;
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
  .atp_link {
    margin-top: -75px;
    color: #688ef3;
    border-bottom: 1px solid #688ef3;
    font-size: 16px;
    float: right;
  }
  .atp_iframe{
    height: 770px;
    iframe{
      border: none;
      height: 100%;
      #app{
        background-color: none;
      }
    }
  }
  .release_test{
    .el-table{
      border-radius: 12px 12px 12px 12px ;
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
  .el-dialog{
    border-radius:12px;
    padding:40px 39px;
    background-color: #efefef;
    min-width:640px;
    .el-dialog__header{
    display:none;
    }
    .el-dialog__body{
    padding:0px !important;
  }
  .el-dialog__footer{
    padding-bottom:0px;
    padding-top:20px;
    padding-right:0px;
  }
  .dialog-footer{
    padding-right:0px !important;
  }
  .el-button--default{
    border: 1px solid #5844be;
    color: #fff;
    background-color: #5844be;
    width: 80px;
    padding: 8px 8px;
     border-radius:10px;
  }
   .el-button--primary{
      border: 1px solid #5844be;
      color: #fff;
      background-color: #5844be;
      width: 80px;
      padding: 8px 8px;
      border-radius:10px;

  }
  .title{
    font-weight:normal !important;
    font-size:20px !important;
    color:#380879;
    text-align: left;
    margin-bottom:25px !important;
  }
  .title::before{
    content:'';
    display:inline-block;
    width:17px;
    height:17px;
    margin-right:13px;
    background: linear-gradient(60deg,#70dcc7,#bdeae1);
    position: relative;
    top:2px;
    border-radius:3px;
   }
  }
}
</style>
