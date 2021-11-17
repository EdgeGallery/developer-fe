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
            class="common-btn inner-btn"
          >
            {{ btnNameProp }}
          </uploader-btn>
        </div>
      </uploader-drop>
      <uploader-list />
    </uploader>
  </div>
</template>

<script>
import { getCookie } from '../../../src/tools/tool.js'
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
        simultaneousUploads: 5, // Concurrent number supported
        chunkSize: 8 * 1024 * 1024 // Chunk size
      }
    }
  },
  methods: {
    onFileAdded (file) {
      let fileSize = file.file.size / 1024 / 1024 / 1024
      let typeName = file.file.name.substring(file.file.name.lastIndexOf('.') + 1)
      let typeArr = ['rar', 'tar', 'zip']
      if (typeArr.indexOf(typeName) === -1 || fileSize > 5) {
        file.ignored = true
        this.$eg_messagebox(this.$t('promptMessage.imageFileType'), 'warning')
      }
    },
    fileComplete () {
      console.log('file complete', arguments)
      const file = arguments[0].file
      let url = this.mergerUrl + file.name + '&' + this.paramsNameProp + '=' + arguments[0].uniqueIdentifier
      axios.get(url).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
    this.options.headers = { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
    let _url = window.location.origin
    this.options.target = _url + '/mec-developer/' + this.uploadUrlProp
    this.mergerUrl = _url + '/mec-developer/' + this.mergeUrlProp
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
}

</style>
