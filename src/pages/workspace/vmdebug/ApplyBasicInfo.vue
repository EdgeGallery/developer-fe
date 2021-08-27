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
  <div class="apply-basicInfo work-div container-1">
    <el-form
      class="work-input"
      :model="form"
      ref="form"
      :rules="rules"
    >
      <el-form-item
        :label="$t('workspace.deployDebugVm.vmName')"
        :label-width="labelWidth"
        prop="name"
      >
        <el-input
          id="elinput_name"
          maxlength="128"
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item
        :label="$t('system.username')"
        :label-width="labelWidth"
      >
        <el-input
          maxlength="128"
          v-model="vmUserName"
          disabled
        />
      </el-form-item>
      <el-form-item
        :label="$t('system.password')"
        :label-width="labelWidth"
      >
        <el-input
          maxlength="128"
          placeholder="root"
          disabled
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BasicInfoOnApplyVM',
  props: {
    allStepData: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: this.allStepData.basicSetting
          ? this.allStepData.basicSetting.vmName
          : ''
      },
      vmUserName: 'root',
      rules: {
        name: [
          {
            required: true,
            message: this.$t('promptMessage.nameEmpty'),
            trigger: 'blur'
          },
          {
            pattern:
              /^(?!_)(?!-)(?!\s)(?!.*?_$)(?!.*?-$)(?!.*?\s$)(?![0-9]+$)[a-zA-Z0-9_-]{4,32}$/,
            message: this.$t('promptMessage.nameRuleResourceConfig')
          }
        ]
      },
      labelWidth: '140px',
      language: 'cn'
    }
  },
  methods: {
    emitStepData () {
      this.$refs['form'].validate((valid) => {
        let canNext = valid
        const data = { vmName: this.form.name }
        this.$emit('getStepData', { step: 'basicSetting', data, canNext })
      })
    },
    setLabelWidth () {
      this.labelWidth = this.language === 'cn' ? '140px' : '200px'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.setLabelWidth()
    }
  },
  mounted () {
    this.setLabelWidth()
  }
}
</script>

<style lang="less">
.container-1 {
  display: flex;
  align-items: center;
  justify-content: center;

  .work-input {
    min-width: 700px;
    width: 70%;

    .el-form-item__label {
      color: #380879;
      padding-right: 24px;
      font-size: 16px;
      font-family: defaultFontLight;
    }

    .el-form-item__error {
      margin-right: -30px;
    }
  }
}
</style>
