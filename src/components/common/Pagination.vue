<template>
  <div class="my-pagination">
    <el-pagination
      background
      class="rt"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      v-if="totalNum!=0"
      id="pagination">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      pageSize: 10,
      totalNum: 0,
      currentPage: 1,
      data: []
    }
  },
  watch: {
    tableData (val) {
      this.data = val
      this.totalNum = val.length
      this.returnTableData()
      let page = sessionStorage.getItem('currentPage') ? Number(sessionStorage.getItem('currentPage')) : 1
      this.handleCurrentPageChange(page)
    }
  },

  methods: {
    handlePageSizeChange (val) {
      this.pageSize = val
      this.returnTableData()
    },
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.returnTableData()
      sessionStorage.setItem('currentPage', val)
    },
    returnTableData () {
      let start = (this.currentPage - 1) * this.pageSize
      let end = this.currentPage * this.pageSize
      let currentPageData = this.data.slice(start, end)
      this.$emit('getCurrentPageData', currentPageData)
    }
  },
  mounted () {}
}

</script>
<style lang='less'>
.my-pagination{
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #688ef3;
    height: 24px;
    line-height: 24px;
  }
  .el-input--mini .el-input__inner,.el-pager li,.el-pagination button, .el-pagination span:not([class*=suffix]),.el-pagination__editor.el-input .el-input__inner{
    height: 24px;
    line-height: 24px;
  }
}

</style>
