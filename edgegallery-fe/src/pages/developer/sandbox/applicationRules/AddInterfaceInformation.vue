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
              v-model="interfaceInformationForm.srcMACAddress"
            />
          </el-form-item>
          <el-form-item label="目的MAC地址">
            <el-input
              v-model="interfaceInformationForm.dstMACAddress"
            />
          </el-form-item>
        </div>
        <div v-if="interfaceInformationForm.interfaceType==='IP'">
          <h3 class="rules-title">
            IP信息
          </h3>
          <el-form-item label="目的IP地址">
            <el-input
              v-model="interfaceInformationForm.dstIPAddress"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>

    <div class="btn-container">
      <el-button
        class="common-btn"
        @click="cancelInterfaceInfo"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="common-btn"
        @click="cancelInterfaceInfo"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterfaceInformation',
  data () {
    return {
      interfaceInformationForm: {
        interfaceType: 'TUNNEL',
        srcMACAddress: '',
        dstMACAddress: '',
        dstIPAddress: '',
        tunnelInfo: {
          tunnelType: 'GTP-U',
          tunnelDstAddress: '',
          tunnelsrcAddress: '',
          tunnelSpecificData: ''
        }
      },
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
    cancelInterfaceInfo () {
      this.$emit('setRulesListTop', 'cancelInterfaceInfo')
    }
  }
}
</script>
