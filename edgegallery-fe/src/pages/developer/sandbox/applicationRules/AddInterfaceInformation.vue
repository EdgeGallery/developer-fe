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
      接口信息
    </h3>

    <el-form
      label-width="125px"
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
          <h3 class="rules-title">
            隧道信息
          </h3>
          <el-form-item label="隧道类型">
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
          <el-form-item label="隧道源地址">
            <el-input
              v-model="interfaceInformationForm.tunnelInfo.tunnelSrcAddress"
            />
          </el-form-item>
          <el-form-item label="隧道目的地址">
            <el-input
              v-model="interfaceInformationForm.tunnelInfo.tunnelDstAddress"
            />
          </el-form-item>
          <el-form-item label="隧道指定参数">
            <el-input
              v-model="interfaceInformationForm.tunnelInfo.tunnelSpecificData"
            />
          </el-form-item>
        </div>
        <div v-if="interfaceInformationForm.interfaceType==='MAC'">
          <h3 class="rules-title">
            MAC信息
          </h3>
          <el-form-item label="源MAC地址">
            <el-input
              v-model="interfaceInformationForm.srcMacAddress"
            />
          </el-form-item>
          <el-form-item label="目的MAC地址">
            <el-input
              v-model="interfaceInformationForm.dstMacAddress"
            />
          </el-form-item>
        </div>
        <div v-if="interfaceInformationForm.interfaceType==='IP'">
          <h3 class="rules-title">
            IP信息
          </h3>
          <el-form-item label="目的IP地址">
            <el-input
              v-model="interfaceInformationForm.dstIpAddress"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div class="btn-container">
      <el-button
        class="common-btn"
        @click="finishInterfaceInformation('cancel')"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="common-btn"
        @click="finishInterfaceInformation('confirm')"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { CommonData } from '../../../../tools/commonData.js'
export default {
  name: 'InterfaceInformation',
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
      ]
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
            dstMacAddress: CommonData.ip,
            srcMacAddress: CommonData.ip,
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
            dstIpAddress: CommonData.ip,
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
  mounted () {
    this.addInterfaceInformation()
    this.editInterfaceInformation()
  }
}
</script>
