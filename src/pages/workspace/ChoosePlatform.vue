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
  <div class="choosePlatfrom">
    <h3 class="title">
      {{ $t('workspace.supportPlatform.title') }}
    </h3>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="Kubernetes" />
      <el-checkbox
        label="Openstack"
        disabled
      />
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'ChoosePlatfrom',
  data () {
    return {
      checkList: ['Kubernetes']
    }
  },
  methods: {
    emitStepData () {
      const ifNext = this.checkList.length
      if (ifNext) {
        this.$emit('getStepData', { step: 'second', data: '', ifNext })
      } else {
        this.$message.warning(this.$t('workspace.supportPlatform.title'))
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less">
.choosePlatfrom{
  .el-checkbox{
    display: block;
    margin: 0 0 15px 15px;
  }
  .el-checkbox__label{
    font-size: 16px;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #688ef3;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #688ef3;
    border-color: #688ef3;
  }
}
</style>
