<template>
  <div class="projectlist">
    <el-table
      v-loading="dataLoading"
      :data="currentData"
      :row-style="{marginBottom:'10px'}"
      style="width: 100%">
      <el-table-column prop="index" :label="$t('workspace.serial')" align="center" width="60"></el-table-column>
      <el-table-column prop="iconUrl" :label="$t('workspace.icon')">
        <template slot-scope="scope">
          <img :src="getIcon(scope.row.iconFileId)" class="icon_pic" />
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('workspace.projectName')" min-width="100"></el-table-column>
      <el-table-column prop="version" :label="$t('workspace.version')"></el-table-column>
      <el-table-column prop="provider" :label="$t('workspace.provider')"></el-table-column>
      <el-table-column prop="platform" :label="$t('workspace.platform')"></el-table-column>
      <el-table-column :label="$t('workspace.status')">
        <template slot-scope="scope">
          <i v-if="scope.row.status==='ONLINE'" class="el-icon-circle-plus online"></i>
          <i v-if="scope.row.status==='DEPLOYING'" class="el-icon-loading deploying"></i>
          <i v-if="scope.row.status==='DEPLOYED'" class="el-icon-success deployed"></i>
          <i v-if="scope.row.status==='DEPLOYFAILED'" class="el-icon-error deployfailed"></i>
          <i v-if="scope.row.status==='TESTED'" class="el-icon-success tested"></i>
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('workspace.operatioin')">
        <template slot-scope="scope">
          <el-button
            id="deleteBtn"
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >{{$t('workspace.remove')}}</el-button>
          <el-button
            id="detailBtn"
            size="mini"
            type="text"
            @click="toDetail(scope.row)"
          >{{$t('workspace.detail')}}</el-button>
          <span id="projectId">{{scope.row.id}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="cleafix"></div>
    <div class="pagebar">
      <pagination :tableData="pageData" @getCurrentPageData="getCurrentPageData" ref="pagination"></pagination>
    </div>
    <div class="cleafix"></div>
  </div>
</template>

<script>
import { Get, Delete, URL_PREFIX } from '../../tools/tool.js'
import pagination from '../../components/common/Pagination'
export default {
  name: 'projectlist',
  components: {
    pagination
  },
  data () {
    return {
      pageData: [],
      currentData: [],
      dataLoading: true,
      form: {
        appName: '',
        status: '',
        beginTime: '',
        endTime: ''
      },
      url: ''
    }
  },
  mounted () {
    this.getProjectListData()
  },
  methods: {
    getCurrentPageData (val) {
      this.currentData = val
    },
    getProjectListData () {
      Get('mec/developer/v1/projects', '', 'developer').then(res => {
        this.pageData = res.data
        if (this.pageData.length > 0) {
          this.pageData.sort(function (a, b) {
            return a.createDate < b.createDate ? 1 : -1
          })
        }
        // console.log(res.data)
        let newItem = this.pageData.forEach((item, index) => {
          item.index = index + 1
          return newItem
        })
        this.pageData.forEach(item => {
          this.getIcon(item.iconFileId)
        })
        this.dataLoading = false
      })
    },
    getIcon (fileId) {
      let url = URL_PREFIX + 'mec/developer/v1/files/' + fileId
      return url
    },
    handleDelete (item) {
      this.$confirm(this.$t('devTools.deleteList'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        Delete('mec/developer/v1/projects/' + item.id).then(res => {
          this.getProjectListData()
        })
      })
    },
    toDetail (item) {
      let mecDetailID = item.id
      sessionStorage.setItem('mecDetailID', mecDetailID)
      this.$router.push({
        name: 'appDetail',
        params: {
          id: mecDetailID
        }
      })
    }
  }
}
</script>

<style lang="less">
.projectlist {
  .el-table {
    font-size: 14px;
    .icon_pic {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    thead {
      color: #282b33;
      font-weight: 100;
      font-size: 12px;
      th,
      tr {
        // background-color:transparent;
        background-color: #f5f5f5;
      }
    }
    tbody {
      td {
        padding: 8px !important;
        .el-button--text {
          color: #5b7ede !important;
        }
        i{
          margin-right: 5px;
        }
        .online{
          color: #5ab1ef;
        }
        .deploying{
          color: #ffb980;
        }
        .deployed{
          color: #19d4ae;
        }
        .deployfailed{
          color: #f37f7f;
        }
        .tested{
          color: #67c23a;
        }
      }
    }
  }
  .pagebar {
    .el-pager li:not(.disabled).active {
      background-color: #6c92fa !important;
    }
  }
  #projectId{
    display: none;
  }
}
</style>
