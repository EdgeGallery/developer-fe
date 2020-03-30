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
  <div class="dataStatistical">
    <div class="vChart">
      <el-row>
        <myTitle :title="$t('workspace.realTimeStatistics')" />
        <ve-line :data="chartData" />
      </el-row>
      <el-row :gutter="20">
        <myTitle :title="$t('workspace.performaceStatistics')" />
        <el-col
          :span="8"
          class="elProgress"
        >
          <el-progress
            type="dashboard"
            :percentage="23"
            :width="100"
          />
          <p>CPU</p>
        </el-col>
        <el-col
          :span="8"
          class="elProgress"
        >
          <el-progress
            type="dashboard"
            :percentage="64"
            :width="100"
          />
          <p>MEM</p>
        </el-col>
        <el-col
          :span="8"
          class="elProgress"
        >
          <el-progress
            type="dashboard"
            :percentage="75"
            :width="100"
          />
          <p>DISK</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import myTitle from '../../../components/common/Title.vue'

export default {
  components: {
    myTitle
  },
  data () {
    return {
      chartData: {
        columns: ['Date', 'API Calls', 'Online Users'],
        rows: [
          { Date: '2019-12-13 10:40', 'API Calls': 1393, 'Online Users': 100 },
          { Date: '2019-12-13 13:40', 'API Calls': 3530, 'Online Users': 321 },
          { Date: '2019-12-13 16:40', 'API Calls': 2923, 'Online Users': 210 },
          { Date: '2019-12-13 19:40', 'API Calls': 1723, 'Online Users': 145 },
          { Date: '2019-12-13 22:40', 'API Calls': 3792, 'Online Users': 350 },
          { Date: '2019-12-14 01:40', 'API Calls': 4593, 'Online Users': 500 },
          { Date: '2019-12-14 04:40', 'API Calls': 1203, 'Online Users': 50 },
          { Date: '2019-12-14 07:40', 'API Calls': 2568, 'Online Users': 40 },
          { Date: '2019-12-14 10:40', 'API Calls': 5013, 'Online Users': 120 }
        ]
      }
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style lang='less' scoped>
</style>
