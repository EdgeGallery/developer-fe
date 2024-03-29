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
      <h3 class="common-dlg-title">
        {{ $t('rulesConfig.appRuleConfig') }}
      </h3>
      <h4 class="rules-title-sub clear">
        {{ $t('appPackage.trafficRule') }}
        <el-button
          id="btn_addTrafficRules"
          class="common-btn inner-btn rt"
          @click="addTrafficRules"
        >
          {{ $t('appPackage.addTrafficRule') }}
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
          :label="$t('appPackage.trafficRuleId')"
          min-width="20%"
        />
        <el-table-column
          prop="action"
          :label="$t('appPackage.action')"
          min-width="20%"
        />
        <el-table-column
          prop="priority"
          :label="$t('appPackage.priority')"
          min-width="20%"
        />
        <el-table-column
          prop="filterType"
          :label="$t('appPackage.filterType')"
          min-width="20%"
        />
        <el-table-column
          :label="$t('common.operation')"
          min-width="20%"
        >
          <template slot-scope="scope">
            <el-button
              :id="'btn_editAppTrafficRule'+scope.$index"
              type="text"
              class="operation-btn-text"
              @click="editAppTrafficRule(scope.$index,scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              :id="'btn_delAppTrafficRule'+scope.$index"
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
        {{ $t('appPackage.dnsRule') }}
        <el-button
          id="btn_addDnsRules"
          class="common-btn inner-btn rt"
          @click="addDnsRules"
        >
          {{ $t('appPackage.addDnsRule') }}
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
          :label="$t('appPackage.dnsRuleId')"
          min-width="20%"
        />
        <el-table-column
          prop="domainName"
          :label="$t('appPackage.domainName')"
          min-width="20%"
        />
        <el-table-column
          prop="ipAddressType"
          :label="$t('appPackage.ipAddressType')"
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
              :id="'btn_editAppDnsRule'+scope.$index"
              type="text"
              class="operation-btn-text"
              @click="editAppDnsRule(scope.$index,scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              :id="'btn_delAppDnsRule'+scope.$index"
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
          id="btn_cancelApprules"
          class="common-btn"
          @click="configApplicationRules"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="btn_confirmApprules"
          class="common-btn"
          @click="configApplicationRules"
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
      :common-data-prop="commonData"
    />
    <trafficFilter
      class="traffic-filter"
      :class="{'traffic-filter-hidden':!isTrafficFilterShow,'traffic-filter-en':language==='en'}"
      @setRulesListTop="setRulesListTop"
    />
    <interfaceInformation
      class="interface-info"
      :class="{'interface-info-hidden':!isInterfaceInfoShow}"
      @setRulesListTop="setRulesListTop"
      :common-data-prop="commonData"
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
      applicationId: sessionStorage.getItem('applicationId') || 'dee8696f-c1ac-49e1-b0f7-7de1d99bcdb1',
      trafficRuleList: [
        {
          trafficRuleId: '',
          action: '',
          priority: 1,
          filterType: '',
          trafficFilter: [],
          dstInterface: []
        }
      ],
      appRulesData: {},
      commonData: {
        port: '8080',
        protocol: 'http',
        address: '127.0.0.1/0',
        ip: '127.0.0.1',
        ttl: '85000'
      },
      language: localStorage.getItem('language')
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
        priority: 1,
        action: 'FORWARD_DECAPSULATED',
        filterType: 'FLOW',
        trafficFilter: [],
        dstInterface: []
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
      this.$eg_messagebox(this.$t('promptInformation.confirmDelete'), 'warning', this.$t('common.cancel')).then(() => {
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
        ipAddress: this.commonData.ip,
        ttl: this.commonData.ttl
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
      this.$eg_messagebox(this.$t('promptInformation.confirmDelete'), 'warning', this.$t('common.cancel')).then(() => {
        applicationRules.deleteAppDnsRule(this.applicationId, row.dnsRuleId).then(() => {
          this.getAppDnsRuleList()
        }).catch(() => {
          this.$eg_messagebox(this.$t('promptInformation.deleteFailed'), 'error')
        })
      })
    },
    configApplicationRules () {
      this.$emit('closeAppRules')
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
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
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
  .traffic-filter-en{
    width: 1200px;
  }
  .interface-info{
    position: absolute;
    z-index: 1;
    width: 800px;
    padding: 40px;
    overflow: auto;
    opacity: 1;
    transition: all .2s linear;
  }
  .dns-rules{
    position: absolute;
    z-index: 1;
    width: 700px;
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
