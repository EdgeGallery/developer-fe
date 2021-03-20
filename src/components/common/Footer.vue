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
  <div class="footerBar">
    <img
      src="../../assets/images/footer_logo.png"
      alt=""
    >
    Copyright © Huawei Technologies Co., Ltd. 2019. All rights reserved
  </div>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style lang='less' scoped>
.footerBar{
  height:40px;
  line-height: 40px;
  text-align: center;
  background:#f5f5f5;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  img{
    height: 25px;
    position: relative;
    top: 6px;
    left: -5px;
  }
}
</style>
