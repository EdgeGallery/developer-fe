<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="my-pagination">
    <el-pagination
      class="page rt"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[12, 24, 36, 48]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      id="pagination"
    />
    <el-pagination
      background
      class="page-small rt"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      layout="prev, pager, next"
      :total="totalNum"
      id="pagination"
      :page-size="pageSize"
      :pager-count="5"
    />
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      required: true,
      type: Array
    },
    listTotal: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      pageSize: 12,
      totalNum: 0,
      currentPage: 1,
      data: []
    }
  },
  watch: {
    tableData (val) {
      this.data = val
      if (this.listTotal) {
        this.totalNum = this.listTotal
      } else {
        this.totalNum = val.length
      }
      this.returnTableData()
      let page = sessionStorage.getItem('currentPage') ? Number(sessionStorage.getItem('currentPage')) : 1
      this.handleCurrentPageChange(page)
    },
    listTotal (val) {
      this.totalNum = val
    }
  },

  methods: {
    handlePageSizeChange (val) {
      this.pageSize = val
      sessionStorage.setItem('currentPage', 1)
      this.currentPage = 1
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
      this.$emit('getCurrentPageData', currentPageData, this.pageSize, start)
    }
  }
}

</script>
<style lang='less'>
.my-pagination{
  .el-input--mini .el-input__inner,.el-pager li,.el-pagination button, .el-pagination span:not([class*=suffix]),.el-pagination__editor.el-input .el-input__inner{
    height: 24px;
    line-height: 24px;
  }
  .el-pagination.is-background .btn-next{
    margin: 0 0 0 5px;
  }
  .page-small{
    display: none;
  }
  @media screen and (max-width: 767px){
    .page{
      display: none;
    }
    .page-small{
      display: block;
    }
  }
}

</style>
