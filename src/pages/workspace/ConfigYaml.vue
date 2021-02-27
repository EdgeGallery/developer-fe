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
            size="medium"
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
        <div
          class="yaml_content"
          v-if="hasValidate"
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
      </el-tab-pane>
      <el-tab-pane
        :label="$t('workspace.configYaml.config')"
        name="second"
      >
        <configVisual
          :all-step-data="allStepData"
          @getConfigVisual="getConfigVisual"
          :deploy-file-id="appYamlFileId"
          ref="configVisual"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import demoYaml from '@/assets/file/test_helm_template.yaml'
import configVisual from './ConfigVisual.vue'
export default {
  name: 'ConfigYaml',
  props: {
    allStepData: {
      type: Object,
      default: () => { }
    }
  },
  components: {
    configVisual
  },
  data () {
    return {
      projectBeforeConfig: {},
      demoYaml,
      checkFlag: {},
      appYamlFileId: '',
      uploadYamlLoading: false,
      yamlFileList: [],
      activeName: 'first',
      hasValidate: false,
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID'),
      markdownSource: ''
    }
  },
  methods: {
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
      this.submitData(null)
      this.hasValidate = false
      this.yamlFileList = []
      this.appYamlFileId = ''
      this.checkFlag = {}
      this.markdownSource = ''
    },
    // 上传Yaml文件
    submitYamlFile (yamlFileList) {
      this.uploadYamlLoading = true
      let fd = new FormData()
      fd.append('file', yamlFileList[0])
      Workspace.submitYamlFileApi(this.userId, this.projectId, fd, 'upload').then(res => {
        this.hasValidate = true
        if (res.data.fileId) {
          this.yamlFileList = yamlFileList
          this.appYamlFileId = res.data.fileId
          this.markdownSource = '```yaml\r\n' + res.data.fileContent + '\r\n```'
          this.setApiHeight()
          this.$message({
            type: 'success',
            message: this.$t('promptMessage.uploadSuccess')
          })
        } else {
          this.appYamlFileId = ''
          this.yamlFileList = []
          this.markdownSource = ''
        }
        const { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess } = res.data
        this.checkFlag = { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess }
        this.submitData(this.appYamlFileId)
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
        this.markdownSource = ''
      }).finally(() => {
        this.uploadYamlLoading = false
      })
    },
    submitData (appYamlFileId) {
      // 获取以前提交过的配置
      Workspace.getTestConfigApi(this.projectId).then(res => {
        this.projectBeforeConfig = res.data || {}
        const params = {
          testId: this.projectBeforeConfig.testId,
          privateHost: !!this.allStepData.third.enable,
          deployFileId: appYamlFileId,
          platform: 'KUBERNETES',
          hosts: this.allStepData.third.hostId ? [
            {
              hostId: this.allStepData.third.hostId,
              userId: this.userId
            }
          ] : []
        }
        const func = params.testId ? Workspace.putTestConfigApi : Workspace.postTestConfigApi
        func(this.projectId, this.userId, params).then(() => {
        }).catch(err => {
          console.log(err)
        })
      })
    },
    initFileList () {
      if (this.appYamlFileId) {
        Workspace.getConfigVisualApi(this.appYamlFileId).then(res => {
          if (res.data.configType === 'upload') {
            let data = res.data
            this.yamlFileList = [{ name: data.fileName, fileId: data.fileId }]
            this.hasValidate = true
            this.appYamlFileId = data.fileId
            this.checkFlag = { formatSuccess: true, imageSuccess: true, mepAgentSuccess: true, serviceSuccess: true }
            this.markdownSource = '```yaml\r\n' + data.content + '\r\n```'
            this.setApiHeight()
          } else {
            this.yamlFileList = []
            this.hasValidate = false
            this.appYamlFileId = res.data.fileId
            this.markdownSource = ''
          }
        }).catch(() => {
          this.uploadYamlLoading = false
          this.hasValidate = false
          this.markdownSource = ''
        })
      }
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oDiv = document.getElementsByClassName('yaml_content')[0]
        const deviceHeight = document.documentElement.clientHeight
        oDiv.style.height = Number(deviceHeight) * 0.6 + 'px'
      })
    },
    getConfigVisual (val) {
      this.appYamlFileId = val
    },
    handleClick (tab) {
      if (tab.name === 'first') {
        this.initFileList()
      } else if (tab.name === 'second') {
        this.$refs.configVisual.getConfigFile()
      }
    },
    getConfigType () {
      Workspace.getTestConfigApi(this.projectId).then(response => {
        this.appYamlFileId = response.data.deployFileId
        if (this.appYamlFileId) {
          Workspace.getConfigVisualApi(this.appYamlFileId).then(res => {
            if (res.data.configType === 'upload') {
              this.activeName = 'first'
            } else if (res.data.configType === 'config') {
              this.activeName = 'second'
              this.$refs.configVisual.getConfigFile()
            }
          })
        }
        this.initFileList()
      })
    }
  },
  mounted () {
    this.getConfigType()
  }
}
</script>

<style lang="less">
.config-yaml{
  .el-tabs{
    .el-tabs__item{
      height: 15px;
      line-height: 15px;
      padding: 0 20px;
      font-size: 18px;
      margin:10px 0 18px 0;
      border-right: 1px solid #ddd;
      border-radius: 0;
    }
    .el-tabs__item:last-child{
      border-right: 0;
    }
    .el-tabs__item.is-active{
      color: #688ef3;
    }
    .el-tabs__item.is-disabled{
      cursor: not-allowed;
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
        font-size: 16px;
        float: left;
      }
      .el-upload-list{
        float: left;
        width: 100%;
      }
    }
    .down-demo {
      display: inline-block;
      margin: 5px 0 0 15px;
      font-size: 16px;
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
  .yaml_content{
    line-height: 25px;
    white-space: pre-wrap;
    margin-top: 20px;
    overflow: auto;
    min-height: 600px;
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

</style>
