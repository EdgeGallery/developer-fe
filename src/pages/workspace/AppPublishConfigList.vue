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
  <div class="appPublicConfig">
    <el-table
      :data="appPublishListData"
      style="width: 100%"
    >
      <el-table-column
        prop="serviceName"
        :label="$t('workspace.servicename')"
      />
      <el-table-column
        prop="inPort"
        :label="$t('workspace.inPort')"
      />
      <el-table-column
        prop="version"
        :label="$t('workspace.version')"
      />
      <el-table-column
        prop="protocol"
        :label="$t('workspace.protocol')"
      />
      <el-table-column
        :label="$t('workspace.operatioin')"
      >
        <el-button
          size="medium"
          type="text"
          class="editBtn"
        >
          {{ $t('api.modify') }}
        </el-button>
        <el-button
          size="medium"
          type="text"
          class="deleteBtn"
        >
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
      appPublishListData: [{
        serviceName: 'MEC20201113001',
        inPort: 8080,
        version: 'v1.0',
        protocol: 'HTTP'
      }]
    }
  },
  methods: {
  },
  mounted () {
  }
}

</script>
