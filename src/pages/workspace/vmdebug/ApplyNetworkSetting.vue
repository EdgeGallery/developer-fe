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
  <div class="apply-networksetting">
    <el-row :gutter="24">
      <p>选择网络类型</p>
    </el-row>
    <el-row :gutter="24">
      <el-table
        :data="vmConfigData.vmNetworkList"
        border
        stripe
        size="small"
        style="width: 100%;"
      >
        <el-table-column width="35">
          <template slot-scope="scope">
            <el-checkbox
              v-model="selectedNetwork"
              :label="scope.row.networkType"
            >
              &nbsp;
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="networkType"
          align="center"
          width="150px"
          :label="$t('workspace.deployDebugVm.networkType')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="descriptionZh"
          header-align="center"
          :label="$t('workspace.description')"
          show-overflow-tooltip
          v-if="isZh"
        />
        <el-table-column
          prop="descriptionEn"
          header-align="center"
          :label="$t('workspace.description')"
          show-overflow-tooltip
          v-if="!isZh"
        />
      </el-table>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'NetworkSettingOnApplyVM',
  props: {
    vmConfigData: {
      required: true,
      type: Object
    },
    allStepData: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      isZh: true,
      selectedNetwork: this.allStepData.networkSetting ? this.allStepData.networkSetting : []
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = this.selectedNetwork
        this.$emit('getStepData', { step: 'networkSetting', data, ifNext })
      }
    }
  },
  created () { },
  mounted () {
    this.isZh = this.$store.state.language === 'cn'
  },
  beforeDestroy () {
  },
  watch: {
  }
}
</script>

<style lang="less">
.apply-networksetting{
  padding:0% 10% 0% 10%;
}
</style>
