<template>
  <div class="fourthstep-migration">
    <el-table
      id="toolChainList"
      :data="ToolChainList"
      border
      ref="fourthStepMigration"
      style="width: 100%; margin-top: 20px"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="name"
        :label="$t('workspace.name')"
      />
      <el-table-column
        prop="des1"
        :label="$t('workspace.description')"
      />
      <el-table-column
        prop="des2"
        :label="$t('workspace.description')"
      />
      <el-table-column align="right">
        <el-button
          size="small"
          type="text"
        >
          {{ $t('workspace.deploy') }}
        </el-button>
      </el-table-column>
    </el-table>
    <div
      class="el-form-error"
      v-if="this.fourthStepSelection.length===0"
    >
      {{ $t('workspace.selectLeastOne') }}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      fourthStepSelection: [],
      ToolChainList: [
        // {
        //   name: 'Migration Tool',
        //   des1: 'xxx',
        //   des2: 'xxx'
        // }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.$refs.fourthStepMigration.toggleRowSelection(this.ToolChainList[0])
  },
  methods: {
    handleRowClick (row, column, event) {
      this.$refs.fourthStepMigration.toggleRowSelection(row)
    },
    handleSelectionChange (val) {
      this.fourthStepSelection = val
    },
    emitStepData () {
      this.$emit('getStepData', { data: this.fourthStepSelection, step: 'fourth' })
    }
  }
}
</script>

<style lang="less">
  .fourthstep-migration{
    .el-table thead{
      th,tr{
        background-color:#f0f3fa;
      }
    }
    .el-button--text{
      color: #688ef3;
    }
  }
</style>
