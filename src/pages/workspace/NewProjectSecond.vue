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
  <div class="secondstep">
    <table
      class="tableCapa"
      v-loading="capabilityLoading"
    >
      <caption />
      <tr>
        <th scope="heads" />
        <th scope="heads" />
      </tr>
      <tr>
        <td>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('workspace.chooseMepC')"
            placement="top-start"
          >
            <el-button type="text">
              {{ $t('workspace.openMEPCapabilities') }}
            </el-button>
          </el-tooltip>
        </td>
        <td>
          <el-checkbox-group
            id="capabilityList"
            v-model="capability"
            @change="selectCapabilityMep"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.description"
              placement="top"
              v-for="(item,index) in capabilityList"
              :key="index"
              :id="item.name"
            >
              <el-checkbox
                :label="item.name"
              />
            </el-tooltip>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td>
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('workspace.chooseMEPeco')"
            placement="top-start"
          >
            <el-button type="text">
              {{ $t('workspace.openMEPECOCapabilities') }}
            </el-button>
          </el-tooltip>
        </td>
        <td>
          <el-checkbox-group
            id="capabilityEcoList"
            v-model="capabilityEco"
            @change="selectCapabilityMepeco"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.description"
              placement="top"
              v-for="(item,index) in capabilityEcoList"
              :key="index"
              :id="item.name"
            >
              <el-checkbox
                :label="item.name"
              />
            </el-tooltip>
          </el-checkbox-group>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { Capability, Type } from '../../tools/project_data.js'
import { Workspace } from '../../tools/api.js'
export default {
  props: {
    allStepData: {
      type: Object,
      default: () => {}
    }
  },
  name: '',
  data () {
    return {
      capability: [],
      capabilityEco: [],
      secondStepAll: {
        selectCapabilityId: [],
        capabilitySelected: []
      },
      secondStepSelect: {
        selectCapabilityId: [],
        capabilitySelected: []
      },
      capabilityList: [],
      capabilityEcoList: [],
      selectCapabilityAll: [],
      capabilityLoading: true,
      language: localStorage.getItem('language')
    }
  },
  created () {},
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getCapabilityList()
    }
  },
  mounted () {
    this.getCapabilityList()
    this.getSecondData()
  },
  methods: {
    // 退回到第二步时，保留上一次选择
    getSecondData () {
      if (this.allStepData.second) {
        this.secondStepSelect.capabilitySelected = this.allStepData.second.capabilitySelected
        this.secondStepSelect.capabilitySelected.forEach(item => {
          if (item.type === 'OPENMEP') {
            this.capability.push(item.name)
          } else if (item.type === 'OPENMEP_ECO') {
            this.capabilityEco.push(item.name)
          }
        })
      }
    },
    // 选择能力列表
    selectCapabilityMep (val) {
      this.capability = val
      this.selectCapability()
    },
    selectCapabilityMepeco (val) {
      this.capabilityEco = val
      this.selectCapability()
    },
    selectCapability () {
      this.selectCapabilityAll = Array.from(new Set([...this.capability, ...this.capabilityEco]))
      this.secondStepSelect.selectCapabilityId = []
      this.secondStepSelect.capabilitySelected = []
      this.selectCapabilityAll.forEach(item => {
        this.capabilityList.forEach(capability => {
          if (item === capability.name) {
            this.secondStepSelect.selectCapabilityId.push(capability.groupId)
            this.secondStepSelect.capabilitySelected.push(capability)
          }
        })
        this.capabilityEcoList.forEach(capabilityEco => {
          if (item === capabilityEco.name) {
            this.secondStepSelect.selectCapabilityId.push(capabilityEco.groupId)
            this.secondStepSelect.capabilitySelected.push(capabilityEco)
          }
        })
      })
    },
    // 获取能力列表
    getCapabilityList () {
      this.capabilityList = []
      this.capabilityEcoList = []
      this.getSecondData()
      Workspace.getCapabilityListApi().then(res => {
        let capabilityData = res.data
        capabilityData.forEach(item => {
          this.secondStepAll.selectCapabilityId.push(item.groupId)
          this.secondStepAll.capabilitySelected.push(item)
          if (item.type === 'OPENMEP') {
            this.capabilityList.push(item)
          } else if (item.type === 'OPENMEP_ECO') {
            this.capabilityEcoList.push(item)
          }
        })
        this.checkProjectData(this.capabilityList)
        this.checkProjectData(this.capabilityEcoList)
        this.capabilityLoading = false
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.capabilityLoading = false
        }, 2000)
      })
    },
    // 平台能力和开放能力中英文切换
    checkProjectData (checkArr) {
      checkArr.forEach(itemBe => {
        Capability.forEach(itemFe => {
          if (itemBe.name === itemFe.label[1] && this.language === 'cn') {
            itemBe.name = itemFe.label[0]
          } else if (itemBe.name === itemFe.label[1] && this.language === 'en') {
            itemBe.name = itemFe.label[1]
          }
        })
        Type.forEach(itemFe => {
          if (itemBe.name === itemFe.label[1] && this.language === 'cn') {
            itemBe.name = itemFe.label[0]
          } else if (itemBe.name === itemFe.label[1] && this.language === 'en') {
            itemBe.name = itemFe.label[1]
          }
        })
      })
    },
    // 将选择的能力传值给父组件
    emitStepData () {
      this.$emit('getStepData', { data: this.secondStepSelect, step: 'second' })
    }
  }
}
</script>

<style lang="less">
.secondstep {
  margin-top: 20px;
  .tableCapa{
    width: 100%;
    th{
      display: none;
    }
  }
  .tableCapa,
  td {
    border: 1px solid #ddd;
    border-collapse: collapse;
    padding: 30px 10px;
    .el-button {
      margin: 0 20px;
      padding: 0;
    }
    .el-checkbox {
      margin: 10px 30px 10px 0;
      .el-button {
        border: none;
        margin: 0;
      }
      .el-button:focus,
      .el-button:hover {
        background-color: #fff;
        color: #606266;
      }
      .el-button:after {
        content: "?";
        width: 14px;
        height: 14px;
        line-height: 14px;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        background: #b8becc;
        display: inline-block;
        margin-left: 4px;
      }
    }
  }
  .tableCapa td:first-child {
    width: 210px;
    text-align: right;
    button:before {
      content: "?";
      width: 14px;
      height: 14px;
      line-height: 14px;
      border-radius: 50%;
      color: #fff;
      font-size: 12px;
      background: #6b92fa;
      display: inline-block;
      margin-right: 4px;
    }
  }
  .el-button--text {
    color: #606266;
  }
}
</style>
