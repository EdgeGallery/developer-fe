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
  <div class="fourthstep">
    <div id="programTools">
      <el-link
        type="info"
        :href="toolLink"
        target="_blank"
      >
        <img
          src="../../assets/images/newProject-fourth-icon1.png"
          alt=""
        >
        <p>{{ $t('workspace.programTools') }}</p>
      </el-link>
    </div>
    <div id="programPlugin">
      <el-link
        type="info"
        :href="projectLink"
        target="_blank"
      >
        <img
          src="../../assets/images/newProject-fourth-icon2.png"
          alt=""
        >
        <p>{{ $t('workspace.programPlugin') }}</p>
      </el-link>
    </div>
    <div id="sampleCode">
      <el-link
        type="info"
        @click="getApiFileId"
      >
        <img
          src="../../assets/images/newProject-fourth-icon3.png"
          alt=""
        >
        <p>{{ $t('workspace.sampleCode') }}</p>
      </el-link>
    </div>
  </div>
</template>

<script>
import { downloadFile } from '../../tools/tool.js'
export default {
  name: '',
  data () {
    return {
      apiFileIdArr: [],
      toolLink: 'https://www.jetbrains.com/idea/',
      projectLink: '/#/mecDeveloper/plugin/list'
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    getApiFileId () {
      this.apiFileIdArr = JSON.parse(sessionStorage.getItem('apiFileIdArr'))
      this.getSampleCode(this.apiFileIdArr)
      // console.log(this.apiFileIdArr)
    },
    getSampleCode (apiFileIdArr) {
      let params = {
        url: 'mec/developer/v1/files/samplecode',
        params: apiFileIdArr
      }
      downloadFile(params)
    }
  }
}
</script>

<style lang="less">
  .fourthstep{
    width: 100%;
    display: flex;
    color: #909399;
    div{
      flex-grow: 1;
      text-align: center;
      margin-top: 20px;
      img{
        width:46px;
        margin-bottom: 15px;
      }
    }

    .el-row{
      margin-bottom: 15px;
      .el-col-6{
        text-align: right;
      }
    }
  }
</style>
