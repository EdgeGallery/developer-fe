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
  <div class="uploader_container">
    <uploader
      :options="options"
      class="uploader-example"
      @file-complete="fileComplete"
    >
      <uploader-unsupport />
      <uploader-drop>
        <uploader-btn>{{ $t('workspace.uploadImage.uploadAppImage') }}</uploader-btn>
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
  data () {
    return {
      mergerUrl: '',
      mergerUrlHttp: '',
      options: {
        testChunks: false,
        headers: {},
        forceChunkSize: true,
        simultaneousUploads: 5, // 并发数
        chunkSize: 8 * 1024 * 1024 // 块大小
      }
    }
  },
  methods: {
    fileComplete () {
      console.log('file complete', arguments)
      const file = arguments[0].file
      let url = this.mergerUrl + file.name + '&guid=' + arguments[0].uniqueIdentifier
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
    url = url.replace('8083', '9082')
    this.options.target = url + urlPrefix + 'mec/developer/v1/image/upload'
    this.mergerUrl = url + urlPrefix + 'mec/developer/v1/image/merge?fileName='
  },
  mounted () {
  }
}
</script>

<style lang="less">
.uploader-example {
  font-size: 12px;
  .uploader-drop{
    border: none;
    background: none;
    padding: 0;
    margin-bottom: 10px;
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
}
.uploader-example .uploader-list {
  width: 60%;
  min-width: 270px;
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
.uploader-file[status=success] .uploader-file-remove{
  display: block !important;
}
</style>
