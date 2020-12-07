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
  <div class="trafficRulesList">
    <el-table
      :data="trafficListData"
      style="width: 100%"
    >
      <el-table-column
        prop="filterType"
        label="filterType"
      />
      <el-table-column
        prop="priority"
        label="priority"
      />
      <el-table-column
        prop="srcAddress"
        label="srcAddress"
      />
      <el-table-column
        prop="action"
        label="action"
      />
      <el-table-column
        prop="interfaceType"
        label="interfaceType"
      />
      <el-table-column
        :label="$t('workspace.operation')"
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
      trafficListData: [{
        filterType: 'Flow',
        priority: 1,
        srcAddress: '0.0.0./0',
        action: 'PASSTHROUGH',
        interfaceType: 'TUNNEL'
      }]
    }
  },
  methods: {
  },
  mounted () {
  }
}

</script>
