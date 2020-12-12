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
  <div class="config-yaml">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        :label="$t('workspace.configYaml.importFile')"
        name="first"
      >
        <el-upload
          id="uploadYaml"
          class="upload-demo clear"
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
          <el-button
            slot="trigger"
            size="small"
            type="primary"
            class="featuresBtn"
          >
            {{ $t('workspace.configYaml.uploadYaml') }}
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >
            <em class="el-icon-warning" />{{ $t('workspace.configYaml.uploadYamlTip') }}
          </div>
          <a
            :href="demoYaml"
            download="demo.yaml"
            class="down-demo"
          >
            {{ $t('workspace.configYaml.downloadDemo') }}
          </a>
        </el-upload>

        <div v-show="hasValidate">
          <div :class="appYamlFileId ? 'green test tit' : 'red test tit'">
            {{ appYamlFileId ? $t('workspace.configYaml.pass') : $t('workspace.configYaml.fail') }}
          </div>
          <div :class="checkFlag.formatSuccess ? 'green test' : 'red test'">
            <em
              v-show="checkFlag.formatSuccess"
              class="el-icon-circle-check"
            />
            <em
              v-show="!checkFlag.formatSuccess"
              class="el-icon-circle-close"
            />
            {{ $t('workspace.configYaml.format') }}
          </div>
          <div :class="checkFlag.imageSuccess ? 'green test' : 'red test'">
            <em
              v-show="checkFlag.imageSuccess"
              class="el-icon-circle-check"
            />
            <em
              v-show="!checkFlag.imageSuccess"
              class="el-icon-circle-close"
            />
            {{ $t('workspace.configYaml.imageInfo') }}
          </div>
          <div :class="checkFlag.serviceSuccess ? 'green test' : 'red test'">
            <em
              v-show="checkFlag.serviceSuccess"
              class="el-icon-circle-check"
            />
            <em
              v-show="!checkFlag.serviceSuccess"
              class="el-icon-circle-close"
            />
            {{ $t('workspace.configYaml.serviceInfo') }}
          </div>
          <div :class="checkFlag.mepAgentSuccess ? 'green test' : 'yellow test'">
            <em
              v-show="checkFlag.mepAgentSuccess"
              class="el-icon-circle-check"
            />
            <em
              v-show="!checkFlag.mepAgentSuccess"
              class="el-icon-warning-outline"
            />
            {{ $t('workspace.configYaml.mepAgent') }}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        disabled
        :label="$t('workspace.configYaml.config')"
        name="second"
      >
        <h3 class="title">
          {{ $t('workspace.configYaml.config') }}
        </h3>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import demoYaml from '@/assets/file/test_helm_template.yaml'

export default {
  name: 'ConfigYaml',
  props: {
    projectBeforeConfig: {
      type: Object,
      default: () => { }
    },
    allStepData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      demoYaml,
      checkFlag: {},
      appYamlFileId: '',
      uploadYamlLoading: false,
      yamlFileList: [],
      activeName: 'first',
      hasValidate: false,
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID')
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    emitStepData () {
      let ifNext = this.appYamlFileId
      if (ifNext) {
        this.$emit('getStepData', { step: 'fourth', data: { appYamlFileId: this.appYamlFileId }, ifNext })
      } else {
        this.$message.warning(this.$t('workspace.configYaml.uploadYamlFirst'))
      }
    },
    // 选择Yaml文件
    handleChangeYaml (file, fileList) {
      let yamlFileList = []
      yamlFileList.push(file.raw)
      this.yamlFileList = []
      const fileType = file.raw.name.substring(file.raw.name.lastIndexOf('.') + 1)
      const fileTypeArr = ['yaml']
      if (!fileTypeArr.includes(fileType)) {
        this.$message.warning(this.$t('workspace.configYaml.yamlFileType'))
        yamlFileList = []
      }
      if (yamlFileList.length > 0) {
        this.submitYamlFile(yamlFileList)
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    // 移除Yaml文件
    removeUploadyaml (file, fileList) {
      Workspace.deleteYamlFileApi(this.appYamlFileId)
      this.hasValidate = false
      this.yamlFileList = []
      this.appYamlFileId = ''
      this.checkFlag = {}
    },
    // 上传Yaml文件
    submitYamlFile (yamlFileList) {
      this.uploadYamlLoading = true
      let fd = new FormData()
      fd.append('file', yamlFileList[0])
      Workspace.submitYamlFileApi(this.userId, this.projectId, fd).then(res => {
        this.hasValidate = true
        if (res.data.fileId) {
          this.yamlFileList = yamlFileList
          this.appYamlFileId = res.data.fileId
          this.$message({
            type: 'success',
            message: this.$t('promptMessage.uploadSuccess')
          })
        } else {
          this.appYamlFileId = ''
          this.yamlFileList = []
        }
        const { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess } = res.data
        this.checkFlag = { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess }
      }, (error) => {
        if (error.response.data.code === 403) {
          this.$message.error(this.$t('promptMessage.guestPrompt'))
        } else {
          this.$message.error(this.$t('promptMessage.uploadFailure'))
        }
        this.appYamlFileId = ''
        this.yamlFileList = []
        this.hasValidate = false
        this.checkFlag = {}
      }).finally(() => {
        this.uploadYamlLoading = false
      })
    },
    initFileList () {
      if (this.projectBeforeConfig.deployFileId) {
        this.uploadYamlLoading = true
        Workspace.getYamlFileApi(this.userId, this.projectId).then(res => {
          if (res && Array.isArray(res.data)) {
            const fileObj = res.data.find(s => s.fileId === this.projectBeforeConfig.deployFileId) || {}
            let data = res.data[0]
            if (fileObj.fileId) {
              this.checkFlag = { formatSuccess: data.formatSuccess, imageSuccess: data.imageSuccess, mepAgentSuccess: data.mepAgentSuccess, serviceSuccess: data.serviceSuccess }
              this.hasValidate = true
              this.appYamlFileId = fileObj.fileId
              this.yamlFileList = [{ name: fileObj.fileName, fileId: fileObj.fileId }]
            }
          }
        }).finally(() => {
          this.uploadYamlLoading = false
        })
      }
    }
  },
  mounted () {
    this.initFileList()
  }
}
</script>

<style lang="less">
.config-yaml{
  .el-tabs{
    .el-tabs__item{
      height: 15px;
      line-height: 15px;
      padding: 0 30px 0 0;
      font-size: 16px;
      margin:0 30px 18px 0;
      border-right: 1px solid #ddd;
      border-radius: 0;
    }
    .el-tabs__item:last-child{
      border-right: 0;
    }
    .el-tabs__item:last-child:hover{
      color: #c0c4cc;
    }
    .el-tabs__item.is-active{
      color: #688ef3;
    }
    .el-tabs__active-bar{
      height: 4px;
    }
    .el-tab-pane{
      padding: 20px 0;
    }
    .upload-demo{
      .el-upload{
        float: left;
      }
      .el-upload__tip{
        float: left;
      }
    }
    .down-demo {
      display: inline-block;
      margin: 5px 0 0 15px;
      font-size: 14px;
      cursor: pointer;
      color: #688ef3;
    }
  }
  .test {
    font-size: 14px;
    margin-top: 15px;
    margin-right: 15px;
    display: inline-block;
  }
  .test.tit{
    display: block;
  }
  .green {
    color: green
  }
  .red {
    color: red
  }
  .yellow{
  color:#dbb419;
  }
}

</style>
