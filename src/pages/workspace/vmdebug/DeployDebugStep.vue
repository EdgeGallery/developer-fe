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
  <div>
    <el-row :gutter="24">
      <el-col
        :span="24"
        v-for="(item,index) in resourceListData"
        :key="index"
      >
        <el-card
          class="box-card"
        >
          <div
            slot="header"
            class="clearfix"
            style="height:10px"
          >
            <table style="width:100%">
              <tr>
                <td>
                  <span class="resCardTitle">{{ item.basicSetting.vmName }}</span>
                </td>
              </tr>
            </table>
          </div>
          <el-row :gutter="24">
            <el-col :span="11">
              <div>
                <el-form
                  label-width="120px"
                  class="formDetail"
                >
                  <el-form-item label="名称：">
                    {{ item.basicSetting.vmName }}
                  </el-form-item>
                  <el-form-item label="规格：">
                    {{ item.vmRegulation }}
                  </el-form-item>
                  <el-form-item label="镜像：">
                    {{ item.vmSystem }}
                  </el-form-item>
                  <el-form-item label="网络：">
                    {{ item.vmNetwork }}
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form
                  label-width="120px"
                  class="formDetail"
                >
                  <el-form-item label="IP：">
                    {{ item.host }}
                  </el-form-item>
                  <el-form-item label="状态：">
                    {{ item.status }}
                  </el-form-item>
                  <el-form-item label="申请时间：">
                    {{ item.createTime }}
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col
              :span="6"
              class="funcBtnArea"
            >
              <el-button
                type="text"
                class="funcBtn"
                @click="handleDelResource(item)"
              >
                删除
              </el-button>
              <el-button
                class="funcBtn"
                type="text"
                @click="handleUploadFile(item)"
              >
                文件上传
              </el-button>
              <el-button
                type="text"
                class="funcBtn"
                @click="handleVNC(item)"
              >
                远程登录
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="addRes-box-card">
          <el-button
            class="btn-addRes"
            type="primary"
            @click="handleNewResource"
          >
            申请资源
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <div v-if="showApplyVMResDlg">
      <ApplyVMRes
        v-model="showApplyVMResDlg"
        :project-id="projectId"
        @handleApplySuccess="handleApplySuccess"
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
  props: {
    projectId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      showApplyVMResDlg: false,
      resourceListData: []
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = {}
        this.$emit('getStepData', { step: 'first', data, ifNext })
      }
    },
    loadVmResourceDataList () {
      vmService.getProjectVmResList(this.projectId).then(res => {
        let _data = res.data
        this.resourceListData = _data
      }).catch(() => {
        this.resourceListData = []
        this.$message.error(this.$t('workspace.deployDebugVm.loadVmConfigFailed'))
      })
    },
    handleVNC (vmData) {
    },
    handleUploadFile (vmData) {
    },
    handleDelResource (vmData) {
      this.$confirm(this.$t('workspace.deployDebugVm.deleteVmResPrompt'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        vmService.deleteVmResource(this.projectId, vmData.vmId).then(res => {
          this.$message.success(this.$t('workspace.deployDebugVm.deleteVmResSuccess'))
          this.loadVmResourceDataList()
        }).catch(() => {
          this.$message.error(this.$t('workspace.deployDebugVm.deleteVmResFailed'))
        })
      })
    },
    handleNewResource () {
      this.showApplyVMResDlg = true
    },
    handleApplySuccess () {
      this.showApplyVMResDlg = false
      this.loadVmResourceDataList()
    }
  },
  created () { },
  mounted () {
    this.loadVmResourceDataList()
  },
  beforeDestroy () {
  },
  watch: {
  }
}
</script>

<style lang="less">
.formDetail{
  .el-form-item{
    margin-bottom:0px!important ;
  }
}
.box-card{
  margin-bottom:10px;
  height: 240px;
}
.addRes-box-card{
  margin-bottom:30px;
  height: 240px;
  text-align:center;
  line-height:240px;
}
.btn-addRes{
  height: 60px;
  width: 120px;
}
.funcBtnArea{
  height:150px;
  padding-top:120px;
}
.funcBtn{
  padding: 8px 10px;
  float:right;
  margin-left:2px!important;
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
