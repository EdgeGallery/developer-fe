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
      流量过滤器
    </h3>

    <el-form
      label-width="125px"
      size="mini"
      class="common-form clear"
    >
      <el-form-item
        label="源IP地址"
      >
        <el-input
          maxlength="20"
          v-model="trafficFilter.srcAddress"
        />
        <el-tooltip
          effect="dark"
          content="多个IP请用','分隔"
          placement="right"
        >
          <span class="default_info_promt icon-pos-right">i</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        label="源端口号"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilter.srcPort"
        />
        <el-tooltip
          effect="dark"
          content="多个端口请用','分隔"
          placement="right"
        >
          <span class="default_info_promt icon-pos-right">i</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        label="目的IP地址"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilter.dstAddress"
        />
        <el-tooltip
          effect="dark"
          content="多个IP请用','分隔"
          placement="right"
        >
          <span class="default_info_promt icon-pos-right">i</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        label="目的端口号"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilter.dstPort"
        />
        <el-tooltip
          effect="dark"
          content="多个端口请用','分隔"
          placement="right"
        >
          <span class="default_info_promt icon-pos-right">i</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        label="标签"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilter.tag"
        />
      </el-form-item>
      <el-form-item
        label="协议类型"
        class="input-half lt"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilter.protocol"
        />
      </el-form-item>
      <el-form-item
        label="QCI"
        class="input-half lt"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilter.qci"
        />
      </el-form-item>
      <el-form-item
        label="DSCP"
        class="input-half lt"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilter.dscp"
        />
      </el-form-item>
      <el-form-item
        label="TC"
        class="input-half lt"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilter.tc"
        />
      </el-form-item>
      <el-form-item
        label="隧道目的地址"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilter.tgtTunnelAddress"
        />
      </el-form-item>
      <el-form-item
        label="隧道目的端口"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilter.dstTunnelPort"
        />
      </el-form-item>
      <el-form-item
        label="隧道源地址"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilter.srcTunnelAddress"
        />
      </el-form-item>
      <el-form-item
        label="隧道源端口"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilter.srcTunnelPort"
        />
      </el-form-item>
    </el-form>

    <div class="btn-container">
      <el-button
        class="common-btn"
        @click="cancelTrafficFilter"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="common-btn"
        @click="cancelTrafficFilter"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Traffic',
  data () {
    return {
      trafficFilter: {
        srcAddress: '0.0.0.0/0',
        srcPort: '8080',
        dstAddress: '0.0.0.0/0',
        dstPort: '8080',
        protocol: 'ANY',
        tag: '1234',
        qci: 1,
        dscp: 0,
        tc: 1,
        srcTunnelAddress: '0.0.0.0',
        srcTunnelPort: '8080',
        tgtTunnelAddress: '0.0.0.0',
        dstTunnelPort: '8080'
      }
    }
  },
  methods: {
    cancelTrafficFilter () {
      this.$emit('setRulesListTop', 'cancelTrafficFilter')
    }
  }
}
</script>
