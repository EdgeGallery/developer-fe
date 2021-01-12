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
        <div class="practice-panel-hd">
          <img
            src="https://imgcache.qq.com/open_proj/proj_qcloud_v2/platform/special/ai-platform/css/img/rno-12-media-panel/1.png"
            alt=""
            class="practice-panel-view"
          >
        </div>
        <div class="practice-panel-bd">
          <div class="practice-panel-title">
            视频教程课堂专区
          </div>
          <div class="practice-panel-cont">
            <div
              class="practice-panel-desc practice-line-clamp-2"
            >
              指导开发者基于edgegallery平台进行app应用开发、部署调测、测试认证以及应用发布的全流程。
            </div>
          </div>
          <footer class="practice-panel-ft">
            <a
              class="practice-link"
              href="https://www.edgegallery.org/%e8%a7%86%e9%a2%91%e8%b5%84%e6%ba%90"
              target="_blank"
            >查看详情</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="practice-cell cell-2">
      <div
        class="practice-panel"
      >
        <div class="practice-panel-hd">
          <img
            src="https://imgcache.qq.com/open_proj/proj_qcloud_v2/platform/special/ai-platform/css/img/rno-12-media-panel/2.png"
            alt=""
            class="practice-panel-view"
          >
        </div>
        <div class="practice-panel-bd">
          <div class="practice-panel-title">
            开发者问答社区
          </div>
          <div class="practice-panel-cont">
            <div
              class="practice-panel-desc practice-line-clamp-2"
            >
              用于开发者的交流和学习。
            </div>
          </div>
          <footer class="practice-panel-ft">
            <a
              class="practice-link"
              href="http://www.edgegallery.org/%E6%B2%9F%E9%80%9A%E4%BA%A4%E6%B5%81"
              target="_blank"
            >查看详情</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
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
  box-shadow: 0 2px 4px rgba(3,27,78,.06);
  border: 1px solid #E5E8ED;
}
.practice-panel-hd {
  height: 100px;
}
.practice-panel-view {
  display: block;
  width: 100%;
  height: 100%;
}
.practice-panel-bd {
    padding: 20px 20px 12px;
}
.practice-panel-title {
    margin-bottom: 12px;
    font-size: 18px;
    line-height: 28px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.practice-panel-ft {
    border-top: 1px solid #E5E5E5;
    padding-top: 12px;
    margin-top: 12px;
    .practice-link {
      font-size: 14px;
      color: #00A4FF;
      line-height: 24px;
    }
}
.practice-panel:hover .practice-panel-title {
    color: #00A4FF;
}
@media (min-width: 769px){
  .practice-card{
    margin-bottom: -20px;
  }
  .practice-card>.practice-cell {
    width: calc((100% - 20px - 1px)/ 2);
  }
  .cell-1{
      margin-right: 20px;
  }
  .practice-cell>* {
    white-space: normal;
  }
  .practice-panel-hd {
    height: 140px;
  }
}
</style>
