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
    <h3 class="rules-title">
      添加DNS规则
    </h3>

    <el-form
      label-width="120px"
      size="mini"
      class="common-form clear"
      :model="dnsRulesForm"
    >
      <el-form-item
        label="DNS规则标识"
      >
        <el-input
          v-model="dnsRulesForm.dnsRuleId"
        />
      </el-form-item>
      <el-form-item
        label="FQDN域名"
      >
        <el-input
          v-model="dnsRulesForm.domainName"
        />
      </el-form-item>
      <el-form-item
        label="IP地址类型"
      >
        <el-select
          v-model="dnsRulesForm.ipAddressType"
          class="list-select"
        >
          <el-option
            v-for="item in ipAddressTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
            :id="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="IP地址"
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
        class="common-btn"
        @click="cancelDnsRules"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="common-btn"
        @click="cancelDnsRules"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DNSRules',
  data () {
    return {
      dnsRulesForm: {
        dnsRuleId: '',
        domainName: 'domainName',
        ipAddressType: 'IP_V4',
        ipAddress: '0.0.0.0',
        ttl: '85000'
      },
      ipAddressTypeOptions: [
        {
          value: 0,
          label: 'IP_V4'
        }, {
          value: 1,
          label: 'IP_V6'
        }
      ]
    }
  },
  methods: {
    cancelDnsRules () {
      this.$emit('setRulesListTop', 'cancelDnsRules')
    }
  }
}
</script>
