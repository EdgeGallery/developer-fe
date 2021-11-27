<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="container-script">
    <div class="detail-top clear">
      <div class="detail-top-title lt">
        {{ detailTitle }}
      </div>
    </div>
    <div class="script-div common-div-bg">
      <h3 class="common-dlg-title">
        {{ $t('container.containerScript') }}
      </h3>
      <el-upload
        class="upload-btn"
        action=""
        :on-change="handleChangeYaml"
        :limit="1"
        :file-list="yamlFileList"
        :auto-upload="false"
        :on-remove="removeUploadyaml"
        :on-exceed="handleExceed"
        accept=".yaml"
        name="yamlFile"
        v-loading="uploadYamlLoading"
      >
        <a
          class="uploader-button"
          slot="trigger"
        >
          {{ $t('container.uploadFile') }}
        </a>
        <a
          class="uploader-button"
          :href="demoYaml"
          download="demo.yaml"
        >
          {{ $t('container.downloadDemo') }}
        </a>
      </el-upload>

      <div class="config-file">
        <h3 class="common-dlg-title">
          {{ $t('container.configFile') }}
        </h3>
        <div
          class="edit-btn clear"
        >
          <span class="title-info">{{ $t('container.configFileText') }}</span>
          <el-button
            class="rt"
            v-if="viewOrEditContent==='preview'"
            @click="editFile(fileName)"
          >
            {{ $t('common.edit') }}
          </el-button>
          <el-button
            class="rt"
            v-else
            @click="saveFile"
          >
            {{ $t('common.save') }}
          </el-button>
        </div>
        <div class="package clear">
          <el-tree
            id="container-package-tree"
            class="container-package-tree lt"
            :data="containerPackageData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            default-expand-all
            highlight-current
          />
          <div
            class="file-content rt"
            id="file-content"
          >
            <mavon-editor
              class="common-mavon-editor"
              v-model="fileName"
              :toolbars-flag="false"
              :subfield="false"
              :default-open="viewOrEditContent"
              :box-shadow="false"
              preview-background="#4E3494"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import demoYaml from '@/assets/file/test_helm_template.yaml'
export default {
  name: 'ContainerScript',
  data () {
    return {
      detailTitle: JSON.parse(sessionStorage.getItem('sandboxName')),
      yamlFileList: [],
      uploadYamlLoading: false,
      demoYaml,
      viewOrEditContent: 'preview',
      fileName: '',
      containerPackageData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleChangeYaml (file, fileList) {
    },
    handleExceed (file, fileList) {
    },
    // Remove uploaded YAML file
    removeUploadyaml (file, fileList) {
    },
    editFile (fileName) {
      this.viewOrEditContent = 'edit'
    },
    saveFile () {
      this.viewOrEditContent = 'preview'
    },
    handleNodeClick (data) {
      if (data.children) {
        return
      }
      this.fileName = data.label
    },
    clickFirstNode () {
      this.$nextTick().then(() => {
        const firstNode = document.querySelector('.el-tree-node .el-tree-node__children .el-tree-node')
        firstNode.click()
      })
    }
  },
  mounted () {
    this.clickFirstNode()
  }
}
</script>

<style lang="less">
.container-script{
  height: 100%;
  position: relative;
  .script-div{
    width: 60%;
    min-width: 700px;
    height: calc(100% - 150px);
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -15%);
  }
  .upload-btn{
    margin-left: 15px;
    a{
      display: inline-block;
      height: 25px;
      line-height: 25px;
      border-radius: 4px;
      padding: 0 32px;
      margin-right: 24px;
      color: #fff;
      background-color: #4e3494;
      font-size: 14px;
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    }
    a:hover{
      color: #806bbc;
      background-color: #412590;
    }
  }
  .config-file{
    height: 100%;
    margin-top: 80px;
    .edit-btn{
      margin-top: -11px;
      .el-button{
        background: #4e3494;
        border: none;
        border-radius: 35px;
        padding: 8px 24px;
        color: #fff;
      }
      .title-info{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-family: defaultFontLight,Arial, Helvetica, sans-serif;
        font-size: 14px;
        padding-left: 15px;
      }
    }
    .package{
      margin: 15px 0 0 15px;
      position: relative;
      height: calc(100% - 265px);
      overflow: hidden;
      .el-tree.container-package-tree{
        width: 170px;
        background: #4E3494;
        border-radius: 4px;
        color: #fff;
        height: 100%;
        overflow: auto;
      }
      .el-tree.container-package-tree .el-tree-node__content:hover,
      .container-package-tree.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
        background-color: #7050c3;
      }
      .file-content{
        width: calc(100% - 180px);
        height: 100%;
        background: #4E3494;
        border-radius: 4px;
        overflow: hidden;
        overflow: auto;
      }
    }
  }
}
</style>
