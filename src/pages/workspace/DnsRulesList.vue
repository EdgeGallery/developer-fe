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
  <div class="dnsRulesList">
    <el-table
      :data="dnsListData"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="domaiName"
        label="domaiName"
      />
      <el-table-column
        prop="ipAddressType"
        label="ipAddressType"
      />
      <el-table-column
        prop="ipAddress"
        label="ipAddress"
      />
      <el-table-column
        prop="ttl"
        label="ttl"
      />
      <el-table-column
        :label="$t('workspace.operatioin')"
      >
        <el-button size="mini">
          {{ $t('api.modify') }}
        </el-button>
        <el-button size="mini">
          {{ $t('devTools.delete') }}
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dnsListData: [{
        domaiName: 'service.org',
        ipAddressType: 'IP_V4',
        ipAddress: '172.30.2.17',
        ttl: '100'
      }]
    }
  },
  methods: {
  },
  mounted () {
  }
}

</script>
