<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="image-select">
    <div class="method">
      <div class="work-title-clickable">
        <el-radio
          class="work-radio"
          v-model="selectMirrorType"
          label="1"
        >
          {{ $t('workspace.uploadImage.mode1') }}
        </el-radio>
      </div>
      <div class="method-content">
        <div class="work-p">
          {{ $t('workspace.uploadImage.mode1Desc') }}
        </div>
        <div class="work-p tip">
          {{ $t('workspace.uploadImage.mode1Tip') }}
        </div>
      </div>
    </div>
    <div class="method method-2">
      <div class="work-title-clickable">
        <el-radio
          class="work-radio"
          v-model="selectMirrorType"
          label="2"
        >
          {{ $t('workspace.uploadImage.mode2') }}
        </el-radio>
      </div>
      <div class="method-content">
        <div class="work-p">
          {{ $t('workspace.uploadImage.mode2Desc') }}
        </div>
        <div class="work-p tip">
          {{ $t('workspace.uploadImage.mode2Tip') }}
        </div>
        <UploadBigFile
          class="upload-image-button"
          :upload-url-prop="uploadUrl"
          :merge-url-prop="mergeUrl"
          :btn-name-prop="btnName"
          :params-name-prop="paramsName"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UploadBigFile from '../../components/common/UploadBigFile.vue'

export default {
  name: 'ImageSelect',
  components: {
    UploadBigFile
  },
  props: {
    projectBeforeConfig: {
      type: Object,
      required: true
    },
    allStepData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      validate: false,
      userId: sessionStorage.getItem('userId'),
      hostId: '',
      ip: '',
      port: '',
      enable: false,
      install_href: 'https://gitee.com/edgegallery/docs/blob/master/Projects/Developer/add_edgeNode_guide.md',
      isIpError: false,
      isPortError: false,
      uploadUrl: 'mec/developer/v1/image/upload',
      mergeUrl: 'mec/developer/v1/image/merge?fileName=',
      paramsName: 'guid',
      selectMirrorType: '1'
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = { ip: '', port: '', hostId: '', enable: false }
        this.$emit('getStepData', { step: 'third', data, ifNext })
      }
    }
  },
  computed: {
    btnName () {
      return this.$t('workspace.uploadImage.uploadAppImage')
    }
  }
}
</script>

<style lang="less">
.image-select {
  .method-content {
    margin: 20px 53px;

    .tip {
      font-size: 14px;
    }
  }

  .method-2 {
    margin-top: 40px;

    .upload-image-button {
      margin-top: 15px;
    }
  }
}
</style>
