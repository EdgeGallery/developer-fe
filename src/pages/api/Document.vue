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
  <div id="test-editor">
    <el-backtop target=".el-main" />
    <mavon-editor
      v-model="markdownSource"
      :toolbars-flag="false"
      :editable="false"
      :subfield="false"
      default-open="preview"
      :box-shadow="false"
      preview-background="#ffffff"
    />
  </div>
</template>

<script>
import { Api } from '../../tools/api.js'
import axios from 'axios'
export default {
  name: '',
  props: {
    guideFileIdprop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      markdownSource: '',
      guideFileId: this.guideFileIdprop,
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    getMarkDown (guideFileId) {
      let apiUrl
      if (guideFileId === 'competenceCenterUsageInstruction') {
        apiUrl = './mep-Introduction.md'
      } else {
        apiUrl = Api.getSwaggerUrlApi(guideFileId)
      }
      axios(apiUrl).then(res => {
        this.markdownSource = res.data
      })
    }
  },
  watch: {
    guideFileIdprop (newVal, oldVal) {
      this.getMarkDown(newVal)
    }
  },
  mounted () {
    this.getMarkDown(this.guideFileId)
  }
}
</script>
