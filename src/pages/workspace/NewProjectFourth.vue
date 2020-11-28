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
      <img
        src="../../assets/images/newProject-fourth-icon1.png"
        alt=""
      >
      <p>{{ $t('workspace.programTools') }}</p>
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
import { Workspace } from '../../tools/api.js'
export default {
  name: '',
  data () {
    return {
      apiFileIdArr: [],
      userId: sessionStorage.getItem('userId'),
      projectLink: '/#/mecDeveloper/plugin/list'
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    // 获取第三步选择的能力的FileId
    getApiFileId () {
      this.apiFileIdArr = JSON.parse(sessionStorage.getItem('apiFileIdArr'))
      if (this.apiFileIdArr) {
        Workspace.getSampleCodeApi(this.apiFileIdArr)
      } else {
        this.$message.warning(this.$t('promptMessage.sampleCodeInfo'))
      }
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
