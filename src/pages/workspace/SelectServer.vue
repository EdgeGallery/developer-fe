<template>
  <div class="serve">
    <b>{{ $t('workspace.server') }}:</b>
    <el-table
      v-loading="hostsDataLoading"
      id="hostsList"
      :data="hostsListData"
      border
      style="width: 100%; margin-top: 20px"
      @current-change="handleSelectionChange"
      highlight-current-row
      ref="singleTable"
    >
      <el-table-column
        width="70"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-radio
            class="radio"
            v-model="radio"
            :label="scope.$index"
          >
&nbsp;
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('workspace.name')"
        width="180"
      />
      <el-table-column
        prop="os"
        label="OS"
      />
      <el-table-column
        prop="architecture"
        :label="$t('workspace.architecture')"
      />
      <el-table-column
        prop="address"
        :label="$t('workspace.address')"
      />
      <el-table-column
        prop="ip"
        label="IP"
      />
      <el-table-column
        prop="port"
        :label="$t('workspace.port')"
      />
      <el-table-column
        prop="status"
        :label="$t('workspace.status')"
      />
    </el-table>
  </div>
</template>

<script>
import { Get } from '../../tools/tool.js'

export default {
  name: 'Server',
  props: {
    projectBeforeConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      hostsListData: [
      ],
      selectTableData: '',
      hostsDataLoading: true,
      radio: ''
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.selectTableData = val
      this.radio = this.hostsListData.indexOf(val)
    },
    getHostsData () {
      let url = 'mec/developer/v1/hosts'
      // let projectId = sessionStorage.getItem('mecDetailID')
      Get(url).then(res => {
        this.hostsListData = res.data
        this.hostsDataLoading = false
      })
    },
    ifNext () {
      let ifNext = false
      if (this.selectTableData || this.projectBeforeConfig.testId) {
        ifNext = true
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.selectService')
        })
      }
      return ifNext
    },
    emitStepData () {
      let ifNext = this.ifNext()
      if (ifNext) {
        this.$emit('getStepData', { step: 'third', data: this.selectTableData, ifNext })
      }
    }
  },
  mounted () {
    this.getHostsData()
    if (this.projectBeforeConfig.hosts) {
      this.selectTableData = this.projectBeforeConfig.hosts[0]
    }
  }
}
</script>

<style lang="less">
.serve {
  .el-table td {
    border: none;
    border-bottom: 1px solid #f0f3fa;
  }
  .el-table thead {
    th,
    tr {
      background-color: #f0f3fa;
    }
  }
  .el-table--border::after,
  .el-table--group::after {
    width: 0;
  }
  .el-table--border {
    border: none;
  }
  .el-radio{
    .el-radio__label{
        display: none;
    }
  }
}
</style>
