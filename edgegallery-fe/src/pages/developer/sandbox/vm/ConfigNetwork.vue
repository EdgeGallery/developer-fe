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
      <span class="add-btn">
        <img
          src="../../../../assets/images/sandbox/add_network_btn.png"
          alt=""
          @click="addInternetBtn"
        >
      </span>
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
              class="el-button-operation"
              @click="deleteInternet(scope.row.id)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="editInternet"
        v-if="ifAddInternetBtn"
      >
        <div class="editInternet-inputs">
          <el-input
            class="common-input"
            size="mini"
            :placeholder="$t('sandbox.addCustomNetwork')"
            v-model="newNetworkList[0].name"
            @change="ifInternetNameRepeat"
          />
          <el-input
            class="common-input"
            size="mini"
            :placeholder="$t('sandbox.addDescribe')"
            v-model="newNetworkList[0].description"
          />
        </div>
        <div class="editInternet-btns">
          <el-button
            class="el-button-operation"
            @click="cancelAddInternet"
          >
            {{ $t('common.cancel') }}
          </el-button>
        </div>
      </div>
      <div class="btn-container network-btn">
        <el-button
          id="btn_confirmEditNetwork"
          class="common-btn"
          @click="goBackVmDetail()"
        >
          {{ $t('common.back') }}
        </el-button>
        <el-button
          id="btn_confirmEditNetwork"
          class="common-btn"
          :disabled="isAddNameRepeat"
          @click="confirmAddInternet()"
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
      ifAddInternetBtn: false,
      isAddNameRepeat: false
    }
  },
  methods: {
    getInternetType () {
      sandbox.getAllInternetType(this.applicationId).then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.vmNetworkList = res.data
        this.ifAddInternetBtn = !this.vmNetworkList.length > 3
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
    addInternetBtn () {
      if (this.vmNetworkList.length > 3) {
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.addInternetFaild'), 'warning')
        this.ifAddInternetBtn = false
      } else {
        this.ifAddInternetBtn = true
      }
    },
    ifInternetNameRepeat () {
      this.vmNetworkList.forEach(item => {
        if (item.name === this.newNetworkList[0].name) {
          this.isAddNameRepeat = true
          this.$eg_messagebox(this.$t('sandboxPromptInfomation.internetNameRepeat'), 'warning')
        } else {
          this.isAddNameRepeat = false
        }
      })
    },
    cancelAddInternet () {
      this.ifAddInternetBtn = false
      this.newNetworkList = [
        {
          name: '',
          description: ''
        }
      ]
    },
    goBackVmDetail () {
      this.newNetworkList = [
        {
          name: '',
          description: ''
        }
      ]
      this.$emit('editNetwork', this.vmNetworkList)
    },
    confirmAddInternet () {
      if (this.ifAddInternetBtn) {
        if (this.newNetworkList[0].name === '') {
          this.$eg_messagebox(this.$t('sandboxPromptInfomation.addInternetTip'), 'warning')
        } else {
          sandbox.addInternetType(this.applicationId, this.newNetworkList[0]).then(() => {
            this.getInternetType()
            this.ifAddInternetBtn = false
            this.newNetworkList = [
              {
                name: '',
                description: ''
              }
            ]
          })
        }
      } else {
        this.$emit('editNetwork', this.vmNetworkList)
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
      top: 122px;
      z-index: 2;
      cursor: pointer;
    }
    .el-button--mini{
      border: none;
      border-radius:6px ;
      color: #fff;
      background: #4E3494;
    }
    .el-button--mini:hover{
     color: #4E3494 ;
     background: #fff;
    }
    .network-table thead{
      height: 50px;
    }
    .network-table{
      // font-size: 14px;
      td{
        height: auto !important;
        line-height: 25px !important;
      }
      .cell{
        padding: 10px;
      }
    }
    .editInternet{
      margin-top: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content:space-between;
      border-bottom:1px solid #4e3494 ;
      .editInternet-inputs{
        width: 600px;
        display: flex;
        justify-content: flex-start;
        .el-input {
          width: 35%;
          line-height: 30px;
        }
      }
      .editInternet-btns{
        margin-right: 38px;
      }
    }
  }
  .network-btn{
    margin-top: 30px;
  }
}
</style>
