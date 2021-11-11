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
  <div class="distribute-finish">
    <div class="distribute-finish__body">
      <div class="distribute-finish__icon">
        <embed
          :src="successImg"
          width="30"
          height="30"
        >
      </div>
      <div class="distribute-finish__title">
        {{ $t("distributeDeploy.distributeDeploySuccess") }}
      </div>
      <div class="distribute-finish__buttons">
        <button
          class="distribute-finish__button"
          @click="handleClickFinish"
        >
          {{ $t("common.finish") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import successImg from '@/assets/images/mecm/distributeDeploy/distribute_deploy_success.svg'

export default {
  name: 'DistributeSuccess',
  data () {
    return {
      successImg: successImg
    }
  },
  methods: {
    handleClickFinish () {
      sessionStorage.setItem('currentFlow', 9)
      this.$router.push('/EG/developer/home')
    }
  }
}
</script>

<style>
.distribute-finish {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.distribute-finish__body {
  display: block;
  left: 50%;
  width: 465px;
  height: 286px;

  background-image: url("../../assets/images/mecm/distributeDeploy/distribute_deploy_success_bg.png");
  border-radius: 17px;
  border: solid 1px #b6a4ec;
  text-align: center;
  box-shadow: 15px 15px 100px rgba(41, 39, 182, 0.3);
}

.distribute-finish__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  background-color: #73e2b7;
  margin: 61px auto;
  margin-bottom: 20px;
}

.distribute-finish__title {
  display: block;
  font-size: 16px;
  font-family: defaultFontUltraLight;
}

.distribute-finish__button {
  position: relative;
  min-width: 88px;
  height: 24px;
  margin-top: 43px;
  border-radius: 12px;
  padding: 0 10px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-family: defaultFontUltraLight;
  color: #5944c0;
  box-shadow: 0 6px 5px #4c55aa80;
}
</style>
