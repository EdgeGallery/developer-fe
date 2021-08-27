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
  <div class="workdetail padding_default">
    <div class="newprojectTitle defaultFontBlod">
      <div v-if="isAppDevelopment">
        {{ $t('workspace.createProject') }}
      </div>
      <div v-else>
        {{ $t('workspace.migrationProject') }}
      </div>
    </div>
    <div class="newprojectcontent">
      <el-tabs
        @tab-click="setActive"
        class="elTabs"
        :class="{'enLeft':language==='en'}"
        v-model="activeName"
        tab-position="left"
      >
        <el-tab-pane
          class="elTabPane"
          name="1"
          lazy
        >
          <span
            slot="label"
            @mouseenter="groupListHover('1')"
            @mouseleave="groupListLeave('1')"
          >
            <em :class="['tab_detail', selectedName==='1' || activeName==='1' ?'tab_active':'tab_default']" />
            {{ $t('workspace.projectDetails') }}
          </span>
          <div
            v-if="activeName === '1'"
            class="project_detail"
          >
            <div v-if="isShowForm">
              <firstStep
                :fromreadonly="readonly"
                ref="firstStep"
                :project-typeprop="projectTypeprop"
                @getFormData="getFormData"
                :all-step-data="allFormData"
                :icon-file-id-prop="iconFileId"
              />
              <div
                class="elButton defaultFontLight"
                v-if="!isAppDevelopment"
              >
                <el-button
                  v-show="nextBtn"
                  id="nextBtn"
                  type="primary"
                  v-loading="uploadBtnLoading"
                  @click="onSubmitIntegration"
                >
                  {{ $t('workspace.confirm') }}
                </el-button>
                <el-button
                  v-show="editBtn"
                  id="nextBtn"
                  type="primary"
                  v-loading="uploadBtnLoading"
                  @click="onSubmitIntegration"
                >
                  {{ $t('common.save') }}
                </el-button>
              </div>
              <div
                class="elButton defaultFontLight"
                v-else
              >
                <el-button
                  id="nextBtn"
                  type="primary"
                  v-if="nextBtnDevApp"
                  v-loading="uploadBtnLoading"
                  @click="nextStep"
                >
                  {{ $t('workspace.next') }}
                </el-button>
              </div>
            </div>
            <div v-if="detailFlag">
              <ProjectFormDetail
                :project-detail-data="projectDetailData"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          class="elTabPane"
          name="2"
          lazy
          v-if="isAppDevelopment"
          style="padding:0"
          :disabled="isClick"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('2')"
            @mouseleave="groupListLeave('2')"
          >
            <em :class="['tab_capability',selectedName==='2' || activeName==='2'?'tab_active':'tab_default']" />{{ $t('workspace.capabilityDetails') }}
          </span>
          <api
            ref="secondStep"
            @getFormData="getFormData"
            :show-capability="showCapability"
            v-if="!showCapability"
          />
          <api
            ref="secondStep"
            @getFormData="getFormData"
            :show-capability="showCapability"
            v-if="showCapability"
          />
          <div v-if="!showCapability">
            <div class="elButton defaultFontLight">
              <el-button
                id="prevBtn"
                type="primary"
                v-if="active>0"
                @click="previousStep"
                class="prevStep"
              >
                {{ $t('workspace.previous') }}
              </el-button>
              <el-button
                id="confirmBtn"
                type="primary"
                v-if="active>=1 && !editBtn"
                :loading="uploadBtnLoading"
                @click="onSubmit"
                class="confirm"
              >
                {{ $t('workspace.confirm') }}
              </el-button>
              <el-button
                id="confirmBtn"
                type="primary"
                v-if="active>=1 && editBtn"
                :loading="uploadBtnLoading"
                @click="onSubmit"
                class="confirm"
              >
                {{ $t('common.save') }}
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('workspace.appDevelopment')"
          class="elTabPane"
          name="3"
          lazy
          v-if="isAppDevelopment"
          :disabled="isClick"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('3')"
            @mouseleave="groupListLeave('3')"
          >
            <em :class="['tab_appDev',selectedName==='3' || activeName==='3'?'tab_active':'tab_default']" />{{ $t('workspace.appDevelopment') }}
          </span>
          <EnvPreparation v-if="activeName === '3'" />
          <div class="elButton defaultFontLight">
            <el-button
              id="prevBtn"
              type="primary"
              @click="previousPane"
              :disabled="isDeploying"
            >
              {{ $t('workspace.previous') }}
            </el-button>
            <el-button
              id="nextBtn"
              type="primary"
              v-loading="apiDataLoading"
              @click="nextPane"
            >
              {{ $t('workspace.next') }}
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane
          class="elTabPane"
          name="6"
          lazy
          v-if="depPlatform === 'VIRTUALMACHINE'"
          :disabled="isClick"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('6')"
            @mouseleave="groupListLeave('6')"
          >
            <em :class="['tab_config',selectedName==='6' || activeName==='6'?'tab_active':'tab_default']" />{{ $t('workspace.deployDebugVm.resourceConfig') }}
          </span>
          <ResourceConfig v-if="activeName === '6'" />
        </el-tab-pane>
        <el-tab-pane
          class="elTabPane"
          name="4"
          lazy
          :disabled="isClick"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('4')"
            @mouseleave="groupListLeave('4')"
          >
            <em :class="['tab_deploy',selectedName==='4' || activeName==='4'?'tab_active':'tab_default']" />{{ $t('workspace.deploymentTest') }}
          </span>
          <div v-if="activeName === '4'">
            <DeployDebugVMMain
              v-if="deployPlatform === 'VIRTUALMACHINE'"
              :project-id="projectId"
              @checkCleanEnv="checkCleanEnv"
            />
            <DeployDebugK8sMain
              v-else
              :project-id="projectId"
              :active="active"
              :project-before-config="projectBeforeConfig"
              :api-data-loading="apiDataLoading"
              @getAppapiFileId="getAppapiFileId"
              @checkCleanEnv="checkCleanEnv"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane
          class="elTabPane"
          name="5"
          lazy
          :disabled="isClick"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('5')"
            @mouseleave="groupListLeave('5')"
          >
            <em :class="['tab_release',selectedName==='5' || activeName==='5'?'tab_active':'tab_default']" />{{ $t('workspace.applicationRelease') }}
          </span>
          <appRelease
            v-if="activeName === '5'"
            :is-clean-env-prop="isCleanEnv"
            :deploy-platform-prop="deployPlatform"
          />
        </el-tab-pane>
        <div v-if="dialogVisible">
          <publishAppDialog
            v-model="dialogVisible"
            :app-api-file-id-temp="appApiFileIdTemp"
          />
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Workspace, vmService } from '../../tools/api.js'
import EnvPreparation from './EnvPreparation.vue'
import publishAppDialog from './detail/PublishAppDialog.vue'
import DeployDebugVMMain from './vmdebug/DeploymentVm.vue'
import DeployDebugK8sMain from './vmdebug/DeployDebugK8sMain.vue'
import { Industry, Type, Capability } from '../../tools/project_data.js'
import api from './detail/Api.vue'
import appRelease from './AppRelease.vue'
import ResourceConfig from './vmdebug/DeployDebugStep.vue'
import firstStep from './NewProjectFirst.vue'
import ProjectFormDetail from './ProjectFormDetail.vue'
export default {
  name: 'AppDetail',
  components: {
    EnvPreparation,
    publishAppDialog,
    DeployDebugVMMain,
    DeployDebugK8sMain,
    api,
    appRelease,
    ResourceConfig,
    firstStep,
    ProjectFormDetail
  },
  data () {
    return {
      isEdit: false,
      editBtn: false,
      detailFlag: false,
      showCapability: false,
      isShowForm: false,
      nextBtn: true,
      nextBtnDevApp: true,
      readonly: false,
      isClick: true,
      depPlatform: '',
      projectTypeprop: this.$route.params.projectType,
      apiDataLoading: false,
      projecDetailList: [],
      dialogVisible: false,
      activeName: '1',
      selectedName: '0',
      language: localStorage.getItem('language'),
      active: 0,
      nextButtonName: this.$t('workspace.nextStep'),
      projectBeforeConfig: {},
      viewReport: false,
      isDeploying: false,
      deployed: false,
      isCompleted: false,
      userId: sessionStorage.getItem('userId'),
      isfail: true,
      appApiFileIdTemp: true,
      isChildUpdate1: true,
      isChildUpdate2: false,
      isChildUpdate3: false,
      isChildUpdate4: false,
      isChildUpdate5: false,
      projectDetailData: {
        name: '',
        version: '',
        provider: '',
        industry: '',
        type: '',
        platform: '',
        deployType: '',
        createDate: '',
        dependent: '',
        description: '',
        iconFileId: ''
      },
      projectId: sessionStorage.getItem('mecDetailID'),
      dependentNum: 0,
      isAppDevelopment: true,
      isCleanEnv: false,
      deployPlatform: 'KUBERNETES',
      screenHeight: document.body.clientHeight,
      timer: null,
      allFormData: {}
    }
  },
  methods: {
    onSubmitIntegration () {
      this.nextStep()
    },
    onSubmit () {
      this.uploadBtnLoading = true
      this.$refs.secondStep.emitStepData()
      this.getApplicationProject()
    },
    nextStep () {
      this.$refs.firstStep.emitStepData()
      this.checkRules()
    },
    checkRules () {
      let appIcon = this.allFormData.first.appIcon[0]
      let appname = this.allFormData.first.name
      let nameRule = appname.match(/^(?!_)(?!-)(?!\s)(?!.*?_$)(?!.*?-$)(?!.*?\s$)(?![0-9]+$)[\u4E00-\u9FA5a-zA-Z0-9_-]{4,32}$/)
      let version = this.allFormData.first.version
      let versionRule = version.match(/^[\w\\-][\w\\-\s.]{0,9}$/g)
      let provider = this.allFormData.first.provider
      let providerRule = provider.match(/^\S.{0,29}$/g)
      let description = this.allFormData.first.description
      let descriptionRule = description.match(/^(?!\s)(?![0-9]+$)[\S.\s\n\r]{1,1024}$/)
      if (!appname) {
        this.$eg_messagebox(this.$t('promptMessage.projectNameEmpty'), 'warning')
      } else if (!nameRule) {
        this.$eg_messagebox(this.$t('promptMessage.nameRule'), 'warning')
      } else if (!version) {
        this.$eg_messagebox(this.$t('promptMessage.versionEmpty'), 'warning')
      } else if (!versionRule) {
        this.$eg_messagebox(this.$t('promptMessage.versionRule'), 'warning')
      } else if (!provider) {
        this.$eg_messagebox(this.$t('promptMessage.providerEmpty'), 'warning')
      } else if (!providerRule) {
        this.$eg_messagebox(this.$t('promptMessage.providerRule'), 'warning')
      } else if (!appIcon) {
        this.$eg_messagebox(this.$t('promptMessage.logoEmpty'), 'warning')
      } else if (!description) {
        this.$eg_messagebox(this.$t('promptMessage.descriptionEmpty'), 'warning')
      } else if (!descriptionRule) {
        this.$eg_messagebox(this.$t('promptMessage.introductionRule'), 'warning')
      } else if (this.projectExist) {
        this.$eg_messagebox(this.$t('workspace.projectExist'), 'warning')
      } else {
        this.getIconFileId()
        this.handleUserName()
      }
    },
    handleUserName () {
      if (this.userName === 'guest') {
        this.isGuest = true
      } else {
        this.isGuest = false
      }
      if (!this.isGuest && this.isAppDevelopment) {
        this.active++
        this.changeComponentApp()
      }
    },
    // get Icon ID
    getIconFileId () {
      if (this.active === 0) {
        let firstStepData
        if (this.allFormData.first.appIcon[0].raw) {
          firstStepData = this.allFormData.first.appIcon[0].raw
        } else {
          firstStepData = this.allFormData.first.appIcon[0]
        }
        let formdata = new FormData()
        formdata.append('file', firstStepData)
        Workspace.postIconFileIdApi(this.userId, formdata).then(res => {
          this.iconFileId = res.data.fileId
          if (!this.isGuest && !this.isAppDevelopment) {
            this.getApplicationProject()
          }
        }).catch(err => {
          if (err.response.data.code === 403) {
            this.isGuest = true
          } else {
            this.isGuest = false
          }
        })
      }
    },
    changeComponentApp () {
      switch (this.active) {
        case 0:
          this.activeName = '1'
          break
        case 1:
          this.activeName = '2'
          break
        default:
          this.activeName = '1'
      }
    },
    previousStep () {
      this.active--
      this.changeComponentApp()
    },
    checkPostProjectData (checkArr) {
      checkArr.forEach(itemBe => {
        Capability.forEach(itemFe => {
          if (itemBe.name === itemFe.label[0]) {
            itemBe.name = itemFe.label[1]
          }
        })
      })
    },
    getApplicationProject () {
      this.uploadBtnLoading = true
      let createDate = new Date()
      let allFormData = this.allFormData
      let params = {
        'id': '',
        'capabilityList': [],
        'createDate': createDate
      }
      for (let key in allFormData.first) {
        if (key !== 'appIcon') {
          params[key] = allFormData.first[key]
        }
      }
      if (allFormData.second) {
        this.checkPostProjectData(allFormData.second.capabilitySelected)
        for (let capability of allFormData.second.capabilitySelected) {
          params.capabilityList.push(capability.id)
        }
      }
      let iconFileId = { iconFileId: this.iconFileId }
      params = Object.assign(params, iconFileId)
      this.addNewProject(params)
    },
    addNewProject (params) {
      if (this.isEdit) {
        Workspace.editProjectApi(this.projectId, this.userId, params).then(res => {
          if (res.status === 200) {
            let mecDetailID = res.data.id
            sessionStorage.setItem('mecDetailID', mecDetailID)
            sessionStorage.setItem('toDetailType', 'proDetail')
            this.$eg_messagebox(this.$t('promptMessage.editProjectSuccess'), 'success')
            this.showCapability = true
            this.deployPlatform = this.allFormData.first.deployPlatform
            this.readonly = true
            this.depPlatform = this.deployPlatform
            this.editBtn = false
            if (this.isAppDevelopment) {
              this.activeName = '3'
              this.isClick = false
              this.nextBtnDevApp = false
            } else {
              this.nextBtn = false
              if (this.deployPlatform === 'KUBERNETES') {
                this.activeName = '4'
                this.isClick = false
              } else {
                this.activeName = '6'
                this.isClick = false
              }
            }
            this.uploadBtnLoading = false
            sessionStorage.removeItem('apiFileIdArr')
          } else {
            this.$eg_messagebox(this.$t('promptMessage.editProjectFail'), 'error')
            setTimeout(() => {
              this.dialogNewProject = false
            }, 1500)

            this.$emit('closeFatherDialog', false)
            this.uploadBtnLoading = false
          }
        }).catch(err => {
          if (err.response.data.message === 'the same project exists') {
            this.$eg_messagebox(this.$t('workspace.projectExist'), 'warning')
          }
          this.uploadBtnLoading = false
          sessionStorage.removeItem('apiFileIdArr')
        })
      } else {
        Workspace.newProjectApi(this.userId, params).then(res => {
          if (res.status === 200) {
            let mecDetailID = res.data.id
            sessionStorage.setItem('mecDetailID', mecDetailID)
            sessionStorage.setItem('toDetailType', 'proDetail')
            this.$eg_messagebox(this.$t('promptMessage.addProjectSuccess'), 'success')
            this.showCapability = true
            this.deployPlatform = this.allFormData.first.deployPlatform
            this.readonly = true
            this.depPlatform = this.deployPlatform
            if (this.isAppDevelopment) {
              this.activeName = '3'
              this.isClick = false
              this.nextBtnDevApp = false
            } else {
              this.nextBtn = false
              if (this.deployPlatform === 'KUBERNETES') {
                this.activeName = '4'
                this.isClick = false
              } else {
                this.activeName = '6'
                this.isClick = false
              }
            }
            this.uploadBtnLoading = false
            sessionStorage.removeItem('apiFileIdArr')
          } else {
            this.$eg_messagebox(this.$t('promptMessage.addProjectFail'), 'error')
            setTimeout(() => {
              this.dialogNewProject = false
            }, 1500)

            this.$emit('closeFatherDialog', false)
            this.uploadBtnLoading = false
          }
        }).catch(err => {
          if (err.response.data.message === 'the same project exists') {
            this.$eg_messagebox(this.$t('workspace.projectExist'), 'warning')
          }
          this.uploadBtnLoading = false
          sessionStorage.removeItem('apiFileIdArr')
        })
      }
    },

    groupListHover (index) {
      this.selectedName = index
    },
    groupListLeave (index) {
      this.selectedName = '0'
    },
    setDivHeight (screenHeight) {
      let oDiv1 = document.getElementsByClassName('elTabs')
      oDiv1[0].style.minHeight = (Number(screenHeight) - 331) + 'px'
    },
    projectDependent (res) {
      let dependent = res.data.capabilityList
      let arr = []
      if (dependent) {
        dependent.forEach(item => {
          item.capabilityDetailList.forEach(itemSub => {
            if (this.language === 'cn') {
              arr.push(itemSub.service)
            } else {
              arr.push(itemSub.serviceEn)
            }
          })
        })
      }
      arr = Array.from(new Set(arr))
      this.dependentNum = arr.length
      this.projectDetailData.dependent = arr.join('，')
    },
    // Fetch poject infomation
    getProjectInfo () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        if (!this.isEdit) {
          this.detailFlag = true
        } else {
          this.isShowForm = true
        }
        let data = res.data
        this.listDataProp = data
        this.depPlatform = data.deployPlatform
        if (data.projectType === 'CREATE_NEW') {
          this.isAppDevelopment = true
          this.editBtn = true
        } else if (data.projectType === 'INTEGRATED') {
          this.isAppDevelopment = false
          this.editBtn = true
          this.nextBtn = false
        }
        if (data.deployPlatform === 'VIRTUALMACHINE') {
          this.getProjectVmList()
        }
        this.projectDetailData.name = data.name
        this.projectDetailData.version = data.version
        this.projectDetailData.provider = data.provider
        this.projectDetailData.industry = data.industry[0]
        this.projectDetailData.type = data.type
        this.projectDetailData.platform = data.platform[0]
        this.projectDetailData.deployType = data.deployPlatform
        this.projectDetailData.createDate = data.createDate
        this.projectDetailData.iconFileId = data.iconFileId
        this.deployPlatform = data.deployPlatform
        this.projectDetailData.description = data.description
        // edit
        data.capabilityList = []
        this.allFormData['first'] = data
        this.iconFileId = data.iconFileId

        this.checkProjectData()
        this.projectDependent(res)
        if (this.deployPlatform === 'KUBERNETES') {
          if (data.status !== 'ONLINE') {
            this.active = 1
          } else {
            this.active = 0
          }
        }
      })
    },
    nextPane () {
      this.activeName = '4'
      if (this.deployPlatform === 'VIRTUALMACHINE') {
        this.activeName = '6'
      }
    },
    previousPane () {
      if (this.isAppDevelopment) {
        this.activeName = '2'
      } else {
        this.activeName = '1'
      }
    },
    getFormData ({ data, step }) {
      this.allFormData[step] = data
    },
    getAppapiFileId (data) {
      this.appApiFileIdTemp = data
    },
    getViewReport (data) {
      this.viewReport = data
    },
    checkCleanEnv (data) {
      this.isCleanEnv = data
    },
    // Fetch test configue value
    getTestConfig () {
      Workspace.getTestConfigApi(this.projectId).then(res => {
        this.projectBeforeConfig = res.data || {}
      })
    },
    checkProjectData () {
      Industry.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.projectDetailData.industry === itemFe.label[1]) {
            this.projectDetailData.industry = itemFe.label[0]
          }
        } else {
          if (this.projectDetailData.industry === itemFe.label[0]) {
            this.projectDetailData.industry = itemFe.label[1]
          }
        }
      })
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
    getProjectVmList () {
      vmService.getProjectVmResList(this.projectId, this.userId).then(res => {
        if (res.data.length > 0) {
          if (res.data[0].status === 'SUCCESS') {
            this.isCleanEnv = true
          }
        }
      })
    },

    // Click nav to set thie active
    setActive () {
      if (this.activeName === '1') {
        this.active = 0
      } else if (this.activeName === '2') {
        this.active = 1
      }
    },
    // Determine the source of entry
    isAddNewProject () {
      let toDetailType = sessionStorage.getItem('toDetailType')
      if (toDetailType === 'addNewPro') {
        this.isCreate()
        this.isShowForm = true
      } else if (toDetailType === 'editNewPro') {
        this.isEdit = true
        this.getProjectInfo()
        this.getTestConfig()
      } else {
        this.getProjectInfo()
        this.getTestConfig()
        this.showCapability = true
        this.isClick = false
      }
    },
    isCreate () {
      if (sessionStorage.getItem('appType') === 'CREATE_NEW') {
        this.isAppDevelopment = true
      } else {
        this.isAppDevelopment = false
      }
    }
  },
  mounted () {
    this.isAddNewProject()
    this.setDivHeight(this.screenHeight)
    // When window size changes, adjust the value of screenHeight
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.setDivHeight(this.screenHeight)
      })()
    }
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      let toDetailType = sessionStorage.getItem('toDetailType')
      if (toDetailType !== 'addNewPro') {
        Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
          this.projectDependent(res)
        })
      }
      this.checkProjectData()
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/workspace.css';

.el-steps{
  margin-bottom: 15px;
  .el-step__icon.is-text{
    border: none;
  }
  .el-step__icon-inner{
    color: #fff;
  }
  .is-process .el-step__icon{
    background-color: #688ef3;
  }
  .el-step__title.is-process{
    font-weight: normal;
  }
  .is-wait .el-step__icon{
    background: #b8becc;
    border: 1px solid #adb0b8;
  }
  .is-success .is-text{
    background-color: #6b92fa;
  }
  .el-step__title.is-success{
    color: #688ef3;
  }
  .el-step__head.is-success{
    border-color: #688ef3;
    .el-step__line{
      background-color: #6b92fa;
    }
  }
}

.workdetail {
   .project_detail{
    .el-input__inner{
      border:1px solid #f1f2f6;
      height: 36px;
      line-height: 36px;
      border-radius:8px;
      background-color: #f1f2f6;
    }
    .list-select input{
      height: 35px;
      line-height: 35px;
    }
    .el-form-item__label{
      padding: 0 20px 0 0;
      font-size: 16px;
      color: #380879;
    }
    .deployType em,.deployType .is-checked em{
      width: 28px;
      height: 28px;
      display: inline-block;
      background-size: cover;
      position: relative;
      top: 9px;
    }
    .dockerDeploy{
      background: url('../../assets/images/deploy_docker_dis.png') center center no-repeat;
    }
    .vmDeploy{
      background: url('../../assets/images/deploy_vm_dis.png') center center no-repeat;
    }
    .is-checked .dockerDeploy{
      background: url('../../assets/images/deploy_docker.png') center center no-repeat;
    }
    .is-checked .vmDeploy{
      background: url('../../assets/images/deploy_vm.png') center center no-repeat;
    }
    .el-radio__input.is-checked .el-radio__inner{
      background-color: #5e40c8;
      border-color: #5e40c8;
    }
    .el-radio__label{
      color:#380879
    }
    .el-radio__input.is-checked+.el-radio__label{
      color: #380879;
    }
    .upload-demo{
      float: left;
      .el-button--primary{
        background-color: #fff;
        border-color: #688ef3;
        color: #688ef3;
        padding: 6px 20px;
        margin-top: 8px;
      }
      .el-icon-warning{
        color: #688ef3;
        margin-right: 5px;
        font-size: 16px;
      }
      .el-upload{
        float: left;
        width: 34px;
        height: 34px;
        line-height: 34px;
        margin: 3px 15px 0 0;
      }
      .el-upload-list__item-preview{
        opacity: 0;
      }
    }
    .uploadIconSpan{
      font-size:16px;
      color:#380879;
      margin-right:10px;
    }

    .el-icon-info{
      margin-top: 12px;
    }
    .default-icon{
      float: left;
      display: flex;
      flex-wrap: wrap;
      .box{
        position: ab;
        width: 134px;
        height: 44px;
        margin: 0 15px 0 0;
        img{
          width: 40px;
          height: 40px;
        }
        span{
          vertical-align: top;
          margin-left:10px;
          font-size:16px;
          color:#380879;
          position: relative;
          top: 5px;
        }
        em{
          display: inline-block;
          position: relative;
          bottom: 0;
          right: 0;
          color:#000;
          }
        .active{
          color: #5e40c8;
        }

      }
    }
    .upIcon.el-icon-success{
      position: absolute;
      top: 30px;
      left: 180px;
      z-index: 99;
    }
    .upIcon.active{
      color: #5e40c8;
    }
    .el-form-item{
      margin-bottom: 29px;
    }
    .el-form-item.icon{
      content: '';
      display: block;
      clear: both;
    }
    .f50{
      float: left;
      width: 50%;
      .el-form-item__content{
        width: calc(100% - 110px);
      }
      .el-select{
        width: 100%;
      }
    }
    .el-upload-list{
      width: auto;
    }
    .el-upload-list__item:first-child{
      width: 40px;
      height: 40px;
      min-width: 40px;
      border: none;
      margin: 0 15px 0 0;
    }
    .el-form-error{
      float: left;
      color: #F56C6C;
      font-size: 12px;
      line-height: 1;
      margin: 14px 10px 0px 0px;
    }
    .el-textarea__inner{
      border:1px solid #f1f2f6;
      background-color: #f1f2f6;
    }
    .el-textarea .el-input__count{
      background-color: #f1f2f6;
    }
    .el-button.nextstep{
      margin-top:50px;
      background-color: #5e40c8;
      border-color: #5e40c8;
      width:174px;
      height:46px;
      font-size:20px;
      float:right;
      color:#fff;
  }
}

  .el-icon-info:before {
    color: #5e40c8;
    font-size: 16px;
  }
  .el-tree-node__content{
    height: 35px;
    line-height: 35px;
  }
  .el-tabs--left .el-tabs__item.is-left{
    text-align: center;
    background: #fbfbfb;
    font-size:20px;
    color: #7a6e8a;
  }
  .el-tabs__item span{
    letter-spacing: 4px;
  }
  .el-tabs--left.enLeft {
    .el-tabs__item span{
      letter-spacing: 0px;
    }
  }
  .el-tabs--left.enLeft .el-tabs__item.is-left{
    text-align: left;
  }
  .el-tabs--left .el-tabs__header.is-left{
    margin-right: 112.5px;
  }
  .el-tabs--left.enLeft .el-tabs__header.is-left{
    margin-right: 41px;
    width: 267px;
  }
  .el-tabs__nav-wrap.is-left::after{
    width: 0;
  }
  .el-tabs--left .el-tabs__active-bar.is-left{
    display: none;
  }
  .el-tabs__item{
    height: 49px;
    line-height: 50px;
    margin:7px 8.5px;
    border-radius: 8px;
    font-size: 16px;
    .tab_detail.tab_default{
      background: url('../../assets/images/menu_iocn_details_default.png') no-repeat;
    }
    .tab_detail.tab_active{
      background: url('../../assets/images/menu_iocn_details_selected.png') no-repeat;
    }
    .tab_capability.tab_default{
      background: url('../../assets/images/menu_iocn_capability_default.png') no-repeat;
    }
    .tab_capability.tab_active{
      background: url('../../assets/images/menu_iocn_capability_selected.png') no-repeat;
    }
    .tab_appDev.tab_default{
      background: url('../../assets/images/menu_iocn_code_default.png') no-repeat;
    }
    .tab_appDev.tab_active{
      background: url('../../assets/images/menu_iocn_code_selected.png') no-repeat;
    }
    .tab_config.tab_default{
      background: url('../../assets/images/menu_iocn_config_default.png') no-repeat;
    }
    .tab_config.tab_active{
      background: url('../../assets/images/menu_iocn_config_selected.png') no-repeat;
    }
    .tab_deploy.tab_default{
      background: url('../../assets/images/menu_iocn_deploy_default.png') no-repeat;
    }
    .tab_deploy.tab_active{
      background: url('../../assets/images/menu_iocn_deploy_selected.png') no-repeat;
    }
    .tab_release.tab_default{
      background: url('../../assets/images/menu_iocn_release_default.png') no-repeat;
    }
    .tab_release.tab_active{
      background: url('../../assets/images/menu_iocn_release_selected.png') no-repeat;
    }
    span{
      display: inline-block;
      height: 50px;
      em{
        float: left;
        width: 28px;
        height: 28px;
        margin: 15px 3px 0 0;
      }
    }
  }

  .el-tabs--left .el-tabs__item.is-left.is-active{
    background:#fff;
    color: #5e40c8;
    box-shadow:-1px 0px 10px 0 rgba(40, 12, 128, 0.1);
  }
  .el-tabs--left .el-tabs__item.is-left:hover {
    background:#fff;
    color: #5e40c8;
    box-shadow:-1px 0px 10px 0 rgba(40, 12, 128, 0.1);
  }

  .elTabs {
    padding: 0px 0px 0px 0;
    .el-tabs__header{
      min-width: 195px;
    }
    .el-tabs__content{
      border-radius: 5px;
    }
    .elTabPane {
      padding: 10px 0 0 0px;
      min-height: 300px;
    }

    .elButton {
      width: 100%;
      margin: 43px 0 0;
      text-align: right;
      button {
        height: 46px;
        width: 174px;
        line-height: 30px;
        padding: 0;
      }
      .el-button--text {
        border: 1px solid #688ef3;
      }
      .el-button--primary {
        background-color: #5e40c8;
        color: #ffffff;
        border-radius: 8px;
        margin-left: 30px;
        font-size: 18px;
        width:15%;
        height:40px;
      }
    }
    .elSteps {
      margin: 0px 10% 0;
      width: 80%;
      padding: 20px 0;
      box-sizing: border-box;
      border-bottom:  1px dashed #dfe1e6;
    }
    @media screen and (max-width: 1380px) {
      .elSteps {
        margin: 0 0 0;
        width: 100%;
      }
    }
    .elDatePicker {
      margin-top: 20px;
    }
    .elProgress {
      text-align: center;
      margin-top: 20px;
    }
    .project_detail{
      .el-col{
        padding: 15px 10px;
        font-size: 16px;
        line-height: 25px;
        span{
          line-height: 25px;
        }
        .span_left{
          float: left;
          color: #adb0b8;
          width: 95px;
          text-align: right;
          padding-right: 20px;
        }
        .span_left_en{
          width: 165px;
        }
        .span_right{
          float: left;
          width: calc(100% - 115px);
        }
        .span_right_en{
          width: calc(100% - 185px);
        }
      }
    }
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }
}
.newprojectTitle{
   font-size:26px;
   color:#5e40c8;
   margin-top:50px;
 }
.newprojectcontent{
   min-height:750px;
   background-color:#fbfbfb;
   margin-top:20px;
   border-radius:20px;
   padding:43px 57px 60px 48.5px;
   box-shadow: 0 6px 68px 0 rgba(94, 64, 200, 0.06);
}
</style>
