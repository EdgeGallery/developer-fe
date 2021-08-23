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
  <div class="containerlist">
    <div
      class="cls_imagelist clear"
      id="div_imagelist"
    >
      <div class="title">
        <Search
          @getSearchData="getSearchData"
        />
        <el-button
          class="Synchronize bgBtn"
          @click="synchronizeContainerImage"
          :loading="synchronizeImageLoading"
          v-if="isAdmin"
        >
          {{ !synchronizeImageLoading?$t('system.imageMgmt.containerImage.synchronize'):$t('system.imageMgmt.containerImage.syncing') }}
        </el-button>
      </div>
      <el-table
        :data="imageListData"
        @sort-change="doSort"
        :default-sort="{prop: 'createTime', order: 'descending'}"
        v-loading="dataLoading"
        style="width: 100%"
        class="tableStyle default_dropdown"
        @filter-change="filterChange"
      >
        <el-table-column
          prop="imageName"
          :label="$t('system.imageMgmt.imgName')"
          show-overflow-tooltip
          min-width="12%"
        >
          <template slot-scope="scope">
            {{ scope.row.imageName }}
          </template>
        </el-table-column>
        <el-table-column
          :column-key="'imageType'"
          min-width="12%"
          :label="$t('system.imageMgmt.imgType')"
          :formatter="convertType"
          show-overflow-tooltip
          :filters="typeData"
        />
        <el-table-column
          prop="userName"
          min-width="12%"
          :label="$t('system.imageMgmt.userName')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="imageVersion"
          min-width="10%"
          :label="$t('system.imageMgmt.osVersion')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="createTime"
          min-width="13%"
          sortable="custom"
          :label="$t('system.imageMgmt.createTime')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.createTime?scope.row.createTime.substring(0,10):'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="uploadTime"
          min-width="13%"
          :label="$t('system.imageMgmt.uploadTime')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.uploadTime?scope.row.uploadTime.substring(0,10):'' }}
          </template>
        </el-table-column>
        <el-table-column
          :column-key="'imageStatus'"
          min-width="13%"
          :label="$t('common.status')"
          :formatter="convertStatus"
          show-overflow-tooltip
          :filters="statusData"
        />
        <el-table-column
          :label="$t('common.operation')"
          min-width="15%"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleView(scope.row)"
              class="operations_btn"
            >
              {{ $t('devTools.detail') }}
            </el-button>
            <el-button
              @mouseenter.native="showMoreBtnFun(scope.$index)"
              @mouseleave.native="showMoreBtnFun(-1)"
              class="operations_btn"
            >
              {{ $t('common.more') }}
              <el-collapse-transition>
                <div
                  v-show="currentIndex===scope.$index"
                  class="btn_div el-icon-caret-top"
                  @mouseenter="showMoreBtnFun(scope.$index)"
                  @mouseleave="showMoreBtnFun(-1)"
                >
                  <ul class="dropdown_list">
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        @click="handleEdit(scope.row)"
                      >
                        {{ $t('common.edit') }}
                      </el-button>
                    </li>
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status==='UPLOADING' || scope.row.status==='UPLOADING_MERGING'"
                        @click="handleDelete(scope.row)"
                      >
                        {{ $t('common.delete') }}
                      </el-button>
                    </li>
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status==='UPLOADING' || scope.row.status==='UPLOADING_MERGING'"
                        @click="handleUpload(scope.row)"
                      >
                        {{ $t('system.imageMgmt.operation.upload') }}
                      </el-button>
                    </li>
                    <li>
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status!=='UPLOAD_SUCCEED'"
                        @click="handleDownload(scope.row)"
                      >
                        {{ $t('common.download') }}
                      </el-button>
                    </li>
                  </ul>
                </div>
              </el-collapse-transition>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebar">
        <pagination
          :table-data="imageListData"
          :list-total="listTotal"
          @getCurrentPageData="getCurrentPageData"
          ref="pagination"
        />
      </div>
    </div>
    <EditContainerImage
      v-model="showEditImageDlg"
      :image-data="currentImageData"
      @cancelEditImageDlg="cancelEditImageDlg"
      @processEditImageSuccess="processEditImageSuccess"
    />
    <ViewContainerImage
      :show-dlg="showViewImageDlg"
      :image-data="currentImageData"
      @processCloseViewImage="processCloseViewImage"
    />
    <UploadContainerImage
      v-if="showUploadImageDlg"
      :show-dlg="showUploadImageDlg"
      :image-data="currentImageData"
      @processCloseUploadImageDlg="processCloseUploadImageDlg"
    />
  </div>
</template>
<script>
import Search from './ImageSearch.vue'
import EditContainerImage from './EditContainerImage.vue'
import ViewContainerImage from './ViewContainerImage.vue'
import UploadContainerImage from './UploadContainerImage.vue'
import Pagination from '../../../components/common/Pagination.vue'
import { imageMgmtService } from '../../../tools/api.js'
import { common } from '../../../tools/common.js'

export default {
  name: 'ImageMgmt',
  components: {
    Search, EditContainerImage, UploadContainerImage, ViewContainerImage, Pagination
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      userId: '',
      isAdmin: false,
      dataLoading: false,
      searchCondition: {
        imageName: '',
        imageType: '',
        userId: '',
        imageStatus: '',
        createTimeBegin: '',
        createTimeEnd: '',
        limit: 12,
        offset: 0,
        sortBy: 'create_time',
        sortOrder: 'desc'
      },
      limitSize: 12,
      offsetPage: 0,
      listTotal: 0,
      imageListData: [],
      showEditImageDlg: false,
      showUploadImageDlg: false,
      showViewImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      statusData: [],
      typeData: [],
      currentIndex: -1,
      synchronizeImageLoading: false
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.initOptionList()
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getImageDataList()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getImageDataList()
    }
  },
  mounted () {
    if (sessionStorage.getItem('synchronizeImage') === 'true') {
      this.synchronizeImageLoading = true
    } else {
      this.synchronizeImageLoading = false
    }
    this.initUser()
    this.initOptionList()
    this.getImageDataList()
  },
  methods: {
    synchronizeContainerImage () {
      this.$eg_messagebox({
        type: 'info',
        title: '',
        desc: this.$t('system.imageMgmt.containerImage.pleaseWait'),
        cancelText: this.$t('common.cancelText')
      })
      this.synchronizeImageLoading = true
      sessionStorage.setItem('synchronizeImage', this.synchronizeImageLoading)
      imageMgmtService.synchronizeContainerImageApi().then(res => {
        this.synchronizeImageLoading = false
        sessionStorage.setItem('synchronizeImage', this.synchronizeImageLoading)
        if (res.data === 'synchronized successfully!') {
          this.$eg_messagebox({
            type: 'success',
            title: '',
            desc: this.$t('system.imageMgmt.containerImage.synchronized'),
            cancelText: this.$t('common.cancelText')
          })
        } else if (res.data === 'already the latest image list!') {
          this.$eg_messagebox({
            type: 'success',
            title: '',
            desc: this.$t('system.imageMgmt.containerImage.latestImage'),
            cancelText: this.$t('common.cancelText')
          })
        } else if (res.data === 'harbor repo no images!') {
          this.$eg_messagebox({
            type: 'success',
            title: '',
            desc: this.$t('system.imageMgmt.containerImage.noImage'),
            cancelText: this.$t('common.cancelText')
          })
        }
        this.getImageDataList()
      }).catch(() => {
        this.synchronizeImageLoading = false
        sessionStorage.setItem('synchronizeImage', this.synchronizeImageLoading)
        this.$eg_messagebox({
          type: 'error',
          title: '',
          desc: this.$t('system.imageMgmt.containerImage.imageFailed'),
          cancelText: this.$t('common.cancelText')
        })
      })
    },
    showMoreBtnFun (index) {
      this.currentIndex = index
    },
    filterChange (filters) {
      if (filters.imageStatus && filters.imageStatus.length >= 1) {
        this.searchCondition.imageStatus = filters.imageStatus.join(',')
      } else if (filters.imageStatus && filters.imageStatus.length === 0) {
        this.searchCondition.imageStatus = ''
      }
      if (filters.imageType && filters.imageType.length >= 1) {
        this.searchCondition.imageType = filters.imageType.join(',')
      } else if (filters.imageType && filters.imageType.length === 0) {
        this.searchCondition.imageType = ''
      }
      this.getImageDataList()
    },
    initUser () {
      this.userId = sessionStorage.getItem('userId')
      this.searchCondition.userId = this.userId
      let _authorities = sessionStorage.getItem('userAuthorities')
      if (_authorities && _authorities.length > 0) {
        this.isAdmin = _authorities.includes('ROLE_DEVELOPER_ADMIN')
      }
    },
    initOptionList () {
      this.statusData = [
        { text: this.$t('system.imageMgmt.statusValue.uploadWait'), value: 'UPLOAD_WAIT' },
        { text: this.$t('system.imageMgmt.statusValue.uploading'), value: 'UPLOADING' },
        { text: this.$t('system.imageMgmt.statusValue.merging'), value: 'UPLOADING_MERGING' },
        { text: this.$t('system.imageMgmt.statusValue.uploadSucceeded'), value: 'UPLOAD_SUCCEED' },
        { text: this.$t('system.imageMgmt.statusValue.uploadFailed'), value: 'UPLOAD_FAILED' },
        { text: this.$t('system.imageMgmt.statusValue.uploadCancelled'), value: 'UPLOAD_CANCELLED' }
      ]
      this.typeData = [
        { text: this.$t('system.imageMgmt.typeValue.public'), value: 'public' },
        { text: this.$t('system.imageMgmt.typeValue.private'), value: 'private' }
      ]
    },
    getSearchData (searchFormData) {
      this.searchCondition.imageName = searchFormData.systemName
      this.searchCondition.createTimeBegin = ''
      this.searchCondition.createTimeEnd = ''
      if (searchFormData.createTimeRange && searchFormData.createTimeRange.length === 2) {
        this.searchCondition.createTimeBegin = searchFormData.createTimeRange[0]
        this.searchCondition.createTimeEnd = searchFormData.createTimeRange[1]
      }
      this.getImageDataList()
    },
    doSort (column) {
      if (column.prop == null || column.order == null) {
        this.searchCondition.sortBy = 'create_time'
        this.searchCondition.sortOrder = 'desc'
      } else {
        this.prop = column.prop
        if (column.order === 'ascending') {
          this.searchCondition.sortOrder = 'asc'
        } else {
          this.searchCondition.sortOrder = 'desc'
        }
      }
      this.getImageDataList()
    },
    getImageDataList () {
      this.dataLoading = true
      imageMgmtService.getContainerImageDataList(this.buildQueryReq()).then(response => {
        this.imageListData = response.data.results
        this.imageListData.forEach(item => {
          item.createTime = common.dateChange(item.createTime)
          item.uploadTime = common.dateChange(item.uploadTime)
        })
        this.listTotal = response.data.total
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('system.imageMgmt.tip.queryImgFailed'))
      })
    },
    buildQueryReq () {
      let _queryReq = this.searchCondition
      this.searchCondition.limit = this.limitSize
      this.searchCondition.offset = this.offsetPage
      return _queryReq
    },
    convertType (row) {
      if (row.imageType) {
        let imgTypeOption = this.typeData.find(item => item.value === row.imageType)
        if (imgTypeOption) {
          return imgTypeOption.text
        }
      }

      return this.$t('common.unknown')
    },
    convertStatus (row) {
      if (row.imageStatus) {
        let statusOption = this.statusData.find(item => item.value === row.imageStatus)
        if (statusOption) {
          return statusOption.text
        }
      }

      return this.$t('common.unknown')
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
        this.doDeleteImage(row.imageId)
      })
    },
    doDeleteImage (imageId) {
      imageMgmtService.deleteContainerImage(imageId).then(() => {
        this.$message.success(this.$t('devTools.deleteSucc'))
        this.getImageDataList()
      }).catch(() => {
        this.$message.error(this.$t('system.imageMgmt.tip.deleteImgFailed'))
      })
    },
    handleUpload (row) {
      if (row.status === 'UPLOAD_SUCCEED') {
        this.$confirm(this.$t('system.imageMgmt.tip.confirmReUploadImage'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.currentImageData = row
          this.showUploadImageDlg = true
        })
      } else {
        this.currentImageData = row
        this.showUploadImageDlg = true
      }
    },
    handleDownload (row) {
      this.$confirm(this.$t('system.imageMgmt.tip.confirmDownloadImage'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        window.location.href = imageMgmtService.downloadContainerImageUrl(row.imageId)
      })
    },
    processCloseUploadImageDlg () {
      this.showUploadImageDlg = false
      this.getImageDataList()
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    }
  }
}
</script>
<style lang="less">
.containerlist{
  border-radius: 16px;
  background: #fff;
  padding: 30px 60px;
  .cls_imagelist .title{
    position: relative;
    .Synchronize{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
