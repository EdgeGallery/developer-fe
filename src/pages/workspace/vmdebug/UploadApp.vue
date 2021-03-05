<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
      :title="$t('workspace.deployDebugVm.uploadApp')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div class="uploadAppBody">
        <el-upload
          id="elupload_vmapp"
          class="upload-app"
          action=""
          :limit="2"
          :on-change="handleChangeFile"
          :on-exceed="handleExceed"
          :file-list="appFileList"
          :auto-upload="false"
          :on-remove="removeUpload"
          accept=".zip,.rar,.tar"
          name="appFile"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >
            {{ $t('workspace.deployDebugVm.selectFile') }}
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >
            <em class="el-icon-warning" />{{ $t('workspace.deployDebugVm.uploadAppFileTip') }}
          </div>
        </el-upload>
      </div>
      <div class="elButton">
        <el-button
          id="confirmBtn"
          type="primary"
          :loading="uploadBtnLoading"
          @click="handleUpload"
        >
          <strong>{{ $t('workspace.deployDebugVm.upload') }}</strong>
        </el-button>
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
import { vmService } from '../../../tools/api.js'

export default {
  name: 'UploadApp',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    projectId: {
      required: true,
      type: String
    },
    vmId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      appFileList: [],
      uploadBtnLoading: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    handleChangeFile (file, fileList) {
      // this.$store.state.pluginSize = file.size / 1024 / 1024
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$message.warning(this.$t('promptMessage.fileNameType'))
        this.appFileList = []
      } else {
        this.appFileList.push(file.raw)
      }
      if (file.size / 1024 / 1024 > 500) {
        this.$message.warning(this.$t('promptMessage.moreThan500M'))
        this.appFileList = []
      }
      let fileTypeArr = ['zip', 'rar', 'tar']
      let checkPassed = this.checkFileType(fileList, fileTypeArr)
      if (!checkPassed) {
        this.appFileList = []
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    removeUpload (file, fileList) {
      this.appFileList = fileList
    },
    checkFileType (fileList, fileTypeArr) {
      let checkPassed = true
      let fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(fileType.toLowerCase()) === -1) {
        this.$message.warning(this.$t('promptMessage.checkFileType'))
        checkPassed = false
      }
      return checkPassed
    },
    handleUpload () {
      this.uploadBtnLoading = true
      if (!this.appFileList.length) {
        this.$message({
          type: 'warning',
          message: this.$t('workspace.deployDebugVm.appPackageFileEmpty')
        })
        this.uploadBtnLoading = false
        return
      }

      this.doUpload()
    },
    doUpload () {
      let formdata = new FormData()
      formdata.append('appFile', this.appFileList[0])
      vmService.uploadFile(this.projectId, this.vmId, formdata).then(res => {
        this.$message({
          message: this.$t('promptMessage.uploadSuccess'),
          type: 'success'
        })
        this.$emit('input', false)
      }).catch(err => {
        if (err.response.data.code === 403) {
          this.$message.error(this.$t('promptMessage.guestPrompt'))
        } else {
          this.$message.error(this.$t('promptMessage.uploadFailure'))
        }
        this.uploadBtnLoading = false
      })
    }
  },
  mounted () {
  }
}

</script>
<style lang='less'>
.uploadAppBody{
  padding: 20px 30px 20px 30px;
  .el-upload{
    margin-right: 10px;
    .el-button--primary{
      background-color: #fff;
      border-color: #688ef3;
      color: #282B33;
      padding: 8px 16px;
      margin-top: 2px;
    }
  }
  .el-icon-warning{
    color: #688ef3;
    margin-right: 15px;
    font-size: 14px;
  }
  .el-upload-list__item:first-child{
    width: 100%;
  }
  .upload-app .el-upload__tip{
    margin-left: -10px;
    margin-top: 5px;
  }
}
</style>
