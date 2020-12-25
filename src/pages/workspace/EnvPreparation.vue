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
  <div class="envPreparation">
    <h3 class="title">
      <em class="el-icon-setting" />
      {{ $t('workspace.programTools') }}
    </h3>
    <div class="pad">
      {{ $t('workspace.prepare.toolTip') }}
    </div>
    <h3 class="title">
      <em class="el-icon-notebook-2" />
      {{ $t('workspace.programPlugin') }}
    </h3>
    <div class="pad">
      {{ $t('workspace.prepare.pluginTip1') }}
      <el-link
        type="info"
        :href="projectLink"
        target="_blank"
      >
        {{ $t('workspace.prepare.pluginTip2') }}
      </el-link>
      {{ $t('workspace.prepare.pluginTip3') }}
    </div>
    <h3 class="title">
      <em class="el-icon-edit-outline" />
      {{ $t('workspace.sampleCode') }}
    </h3>
    <div class="pad">
      {{ $t('workspace.prepare.codeTip1') }}
      <el-link
        type="info"
        :underline="false"
        @click="getApiFileId"
      >
        {{ $t('workspace.prepare.codeTip2') }}
      </el-link>
      {{ $t('workspace.prepare.codeTip3') }}
    </div>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
export default {
  name: 'EnvPreparation',
  data () {
    return {
      apiFileIdArr: [],
      userId: sessionStorage.getItem('userId'),
      projectLink: '/#/mecDeveloper/plugin/list'
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        this.$emit('getStepData', { step: 'second', data: '', ifNext })
      }
    },
    async getApiFileId () {
      this.apiFileIdArr = []
      let projectId = sessionStorage.getItem('mecDetailID')
      await Workspace.getProjectInfoApi(projectId, this.userId).then(res => {
        let data = res.data.capabilityList
        if (data.length === 0) {
          this.$message.warning(this.$t('promptMessage.sampleCodeInfo'))
        } else {
          data.forEach(dataItem => {
            dataItem.capabilityDetailList.forEach(service => {
              this.apiFileIdArr.push(service.apiFileId)
            })
          })
          this.getSampleCode(this.apiFileIdArr)
        }
      })
    },
    getSampleCode (apiFileIdArr) {
      Workspace.getSampleCodeApi(apiFileIdArr)
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less">
.envPreparation{
  .title{
    em{
      margin-right: 15px;
    }
  }
  .pad {
    font-size: 13px;
    color: #575d6c;
    padding-left: 35px;
    padding-bottom: 15px;
    .el-link{
      margin-top: -4px;
      color: #688ef3;
    }
  }
}
</style>
