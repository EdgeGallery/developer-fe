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
          <uploader-btn>{{ btnNameProp }}</uploader-btn>
        </div>
      </uploader-drop>
      <uploader-list />
    </uploader>
  </div>
</template>

<script>
import { urlPrefix, getCookie } from '../../tools/tool.js'
import axios from 'axios'
export default {
  name: '',
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
    let url = window.location.origin
    this.options.target = url + urlPrefix + this.uploadUrlProp
    this.mergerUrl = url + urlPrefix + this.mergeUrlProp
  }
}
</script>

<style lang="less">
.uploader-container {
  .uploader-example {
    margin-top: 15px;
    font-size: 16px;
  }

  .uploader-drop {
    border: none;
    background: none;
    padding: 0;
    margin-bottom: 10px;
  }

  .uploader-btn {
    padding: 0 15px;
    height: 39px;
    line-height: 39px;
    color: white;
    background-color: #8278b7;
    border: none;
    border-radius: 8px;
    font-family: defaultFontLight;
  }

  .uploader-btn:hover {
    color: white;
    background-color: #8278b7;
  }

  .uploader-file {
    font-size: 14px;
    font-family: defaultFontLight;
  }

  .uploader-example .uploader-list {
    width: 100%;
    min-width: 270px;
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
    .uploader-file-name{
      width: 35%;
    }
    .uploader-file-status{
      width: 34%;
      span{
        em{
          margin: 0 15px;
        }
      }
    }
  }
}

</style>
