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
        v-loading="serviceDataLoading">
        <el-table-column
          type="selection"
          :selectable="checkDisable"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('workspace.platformCapabilities')"
          width="180">
        </el-table-column>
        <el-table-column
          :label="$t('workspace.service')"
          prop="service">
        </el-table-column>
        <el-table-column
          :label="$t('workspace.serviceVersion')"
          prop="version">
        </el-table-column>
        <el-table-column
          :label="$t('workspace.serviceDescription')" prop="description">
        </el-table-column>
        <el-table-column
          :label="$t('workspace.provider')" prop="provider">
        </el-table-column>
      </el-table>
      <!-- <div class="el-form-error" v-if="this.thirdStepSelection.length===0">
        {{$t('workspace.selectLeastOne')}}
      </div> -->
    </div>
</template>

<script>
import { Get } from '../../tools/tool.js'
export default {
  name: '',
  props: ['secondStepData'],
  data () {
    return {
      tableData: [],
      thirdStepSelection: [],
      secondStepSelect: this.secondStepData.second,
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
    getServiceList () {
      let count = 0
      let selectedCapablity = this.secondStepSelect.selectCapabilityId
      console.log(selectedCapablity)
      selectedCapablity.forEach(groupId => {
        let url = 'mec/developer/v1/capability-groups/' + groupId
        Get(url).then(res => {
          let data = res.data
          // console.log(data)
          let serviceName = data.name
          data.capabilityDetailList.forEach(service => {
            service.name = serviceName
            this.tableData.push(service)
            this.apiFileIdArr.push(service.apiFileId)
          })
          // console.log(this.apiFileIdArr)
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
      if (row.name === 'Service Discovery') {
        return false// 禁用
      } else {
        return true// 不禁用
      }
    },
    // 找到相同平台能力，合并单元格
    mergerTableData () {
      let nameArr = []
      this.tableData.forEach(item => {
        nameArr.push(item.description)
      })
      nameArr = [...new Set(nameArr)]
      let data = []
      nameArr.forEach(nameItem => {
        let len = 0
        let arr = []
        this.tableData.forEach(item => {
          if (nameItem === item.description) {
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
    handleRowClick (row, column, event) {
      if (row.name !== 'Service Discovery') {
        this.$refs.thirdStepTable.toggleRowSelection(row)
      }
    },
    handleSelectionChange (val) {
      this.thirdStepSelection = val
    },
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
