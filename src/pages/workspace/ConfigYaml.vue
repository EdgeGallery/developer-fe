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
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        :label="$t('workspace.configYaml.importFile')"
        name="first"
      >
        <h3 class="title">
          {{ $t('workspace.configYaml.uploadFile') }}
          <span class="down-demo">{{ $t('workspace.configYaml.downloadDemo') }}</span>
        </h3>
        <el-upload
          id="uploadYaml"
          class="upload-demo"
          action=""
          :on-change="handleChangeYaml"
          :limit="1"
          :file-list="yamlFileList"
          :auto-upload="false"
          :on-remove="removeUploadyaml"
          accept=".json,.yaml"
          name="yamlFile"
          v-loading="uploadYamlLoading"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >
            {{ $t('workspace.configYaml.uploadYaml') }}
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >
            <em class="el-icon-warning" />{{ $t('workspace.configYaml.uploadYamlTip') }}
          </div>
        </el-upload>
        <div :class="appYamlFileId ? 'green test' : 'red test'">
          {{ appYamlFileId ? $t('workspace.configYaml.pass') : $t('workspace.configYaml.fail') }}
        </div>
        <div :class="appYamlFileId ? 'green test' : 'red test'">
          <em
            v-show="appYamlFileId"
            class="el-icon-circle-check"
          />
          <em
            v-show="!appYamlFileId"
            class="el-icon-circle-close"
          />
          {{ $t('workspace.configYaml.format') }}
        </div>
        <div :class="appYamlFileId ? 'green test' : 'red test'">
          <em
            v-show="appYamlFileId"
            class="el-icon-circle-check"
          />
          <em
            v-show="!appYamlFileId"
            class="el-icon-circle-close"
          />
          {{ $t('workspace.configYaml.imageInfo') }}
        </div>
        <div :class="appYamlFileId ? 'green test' : 'red test'">
          <em
            v-show="appYamlFileId"
            class="el-icon-circle-check"
          />
          <em
            v-show="!appYamlFileId"
            class="el-icon-circle-close"
          />
          {{ $t('workspace.configYaml.serviceInfo') }}
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
export default {
  name: 'ConfigYaml',
  data () {
    return {
      appYamlFileId: '',
      uploadYamlLoading: false,
      yamlFileList: [],
      activeName: 'first',
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
      this.yamlFileList.push(file.raw)
      const fileType = file.raw.name.substring(file.raw.name.lastIndexOf('.') + 1)
      const fileTypeArr = ['yaml', 'json']
      if (!fileTypeArr.includes(fileType)) {
        this.$message.warning(this.$t('promptMessage.yamlFileType'))
        this.yamlFileList = []
      }
      if (this.yamlFileList.length > 0) {
        this.submitYamlFile()
      }
    },
    // 移除Yaml文件
    removeUploadyaml (file, fileList) {
      this.yamlFileList = []
      this.appYamlFileId = ''
    },
    // 上传Yaml文件
    submitYamlFile () {
      this.uploadYamlLoading = true
      let fd = new FormData()
      fd.append('file', this.yamlFileList[0])
      Workspace.submitYamlFileApi(this.userId, this.projectId, fd).then(res => {
        this.appYamlFileId = res.data.fileId
        this.$message({
          type: 'success',
          message: this.$t('promptMessage.uploadSuccess')
        })
      }, (error) => {
        this.$message({
          type: 'error',
          message: error.response.data.message
        })
        this.appYamlFileId = ''
      }).finally(() => {
        this.uploadYamlLoading = false
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.config-yaml{
  .el-tab-pane{
    padding: 20px;
  }
}
.down-demo {
  margin-left: 15px;
  font-size: 14px;
  cursor: pointer;
  color: #6c92fa;
}
.test {
  font-size: 14px;
  margin-top: 15px;
  margin-right: 15px;
  display: inline-block;
}
.green {
  color: green
}
.red {
  color: red
}
</style>
