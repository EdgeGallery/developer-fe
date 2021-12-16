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
    <h3 class="common-dlg-title">
      {{ $t('rulesConfig.interfaceInfo') }}
    </h3>

    <el-form
      id="form_interfaceInformation"
      :label-width="language==='cn'?formLabelWidth:formLabelWidthEn"
      size="mini"
      class="common-form form-one-column"
      :model="interfaceInformationForm"
    >
      <el-form-item
        label="interfaceType"
      >
        <el-select
          v-model="interfaceInformationForm.interfaceType"
          @change="selectInterfaceType"
        >
          <el-option
            v-for="item in interfaceType"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="interfaceSubFormitem">
        <div v-if="interfaceInformationForm.interfaceType==='TUNNEL'">
          <h3 class="common-dlg-title">
            {{ $t('rulesConfig.tunnelInfo') }}
          </h3>
          <el-form-item :label="$t('rulesConfig.tunnelType')">
            <el-select
              v-model="interfaceInformationForm.tunnelInfo.tunnelType"
            >
              <el-option
                v-for="item in tunnelType"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('rulesConfig.srcTunnelAddress')">
            <el-input
              v-model="interfaceInformationForm.tunnelInfo.tunnelSrcAddress"
            />
          </el-form-item>
          <el-form-item :label="$t('rulesConfig.tgtTunnelAddress')">
            <el-input
              v-model="interfaceInformationForm.tunnelInfo.tunnelDstAddress"
            />
          </el-form-item>
          <el-form-item :label="$t('rulesConfig.tunnelParams')">
            <el-input
              v-model="interfaceInformationForm.tunnelInfo.tunnelSpecificData"
            />
          </el-form-item>
        </div>
        <div v-if="interfaceInformationForm.interfaceType==='MAC'">
          <h3 class="common-dlg-title">
            {{ $t('rulesConfig.macInfo') }}
          </h3>
          <el-form-item :label="$t('rulesConfig.sourceMacAddress')">
            <el-input
              v-model="interfaceInformationForm.srcMacAddress"
            />
          </el-form-item>
          <el-form-item :label="$t('rulesConfig.macAddress')">
            <el-input
              v-model="interfaceInformationForm.dstMacAddress"
            />
          </el-form-item>
        </div>
        <div v-if="interfaceInformationForm.interfaceType==='IP'">
          <h3 class="common-dlg-title">
            {{ $t('rulesConfig.IpInfo') }}
          </h3>
          <el-form-item :label="$t('rulesConfig.dstAddress')">
            <el-input
              v-model="interfaceInformationForm.dstIpAddress"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div class="btn-container">
      <el-button
        id="btn_cancelInterfaceInformation"
        class="common-btn"
        @click="finishInterfaceInformation('cancel')"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="btn_confirmInterfaceInformation"
        class="common-btn"
        @click="finishInterfaceInformation('confirm')"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceInformation',
  props: {
    commonDataProp: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      interfaceInformationForm: {},
      interfaceType: [
        { value: 'TUNNEL' },
        { value: 'MAC' },
        { value: 'IP' }
      ],
      tunnelType: [
        { value: 'GTP-U' },
        { value: 'GRE' }
      ],
      commonData: this.commonDataProp,
      language: localStorage.getItem('language'),
      formLabelWidth: '150px',
      formLabelWidthEn: '270px'
    }
  },
  methods: {
    // send InterfaceInformation Data to TrafficRules page
    finishInterfaceInformation (type) {
      let _data = {}
      if (type === 'confirm') {
        _data = this.interfaceInformationForm
      }
      this.bus.$emit('finishInterfaceInformation', _data)
      this.$emit('setRulesListTop', 'finishInterfaceInformation')
    },
    // get InterfaceInformation Data from TrafficRules page when add
    addInterfaceInformation () {
      let _this = this
      this.bus.$on('addInterfaceInformation', function (data) {
        _this.interfaceInformationForm = data
      })
    },
    // get InterfaceInformation Data from TrafficRules page when edit
    editInterfaceInformation () {
      let _this = this
      this.bus.$on('editInterfaceInformation', function (data) {
        _this.interfaceInformationForm = data
      })
    },
    selectInterfaceType (val) {
      switch (val) {
        case 'TUNNEL': {
          this.interfaceInformationForm = {
            interfaceType: 'TUNNEL',
            dstMacAddress: '',
            srcMacAddress: '',
            dstIpAddress: '',
            tunnelInfo: {
              tunnelType: 'GTP-U',
              tunnelDstAddress: '0',
              tunnelSpecificData: '0',
              tunnelSrcAddress: '0'
            }
          }
          break
        }
        case 'MAC': {
          this.interfaceInformationForm = {
            interfaceType: 'MAC',
            dstMacAddress: this.commonData.ip,
            srcMacAddress: this.commonData.ip,
            dstIpAddress: '',
            tunnelInfo: {
              tunnelType: '',
              tunnelDstAddress: '',
              tunnelSpecificData: '',
              tunnelSrcAddress: ''
            }
          }
          break
        }
        case 'IP': {
          this.interfaceInformationForm = {
            interfaceType: 'IP',
            dstMacAddress: '',
            srcMacAddress: '',
            dstIpAddress: this.commonData.ip,
            tunnelInfo: {
              tunnelType: '',
              tunnelDstAddress: '',
              tunnelSpecificData: '',
              tunnelSrcAddress: ''
            }
          }
          break
        }
        default: {
          this.interfaceInformationForm = {
            interfaceType: 'TUNNEL',
            dstMacAddress: '',
            srcMacAddress: '',
            dstIpAddress: '',
            tunnelInfo: {
              tunnelType: 'GTP-U',
              tunnelDstAddress: '0',
              tunnelSpecificData: '0',
              tunnelSrcAddress: '0'
            }
          }
        }
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.addInterfaceInformation()
    this.editInterfaceInformation()
  }
}
</script>
