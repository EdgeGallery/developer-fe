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
  <div class="envPreparation">
    <p class="p-top">
      <strong>{{ $t('workspace.environmentPreparation') }}：</strong>{{ $t('workspace.environmentPreparationTip') }}
    </p>
    <h3 class="title">
      <em class="el-icon-setting" />
      {{ $t('workspace.programTools') }}
    </h3>
    <div class="pad">
      {{ $t('workspace.prepare.toolTip') }}
    </div>
    <h3 class="title">
      <em class="el-icon-notebook-2" />
      {{ $t('workspace.programPlugin') }}
    </h3>
    <div class="pad">
      {{ $t('workspace.prepare.pluginTip') }}
    </div>
    <div class="pad">
      <el-button
        type="primary"
        plain
        size="mini"
      >
        {{ $t('workspace.detail') }}
      </el-button>
    </div>
    <h3 class="title">
      <em class="el-icon-edit-outline" />
      {{ $t('workspace.sampleCode') }}
    </h3>
    <div class="pad">
      {{ $t('workspace.prepare.codeTip') }}
    </div>
    <div class="pad">
      <el-button
        type="primary"
        plain
        size="mini"
      >
        {{ $t('workspace.detail') }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnvPreparation',
  data () {
    return {

    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        this.$emit('getStepData', { step: 'second', data: '', ifNext })
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
.envPreparation{
  .p-top{
    margin-bottom: 15px;
  }
  .pad {
    padding-left: 35px;
    padding-bottom: 15px;
  }
}
</style>
