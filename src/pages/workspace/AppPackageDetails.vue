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
  <div class="appPackageDetails">
    <el-dialog
      :title="$t('workspace.appDetails')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col
          :span="8"
          class="file_list"
        >
          <el-tree
            class="appDetail"
            :data="appPageListData"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @node-click="getFileDetail"
          />
        </el-col>
        <el-col :span="16">
          <div
            class="file_desc"
          >
            <mavon-editor
              v-model="markdownSource"
              :toolbars-flag="false"
              :editable="false"
              :subfield="false"
              default-open="preview"
              :box-shadow="false"
              preview-background="#ffffff"
            />
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      appPageListData: [],
      fileName: '',
      fileContent: '',
      projectId: sessionStorage.getItem('mecDetailID'),
      csarId: sessionStorage.getItem('csarId'),
      markdownSource: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    getAppPackageList () {
      Workspace.getAppPackageListApi(this.projectId, this.csarId).then(res => {
        this.appPageListData = res.data.children
        let APPD = {}
        this.appPageListData.forEach((item, index) => {
          if (item.name === 'APPD') {
            APPD = item
            this.appPageListData.splice(index, 1)
          }
        })
        this.appPageListData.unshift(APPD)
        if (this.appPageListData.length > 0) {
          this.$nextTick(function () {
            const firstNode = document.querySelector('.appDetail .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__content')
            firstNode.click()
          })
        }
      })
    },
    getFileDetail (val) {
      this.fileName = val.name
      if (!val.children) {
        Workspace.getAppFileApi(this.projectId, val.name).then(res => {
          if (val.name.indexOf('.md') >= 0) {
            this.markdownSource = res.data
          } else if (val.name.indexOf('.tgz') >= 0) {
            this.markdownSource = this.$t('promptMessage.fileNotSupport')
          } else if (val.name.indexOf('.json') >= 0) {
            this.markdownSource = '```json\r\n' + JSON.stringify(res.data, null, 2) + '\r\n```'
          } else {
            this.markdownSource = '```yaml\r\n' + res.data + '\r\n```'
          }
        }).catch(err => {
          if (err.response.data.message === 'file is null!') {
            this.markdownSource = this.$t('promptMessage.fileIsEmpty')
          }
        })
      }
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oDiv = document.getElementsByClassName('el-dialog')[0]
        const deviceHeight = document.documentElement.clientHeight
        oDiv.style.height = Number(deviceHeight) * 0.8 + 'px'
        const oDiv2 = document.getElementsByClassName('file_list')[0]
        oDiv2.style.height = Number(deviceHeight) * 0.7 + 'px'
        const oDiv3 = document.getElementsByClassName('file_desc')[0]
        oDiv3.style.height = Number(deviceHeight) * 0.7 + 'px'
      })
    }
  },
  mounted () {
    this.getAppPackageList()
    this.setApiHeight()
    let _this = this
    window.onresize = function () {
      _this.setApiHeight()
    }
  }
}

</script>
<style lang='less'>
.appPackageDetails{
  .el-dialog{
    margin: 0 auto;
  }
  .el-dialog__body {
    padding: 0 20px;
    padding-top: 0px !important;
    .el-checkbox {
      display: block;
      width: 80%;
      padding: 20px 10% 0;
    }
    .el-tree-node .el-tree-node__children{
      overflow: inherit;
    }
    .file_list{
      padding-right: 10px;
      overflow-y: auto;
    }
    .file_desc{
      padding: 10px;
      white-space: pre-wrap;
      line-height: 25px;
      overflow-y: auto;
      .v-note-wrapper{
        border: none;
      }
      .v-note-wrapper .v-note-panel .v-note-show{
        overflow: hidden;
        .hljs, pre{
          background: #1e1e1e;
          color: #fff;
        }
      }
    }
  }
}

</style>
