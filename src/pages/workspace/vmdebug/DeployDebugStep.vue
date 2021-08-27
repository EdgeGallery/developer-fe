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
    <ApplyVMRes
      v-if="resourceListData.length === 0"
      v-model="showApplyVMResDlg"
      :project-id="projectId"
      @handleApplySuccess="handleApplySuccess"
      @closeLoading="closeLoading"
    />
    <VmDetailPanel
      v-else
      :vm-data-loading="vmDataLoading"
      :resource-list-data="resourceListData"
      :is-zh="isZh"
      @handleDelResource="handleDelResource"
    />
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
import ApplyVMRes from './ApplyVMRes.vue'
import VmDetailPanel from './VmDetailPanel.vue'

export default {
  name: 'DeployDebugVMStep',
  components: {
    ApplyVMRes,
    VmDetailPanel
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
    handleDelResource () {
      this.$eg_messagebox(
        this.$t('workspace.deployDebugVm.deleteVmResPrompt'),
        'warning',
        this.$t('common.cancel'),
        this.$t('common.confirm')
      ).then(() => {
        vmService.deleteVmResource(this.projectId, this.userId).then(() => {
          this.$eg_messagebox(this.$t('devTools.deleteSucc'), 'success')
          this.loadVmResourceDataList()
        }).catch(() => {
          this.$eg_messagebox(this.$t('devTools.deleteFail'), 'error')
        })
      }).catch(() => {})
    },
    handleApplySuccess () {
      this.showApplyVMResDlg = false
      this.isDisabled = true
      this.interval = setInterval(() => {
        this.loadVmResourceDataList()
      }, 5000)
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
