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
  <div id="div_upload_image">
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showDlg"
      width="1000px"
      :before-close="handleClose"
      v-loading="showCancelLoadingFlag"
      :element-loading-text="$t('devSystem.imageMgmt.tip.cancelingHint')"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      class="default_dialog"
      center
      append-to-body
    >
      <div class="common-dlg-title">
        {{ $t('devSystem.imageMgmt.tip.uploadImg') }}
      </div>
      <div class="uploadImageBody">
        <p class="prompt">
          {{ $t('devSystem.imageMgmt.tip.uploadImgPromt') }}
        </p>
        <uploader
          v-if="showUploader"
          :options="options"
          :auto-start="true"
          :file-status-text="fileStatusText"
          @file-complete="onFileComplete"
          @file-added="onFileAdded"
          @file-error="onFileError"
        >
          <uploader-unsupport />
          <uploader-btn
            :single="true"
          >
            {{ $t('devSystem.imageMgmt.operation.selectImgFile') }}
          </uploader-btn>
          <uploader-list>
            <div slot-scope="uploaderList">
              <div
                v-if="isUploading || isMerging"
                class="cancel_upload"
              >
                <el-button
                  id="btn_cancelUploadImage"
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
                  {{ $t('devSystem.imageMgmt.tip.noFileSelected') }}
                </div>
              </ul>
            </div>
          </uploader-list>
        </uploader>
      </div>
      <span
        slot="footer"
      >
        <el-button
          id="btn_uploadImage"
          @click="handleClose"
          :disabled="isUploading"
          class="common-btn"
        >
          <strong>{{ $t('common.close') }}</strong>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { PROXY_PREFIX_CURRENTSERVER } from '@/tools/constant.js'
import { getCookie } from '@/tools/tool.js'
import { imageMgmtService } from '@/api/developerApi.js'

export default {
  name: 'UploadImage',
  props: {
    showDlg: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    imageData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      showCancelLoadingFlag: false,
      showUploader: true,
      isUploading: false,
      isMerging: false,
      hasFileFlag: false,
      options: {
        testChunks: true,
        checkChunkUploadedByResponse: function (chunk, unloadedChunkArr) {
          return (unloadedChunkArr || []).indexOf(chunk.offset + 1) >= 0
        },
        headers: {},
        forceChunkSize: true,
        simultaneousUploads: 3, // concurrent number supported
        chunkSize: 8 * 1024 * 1024 // chunk size
      },
      fileStatusText: {
        success: this.$t('devSystem.imageMgmt.uploadStatusText.success'),
        error: this.$t('devSystem.imageMgmt.uploadStatusText.error'),
        uploading: this.$t('devSystem.imageMgmt.uploadStatusText.uploading'),
        paused: this.$t('devSystem.imageMgmt.uploadStatusText.paused'),
        waiting: this.$t('devSystem.imageMgmt.uploadStatusText.waiting')
      },
      fileIdentifier: ''
    }
  },
  created () {
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
    this.options.target = PROXY_PREFIX_CURRENTSERVER + '/mec-developer/mec/developer/v2/vmimages/' + this.imageData.id + '/action/upload'
  },
  methods: {
    onFileError () {
      this.isUploading = false
    },
    onFileAdded (file) {
      if (this.hasFileFlag) {
        file.ignored = true
        this.$message.warning(this.$t('devSystem.imageMgmt.tip.onlyOneImageFile'))
        return
      }
      let fileSize = file.file.size / 1024 / 1024 / 1024
      if (fileSize > 100) {
        file.ignored = true
        this.$message.warning(this.$t('devSystem.imageMgmt.tip.sysImageFileType'))
        return
      }

      this.isUploading = true
      this.hasFileFlag = true
      this.fileIdentifier = file.uniqueIdentifier
    },
    onFileComplete () {
      this.isUploading = false
      this.isMerging = true
      const file = arguments[0].file
      imageMgmtService.mergeImage(this.imageData.id, file.name, arguments[0].uniqueIdentifier).then(response => {
        this.$message.success(this.$t('devSystem.imageMgmt.tip.uploadImgSucceed'))
        let _timer = setTimeout(() => {
          clearTimeout(_timer)
          this.doClose()
        }, 1000)
      }).catch((error) => {
        this.processMergeError(error)
        let _timer = setTimeout(() => {
          clearTimeout(_timer)
          this.doClose()
        }, 1000)
      })
    },
    processMergeError (error) {
      if (error && error.response && error.response.status) {
        if (error.response.status === 400) {
          this.$message.error(this.$t('devSystem.imageMgmt.tip.invalidUploadFile'))
          return
        }
      }
      this.$message.warning(this.$t('devSystem.imageMgmt.tip.uploadImgFailed'))
    },
    handleClose () {
      if (this.isUploading) {
        this.$message.warning(this.$t('devSystem.imageMgmt.tip.uploadingHint'))
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
        this.$message.warning(this.$t('devSystem.imageMgmt.tip.mergingHintForCancel'))
        return
      }

      if (this.isUploading) {
        this.$eg_messagebox(this.$t('devSystem.imageMgmt.tip.confirmCancelUpload'), 'warning', this.$t('common.cancel'), this.$t('common.confirm')).then(() => {
          if (this.isMerging) {
            this.$message.warning(this.$t('devSystem.imageMgmt.tip.mergingHintForCancel'))
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
      imageMgmtService.cancelUploadImage(this.imageData.id, this.fileIdentifier).then(() => {
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
            this.$message.warning(this.$t('devSystem.imageMgmt.tip.mergingHintForCancel'))
            return
          }
        }
        this.$message.error(this.$t('devSystem.imageMgmt.tip.cancelUploadFailed'))
      })
    }
  }
}

</script>
<style lang='less'>
.uploadImageBody{
  padding: 20px 30px 20px 30px;
  .prompt{
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  .uploader {
    padding-top: 20px;
    text-align: center;
  }
  .uploader-btn{
    font-size: 14px!important;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    background: #a59fc9!important;
    border: 0px !important;
    color: #fff!important;
    margin-bottom: 15px;
  }
  .uploader-file[status=error] .uploader-file-progress {
    background: #4b3395;
  }
}
</style>
