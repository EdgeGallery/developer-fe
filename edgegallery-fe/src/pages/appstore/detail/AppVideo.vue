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
  <div class="appVedio">
    <div
      class="vedio"
      v-show="playerOptions.sources.length===0"
    >
      <img
        :src="videoIconUrl"
        alt=""
      >
      <p>
        {{ $t('store.hasNotVideo') }}
      </p>
    </div>
    <div v-show="playerOptions.sources.length!==0">
      <video-player
        class="video-player-box vjs-big-play-centered demo-tab"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppVideo',
  props: {
    playerOptions: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      videoIconUrl: require('../../../assets/images/appstore/app_detail_info_icon.png'),
      userId: sessionStorage.getItem('userId')
    }
  }
}
</script>
<style lang="less">
.appVedio {
  width: 500px;
  margin: 10px auto;
  border-radius: 16px ;
  padding: 20px;
  .vedio{
    color: #fff;
    text-align: center;
    p{
      margin: 10px 0 30px;
    }
  }
}
</style>
