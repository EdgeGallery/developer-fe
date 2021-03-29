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
  <div class="apply-specsetting">
    <el-row :gutter="24">
      <strong>{{ $t('workspace.deployDebugVm.selectVmSpecTip') }}</strong>
    </el-row>
    <el-row :gutter="24">
      <el-radio-group
        v-model="archType"
        size="mini"
        @change="handleChangeArch"
      >
        <el-radio-button label="X86">
          X86
        </el-radio-button>
        <el-radio-button label="ARM">
          ARM
        </el-radio-button>
      </el-radio-group>
      <el-table
        :data="vmRegulationDataList"
        border
        stripe
        max-height="320px"
        size="small"
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
          align="center"
          :label="$t('workspace.name')"
          width="150px"
          :formatter="showNameCol"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          :label="$t('workspace.deployDebugVm.scene')"
          :formatter="showSceneCol"
          show-overflow-tooltip
        />
        <el-table-column
          prop="cpu"
          align="center"
          label="CPU"
          width="60px"
          :formatter="appendCPUUnit"
          show-overflow-tooltip
        />
        <el-table-column
          prop="memory"
          align="center"
          :label="$t('workspace.deployDebugVm.memory')"
          width="70px"
          :formatter="appendSizeUnit"
          show-overflow-tooltip
        />
        <el-table-column
          prop="systemDisk"
          align="center"
          :label="$t('workspace.deployDebugVm.systemDisk')"
          width="95px"
          :formatter="appendSizeUnit"
          show-overflow-tooltip
        />
        <el-table-column
          prop="dataDisk"
          align="center"
          :label="$t('workspace.deployDebugVm.dataDisk')"
          width="80px"
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
      <strong>{{ $t('workspace.deployDebugVm.selectVmImageTip') }}</strong>
    </el-row>
    <el-row :gutter="24">
      <el-radio-group
        v-model="imageType"
        size="mini"
        @change="handleChangeImgType"
      >
        <el-radio-button label="public">
          {{ $t('workspace.deployDebugVm.publicImage') }}
        </el-radio-button>
        <el-radio-button label="private">
          {{ $t('workspace.deployDebugVm.privateImage') }}
        </el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-select
          id="elselect_osname"
          v-model="selectedOSName"
          :placeholder="$t('workspace.deployDebugVm.selectVmSystemTypeTip')"
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
          :placeholder="$t('workspace.deployDebugVm.selectVmSystemImageTip')"
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
    emitStepData (isNext) {
      let canNext = false
      if (isNext) {
        canNext = this.validateInput()
      }

      const data = {
        'archType': this.archType,
        'selectedRegulationId': this.selectedRegulationId,
        'imageType': this.imageType,
        'selectedOSName': this.selectedOSName,
        'selectedSystemId': this.selectedSystemId
      }
      this.$emit('getStepData', { step: 'specSetting', data, canNext })
    },
    validateInput () {
      if (this.selectedRegulationId === -1) {
        this.$message.warning(this.$t('workspace.deployDebugVm.vmSpecMustSelectTip'))
        return false
      }
      if (this.selectedSystemId === '') {
        this.$message.warning(this.$t('workspace.deployDebugVm.vmSystemImageMustSelectTip'))
        return false
      }
      return true
    },
    handleChangeArch () {
      this.filterVmRegulation()
      this.selectedRegulationId = -1
    },
    filterVmRegulation () {
      this.vmRegulationDataList = this.vmConfigData.vmRegulationList.filter(item => item.architecture === this.archType)
    },
    handleChangeImgType () {
      this.filterOSName()
      this.operateSystemOptionList = []
      this.selectedOSName = ''
      this.selectedSystemId = ''
    },
    filterOSName () {
      this.osNameOptionList = uniqueArray(this.vmConfigData.vmSystemList.filter(item => item.type === this.imageType)
        .map(item => item.operateSystem))
    },
    handleChangeOSName () {
      this.filterOperateSystemOption()
      this.selectedSystemId = ''
    },
    filterOperateSystemOption () {
      if (this.selectedOSName === '') {
        return
      }
      this.operateSystemOptionList = this.vmConfigData.vmSystemList.filter(item => item.type === this.imageType && item.operateSystem === this.selectedOSName)
        .map(item => {
          return {
            'systemId': item.systemId,
            'label': item.operateSystem + ' ' + item.version + ' ' + item.systemBit + '(' + item.systemDisk + 'GB)'
          }
        }
        )
    },
    showNameCol (row) {
      return this.isZh ? row.nameZh : row.nameEn
    },
    showSceneCol (row) {
      return this.isZh ? row.sceneZh : row.sceneEn
    },
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
    }
  },
  mounted () {
    this.isZh = this.$store.state.language === 'cn'
    this.filterVmRegulation()
    this.filterOSName()
    this.filterOperateSystemOption()
  }
}
</script>

<style lang="less">
.apply-specsetting{
  padding: 0% 5% 0% 5%;
  .el-row{
    padding-bottom: 5px;
  }
  .el-table{
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .el-select{
    margin-left: -10px;
  }
}
</style>
