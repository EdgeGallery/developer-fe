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
  <div class="application-rules padding_default">
    <div class="rules-config common-div-bg">
      <h3 class="rules-title">
        应用规则配置
      </h3>
      <h4 class="rules-title-sub clear">
        流量规则
        <el-button
          class="common-btn rt"
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

      <h4 class="rules-title-sub clear">
        DNS规则
        <el-button class="common-btn rt">
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

      <div class="btn-container">
        <el-button class="common-btn">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button class="common-btn">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </div>

    <trafficRules
      class="traffic-rules"
      @setRulesListTop="setRulesListTop"
    />
  </div>
</template>

<script>
import trafficRules from './trafficRules.vue'
export default {
  name: 'ApplicationRules',
  components: {
    trafficRules
  },
  data () {
    return {
      trafficListData: [
        {
          action: 'PASSTHROUGH',
          filterType: 'FLOW',
          priority: '1',
          trafficRuleId: 'tr1'
        }
      ],
      dnsListData: [
        {
          dnsRuleId: 'dd1',
          domainName: 'domainName',
          ipAddressType: 'IP_V4',
          ttl: '85000'
        }
      ],
      screenHeight: document.body.clientHeight,
      timer: false
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
  methods: {
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let oDiv = document.getElementsByClassName('application-rules')[0]
        if (oDiv) {
          oDiv.style.height = (Number(screenHeight) - 80) + 'px'
        }
      })
    },
    setRulesListTop () {
      let oDiv = document.getElementsByClassName('rules-config')[0]
      if (oDiv) {
        oDiv.style.marginTop = 110 + 'px'
        oDiv.style.opacity = 1
      }
    },
    getRulesListHeight () {
      let oDiv = document.getElementsByClassName('rules-config')[0]
      let listHeight = 0
      if (oDiv) {
        listHeight = oDiv.offsetHeight
      }
      return listHeight
    },
    addTrafficRules () {
      let rulesListTop = this.getRulesListHeight() + 110
      let oDiv = document.getElementsByClassName('rules-config')[0]
      if (oDiv) {
        oDiv.style.marginTop = -rulesListTop + 'px'
        oDiv.style.opacity = 0
      }
      let oDivTraffic = document.getElementsByClassName('traffic-rules')[0]
      if (oDivTraffic) {
        oDivTraffic.style.marginTop = 170 + 'px'
        oDivTraffic.style.opacity = 1
      }
    }
  },
  mounted () {
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
  overflow: hidden;
  .rules-config{
    transition: all .4s;
    margin-top: 110px;
    .el-table{
      width: calc(100% - 35px);
      margin-left: 35px;
    }
  }
  .traffic-rules{
    max-height: 95%;
    overflow: auto;
    opacity: 0;
    transition: all .4s linear;
  }
}
@media screen and (max-width:1600px){
  .application-rules{
    padding: 0 10%;
  }
}
</style>
