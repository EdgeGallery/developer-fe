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
            v-html="fileContent"
          />
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
      testData: [{ 'name': 'Artifacts', 'id': 'Artifacts', 'children': [{ 'name': 'ChangeLog.txt', 'id': 'ChangeLog.txt', 'children': null, 'parent': false }, { 'name': 'Deployment', 'id': 'Deployment', 'children': [{ 'name': 'Charts', 'id': 'Charts', 'children': [{ 'name': '.gitkeep', 'id': '.gitkeep', 'children': null, 'parent': false }, { 'name': '7e9b913f-748a-42b7-a088-abe3f750f04c.tgz', 'id': '7e9b913f-748a-42b7-a088-abe3f750f04c.tgz', 'children': null, 'parent': false }], 'parent': true }], 'parent': true }, { 'name': 'Docs', 'id': 'Docs', 'children': [{ 'name': 'template.md', 'id': 'template.md', 'children': null, 'parent': false }], 'parent': true }, { 'name': 'Informational', 'id': 'Informational', 'children': [{ 'name': 'user_guide.txt', 'id': 'user_guide.txt', 'children': null, 'parent': false }], 'parent': true }, { 'name': 'Other', 'id': 'Other', 'children': [{ 'name': 'my_script.csh', 'id': 'my_script.csh', 'children': null, 'parent': false }], 'parent': true }, { 'name': 'Tests', 'id': 'Tests', 'children': [{ 'name': 'health check.yaml', 'id': 'health check.yaml', 'children': null, 'parent': false }], 'parent': true }], 'parent': true }, { 'name': 'Definitions', 'id': 'Definitions', 'children': [{ 'name': 'MainServiceTemplate.yaml', 'id': 'MainServiceTemplate.yaml', 'children': null, 'parent': false }], 'parent': true }, { 'name': 'MainServiceTemplate.mf', 'id': 'MainServiceTemplate.mf', 'children': null, 'parent': false }, { 'name': 'TOSCA-Metadata', 'id': 'TOSCA-Metadata', 'children': [{ 'name': 'TOSCA.meta', 'id': 'TOSCA.meta', 'children': null, 'parent': false }], 'parent': true }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      appPageListData: [],
      fileName: '',
      fileContent: '',
      projectId: sessionStorage.getItem('mecDetailID'),
      csarId: sessionStorage.getItem('csarId')
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    getAppPackageList () {
      Workspace.getAppPackageListApi(this.projectId, this.csarId).then(res => {
        this.appPageListData = res.data.children
        console.log(this.appPageListData)
        this.$nextTick(function () {
          const firstNode = document.querySelectorAll('.el-tree>div')[2]
          firstNode.click()
        })
      })
    },
    getFileDetail (val) {
      console.log(val)
      this.fileName = val.name
      if (!val.children) {
        Workspace.getAppFileApi(this.projectId, val.name).then(res => {
          this.fileContent = res.data
        }).catch(err => {
          if (err.response.data.message === 'file is null!') {
            this.fileContent = this.$t('promptMessage.fileIsEmpty')
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
    }
  }
}

</style>
