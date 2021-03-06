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
  <div class="vm_res">
    <el-steps
      :active="active"
      finish-status="success"
      align-center
    >
      <el-step :title="$t('workspace.basicInformation')" />
      <el-step :title="$t('workspace.deployDebugVm.configSpec')" />
      <el-step :title="$t('workspace.deployDebugVm.configNetwork')" />
      <el-step :title="$t('workspace.deployDebugVm.otherSetting')" />
    </el-steps>
    <div>
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
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        id="prevBtn"
        type="text"
        @click="previous"
        v-if="active>0"
      >
        <strong>{{ $t('workspace.previous') }}</strong>
      </el-button>
      <el-button
        id="nextBtn"
        type="primary"
        @click="next"
        v-if="active<3"
      >
        <strong>{{ $t('workspace.next') }}</strong>
      </el-button>
      <el-button
        id="confirmBtn"
        type="primary"
        @click="confirm"
        v-if="active>=3"
      >
        <strong>{{ $t('common.save') }}</strong>
      </el-button>
    </span>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
import BasicInfoOnApplyVM from './ApplyBasicInfo.vue'
import SpecSettingOnApplyVM from './ApplySpecSetting.vue'
import NetworkSettingOnApplyVM from './ApplyNetworkSetting.vue'
import OtherSetting from './OtherSetting.vue'

export default {
  name: 'ApplyVMRes',
  components: {
    BasicInfoOnApplyVM, SpecSettingOnApplyVM, NetworkSettingOnApplyVM, OtherSetting
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

      allStepData: {}
    }
  },
  methods: {
    getVmConfigData () {
      vmService.getVmConfigData().then(res => {
        this.vmConfigData = res.data
      }).catch(() => {
        this.$message.error(this.$t('workspace.deployDebugVm.loadVmConfigFailed'))
      })
    },
    handleClose () {
      this.$emit('input', false)
      this.$emit('closeLoading', false)
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
    next () {
      this.$refs.currComponent.emitStepData(true)
      if (this.allStepData.canNext) {
        if (this.active < 4) {
          this.active++
          this.handleStep()
        }
      }
    },
    previous () {
      this.$refs.currComponent.emitStepData(false)
      this.active--
      this.handleStep()
    },
    handleStep () {
      this.changeComponent()
      this.allStepData.canNext = false
    },
    confirm () {
      this.$refs.currComponent.emitStepData(true)
      if (!this.allStepData.canNext) {
        return
      }

      vmService.applyVmResource(this.projectId, this.userId, this.getApplyData()).then(res => {
        this.$message(this.$t('workspace.deployDebugVm.applyVmResStart'))
        this.$emit('handleApplySuccess')
      }).catch(() => {
        this.$message.error(this.$t('workspace.deployDebugVm.applyVmResFailed'))
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
.vm_res{
  .dialog-footer{
    margin:20px 5% 0
  }
}
</style>
