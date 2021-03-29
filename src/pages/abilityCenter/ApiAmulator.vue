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
  <div class="mepapi">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/mep' }">
        {{ $t('nav.mepApi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $t('nav.apiMulator') }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="service-content">
      <div
        class="doc-div"
        v-if="serviceList.length > 0"
      >
        <API
          :api-file-idprop="apiFileId"
          :service-detailprop="serviceDetail"
          :is-delete-apiprop="false"
          v-if="apiFileId"
        />
        <div
          v-else
          class="noServiceInfo"
        >
          {{ $t('api.noDataNotice') }}
        </div>
      </div>
      <div
        v-else
        class="noServiceInfo"
      >
        {{ $t('api.noDataNotice') }}
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api/API.vue'
import { Api } from '../../tools/api.js'

export default {
  components: {
    API
  },
  props: {
    groupId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      serviceDetail: {
        capabilityType: '',
        serviceName: '',
        capabilityTypeEn: '',
        serviceNameEn: '',
        uploadTime: '',
        version: ''
      },
      apiFileId: 'default',
      serviceList: [],
      selectedService: ''
    }
  },
  computed: {},
  watch: {
    groupId () {
      this.initServices()
    }
  },
  methods: {
    initServices () {
      Api.getServiceListApi(this.$route.query.groupId)
        .then(res => {
          if (res.data && res.data.capabilityDetailList) {
            let tmpServiceList = res.data.capabilityDetailList
            tmpServiceList = tmpServiceList.filter((item) => {
              return item.service
            })
            if (tmpServiceList.length > 0) {
              this.serviceList = tmpServiceList
              this.selectedService = tmpServiceList[0].service
              this.apiFileId = tmpServiceList[0].apiFileId
              this.serviceDetail = {
                capabilityType: res.data.oneLevelName,
                capabilityTypeEn: res.data.oneLevelNameEn,
                serviceName: tmpServiceList[0].service,
                serviceNameEn: tmpServiceList[0].serviceEn,
                uploadTime: this.dateChange(tmpServiceList[0].uploadTime),
                version: tmpServiceList[0].version
              }
            }
          }
        })
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        return Y + '-' + (M > 9 ? M : ('0' + M)) + '-' + (D > 9 ? D : ('0' + D)) + ' '
      }
    }
  },
  beforeMount () {
    this.initServices()
  }
}
</script>
<style lang='less' scoped>
.mepapi{
  *{
    box-sizing: border-box;
  }
  .noServiceInfo {
  text-align: center;
}
.service-content{
  background: #ffffff;
  padding: 40px;
  }
}
</style>
