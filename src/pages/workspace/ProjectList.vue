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
  <div class="projectlist">
    <div class="title">
      {{ $t('workspace.myProjectList') }}
      <el-input
        clearable
        v-model="enterQuery"
        :placeholder="$t('workspace.projectName')"
        id="inputProjectName"
        class="enterinput"
        @clear="selectProjectList"
      />
      <el-button
        class="searchBtn"
        @click="selectProjectList"
      >
        {{ $t('test.testTask.inquire') }}
      </el-button>
    </div>
    <el-table
      v-loading="dataLoading"
      :data="currentData"
      :row-style="{marginBottom:'10px'}"
      style="width: 100%"
      header-cell-class-name="headerStyle"
    >
      <el-table-column
        prop="iconUrl"
        :label="$t('workspace.icon')"
        width="80"
      >
        <template slot-scope="scope">
          <img
            :src="getIcon(scope.row.iconFileId)"
            class="icon_pic"
            :alt="scope.row.name"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('workspace.projectName')"
        min-width="120"
      />
      <el-table-column
        prop="projectType"
        :label="$t('workspace.projectType')"
      >
        <template slot-scope="scope">
          {{ scope.row.projectType==='CREATE_NEW'?$t('workspace.appDevelopment'):$t('workspace.appIntegration') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="version"
        :label="$t('workspace.version')"
        width="80"
      />
      <el-table-column
        prop="provider"
        :label="$t('workspace.provider')"
        width="80"
      />
      <el-table-column
        prop="platform"
        :label="$t('workspace.platform')"
        width="80"
      />
      <el-table-column
        prop="createDate"
        :label="$t('workspace.createDate')"
        width="160"
      />
      <el-table-column :label="$t('workspace.status')">
        <template slot-scope="scope">
          <em
            v-if="scope.row.status==='ONLINE'"
            class="el-icon-circle-plus online"
          />
          <em
            v-if="scope.row.status==='DEPLOYING'"
            class="el-icon-loading deploying"
          />
          <em
            v-if="scope.row.status==='DEPLOYED'"
            class="el-icon-success deployed"
          />
          <em
            v-if="scope.row.status==='DEPLOYED_FAILED'"
            class="el-icon-error deployfailed"
          />
          <em
            v-if="scope.row.status==='TESTING'"
            class="el-icon-loading deploying"
          />
          <em
            v-if="scope.row.status==='TESTED'"
            class="el-icon-success tested"
          />
          <em
            v-if="scope.row.status==='RELEASED'"
            class="el-icon-finished tested"
          />
          <span v-if="scope.row.status==='ONLINE'">{{ $t('workspace.statusNew') }}</span>
          <span v-if="scope.row.status==='DEPLOYING'">{{ $t('workspace.statusDeploying') }}</span>
          <span v-if="scope.row.status==='DEPLOYED'">{{ $t('workspace.statusSuccess') }}</span>
          <span v-if="scope.row.status==='DEPLOYED_FAILED'">{{ $t('workspace.statusFail') }}</span>
          <span v-if="scope.row.status==='TESTING'">{{ $t('workspace.statusTesting') }}</span>
          <span v-if="scope.row.status==='TESTED'">{{ $t('workspace.statusTested') }}</span>
          <span v-if="scope.row.status==='RELEASED'">{{ $t('workspace.statusReleased') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('workspace.operation')"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            id="deleteBtn"
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >
            {{ $t('workspace.remove') }}
          </el-button>
          <el-button
            id="detailBtn"
            size="mini"
            type="text"
            @click="toDetail(scope.row)"
          >
            {{ $t('workspace.detail') }}
          </el-button>
        </template>
      </el-table-column>
      <template slot="empty">
        <div>
          <img
            src="../../assets/images/empty.png"
            alt=""
            style="padding: 10px;"
          >
          <p>{{ $t('api.noDataNotice') }}</p>
        </div>
      </template>
    </el-table>
    <div class="pagebar">
      <pagination
        :table-data="searchListData"
        @getCurrentPageData="getCurrentPageData"
        ref="pagination"
      />
    </div>
    <div class="clear" />
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  name: 'Projectlist',
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
      url: '',
      userId: sessionStorage.getItem('userId'),
      searchListData: [],
      enterQuery: ''
    }
  },
  mounted () {
    this.getProjectListData()
  },
  methods: {
    getCurrentPageData (val) {
      this.currentData = val
    },
    // 获取项目列表
    getProjectListData () {
      Workspace.getProjectListApi(this.userId).then(res => {
        this.pageData = this.searchListData = res.data
        if (this.pageData.length > 0) {
          this.pageData.sort(function (a, b) {
            return a.createDate < b.createDate ? 1 : -1
          })
        }
        let newItem = this.pageData.forEach((item, index) => {
          item.index = index + 1
          return newItem
        })
        this.pageData.forEach(item => {
          this.getIcon(item.iconFileId)
        })
        this.dataLoading = false
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.dataLoading = false
        }, 2000)
      })
    },
    // 获取项目图标
    getIcon (fileId) {
      return Workspace.getIconApi(fileId, this.userId)
    },
    // 删除项目
    handleDelete (item) {
      this.$confirm(this.$t('devTools.deleteProject'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        Workspace.deleteProjectApi(item.id, this.userId).then(res => {
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
    },
    // 根据名称查询列表
    selectProjectList () {
      sessionStorage.setItem('currentPage', 1)
      let selectListData = []
      this.pageData.forEach(item => {
        if (item.name.toLowerCase().indexOf(this.enterQuery.toLowerCase()) !== -1) {
          selectListData.push(item)
        }
      })
      if (this.enterQuery) {
        this.searchListData = selectListData
      } else {
        this.searchListData = this.pageData
      }
    }
  }
}
</script>

<style lang="less">
.projectlist {
  .title{
    font-size: 20px;
    color: #282B33;
    position: relative;
    line-height: 24px;
    margin: 20px 0;
    .el-input{
      position: absolute;
      top: 0;
      right: 70px;
      width: 300px;
    }
    .enterinput{
      display: inline-block;
      width: 200px;
    }
    .searchBtn{
      position: absolute;
      top: 0;
      right: 0;
      width: 65px;
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
      padding: 0 10px;
    }
    .el-input__inner{
      height: 30px;
    }
    .el-input__icon{
      line-height: 30px;
    }
  }
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
      font-size: 14px;
      th,
      tr {
        background-color: #f5f5f5;
      }
    }
    tbody {
      td {
        padding: 8px !important;
        em{
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
        .cell{
          padding-left: 0;
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
