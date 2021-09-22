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
  <div class="vm-res">
    <el-steps
      class="work-steps"
      :active="active"
      finish-status="success"
      space="90px"
    >
      <el-step
        v-for="(item, index) in stepNumber"
        :key="index"
      />
    </el-steps>
    <div class="container">
      <component
        :is="currentComponent"
        :active="active"
        :all-step-data="allStepData"
        :vm-config-data="vmConfigData"
        @getStepData="getStepData"
        @getBtnStatus="getBtnStatus"
        ref="currComponent"
      />
    </div>
    <div
      slot="footer"
      class="vms-button-wrapper"
    >
      <el-button
        class="work-button"
        @click="handleClickPreviousBtn"
        v-if="active > 0"
      >
        {{ $t('workspace.previous') }}
      </el-button>
      <el-button
        class="work-button"
        @click="handleClickNextBtn"
        v-if="active < 3"
      >
        {{ $t('workspace.next') }}
      </el-button>
      <el-button
        class="work-button"
        @click="handleClickConfirmBtn"
        v-if="active >= 3"
      >
        {{ $t('workspace.deployDebugVm.generatePackage') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
import BasicInfoOnApplyVM from './ApplyBasicInfo.vue'
import SpecSettingOnApplyVM from './ApplySpecSetting.vue'
import NetworkSettingOnApplyVM from './ApplyNetworkSetting.vue'
import OtherSetting from './OtherSetting.vue'
import VmDetailPanel from './VmDetailPanel.vue'

export default {
  name: 'ApplyVMRes',
  components: {
    BasicInfoOnApplyVM,
    SpecSettingOnApplyVM,
    NetworkSettingOnApplyVM,
    OtherSetting,
    VmDetailPanel
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    projectId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      dialogVisible: this.value,
      active: 0,
      currentComponent: 'BasicInfoOnApplyVM',
      vmConfigData: {},
      allStepData: {},
      stepNumber: 4
    }
  },
  methods: {
    getVmConfigData () {
      vmService.getVmConfigData().then(res => {
        this.vmConfigData = res.data
      }).catch(() => {
        this.$eg_messagebox(this.$t('workspace.deployDebugVm.loadVmConfigFailed'), 'error')
      })
    },
    changeComponent () {
      switch (this.active) {
        case 0: {
          this.currentComponent = 'BasicInfoOnApplyVM'
          break
        }
        case 1: {
          this.currentComponent = 'SpecSettingOnApplyVM'
          break
        }
        case 2: {
          this.currentComponent = 'NetworkSettingOnApplyVM'
          break
        }
        case 3: {
          this.currentComponent = 'OtherSetting'
          break
        }
        default: {
          this.currentComponent = 'BasicInfoOnApplyVM'
        }
      }
    },
    getStepData (data) {
      this.allStepData[data.step] = data.data
      this.allStepData.canNext = data.canNext
    },
    getBtnStatus (status) {
      this.isDeploying = status.status
    },
    handleClickNextBtn () {
      this.$refs.currComponent.emitStepData(true)
      if (this.allStepData.canNext) {
        if (this.active < 4) {
          this.active++
          this.handleStep()
        }
      }
    },
    handleClickPreviousBtn () {
      this.$refs.currComponent.emitStepData(false)
      this.active--
      this.handleStep()
    },
    handleStep () {
      this.changeComponent()
      this.allStepData.canNext = false
    },
    handleClickConfirmBtn () {
      this.$refs.currComponent.emitStepData(true)
      if (!this.allStepData.canNext) {
        return
      }

      vmService.applyVmResource(this.projectId, this.userId, this.getApplyData()).then(res => {
        this.$emit('handleApplySuccess')
      }).catch(() => {
        this.$eg_messagebox(this.$t('workspace.deployDebugVm.applyVmResFailed'), 'error')
      })
    },
    getApplyData () {
      let _applyData = {
        'vmName': this.allStepData.basicSetting.vmName
      }
      _applyData.vmRegulation = this.vmConfigData.vmRegulationList.find(item => item.regulationId === this.allStepData.specSetting.selectedRegulationId)
      _applyData.vmSystem = this.vmConfigData.vmSystemList.find(item => item.systemId === this.allStepData.specSetting.selectedSystemId)
      _applyData.vmNetwork = this.allStepData.networkSetting
      _applyData.ak = this.allStepData.otherSetting.ak
      _applyData.sk = this.allStepData.otherSetting.sk
      let userData = {}
      userData.operateSystem = _applyData.vmSystem.operateSystem
      userData.flavorExtraSpecs = this.allStepData.otherSetting.flavorExtraSpecs
      userData.contents = this.allStepData.otherSetting.contents
      userData.params = this.allStepData.otherSetting.params
      userData.temp = this.allStepData.otherSetting.temp
      _applyData.vmUserData = userData
      return _applyData
    }
  },
  mounted () {
    this.active = 0
    this.changeComponent()
    this.getVmConfigData()
  }
}

</script>
<style lang="less">
.vms-button-wrapper{
  position: relative;
  margin-bottom: 50px;
  bottom: -50px;
  float: right;
}

.vm-res .work-div {
  margin-top: 45px;
  width: 100%;
  min-height: 400px;
}
</style>
