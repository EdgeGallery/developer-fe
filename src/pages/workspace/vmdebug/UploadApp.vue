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
  <div class="uploadApp defaultFontLight">
    <el-dialog
      :title="$t('workspace.deployDebugVm.uploadApp')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <p class="title">
        {{ $t('workspace.deployDebugVm.uploadApp') }}
      </p>
      <div class="uploadAppBody">
        <UploadBigFile
          :upload-url-prop="uploadUrl"
          :merge-url-prop="mergeUrl"
          :btn-name-prop="btnName"
          :params-name-prop="paramsName"
        />
        <p class="prompt">
          {{ $t('workspace.deployDebugVm.uploadPromt') }}
        </p>
      </div>
      <div class="elButton">
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
import UploadBigFile from '../../../components/common/UploadBigFile.vue'

export default {
  name: 'UploadApp',
  components: {
    UploadBigFile
  },
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
  computed: {
    btnName () {
      return this.$t('workspace.deployDebugVm.selectFile')
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      uploadBtnLoading: false,
      uploadUrl: 'mec/developer/v1/projects/' + this.projectId + '/vm/' + this.vmId + '/files?userId=' + sessionStorage.getItem('userId'),
      mergeUrl: 'mec/developer/v1/projects/' + this.projectId + '/vm/' + this.vmId + '/merge?userId=' + sessionStorage.getItem('userId') + '&fileName=',
      paramsName: 'identifier'
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    }
  }
}

</script>
<style lang='less'>
.uploadApp {
  .el-dialog {
    border-radius:12px;
    padding:40px 39px;
    background-color: #efefef;
    min-width:640px;
    .el-dialog__header {
      display:none;
    }
    .el-dialog__body {
      padding:0px !important;
    }
    .el-dialog__footer {
      padding-bottom:0px;
      padding-top:20px;
      padding-right:0px;
    }
    .dialog-footer {
      padding-right:0px !important;
    }
    .el-button--default {
      border: 1px solid #5844be;
      color: #fff;
      background-color: #5844be;
      width: 80px;
      padding: 8px 8px;
      border-radius:10px;
    }
    .el-button--primary {
      border: 1px solid #5844be;
      color: #fff;
      background-color: #5844be;
      width: 80px;
      padding: 8px 8px;
      border-radius:10px;
    }
    .title {
      font-weight:normal !important;
      font-size:20px !important;
      color:#380879;
      text-align: left;
      margin-bottom:25px !important;
    }
    .title::before {
      content:'';
      display:inline-block;
      width:17px;
      height:17px;
      margin-right:13px;
      background: linear-gradient(60deg,#70dcc7,#bdeae1);
      position: relative;
      top:2px;
      border-radius:3px;
    }
  }
  .uploadAppBody{
    padding: 20px 30px 20px 30px;
    .prompt{
      margin-top: 10px;
      font-size: 12px;
      color: #adadad;
    }
  }
}

</style>
