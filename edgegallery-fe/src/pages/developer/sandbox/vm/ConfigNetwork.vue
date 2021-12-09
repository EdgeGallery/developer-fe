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
  <div class="config-network">
    <div class="common-div-bg network-list">
      <h3 class="common-dlg-title">
        {{ $t('sandbox.selectNetworkType') }}
      </h3>
      <el-table
        class="common-table network-table"
        :data="vmNetworkList"
      >
        <el-table-column
          prop="name"
          width="200px"
          :label="$t('common.name')"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.describe')"
        >
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column width="120px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="deleteInternet(scope.row.id)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        class="common-table new-network-table"
        :data="newNetworkList"
      >
        <el-table-column
          width="200px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              class="common-input"
              size="mini"
              :placeholder="$t('sandbox.addCustomNetwork')"
              v-model="scope.row.name"
              :disabled="ifAddInternet"
            />
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              class="common-input"
              size="mini"
              :placeholder="$t('sandbox.addDescribe')"
              v-model="scope.row.description"
              :disabled="ifAddInternet"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-container network-btn">
        <el-button
          id="btn_cancelEditNetwork"
          class="common-btn"
          @click="finishEditNetwork('cancel')"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="btn_confirmEditNetwork"
          class="common-btn"
          @click="finishEditNetwork('confirm')"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../../api/developerApi.js'
export default {
  name: 'ConfigNetwork',
  data () {
    return {
      vmNetworkList: [],
      newNetworkList: [
        {
          name: '',
          description: ''
        }
      ],
      applicationId: sessionStorage.getItem('applicationId') || '',
      ifAddInternet: true
    }
  },
  methods: {
    getInternetType () {
      sandbox.getAllInternetType(this.applicationId).then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.vmNetworkList = res.data
        this.ifAddInternet = this.vmNetworkList.length > 3
      }).catch(err => {
        console.log(err)
      })
    },
    deleteInternet (data) {
      sandbox.deleteInternet(this.applicationId, data).then(() => {
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.deleteInternetSuccess'), 'success')
        this.getInternetType()
      })
    },
    finishEditNetwork (type) {
      this.$emit('editNetwork', '')
      if (type === 'confirm') {
        sandbox.addInternetType(this.applicationId, this.newNetworkList[0]).then(() => {
        })
      }
    }
  },
  mounted () {
    this.getInternetType()
  }
}
</script>

<style lang="less">
.config-network{
  width: 100%;
  height: 100%;
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
  .network-list{
    position: absolute;
    width: 940px;
    padding: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .add-btn{
      position: absolute;
      right: 60px;
      top: 110px;
      z-index: 2;
      cursor: pointer;
    }
    .network-table{
      .el-button--mini{
        color: #5944C0 ;
        border: none;
      }
      .el-button--mini:hover{
        color: #fff;
        background: #5944C0;
      }
      .el-button.is-disabled{
        background: #fff !important;
      }
    }
    .network-table thead{
      height: 50px;
    }
    .network-table{
      font-size: 14px;
      td{
        height: auto !important;
        line-height: 25px !important;
      }
      .cell{
        padding: 10px;
      }
    }
    .new-network-table thead{
      display: none;
    }
  }
  .network-btn{
    margin-top: 30px;
  }
}
</style>
