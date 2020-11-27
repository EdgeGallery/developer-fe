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
      {{ $t('workspace.prepare.pluginTip1') }}
      <el-link
        :herf="projectLink"
        type="primary"
        :underline="false"
      >
        {{ $t('workspace.prepare.pluginTip2') }}
      </el-link>
      {{ $t('workspace.prepare.pluginTip3') }}
    </div>
    <h3 class="title">
      <em class="el-icon-edit-outline" />
      {{ $t('workspace.sampleCode') }}
    </h3>
    <div class="pad">
      {{ $t('workspace.prepare.codeTip1') }}
      <el-link
        type="primary"
        :underline="false"
      >
        {{ $t('workspace.prepare.codeTip2') }}
      </el-link>
      {{ $t('workspace.prepare.codeTip3') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnvPreparation',
  data () {
    return {
      projectLink: '/#/mecDeveloper/plugin/list'
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
  .title{
    em{
      margin-right: 15px;
    }
  }
  .pad {
    font-size: 13px;
    color: #575d6c;
    padding-left: 35px;
    padding-bottom: 15px;
    .el-link{
      margin-top: -4px;
      color: #688ef3;
    }
  }
}
</style>
