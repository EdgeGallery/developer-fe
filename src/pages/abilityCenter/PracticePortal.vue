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
  <div
    class="practice-card"
  >
    <div class="practice-cell cell-1">
      <div
        class="practice-panel"
      >
        <img
          src="../../assets/images/videoClassArea.png"
          alt=""
          class="practice-panel-view"
          rel="noopener noreferrer"
        >
        <div class="practice-panel-bd">
          <div class="practice-panel-title">
            {{ $t('api.videoTutorial') }}
          </div>
          <div class="practice-panel-cont">
            <div
              class="practice-panel-desc practice-line-clamp-2"
            >
              {{ $t('api.videoTutorialDetail') }}
            </div>
            <el-button
              round
              class="practice-panel-ft"
              @click="jumpToVideo"
            >
              {{ $t('api.Detail') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="practice-cell cell-2">
      <div
        class="practice-panel"
      >
        <div class="practice-panel-hd">
          <img
            src="../../assets/images/QA_area.png"
            alt=""
            class="practice-panel-view"
          >
        </div>
        <div class="practice-panel-bd">
          <div class="practice-panel-title">
            {{ $t('api.developerCommunity') }}
          </div>
          <div class="practice-panel-cont">
            <div
              class="practice-panel-desc practice-line-clamp-2"
            >
              {{ $t('api.developerCommunityDetail') }}
            </div>
            <el-button
              round
              class="practice-panel-ft"
              @click="jumpToCommunicating"
            >
              {{ $t('api.Detail') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    jumpToCommunicating () {
      window.open('http://www.edgegallery.org/communication', '_blank')
    },
    jumpToVideo () {
      window.open('http://www.edgegallery.org/video', '_blank')
    }
  }
}
</script>
<style lang='less' scoped>
.practice-card {
  font-size: 0;
  .practice-cell {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    font-size: 14px;
    text-align: left;
  }
}
.practice-panel {
  display: block;
  box-sizing: border-box;
  background-color: #fff;
  text-decoration: none;
  position: relative;
  top: 0;
  transition: all .2s linear;
}
.practice-panel-view {
  display: block;
  width: 100%;
  height: 100%;
}
.practice-panel-bd {
    padding: 20px 20px 12px 30px;
    margin-top: -255px;
    width: 50%;
}
.practice-panel-title {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.practice-panel-title::before{
  content:'';
  display:inline-block;
  width:3px;
  height:18px;
  margin-right:3px;
  background: black;
  position: relative;
  top:4px;
}
.practice-panel-cont {
  padding-left: 14px;
  .el-button {
    padding: 4px 10px
  }
}
.practice-panel-ft {
  margin-top: 18px;
}
@media (min-width: 769px){
  .practice-card{
    margin-bottom: -20px;
  }
  .practice-card>.practice-cell {
    width: calc((100% - 20px) / 2);
  }
  .cell-1{
      margin-right: 20px;
  }
  .practice-cell>* {
    white-space: normal;
  }
}
</style>
