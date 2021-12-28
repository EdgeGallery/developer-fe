<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="profileManagement padding_default">
    <div class="title_top title_left defaultFontBlod">
      {{ $t('breadCrumb.profileMgmt') }}
      <span class="line_bot1" />
      <el-button
        v-if="isAdmin"
        class="createimage_btn linearGradient2 image_mgmt"
        @click="addNewProfile"
      >
        <em class="new_icon" />
        {{ $t('system.profileMgmt.addProfile') }}
      </el-button>
    </div>
    <div class="list clear">
      <div class="title">
        <span>
          <el-input
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('system.name')"
            class="search_input"
            @keyup.enter.native="searchListData"
            @clear="searchListData"
            @change="searchListData"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="searchListData"
            />
          </el-input>
        </span>
      </div>
      <el-table
        v-loading="loading"
        row-key="hostId"
        :data="allListData"
        class="tableStyle"
      >
        <el-table-column
          prop="name"
          :label="$t('system.name')"
          min-width="10%"
        />
        <el-table-column
          :label="$t('api.description')"
          min-width="20%"
        >
          <template
            slot-scope="scope"
          >
            {{ language==='cn'?scope.row.description :scope.row.descriptionEn }}
          </template>
        </el-table-column>
        <el-table-column
          prop="appList"
          :label="$t('system.profileMgmt.appList')"
          min-width="20%"
        />
        <el-table-column
          prop="type"
          :label="$t('system.type')"
          min-width="15%"
        />
        <el-table-column
          prop="industry"
          :label="$t('workspace.industry')"
          min-width="10%"
        />
        <el-table-column
          :label="$t('workspace.operation')"
          min-width="20%"
          v-if="isAdmin"
        >
          <template slot-scope="scope">
            <el-button
              :loading="loading"
              class="operations_btn"
              @click="modifyFile(scope.row)"
            >
              {{ $t('api.modify') }}
            </el-button>
            <el-button
              :loading="loading"
              class="operations_btn"
              @click="handleDelete(scope.row)"
            >
              {{ $t('devTools.delete') }}
            </el-button>
            <el-button
              :loading="loading"
              class="operations_btn"
              @click="download(scope.row)"
            >
              {{ $t('common.download') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty_img">
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
    </div>
    <addProfileDlg
      :profile-id="profileId"
      :is-edit="isEdit"
      :is-visible="isVisible"
      @closedig="closedig"
      @getListData="getListData"
    />
  </div>
</template>

<script>
import pagination from '../../../components/common/Pagination.vue'
import { profileMgmtApi } from '@/tools/api.js'
import { common } from '../../../tools/common.js'
import addProfileDlg from './addProfileDlg.vue'

export default {
  name: 'ProfileMgmt',
  components: {
    pagination, addProfileDlg
  },
  data () {
    return {
      limitSize: 12,
      offsetPage: 0,
      listTotal: 0,
      allListData: [],
      enterQuery: '',
      loading: false,
      userName: sessionStorage.getItem('userName'),
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      screenHeight: document.body.clientHeight,
      isEdit: false,
      profileId: '',
      isVisible: false,
      isAdmin: false
    }
  },
  mounted () {
    this.setDivHeight()
    this.initUser()
    this.getListData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    $route (to, from) {
      this.getListData()
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getListData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getListData()
    }
  },
  methods: {
    initUser () {
      this.userId = sessionStorage.getItem('userId')
      let _authorities = sessionStorage.getItem('userAuthorities')
      if (_authorities && _authorities.length > 0) {
        this.isAdmin = _authorities.includes('ROLE_DEVELOPER_ADMIN')
      }
    },
    closedig () {
      this.isVisible = false
    },
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'profileManagement', 261)
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    searchListData () {
      sessionStorage.setItem('currentPage', 1)
      this.getListData()
    },
    getListData () {
      profileMgmtApi.getProfileDataList({ name: this.enterQuery, limit: this.limitSize, offset: this.offsetPage }).then(res => {
        this.allListData = res.data.results || []
        this.listTotal = res.data.total
        if (this.allListData.length > 0) {
          this.allListData.forEach(item => {
            item.appList = item.appList.toString()
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    addNewProfile () {
      this.isEdit = false
      this.isVisible = true
    },
    modifyFile (row) {
      this.isEdit = true
      this.isVisible = true
      this.profileId = row.id
    },
    handleDelete (row) {
      this.$confirm(this.$t('system.deleteConfirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        profileMgmtApi.deleteOneProfile(row.id).then(() => {
          this.loading = false
          this.getListData()
        })
      })
    },
    download (row) {
      profileMgmtApi.downLoadProfileApi(row.id, row.name).then(res => {
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    sessionStorage.removeItem('currentPage')
    next()
  }
}
</script>

<style lang="less">
.profileManagement {
  .createimage_btn{
    position: absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    padding: 0 35px;
    .new_icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url('../../../assets/images/work_new_project.png');
      margin-right: 3px;
      position: relative;
      top: 2px;
    }
  }
  .list {
    border-radius: 16px;
    background: #fff;
    padding: 30px 60px;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
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
          padding: 8px;
          .el-button--text {
            color: #5b7ede;
          }
          .cell{
            padding-left: 0;
          }
        }
      }
    }
  }
}
</style>
