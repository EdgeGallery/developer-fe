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
      分流规则
    </h3>
    <el-form
      label-width="120px"
      size="mini"
      class="common-form clear"
      :model="trafficRuleForm"
    >
      <el-form-item
        label="流规则标识"
        class="input-half lt"
      >
        <el-input
          maxlength="30"
          v-model="trafficRuleForm.trafficRuleId"
          :disabled="!isAddRuleData"
        />
      </el-form-item>
      <el-form-item
        label="优先级"
        class="input-half lt"
      >
        <el-input-number
          placeholder="1~255"
          :min="1"
          :max="255"
          :controls="false"
          v-model="trafficRuleForm.priority"
        />
      </el-form-item>
      <el-form-item
        label="规则动作"
        class="input-half lt"
      >
        <el-select
          v-model="trafficRuleForm.action"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in action"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="过滤类型"
        class="input-half lt"
      >
        <el-select
          v-model="trafficRuleForm.filterType"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in filterType"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <h3 class="rules-title list-top">
      流过滤规则
    </h3>
    <h4 class="rules-title-sub clear">
      流过滤规则
      <el-button
        class="common-btn inner-btn rt"
        @click="addTrafficFilter"
      >
        添加流量过滤器
      </el-button>
    </h4>
    <el-table
      class="common-table"
      :data="filterTableData"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{textAlign: 'center'}"
    >
      <el-table-column
        prop="srcAddress"
        label="源IP地址"
      />
      <el-table-column
        prop="srcPort"
        label="源端口号"
      />
      <el-table-column
        prop="dstAddress"
        label="目的IP地址"
      />
      <el-table-column
        prop="dstPort"
        label="目的端口号"
      />
      <el-table-column
        prop="tgtTunnelAddress"
        label="隧道目的地址"
      />
      <el-table-column
        prop="dstTunnelPort"
        label="隧道目的端口"
      />
      <el-table-column
        :label="$t('common.operation')"
        width="120px"
      >
        <template>
          <el-button
            type="text"
            class="operation-btn-text"
          >
            {{ $t('common.edit') }}
          </el-button>
          <el-button
            type="text"
            class="operation-btn-text"
          >
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="trafficRuleForm.action==='FORWARD_DECAPSULATED'||trafficRuleForm.action==='FORWARD_AS_IS'">
      <h3 class="rules-title list-top">
        接口信息
      </h3>
      <h4 class="rules-title-sub clear">
        转发接口信息
        <el-button
          class="common-btn inner-btn rt"
          @click="addInterfaceInformation"
        >
          添加接口信息
        </el-button>
      </h4>
      <el-table
        class="common-table"
        :data="interfaceTableData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{textAlign: 'center'}"
      >
        <el-table-column
          prop="interfaceType"
          label="接口类型"
        />
        <el-table-column
          prop="tunnelInfo.tunnelType"
          label="隧道类型"
        />
        <el-table-column
          prop="tunnelInfo.tunnelDstAddress"
          label="隧道目的地址"
        />
        <el-table-column
          prop="tunnelInfo.tunnelSrcAddress"
          label="隧道源地址"
        />
        <el-table-column
          prop="tunnelInfo.tunnelSpecificData"
          label="隧道指定参数"
        />
        <el-table-column
          prop="dstMACAddress"
          label="目的MAC地址"
        />
        <el-table-column
          prop="srcMACAddress"
          label="源MAC地址"
        />
        <el-table-column
          prop="dstIPAddress"
          label="目的地址"
        />
        <el-table-column
          :label="$t('common.operation')"
          width="120px"
        >
          <template>
            <el-button
              type="text"
              class="operation-btn-text"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              type="text"
              class="operation-btn-text"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="btn-container">
      <el-button
        class="common-btn"
        @click="finishTrafficRules('cancel')"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="common-btn"
        @click="finishTrafficRules('confirm')"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { applicationRules } from '../../../../api/developerApi.js'
export default {
  name: 'TrafficRules',
  props: {
    applicationIdProp: {
      type: String,
      default: ''
    },
    trafficRulesFormProp: {
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
      trafficRuleForm: {},
      filterType: [
        { value: 'FLOW' },
        { value: 'PACKET' }
      ],
      action: [
        { value: 'DROP' },
        { value: 'FORWARD_DECAPSULATED' },
        { value: 'FORWARD_AS_IS' },
        { value: 'PASSTHROUGH' },
        { value: 'SUPLICATED_DECAPSULATED' }

      ],
      filterTableData: [],
      interfaceTableData: [],
      applicationId: this.applicationIdProp,
      isAddRuleData: true,
      rulesId: ''
    }
  },
  methods: {
    finishTrafficRules (type) {
      let _data = {}
      if (type === 'confirm') {
        _data = this.trafficRuleForm
        let _params = {
          trafficFilter: [],
          dstInterface: []
        }
        for (let k in _data) {
          _params[k] = _data[k]
        }
        if (this.isAddRuleData) {
          this.submitAppTrafficRule(_params, _data)
        } else {
          this.editAppTrafficRule(_params, _data)
        }
      } else {
        this.$emit('setRulesListTop', 'finishTrafficRules', _data)
      }
    },
    addTrafficFilter () {
      this.$emit('setRulesListTop', 'addTrafficFilter')
    },
    addInterfaceInformation () {
      this.$emit('setRulesListTop', 'addInterfaceInfo')
    },
    submitAppTrafficRule (params, _data) {
      applicationRules.postAppTrafficRule(this.applicationId, params).then(() => {
        this.$emit('setRulesListTop', 'finishTrafficRules', _data)
      }).catch(error => {
        if (error.response.data.message === 'create trafficRule failed: ruleId have exit') {
          this.$eg_messagebox('流规则标识已存在', 'error')
        }
      })
    },
    editAppTrafficRule (params, _data) {
      applicationRules.editAppTrafficRule(this.applicationId, this.rulesId, params).then(res => {
        this.$emit('setRulesListTop', 'finishTrafficRules', _data)
      }).catch(() => {
        this.$eg_messagebox('编辑数据失败', 'error')
      })
    }
  },
  watch: {
    trafficRulesFormProp (val) {
      this.trafficRuleForm = val
      this.rulesId = val.trafficRuleId
    },
    isAddRuleDataProp (val) {
      this.isAddRuleData = val
    }
  }
}
</script>

<style lang="less">
.list-top{
  margin-top: 35px;
}
</style>
