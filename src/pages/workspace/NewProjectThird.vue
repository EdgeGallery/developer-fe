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
  <div class="thirdstep">
    <el-table
      id="serviceDetail"
      ref="thirdStepTable"
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      v-loading="serviceDataLoading"
    >
      <el-table-column
        type="selection"
        :selectable="checkDisable"
        width="55"
      />
      <el-table-column
        prop="name"
        :label="$t('workspace.platformCapabilities')"
        width="180"
      />
      <el-table-column
        :label="$t('workspace.service')"
        prop="service"
      />
      <el-table-column
        :label="$t('workspace.serviceVersion')"
        prop="version"
      />
      <el-table-column
        :label="$t('workspace.serviceDescription')"
        prop="description"
      />
      <el-table-column
        :label="$t('workspace.provider')"
        prop="provider"
      />
    </el-table>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
export default {
  name: 'Thirdstep',
  props: {
    allStepData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tableData: [],
      thirdStepSelection: [],
      secondStepSelect: this.allStepData.second,
      serviceDataLoading: true,
      apiFileIdArr: []
    }
  },
  created () {
  },
  mounted () {
    this.getServiceList()
  },
  methods: {
    defaultSelecteAll () {
      this.$nextTick(() => {
        for (let i = 0; i < this.tableData.length; i++) {
          this.$refs.thirdStepTable.toggleRowSelection(
            this.tableData[i],
            true
          )
        }
      })
    },
    // 获取服务列表
    getServiceList () {
      let count = 0
      let selectedCapablity = [...new Set(this.secondStepSelect.selectCapabilityId)]
      selectedCapablity.forEach(groupId => {
        Workspace.getServiceListApi(groupId).then(res => {
          let data = res.data
          let serviceName = data.name
          data.capabilityDetailList.forEach(service => {
            service.name = serviceName
            this.tableData.push(service)
            this.apiFileIdArr.push(service.apiFileId)
          })
          this.defaultSelecteAll()
          sessionStorage.setItem('apiFileIdArr', JSON.stringify(this.apiFileIdArr))
          count++
          if (count === selectedCapablity.length) {
            this.serviceDataLoading = false
          } else {
            this.serviceDataLoading = true
          }
          this.mergerTableData()
        })
        // 请求完列表后，回调，过滤需要被勾选的
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].name === 'Service Discovery') {
                this.$refs.thirdStepTable.toggleRowSelection(this.tableData[i], true)
              }
            }
          })
      })
    },
    checkDisable (row, rowIndex) {
      let unable = true
      if (row.name === 'Service Discovery') {
        unable = false// 禁用
      }
      return unable
    },
    // 找到相同平台能力，合并单元格
    mergerTableData () {
      let nameArr = []
      this.tableData.forEach(item => {
        nameArr.push(item.name)
      })
      nameArr = [...new Set(nameArr)]
      let data = []
      nameArr.forEach(nameItem => {
        let len = 0
        let arr = []
        this.tableData.forEach(item => {
          if (nameItem === item.name) {
            len++
            arr.push(item)
          }
        })
        if (len > 0) {
          arr[0].length = len
        }
        data = [...data, ...arr]
      })
      this.tableData = data
    },
    // 设置合并的单元格
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (row.length) {
          return {
            rowspan: row.length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 选中/取消一个服务
    handleRowClick (row, column, event) {
      if (row.name !== 'Service Discovery') {
        this.$refs.thirdStepTable.toggleRowSelection(row)
      }
    },
    // 选择表格中的数据
    handleSelectionChange (val) {
      this.thirdStepSelection = val
    },
    // 将选择的服务传值给父组件
    emitStepData () {
      this.$emit('getStepData', { data: this.thirdStepSelection, step: 'third' })
    }
  }
}
</script>

<style lang="less">
  .thirdstep{
    .el-table thead{
      th,tr{
        background-color:#f0f3fa;
      }
    }
  }
</style>
