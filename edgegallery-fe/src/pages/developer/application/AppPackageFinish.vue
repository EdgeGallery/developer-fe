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
  <div class="app-pack-finish">
    <div class="app-pack-finish__body">
      <div class="app-pack-finish__icon">
        <embed :src="successImg" width="30" height="30" />
      </div>
      <div class="app-pack-finish__title">
        {{ $t("appPackage.packFinished") }}
      </div>
      <div class="app-pack-finish__buttons">
        <button class="app-pack-finish__button">
          {{ $t("appPackage.packBack") }}
        </button>
        <button class="app-pack-finish__button">
          {{ $t("appPackage.packAuthentication") }}
        </button>
      </div>
      <div class="app-pack-finish__tip">
        {{ $t("appPackage.packFinishedTip") }}
      </div>
    </div>
  </div>
</template>

<script>
import successImg from '@/assets/images/application/app_pack_success.svg'

export default {
  name: 'AppPackageFinish',
  data () {
    return {
      successImg: successImg
    }
  }
}
</script>

<style>
.app-pack-finish {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.app-pack-finish__body {
  display: block;
  left: 50%;
  width: 465px;
  height: 286px;
  background-image: url("../../../assets/images/application/app_pack_success_bg.png");
  border-radius: 17px;
  border: solid 1px #b6a4ec;
  text-align: center;
  box-shadow: 15px 15px 100px rgba(41, 39, 182, 0.3);
}

.app-pack-finish__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  background-color: #73e2b7;
  margin: 41px auto;
  margin-bottom: 20px;
}

.app-pack-finish__title {
  display: block;
  font-size: 16px;
  font-family: defaultFontUltraLight;
}

.app-pack-finish__button {
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

.app-pack-finish__button:first-child {
  margin-right: 75px;
}

.app-pack-finish__tip {
  font-size: 12px;
  font-family: defaultFontUltraLight;
  margin: 15px 10px;
}
</style>
