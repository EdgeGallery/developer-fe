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
          id="btn_image_synchronize"
          class="synchronize bgBtn"
          @click="synchronizeContainerImage"
          :loading="synchronizeImageLoading"
          v-if="isAdmin"
        >
          {{ !synchronizeImageLoading?$t('devSystem.imageMgmt.containerImage.synchronize'):$t('devSystem.imageMgmt.containerImage.syncing') }}
        </el-button>
      </div>
      <el-table
        :data="imageListData"
        @sort-change="doSort"
        :default-sort="{prop: 'uploadTime', order: 'descending'}"
        v-loading="dataLoading"
        style="width: 100%"
        class="common-table default_dropdown"
      >
        <el-table-column
          prop="imageName"
          :label="$t('devSystem.imageMgmt.imgName')"
          min-width="14%"
        >
          <template slot-scope="scope">
            {{ scope.row.imageName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="imagePath"
          min-width="24%"
          :label="$t('devSystem.imageMgmt.imgPath')"
        />
        <el-table-column
          prop="userName"
          min-width="9%"
          :label="$t('devSystem.imageMgmt.userName')"
        />
        <el-table-column
          prop="imageVersion"
          min-width="9%"
          :label="$t('devSystem.imageMgmt.osVersion')"
        />
        <el-table-column
          prop="uploadTime"
          min-width="12%"
          :label="$t('devSystem.imageMgmt.uploadTime')"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.uploadTime?scope.row.uploadTime.substring(0,10):'' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="10%"
          :label="$t('devSystem.imageMgmt.typeValue.isPublic')"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.imageType"
              active-color="#13ce66"
              inactive-color="#c0ccda"
              :disabled="scope.row.userId!==userId"
              active-value="public"
              inactive-value="private"
              @change="changeImageType(scope.row.imageId,scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.operation')"
          min-width="22%"
        >
          <template slot-scope="scope">
            <el-button
              id="btn_image_container_detail"
              @click="handleView(scope.row)"
              class="operation-btn-text"
            >
              {{ $t('common.detail') }}
            </el-button>
            <el-button
              id="btn_image_container_download"
              @click="handleDownload(scope.row)"
              class="operation-btn-text"
            >
              {{ $t('common.download') }}
            </el-button>
            <el-button
              id="btn_image_container_delete"
              :disabled="!isAdmin && scope.row.userId!==userId"
              @click="handleDelete(scope.row)"
              class="operation-btn-text"
            >
              {{ $t('common.delete') }}
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
    <ViewContainerImage
      :show-dlg="showViewImageDlg"
      :image-data="currentImageData"
      @processCloseViewImage="processCloseViewImage"
    />
  </div>
</template>
<script>
import Search from './ImageSearch.vue'
import ViewContainerImage from './ViewContainerImage.vue'
import Pagination from '@/components/Pagination.vue'
import { imageMgmtService } from '@/api/developerApi.js'

export default {
  name: 'ImageMgmt',
  components: {
    Search, ViewContainerImage, Pagination
  },
  data () {
    return {
      userId: '',
      isAdmin: false,
      dataLoading: false,
      searchCondition: {
        imageName: '',
        userId: '',
        uploadTimeBegin: '',
        uploadTimeEnd: '',
        limit: 12,
        offset: 0,
        sortBy: 'upload_time',
        sortOrder: 'desc'
      },
      limitSize: 12,
      offsetPage: 0,
      listTotal: 0,
      imageListData: [],
      showViewImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      currentIndex: -1,
      synchronizeImageLoading: false
    }
  },
  watch: {
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
    this.getImageDataList()
  },
  methods: {
    changeImageType (imageId, imageData) {
      imageMgmtService.modifyContainerImage(imageData, imageId).then(() => {
        this.$message.success(this.$t('promptInformation.editDataSuccess'))
      }).catch(() => {
        this.$message.error(this.$t('devSystem.imageMgmt.tip.modifyImgFailed'))
      })
    },
    synchronizeContainerImage () {
      this.synchronizeImageLoading = true
      sessionStorage.setItem('synchronizeImage', this.synchronizeImageLoading)
      imageMgmtService.synchronizeContainerImageApi().then(res => {
        this.synchronizeImageLoading = false
        sessionStorage.setItem('synchronizeImage', this.synchronizeImageLoading)
        if (res.data === 'synchronized successfully!') {
          this.$eg_messagebox(this.$t('devSystem.imageMgmt.containerImage.synchronized'), 'success')
        } else if (res.data === 'already the latest image list!') {
          this.$eg_messagebox(this.$t('devSystem.imageMgmt.containerImage.latestImage'), 'success')
        } else if (res.data === 'harbor repo no images!') {
          this.$eg_messagebox(this.$t('devSystem.imageMgmt.containerImage.noImage'), 'success')
        }
        this.getImageDataList()
      }).catch(() => {
        this.synchronizeImageLoading = false
        sessionStorage.setItem('synchronizeImage', this.synchronizeImageLoading)
        this.$eg_messagebox(this.$t('devSystem.imageMgmt.containerImage.imageFailed'), 'error')
      })
    },
    initUser () {
      this.userId = sessionStorage.getItem('userId')
      this.searchCondition.userId = this.userId
      let _authorities = sessionStorage.getItem('userAuthorities')
      if (_authorities && _authorities.length > 0) {
        this.isAdmin = _authorities.includes('ROLE_DEVELOPER_ADMIN')
      }
    },
    getSearchData (searchFormData) {
      this.searchCondition.imageName = searchFormData.systemName
      this.searchCondition.uploadTimeBegin = ''
      this.searchCondition.uploadTimeEnd = ''
      if (searchFormData.searchTimeRange && searchFormData.searchTimeRange.length === 2) {
        this.searchCondition.uploadTimeBegin = searchFormData.searchTimeRange[0]
        this.searchCondition.uploadTimeEnd = searchFormData.searchTimeRange[1]
      }
      this.getImageDataList()
    },
    doSort (column) {
      if (column.prop == null || column.order == null) {
        this.searchCondition.sortBy = 'upload_time'
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
        this.listTotal = response.data.total
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$eg_messagebox(this.$t('devSystem.imageMgmt.tip.queryImgFailed'), 'error')
      })
    },
    buildQueryReq () {
      let _queryReq = this.searchCondition
      this.searchCondition.limit = this.limitSize
      this.searchCondition.offset = this.offsetPage
      return _queryReq
    },
    handleView (row) {
      this.currentImageData = row
      this.showViewImageDlg = true
    },
    processCloseViewImage () {
      this.showViewImageDlg = false
    },
    handleDelete (row) {
      this.$eg_messagebox(this.$t('devSystem.imageMgmt.tip.confirmDeleteImage'), 'warning', this.$t('common.cancel'), this.$t('common.confirm')).then(() => {
        this.doDeleteImage(row.imageId)
      })
    },
    doDeleteImage (imageId) {
      imageMgmtService.deleteContainerImage(imageId).then(() => {
        this.$eg_messagebox(this.$t('devTools.deleteSucc'), 'success')
        this.getImageDataList()
      }).catch(() => {
        this.$eg_messagebox(this.$t('devSystem.imageMgmt.tip.deleteImgFailed'), 'error')
      })
    },
    handleDownload (row) {
      this.$eg_messagebox(this.$t('devSystem.imageMgmt.tip.confirmDownloadImage'), 'info', this.$t('common.cancel'), this.$t('common.confirm')).then(() => {
        window.location.href = imageMgmtService.downloadContainerImageUrl(row.imageId)
      })
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    }
  },
  beforeRouteEnter (to, from, next) {
    sessionStorage.removeItem('currentPage')
    next()
  }
}
</script>
<style lang="less">
.containerlist{
  .cls_imagelist .title{
    position: relative;
    .synchronize{
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
