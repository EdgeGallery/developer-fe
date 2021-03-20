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
  <div class="addDnsRules">
    <el-dialog
      :title="$t('workspace.add')+$t('workspace.dnsRules')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      :before-close="handleClose"
      center
    >
      <el-form
        :model="form"
        size="middle"
        ref="form"
      >
        <el-form-item
          :label="$t('workspace.appRelease.dnsRuleId')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.dnsRuleId"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.appRelease.domainName')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.domainName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.appRelease.ipAddressType')"
          :label-width="formLabelWidth"
          class="ipAddressType"
        >
          <el-select
            v-model="form.ipAddressType"
            class="list-select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
              :id="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.appRelease.ipAddress')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.ipAddress"
          />
        </el-form-item>
        <el-form-item
          label="TTL"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.ttl"
          />
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          size="medium"
          class="cancel"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="addDnsRules"
          size="medium"
          class="confirm"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    editRuleDataprop: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      form: JSON.parse(JSON.stringify(this.editRuleDataprop)),
      options: [
        {
          value: 0,
          label: 'IP_V4'
        }, {
          value: 1,
          label: 'IP_V6'
        }
      ],
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    addDnsRules () {
      this.$emit('getAddDnsData', this.form)
      this.handleClose()
    }
  }
}

</script>
<style lang='less'>
.addDnsRules{
  .el-dialog--center{
    .el-dialog__header{
      text-align: left;
    }
  }
  .el-form{
    width: 85%;
    .ipAddressType{
      text-align: left;
    }
  }
}

</style>
