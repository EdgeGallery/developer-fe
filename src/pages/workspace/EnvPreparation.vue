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

      {{ $t('workspace.prepare.codeTip2') }}
      <el-link
        type="info"
        :underline="false"
        @click="downloadSampleCode"
        :disabled="serviceNum===0"
      >
        {{ $t('workspace.prepare.codeTip3') }}
      </el-link>
      <el-row
        class="code_div"
        v-show="serviceNum!==0"
      >
        <el-col
          class="file_list"
        >
          <el-tree
            class="codeDetail"
            :data="sampleCodeListData"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @node-click="getFileDetail"
            empty-text=""
          />
        </el-col>
        <el-col class="file_desc">
          <mavon-editor
            v-model="markdownSource"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
            :box-shadow="false"
            preview-background="#1e1e1e"
          />
        </el-col>
      </el-row>
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
      projectLink: '/#/mecDeveloper/plugin/list',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      sampleCodeListData: [],
      fileName: '',
      fileContent: '',
      markdownSource: '',
      serviceNum: 0
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
        this.serviceNum = data.length
        if (data.length > 0) {
          data.forEach(dataItem => {
            dataItem.capabilityDetailList.forEach(service => {
              this.apiFileIdArr.push(service.apiFileId)
            })
          })
          this.getSampleCodeList(this.apiFileIdArr)
        }
      })
    },
    downloadSampleCode () {
      this.getSampleCode(this.apiFileIdArr)
    },
    getSampleCode (apiFileIdArr) {
      Workspace.getSampleCodeApi(apiFileIdArr)
    },
    getSampleCodeList (apiFileIdArr) {
      Workspace.getSampleListApi(apiFileIdArr).then(res => {
        this.sampleCodeListData = res.data.children
        if (this.sampleCodeListData.length > 0) {
          this.$nextTick(function () {
            const firstNode = document.querySelector('.codeDetail .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__content')
            firstNode.click()
          })
        }
      })
    },
    getFileDetail (val) {
      this.fileName = val.name
      if (!val.children) {
        Workspace.getSampleContentApi(val.name).then(res => {
          this.markdownSource = '```java\r\n' + res.data + '\r\n```'
        })
      }
    }
  },
  created () {
  },
  mounted () {
    this.getApiFileId()
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
    font-size: 16px;
    color: #575d6c;
    padding-left: 35px;
    padding-bottom: 15px;
    .el-link{
      margin-top: -4px;
      color: #688ef3;
    }
    .el-link.is-disabled{
      color: #adb0b8;
    }
  }
  .code_div{
    margin-top: 25px;
    border: 1px solid #ddd;
    background: #f8f8f8;
  }
  .el-tree.codeDetail{
    background: #f8f8f8;
  }
  .el-tree-node>.el-tree-node__children{
    overflow: auto;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #e1f0ff;
  }
  .file_list{
    width: 280px;
  }
  .file_desc{
    width: calc(100% - 280px);
    white-space: pre-wrap;
    line-height: 25px;
    max-height: 500px;
    overflow: auto;
    overflow-x: auto;
    .v-note-wrapper{
      border: none;
    }
    .v-note-wrapper .v-note-panel .v-note-show{
      overflow: hidden;
      .hljs, pre{
        background: #1e1e1e;
        color: #fff;
        overflow-x: visible;
      }
      .hljs-keyword{
        color: #bab429;
      }
    }
  }
}
</style>
