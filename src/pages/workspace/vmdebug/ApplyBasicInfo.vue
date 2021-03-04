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
  <div class="apply-basicInfo">
    <el-row :gutter="24">
      <el-form
        label-width="120px"
        :model="form"
        ref="form"
        :rules="rules"
      >
        <el-form-item
          :label="$t('workspace.deployDebugVm.vmName')"
          prop="name"
        >
          <el-input
            id="elinput_name"
            maxlength="128"
            v-model="form.name"
          />
        </el-form-item>
      </el-form>
    </el-row>
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
        name: this.allStepData.basicSetting ? this.allStepData.basicSetting.vmName : ''
      },
      rules: {
        name: [
          { required: true, message: this.$t('lab.verify.nameBlankTip'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = { vmName: this.form.name }
        this.$emit('getStepData', { step: 'basicSetting', data, ifNext })
      }
    }
  },
  created () { },
  mounted () {
  },
  beforeDestroy () {
  },
  watch: {
  }
}
</script>

<style lang="less">
.apply-basicInfo{
  padding:5% 20% 5% 5%;
}
</style>
