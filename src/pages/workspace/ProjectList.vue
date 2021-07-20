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
        <em
          slot="suffix"
          class="search_icon"
          @click="selectProjectList"
        />
      </el-input>
    </div>
    <el-table
      v-loading="dataLoading"
      :data="allListData"
      :row-style="{marginBottom:'10px'}"
      style="width: 100%"
      class="tableStyle"
      :class="{'tableStyle_en':language=='en'}"
    >
      <el-table-column
        prop="iconUrl"
        :label="$t('workspace.icon')"
        min-width="9.7%"
      >
        <template slot-scope="scope">
          <img
            :src="getIcon(scope.row.iconFileId)"
            class="icon_pic"
            :alt="scope.row.name.length>4?scope.row.name.substr(0,4)+'...':scope.row.name"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('workspace.projectName')"
        min-width="10.3%"
      />
      <el-table-column
        prop="projectType"
        :label="$t('workspace.projectType')"
        min-width="9.9%"
      >
        <template slot-scope="scope">
          {{ scope.row.projectType==='CREATE_NEW'?$t('workspace.appDevelopment'):$t('workspace.appIntegration') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="version"
        :label="$t('workspace.version')"
        min-width="9.7%"
      />
      <el-table-column
        prop="provider"
        :label="$t('workspace.provider')"
        min-width="9.7%"
      />
      <el-table-column
        :label="$t('workspace.deployType')"
        min-width="9.7%"
      >
        <template slot-scope="scope">
          {{ scope.row.deployPlatform==='KUBERNETES'?$t('workspace.containerImage'):$t('workspace.vmImage') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="platform"
        :label="$t('workspace.platform')"
        min-width="9.8%"
      />
      <el-table-column
        :label="$t('workspace.createDate')"
        min-width="9.7%"
      >
        <template slot-scope="scope">
          {{ scope.row.createDate.substr(0,10) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('workspace.status')"
        min-width="9.7%"
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
        min-width="12.0%"
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
        :table-data="allListData"
        :list-total="listTotal"
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
      language: localStorage.getItem('language'),
      pageData: [],
      dataLoading: true,
      form: {
        appName: '',
        status: '',
        beginTime: '',
        endTime: ''
      },
      url: '',
      userId: sessionStorage.getItem('userId'),
      allListData: [],
      enterQuery: '',
      screenHeight: document.body.clientHeight,
      timer: false,
      limitSize: 12,
      offsetPage: 0,
      listTotal: 0
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getProjectListData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getProjectListData()
    }
  },
  mounted () {
    this.getProjectListData()
    this.setDivHeight(this.screenHeight)
  },
  methods: {
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let oDiv = document.getElementsByClassName('workspace')
        if (oDiv[0]) {
          oDiv[0].style.minHeight = (Number(screenHeight) - 261) + 'px'
        }
      })
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    getProjectListData () {
      const qs = { projectName: this.enterQuery, limit: this.limitSize, offset: this.offsetPage }
      Workspace.getProjectListApi(this.userId, qs).then(res => {
        if (res.data) {
          this.allListData = res.data.results || []
          this.listTotal = res.data.total
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
      this.getProjectListData()
    }
  }
}
</script>

<style lang="less">
.projectlist {
  background: #fff;
  border-radius: 12px;
  padding: 30px 60px;
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
  .el-table {
    margin-top: 30px;
    .icon_pic {
      width: 46px;
      height: 46px;
      border-radius: 50%;
    }
    tbody {
      td {
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
            border-radius: 3px;
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
