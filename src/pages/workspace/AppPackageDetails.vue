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
            style="overflow-x: auto;"
          />
        </el-col>
        <el-col :span="16">
          <div class="file_desc">
            {{ fileName }} 文件的描述
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
// import { Workspace } from '../../tools/api.js'

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
      testData: [
        {
          format: { 'name': 'a2bc9c59f52f4251849dcab5636af13a', 'childs': [{ 'name': '22406fba-fd5d-4f55-b3fa-89a45fee913a', 'childs': [{ 'name': 'Definitions', 'childs': [{ 'name': 'MainServiceTemplate.yaml', 'childs': [] }] }, { 'name': 'MainServiceTemplate.mf', 'childs': [] }, { 'name': 'TOSCA-Metadata', 'childs': [{ 'name': 'TOSCA.meta', 'childs': [] }] }, { 'name': 'Artifacts', 'childs': [{ 'name': 'Informational', 'childs': [{ 'name': 'user_guide.txt', 'childs': [] }] }, { 'name': 'Tests', 'childs': [{ 'name': 'health check.yaml', 'childs': [] }] }, { 'name': 'ChangeLog.txt', 'childs': [] }, { 'name': 'Other', 'childs': [{ 'name': 'my_script.csh', 'childs': [] }] }, { 'name': 'Deployment', 'childs': [{ 'name': 'Charts', 'childs': [{ 'name': '.gitkeep', 'childs': [] }, { 'name': '7e9b913f-748a-42b7-a088-abe3f750f04c.tgz', 'childs': [] }] }] }, { 'name': 'Docs', 'childs': [{ 'name': 'template.md', 'childs': [] }] }] }] }] }
        }
      ],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      appPageListData: [],
      fileName: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    getAppPackageList () {
      this.appPageListData = [this.testData[0].format]
      /* if (this.appPageListData.length > 0) {
        this.$nextTick().then(() => {
          const firstNode = document.querySelector('.el-tree-node__children .el-tree-node__content')
          firstNode.click()
        })
      } */
    },
    getFileDetail (data) {
      console.log(data)
      this.fileName = data.name
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oDiv = document.getElementsByClassName('el-dialog')[0]
        const deviceHeight = document.documentElement.clientHeight
        oDiv.style.height = Number(deviceHeight) - 150 + 'px'
        const oDiv2 = document.getElementsByClassName('el-tree')[0]
        oDiv2.style.height = Number(deviceHeight) - 210 + 'px'
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
    .el-tree::-webkit-scrollbar{
      width: 6px;
      height: 6px;
    }
    .el-tree::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background: rgba(0,0,0,0.1);
    }
    .el-tree-node .el-tree-node__children{
      overflow: inherit;
    }
    .file_list{
      padding-right: 10px;
    }
    .file_desc{
      padding: 10px;
    }
  }
}

</style>
