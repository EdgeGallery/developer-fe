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
  <div>
    <el-dialog
      :title="$t('system.imageMgmt.tip.uploadImg')"
      :close-on-click-modal="false"
      :visible.sync="showDlg"
      width="600px"
      :before-close="handleClose"
    >
      <div class="uploadImageBody">
        <p class="prompt">
          {{ $t('system.imageMgmt.tip.uploadImgPromt') }}
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
          <uploader-list />
        </uploader>
        <p
          class="prompt_nofile"
          v-if="!hasFileFlag"
        >
          {{ $t('system.imageMgmt.tip.noFileSelected') }}
        </p>
      </div>
      <div style="text-align:center;margin-top:20px">
        <el-button
          id="closeBtn"
          @click="handleClose"
        >
          <strong>{{ $t('common.close') }}</strong>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { urlPrefix, getCookie } from '../../../tools/tool.js'
import axios from 'axios'

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
      isUploading: false,
      isMerging: false,
      hasFileFlag: false,
      sysImgFileTypeArr: ['zip'],
      mergerUrl: '',
      mergerUrlHttp: '',
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
      uploadSystemImageTipImg: require('@/assets/images/UploadSystemImageTip.png')
    }
  },
  created () {
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
    let url = window.location.origin
    this.options.target = url + urlPrefix + 'mec/developer/v1/system/images/' + this.imageData.systemId + '/upload'
    this.mergerUrl = url + urlPrefix + 'mec/developer/v1/system/images/' + this.imageData.systemId + '/merge?fileName='
  },
  methods: {
    onFileAdded (file) {
      if (this.hasFileFlag) {
        file.ignored = true
        this.$message.warning(this.$t('system.imageMgmt.tip.onlyOneImageFile'))
        return
      }

      let fileSize = file.file.size / 1024 / 1024 / 1024
      let typeName = file.file.name.substring(file.file.name.lastIndexOf('.') + 1)
      if (this.sysImgFileTypeArr.indexOf(typeName) === -1 || fileSize > 100) {
        file.ignored = true
        this.$message.warning(this.$t('system.imageMgmt.tip.sysImageFileType'))
        return
      }

      this.isUploading = true
      this.hasFileFlag = true
    },
    onFileComplete () {
      this.isUploading = false
      this.isMerging = true
      const file = arguments[0].file
      let url = this.mergerUrl + file.name + '&identifier=' + arguments[0].uniqueIdentifier
      axios.get(url).then(() => {
        this.$message.success(this.$t('system.imageMgmt.tip.uploadImgSucceed'))
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
          this.$message.error(this.$t('system.imageMgmt.tip.invalidUploadFile'))
          return
        }
      }
      this.$message.error(this.$t('system.imageMgmt.tip.uploadImgFailed'))
    },
    handleClose () {
      if (this.isUploading) {
        this.$message.warning(this.$t('system.imageMgmt.tip.uploadingHint'))
        return
      }
      if (this.isMerging) {
        this.$message.warning(this.$t('system.imageMgmt.tip.mergingHint'))
        return
      }
      this.doClose()
    },
    doClose () {
      this.showDlg = false
      this.$emit('processCloseUploadImageDlg')
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
  }
  .uploader-list {
    padding-top: 10px;
  }
  .uploader-btn{
    border: 1px solid #c3d2fa;
    background:#f0f4fe;
    color: #688ef3;
    padding: 8px 24px;
    border-radius: 3px;
  }
  .uploader-btn:hover{
    background:#688ef3;
    color: #fff;
  }
}
</style>
