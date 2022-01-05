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
  <div class="uploader-container">
    <uploader
      :options="options"
      class="uploader-example"
      @file-complete="fileComplete"
      @file-added="onFileAdded"
    >
      <uploader-unsupport />
      <uploader-drop>
        <div class="upolader-button-wrapper">
          <uploader-btn
            id="btn_vmUploadFile"
          >
            {{ btnNameProp }}
          </uploader-btn>
        </div>
      </uploader-drop>
      <uploader-list />
      <p
        class="upload-prompt"
        v-if="isMerge"
      >
        <span v-if="isMerging">merging</span>
        <span v-if="isMergeFailed">merge failed</span>
        <span v-if="isMergeSuccess">merged successfully</span>
      </p>
    </uploader>
  </div>
</template>

<script>
import { getCookie } from '../tools/tool.js'
import { PROXY_PREFIX_CURRENTSERVER } from '../tools/constant.js'
import axios from 'axios'
export default {
  name: 'UploadBigFile',
  props: {
    uploadUrlProp: {
      require: true,
      type: String,
      default: ''
    },
    mergeUrlProp: {
      require: true,
      type: String,
      default: ''
    },
    btnNameProp: {
      require: true,
      type: String,
      default: ''
    },
    paramsNameProp: {
      require: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mergerUrl: '',
      mergerUrlHttp: '',
      options: {
        testChunks: false,
        headers: {},
        forceChunkSize: true,
        simultaneousUploads: 3, // Concurrent number supported
        chunkSize: 8 * 1024 * 1024 // Chunk size
      },
      isMerge: false,
      isMerging: false,
      isMergeFailed: false,
      isMergeSuccess: false
    }
  },
  methods: {
    onFileAdded (file) {
      let fileSize = file.file.size / 1024 / 1024 / 1024
      let typeName = file.file.name.substring(file.file.name.lastIndexOf('.') + 1)
      let typeArr = ['rar', 'tar', 'zip']
      if (typeArr.indexOf(typeName) === -1 || fileSize > 5) {
        file.ignored = true
        this.$eg_messagebox(this.$t('sandboxPromptInfomation.imageFileType'), 'warning')
      }
    },
    fileComplete () {
      this.isMerge = true
      this.isMerging = true
      const file = arguments[0].file
      let url = this.mergerUrl + file.name + '&' + this.paramsNameProp + '=' + arguments[0].uniqueIdentifier
      axios.get(url).then(() => {
        this.isMerging = false
        this.isMergeFailed = false
        this.isMergeSuccess = true
      }).catch(() => {
        this.isMerging = false
        this.isMergeFailed = true
        this.isMergeSuccess = false
      })
    }
  },
  created () {
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
    let _url = window.location.origin
    this.options.target = _url + PROXY_PREFIX_CURRENTSERVER + '/mec-developer/' + this.uploadUrlProp
    this.mergerUrl = _url + PROXY_PREFIX_CURRENTSERVER + '/mec-developer/' + this.mergeUrlProp
  }
}
</script>

<style lang="less">
.uploader-container {
  .uploader-example {
    margin: 15px 0;
    font-size: 14px;
  }
  .uploader-drop {
    border: none;
    background: none;
    padding: 0;
  }
  .uploader-btn{
    border-radius: 12px;
    padding: 6px 32px;
    border: none;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    font-size: 20px;
    margin-top: 10px;
    color: #fff;
    background-color: #7e70d7;
  }
  .uploader-btn:hover{
    background-color: #6d5fc9;
  }
  .uploader-list{
    margin-top: 20px;
  }
  .uploader-file-name{
    width: 40% !important;
  }
  .uploader-file-status{
    width: 29% !important;
  }
  .uploader-file .uploader-file-progress,.uploader-file[status=error] .uploader-file-progress,.upload-prompt{
    background: #695bae;
  }
  .uploader-file-actions .uploader-file-remove{
    background-position-y: -32px;
  }
  .uploader-file[status=success] .uploader-file-retry,.uploader-file[status=success] .uploader-file-remove {
    display: block;
  }
  .upload-prompt{
    width: 28%;
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    position: absolute;
    bottom: 1px;
    right: 11%;
    z-index: 2;
  }
}

</style>
