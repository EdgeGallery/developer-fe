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
        {{ $t('nav.serviceDoc') }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="service-content">
      <div
        class="doc-div"
        v-if="refGuideFileId"
      >
        <Document
          :guide-file-idprop="refGuideFileId"
          v-if="refGuideFileId"
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
import Document from '../api/Document.vue'

export default {
  components: {
    Document
  },
  props: {
    guideFileId: {
      type: String,
      default: ''
    },
    guideFileIdEn: {
      type: String,
      default: ''
    }
  },
  computed: {
    refGuideFileId: function () {
      return this.$i18n.locale === 'en' ? this.$route.query.guideFileIdEn : this.$route.query.guideFileId
    }
  }
}
</script>
<style lang='less' scoped>
.mepapi{
  *{
    box-sizing: border-box;
  }
  .mep-main{
    background-color: #fff;
    padding: 40px 40px 0;
    position: relative;
    .service-content {
      padding-left: 5px;
      .doc-div{
        float: left;
        width: 100%;
      }
      .noServiceInfo {
        text-align: center;
      }
    }
  }
}
</style>
