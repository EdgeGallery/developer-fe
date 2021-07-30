<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
    <div>
      <table class="table-content">
        <!-- programTools -->
        <tr>
          <td
            class="title-EnvPreparation"
            :class="{'enTitle':language==='en'}"
          >
            {{ $t('workspace.programTools') }}
          </td>
          <td class="pad fontUltraLight">
            {{ $t('workspace.prepare.toolTip') }}
          </td>
        </tr>
        <!-- programPlugin -->
        <tr>
          <td
            class="title-EnvPreparation"
            :class="{'enTitle':language==='en'}"
          >
            {{ $t('workspace.programPlugin') }}
          </td>
          <td class="pad fontUltraLight">
            {{ $t('workspace.prepare.pluginTip1') }}
            <a
              @click="jumpToProject"
              target="_blank"
              class="link defaultFont"
            >{{ $t('workspace.prepare.pluginTip2') }}
            </a>
            {{ $t('workspace.prepare.pluginTip3') }}
          </td>
        </tr>
        <!-- sampleCode -->
        <tr>
          <td
            class="title-EnvPreparation"
            :class="{'enTitle':language==='en'}"
          >
            {{ $t('workspace.sampleCode') }}
          </td>
          <td class="pad fontUltraLight">
            {{ $t('workspace.prepare.codeTip1') }}
            <a
              @click="downloadSampleCode"
              target="_blank"
              class="link defaultFont"
              :disabled="serviceNum===0"
            >{{ $t('workspace.prepare.codeTip2') }}
            </a>
            {{ $t('workspace.prepare.codeTip3') }}
          </td>
        </tr>
      </table>
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
          >
            <span
              class="el-tree-node__label"
              slot-scope="{ node }"
            >
              <el-tooltip
                popper-class="atooltip"
                class="item"
                :content="node.label"
                placement="right"
              >
                <span> {{ node.label }} </span>
              </el-tooltip>
            </span>
          </el-tree>
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
      language: localStorage.getItem('language'),
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
    jumpToProject () {
      this.$router.push('/mecDeveloper/plugin/list')
    },
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
  mounted () {
    this.getApiFileId()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>

<style lang="less">
.envPreparation{
  .title-EnvPreparation{
    color: #5e40c8;
    font-size: 16px;
  }
  .title-EnvPreparation.enTitle{
    width: 150px;
    text-align: left;
    vertical-align: top;
  }
  .table-content{
    td {
      padding-top: 10px;
    }
  }
  .pad {
    padding-left: 13px;
    font-size: 16px;
    color: #5e40c8;
    padding-bottom: 1px;
    .link{
      cursor: pointer;
      color: #5e40c8;
      font-size: 16px;
    }
    .link.is-disabled{
      color: #bd3f3f;
    }
  }
  .el-row {
    margin-bottom: 18px;
  }
  .code_div{
    margin-top: 27px;
    background: #f8f8f8;
    border-radius: 16px;
    height: 468px;
  }
  .el-tree.codeDetail{
    background: #f8f8f8;
    border-radius: 16px 0 0 16px;
    height: 466px;
    box-shadow: 6px -1px 40px 0 rgba(36, 20, 119, 0.11) inset;
    overflow: scroll;
  }
  .el-tree.codeDetail::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #dfeefe;
    border-radius: 16px 0 0 0;
  }
  .el-tree-node__content:hover {
    background-color: #dfeefe;
    border-radius: 16px 0 0 0;
  }
  .el-tree-node__label{
    font-size: 15px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 151px;
  }
  .file_list{
    width: 260px;
  }
  .file_desc{
    border-radius: 0 16px 16px 0;
    width: calc(100% - 260px);
    white-space: pre-wrap;
    line-height: 25px;
    max-height: 466px;
    overflow: auto;
    overflow-x: auto;
    .v-note-wrapper{
      border: none;
      min-height: 467px;
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
    .markdown-body code{
      font-size: 15px;
    }
  }
  .file_desc::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
.atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow {
  border-right-color: #5e40c8;
}
.atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow:after {
  border-right-color: #5e40c8;
}
.atooltip {
  background: #5e40c8 !important;
}
</style>
