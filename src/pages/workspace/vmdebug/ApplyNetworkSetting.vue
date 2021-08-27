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
  <div class="apply-networksetting work-div container-3">
    <div class="work-title">
      {{ $t('workspace.deployDebugVm.selectNetworkTypeTip') }}
    </div>
    <div class="select-network">
      <div class="work-table">
        <div class="work-table-title">
          {{ $t('workspace.deployDebugVm.networkType') }}
        </div>
        <el-table
          :data="vmConfigData.vmNetworkList"
        >
          <el-table-column width="35">
            <template slot-scope="scope">
              <el-checkbox
                class="work-checkbox"
                v-model="selectedNetwork"
                :label="scope.row.networkType"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="networkType"
            width="200px"
            :label="$t('workspace.deployDebugVm.type')"
            show-overflow-tooltip
          />
          <el-table-column
            :label="$t('workspace.description')"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ language==='cn'?scope.row.descriptionZh:scope.row.descriptionEn }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
      language: localStorage.getItem('language'),
      defaultSelectType: [],
      selectedNetwork: []
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    emitStepData (isNext) {
      let canNext = false
      if (isNext) {
        canNext = this.validateInput()
      }

      const data = this.selectedNetwork
      this.$emit('getStepData', { step: 'networkSetting', data, canNext })
    },
    validateInput () {
      if (!this.selectedNetwork || !this.selectedNetwork.length) {
        this.$eg_messagebox(this.$t('workspace.deployDebugVm.vmNetworkTypeMustSelectTip'), 'warning')
        return false
      }
      return true
    }
  },
  mounted () {
    this.vmConfigData.vmNetworkList.forEach((item) => {
      this.defaultSelectType.push(item.networkType)
    })
    this.selectedNetwork = this.allStepData.networkSetting ? this.allStepData.networkSetting : this.defaultSelectType
  }
}
</script>

<style lang="less">
.container-3 {
  padding: 46px 39px;

  .select-network {
    margin-left: 53px;
    margin-top: 30px;

    .work-table {
      margin-top: 20px;
    }
  }
}
</style>
