<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
    class="common-div-bg"
    style="padding: 50px 80px"
  >
    <div
      class="case-detail"
    >
      <p class="common-dlg-title">
        {{ $t('atpTestProcess.contribution') }}
      </p>
    </div>
    <el-form
      :model="addCaseForm"
      label-width="auto"
      ref="addcaseForm"
      :rules="rules"
      class="contibution-form"
    >
      <el-form-item
        :label="$t('testCase.caseName')"
        prop="name"
      >
        <el-input
          width="100px"
          size="small"
          v-model="addCaseForm.name"
          maxlength="64"
        />
      </el-form-item>
      <el-form-item
        :label="$t('testCase.casePurpose')"
        prop="objective"
      >
        <el-input
          v-model="addCaseForm.objective"
          type="textarea"
          autosize
          maxlength="255"
        />
      </el-form-item>
      <el-form-item
        :label="$t('testCase.step')"
        prop="step"
      >
        <el-input
          v-model="addCaseForm.step"
          type="textarea"
          autosize
          maxlength="255"
        />
      </el-form-item>
      <el-form-item
        :label="$t('testCase.expectedResult')"
        prop="expectResult"
      >
        <el-input
          size="small"
          v-model="addCaseForm.expectResult"
          maxlength="255"
        />
      </el-form-item>
      <el-form-item
        :label="$t('testCase.type')"
        prop="type"
      >
        <el-select
          size="small"
          v-model="addCaseForm.type"
          :placeholder="$t('atpTestProcess.choose')"
        >
          <el-option
            :label="language==='cn'?'文本':'text'"
            value="text"
          />
          <el-option
            :label="language==='cn'?'脚本':'script'"
            value="script"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="addCaseForm.type==='script'"
        :label="$t('testCase.import')"
        prop="file"
        ref="import"
      >
        <el-upload
          action=""
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="handleChange"
          :on-remove="handleDelte"
          :file-list="addCaseForm.file"
          :auto-upload="false"
          accept=".zip"
        >
          <el-button
            slot="trigger"
            size="small"
            class="inner-btn"
          >
            {{ $t('testCase.upload') }}
          </el-button>
          <el-tooltip
            style="margin-left:10px;"
            :content="$t('atpTestProcess.contentTip')"
            effect="light"
            placement="right"
          >
            <em class="el-icon-info" />
          </el-tooltip>
        </el-upload>
      </el-form-item>
    </el-form>
    <div
      style="text-align:right;"
    >
      <el-button
        id="
      upload_package_close"
        @click="closeContributionCase"
        class="common-btn"
        style="margin-right:20px;"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="upload_package_ipload"
        class="common-btn"
        @click="confirmAddCase()"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>
<script>
import { atpApi } from '../../../api/atpApi.js'

export default {
  name: 'ContributionCase',
  data () {
    const nameEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('atpPromptMessage.nameEmpty')))
      } else {
        callback()
      }
    }
    const objectiveEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('atpPromptMessage.objectiveEmpty')))
      } else {
        callback()
      }
    }
    const resultEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('atpPromptMessage.expectResultEmpty')))
      } else {
        callback()
      }
    }
    const typeEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('atpPromptMessage.typeEmpty')))
      } else {
        callback()
      }
    }
    const stepEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('atpPromptMessage.testStepEmpty')))
      } else {
        callback()
      }
    }
    const fileEmpty = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t('atpPromptMessage.fileEmpty')))
      } else {
        callback()
      }
    }
    return {
      language: localStorage.getItem('language') || 'cn',
      addCaseForm: {
        name: '',
        objective: '',
        step: '',
        expectResult: '',
        type: '',
        file: []
      },
      rules: {
        name: [
          { required: true, validator: nameEmpty, trigger: 'blur' }
        ],
        objective: [
          { required: true, validator: objectiveEmpty, trigger: 'blur' }
        ],
        step: [
          { required: true, validator: stepEmpty, trigger: 'blur' }
        ],
        expectResult: [
          { required: true, validator: resultEmpty, trigger: 'blur' }
        ],
        type: [
          { required: true, validator: typeEmpty, trigger: 'change' }
        ],
        file: [
          { required: true, validator: fileEmpty, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    confirmAddCase () {
      this.$refs['addcaseForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        let fd = new FormData()
        let _addCaseForm = this.addCaseForm
        fd.append('name', _addCaseForm.name)
        fd.append('objective', _addCaseForm.objective)
        fd.append('step', _addCaseForm.step)
        fd.append('expectResult', _addCaseForm.expectResult)
        fd.append('type', _addCaseForm.type)
        if (_addCaseForm.file.length > 0) {
          fd.append('file', _addCaseForm.file[0])
        } else {
          let _objFile = new File([], 'kong.java')
          _addCaseForm.file.push(_objFile)
          fd.append('file', _addCaseForm.file[0])
        }
        atpApi.contributionApi(fd).then(res => {
          this.$message({
            showClose: true,
            duration: 2000,
            message: this.$t('atpPromptMessage.submitSuccess'),
            type: 'success'
          })
          this.$emit('setCaseTop', 'close')
          this.addCaseForm = {
            name: '',
            objective: '',
            step: '',
            expectResult: '',
            type: '',
            file: []
          }
        }).catch(() => {
          this.closeContributionCase()
        })
        if (this.addCaseForm.file.length !== 0) {
          this.$refs.import.clearValidate()
        }
      })
    },
    closeContributionCase () {
      this.$emit('setCaseTop', 'close')
      this.addCaseForm = {
        name: '',
        objective: '',
        step: '',
        expectResult: '',
        type: '',
        file: []
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('atpPromptMessage.onlyOneFile'))
      }
    },
    handleChange (file, fileList) {
      this.addCaseForm.file.push(file.raw)
      this.$refs.import.clearValidate()
    },
    handleDelte (file, fileList) {
      this.addCaseForm.file = fileList
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less">
  .case-detail{
    position: relative;
  }
  .contibution-form{
    .el-form-item__label{
      font-size: 18px;
    }
    .el-button.inner-btn {
      padding: 8px 24px;
      font-size: 16px !important;
    }
    .el-input__inner,.el-textarea__inner{
      color: #C9BDF3;
      background-color: rgba(255,255,255,.45);
      border: none;
      font-family: defaultFontLight;
      font-size: 14px;
    }
    .el-icon-info:before{
      color: #8969f9;
    }
  }
</style>
