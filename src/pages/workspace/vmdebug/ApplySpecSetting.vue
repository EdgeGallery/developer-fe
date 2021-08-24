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
  <div>
    <div class="work-div container-2">
      <div class="select-vm">
        <div class="work-title">
          {{ $t('workspace.deployDebugVm.selectVmSpecTip') }}
        </div>
        <div class="select-vm-content">
          <el-radio-group
            class="work-radio-button"
            v-model="archType"
            @change="handleChangeArch"
          >
            <el-radio-button label="X86" />
            <el-radio-button label="ARM" />
          </el-radio-group>
          <div class="work-table">
            <div class="work-table-title">
              {{ $t('workspace.deployDebugVm.vmSpec') }}
            </div>
            <el-table
              :data="vmRegulationDataList"
            >
              <el-table-column width="35px">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.regulationId"
                    v-model="selectedRegulationId"
                    class="work-radio"
                  />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('workspace.name')"
                width="150px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{ language==='cn'?scope.row.nameZh:scope.row.nameEn }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('workspace.deployDebugVm.scene')"
                width="100px"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{ language==='cn'?scope.row.sceneZh:scope.row.sceneEn }}
                </template>
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="CPU"
                width="70px"
                :formatter="appendCPUUnit"
                show-overflow-tooltip
              />
              <el-table-column
                prop="memory"
                :label="$t('workspace.deployDebugVm.memory')"
                width="80px"
                :formatter="appendSizeUnit"
                show-overflow-tooltip
              />
              <el-table-column
                prop="systemDisk"
                :label="$t('workspace.deployDebugVm.systemDisk')"
                width="105px"
                :formatter="appendSizeUnit"
                show-overflow-tooltip
              />
              <el-table-column
                prop="dataDisk"
                :label="$t('workspace.deployDebugVm.dataDisk')"
                width="90px"
                :formatter="appendSizeUnit"
                show-overflow-tooltip
              />
              <el-table-column
                prop="gpu"
                label="GPU"
                width="90px"
                show-overflow-tooltip
              />
              <el-table-column
                prop="otherAbility"
                :label="$t('workspace.deployDebugVm.otherAbility')"
                show-overflow-tooltip
              />
            </el-table>
          </div>
        </div>
      </div>
      <div class="select-mirror">
        <div class="work-title">
          {{ $t('workspace.deployDebugVm.selectVmImageTip') }}
        </div>
        <div class="select-mirror-content">
          <el-row
            :gutter="24"
            class="content-line"
          >
            <el-col :span="3">
              <el-radio
                v-model="imageType"
                label="public"
                class="work-radio"
                @change="handleChangeImgType"
              >
                <div class="work-p">
                  {{ $t('workspace.deployDebugVm.publicImage') }}
                </div>
              </el-radio>
            </el-col>
            <el-col :span="5">
              <el-select
                class="work-select"
                v-model="selectedOSName"
                :placeholder="$t('workspace.deployDebugVm.selectVmSystemTypeTip')"
                @change="handleChangeOSName"
                :disabled="imageType === 'private'"
              >
                <el-option
                  v-for="item in osNameOptionList"
                  :label="item"
                  :value="item"
                  :key="item"
                />
              </el-select>
            </el-col>
            <el-col :span="9">
              <el-select
                class="work-select"
                v-model="selectedSystemId"
                :placeholder="$t('workspace.deployDebugVm.selectVmSystemImageTip')"
                :disabled="imageType === 'private'"
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
          <el-row
            :gutter="24"
            class="content-line"
          >
            <el-col :span="3">
              <el-radio
                v-model="imageType"
                label="private"
                class="work-radio"
                @change="handleChangeImgType"
              >
                <div class="work-p">
                  {{ $t('workspace.deployDebugVm.privateImage') }}
                </div>
              </el-radio>
            </el-col>
            <el-col :span="5">
              <el-select
                class="work-select"
                v-model="selectedOSName"
                :placeholder="$t('workspace.deployDebugVm.selectVmSystemTypeTip')"
                @change="handleChangeOSName"
                :disabled="imageType === 'public'"
              >
                <el-option
                  v-for="item in osNameOptionList"
                  :label="item"
                  :value="item"
                  :key="item"
                />
              </el-select>
            </el-col>
            <el-col :span="9">
              <el-select
                class="work-select"
                v-model="selectedSystemId"
                :placeholder="$t('workspace.deployDebugVm.selectVmSystemImageTip')"
                :disabled="imageType === 'public'"
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
      </div>
    </div>
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
      language: localStorage.getItem('language'),
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
        this.$eg_messagebox({
          type: 'warning',
          title: '',
          desc: this.$t('workspace.deployDebugVm.vmSpecMustSelectTip'),
          cancelText: this.$t('common.cancelText')
        }).then(() => {}).catch(() => {})
        return false
      }
      if (this.selectedSystemId === '') {
        this.$eg_messagebox({
          type: 'warning',
          title: '',
          desc: this.$t('workspace.deployDebugVm.vmSystemImageMustSelectTip'),
          cancelText: this.$t('common.cancelText')
        }).then(() => {}).catch(() => {})
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
            'label': item.systemName + '[' + item.operateSystem + ' ' + item.version + ' ' + item.systemBit + '(' + item.systemDisk + 'GB)]'
          }
        }
        )
    },
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
    }
  },
  mounted () {
    this.filterVmRegulation()
    this.filterOSName()
    this.filterOperateSystemOption()
  }
}
</script>

<style lang="less">
.container-2 {
  padding: 46px 39px;

  .select-vm-content {
    margin-left: 53px;
    margin-top: 30px;

    .work-table {
      margin-top: 20px;
    }
  }

  .select-mirror {
    margin-top: 46px;

    .select-mirror-content {
      margin-left: 65px;
      margin-top: 30px;

      .content-line {
        margin-bottom: 10px;
      }

      .work-p {
        position: relative;
        left: 30px;
        top: -25px;
      }

      .work-select {
        position: relative;
        top: -8px;
      }
    }
  }
}
</style>
