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
      :title="$t('workspace.deployDebugVm.uploadApp')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
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
.uploadAppBody{
  padding: 20px 30px 20px 30px;
  .prompt{
    margin-top: 10px;
    font-size: 12px;
    color: #adadad;
  }
}
</style>
