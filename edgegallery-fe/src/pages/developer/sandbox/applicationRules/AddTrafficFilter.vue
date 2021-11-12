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
      id="form_trafficFilter"
      label-width="125px"
      size="mini"
      class="common-form clear"
      :model="trafficFilterForm"
    >
      <el-form-item
        label="源IP地址"
      >
        <el-input
          maxlength="20"
          v-model="trafficFilterForm.srcAddress"
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
          v-model="trafficFilterForm.srcPort"
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
          v-model="trafficFilterForm.dstAddress"
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
          v-model="trafficFilterForm.dstPort"
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
          v-model="trafficFilterForm.tag"
        />
      </el-form-item>
      <el-form-item
        label="协议类型"
        class="input-half lt"
      >
        <el-input
          maxlength="30"
          v-model="trafficFilterForm.protocol"
        />
      </el-form-item>
      <el-form-item
        label="qCI"
        class="input-half lt"
      >
        <el-input-number
          v-model="trafficFilterForm.qCI"
          :min="0"
        />
      </el-form-item>
      <el-form-item
        label="dSCP"
        class="input-half lt"
      >
        <el-input-number
          v-model="trafficFilterForm.dSCP"
          :min="0"
        />
      </el-form-item>
      <el-form-item
        label="tC"
        class="input-half lt"
      >
        <el-input-number
          v-model="trafficFilterForm.tC"
          :min="0"
        />
      </el-form-item>
      <el-form-item
        label="隧道目的地址"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilterForm.tgtTunnelAddress"
        />
      </el-form-item>
      <el-form-item
        label="隧道目的端口"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilterForm.dstTunnelPort"
        />
      </el-form-item>
      <el-form-item
        label="隧道源地址"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilterForm.srcTunnelAddress"
        />
      </el-form-item>
      <el-form-item
        label="隧道源端口"
        class="input-half lt"
      >
        <el-input
          v-model="trafficFilterForm.srcTunnelPort"
        />
      </el-form-item>
    </el-form>

    <div class="btn-container">
      <el-button
        id="btn_cancelTrafficFilter"
        class="common-btn"
        @click="finishTrafficFilter('cancel')"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="btn_confirmTrafficFilter"
        class="common-btn"
        @click="finishTrafficFilter('confirm')"
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
      trafficFilterForm: {}
    }
  },
  methods: {
    // send TrafficFilter Data to TrafficRules page
    finishTrafficFilter (type) {
      let _data = {}
      if (type === 'confirm') {
        _data = this.trafficFilterForm
      }
      this.bus.$emit('finishTrafficFilter', _data)
      this.$emit('setRulesListTop', 'finishTrafficFilter')
    },
    // get TrafficFilter Data from TrafficRules page when add
    addTrafficFilter () {
      let _this = this
      this.bus.$on('addTrafficFilter', function (data) {
        _this.trafficFilterForm = data
      })
    },
    // get TrafficFilter Data from TrafficRules page when edit
    editTrafficFilter () {
      let _this = this
      this.bus.$on('editTrafficFilter', function (data) {
        _this.trafficFilterForm = data
      })
    }
  },
  mounted () {
    this.addTrafficFilter()
    this.editTrafficFilter()
  }
}
</script>
