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
    >
      <div class="common-dlg-title">
        {{ $t('devSystem.imageMgmt.tip.uploadImg') }}
      </div>
      <div class="uploadContainerImageBody">
        <p class="prompt">
          {{ $t('devSystem.imageMgmt.tip.uploadContainerImgPromt') }}
        </p>
        <p class="prompt">
          {{ $t('devSystem.imageMgmt.tip.uploadImgPromtExample') }}
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
            {{ $t('devSystem.imageMgmt.operation.selectImgFile') }}
          </uploader-btn>
          <uploader-list>
            <div slot-scope="uploaderList">
              <div
                v-if="isUploading || isMerging"
                class="cancel_upload"
              >
                <el-button
                  id="btn_cancelUploadContainerImage"
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
      <div
        slot="footer"
      >
        <el-button
          id="btn_uploadContainerImage_close"
          @click="handleClose"
          :disabled="isUploading"
          class="common-btn"
        >
          {{ $t('common.close') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PROXY_PREFIX_CURRENTSERVER } from '@/tools/constant.js'
import { getCookie } from '@/tools/tool.js'
import { imageMgmtService } from '@/api/developerApi.js'
import commonUtil from '@/tools/devCommonUtil.js'

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
      uploadSystemImageTipImg: require('@/assets/images/UploadContainerImageTip.png'),
      imageId: ''
    }
  },
  created () {
    this.showDlg = this.showDlgProp
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'), access_token: JSON.stringify(sessionStorage.getItem('accessToken')) }
    this.imageId = this.createUUID()
    this.options.target = PROXY_PREFIX_CURRENTSERVER + '/mec-developer/mec/developer/v2/containerimages/' + this.imageId + '/action/upload'
  },
  methods: {
    createUUID () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = window.crypto.getRandomValues(new Uint8Array(1)) * 0.001 * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    onFileAdded (file) {
      if (this.hasFileFlag) {
        file.ignored = true
        this.$message.warning(this.$t('devSystem.imageMgmt.tip.onlyOneImageFile'))
        return
      }

      let fileSize = file.file.size / 1024 / 1024 / 1024
      let typeName = file.file.name.substring(file.file.name.lastIndexOf('.') + 1)
      if (this.sysImgFileTypeArr.indexOf(typeName) === -1 || fileSize > 5) {
        file.ignored = true
        this.$message.warning(this.$t('devSystem.imageMgmt.tip.sysContainerImageFileType'))
        return
      }

      this.isUploading = true
      this.hasFileFlag = true
    },
    onFileComplete () {
      this.isUploading = true
      this.isMerging = true
      const file = arguments[0].file
      imageMgmtService.mergeContainerImage(this.imageId, file.name, arguments[0].uniqueIdentifier).then(response => {
        this.$message.success(this.$t('devSystem.imageMgmt.tip.uploadImgSucceed'))
        let _timer = setTimeout(() => {
          clearTimeout(_timer)
          this.doClose()
        }, 1000)
        this.isUploading = false
      }).catch((error) => {
        let defaultMsg = this.$t('promptMessage.uploadFailure')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
        this.doClose()
        this.isUploading = false
      })
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
      imageMgmtService.cancelUploadContainerImage(this.imageId).then(() => {
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
.uploadContainerImageBody{
  padding: 20px 30px 20px 30px;
  .prompt{
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 16px;
    line-height: 30px;
    color: #fff;
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
}
</style>
