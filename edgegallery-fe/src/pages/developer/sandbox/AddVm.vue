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
  <div class="addVm">
    <img
      src="../../../assets/images/sandbox/question.png"
      alt=""
      class="question hoverHands"
    >
    <div class="common-div-bg addVm-bg">
      <div class="vm-info">
        <div class="addVm-top-title">
          <p class="defaultFontLight">
            <span>*</span>虚拟机名称
          </p>
          <el-input
            class="common-input"
            v-model="vmInfo.vmName"
            placeholder="请输入内容"
          />
        </div>
        <div class="addVm-top-title defaultFontLight">
          <p>用户名</p>
          <el-input
            class="common-input"
            v-model="vmInfo.vmUsername"
            placeholder="请输入内容"
          />
        </div>
        <div class="addVm-top-title defaultFontLight">
          <p>密码</p>
          <el-input
            class="common-input"
            v-model="vmInfo.vmPassword"
            placeholder="请输入内容"
          />
        </div>
      </div>
      <div class="simulator-info">
        <div class="simulator-info-title">
          <p>
            <span />
            选择模拟机规格
          </p>
        </div>
        <div class="simulator-info-content">
          <div class="defaultFontLight">
            <el-radio-group
              v-model="vmInfo.archType"
              @change="handleChangeArch"
            >
              <el-radio-button label="X86" />
              <el-radio-button label="ARM" />
            </el-radio-group>
            <p class="vm-size defaultFontLight">
              虚拟机规格
            </p>
            <el-table
              :data="vmInfo.vmRegulationList"
              class="common-table vm-table"
            >
              <el-table-column width="35px">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.regulationId"
                    v-model="vmInfo.selectedRegulationId"
                    class="work-radio"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="140"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{ language==='cn'?scope.row.nameZh:scope.row.nameEn }}
                </template>
              </el-table-column>
              <el-table-column
                prop="sence"
                label="使用场景"
                width="110"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{ language==='cn'?scope.row.sceneZh:scope.row.sceneEn }}
                </template>
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="CPU"
                width="110"
                show-overflow-tooltip
                :formatter="appendCPUUnit"
              />
              <el-table-column
                prop="memory"
                label="内存"
                width="110"
                show-overflow-tooltip
                :formatter="appendSizeUnit"
              />
              <el-table-column
                prop="systemDisk"
                label="系统盘"
                width="110"
                show-overflow-tooltip
                :formatter="appendSizeUnit"
              />
              <el-table-column
                prop="dataDisk"
                label="数据盘"
                width="100"
                show-overflow-tooltip
                :formatter="appendSizeUnit"
              />
              <el-table-column
                prop="otherAbility"
                label="其他能力"
                width="100"
                show-overflow-tooltip
              />
            </el-table>
          </div>
        </div>
      </div>
      <div class="simulator-info config-port">
        <div class="simulator-info-title">
          <p>
            <span />
            配置网络端口
          </p>
        </div>
        <div class="simulator-info-content">
          <el-table
            class="common-table more-rows-table network-table vm-table"
            :data="vmNetworkList"
          >
            <el-table-column width="35">
              <template slot-scope="scope">
                <el-checkbox
                  v-model="selectedNetworks"
                  :label="scope.row.name"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              width="200px"
              label="名称"
              show-overflow-tooltip
            />
            <el-table-column
              label="描述"
            >
              <template slot-scope="scope">
                {{ scope.row.description }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="simulator-info selectImage-info">
        <div class="simulator-info-title">
          <p>
            <span />
            选择镜像
          </p>
        </div>
        <div class="selectImage-content">
          <div class="selectImage-public defaultFontLight">
            <el-radio
              v-model="vmInfo.imageType"
              label="public"
              @change="handleChangeImgType()"
            >
              公有镜像
            </el-radio>
            <el-select
              v-model="vmInfo.selectedData.public.selectedOSName"
              placeholder="请选择"
              @change="handleChangeOSName"
              :disabled="vmInfo.imageType === 'private'"
            >
              <el-option
                v-for="(item,index) in vmInfo.osNameOptionList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-select
              v-model="vmInfo.selectedData.public.selectedSystemId"
              placeholder="请选择"
              :disabled="vmInfo.imageType === 'private'"
            >
              <el-option
                v-for="(item,index) in vmInfo.operateSystemOptionList"
                :key="index"
                :label="item.systemId"
                :value="item.systemId"
              />
            </el-select>
          </div>
          <div class="selectImage-public defaultFontLight">
            <el-radio
              v-model="vmInfo.imageType"
              label="private"
              @change="handleChangeImgType()"
            >
              私有镜像
            </el-radio>
            <el-select
              v-model="vmInfo.selectedData.private.selectedOSName"
              @change="handleChangeOSName"
              placeholder="请选择"
              :disabled="vmInfo.imageType === 'public'"
            >
              <el-option
                v-for="(item,index) in vmInfo.osNameOptionList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-select
              v-model="vmInfo.selectedData.private.selectedSystemId"
              placeholder="请选择"
              :disabled="vmInfo.imageType === 'public'"
            >
              <el-option
                v-for="(item,index) in vmInfo.operateSystemOptionList"
                :key="index"
                :label="item.systemId"
                :value="item.systemId"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="addVm-btn rt">
        <el-button
          class="common-btn"
          @click="addVmFinish('cancel')"
        >
          {{ $t('normal.cancel') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="addVmFinish('confirm')"
        >
          {{ $t('normal.confirm') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { uniqueArray } from '../../../tools/common.js'
export default {
  name: 'AddVm',
  props: {
    netWorkListProp: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      vmInfo: {
        vmName: '',
        vmUsername: '',
        vmPassword: '',
        archType: 'X86',
        selectedRegulationId: '',
        vmRegulationList: [{
          architecture: 'X86',
          cpu: 4,
          dataDisk: 100,
          gpu: '',
          memory: 8,
          nameEn: 'General Computing-2',
          nameZh: '通用计算型-2',
          otherAbility: '',
          regulationId: 2,
          sceneEn: 'Ordinary APP',
          sceneZh: '普通APP',
          systemDisk: 50
        }, {
          architecture: 'X86',
          cpu: 4,
          dataDisk: 100,
          gpu: '',
          memory: 8,
          nameEn: 'General Computing-2',
          nameZh: '通用计算型-2',
          otherAbility: '',
          regulationId: 1,
          sceneEn: 'Ordinary APP',
          sceneZh: '普通APP',
          systemDisk: 50
        }, {
          architecture: 'X86',
          cpu: 4,
          dataDisk: 100,
          gpu: '',
          memory: 16,
          nameEn: 'General Computing-4',
          nameZh: '通用计算型-4',
          otherAbility: '',
          regulationId: 3,
          sceneEn: 'Ordinary APP',
          sceneZh: '普通APP',
          systemDisk: 50
        }],
        osNameOptionList: ['', ''],
        operateSystemOptionList: [],
        selectedData: {
          private: {
            selectedOSName: '',
            selectedSystemId: ''
          },
          public: {
            selectedOSName: '',
            selectedSystemId: ''
          }
        },
        imageType: 'public'
      },
      vmNetworkList: [],
      selectedNetworks: []
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    resetData (imageType = 'public', selectedOSName = '', selectedSystemId = '') {
      this.vmInfo.selectedData = {
        private: {
          selectedOSName: '',
          selectedSystemId: ''
        },
        public: {
          selectedOSName: '',
          selectedSystemId: ''
        }
      }
      this.vmInfo.selectedData[imageType].selectedOSName = selectedOSName
      this.vmInfo.selectedData[imageType].selectedSystemId = selectedSystemId
    },
    addVmInfo () {
      this.validateInput()
      this.$emit('getStepData', { step: 'specSetting' })
    },
    validateInput () {
      if (this.vmInfo.selectedRegulationId === -1) {
        this.$eg_messagebox(this.$t('workspace.deployDebugVm.vmSpecMustSelectTip'), 'warning')
        return false
      }
      if (this.vmInfo.selectedData[this.vmInfo.imageType].selectedSystemId === '') {
        this.$eg_messagebox(this.$t('workspace.deployDebugVm.vmSystemImageMustSelectTip'), 'warning')
        return false
      }
      return true
    },
    handleChangeArch () {
      this.filterVmRegulation()
      this.vmInfo.selectedRegulationId = -1
    },
    filterVmRegulation () {
      this.vmInfo.vmRegulationList = this.vmConfigData.vmRegulationList.filter(item => item.architecture === this.vmInfo.archType)
    },
    handleChangeImgType () {
      this.resetData(this.vmInfo.imageType)
      this.filterOSName()
      this.vmInfo.operateSystemOptionList = []
    },
    filterOSName () {
      this.vmInfo.osNameOptionList = uniqueArray(this.vmConfigData.vmSystemList.filter(item => item.type === this.vmInfo.imageType)
        .map(item => item.operateSystem))
    },
    handleChangeOSName () {
      this.filterOperateSystemOption()
      this.resetData(this.vmInfo.imageType, this.vmInfo.selectedData[this.imageType].selectedOSName)
    },
    filterOperateSystemOption () {
      if (this.vmInfo.selectedData[this.imageType].selectedOSName === '') {
        return
      }

      this.vmInfo.operateSystemOptionList = this.vmConfigData.vmSystemList.filter(
        item => item.type === this.vmInfo.imageType && item.operateSystem === this.vmInfo.selectedData[this.imageType].selectedOSName
      ).map(item => {
        return {
          'systemId': item.systemId,
          'label': item.systemName + '[' + item.operateSystem + ' ' + item.version + ' ' + item.systemBit + '(' + item.systemDisk + 'GB)]'
        }
      })
    },
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
    },
    addVmFinish (type) {
      let _data = []
      if (type === 'confirm') {
        _data = this.selectedNetworks
      }
      this.$emit('addVmFinish', _data)
    }
  },
  mounted () {
    // this.filterVmRegulation()
    // this.filterOSName()
    // this.filterOperateSystemOption()
    this.netWorkListProp.forEach((item) => {
      if (item !== '') {
        this.selectedNetworks.push(item.name)
        this.vmNetworkList.push(item)
      }
    })
  }
}
</script>

<style lang="less">
.addVm{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position:relative;
  padding-top:10px ;
  font-size: 16px;
  animation: delay 0.5s  ease-in-out;
  animation-fill-mode: both;
  @keyframes delay {
    0%{
      transform:scale(0.25);
    }
    100%{
      transform:scale(1)
    }
  }
  .addVm-bg{
    width:1184px;
    max-height: 805px;
    margin: 0px auto;
    padding: 40px;
    .vm-info{
      margin: 0 0 30px 20px;
      .addVm-top-title{
        display: flex;
        margin: 20px 0px;
        p{
          width: 100px;
          line-height: 25px;
          text-align: right;
          margin-right: 10px;
          span{
            color: red;
            line-height: 25px;
          }
        }
        .el-input__inner{
          width: 816px ;
          height: 25px ;
          background-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          border: none;
        }
      }
    }
    .simulator-info{
      margin-bottom: 30px;
      .simulator-info-title{
        p{
          font-size: 20px;
          display: flex;
          span{
            display: block;
            background-color: #5944C0;
            width: 9px;
            height: 9px;
            border-radius:50%;
            margin: 10px 20px 0 0 ;
          }
        }
      }
      .simulator-info-content{
        .el-radio-group{
          margin: 10px 0 0 130px;
          .el-radio-button__inner {
            background: none;
            color: #fff;
            border: none;
            border-bottom:4px solid #8f86cc ;
          }
          .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            background-color: none;
            border-bottom:4px solid #5944C0 ;
          }
        }
        .vm-size{
          margin: 20px 0 20px 144px;
        }
        .vm-table{
          margin-left: 130px;
          width: 816px;
          .el-table__row{
            border: 2px solid red !important;
            height: 59px;
          }
        }
        .el-table td,.el-table tr.is-leaf {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
      }
    }
    .selectImage-info{
      .selectImage-content{
        margin-left: 140px;
        .selectImage-public{
          display: flex;
          margin-bottom: 20px;
          .el-radio{
            height: 25px;
            line-height: 25px;
            color: #fff;
          }
          .el-radio__input.is-checked + .el-radio__label {
            color: #fff;
          }
          .el-select{
            width: 264px;
            margin-right: 80px;
            .el-input__inner{
              height: 25px;
              background-color: rgba(255, 255, 255, 0.3);
            }
            .el-icon-arrow-up {
              font-size: 16px;
              position: relative;
              line-height: 25px;
            }
          }
        }
      }
    }
    .addVm-btn{
      margin-right: 30px;
    }
  }
}
</style>
