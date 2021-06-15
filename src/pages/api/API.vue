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
  <div>
    <div class="service_div">
      <p class="api_top">
        {{ $t('workspace.apiTopText') }}
      </p>
      <p class="title serviceTip">
        {{ $t('workspace.serviceDetails') }}
      </p>
      <el-row class="title service_info">
        <el-col :span="24">
          <span class="span_left">{{ $t('test.testApp.type') }} :</span>{{ serviceDetail.capabilityType }}
        </el-col>
      </el-row>
      <el-row class="title service_info">
        <el-col :span="11">
          <span class="span_left">{{ $t('workspace.servicename') }} :</span>{{ serviceDetail.serviceName }}
        </el-col>
        <el-col :span="13">
          <span class="span_left">{{ $t('workspace.version') }} :</span>{{ serviceDetail.version }}
        </el-col>
      </el-row>
      <el-row class="title service_info">
        <el-col :span="11">
          <span class="span_left">{{ $t('workspace.releaseTime') }} :</span>{{ serviceDetail.uploadTime }}
        </el-col>
        <el-col :span="13">
          <span class="span_left">{{ $t('workspace.sdkDownload') }} :</span>

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
      required: true
    },
    isDeleteApiprop: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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
  computed: {
    serviceDetail () {
      return {
        capabilityType: this.$i18n.locale === 'en' ? this.serviceDetailprop.capabilityTypeEn : this.serviceDetailprop.capabilityType,
        serviceName: this.$i18n.locale === 'en' ? this.serviceDetailprop.serviceNameEn : this.serviceDetailprop.serviceName,
        uploadTime: this.serviceDetailprop.uploadTime,
        version: this.serviceDetailprop.version
      }
    }
  },
  methods: {
    // Feth Api-swaggerUI path
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
<style lang="less" scoped>
.service_div{
  padding-left: 20px;
  .api_top{
    font-size: 20px;
    line-height: 35px;
    width: 90%;
    max-width: 1400px;
    margin: 20px 0 5px 100px;
  }
  .serviceTip{
    margin-top: 30px;
    font-weight: 700;
  }
  .title{
    line-height: 35px;
    max-width: 1400px;
    margin: 5px 0 5px 100px;
    font-size: 20px;
  }
  .service_info{
    font-size: 18px;
    .el-col {
    padding: 0px;
}
  }
  .el-row{
    font-size: 18px;
    .el-col{
      padding: 5px;
      .span_left{
        color: #adb0b8;
        display: inline-block;
        min-width: 90px;
        text-align: right;
        padding-right: 20px;
      }
    }
    .el-select{
      width: 80px;
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
