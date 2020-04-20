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
        <el-step :title="fourthstepTitle" />
      </el-steps>
      <component
        :is="currentComponent"
        @getStepData="getStepData"
        ref="currentComponet"
        :second-step-data="allFormData"
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
          v-if="active<3"
          class="nextStep"
        >{{ $t('workspace.next') }}</el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          v-if="active>=3"
          :loading="uploadBtnLoading"
          @click="onSubmit"
          class="confirm"
        >{{ $t('workspace.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Post } from '../../tools/tool.js'
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
      userId: sessionStorage.getItem('userId')
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
      if (this.active >= 3 && !this.newProjectShow) this.currentComponent = 'fourthStepMigration'
    },
    previousStep () {
      this.active--
      this.changeComponent()
    },
    nextStep () {
      this.active++
      this.changeComponent()
      // 调用子组件方法传递数据
      this.$refs.currentComponet.emitStepData()
      this.getIconFileId()
    },
    getIconFileId () {
      // 获取暂存的Icon的ID
      if (this.active === 1) {
        let firstStepData = this.allFormData.first.appIcon[0]
        let formdata = new FormData()
        formdata.append('file', firstStepData)
        Post('mec/developer/v1/files?userId=' + this.userId, formdata).then(res => {
          this.iconFileId = res.data.fileId
        })
      }
    },
    // 提交上传
    onSubmit () {
      this.getApplicationProject()
    },
    keyupSubmit () {
      document.onkeydown = e => {
        let _key = window.event.keyCode
        if (_key === 13) {
          this.submitTrue()
        }
      }
    },
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    // 获取子组件数据
    getStepData ({ data, step }) {
      this.allFormData[step] = data
    },
    // 处理上传数据
    getApplicationProject () {
      this.uploadBtnLoading = true
      let allFormData = this.allFormData
      let params = {
        'id': '',
        'capabilityList': []
      }
      for (let key in allFormData.first) {
        if (key !== 'appIcon') {
          params[key] = allFormData.first[key]
        }
      }
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
      Post('mec/developer/v1/projects/?userId=' + this.userId, params).then(res => {
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
        this.$message({
          message: this.$t('promptMessage.addProjectFail'),
          type: 'error',
          duration: '2000'
        })
        console.log(err)
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
  .default-icon{
    display: flex;
    flex-wrap: wrap;
    .box{
      position: relative;
      width: 60px;
      height: 60px;
      margin: 10px 15px 10px 0;
      img{
        width: 56px;
        height: 56px;
      }
      i{
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .active{
        color: #409EFF;
        font-weight: 800;
      }
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
