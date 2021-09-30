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
  <div class="mepapi padding_default">
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
        v-if="apiFileId"
      >
        <API
          :api-file-idprop="apiFileId"
          :service-idprop="serviceId"
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

export default {
  components: {
    API
  },
  props: {
  },
  data () {
    return {
      apiFileId: this.$route.query.apiFileId,
      serviceId: this.$route.query.serviceId
    }
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
