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
  <div
    id="div_deploydebug_vm"
    class="deploydebug_vm"
  >
    <el-card class="addRes-box-card">
      <el-button
        class="btn-addRes"
        type="primary"
        @click="deployTest"
        :disabled="deployListData.length!==0"
      >
        {{ $t('workspace.startDeployment') }}
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
export default {
  name: 'DeployDebugVMMain',
  props: {
    projectId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      deployListData: []
    }
  },
  methods: {
    deployTest () {
      vmService.vmDeployTestApi(this.projectId, this.userId).then(res => {
        console.log(res.data)
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang='less'>
.deploydebug_vm {
  padding: 0px 100px 0px 100px;
}
</style>
