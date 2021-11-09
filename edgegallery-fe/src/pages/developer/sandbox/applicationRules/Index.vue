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
  <div class="application-rules">
    <div
      class="rules-config common-div-bg"
      :class="{'rules-config-hidden':!isRulesConfigShow}"
    >
      <h3 class="rules-title">
        应用规则配置
      </h3>
      <h4 class="rules-title-sub clear">
        流量规则
        <el-button
          class="common-btn inner-btn rt"
          @click="addTrafficRules"
        >
          添加流量规则
        </el-button>
      </h4>
      <el-table
        class="common-table"
        :data="trafficListData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{textAlign: 'center'}"
      >
        <el-table-column
          prop="trafficRuleId"
          label="流规则标识"
          min-width="20%"
        />
        <el-table-column
          prop="action"
          label="过滤类型"
          min-width="20%"
        />
        <el-table-column
          prop="priority"
          label="优先级"
          min-width="20%"
        />
        <el-table-column
          prop="filterType"
          label="规则动作"
          min-width="20%"
        />
        <el-table-column
          :label="$t('common.operation')"
          min-width="20%"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              class="operation-btn-text"
              @click="editAppTrafficRule(scope.$index,scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              type="text"
              class="operation-btn-text"
              @click="deleteTrafficRules(scope.row)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <h4 class="rules-title-sub title-top clear">
        DNS规则
        <el-button
          class="common-btn inner-btn rt"
          @click="addDnsRules"
        >
          添加DNS规则
        </el-button>
      </h4>
      <el-table
        class="common-table"
        :data="dnsListData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{textAlign: 'center'}"
      >
        <el-table-column
          prop="dnsRuleId"
          label="DNS规则标识"
          min-width="20%"
        />
        <el-table-column
          prop="domainName"
          label="FQDN域名"
          min-width="20%"
        />
        <el-table-column
          prop="ipAddressType"
          label="IP地址类型"
          min-width="20%"
        />
        <el-table-column
          prop="ttl"
          label="TTL"
          min-width="20%"
        />
        <el-table-column
          :label="$t('common.operation')"
          min-width="20%"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              class="operation-btn-text"
              @click="editAppDnsRule(scope.$index,scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              type="text"
              class="operation-btn-text"
              @click="deleteDnsRules(scope.row)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="btn-container">
        <el-button
          class="common-btn"
          @click="configApplicationRules('cancel')"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="configApplicationRules('confirm')"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </div>

    <trafficRules
      class="traffic-rules"
      :class="{'traffic-rules-hidden-bottom':!isTrafficRulesShow,'traffic-rules-hidden-top':(isInterfaceInfoShow || isTrafficFilterShow)}"
      @setRulesListTop="setRulesListTop"
      :application-id-prop="applicationId"
      :traffic-rules-form-prop="appRulesData"
      :is-add-rule-data-prop="isAddRuleData"
    />
    <trafficFilter
      class="traffic-filter"
      :class="{'traffic-filter-hidden':!isTrafficFilterShow}"
      @setRulesListTop="setRulesListTop"
    />
    <interfaceInformation
      class="interface-info"
      :class="{'interface-info-hidden':!isInterfaceInfoShow}"
      @setRulesListTop="setRulesListTop"
    />
    <dnsRules
      class="dns-rules"
      :class="{'dns-rules-hidden':!isDnsRulesShow}"
      @setRulesListTop="setRulesListTop"
      :application-id-prop="applicationId"
      :dns-rules-form-prop="appRulesData"
      :is-add-rule-data-prop="isAddRuleData"
    />
  </div>
</template>

<script>
import trafficRules from './AddTrafficRules.vue'
import interfaceInformation from './AddInterfaceInformation.vue'
import trafficFilter from './AddTrafficFilter.vue'
import dnsRules from './AddDnsRules.vue'
import { applicationRules } from '../../../../api/developerApi.js'
import { CommonData } from '../../../../tools/common.js'
export default {
  name: 'ApplicationRules',
  components: {
    trafficRules,
    interfaceInformation,
    trafficFilter,
    dnsRules
  },
  data () {
    return {
      trafficListData: [],
      dnsListData: [],
      screenHeight: document.body.clientHeight,
      timer: false,
      isRulesConfigShow: true,
      isTrafficRulesShow: false,
      isTrafficFilterShow: false,
      isInterfaceInfoShow: false,
      isDnsRulesShow: false,
      isAddRuleData: true,
      editIndex: 0,
      applicationId: sessionStorage.getItem('applicationId') || '',
      trafficRuleList: [
        {
          trafficRuleId: '',
          action: '',
          priority: '',
          filterType: '',
          trafficFilter: [],
          dstInterface: []
        }
      ],
      appRulesData: {}
    }
  },
  methods: {
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let oDiv = document.getElementsByClassName('application-rules')[0]
        if (oDiv) {
          oDiv.style.height = (Number(screenHeight) - 80) + 'px'
        }
      })
    },
    handleTrafficRulesData (data) {
      if (JSON.stringify(data) === '{}') {
        this.isTrafficRulesShow = false
        this.isRulesConfigShow = true
        return
      }
      this.getAppTrafficRuleList()
    },
    handleDnsRulesData (data) {
      if (JSON.stringify(data) === '{}') {
        this.isDnsRulesShow = false
        this.isRulesConfigShow = true
        return
      }
      this.getAppDnsRuleList()
    },
    setRulesListTop (type, data) {
      switch (type) {
        case 'finishTrafficRules': {
          this.handleTrafficRulesData(data)
          this.isTrafficRulesShow = false
          this.isRulesConfigShow = true
          break
        }
        case 'addTrafficFilter': {
          this.isTrafficFilterShow = true
          this.isTrafficRulesShow = false
          break
        }
        case 'finishTrafficFilter': {
          this.isTrafficFilterShow = false
          this.isTrafficRulesShow = true
          break
        }
        case 'addInterfaceInfo': {
          this.isInterfaceInfoShow = true
          this.isTrafficRulesShow = false
          break
        }
        case 'finishInterfaceInformation': {
          this.isInterfaceInfoShow = false
          this.isTrafficRulesShow = true
          break
        }
        case 'finishDnsRules': {
          this.handleDnsRulesData(data)
          this.isDnsRulesShow = false
          this.isRulesConfigShow = true
          break
        }
        default: {
          this.isRulesConfigShow = true
          this.isTrafficRulesShow = false
          this.isTrafficFilterShow = false
          this.isInterfaceInfoShow = false
          this.isDnsRulesShow = false
        }
      }
    },
    addTrafficRules () {
      this.isAddRuleData = true
      this.appRulesData = {
        trafficRuleId: '',
        priority: '',
        action: 'FORWARD_DECAPSULATED',
        filterType: 'FLOW'
      }
      this.isRulesConfigShow = false
      this.isTrafficRulesShow = true
    },
    editAppTrafficRule (index, row) {
      this.editIndex = index
      this.isAddRuleData = false
      this.appRulesData = JSON.parse(JSON.stringify(row))
      this.isRulesConfigShow = false
      this.isTrafficRulesShow = true
    },
    deleteTrafficRules (row) {
      this.$eg_messagebox(this.$t('common.confirmDelete'), 'warning').then(() => {
        applicationRules.deleteAppTrafficRule(this.applicationId, row.trafficRuleId).then(() => {
          this.getAppTrafficRuleList()
        })
      })
    },
    addDnsRules () {
      this.isAddRuleData = true
      this.appRulesData = {
        dnsRuleId: '',
        domainName: 'domainName',
        ipAddressType: 'IP_V4',
        ipAddress: CommonData.ip,
        ttl: CommonData.ttl
      }
      this.isRulesConfigShow = false
      this.isDnsRulesShow = true
    },
    editAppDnsRule (index, row) {
      this.editIndex = index
      this.isAddRuleData = false
      this.appRulesData = JSON.parse(JSON.stringify(row))
      this.isRulesConfigShow = false
      this.isDnsRulesShow = true
    },
    deleteDnsRules (row) {
      this.$eg_messagebox(this.$t('common.confirmDelete'), 'warning').then(() => {
        applicationRules.deleteAppDnsRule(this.applicationId, row.dnsRuleId).then(() => {
          this.getAppDnsRuleList()
        })
      })
    },
    configApplicationRules (type) {
      this.$router.push('/EG/developer/sandboxDetails')
      if (type === 'cancel') {
        sessionStorage.setItem('applicationRules', 'cancel')
      } else {
        sessionStorage.setItem('applicationRules', 'confirm')
      }
    },
    getAppTrafficRuleList () {
      applicationRules.getAppTrafficRules(this.applicationId).then(res => {
        if (res.data) {
          this.trafficListData = res.data
        }
      })
    },
    getAppDnsRuleList () {
      applicationRules.getAppDnsRules(this.applicationId).then(res => {
        if (res.data) {
          this.dnsListData = res.data
        }
      })
    }
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    }
  },
  mounted () {
    this.getAppTrafficRuleList()
    this.getAppDnsRuleList()
    this.setDivHeight(this.screenHeight)
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.setDivHeight(this.screenHeight)
      })()
    }
  }
}
</script>

<style lang="less">
.application-rules{
  padding: 0 15%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .rules-config{
    position: absolute;
    z-index: 1;
    width: 60%;
    padding: 40px;
    opacity: 1;
    transition: all .2s;
    .el-table{
      width: calc(100% - 35px);
      margin-left: 35px;
    }
  }
  .rules-config-hidden{
    z-index: -1;
    opacity: 0;
    transition: all .2s;
  }
  .traffic-rules{
    position: absolute;
    z-index: 1;
    width: 60%;
    padding: 40px;
    max-height: 90%;
    overflow: auto;
    opacity: 1;
    transition: all .2s linear;
  }
  .traffic-filter{
    position: absolute;
    z-index: 1;
    width: 800px;
    padding: 40px 80px 40px 40px;
    overflow: auto;
    opacity: 1;
    transition: all .2s linear;
    .el-input-number .el-input__inner{
      text-align: center;
    }
  }
  .interface-info{
    position: absolute;
    z-index: 1;
    width: 600px;
    padding: 40px;
    overflow: auto;
    opacity: 1;
    transition: all .2s linear;
  }
  .dns-rules{
    position: absolute;
    z-index: 1;
    width: 600px;
    padding: 40px;
    overflow: auto;
    opacity: 1;
    transition: all .2s linear;
  }
  .traffic-rules-hidden-bottom,.traffic-filter-hidden,.interface-info-hidden,.dns-rules-hidden{
    z-index: -1;
    opacity: 0;
    transition: all .2s;
  }
}
@media screen and (max-width:1600px){
  .application-rules{
    padding: 0 10%;
  }
}
</style>
