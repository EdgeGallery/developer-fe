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
  <div class="result-wrapper">
    <div
      v-if="status"
      class="result-item"
    >
      <img :src="deploySuccessImg">
      <div class="result-item__text">
        {{ $t('workspace.statusSuccess') }}
      </div>
    </div>
    <div
      v-else
      class="result-item"
    >
      <img :src="deployFailedImg">
      <div class="result-item__text">
        {{ $t('workspace.statusFail') }}
      </div>
    </div>
    <div class="result-desc-warapper">
      <p class="result-desc__item">
        {{ $t("workspace.testNode") }}：{{ testNodeIP }}
      </p>
      <p
        v-if="!status"
        class="result-desc__item"
      >
        {{ errorContent }}
      </p>
      <p class="result-desc__item">
        {{ $t("workspace.recycleTip") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeploymentResultComp',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    testNodeIP: {
      type: String,
      default: ''
    },
    errorContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      deploySuccessImg: require('@/assets/images/deploySuccessImg.png'),
      deployFailedImg: require('@/assets/images/deployFailedImg.png')
    }
  }
}
</script>

<style lang="less">
.result-item {
  width: 163px;
}

.result-item__text {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 30px;
  color: #380879;
  font-size: 20px;
  font-family: defaultFontLight;
}

.result-desc__item {
  margin-top: 10px;
  color: #380879;
  font-size: 14px;
  font-family: defaultFontLight;
}
</style>
