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
  <div class="projectlist">
    <div class="title">
      {{ $t('workspace.myProjectList') }}
      <el-input
        clearable
        v-model="enterQuery"
        :placeholder="$t('workspace.projectName')"
        id="inputProjectName"
        class="enterinput"
        @blur="enterQueryFun"
        @clear="enterQueryFun"
      />
      <el-button
        class="searchBtn"
        @click="enterQueryFun"
      >
        {{ $t('test.testTask.inquire') }}
      </el-button>
    </div>
    <el-table
      v-loading="dataLoading"
      :data="currentData"
      :row-style="{marginBottom:'10px'}"
      style="width: 100%"
    >
      <el-table-column
        prop="index"
        :label="$t('workspace.serial')"
        align="center"
        width="60"
      />
      <el-table-column
        prop="iconUrl"
        :label="$t('workspace.icon')"
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
        min-width="100"
      />
      <el-table-column
        prop="version"
        :label="$t('workspace.version')"
      />
      <el-table-column
        prop="provider"
        :label="$t('workspace.provider')"
      />
      <el-table-column
        prop="platform"
        :label="$t('workspace.platform')"
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
            v-if="scope.row.status==='TESTED'"
            class="el-icon-success tested"
          />
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('workspace.operatioin')">
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
          <span id="projectId">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="cleafix" />
    <div class="pagebar">
      <pagination
        :table-data="searchListData"
        @getCurrentPageData="getCurrentPageData"
        ref="pagination"
      />
    </div>
    <div class="cleafix" />
  </div>
</template>

<script>
import { Get, Delete, urlPrefix } from '../../tools/tool.js'
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
    getProjectListData () {
      Get('mec/developer/v1/projects/?userId=' + this.userId, '', 'developer').then(res => {
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
    getIcon (fileId) {
      let url = urlPrefix + 'mec/developer/v1/files/' + fileId + '?userId=' + this.userId + '&type=OPENMEP_ECO'
      return url
    },
    handleDelete (item) {
      this.$confirm(this.$t('devTools.deleteList'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        Delete('mec/developer/v1/projects/' + item.id + '?userId=' + this.userId).then(res => {
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
    enterQueryFun () {
      let selectFunctionData = []
      this.pageData.forEach(item => {
        if (item.name.toLowerCase().indexOf(this.enterQuery.toLowerCase()) !== -1) {
          selectFunctionData.push(item)
        }
      })
      if (this.enterQuery) {
        this.searchListData = selectFunctionData
      } else {
        this.searchListData = this.pageData
      }
    },
    selectFunction (val) {
      this.enterQuery = ''
      let selectFunctionData = []
      this.pageData.forEach(item => {
        if (item.codeLanguage === val) {
          selectFunctionData.push(item)
        }
      })
      if (val) {
        this.searchListData = selectFunctionData
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
      font-size: 12px;
      th,
      tr {
        background-color: #f5f5f5;
      }
    }
    tbody {
      td {
        padding: 8px !important;
        .el-button--text {
          color: #5b7ede !important;
        }
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
