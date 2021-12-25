<template>
  <div>
    <div
      class="swagger-wrapper"
    >
      <div class="service_div">
        <p class="capability-top defaultFont">
          {{ $t('service.apiMonitor') }}
        </p>
        <p class="title ">
          {{ $t('service.serviceDetail') }}
        </p>
        <el-row class="service_info">
          <el-col :span="12">
            <span class=""> {{ $t('service.serviceName1') }}</span>{{ serviceDetail.serviceName }}
          </el-col>
          <el-col :span="12">
            <span class=""> {{ $t('service.version1') }}</span>{{ serviceDetail.version }}
          </el-col>
        </el-row>
        <el-row class="service_info">
          <el-col :span="12">
            <span class="">{{ $t('service.publishTime') }}</span>{{ serviceDetail.uploadTime }}
          </el-col>
          <el-col :span="12">
            <span class="">{{ $t('service.type') }}</span>{{ serviceDetail.capabilityType }}
          </el-col>
        </el-row>
      </div>
      <div id="swagger-ui" />
    </div>
  </div>
</template>
<script>
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import { applicationApi } from '../../../api/developerApi.js'
import { formatDate } from '../../../tools/common.js'
export default {
  name: 'ServiceDetail',
  props: {
    serviceDetailData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      serviceDetail: {
        id: '',
        capabilityType: '',
        serviceName: '',
        serviceNameEn: '',
        uploadTime: '',
        version: ''
      },
      apiFileId: ''
    }
  },
  watch: {
    serviceDetailData: function (val) {
      this.serviceDetailData = val
      this.getDependencies()
    }
  },
  methods: {
    getDependencies () {
      if (JSON.stringify(this.serviceDetailData) !== '{}') {
        this.serviceDetail.capabilityType = this.serviceDetailData.group.type
        this.serviceDetail.serviceName = this.serviceDetailData.name
        this.serviceDetail.serviceNameEn = this.serviceDetailData.nameEn
        this.serviceDetail.uploadTime = formatDate(this.serviceDetailData.uploadTime)
        this.serviceDetail.version = this.serviceDetailData.version
        this.apiFileId = this.serviceDetailData.apiFileId
        let apiUrl = applicationApi.getApiUrl(this.apiFileId)
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
      }
    }
  },
  mounted () {
    this.getDependencies()
  }
}
</script>
<style lang="less">
    .swagger-wrapper {
      height: 100%;
      overflow-y: auto;
      width: 100%;
    }
    .swagger-wrapper::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    #swagger-ui{
      width: 100%;
      height: auto !important;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 40px 0 0 20px;
      .swagger-ui .info{
        margin: -25px 0;
      }
    }
    #swagger-ui::-webkit-scrollbar-thumb {
      box-shadow: 0 0 0 3px #7656cc inset;
    }
    .service_div{
      padding-left: 20px;
      .capability-top{
        line-height: 25px;
        font-size: 16px;
        letter-spacing: 1.5px;
        padding-right: 16px;
      }
      .service_info{
        span{
          font-size: 16px;
        }
      }
      .title{
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 0px;
        letter-spacing: 1.5px;
      }
      .el-row{
        font-size: 14px;
        .el-col{
          padding-top: 5px;
          padding-left: 0px;
        }
        .el-select{
          width: 80px;
          .el-input__icon{
            width: 15px;
            line-height: 22px;
          }
          .el-input__inner{
            padding: 0 6px;
          }
          .el-input--suffix .el-input__inner{
            padding-right: 8px;
            border-radius: 8px;
            font-size: 12px;
            width: 80px;
            color: #5844be;
            height: 22px !important;
            line-height: 22px !important;
          }
        }
      }
      .download_sdk{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../../assets/images/capability/capability_download.png') center center no-repeat;
        background-color: #5e40c8;
        border-radius: 50%;
        margin-left: 14px;
      }
      .guide_url{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../../assets/images/capability/capability_guide.png') center center no-repeat;
        background-color: #5e40c8;
        border-radius: 50%;
        margin-left: 5px;
        margin-top: 1px;
      }
    }
</style>
