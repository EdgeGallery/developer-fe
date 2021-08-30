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
  <div class="select-envs">
    <div class="deployment-test-envs__body">
      <div class="deployment-test-envs__item">
        <el-radio
          class="work-radio"
          v-model="testEnvsIndex"
          label="0"
        >
          {{ "" }}
        </el-radio>
        <div class="deployment-test-envs-item__inner">
          <div class="img-holder icon-sandboxEnv" />
          <div class="envs-title">
            {{ $t("workspace.sandboxEnv") }}
          </div>
          <div class="envs-desc">
            {{ $t("workspace.sandboxEnvDesc") }}
          </div>
        </div>
      </div>
      <div class="deployment-test-envs__item">
        <el-radio
          class="work-radio"
          v-model="testEnvsIndex"
          label="1"
        >
          {{ "" }}
        </el-radio>
        <div class="deployment-test-envs-item__inner">
          <div class="img-holder icon-fiveGEnv" />
          <div class="envs-title">
            {{ $t("workspace.fiveGEnv") }}
          </div>
          <div class="envs-desc">
            {{ $t("workspace.fiveGEnvDesc") }}
          </div>
        </div>
      </div>
    </div>
    <div class="deployment-button__wrapper">
      <el-button
        class="deploy-btn"
        :disabled="deployStatus === 'DEPLOYING' || testFinished || deployStatus === 'CREATING'"
        @click="handleStartDeploy"
      >
        {{ $t("workspace.startDeployment") }}
      </el-button>
      <el-button
        class="deploy-btn"
        :disabled="(deployStatus === 'DEPLOYING' || !testFinished || deployStatus === 'CREATING') "
        @click="handleCleanTestEnv"
      >
        {{ $t("workspace.recycle") }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectTestEnvironmentComp',
  props: {
    deployStatus: {
      type: String,
      default: ''
    },
    testFinished: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      testEnvsIndex: '0'
    }
  },
  methods: {
    handleStartDeploy () {
      this.$emit('startDeploy', this.testEnvsIndex)
    },
    handleCleanTestEnv () {
      this.$emit('cleanTestEnv')
    }
  }
}
</script>

<style lang="less">
.deployment-test-envs__body {
  text-align: left;
}

.deployment-test-envs__item {
  display: inline-block;
  position: relative;
  text-align: left;
  padding-right: 40px;
  margin-bottom: 20px;
  min-width: 275px;
}

.deployment-test-envs__item .work-radio {
  position: absolute;
  top: 10px;
}

.deployment-test-envs-item__inner {
  display: inline-block;
  padding-left: 30px;
}

.deployment-test-envs-item__inner .img-holder {
  width: 65px;
  height: 65px;
  background-color: transparent;
  box-shadow: 0 0 10px 10px #dedeea inset;
  border-radius: 8px;
}

.deployment-test-envs-item__inner .icon-sandboxEnv {
  background: url('../../assets/images/sandboxicon.png') center no-repeat;
}

.deployment-test-envs-item__inner .icon-fiveGEnv {
  background: url('../../assets/images/5gicon.png') center no-repeat;
}

.deployment-test-envs-item__inner .envs-title {
  margin-top: 20px;
  color: #380879;
  font-family: defaultFontLight;
  font-size: 16px;
}

.deployment-test-envs-item__inner .envs-desc {
  margin-top: 5px;
  color: #380879;
  font-family: defaultFontLight;
  font-size: 14px;
}

.deployment-button__wrapper {
  margin-left: 30px;
}

.deployment-button__wrapper .deploy-btn {
  margin-right: 25px;
  height: 39px;
  background-color: #8278b7;
  border-radius: 8px;
  border-color: #8278b7;
  color: #fff;
  font-size: 16px;
  font-family: defaultFontLight;
}

.deployment-button__wrapper .deploy-btn.is-disabled {
  height: 39px;
  background-color: #b0a6e4;
  border-radius: 8px;
  border-color: #b0a6e4;
  color: #fff !important;
  font-family: defaultFontLight;
}

.deployment-button__wrapper .deploy-btn.is-disabled:hover {
  background-color: #b0a6e4;
  color: #fff;
}
</style>
