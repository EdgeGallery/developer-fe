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
  <div
    id="div_deploydebug_vm"
    class="deploydebug_vm"
  >
    <el-card
      class="box-card"
      v-loading="vmDataLoading"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <table style="width:100%">
          <caption />
          <tr>
            <th scope="heads" />
            <th scope="heads" />
          </tr>
          <tr>
            <td>
              <span class="resCardTitle">{{ $t('workspace.deployDebugVm.deployResultList') }}</span>
            </td>
          </tr>
        </table>
      </div>
      <el-row
        :gutter="24"
        v-for="(item,index) in deployListData"
        :key="index"
      >
        <el-col :span="13">
          <div>
            <el-form
              label-width="120px"
              class="formDetail"
            >
              <el-form-item :label="$t('workspace.deployDebugVm.vmNameLbl')">
                {{ item.vmName }}
              </el-form-item>
              <el-form-item label="mecHost">
                {{ item.host?item.host.mecHost:null }}
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="11">
          <div>
            <el-form
              label-width="120px"
              class="formDetail"
            >
              <el-form-item :label="$t('workspace.deployDebugVm.vmStatusLbl')">
                <em
                  v-if="item.status==='CREATING'"
                  class="el-icon-loading deploying icon"
                />
                <em
                  v-if="item.status==='SUCCESS'"
                  class="el-icon-success success icon"
                />
                <em
                  v-if="item.status==='FAILED'"
                  class="el-icon-error error icon"
                />
                {{ item.status }}
              </el-form-item>
              <el-form-item :label="$t('workspace.deployDebugVm.vmApplyTimeLbl')">
                {{ item.createTime }}
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="24">
          <p class="operation_btn">
            <el-button
              type="text"
              class="funcBtn"
              @click="deleteVmDeployList(item)"
              :disabled="item.status==='CREATING'"
            >
              {{ $t('workspace.deployDebugVm.deleteBtnLbl') }}
            </el-button>
          </p>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="addRes-box-card">
      <el-button
        class="btn-addRes"
        type="primary"
        @click="deployTest"
        :disabled="isDisabled || deployListData.length!==0"
      >
        {{ $t('workspace.startDeployment') }}
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
export default {
  name: 'DeployDebugVMMain',
  props: {
    projectId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      deployListData: [],
      interval: null,
      vmDataLoading: true,
      isDisabled: false
    }
  },
  methods: {
    deployTest () {
      this.vmDataLoading = true
      vmService.vmDeployTestApi(this.projectId, this.userId).then(() => {
        this.isDisabled = true
        this.interval = setInterval(() => {
          this.getProjectVmList()
        }, 2000)
      }).catch(err => {
        this.isDisabled = false
        this.vmDataLoading = false
        if (err.response.data.message === 'Can not get vm package config') {
          this.$message.warning(this.$t('workspace.deployDebugVm.resourceConfigPromt'))
        }
      })
    },
    getProjectVmList () {
      vmService.getProjectVmResList(this.projectId, this.userId).then(res => {
        this.deployListData = []
        if (res.data.length === 0) {
          this.clearInterval()
        } else {
          let _data = res.data[0]
          if (_data.status !== 'CREATING') {
            this.clearInterval()
          }
          this.deployListData.push(_data)
          if (_data.createTime !== null) {
            _data.createTime = this.dateChange(_data.createTime)
          }
        }
        this.vmDataLoading = false
      })
    },
    deleteVmDeployList (item) {
      this.$confirm(this.$t('workspace.deployDebugVm.deleteVmDeployList'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        vmService.deleteVmDeployListApi(this.projectId, item.vmId, this.userId).then(() => {
          this.$message.success(this.$t('devTools.deleteSucc'))
          this.getProjectVmList()
          this.isDisabled = false
        }).catch(() => {
          this.$message.error(this.$t('devTools.deleteFail'))
          this.isDisabled = false
        })
      })
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let H = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        return Y +
          '-' +
          (M > 9 ? M : '0' + M) +
          '-' +
          (D > 9 ? D : '0' + D) +
          ' ' +
          (H > 9 ? H : '0' + H) +
          ':' +
          (m > 9 ? m : '0' + m) +
          ':' +
          (s > 9 ? s : '0' + s)
      }
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    }
  },
  mounted () {
    this.getProjectVmList()
    this.interval = setInterval(() => {
      this.getProjectVmList()
    }, 2000)
  }
}
</script>

<style lang='less'>
.deploydebug_vm {
  .resCardTitle{
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    position:relative;
  }
  .formDetail{
    .el-form-item{
      margin-bottom:0px!important ;
      .el-form-item__label{
        color: #adb0b8;
        padding-right: 20px;
      }
      .el-form-item__content{
        line-height: 40px;
      }
    }
    .vm_log .el-form-item__content{
      max-height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-overflow: -o-ellipsis-lastline;
      display: -webkit-box;
      line-clamp:2;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
    }
  }
}
</style>
