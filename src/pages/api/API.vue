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
  <div>
    <div class="service_div">
      <p class="api_top">
        {{ $t('workspace.apiTopText') }} ：
      </p>
      <p class="title">
        {{ $t('workspace.serviceDetails') }}
      </p>
      <el-row class="service_info">
        <el-col :span="24">
          {{ $t('test.testApp.type') }} ：{{ serviceDetail.capabilityType }}
        </el-col>
      </el-row>
      <el-row class="service_info">
        <el-col :span="11">
          {{ $t('workspace.servicename') }} ：{{ serviceDetail.serviceName }}
        </el-col>
        <el-col :span="13">
          {{ $t('workspace.version') }} ：{{ serviceDetail.version }}
        </el-col>
      </el-row>
      <el-row class="service_info">
        <el-col :span="11">
          {{ $t('workspace.releaseTime') }} ：{{ serviceDetail.uploadTime }}
        </el-col>
        <el-col :span="13">
          SDK {{ $t('common.download') }} ：
          <el-select
            v-model="codeLanguage"
            name="codeLanguage"
            class="list-select"
            size="mini"
          >
            <el-option
              v-for="item in optionsLanguage"
              :key="item.value"
              :label="item.label"
              :value="item.label"
              :id="item.label"
            />
          </el-select>
          <el-link
            class="download_sdk"
            :href="downloadSDKApi()"
          />
          <el-link
            :href="guideUrl"
            target="_blank"
            type="primary"
            class="ml10"
          >
            {{ $t('api.installGuide') }}
          </el-link>
        </el-col>
      </el-row>
      <el-row
        class="service_info"
        v-if="isDeleteApi"
      >
        <el-col :span="24">
          <el-button
            :disabled="serviceDetail.userId===userId?false:true"
            @click="deletePublicApi"
            size="small"
            class="deleteApi"
          >
            {{ $t('devTools.delete') }}
          </el-button>
          {{ $t('api.deleteApi') }}
        </el-col>
      </el-row>
    </div>
    <div id="swagger-ui" />
  </div>
</template>

<script>
import { Api } from '../../tools/api.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: '',
  props: {
    apiFileIdprop: {
      type: String,
      default: ''
    },
    serviceDetailprop: {
      type: Object,
      default: () => { }
    },
    isDeleteApiprop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      serviceDetail: this.serviceDetailprop,
      isDeleteApi: this.isDeleteApiprop,
      apiFileId: this.apiFileIdprop,
      userId: sessionStorage.getItem('userId'),
      codeLanguage: 'JAVA',
      optionsLanguage: [
        {
          value: 0,
          label: 'JAVA'
        }, {
          value: 1,
          label: 'Python'
        }, {
          value: 2,
          label: 'Go'
        }
      ],
      language: localStorage.getItem('language'),
      downloadUrl: '',
      guideUrl: 'https://gitee.com/edgegallery/docs/blob/master/Projects/Developer/SDK_Guide.md'
    }
  },
  methods: {
    // 获取Api-swaggerUI路径
    getApiUrl () {
      console.log(this.apiFileId)
      let apiUrl = Api.getSwaggerUrlApi(this.apiFileId, this.userId)
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
    },
    deletePublicApi () {
      console.log(this.serviceDetail)
      Api.deletePublicApi(this.serviceDetail.detailId, this.userId).then(() => {
        this.$message({
          type: 'success',
          message: this.$t('devTools.deleteSucc')
        })
        location.reload()
      }).catch(err => {
        if (err.response.data.code === 403) {
          this.$message.error(this.$t('promptMessage.guestPrompt'))
        } else {
          this.$message.error(this.$t('devTools.deleteFail'))
        }
      })
    },
    downloadSDKApi () {
      let lan = this.codeLanguage.toLowerCase()
      return Api.downloadSDKApi(this.apiFileId, lan)
    }
  },
  watch: {
    apiFileIdprop (newVal, oldVal) {
      this.apiFileId = newVal
      this.getApiUrl()
    },
    isDeleteApiprop (newVal, oldVal) {
      this.isDeleteApi = newVal
    }
  },
  mounted () {
    this.getApiUrl()
  }
}
</script>
<style lang="less">
.service_div{
  padding-left: 20px;
  .api_top{
    line-height: 25px;
  }
  .title{
    font-size: 15px;
    margin-top: 15px;
  }
  .el-row{
    font-size: 13px;
    .el-col{
      padding: 5px;
    }
    .el-select{
      width: 65px;
      .el-input__icon{
        width: 15px;
      }
      .el-input__inner{
        padding: 0 5px;
      }
      .el-input--suffix .el-input__inner{
        padding-right: 20px;
      }
    }
  }
  .download_sdk{
    width: 21px;
    height: 21px;
    display: inline-block;
    background: url('../../assets/images/download.png');
    margin-left: 10px;
  }
  .deleteApi{
    margin-right: 10px;
  }
}
</style>
