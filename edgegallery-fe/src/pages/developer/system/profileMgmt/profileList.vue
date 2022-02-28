<!--
  -  Copyright 2022 Huawei Technologies Co., Ltd.
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
  <div class="profileManagement padding-inner">
    <div class="system-title">
      {{ $t('devSystem.profileMgmt.profileMgmt') }}
      <el-button
        v-if="isAdmin"
        id="btn_addProfile"
        class="common-add-btn rt"
        @click="addNewProfile"
      >
        {{ $t('devSystem.profileMgmt.addProfile') }}
      </el-button>
    </div>
    <div class="list common-div-bg clear">
      <div class="title">
        <span>
          <el-input
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('devSystem.name')"
            class="search_input"
            @keyup.enter.native="searchListData"
            @clear="searchListData"
            @change="searchListData"
            suffix-icon="el-icon-search"
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
        class="common-table"
      >
        <el-table-column
          prop="name"
          :label="$t('devSystem.name')"
          min-width="10%"
        />
        <el-table-column
          :label="$t('common.describe')"
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
          :label="$t('devSystem.profileMgmt.appList')"
          min-width="20%"
        />
        <el-table-column
          prop="type"
          :label="$t('devSystem.type')"
          min-width="15%"
        />
        <el-table-column
          prop="industry"
          :label="$t('devSystem.industry')"
          min-width="10%"
        />
        <el-table-column
          :label="$t('common.operation')"
          min-width="20%"
          v-if="isAdmin"
        >
          <template slot-scope="scope">
            <el-button
              id="btn_profile_edit"
              :loading="loading"
              class="operation-btn-text"
              @click="modifyFile(scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              id="btn_profile_delete"
              :loading="loading"
              class="operation-btn-text"
              @click="handleDelete(scope.row)"
            >
              {{ $t('common.delete') }}
            </el-button>
            <el-button
              id="btn_profile_download"
              :loading="loading"
              class="operation-btn-text"
              @click="download(scope.row)"
            >
              {{ $t('common.download') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty_img">
            <p>{{ $t('common.noData') }}</p>
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
import pagination from '@/components/Pagination.vue'
import { profileMgmtApi } from '@/api/developerApi.js'
import { common } from '@/tools/common.js'
import addProfileDlg from './addProfileDlg.vue'
import { Industry, Type } from '@/tools/commondata.js'

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
      this.getListData()
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
            this.changeIndustry(item)
            this.changeType(item)
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    changeIndustry (item) {
      Industry.forEach(itemFe => {
        if (item.industry === itemFe.value) {
          item.industry = this.language === 'cn' ? itemFe.label[0] : itemFe.label[1]
        }
      })
    },
    changeType (item) {
      Type.forEach(itemFe => {
        if (item.type === itemFe.value) {
          item.type = this.language === 'cn' ? itemFe.label[0] : itemFe.label[1]
        }
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
      this.$confirm(this.$t('devSystem.deleteConfirm'), {
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
        console.log('下载成功')
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
  padding-top: 60px;
  .list {
    .title{
      margin-bottom: 20px;
    }
  }
  .tip-info{
    left: 10px;
    top: 7px;
  }
}
</style>
