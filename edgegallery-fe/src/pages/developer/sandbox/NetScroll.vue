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
  <div class="netScroll">
    <vue-seamless-scroll
      :data="listData"
      :class-option="defaultOption"
    >
      <ul class="ul-scoll defaultFontLight">
        <li
          v-for="(item, index) in listData"
          :key="index"
        >
          <p class="title">
            {{ item }}
          </p>
          <p class="clear">
            <span class="span-cicle lt" />
            <span class="span-line lt" />
            <span class="span-cicle lt" />
          </p>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'Example3',
  props: {
    networkListProp: {
      type: Array,
      default: () => []
    }
  },
  components: {
    vueSeamlessScroll
  },
  data () {
    return {
      listData: []
    }
  },
  computed: {
    defaultOption () {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }

  },
  mounted () {
    this.listData = this.networkListProp
  }
}
</script>

<style scoped lang="scss">
.netScroll{
  width: 154px;
  height: 96px;
  overflow: hidden;
  .ul-scoll{
    li{
      text-align: center;
      overflow: hidden;
      height: 24px;
      font-size: 10px;
      .title{
        display: block;
      }
      .span-cicle{
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
      }
      .span-line{
        width: calc(100% - 16px);
        height: 1px;
        background: #929292;
        margin-top: 4px;
      }
    }
  }
}
</style>
