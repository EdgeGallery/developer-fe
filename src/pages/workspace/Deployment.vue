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
  <div class="deployment">
    <h3 class="title">
      应用详情
    </h3>
    <div />
    <h3 class="title">
      部署状态
    </h3>
    <div />
  </div>
</template>

<script>
export default {
  name: 'Deployment',
  data () {
    return {

    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less">
.deployment{
  div{
    height: 200px;
    border: 1px solid #ddd;
    margin: 15px 0;
  }
}
</style>
