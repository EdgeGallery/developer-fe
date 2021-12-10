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
  <div class="uploadApp">
    <div class="common-div-bg">
      <p class="common-dlg-title">
        {{ $t('sandbox.uploadAppPackage') }}
      </p>
      <div class="uploadAppBody">
        <UploadBigFile
          :upload-url-prop="uploadUrl"
          :merge-url-prop="mergeUrl"
          :btn-name-prop="btnName"
          :params-name-prop="paramsName"
        />
        <p class="prompt">
          {{ $t('sandbox.uploadAppPackagePromt') }}
        </p>
      </div>
      <div class="btn-container">
        <el-button
          id="btn_cancelVmUploadFile"
          class="common-btn"
          @click="closeVmUpload"
        >
          {{ $t('common.close') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UploadBigFile from '../../../../components/UploadBigFile.vue'

export default {
  name: 'UploadApp',
  components: {
    UploadBigFile
  },
  props: {
    applicationId: {
      required: true,
      type: String
    }
  },
  computed: {
    btnName () {
      return this.$t('sandbox.selectFile')
    }
  },
  data () {
    return {
      uploadUrl: 'mec/developer/v2/applications/' + this.applicationId + '/vms/' + sessionStorage.getItem('vmId') + '/action/upload-file',
      mergeUrl: 'mec/developer/v2/applications/' + this.applicationId + '/vms/' + sessionStorage.getItem('vmId') + '/action/merge-file?fileName=',
      paramsName: 'identifier'
    }
  },
  methods: {
    closeVmUpload () {
      this.$emit('closeVmUpload')
    }
  }
}

</script>
<style lang='less'>
.uploadApp {
  position: absolute;
  width: 600px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .prompt{
    margin-top: 10px;
    font-size: 12px;
    color: rgba(255,255,255,.5);
  }
}

</style>
