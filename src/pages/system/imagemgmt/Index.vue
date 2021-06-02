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
  <div class="imagelist padding_default">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.system') }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.systemImgMgmt') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="cls_imagelist clear"
      id="div_imagelist"
    >
      <div>
        <el-button
          id="addBtn"
          @click.native.prevent="handleAddImg()"
          type="primary"
        >
          {{ $t('system.imageMgmt.operation.newImg') }}
        </el-button>
      </div>
      <div class="title">
        <el-tabs
          v-model="imageType"
          type="card"
          @tab-click="handleChangeTypeTab"
        >
          <el-tab-pane
            :label="$t('common.all')"
            name="All"
          />
          <el-tab-pane
            :label="$t('system.imageMgmt.typeValue.private')"
            name="private"
          />
          <el-tab-pane
            :label="$t('system.imageMgmt.typeValue.public')"
            name="public"
          />
        </el-tabs>
        <Search
          @getSearchData="getSearchData"
        />
      </div>
      <el-table
        :data="imageListData"
        @sort-change="doSort"
        :default-sort="{prop: 'createTime', order: 'descending'}"
        v-loading="dataLoading"
        border
        stripe
        size="small"
        style="width: 100%;"
        header-cell-class-name="headerStyle"
      >
        <el-table-column
          prop="systemName"
          sortable="custom"
          :label="$t('system.imageMgmt.imgName')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleView(scope.row)"
            >
              {{ scope.row.systemName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          :label="$t('system.imageMgmt.imgType')"
          :formatter="convertType"
          show-overflow-tooltip
        />
        <el-table-column
          prop="userName"
          width="120"
          :label="$t('system.imageMgmt.userName')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="operateSystem"
          width="135"
          :label="$t('system.imageMgmt.osName')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="version"
          width="120"
          :label="$t('system.imageMgmt.osVersion')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="createTime"
          width="200"
          sortable="custom"
          :label="$t('system.imageMgmt.createTime')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="uploadTime"
          width="200"
          :label="$t('system.imageMgmt.uploadTime')"
          show-overflow-tooltip
        />
        <el-table-column
          width="150"
          :label="$t('common.status')"
          :formatter="convertStatus"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('common.operation')"
          width="225"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              id="editBtn"
              v-if="isAdmin || userId===scope.row.userId"
              @click.native.prevent="handleEdit(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              v-if="isAdmin || userId===scope.row.userId"
              :disabled="scope.row.status==='UPLOADING'"
              id="deleteBtn"
              @click.native.prevent="handleDelete(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('common.delete') }}
            </el-button>
            <el-button
              v-if="isAdmin || userId===scope.row.userId"
              :disabled="scope.row.status==='UPLOADING'"
              id="uploadBtn"
              @click.native.prevent="handleUpload(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('system.imageMgmt.operation.upload') }}
            </el-button>
            <el-button
              v-if="isAdmin"
              :disabled="scope.row.status!=='UPLOAD_SUCCEED'"
              id="publishBtn"
              @click.native.prevent="handlePublish(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('system.imageMgmt.operation.publish') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBar">
        <el-pagination
          background
          class="rt"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page="pageCtrl.currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageCtrl.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageCtrl.totalNum"
          v-if="pageCtrl.totalNum!=0"
        />
      </div>
    </div>
    <EditImage
      :show-dlg="showEditImageDlg"
      :image-data="currentImageData"
      @cancelEditImageDlg="cancelEditImageDlg"
      @processEditImageSuccess="processEditImageSuccess"
    />
    <ViewImage
      :show-dlg="showViewImageDlg"
      :image-data="currentImageData"
      @processCloseViewImage="processCloseViewImage"
    />
    <UploadImage
      v-if="showUploadImageDlg"
      :show-dlg="showUploadImageDlg"
      :image-data="currentImageData"
      @processCloseUploadImageDlg="processCloseUploadImageDlg"
    />
  </div>
</template>
<script>
import Search from './ImageSearch.vue'
import EditImage from './EditImage.vue'
import ViewImage from './ViewImage.vue'
import UploadImage from './UploadImage.vue'
import { imageMgmtService } from '../../../tools/api.js'

export default {
  name: 'ImageMgmt',
  components: {
    Search, EditImage, UploadImage, ViewImage
  },
  data () {
    return {
      userId: '',
      isAdmin: false,

      dataLoading: false,
      searchCondition: {
        systemName: '',
        operateSystem: '',
        status: 'All',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      pageCtrl: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      sortCtrl: {
        sortBy: 'createTime',
        sortOrder: 'DESC'
      },
      imageListData: [],

      imageType: 'All',
      imageTypeOptionList: [],
      statusOptionList: [],

      showEditImageDlg: false,
      showUploadImageDlg: false,
      showViewImageDlg: false,
      currentImageData: {}
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.initOptionList()
    }
  },
  mounted () {
    this.initUser()
    this.initOptionList()
    this.getImageDataList()
  },
  methods: {
    initUser () {
      this.userId = sessionStorage.getItem('userId')
      let _authorities = sessionStorage.getItem('userAuthorities')
      if (_authorities && _authorities.length > 0) {
        this.isAdmin = _authorities.includes('ROLE_DEVELOPER_ADMIN')
      }
    },
    initOptionList () {
      this.imageTypeOptionList = [
        { value: 'public', label: this.$t('system.imageMgmt.typeValue.public') },
        { value: 'private', label: this.$t('system.imageMgmt.typeValue.private') }
      ]
      this.statusOptionList = [
        { value: 'UPLOAD_WAIT', label: this.$t('system.imageMgmt.statusValue.uploadWait') },
        { value: 'UPLOADING', label: this.$t('system.imageMgmt.statusValue.uploading') },
        { value: 'UPLOAD_SUCCEED', label: this.$t('system.imageMgmt.statusValue.uploadSucceeded') },
        { value: 'UPLOAD_FAILED', label: this.$t('system.imageMgmt.statusValue.uploadFailed') },
        { value: 'PUBLISHED', label: this.$t('system.imageMgmt.statusValue.published') }
      ]
    },
    handlePageSizeChange (val) {
      this.pageCtrl.currentPage = 1
      this.pageCtrl.pageSize = val
      this.getImageDataList()
    },
    handleCurrentPageChange (val) {
      this.pageCtrl.currentPage = val
      this.getImageDataList()
    },
    getSearchData (searchFormData) {
      this.pageCtrl.currentPage = 1
      this.searchCondition.systemName = searchFormData.systemName
      this.searchCondition.operateSystem = searchFormData.operateSystem
      this.searchCondition.status = searchFormData.status
      this.searchCondition.createTimeBegin = ''
      this.searchCondition.createTimeEnd = ''
      if (searchFormData.createTimeRange && searchFormData.createTimeRange.length === 2) {
        this.searchCondition.createTimeBegin = searchFormData.createTimeRange[0]
        this.searchCondition.createTimeEnd = searchFormData.createTimeRange[1]
      }
      this.getImageDataList()
    },
    handleChangeTypeTab (tab, event) {
      this.pageCtrl.currentPage = 1
      this.getImageDataList()
    },
    doSort (sortRule) {
      if (sortRule.order) {
        let _ascendingFlag = sortRule.order === 'ascending'
        this.sortCtrl.sortBy = sortRule.prop
        this.sortCtrl.sortOrder = _ascendingFlag ? 'ASC' : 'DESC'
      } else {
        this.sortCtrl.sortBy = 'createTime'
        this.sortCtrl.sortOrder = 'DESC'
      }
      this.pageCtrl.currentPage = 1
      this.getImageDataList()
    },
    getImageDataList () {
      this.dataLoading = true
      imageMgmtService.getImageDataList(this.buildQueryReq(), this.userId).then(response => {
        this.imageListData = response.data.imageList
        this.pageCtrl.totalNum = response.data.totalCount

        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('system.imageMgmt.tip.queryImgFailed'))
      })
    },
    buildQueryReq () {
      let _queryReq = this.searchCondition
      _queryReq.type = this.imageType

      let _queryCtrl = {
        'offset': (this.pageCtrl.currentPage - 1) * this.pageCtrl.pageSize,
        'limit': this.pageCtrl.pageSize,
        'sortBy': this.sortCtrl.sortBy,
        'sortOrder': this.sortCtrl.sortOrder
      }
      _queryReq.queryCtrl = _queryCtrl

      return _queryReq
    },
    convertType (row) {
      if (row.type) {
        let imgTypeOption = this.imageTypeOptionList.find(item => item.value === row.type)
        if (imgTypeOption) {
          return imgTypeOption.label
        }
      }

      return this.$t('common.unknown')
    },
    convertStatus (row) {
      if (row.status) {
        let statusOption = this.statusOptionList.find(item => item.value === row.status)
        if (statusOption) {
          return statusOption.label
        }
      }

      return this.$t('common.unknown')
    },
    handleAddImg () {
      this.currentImageData = {}
      this.showEditImageDlg = true
    },
    handleEdit (row) {
      this.currentImageData = row
      this.showEditImageDlg = true
    },
    cancelEditImageDlg () {
      this.showEditImageDlg = false
    },
    processEditImageSuccess () {
      this.showEditImageDlg = false
      this.getImageDataList()
    },
    handleView (row) {
      this.currentImageData = row
      this.showViewImageDlg = true
    },
    processCloseViewImage () {
      this.showViewImageDlg = false
    },
    handleDelete (row) {
      this.$confirm(this.$t('system.imageMgmt.tip.confirmDeleteImage'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.doDeleteImage(row.systemId)
      })
    },
    doDeleteImage (systemId) {
      imageMgmtService.deleteImage(systemId, this.userId).then(() => {
        this.pageCtrl.currentPage = 1
        this.getImageDataList()
      }).catch(() => {
        this.$message.error(this.$t('system.imageMgmt.tip.deleteImgFailed'))
      })
    },
    handleUpload (row) {
      this.currentImageData = row
      this.showUploadImageDlg = true
    },
    processCloseUploadImageDlg () {
      this.showUploadImageDlg = false
      this.getImageDataList()
    },
    handlePublish (row) {
      this.$confirm(this.$t('system.imageMgmt.tip.confirmPublishImage'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.doPublishImage(row.systemId)
      })
    },
    doPublishImage (systemId) {
      imageMgmtService.publishImage(systemId, this.userId).then(() => {
        this.getImageDataList()
      }).catch(() => {
        this.$message.error(this.$t('system.imageMgmt.tip.publishImgFailed'))
      })
    }
  }
}
</script>
<style lang="less">
.imagelist{
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .el-form-item__label {
    padding: 0 20px 0 0
  }
  .cls_imagelist{
    min-height: 500px;
    background-color: white;
    padding: 20px;
    .title{
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
    margin-top: 10px;
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
          .cell{
            padding-left: 0;
          }
        }
      }
    }
  }
}
</style>
