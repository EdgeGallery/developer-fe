<template>
  <div>
    <uploader
      :options="options"
      class="uploader-example"
      @file-complete="fileComplete"
    >
      <uploader-unsupport />
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :attrs="attrs">
          select images
        </uploader-btn>
        <uploader-btn :directory="true">
          select folder
        </uploader-btn>
      </uploader-drop>
      <uploader-list />
    </uploader>
    <uploader
      :options="optionsHttp"
      class="uploader-example"
      @file-complete="fileCompleteHttp"
    >
      <uploader-unsupport />
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :attrs="attrs">
          select images
        </uploader-btn>
        <uploader-btn :directory="true">
          select folder
        </uploader-btn>
      </uploader-drop>
      <uploader-list />
    </uploader>
  </div>
</template>

<script>
import { urlPrefix } from '../../tools/tool.js'
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      mergerUrl: '',
      mergerUrlHttp: '',
      options: {
        target: '',
        testChunks: false,
        simultaneousUploads: 5, // 并发数
        chunkSize: 8 * 1024 * 1024 // 块大小
      },
      attrs: {
        accept: 'image/*'
      },
      optionsHttp: {
        target: '',
        testChunks: false,
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
    },
    fileCompleteHttp () {
      console.log('file complete', arguments)
      const file = arguments[0].file
      let url = this.mergerUrlHttp + file.name + '&guid=' + arguments[0].uniqueIdentifier
      axios.get(url).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
    let url = window.location.origin
    // url = url.replace('8083', '9082')
    console.log(url)
    this.options.target = url + urlPrefix + 'mec/developer/v1/image/upload'
    console.log(this.options.target)
    this.mergerUrl = url + urlPrefix + 'mec/developer/v1/image/merge?fileName='
    console.log(this.mergerUrl)

    let urlHttp = window.location.origin
    urlHttp = urlHttp.replace('https', 'http').replace('30092', '30098')
    this.optionsHttp.target = urlHttp + '/mec/developer/v1/image/upload'
    this.mergerUrlHttp = urlHttp + '/mec/developer/v1/image/merge?fileName='
  },
  mounted () {

  }
}
</script>

<style lang="less">
.uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
