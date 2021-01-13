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
        服务文档
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="service-content">
      <!--
      <Opers
        :selected-service="selectedService"
        :service-list="serviceList"
        @showAbilityHomePage="showAbilityHomePage"
        @reloadContent="reloadContent"
      />-->
      <div
        class="doc-div"
        v-if="serviceList.length > 0"
      >
        <Document
          :guide-file-idprop="guideFileId"
          v-if="guideFileId"
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
// import Opers from './Opers.vue'
// import { Api } from '../../tools/api.js'
import axios from 'axios'

export default {
  components: {
    Document/*,
    Opers */
  },
  props: {
    groupId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      guideFileId: 'default',
      serviceList: [],
      selectedService: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    reloadContent (seletedLabel) {
      for (let i = 0; i < this.serviceList.length; i++) {
        if (this.serviceList[i].service === seletedLabel) {
          this.guideFileId = this.serviceList[i].guideFileId
          break
        }
      }
    },
    showAbilityHomePage () {
      this.$emit('showAbilityHomePage')
    },
    initServices () {
      axios('services.json')
      // Api.getServiceListApi(this.$route.params.groupId)
        .then(res => {
          if (res.data && res.data.capabilityDetailList) {
            let tmpServiceList = res.data.capabilityDetailList
            tmpServiceList = tmpServiceList.filter((item) => {
              return item.service
            })
            if (tmpServiceList.length > 0) {
              this.serviceList = tmpServiceList
              this.selectedService = tmpServiceList[0].service
              this.guideFileId = tmpServiceList[0].guideFileId
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
        let changeDate = Y + '-' + (M > 9 ? M : ('0' + M)) + '-' + (D > 9 ? D : ('0' + D)) + ' '
        return changeDate
      }
    }
  },
  created () {
  },
  mounted () {
  },
  beforeCreate () {},
  beforeMount () {
    this.initServices()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
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
