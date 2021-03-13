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
  <div class="mepapi">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/mep' }">
        {{ $t('nav.mepApi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $t('nav.apiMulator') }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="service-content">
      <div
        class="doc-div"
      >
        <iframe
          id="iframe"
          title="Ascend"
          :src="src"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    towLevelName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      src: 'http://124.70.102.14:30222/'
    }
  },
  mounted () {
    this.src = 'http://124.70.102.14:30222/#/' + this.towLevelName.replace(/\s*/g, '')
  },
  methods: {}
}
</script>
<style lang='less' scoped>
.mepapi{
    height: 100%;
  *{
    box-sizing: border-box;
  }
  .noServiceInfo {
  text-align: center;
}
.service-content{
  background: #ffffff;
  padding: 40px;
  height: calc(100% - 55px);
  }
  .doc-div{
    height: 100%;
  }
  #iframe{
    width:100%;
    height: 100%;
    border: 0;
  }
}
</style>
