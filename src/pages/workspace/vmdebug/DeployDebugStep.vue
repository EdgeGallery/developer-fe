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
  <div>
    <el-row :gutter="24">
      <el-col
        :span="24"
        v-if="resourceListData.length!==0"
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
                  <span class="resCardTitle">{{ $t('workspace.deployDebugVm.vmList') }}</span>
                </td>
              </tr>
            </table>
          </div>
          <el-row
            :gutter="24"
            v-for="(item,index) in resourceListData"
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
                  <el-form-item :label="$t('workspace.deployDebugVm.vmSpecLbl')">
                    {{ buildSpecDesc(item) }}
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
                  class="formDetail"
                >
                  <el-form-item :label="$t('workspace.deployDebugVm.vmImageLbl')">
                    {{ buildSystemDesc(item) }}
                  </el-form-item>
                  <el-form-item :label="$t('workspace.deployDebugVm.vmNetworkLbl')">
                    {{ item.vmNetwork.join(', ') }}
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="24">
              <p class="operation_btn">
                <el-button
                  type="text"
                  class="funcBtn"
                  @click="handleDelResource(item)"
                  :disabled="item.status==='CREATING'"
                >
                  {{ $t('workspace.deployDebugVm.deleteBtnLbl') }}
                </el-button>
              </p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <ApplyVMRes
      v-model="showApplyVMResDlg"
      :project-id="projectId"
      @handleApplySuccess="handleApplySuccess"
      @closeLoading="closeLoading"
      v-if="resourceListData.length===0"
    />
    <div v-if="showApplyVMResDlg">
      <ApplyVMRes
        v-model="showApplyVMResDlg"
        :project-id="projectId"
        @handleApplySuccess="handleApplySuccess"
        @closeLoading="closeLoading"
      />
    </div>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
import ApplyVMRes from './ApplyVMRes.vue'

export default {
  name: 'DeployDebugVMStep',
  components: {
    ApplyVMRes
  },
  data () {
    return {
      projectId: sessionStorage.getItem('mecDetailID'),
      userId: sessionStorage.getItem('userId'),
      isZh: true,
      showApplyVMResDlg: false,
      resourceListData: [],
      operatingVmId: '',
      interval: null,
      vmDataLoading: true,
      isDisabled: false
    }
  },
  methods: {
    closeLoading (data) {
      this.vmDataLoading = data
      this.isDisabled = false
    },
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = {}
        this.$emit('getStepData', { step: 'first', data, ifNext })
      }
    },
    loadVmResourceDataList () {
      vmService.getApplyVmResourceList(this.projectId, this.userId).then(res => {
        this.resourceListData = []
        let _data = res.data
        this.vmDataLoading = false
        if (JSON.stringify(_data) !== '""') {
          _data.createTime = this.dateChange(_data.createTime)
          this.resourceListData.push(_data)
        }
        this.clearInterval()
      }).catch(() => {
        this.clearInterval()
      })
    },
    handleDelResource (vmData) {
      this.$confirm(this.$t('workspace.deployDebugVm.deleteVmResPrompt'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        vmService.deleteVmResource(this.projectId, this.userId).then(() => {
          this.$message.success(this.$t('devTools.deleteSucc'))
          this.loadVmResourceDataList()
        }).catch(() => {
          this.$message.error(this.$t('devTools.deleteFail'))
        })
      })
    },
    handleApplySuccess () {
      this.showApplyVMResDlg = false
      this.isDisabled = true
      this.interval = setInterval(() => {
        this.loadVmResourceDataList()
      }, 5000)
    },
    buildSpecDesc (item) {
      let vmSpecName = this.isZh ? item.vmRegulation.nameZh : item.vmRegulation.nameEn
      return item.vmRegulation.architecture +
        '|' + vmSpecName +
        '|' + item.vmRegulation.cpu + 'vCPUs' +
        '|' + item.vmRegulation.memory + 'GB RAM' +
        '|' + item.vmRegulation.systemDisk + 'GB' +
        '+' + item.vmRegulation.dataDisk + 'GB Disk'
    },
    buildSystemDesc (item) {
      return item.vmSystem.operateSystem +
        ' ' + item.vmSystem.version +
        ' ' + item.vmSystem.systemBit +
        '(' + item.vmSystem.systemDisk + 'GB Disk)'
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
    this.isZh = this.$store.state.language === 'cn'
    this.loadVmResourceDataList()
    this.interval = setInterval(() => {
      this.loadVmResourceDataList()
    }, 5000)
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>

<style lang="less">
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
.box-card{
  margin-bottom:10px;
  overflow: auto;
  .el-card__header{
    padding: 10px 20px;
  }
  .el-card__body{
    min-width: 715px;
  }
}
.addRes-box-card{
  margin-bottom:30px;
  height: 240px;
  text-align:center;
  line-height:240px;
}
.operation_btn{
  width: 100%;
  height: 25px;
  line-height: 25px;
  margin-top: 10px;
}
.btn-addRes{
  height: 50px;
  width: 150px;
}
.funcBtn{
  padding: 8px 10px;
  float:right;
  margin-left:12px!important;
  position: relative;
}
.resCardTitle{
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  position:relative;
}
</style>
