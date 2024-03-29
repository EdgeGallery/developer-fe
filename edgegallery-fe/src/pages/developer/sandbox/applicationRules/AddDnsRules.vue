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
  <div class="common-div-bg">
    <h3 class="common-dlg-title">
      {{ $t('appPackage.addDnsRule') }}
    </h3>

    <el-form
      id="form_dnsRules"
      label-width="170px"
      size="medium"
      class="common-form clear"
      :model="dnsRulesForm"
    >
      <el-form-item
        :label="$t('appPackage.dnsRuleId')"
      >
        <el-input
          v-model="dnsRulesForm.dnsRuleId"
          :disabled="!isAddRuleData"
        />
      </el-form-item>
      <el-form-item
        :label="$t('appPackage.domainName')"
      >
        <el-input
          v-model="dnsRulesForm.domainName"
        />
      </el-form-item>
      <el-form-item
        :label="$t('appPackage.ipAddressType')"
      >
        <el-select
          v-model="dnsRulesForm.ipAddressType"
          class="list-select"
        >
          <el-option
            v-for="item in ipAddressTypeOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            :id="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('rulesConfig.ipAddress')"
      >
        <el-input
          v-model="dnsRulesForm.ipAddress"
        />
      </el-form-item>
      <el-form-item
        label="TTL"
      >
        <el-input
          v-model="dnsRulesForm.ttl"
        />
      </el-form-item>
    </el-form>

    <div class="btn-container">
      <el-button
        id="btn_cancelDnsRules"
        class="common-btn"
        @click="finishDnsRules('cancel')"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="btn_confirmDnsRules"
        class="common-btn"
        @click="finishDnsRules('confirm')"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { applicationRules } from '../../../../api/developerApi.js'
export default {
  name: 'DNSRules',
  props: {
    applicationIdProp: {
      type: String,
      default: ''
    },
    dnsRulesFormProp: {
      type: Object,
      default: () => ({})
    },
    isAddRuleDataProp: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dnsRulesForm: {},
      ipAddressTypeOptions: [
        { value: 'IP_V4' },
        { value: 'IP_V6' }
      ],
      applicationId: this.applicationIdProp,
      isAddRuleData: true,
      rulesId: ''
    }
  },
  methods: {
    finishDnsRules (type) {
      let _data = {}
      if (type === 'confirm') {
        _data = this.dnsRulesForm
        let _params = {
          dnsRuleId: ''
        }
        for (let k in _data) {
          _params[k] = _data[k]
        }
        if (_params.dnsRuleId === '') {
          this.$eg_messagebox(this.$t('rulesConfig.dnsRuleIdisEmpty'), 'warning')
          return
        }
        if (this.isAddRuleData) {
          this.submitAppTrafficRule(_params, _data)
        } else {
          this.editAppTrafficRule(_params, _data)
        }
      } else {
        this.$emit('setRulesListTop', 'finishDnsRules', _data)
      }
    },
    submitAppTrafficRule (params, _data) {
      applicationRules.postAppDnsRule(this.applicationId, params).then(() => {
        this.$emit('setRulesListTop', 'finishDnsRules', _data)
      }).catch(error => {
        if (error.response.data.message === 'create DnsRule failed: ruleId have exit') {
          this.$eg_messagebox(this.$t('rulesConfig.dnsRuleIdisExists'), 'error')
        }
      })
    },
    editAppTrafficRule (params, _data) {
      applicationRules.editAppDnsRule(this.applicationId, this.rulesId, params).then(res => {
        this.$emit('setRulesListTop', 'finishDnsRules', _data)
      }).catch(() => {
        this.$eg_messagebox(this.$t('promptInformation.editDataFailed'), 'error')
      })
    }
  },
  watch: {
    dnsRulesFormProp (val) {
      this.dnsRulesForm = val
      this.rulesId = val.dnsRuleId
    },
    isAddRuleDataProp (val) {
      this.isAddRuleData = val
    }
  }
}
</script>
