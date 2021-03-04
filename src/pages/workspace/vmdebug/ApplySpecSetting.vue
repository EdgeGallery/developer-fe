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
  <div class="apply-specsetting">
    <el-row :gutter="24">
      <p>选择虚拟机规格</p>
    </el-row>
    <el-row :gutter="24">
      <el-tabs
        v-model="archType"
        type="card"
        @tab-click="handleChangeArchTab"
      >
        <el-tab-pane
          label="X86"
          name="X86"
        />
        <el-tab-pane
          label="ARM"
          name="ARM"
        />
      </el-tabs>
      <el-table
        :data="vmRegulationDataList"
        border
        stripe
        size="small"
        style="width: 100%;"
      >
        <el-table-column width="35">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.regulationId"
              v-model="selectedRegulationId"
            >
              &nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="sceneZh"
          align="center"
          :label="$t('workspace.deployDebugVm.scene')"
          show-overflow-tooltip
          v-if="isZh"
        />
        <el-table-column
          prop="sceneEn"
          align="center"
          :label="$t('workspace.deployDebugVm.scene')"
          show-overflow-tooltip
          v-if="!isZh"
        />
        <el-table-column
          prop="nameZh"
          align="center"
          :label="$t('workspace.name')"
          show-overflow-tooltip
          v-if="isZh"
        />
        <el-table-column
          prop="nameEn"
          align="center"
          :label="$t('workspace.name')"
          show-overflow-tooltip
          v-if="!isZh"
        />
        <el-table-column
          prop="cpu"
          align="center"
          label="CPU"
          :formatter="appendCPUUnit"
          show-overflow-tooltip
        />
        <el-table-column
          prop="memory"
          align="center"
          :label="$t('workspace.deployDebugVm.memory')"
          :formatter="appendSizeUnit"
          show-overflow-tooltip
        />
        <el-table-column
          prop="systemDisk"
          align="center"
          :label="$t('workspace.deployDebugVm.systemDisk')"
          :formatter="appendSizeUnit"
          show-overflow-tooltip
        />
        <el-table-column
          prop="dataDisk"
          align="center"
          :label="$t('workspace.deployDebugVm.dataDisk')"
          :formatter="appendSizeUnit"
          show-overflow-tooltip
        />
        <el-table-column
          prop="gpu"
          align="center"
          label="GPU"
          show-overflow-tooltip
        />
        <el-table-column
          prop="otherAbility"
          align="center"
          :label="$t('workspace.deployDebugVm.otherAbility')"
          show-overflow-tooltip
        />
      </el-table>
    </el-row>
    <el-row :gutter="24">
      <p>选择镜像</p>
    </el-row>
    <el-row :gutter="24">
      <el-radio-group
        v-model="imageType"
        size="mini"
        @change="handleChangeImgType"
      >
        <el-radio-button label="public">
          公共镜像
        </el-radio-button>
        <el-radio-button label="private">
          私有镜像
        </el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-select
          id="elselect_osname"
          v-model="selectedOSName"
          placeholder="请选择系统类型"
          size="small"
          style="width:95%"
          @change="handleChangeOSName"
        >
          <el-option
            v-for="item in osNameOptionList"
            :label="item"
            :value="item"
            :key="item"
          />
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-select
          id="elselect_ossystem"
          v-model="selectedSystemId"
          placeholder="请选择镜像"
          size="small"
          style="width:95%"
        >
          <el-option
            v-for="item in operateSystemOptionList"
            :label="item.label"
            :value="item.systemId"
            :key="item.systemId"
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { uniqueArray } from '../../../tools/tool.js'

export default {
  name: 'SpecSettingOnApplyVM',
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

      archType: this.allStepData.specSetting ? this.allStepData.specSetting.archType : 'X86',
      vmRegulationDataList: [],
      selectedRegulationId: this.allStepData.specSetting ? this.allStepData.specSetting.selectedRegulationId : -1,

      imageType: this.allStepData.specSetting ? this.allStepData.specSetting.imageType : 'public',
      osNameOptionList: ['', ''],
      selectedOSName: this.allStepData.specSetting ? this.allStepData.specSetting.selectedOSName : '',
      operateSystemOptionList: [],
      selectedSystemId: this.allStepData.specSetting ? this.allStepData.specSetting.selectedSystemId : ''
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = {
          'archType': this.archType,
          'selectedRegulationId': this.selectedRegulationId,
          'imageType': this.imageType,
          'selectedOSName': this.selectedOSName,
          'selectedSystemId': this.selectedSystemId
        }
        this.$emit('getStepData', { step: 'specSetting', data, ifNext })
      }
    },
    handleChangeArchTab () {
      this.filterVmRegulation()
      this.selectedRegulationId = -1
    },
    filterVmRegulation () {
      this.vmRegulationDataList = this.vmConfigData.vmRegulationList.filter(item => item.architecture === this.archType)
    },
    handleChangeImgType () {
      this.filterOSName()
      this.selectedOSName = ''
      this.selectedSystemId = ''
    },
    filterOSName () {
      this.osNameOptionList = uniqueArray(this.vmConfigData.vmSystemList.filter(item => item.type === this.imageType)
        .map(item => item.operateSystem))
    },
    handleChangeOSName () {
      this.operateSystemOptionList = this.vmConfigData.vmSystemList.filter(item => item.type === this.imageType && item.operateSystem === this.selectedOSName)
        .map(item => {
          return {
            'systemId': item.systemId,
            'label': item.operateSystem + ' ' + item.version + ' ' + item.systemBit + '(' + item.systemDisk + 'GB)'
          }
        }
        )
      this.selectedSystemId = ''
    },
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
    }
  },
  created () { },
  mounted () {
    this.isZh = this.$store.state.language === 'cn'
    this.filterVmRegulation()
    this.filterOSName()
  },
  beforeDestroy () {
  },
  watch: {
  }
}
</script>

<style lang="less">
.apply-specsetting{
  padding:0% 10% 0% 10%;
}
</style>
