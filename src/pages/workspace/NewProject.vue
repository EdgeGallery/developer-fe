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
  <div class="newproject">
    <el-dialog
      :title="$t('workspace.addNewProject')"
      :close-on-click-modal="false"
      :visible.sync="dialogNewProject"
      width="60%"
      @close="handleClose"
    >
      <el-steps
        :active="active"
        finish-status="success"
        align-center
      >
        <el-step :title="$t('workspace.basicInformation')" />
        <el-step :title="$t('workspace.chooseAbilities')" />
        <el-step :title="$t('workspace.selectionAbilitiesDetail')" />
        <el-step
          :title="fourthstepTitle"
          v-if="newProjectShow"
        />
      </el-steps>
      <component
        :is="currentComponent"
        @getStepData="getStepData"
        ref="currentComponet"
        :all-step-data="allFormData"
        :project-typeprop="getprojectType"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="prevBtn"
          @click="previousStep"
          v-if="active>0"
          class="prevStep"
        >{{ $t('workspace.previous') }}</el-button>
        <el-button
          id="nextBtn"
          @click="nextStep"
          v-if="active<activeProject"
          class="nextStep"
          :disabled="isGuest"
        >{{ $t('workspace.next') }}</el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          v-if="active>=activeProject"
          :loading="uploadBtnLoading"
          @click="onSubmit"
          class="confirm"
        >{{ $t('workspace.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Capability } from '../../tools/project_data.js'
import { Workspace } from '../../tools/api.js'
import firstStep from './NewProjectFirst.vue'
import secondStep from './NewProjectSecond.vue'
import thirdStep from './NewProjectThird.vue'
import fourthStep from './NewProjectFourth.vue'
import fourthStepMigration from './NewProjectFourth-migration.vue'
export default {
  name: 'Newproject',
  components: {
    firstStep,
    secondStep,
    thirdStep,
    fourthStep,
    fourthStepMigration
  },
  props: {
    getprojectTypeprop: {
      type: String,
      default: 'CREATE_NEW'
    },
    value: {
      type: Boolean,
      default: false
    },
    newProjectFourthprop: {
      type: Boolean,
      default: true
    },
    fourthstepTitleprop: {
      type: String,
      default: 'ToolChain'
    },
    activeProjectprop: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      getprojectType: this.getprojectTypeprop,
      currentComponent: 'firstStep',
      allFormData: {},
      ApplicationProject: {},
      active: 0,
      dialogNewProject: this.value,
      newProjectShow: this.newProjectFourthprop,
      fourthstepTitle: this.fourthstepTitleprop,
      uploadBtnLoading: false,
      iconFileId: '',
      createSuccess: false,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      activeProject: this.activeProjectprop,
      isGuest: false
    }
  },
  mounted () {
  },
  methods: {
    changeComponent () {
      switch (this.active) {
        case 0:
          this.currentComponent = 'firstStep'
          break
        case 1:
          this.currentComponent = 'secondStep'
          break
        case 2:
          this.currentComponent = 'thirdStep'
          break
        case 3:
          this.currentComponent = 'fourthStep'
          break
        default:
          this.currentComponent = 'firstStep'
      }
    },
    previousStep () {
      this.active--
      this.changeComponent()
    },
    nextStep () {
      // 获取第一步数据，判断是否为空
      this.$refs.currentComponet.emitStepData()
      let appIcon = this.allFormData.first.appIcon[0]
      let appname = this.allFormData.first.name
      let nameRule = appname.match(/^\S.{0,28}\S$/g)
      let provider = this.allFormData.first.provider
      let providerRule = provider.match(/^\S.{0,28}\S$/g)
      let version = this.allFormData.first.version
      let versionRule = version.match(/^\S.{0,8}\S$/g)
      let description = this.allFormData.first.description
      let descriptionRule = description.match(/^\S.{0,258}\S$/g)
      if (!appname) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.projectNameEmpty')
        })
      } else if (!nameRule) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.nameRule')
        })
      } else if (!version) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.versionEmpty')
        })
      } else if (!versionRule) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.versionRule')
        })
      } else if (!provider) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.providerEmpty')
        })
      } else if (!providerRule) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.proiderRule')
        })
      } else if (!appIcon) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.logoEmpty')
        })
      } else if (!description) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.descriptionEmpty')
        })
      } else if (!descriptionRule) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.introductionRule')
        })
      } else {
        this.getIconFileId()
        if (this.userName === 'guest') {
          this.isGuest = true
        } else {
          this.isGuest = false
        }
        if (!this.isGuest) {
          this.active++
          this.changeComponent()
        }
      }
    },
    // 暂存图标生成图标ID
    getIconFileId () {
      if (this.active === 0) {
        let firstStepData = this.allFormData.first.appIcon[0]
        let formdata = new FormData()
        formdata.append('file', firstStepData)
        Workspace.postIconFileIdApi(this.userId, formdata).then(res => {
          this.iconFileId = res.data.fileId
        }).catch(err => {
          if (err.response.data.code === 403) {
            this.isGuest = true
          } else {
            this.isGuest = false
          }
        })
      }
    },
    // 提交上传
    onSubmit () {
      this.getApplicationProject()
    },
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    // 获取子组件数据
    getStepData ({ data, step }) {
      this.allFormData[step] = data
    },
    // 处理上传数据，新建/迁移项目
    getApplicationProject () {
      let createDate = new Date()
      this.uploadBtnLoading = true
      let allFormData = this.allFormData
      let projectType = allFormData.first.projectType
      if (projectType === 'MIGRATE') {
        this.nextStep()
      }
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
      this.checkPostProjectData(allFormData.second.capabilitySelected)
      for (let capability of allFormData.second.capabilitySelected) {
        let obj = {}
        for (let capabilityKey in capability) {
          obj[capabilityKey] = capability[capabilityKey]
        }
        obj.capabilityDetailList = []
        for (let service of allFormData.third) {
          if (service.groupId === capability.groupId) {
            let serviceObj = {}
            for (let serviceKey in service) {
              serviceObj[serviceKey] = service[serviceKey]
            }
            obj.capabilityDetailList.push(serviceObj)
          }
        }
        params.capabilityList.push(obj)
      }
      let iconFileId = { iconFileId: this.iconFileId }
      params = Object.assign(params, iconFileId)
      Workspace.newProjectApi(this.userId, params).then(res => {
        if (res.status === 200) {
          let mecDetailID = res.data.id
          sessionStorage.setItem('mecDetailID', mecDetailID)
          this.handleClose()
          this.$message({
            message: this.$t('promptMessage.addProjectSuccess'),
            type: 'success',
            duration: '2000'
          })

          setTimeout(() => {
            this.dialogNewProject = false
          }, 1500)

          this.$emit('closeFatherDialog', false)
          this.uploadBtnLoading = false
          this.$router.push('/mecDeveloper/work/detail')
          sessionStorage.removeItem('apiFileIdArr')
        } else {
          this.$message({
            message: this.$t('promptMessage.addProjectFail'),
            type: 'error',
            duration: '2000'
          })
          setTimeout(() => {
            this.dialogNewProject = false
          }, 1500)

          this.$emit('closeFatherDialog', false)
          this.uploadBtnLoading = false
        }
      }).catch(err => {
        if (err.response.data.code === 403) {
          this.$message.error(this.$t('promptMessage.guestPrompt'))
        } else {
          this.$message.error(this.$t('promptMessage.addProjectFail'))
        }
        sessionStorage.removeItem('apiFileIdArr')
      })
    },
    // 将中文情况下选择的能力转成英文
    checkPostProjectData (checkArr) {
      checkArr.forEach(itemBe => {
        Capability.forEach(itemFe => {
          if (itemBe.name === itemFe.label[0]) {
            itemBe.name = itemFe.label[1]
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.newproject{
  .el-dialog__body{
    min-height: 490px;
    padding: 30px 30px 0;
    padding-top: 30px!important;
    .el-steps{
      margin-bottom: 40px;
      .el-step__icon-inner{
        width: 8px;
        height: 8px;
        background-color: #fff;
        text-indent: 99px;
        border-radius: 50%;
        overflow: hidden;
      }
      .el-step__icon.is-text{
        border: none;
      }
      .el-step__head.is-success .el-step__line{
        background-color: #6b92fa;
      }
      .el-step__head.is-success{
        border-color: #6b92fa;
      }
      .el-step__title.is-success{
        color: #303133;
      }
      .el-step__head.is-wait .el-step__icon.is-text{
        width: 24px;
        height: 24px;
        background-color: #b8becc;
        border-radius: 50%;
      }
      .el-step__head.is-process .el-step__icon.is-text,.el-step__head.is-success .el-step__icon.is-text{
        width: 24px;
        height: 24px;
        background-color: #6b92fa;
        border-radius: 50%;
      }
      .el-step__head.is-success .el-step__icon-inner{
        width: 16px;
        height: 16px;
        background: url('../../assets/images/step_success.png') no-repeat;
        background-size: cover;
      }
    }
    .el-form-item:last-child{
      margin-bottom: 0;
    }
  }
  .el-dialog__headerbtn{
    top: 20px;
  }
  .el-dialog__footer{
    width: 100%;
    text-align: center;
    padding: 20px;
    .el-button{
      padding: 8px 20px;
      font-weight: normal;
    }
    .prevStep{
      background-color: none;
      color: #688ef3;
      border: 1px solid #688ef3;
    }
    .nextStep{
      background-color: #688ef3;
      color: #fff;
    }
    .confirm{
      background-color: #688ef3;
      border-color: #688ef3;
    }
  }
  .deploybtn{
    text-align: right;
    margin-top: 10px;
  }
  .el-badge__content.is-fixed{
    right: 0px;
    transform: translateY(-50%) translateX(-100%);
  }
  .el-form-error{
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #688ef3;
    border-color: #688ef3;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #688ef3;
  }
}
</style>
