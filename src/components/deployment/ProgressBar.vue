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
  <div class="work-progress">
    <el-progress
      class="work-progress"
      :stroke-width="10"
      :percentage="progressBarProcess"
    />
    <ul class="label-wrapper">
      <li
        v-for="item in labelList"
        :key="item"
        class="label__item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progressBarProcess: {
      type: Number,
      default: 25
    },
    labelList: {
      type: Array,
      default: () => [
        '生成部署文件',
        '分配测试节点',
        '实例化应用',
        '获取部署状态'
      ]
    }
  }
}
</script>

<style>
/* style for progress-bar */
.work-progress .el-progress-bar__inner {
  background-color: #5844be;
}

.work-progress .el-progress-bar__outer {
  width: 500px;
  background-color: #e2e0ea;
}

.work-progress .el-progress__text {
  display: none;
}

.work-progress .label-wrapper {
  text-align: left;
  width: 540px;
}

.work-progress .label__item {
  display: inline-block;
  list-style: disc;
  margin-top: 10px;
  width: calc(540px / 4);
  color: #380879;
  font-size: 12px;
  font-family: defaultFontLight;
}

.work-progress .label__item::before {
  content: '';
  display: inline-block;
  position: relative;
  margin-right: 10px;
  top: -1px;
  width: 6px;
  height: 6px;
  background-color: #a698b9;
  border-radius: 50%;
}
</style>
