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
  <div class="vmlist">
    <div
      class="cls_vmlist clear"
      id="div_vmlist"
    >
      <div class="title">
        <Search
          @getSearchData="getSearchData"
        />
      </div>
      <el-table
        :data="imageListData"
        @sort-change="doSort"
        :default-sort="{prop: 'uploadTime', order: 'descending'}"
        v-loading="dataLoading"
        style="width: 100%"
        class="tableStyle default_dropdown"
        :class="{'tableStyle_en':language==='en'}"
        @filter-change="filterChange"
      >
        <el-table-column
          prop="name"
          :label="$t('system.imageMgmt.imgName')"
          show-overflow-tooltip
          min-width="10%"
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          :column-key="'visibleType'"
          min-width="10%"
          :label="$t('system.imageMgmt.imgType')"
          :formatter="convertType"
          show-overflow-tooltip
          :filters="typeData"
        />
        <el-table-column
          prop="imageFormat"
          min-width="9%"
          :label="$t('system.imageMgmt.imgFormat')"
          show-overflow-tooltip
        />
        <el-table-column
          :column-key="'osType'"
          prop="osType"
          min-width="10.5%"
          :label="$t('system.imageMgmt.osName')"
          show-overflow-tooltip
          :filters="osData"
        />
        <el-table-column
          prop="imageSize"
          min-width="10%"
          :label="$t('system.imageMgmt.imageSize')+'(M)'"
        >
          <template slot-scope="scope">
            {{ scope.row.imageSize?(scope.row.imageSize/1024/1024).toFixed(2):'' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="osVersion"
          min-width="6%"
          :label="$t('system.imageMgmt.osVersion')"
          show-overflow-tooltip
        />
        <el-table-column
          prop="uploadTime"
          min-width="11.5%"
          :label="$t('system.imageMgmt.uploadTime')"
          sortable
        >
          <template slot-scope="scope">
            {{ scope.row.uploadTime?scope.row.uploadTime.substring(0,10):'' }}
          </template>
        </el-table-column>
        <el-table-column
          :column-key="'status'"
          min-width="8.5%"
          :label="$t('common.status')"
          :formatter="convertStatus"
          show-overflow-tooltip
          :filters="statusData"
        >
          <template slot-scope="scope">
            {{ convertStatus(scope.row) }}
            <el-tooltip
              v-if="scope.row.status==='UPLOAD_FAILED'"
              effect="light"
              :content="scope.row.errorType ? $t('system.imageMgmt.errorType.' + scope.row.errorType) : $t('system.imageMgmt.errorType.unknown')"
            >
              <em class="el-icon-question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          min-width="11%"
          :label="$t('system.imageMgmt.slimming')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ convertSlim(scope.row) }}
            <el-progress
              v-if="scope.row.imageSlimStatus==='SLIMMING'"
              :percentage="percentages"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('common.operation')"
          min-width="12%"
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
                        :disabled="scope.row.status==='UPLOADING_MERGING' || scope.row.status==='PUBLISHED'"
                        @click="handleUpload(scope.row)"
                      >
                        {{ $t('system.imageMgmt.operation.upload') }}
                      </el-button>
                    </li>
                    <li>
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status!=='UPLOAD_SUCCEED' && scope.row.status!=='PUBLISHED'"
                        @click="handleDownload(scope.row)"
                      >
                        {{ $t('common.download') }}
                      </el-button>
                    </li>
                    <li v-if="isAdmin">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status!=='UPLOAD_SUCCEED'"
                        @click="handlePublish(scope.row)"
                      >
                        {{ $t('system.imageMgmt.operation.publish') }}
                      </el-button>
                    </li>
                    <li v-if="isAdmin || userId===scope.row.userId">
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.status!=='UPLOADING'"
                        @click="handleReset(scope.row)"
                      >
                        {{ $t('common.reset') }}
                      </el-button>
                    </li>
                    <li>
                      <em />
                      <el-button
                        type="text"
                        :disabled="scope.row.imageSlimStatus!=='SLIM_WAIT'"
                        @click="handleSlim(scope.row)"
                      >
                        {{ $t('system.imageMgmt.slimming') }}
                      </el-button>
                    </li>
                  </ul>
                </div>
              </el-collapse-transition>
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
      v-model="showEditImageDlg"
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
import { common } from '../../../tools/common.js'

export default {
  name: 'ImageMgmt',
  components: {
    Search, EditImage, UploadImage, ViewImage
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      userId: '',
      isAdmin: false,
      dataLoading: false,
      searchCondition: {
        name: '',
        osType: '',
        status: '',
        uploadTimeBegin: '',
        uploadTimeEnd: ''
      },
      pageCtrl: {
        totalNum: 0,
        pageSize: 10,
        currentPage: 1
      },
      sortCtrl: {
        sortBy: 'uploadTime',
        sortOrder: 'DESC'
      },
      imageListData: [],
      imageType: '',
      showEditImageDlg: false,
      showUploadImageDlg: false,
      showViewImageDlg: false,
      currentImageData: {},
      screenHeight: document.body.clientHeight,
      osData: [
        { text: 'ubuntu', value: 'ubuntu' },
        { text: 'centos', value: 'centos' },
        { text: 'windows', value: 'windows' },
        { text: 'cirros', value: 'cirros' }
      ],
      statusData: [],
      slimData: [],
      typeData: [],
      currentIndex: -1,
      percentages: 0,
      timer: null
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.initOptionList()
    }
  },
  mounted () {
    this.setDivHeight()
    this.initUser()
    this.initOptionList()
    this.getImageDataList()
  },
  methods: {
    showMoreBtnFun (index) {
      this.currentIndex = index
    },
    filterChange (filters) {
      this.pageCtrl.currentPage = 1
      if (filters.status && filters.status.length >= 1) {
        this.searchCondition.status = filters.status.join(',')
      } else if (filters.status && filters.status.length === 0) {
        this.searchCondition.status = ''
      }
      if (filters.osType && filters.osType.length >= 1) {
        this.searchCondition.osType = filters.osType.join(',')
      } else if (filters.osType && filters.osType.length === 0) {
        this.searchCondition.osType = ''
      }
      if (filters.visibleType && filters.visibleType.length >= 1) {
        this.imageType = filters.visibleType.join(',')
      } else if (filters.visibleType && filters.visibleType.length === 0) {
        this.imageType = ''
      }
      this.getImageDataList()
    },
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'vmlist', 521)
    },
    initUser () {
      this.userId = sessionStorage.getItem('userId')
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
        { text: this.$t('system.imageMgmt.statusValue.uploadCancelled'), value: 'UPLOAD_CANCELLED' },
        { text: this.$t('system.imageMgmt.statusValue.published'), value: 'PUBLISHED' }
      ]
      this.typeData = [
        { text: this.$t('system.imageMgmt.typeValue.public'), value: 'public' },
        { text: this.$t('system.imageMgmt.typeValue.private'), value: 'private' }
      ]
      this.slimData = [
        { text: this.$t('system.imageMgmt.slimStatusText.slimWait'), value: 'SLIM_WAIT' },
        { text: this.$t('system.imageMgmt.slimStatusText.slimming'), value: 'SLIMMING' },
        { text: this.$t('system.imageMgmt.slimStatusText.slimSucceed'), value: 'SLIM_SUCCEED' },
        { text: this.$t('system.imageMgmt.slimStatusText.slimFailed'), value: 'SLIM_FAILED' }
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
      this.searchCondition.name = searchFormData.systemName
      this.searchCondition.visibleType = searchFormData.visibleType
      this.searchCondition.status = searchFormData.status
      this.searchCondition.uploadTimeBegin = ''
      this.searchCondition.uploadTimeEnd = ''
      if (searchFormData.searchTimeRange && searchFormData.searchTimeRange.length === 2) {
        this.searchCondition.uploadTimeBegin = searchFormData.searchTimeRange[0]
        this.searchCondition.uploadTimeEnd = searchFormData.searchTimeRange[1]
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
        this.sortCtrl.sortBy = 'uploadTime'
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
      _queryReq.visibleType = this.imageType

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
      if (row.visibleType) {
        let imgTypeOption = this.typeData.find(item => item.value === row.visibleType)
        if (imgTypeOption) {
          return imgTypeOption.text
        }
      }

      return this.$t('common.unknown')
    },
    convertStatus (row) {
      if (row.status) {
        let statusOption = this.statusData.find(item => item.value === row.status)
        if (statusOption) {
          return statusOption.text
        }
      }

      return this.$t('common.unknown')
    },
    convertSlim (row) {
      if (row.imageSlimStatus) {
        let slimOption = this.slimData.find(item => item.value === row.imageSlimStatus)
        if (slimOption) {
          return slimOption.text
        }
      }
      return this.$t('system.imageMgmt.slimStatusText.slimWait')
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
        this.doDeleteImage(row.id)
      })
    },
    doDeleteImage (id) {
      imageMgmtService.deleteImage(id).then(() => {
        this.pageCtrl.currentPage = 1
        this.getImageDataList()
      }).catch(() => {
        this.$message.error(this.$t('system.imageMgmt.tip.deleteImgFailed'))
      })
    },
    handleUpload (row) {
      let _needPrompt = row.status === 'UPLOAD_SUCCEED' || row.status === 'PUBLISHED' || row.status === 'UPLOADING' || row.status === 'UPLOAD_FAILED'
      if (_needPrompt) {
        let _promptRes = 'system.imageMgmt.tip.confirmReUploadImage'
        if (row.status === 'UPLOADING') {
          _promptRes = 'system.imageMgmt.tip.confirmUploadImageOnUploading'
        } else if (row.status === 'UPLOAD_FAILED') {
          _promptRes = 'system.imageMgmt.tip.confirmUploadImageOnUploadFailed'
        }
        this.$confirm(this.$t(_promptRes), this.$t('promptMessage.prompt'), {
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
        window.open(imageMgmtService.downloadSystemImageUrl(row.id))
      })
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
        this.doPublishImage(row.id)
      })
    },
    handleReset (row) {
      this.$confirm(this.$t('system.imageMgmt.tip.confirmResetImage'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.doResetImage(row.id)
      })
    },
    handleSlim (row) {
      imageMgmtService.slimImage(row.id).then(res => {
        if (!res.data) {
          return
        }
        this.timer = setInterval(() => {
          this.getOperationInfo(res.data.operationId)
        }, 3000)
        this.getImageDataList()
      }).catch(() => {
        clearTimeout(this.timer)
        this.$message.error(this.$t('system.imageMgmt.slimStatusText.slimFailed'))
        this.getImageDataList()
      })
    },
    getOperationInfo (operationId) {
      imageMgmtService.getOperationInfo(operationId).then(res => {
        if (!res.data) {
          return
        }
        this.percentages = res.data.progress
        if (this.percentages === 100 || res.data.status !== 'ONGOING') {
          clearTimeout(this.timer)
          this.getImageDataList()
        }
      }).catch(() => {
        clearTimeout(this.timer)
      })
    },
    doPublishImage (id) {
      imageMgmtService.publishImage(id).then(() => {
        this.getImageDataList()
      }).catch(() => {
        this.$message.error(this.$t('system.imageMgmt.tip.publishImgFailed'))
      })
    },
    doResetImage (id) {
      imageMgmtService.resetImageStatus(id).then(() => {
        this.getImageDataList()
      }).catch(() => {
        this.$message.error(this.$t('system.imageMgmt.tip.resetImgStatusFailed'))
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    sessionStorage.removeItem('currentPage')
    next()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="less">
.vmlist{
  border-radius: 16px;
  background: #fff;
  padding: 30px 60px;
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
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .el-form-item__label {
    padding: 0 20px 0 0
  }
  .cls_vmlist{
    .title{
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
  .el-progress .el-progress-bar__inner:before {
    content:"";
    width:100%;
    height:100%;
    display:block;
    background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,0.3) 0,rgba(255,255,255,0.3) 12.5%,transparent 0,transparent 25%);
    background-size:80px 80px;
    animation:move 2.5s linear infinite;
  }
  .el-progress .el-progress-bar__outer{
    width: 100%;
  }
  @keyframes move {
    from {
      background-position: 80px 0;
    }
    to {
      background-position:  0;
    }
  }
}
</style>
