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
      appId: sessionStorage.getItem('applicationId')
    }
  },
  methods: {
    getDependencies () {
      applicationApi.getServiceDependencies(this.appId).then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(ser => {
            this.selectedService.push(ser)
          })
          this.groups.forEach(group => {
            if (group.name === this.selectedService[0].oneLevelName) {
              applicationApi.getCapabilityByGroupId(group.id).then(result => {
                if (result.data) {
                  result.data.forEach(data => {
                    if (data.name === this.selectedService[0].twoLevelName) {
                      this.serviceDetail.capabilityType = data.group.type
                      this.serviceDetail.serviceName = data.name
                      this.serviceDetail.serviceNameEn = data.nameEn
                      this.serviceDetail.uploadTime = formatDate(data.uploadTime)
                      this.serviceDetail.version = data.version
                      this.apiFileId = data.apiFileId
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
                  })
                }
              })
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
