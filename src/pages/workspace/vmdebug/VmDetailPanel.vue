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
  <div class="detail-wrapper">
    <el-steps
      class="work-steps"
      :active="4"
      finish-status="success"
      space="90px"
    >
      <el-step
        v-for="(item, index) in 4"
        :key="index"
      />
    </el-steps>
    <div
      class="detail-title work-div"
      :v-loading="vmDataLoading"
    >
      <div class="work-title">
        {{ $t('workspace.deployDebugVm.vmList') }}
      </div>
      <div class="detail-content">
        <el-row
          v-for="(item,index) in resourceListData"
          :key="index"
        >
          <el-col :span="12">
            <div>
              <el-form
                label-width="120px"
                label-position="left"
              >
                <el-form-item :label="$t('workspace.deployDebugVm.vmNameLbl')">
                  {{ item.vmName }}
                </el-form-item>
                <el-form-item :label="$t('workspace.deployDebugVm.vmNetworkLbl')">
                  {{ buildNetworkDesc(item) }}
                </el-form-item>
                <el-form-item :label="$t('workspace.deployDebugVm.vmApplyTimeLbl')">
                  {{ item.createTime }}
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="11">
            <div>
              <el-form
                label-width="120px"
                label-position="right"
              >
                <el-form-item :label="$t('workspace.deployDebugVm.vmImageLbl')">
                  {{ buildSystemDesc(item) }}
                </el-form-item>
                <el-form-item :label="$t('workspace.deployDebugVm.vmSpecLbl')">
                  {{ buildSpecDesc(item) }}
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="24">
            <el-button
              class="delete-button"
              @click="handleDelResource"
              :disabled="item.status==='CREATING'"
            >
              {{ $t('workspace.deployDebugVm.deleteBtnLbl') }}
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VmDetailPanel',
  props: {
    vmDataLoading: {
      type: Boolean,
      default: true
    },
    isZh: {
      type: Boolean,
      default: true
    },
    resourceListData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    buildSpecDesc (item) {
      if (item.vmRegulation === null) {
        return 'Null'
      }
      let vmSpecName = this.isZh ? item.vmRegulation.nameZh : item.vmRegulation.nameEn
      return item.vmRegulation.architecture +
        ' | ' + vmSpecName +
        ' | ' + item.vmRegulation.cpu + 'vCPUs' +
        ' | ' + item.vmRegulation.memory + 'GB RAM' +
        ' | ' + item.vmRegulation.systemDisk + 'GB' +
        '+' + item.vmRegulation.dataDisk + 'GB Disk'
    },
    buildSystemDesc (item) {
      if (item.vmSystem === null) {
        return 'Null'
      }
      return item.vmSystem.operateSystem +
        ' ' + item.vmSystem.version +
        ' ' + item.vmSystem.systemBit +
        '(' + item.vmSystem.systemDisk + 'GB Disk)'
    },
    buildNetworkDesc (item) {
      return item.vmNetwork === null ? 'Null' : item.vmNetwork.join(', ')
    },
    handleDelResource () {
      this.$emit('handleDelResource')
    }
  }
}
</script>

<style lang="less">
.detail-wrapper {
  .detail-title {
    padding: 46px 39px;
    margin-top: 45px;
  }

  .work-div {
    min-height: 100px;
  }

  .detail-content {
    padding: 20px 22px 20px 52px;

    .el-form-item {
      margin-bottom: 0;
    }

    .el-form-item__label {
      font-size: 16px;
      font-family: defaultFont;
      color: #380879;
    }

    .el-form-item__content {
      font-size: 16px;
      font-family: defaultFontLight;
      color: #380879;
      padding-top: 4px;
    }
  }

  .delete-button {
    border: none;
    background-color: #8278b7;
    color: #f0f0f0;
    margin-top: 20px;
  }
}
</style>
