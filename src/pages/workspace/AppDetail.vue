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
      {{ $t('workspace.createProject') }}
    </div>
    <div class="newprojectcontent">
      <el-tabs
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
            <el-row>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.projectName') }}</span>{{ projectDetailData.name }}
              </el-col>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.version') }}</span>{{ projectDetailData.version }}
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.provider') }}</span>{{ projectDetailData.provider }}
              </el-col>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.industry') }}</span>{{ projectDetailData.industry }}
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('test.testApp.type') }}</span>{{ projectDetailData.type }}
              </el-col>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.architecture') }}</span>{{ projectDetailData.platform }}
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.dependentApp') }}</span>
                <span
                  class="span_right"
                  :class="{'span_right_en':language==='en'}"
                >
                  {{ dependentNum===0 ? $t('workspace.noDependent') : projectDetailData.dependent }}
                </span>
              </el-col>
              <el-col
                :sm="12"
                :xs="24"
              >
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.createDate') }}</span>{{ projectDetailData.createDate }}
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span
                  class="span_left"
                  :class="{'span_left_en':language==='en'}"
                >{{ $t('workspace.description') }}</span>{{ projectDetailData.description }}
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane
          class="elTabPane"
          name="2"
          lazy
          v-if="isAppDevelopment"
          style="padding:0"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('2')"
            @mouseleave="groupListLeave('2')"
          >
            <em :class="['tab_capability',selectedName==='2' || activeName==='2'?'tab_active':'tab_default']" />{{ $t('workspace.capabilityDetails') }}
          </span>
          <api v-if="activeName === '2'" />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('workspace.appDevelopment')"
          class="elTabPane"
          name="3"
          lazy
          v-if="isAppDevelopment"
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
          v-if="deployPlatform === 'VIRTUALMACHINE'"
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
        >
          <span
            slot="label"
            @mouseenter="groupListHover('4')"
            @mouseleave="groupListLeave('4')"
          >
            <em :class="['tab_deploy',selectedName==='4' || activeName==='4'?'tab_active':'tab_default']" />{{ $t('workspace.deploymentTest') }}
          </span>
          <div v-if="activeName === '4'">
            <div
              id="div_deploydebug_k8s"
              v-if="deployPlatform === 'KUBERNETES'"
            >
              <el-steps
                :active="active"
                finish-status="success"
                align-center
              >
                <el-step :title="$t('workspace.selectImage')" />
                <el-step :title="$t('workspace.configureYaml')" />
                <el-step :title="$t('workspace.deploymentTest')" />
              </el-steps>
              <div class="elSteps">
                <component
                  :is="currentComponent"
                  :active="active"
                  @getStepData="getStepData"
                  @getBtnStatus="getBtnStatus"
                  :project-before-config="projectBeforeConfig"
                  :all-step-data="allStepData"
                  @getAppapiFileId="getAppapiFileId"
                  ref="currentComponet"
                  @checkCleanEnv="checkCleanEnv"
                />
              </div>
              <div class="elButton">
                <el-button
                  id="prevBtn"
                  type="text"
                  @click="previous"
                  v-if="active>0"
                  :disabled="isDeploying"
                >
                  <strong>{{ $t('workspace.previous') }}</strong>
                </el-button>
                <el-button
                  id="nextBtn"
                  type="primary"
                  v-loading="apiDataLoading"
                  @click="next"
                  v-if="active<2"
                >
                  <strong>{{ $t('workspace.next') }}</strong>
                </el-button>
              </div>
            </div>
            <DeployDebugVMMain
              :project-id="projectId"
              v-if="deployPlatform === 'VIRTUALMACHINE'"
              @getImageStatus="getImageStatus"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane
          class="elTabPane"
          name="5"
          lazy
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
import imageSelect from './ImageSelect.vue'
import configYaml from './ConfigYaml.vue'
import EnvPreparation from './EnvPreparation.vue'
import choosePlatform from './ChoosePlatform.vue'
import publishAppDialog from './detail/PublishAppDialog.vue'
import DeployDebugVMMain from './vmdebug/Main.vue'
import { Industry, Type } from '../../tools/project_data.js'
import api from './detail/Api.vue'
import deployment from './Deployment.vue'
import appRelease from './AppRelease.vue'
import ResourceConfig from './vmdebug/DeployDebugStep.vue'
export default {
  name: 'AppDetail',
  components: {
    imageSelect,
    configYaml,
    EnvPreparation,
    choosePlatform,
    publishAppDialog,
    DeployDebugVMMain,
    api,
    deployment,
    appRelease,
    ResourceConfig
  },
  data () {
    return {
      apiDataLoading: false,
      projecDetailList: [],
      dialogVisible: false,
      activeName: '1',
      selectedName: '0',
      language: localStorage.getItem('language'),
      active: 0,
      nextButtonName: this.$t('workspace.nextStep'),
      currentComponent: 'choosePlatform',
      allStepData: {
        ifNext: false,
        third: {
          enable: false,
          hostId: '',
          ip: '',
          port: ''
        }
      },
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
        description: ''
      },
      projectId: sessionStorage.getItem('mecDetailID'),
      dependentNum: 0,
      isAppDevelopment: true,
      isCleanEnv: false,
      imageStatus: 'NOTDEPLOY',
      deployPlatform: 'KUBERNETES',
      screenHeight: document.body.clientHeight,
      timer: null
    }
  },
  methods: {
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
      dependent.forEach(item => {
        item.capabilityDetailList.forEach(itemSub => {
          if (this.language === 'cn') {
            arr.push(itemSub.service)
          } else {
            arr.push(itemSub.serviceEn)
          }
        })
      })
      arr = Array.from(new Set(arr))
      this.dependentNum = arr.length
      this.projectDetailData.dependent = arr.join('，')
    },
    // Fetch poject infomation
    getProjectInfo () {
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        let data = res.data
        if (data.projectType === 'CREATE_NEW') {
          this.isAppDevelopment = true
        } else if (data.projectType === 'INTEGRATED') {
          this.isAppDevelopment = false
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
        this.deployPlatform = data.deployPlatform
        this.projectDetailData.description = data.description
        this.checkProjectData()
        this.projectDependent(res)
        if (this.deployPlatform === 'KUBERNETES') {
          if (data.status !== 'ONLINE') {
            this.active = 2
            this.changeComponent()
          } else {
            this.active = 0
            this.changeComponent()
          }
        }
      })
    },
    changeComponent () {
      switch (this.active) {
        case 0:
          this.currentComponent = 'imageSelect'
          break
        case 1:
          this.currentComponent = 'configYaml'
          break
        case 2:
          this.currentComponent = 'deployment'
          break
        default:
          this.currentComponent = 'imageSelect'
      }
    },
    next () {
      // Fetch component internal value
      this.$refs.currentComponet.emitStepData()
      if (this.allStepData.ifNext) {
        if (this.active < 2) {
          this.active++
          this.handleStep()
        }
      }
    },
    previous () {
      this.active--
      this.handleStep()
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
    handleStep () {
      // Change dynamic component value
      this.changeComponent()
      this.allStepData.ifNext = false
    },
    handleClose () {
      this.$router.push({
        name: 'workspace'
      })
    },
    getStepData (data) {
      this.allStepData[data.step] = data.data
      this.allStepData.ifNext = data.ifNext
    },
    getBtnStatus (status) {
      this.isDeploying = status.status
      this.deployed = status.deploy
      this.isCompleted = status.isCompleted
      this.isfail = status.isFail
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
    getImageStatus (data) {
      this.isCleanEnv = true
    },
    getProjectVmList () {
      vmService.getProjectVmResList(this.projectId, this.userId).then(res => {
        if (res.data.length > 0) {
          this.imageStatus = res.data[0].status
          if (res.data[0].status === 'SUCCESS') {
            this.isCleanEnv = true
          }
        }
      })
    }
  },
  mounted () {
    this.getProjectInfo()
    this.handleStep()
    this.getTestConfig()
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
      Workspace.getProjectInfoApi(this.projectId, this.userId).then(res => {
        this.projectDependent(res)
      })
      this.checkProjectData()
    }
  }
}
</script>

<style lang="less">
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
    margin-right: 102px;
  }
  .el-tabs--left.enLeft .el-tabs__header.is-left{
    margin-right: 45px;
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
        font-size: 20px;
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
   width:1414px;
   min-height:750px;
   background-color:#fbfbfb;
   margin-top:20px;
   border-radius:20px;
   padding:50px 57px 60px 57px;
   box-shadow: 0 6px 68px 0 rgba(94, 64, 200, 0.06);
   }
</style>
