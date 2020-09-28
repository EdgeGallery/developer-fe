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
  <div class="project-link">
    <div class="fourthstep">
      <div id="programTools">
        <el-link
          type="info"
          :href="toolLink"
          target="_blank"
        >
          <img
            src="../../../assets/images/newProject-fourth-icon1.png"
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
            src="../../../assets/images/newProject-fourth-icon2.png"
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
            src="../../../assets/images/newProject-fourth-icon3.png"
            alt=""
          >
          <p>{{ $t('workspace.sampleCode') }}</p>
        </el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, downloadFile } from '../../../tools/tool.js'
export default {
  data () {
    return {
      apiFileIdArr: [],
      userId: sessionStorage.getItem('userId'),
      toolLink: 'https://www.jetbrains.com/idea/',
      projectLink: '/#/mecDeveloper/plugin/list'
    }
  },
  methods: {
    async getApiFileId () {
      this.apiFileIdArr = []
      let projectId = sessionStorage.getItem('mecDetailID')
      let getGroupid = async (groupIdUrl) => {
        await Get(url).then(res => {
          let data = res.data.capabilityList
          data.forEach(capability => {
            capability.capabilityDetailList.forEach(capabilityDetail => {
              this.apiFileIdArr.push(capabilityDetail.apiFileId)
            })
          })
        })
        let serviceCount = Number(sessionStorage.getItem('serviceCount'))
        if (this.apiFileIdArr.length === serviceCount) {
          this.getSampleCode(this.apiFileIdArr)
        }
      }

      let url = 'mec/developer/v1/projects/' + projectId + '?userId=' + this.userId
      await Get(url).then(res => {
        let data = res.data.capabilityList
        data.forEach(dataItem => {
          let groupIdUrl = 'mec/developer/v1/capability-groups/' + dataItem.groupId
          getGroupid(groupIdUrl)
        })
      })
    },
    getSampleCode (apiFileIdArr) {
      let params = {
        url: 'mec/developer/v1/files/samplecode',
        params: apiFileIdArr
      }
      downloadFile(params)
    }
  },
  mounted () {}
}

</script>
<style lang='less' scoped>
.project-link{

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
  }
}
</style>
