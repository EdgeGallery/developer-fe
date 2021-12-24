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
    class="result"
  >
    <div
      class="result-check"
      :class="checkFlag.formatSuccess ? 'success' : 'error'"
    >
      <em
        v-show="checkFlag.formatSuccess"
        class="el-icon-success"
      />
      <em
        v-show="!checkFlag.formatSuccess"
        class="el-icon-error"
      />
      {{ $t('container.format') }}
    </div>
    <div
      class="result-check"
      :class="checkFlag.imageSuccess ? 'success' : 'error'"
    >
      <em
        v-show="checkFlag.imageSuccess"
        class="el-icon-success"
      />
      <em
        v-show="!checkFlag.imageSuccess"
        class="el-icon-error"
      />
      {{ $t('container.imageInfo') }}
    </div>
    <div
      class="result-check"
      :class="checkFlag.serviceSuccess ? 'success' : 'error'"
    >
      <em
        v-show="checkFlag.serviceSuccess"
        class="el-icon-success"
      />
      <em
        v-show="!checkFlag.serviceSuccess"
        class="el-icon-error"
      />
      {{ $t('container.serviceInfo') }}
    </div>
    <div
      class="result-check"
      :class="checkFlag.mepAgentSuccess ? 'success' : 'warning'"
    >
      <em
        v-show="checkFlag.mepAgentSuccess"
        class="el-icon-success"
      />
      <el-tooltip
        effect="dark"
        :content="$t('container.mepAgentTip')"
        placement="top-start"
      >
        <em
          v-show="!checkFlag.mepAgentSuccess"
          class="el-icon-warning"
        />
      </el-tooltip>
      MEP Agent
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckResult',
  props: {
    checkFlagProp: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      checkFlag: this.checkFlagProp
    }
  }
}
</script>

<style lang="less">
.result{
  position: absolute;
  top: 58px;
  left: 0;
  z-index: 2;
  .result-check {
    display: inline-block;
    margin-right: 15px;
    font-size: 16px;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    color: #fff;
    .el-icon-success:before{
      font-size: 16px;
    }
  }
  em{
    font-size: 12px;
    margin-right: 5px;
  }
  .success em{
    color: #3ac372;
  }
  .error em {
    color: #f23d3d;
  }
  .warning em {
    color: #f2bd3d;
  }
  .test-result__tip {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
  }
}
</style>
