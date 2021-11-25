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
      {{ $t('appPackage.rule') }}
    </h3>
    <el-form
      id="form_trafficRules"
      label-width="120px"
      size="mini"
      class="common-form clear"
      :model="trafficRuleForm"
    >
      <el-form-item
        :label="$t('appPackage.trafficRuleId')"
        class="input-half lt"
      >
        <el-input
          maxlength="30"
          v-model="trafficRuleForm.trafficRuleId"
          :disabled="!isAddRuleData"
        />
      </el-form-item>
      <el-form-item
        :label="$t('appPackage.priority')"
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
        :label="$t('appPackage.action')"
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
        :label="$t('appPackage.filterType')"
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

    <h3 class="common-dlg-title list-top">
      {{ $t('rulesConfig.filterRules') }}
    </h3>
    <h4 class="rules-title-sub clear">
      {{ $t('rulesConfig.filterRules') }}
      <el-button
        id="btn_addTrafficFilter"
        class="common-btn inner-btn rt"
        @click="addTrafficFilter"
      >
        {{ $t('rulesConfig.addFlowFilter') }}
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
        :label="$t('rulesConfig.srcAddress')"
      />
      <el-table-column
        prop="srcPort"
        :label="$t('rulesConfig.srcPort')"
      />
      <el-table-column
        prop="dstAddress"
        :label="$t('rulesConfig.dstAddress')"
      />
      <el-table-column
        prop="dstPort"
        :label="$t('rulesConfig.dstPort')"
      />
      <el-table-column
        prop="tgtTunnelAddress"
        :label="$t('rulesConfig.tgtTunnelAddress')"
      />
      <el-table-column
        prop="dstTunnelPort"
        :label="$t('rulesConfig.dstTunnelPort')"
      />
      <el-table-column
        :label="$t('common.operation')"
        width="120px"
      >
        <template slot-scope="scope">
          <el-button
            :id="'btn_editTrafficFilter'+scope.$index"
            type="text"
            class="operation-btn-text"
            @click="editTrafficFilter(scope.$index,scope.row)"
          >
            {{ $t('common.edit') }}
          </el-button>
          <el-button
            :id="'btn_delTrafficFilter'+scope.$index"
            type="text"
            class="operation-btn-text"
            @click="deleteTrafficFilter(scope.$index)"
          >
            {{ $t('common.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="trafficRuleForm.action==='FORWARD_DECAPSULATED'||trafficRuleForm.action==='FORWARD_AS_IS'">
      <h3 class="common-dlg-title list-top">
        {{ $t('rulesConfig.interfaceInfo') }}
      </h3>
      <h4 class="rules-title-sub clear">
        {{ $t('rulesConfig.forwardInterfaceTabTitle') }}
        <el-button
          id="btn_addInterfaceInformation"
          class="common-btn inner-btn rt"
          @click="addInterfaceInformation"
        >
          {{ $t('rulesConfig.addInterfaceInfo') }}
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
          :label="$t('rulesConfig.interfaceType')"
        />
        <el-table-column
          prop="tunnelInfo.tunnelType"
          :label="$t('rulesConfig.tunnelType')"
        />
        <el-table-column
          prop="tunnelInfo.tunnelDstAddress"
          :label="$t('rulesConfig.tgtTunnelAddress')"
        />
        <el-table-column
          prop="tunnelInfo.tunnelSrcAddress"
          :label="$t('rulesConfig.srcTunnelAddress')"
        />
        <el-table-column
          prop="tunnelInfo.tunnelSpecificData"
          :label="$t('rulesConfig.tunnelParams')"
        />
        <el-table-column
          prop="dstMacAddress"
          :label="$t('rulesConfig.macAddress')"
        />
        <el-table-column
          prop="srcMacAddress"
          :label="$t('rulesConfig.sourceMacAddress')"
        />
        <el-table-column
          prop="dstIpAddress"
          :label="$t('rulesConfig.dstIpAddress')"
        />
        <el-table-column
          :label="$t('common.operation')"
          width="120px"
        >
          <template slot-scope="scope">
            <el-button
              :id="'btn_editInterfaceInformation'+scope.$index"
              type="text"
              class="operation-btn-text"
              @click="editInterfaceInformation(scope.$index,scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              :id="'btn_delInterfaceInformation'+scope.$index"
              type="text"
              class="operation-btn-text"
              @click="deleteInterfaceInformation(scope.$index)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="btn-container">
      <el-button
        id="btn_cancelTrafficRules"
        class="common-btn"
        @click="finishTrafficRules('cancel')"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="btn_confirmTrafficRules"
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
    },
    commonDataProp: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      trafficRuleForm: {
        trafficFilter: [],
        dstInterface: []
      },
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
      rulesId: '',
      editIndex: 0,
      isAddTrafficFilter: true,
      isAddInterfaceInfo: true,
      commonData: this.commonDataProp
    }
  },
  methods: {
    handleTrafficFilterData (data) {
      let _trafficFilterTemp = []
      if (data.trafficFilter) {
        data.trafficFilter.forEach(item => {
          let _objFilter = {
            qCI: item.qCI,
            dSCP: item.dSCP,
            tC: item.tC
          }
          for (let key in item) {
            if (typeof (item[key]) !== 'number') {
              _objFilter[key] = item[key].join(',')
            }
          }
          _trafficFilterTemp.push(_objFilter)
        })
      }
      this.filterTableData = _trafficFilterTemp
    },
    finishTrafficRules (type) {
      let _data = {}
      let _arrFilter = []
      this.filterTableData.forEach(item => {
        let _objFilter = {
          qCI: item.qCI,
          dSCP: item.dSCP,
          tC: item.tC
        }
        for (let key in item) {
          if (typeof (item[key]) !== 'number') {
            _objFilter[key] = item[key].split(',')
          }
        }
        _arrFilter.push(_objFilter)
      })
      this.trafficRuleForm.trafficFilter = _arrFilter
      this.trafficRuleForm.dstInterface = this.interfaceTableData

      if (type === 'confirm') {
        _data = this.trafficRuleForm
        let _params = {
          trafficRuleId: '',
          trafficFilter: [],
          dstInterface: []
        }
        for (let k in _data) {
          _params[k] = _data[k]
        }
        if (_params.trafficRuleId === '') {
          this.$eg_messagebox(this.$t('rulesConfig.trafficRuleIdisEmpty'), 'warning')
          return
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
      this.isAddTrafficFilter = true
      this.trafficFilterForm = {
        srcAddress: this.commonData.address,
        srcPort: this.commonData.port,
        dstAddress: this.commonData.address,
        dstPort: this.commonData.port,
        protocol: this.commonData.protocol,
        tag: '1234',
        qCI: 1,
        dSCP: 0,
        tC: 1,
        srcTunnelAddress: this.commonData.ip,
        srcTunnelPort: this.commonData.port,
        tgtTunnelAddress: this.commonData.ip,
        dstTunnelPort: this.commonData.port
      }
      this.$emit('setRulesListTop', 'addTrafficFilter')
      this.bus.$emit('addTrafficFilter', this.trafficFilterForm)
    },
    // send TrafficFilter Data to TrafficFilter page
    editTrafficFilter (index, row) {
      this.isAddTrafficFilter = false
      this.trafficFilterForm = JSON.parse(JSON.stringify(row))
      this.editIndex = index
      this.$emit('setRulesListTop', 'addTrafficFilter')
      this.bus.$emit('editTrafficFilter', this.trafficFilterForm)
    },
    deleteTrafficFilter (index) {
      this.$eg_messagebox(this.$t('promptInformation.confirmDelete'), 'warning', this.$t('common.cancel')).then(() => {
        this.filterTableData.splice(index, 1)
      })
    },
    // get TrafficFilter Data from TrafficFilter page
    finishTrafficFilter () {
      let _this = this
      this.bus.$on('finishTrafficFilter', function (data) {
        if (JSON.stringify(data) !== '{}') {
          if (_this.isAddTrafficFilter) {
            _this.filterTableData.push(data)
          } else {
            _this.filterTableData.splice(_this.editIndex, 1, data)
          }
        }
      })
    },
    addInterfaceInformation () {
      this.isAddInterfaceInfo = true
      this.interfaceInformationForm = {
        interfaceType: 'TUNNEL',
        dstMacAddress: '',
        srcMacAddress: '',
        dstIpAddress: '',
        tunnelInfo: {
          tunnelType: 'GTP-U',
          tunnelDstAddress: '0',
          tunnelSpecificData: '0',
          tunnelSrcAddress: '0'
        }
      }
      this.$emit('setRulesListTop', 'addInterfaceInfo')
      this.bus.$emit('addInterfaceInformation', this.interfaceInformationForm)
    },
    // send InterfaceInformation Data to InterfaceInformation Page
    editInterfaceInformation (index, row) {
      this.isAddInterfaceInfo = false
      this.interfaceInformationForm = JSON.parse(JSON.stringify(row))
      this.editIndex = index
      this.$emit('setRulesListTop', 'addInterfaceInfo')
      this.bus.$emit('editInterfaceInformation', this.interfaceInformationForm)
    },
    deleteInterfaceInformation (index) {
      this.$eg_messagebox(this.$t('promptInformation.confirmDelete'), 'warning', this.$t('common.cancel')).then(() => {
        this.interfaceTableData.splice(index, 1)
      })
    },
    // get InterfaceInformation Data from InterfaceInformation Page
    finishInterfaceInformation () {
      let _this = this
      this.bus.$on('finishInterfaceInformation', function (data) {
        if (JSON.stringify(data) !== '{}') {
          if (_this.isAddInterfaceInfo) {
            _this.interfaceTableData.push(data)
          } else {
            _this.interfaceTableData.splice(_this.editIndex, 1, data)
          }
        }
      })
    },
    submitAppTrafficRule (params, _data) {
      applicationRules.postAppTrafficRule(this.applicationId, params).then(() => {
        this.$emit('setRulesListTop', 'finishTrafficRules', _data)
      }).catch(error => {
        if (error.response.data.message === 'create trafficRule failed: ruleId have exit') {
          this.$eg_messagebox(this.$t('rulesConfig.trafficRuleIdisExists'), 'error')
        }
      })
    },
    editAppTrafficRule (params, _data) {
      applicationRules.editAppTrafficRule(this.applicationId, this.rulesId, params).then(res => {
        this.$emit('setRulesListTop', 'finishTrafficRules', _data)
      }).catch(() => {
        this.$eg_messagebox(this.$t('promptInformation.editDataFailed'), 'error')
      })
    }
  },
  watch: {
    trafficRulesFormProp (val) {
      this.trafficRuleForm = val
      this.rulesId = val.trafficRuleId
      this.handleTrafficFilterData(val)
      this.interfaceTableData = val.dstInterface
    },
    isAddRuleDataProp (val) {
      this.isAddRuleData = val
    }
  },
  mounted () {
    this.finishTrafficFilter()
    this.finishInterfaceInformation()
  }
}
</script>

<style lang="less">
.list-top{
  margin-top: 35px;
}
</style>
