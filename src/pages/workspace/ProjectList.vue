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
      <el-input
        v-model="enterQuery"
        :placeholder="$t('workspace.projectName')"
        id="inputProjectName"
        class="enterinput"
        @clear="selectProjectList"
        @change="selectProjectList"
      >
        <i
          slot="suffix"
          class="search_icon"
          @click="selectProjectList"
        />
      </el-input>
    </div>
    <el-table
      v-loading="dataLoading"
      :data="currentData"
      :row-style="{marginBottom:'10px'}"
      style="width: 100%"
      class="tableStyle"
    >
      <el-table-column
        prop="iconUrl"
        :label="$t('workspace.icon')"
        width="115"
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
        min-width="130"
      />
      <el-table-column
        prop="projectType"
        :label="$t('workspace.projectType')"
        width="170"
      >
        <template slot-scope="scope">
          {{ scope.row.projectType==='CREATE_NEW'?$t('workspace.appDevelopment'):$t('workspace.appIntegration') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="version"
        :label="$t('workspace.version')"
        width="95"
      />
      <el-table-column
        prop="provider"
        :label="$t('workspace.provider')"
        width="140"
      />
      <el-table-column
        :label="$t('workspace.deployType')"
        width="155"
      >
        <template slot-scope="scope">
          {{ scope.row.deployPlatform==='KUBERNETES'?$t('workspace.containerImage'):$t('workspace.vmImage') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="platform"
        :label="$t('workspace.platform')"
        width="100"
      />
      <el-table-column
        :label="$t('workspace.createDate')"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.createDate.substr(0,10) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('workspace.status')"
        width="155"
      >
        <template slot-scope="scope">
          <em
            v-if="scope.row.status==='ONLINE'"
            class="online"
          />
          <em
            v-if="scope.row.status==='DEPLOYING'"
            class="deploying"
          />
          <em
            v-if="scope.row.status==='DEPLOYED'"
            class="deployed"
          />
          <em
            v-if="scope.row.status==='DEPLOYED_FAILED'"
            class="deployfailed"
          />
          <em
            v-if="scope.row.status==='TESTING'"
            class="deploying"
          />
          <em
            v-if="scope.row.status==='TESTED'"
            class="tested"
          />
          <em
            v-if="scope.row.status==='RELEASED'"
            class="pubilshed"
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
            class="operation_button"
            @click="handleDelete(scope.row)"
          >
            {{ $t('workspace.remove') }}
          </el-button>
          <el-button
            id="detailBtn"
            class="operation_button"
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
    getProjectListData () {
      Workspace.getProjectListApi(this.userId).then(res => {
        if (res.data) {
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
        }
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.dataLoading = false
        }, 2000)
      })
    },
    // Project icon
    getIcon (fileId) {
      return Workspace.getIconApi(fileId, this.userId)
    },
    // Delete project
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
    // Search according to name
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
  background: #fff;
  border-radius: 12px;
  padding: 30px 60px;
  margin-top: 110px;
  .title {
    font-size: 20px;
    color: #282b33;
    position: relative;
    line-height: 24px;
    margin: 20px 0;
    .el-input {
      width: 300px;
    }
    .enterinput {
      display: inline-block;
      width: 200px;
      .el-input__inner {
        border: 1px solid #380879;
        border-radius: 8px;
      }
      .search_icon{
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url('../../assets/images/work_project_search_icon.png');
        position: relative;
        top: 5px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
    .searchBtn {
      width: 65px;
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
      padding: 0 10px;
    }
    .el-input__inner {
      height: 30px;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
  .icon_pic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .el-table {
    margin-top: 30px;
    .icon_pic {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    tbody {
      td {
        padding: 8px 0 !important;
        em {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 6px;
          position: relative;
          top: 3px;
        }
        .online {
          background: url('../../assets/images/work_project_icon_new.png') no-repeat;
          background-size: cover;
        }
        .deploying {
          background: url('../../assets/images/work_project_icon_testing.png') no-repeat;
          background-size: cover;
        }
        .deployed {
          background: url('../../assets/images/work_project_icon_deployed.png') no-repeat;
          background-size: cover;
        }
        .deployfailed {
          background: url('../../assets/images/work_project_icon_failed.png') no-repeat;
          background-size: cover;
        }
        .tested {
          background: url('../../assets/images/work_project_icon_tested.png') no-repeat;
          background-size: cover;
        }
        .pubilshed {
          background: url('../../assets/images/work_project_icon_published.png') no-repeat;
          background-size: cover;
        }
        .cell {
          padding-left: 0;
          .operation_button{
            padding: 5px !important;
            background: #efefef;
            border: none;
            color: #7a6e8a;
            display: block;
            border-radius: 3px;
          }
          .operation_button + .el-button {
            margin-left: 0px;
            margin-top: 8px;
          }
        }
      }
    }
  }
  #projectId {
    display: none;
  }
}
</style>
