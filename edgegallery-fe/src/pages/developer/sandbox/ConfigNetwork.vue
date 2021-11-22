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
        选择网络类型
      </h3>

      <span class="add-btn">
        <img
          src="../../../assets/images/sandbox/add_network_btn.png"
          alt=""
          @click="addNewNetwork"
        >
      </span>
      <el-table
        class="common-table"
        :data="vmNetworkList"
      >
        <el-table-column width="35">
          <template slot-scope="scope">
            <el-checkbox
              class="common-checkbox"
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

      <el-table
        class="common-table new-network-table"
        :data="newNetworkList"
      >
        <el-table-column width="35">
          <template slot-scope="scope">
            <el-checkbox
              class="common-checkbox"
              v-model="selectedNetworks"
              :label="scope.row.name"
              :disabled="scope.row.name===''"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input
              class="common-input"
              size="mini"
              placeholder="添加自定义网络"
              v-model="scope.row.name"
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
              placeholder="添加描述"
              v-model="scope.row.description"
            />
          </template>
        </el-table-column>
      </el-table>

      <div class="btn-container network-btn">
        <el-button
          class="common-btn"
          @click="finishEditNetwork('cancel')"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
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
import { sandbox } from '../../../api/developerApi.js'
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
      selectedNetworks: [],
      applicationId: sessionStorage.getItem('applicationId') || ''
    }
  },
  methods: {
    getInternetType () {
      sandbox.getAllInternetType(this.applicationId).then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.vmNetworkList = res.data
        this.vmNetworkList.forEach((item) => {
          if (item.name !== '') {
            this.selectedNetworks.push(item.name)
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    addNewNetwork () {
      let _obj = {
        description: '',
        name: ''
      }
      this.newNetworkList.push(_obj)
    },
    finishEditNetwork (type) {
      let _data = []
      if (type === 'confirm') {
        let _newArr = this.newNetworkList.filter(item => {
          return item.name !== ''
        })
        _data = this.vmNetworkList.concat(_newArr)
        this.newNetworkList.forEach(item => {
          if (item.name === '') {
            return
          }
          sandbox.addInternetType(this.applicationId, item).then(() => {
            this.$emit('editNetwork', _data)
          })
        })
        this.$emit('editNetwork', _data, this.selectedNetworks)
      } else {
        this.$emit('editNetwork', _data, this.selectedNetworks)
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
      top: 98px;
      z-index: 2;
      cursor: pointer;
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
