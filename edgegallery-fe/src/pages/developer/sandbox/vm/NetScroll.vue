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
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Example3',
  props: {
    networkListProp: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      listData: []
    }
  },
  watch: {
    networkListProp (val) {
      this.listData = val
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
        width: calc(100% - 8px);
        height: 1px;
        background: #4F3AA4;
        margin-top: 4px;
      }
    }
  }
}
</style>
