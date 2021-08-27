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
  <div id="div_upload_image">
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showDlg"
      width="1000px"
      :before-close="handleClose"
      v-loading="showCancelLoadingFlag"
      :element-loading-text="$t('system.imageMgmt.tip.cancelingHint')"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('system.imageMgmt.tip.uploadImg') }}
      </div>
      <div class="uploadContainerImageBody">
        <p class="prompt">
          {{ $t('system.imageMgmt.tip.uploadContainerImgPromt') }}
        </p>
        <p class="prompt">
          {{ $t('system.imageMgmt.tip.uploadImgPromtExample') }}
        </p>
        <div style="text-align:center">
          <img
            :src="uploadSystemImageTipImg"
            alt=""
          >
        </div>
        <uploader
          v-if="showUploader"
          :options="options"
          :auto-start="true"
          :file-status-text="fileStatusText"
          @file-complete="onFileComplete"
          @file-added="onFileAdded"
        >
          <uploader-unsupport />
          <uploader-btn
            :single="true"
          >
            {{ $t('system.imageMgmt.operation.selectImgFile') }}
          </uploader-btn>
          <uploader-list>
            <div slot-scope="uploaderList">
              <div
                v-if="isUploading || isMerging"
                class="cancel_upload"
              >
                <el-button
                  id="cancelUploadBtn"
                  class="cancel_upload_btn"
                  type="text"
                  @click="handleCancelUpload(uploaderList)"
                >
                  {{ $t('common.cancel') }}
                </el-button>
              </div>
              <ul class="file-list">
                <li
                  v-for="file in uploaderList.fileList"
                  :key="file.id"
                >
                  <uploader-file
                    :class="'file_' + file.id"
                    ref="files"
                    :file="file"
                    :list="true"
                  />
                </li>
                <div
                  class="prompt_nofile"
                  v-if="!uploaderList.fileList.length"
                >
                  {{ $t('system.imageMgmt.tip.noFileSelected') }}
                </div>
              </ul>
            </div>
          </uploader-list>
        </uploader>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          :disabled="isUploading"
          class="bgBtn"
        >
          <strong>{{ $t('common.close') }}</strong>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { urlPrefix, getCookie } from '../../../tools/tool.js'
import { imageMgmtService } from '../../../tools/api.js'

export default {
  name: 'UploadImage',
  props: {
    showDlgProp: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      showDlg: false,
      showCancelLoadingFlag: false,
      showUploader: true,
      isUploading: false,
      isMerging: false,
      hasFileFlag: false,
      sysImgFileTypeArr: ['tar'],
      options: {
        testChunks: false,
        headers: {},
        forceChunkSize: true,
        simultaneousUploads: 5, // concurrent number supported
        chunkSize: 8 * 1024 * 1024 // chunk size
      },
      fileStatusText: {
        success: this.$t('system.imageMgmt.uploadStatusText.success'),
        error: this.$t('system.imageMgmt.uploadStatusText.error'),
        uploading: this.$t('system.imageMgmt.uploadStatusText.uploading'),
        paused: this.$t('system.imageMgmt.uploadStatusText.paused'),
        waiting: this.$t('system.imageMgmt.uploadStatusText.waiting')
      },
      uploadSystemImageTipImg: require('@/assets/images/UploadContainerImageTip.png'),
      fileIdentifier: '',
      imageId: ''
    }
  },
  created () {
    this.showDlg = this.showDlgProp
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
    let url = window.location.origin
    this.imageId = this.createUUID()
    this.options.target = url + urlPrefix + 'mec/developer/v2/image/' + this.imageId + '/upload'
  },
  methods: {
    createUUID () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    onFileAdded (file) {
      if (this.hasFileFlag) {
        file.ignored = true
        this.$message.warning(this.$t('system.imageMgmt.tip.onlyOneImageFile'))
        return
      }

      let fileSize = file.file.size / 1024 / 1024 / 1024
      let typeName = file.file.name.substring(file.file.name.lastIndexOf('.') + 1)
      if (this.sysImgFileTypeArr.indexOf(typeName) === -1 || fileSize > 5) {
        file.ignored = true
        this.$message.warning(this.$t('system.imageMgmt.tip.sysContainerImageFileType'))
        return
      }

      this.isUploading = true
      this.hasFileFlag = true
      // this.fileIdentifier = file.uniqueIdentifier
    },
    onFileComplete () {
      this.isUploading = false
      this.isMerging = true
      const file = arguments[0].file
      imageMgmtService.mergeContainerImage(this.imageId, file.name, arguments[0].uniqueIdentifier).then(response => {
        this.$message.success(this.$t('system.imageMgmt.tip.uploadImgSucceed'))
        let _timer = setTimeout(() => {
          clearTimeout(_timer)
          this.doClose()
        }, 1000)
      }).catch((error) => {
        if (error.response.data.message === 'exist the same imageName') {
          this.$message.error(this.$t('system.imageMgmt.tip.systemNameExist'))
        } else {
          this.$message.error(this.$t('promptMessage.uploadFailure'))
        }
      })
    },
    handleClose () {
      if (this.isUploading) {
        this.$message.warning(this.$t('system.imageMgmt.tip.uploadingHint'))
        return
      }
      this.doClose()
    },
    doClose () {
      this.showDlg = false
      this.$emit('processCloseUploadImageDlg')
    },
    handleCancelUpload (uploaderList) {
      if (this.isMerging) {
        this.$message.warning(this.$t('system.imageMgmt.tip.mergingHintForCancel'))
        return
      }

      if (this.isUploading) {
        this.$confirm(this.$t('system.imageMgmt.tip.confirmCancelUpload'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          if (this.isMerging) {
            this.$message.warning(this.$t('system.imageMgmt.tip.mergingHintForCancel'))
            return
          }

          uploaderList.fileList[0].paused = true
          this.showCancelLoadingFlag = true
          let _delayCancelTimer = setTimeout(() => {
            clearTimeout(_delayCancelTimer)
            _delayCancelTimer = null

            this.showCancelLoadingFlag = false
            this.cancelUpload(uploaderList)
          }, 5000)
        })
      }
    },
    cancelUpload (uploaderList) {
      imageMgmtService.cancelUploadContainerImage(this.imageId).then(response => {
        this.isUploading = false
        this.isMerging = false
        this.hasFileFlag = false
        uploaderList.fileList.splice(0, 1)

        this.showUploader = false
        let _resetUploaderTimer = setTimeout(() => {
          clearTimeout(_resetUploaderTimer)
          _resetUploaderTimer = null
          this.showUploader = true
        }, 10)
      }).catch((error) => {
        uploaderList.fileList[0].paused = false
        if (error && error.response && error.response.status) {
          if (error.response.status === 400) {
            this.$message.warning(this.$t('system.imageMgmt.tip.mergingHintForCancel'))
            return
          }
        }
        this.$message.error(this.$t('system.imageMgmt.tip.cancelUploadFailed'))
      })
    }
  }
}

</script>
<style lang='less'>
.uploadContainerImageBody{
  padding: 20px 30px 20px 30px;
  .prompt{
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
    color: #3e4863;
  }
  .prompt_nofile{
    margin-top: 10px;
    font-size: 14px;
    color: #688ef3;
  }
  .uploader {
    padding-top: 20px;
    text-align: center;
  }
  .uploader-list {
    padding-top: 10px;
  }
  .uploader-btn{
    font-size: 14px !important;
    font-family: defaultFontLight;
    background: #a59fc9 !important;
    border: none;
    color: #ffffff !important;
  }
  .cancel_upload{
    z-index: 100;
    // background:#ffffff;
    position: absolute;
    top: 10px;
    right: 0px;
    height: 48px;
    width: 100px;
  }
  .cancel_upload_btn{
    height: 48px;
  }
  .uploader-file-name{
    width: 40%;
  }
  .uploader-file-status{
    width: 20%;
  }
}
</style>
