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
  <div class="apidetail">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">
        API
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="path==='mep'"
        :to="{ path: '/mecDeveloper/api/mep' }"
      >
        {{ $t('breadCrumb.mepapi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-else
        :to="{ path: '/mecDeveloper/api/mep-eco' }"
      >
        {{ $t('breadCrumb.mepecoapi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.apiDetail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="swagger-ui" />
  </div>
</template>

<script>
import { urlPrefix } from '../../tools/tool.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: 'Apidetail',
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      apiFileId: this.$route.query.apiId,
      path: this.$route.query.path
    }
  },
  mounted () {
    this.getApiUrl()
  },
  methods: {
    getApiUrl () {
      let apiUrl = urlPrefix + 'mec/developer/v1/files/' + this.apiFileId + '?userId=' + this.userId + '&type=OPENMEP'
      SwaggerUIBundle({
        url: apiUrl,
        dom_id: '#swagger-ui',
        deepLinking: false,
        presets: [
          SwaggerUIBundle.presets.apis
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ]
      })
      let interval = setInterval(() => {
        let baseUrl = document.getElementsByClassName('base-url')
        try {
          if (baseUrl[0].innerHTML) {
            let childNodes = baseUrl[0].childNodes
            childNodes[4].nodeValue = '{host}'
            window.clearInterval(interval)
          }
        } catch (error) {
          window.clearInterval(interval)
        }
      }, 200)
    }
  }
}
</script>

<style lang="less">
.apidetail{
  #swagger-ui{
    background: #fff;
    padding: 40px;
    .swagger-ui .info{
      margin: 10px 0;
    }
  }
}
</style>
