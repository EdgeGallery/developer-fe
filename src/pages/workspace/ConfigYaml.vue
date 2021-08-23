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
  <div class="config-yaml">
    <div
      v-if="showFileImport"
      class="config-yaml-container1"
    >
      <div class="work-title-clickable">
        <el-radio
          class="work-radio"
          v-model="selectConfigType"
          label="1"
        >
          {{ $t('workspace.configYaml.importFile') }}
        </el-radio>
      </div>
      <div class="config-yaml-content">
        <div class="config-yaml__text">
          {{ $t('workspace.configYaml.uploadYamlTip') }}
        </div>
        <el-upload
          class="uploader"
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
            {{ $t('workspace.configYaml.uploadYaml') }}
          </a>
          <a
            class="uploader-button"
            :href="demoYaml"
            download="demo.yaml"
          >
            {{ $t('workspace.configYaml.downloadDemo') }}
          </a>
        </el-upload>
        <div v-show="hasValidate">
          <div :class="appYamlFileId ? 'green test tit' : 'red test tit'">
            {{ appYamlFileId ? $t('workspace.configYaml.pass') : $t('workspace.configYaml.fail') }}
          </div>
          <div
            class="test tit"
            v-show="showResult"
          >
            <div :class="checkFlag.formatSuccess ? 'green test' : 'red test'">
              {{ $t('workspace.configYaml.format') }}
              <em
                v-show="checkFlag.formatSuccess"
                class="el-icon-success"
              />
              <em
                v-show="!checkFlag.formatSuccess"
                class="el-icon-error"
              />
            </div>
            <div :class="checkFlag.imageSuccess ? 'green test' : 'red test'">
              {{ $t('workspace.configYaml.imageInfo') }}
              <em
                v-show="checkFlag.imageSuccess"
                class="el-icon-success"
              />
              <em
                v-show="!checkFlag.imageSuccess"
                class="el-icon-error"
              />
            </div>
            <div :class="checkFlag.serviceSuccess ? 'green test' : 'red test'">
              {{ $t('workspace.configYaml.serviceInfo') }}
              <em
                v-show="checkFlag.serviceSuccess"
                class="el-icon-success"
              />
              <em
                v-show="!checkFlag.serviceSuccess"
                class="el-icon-error"
              />
            </div>
            <div :class="checkFlag.mepAgentSuccess ? 'green test' : 'yellow test'">
              {{ $t('workspace.configYaml.mepAgent') }}
              <em
                v-show="checkFlag.mepAgentSuccess"
                class="el-icon-success"
              />
              <em
                v-show="!checkFlag.mepAgentSuccess"
                class="el-icon-warning"
              />
              <p
                v-show="!checkFlag.mepAgentSuccess"
                class="test-result__tip"
              >
                {{ $t('workspace.configYaml.mepAgentTip') }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="yaml_content"
          v-if="fileUploadSuccess"
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
      </div>
    </div>
    <div
      v-if="showVisualConfig"
      class="config-yaml-container2"
      :class="[showFileImport ? 'show-file-import' : 'hide-file-import']"
    >
      <div class="work-title-clickable">
        <el-radio
          class="work-radio"
          v-model="selectConfigType"
          label="2"
        >
          {{ $t('workspace.configYaml.config') }}
        </el-radio>
      </div>
      <div
        v-if="selectConfigType === '2'"
        class="config-yaml-content"
      >
        <configVisual
          :all-step-data="allStepData"
          @getConfigVisual="getConfigVisual"
          :deploy-file-id="appYamlFileId"
          ref="configVisual"
        />
      </div>
      <div
        v-else
        class="work-p config-yaml-content"
      >
        {{ $t('workspace.configYaml.visualConfigTip') }}
      </div>
    </div>
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
      required: true
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
      hasValidate: false,
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID'),
      markdownSource: '',
      showResult: true,
      fileUploadSuccess: false,
      selectConfigType: '1',
      showFileImport: true,
      showVisualConfig: true
    }
  },
  methods: {
    emitStepData () {
      let ifNext = this.appYamlFileId
      if (ifNext) {
        this.$emit('getStepData', { step: 'fourth', data: { appYamlFileId: this.appYamlFileId }, ifNext })
      } else {
        this.$eg_messagebox({
          type: 'warning',
          title: '',
          desc: this.$t('workspace.configYaml.uploadYamlFirst'),
          cancelText: this.$t('common.cancelText')
        }).then(() => {}).catch(() => {})
      }
    },
    // Choose YAML file
    handleChangeYaml (file, fileList) {
      let yamlFileList = []
      yamlFileList.push(file.raw)
      this.yamlFileList = []
      const fileType = file.raw.name.substring(file.raw.name.lastIndexOf('.') + 1)
      const fileTypeArr = ['yaml']
      if (!fileTypeArr.includes(fileType)) {
        this.$eg_messagebox({
          type: 'warning',
          title: '',
          desc: this.$t('workspace.configYaml.yamlFileType'),
          cancelText: this.$t('common.cancelText')
        }).then(() => {}).catch(() => {})
        yamlFileList = []
      }
      if (yamlFileList.length > 0) {
        this.submitYamlFile(yamlFileList)
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$eg_messagebox({
          type: 'warning',
          title: '',
          desc: this.$t('promptMessage.onlyOneFile'),
          cancelText: this.$t('common.cancelText')
        }).then(() => {}).catch(() => {})
      }
    },
    // Remove uploaded YAML file
    removeUploadyaml (file, fileList) {
      Workspace.deleteYamlFileApi(this.appYamlFileId).then(() => {
        this.submitData(null)
        this.hasValidate = false
        this.fileUploadSuccess = false
        this.yamlFileList = []
        this.appYamlFileId = ''
        this.checkFlag = {}
        this.markdownSource = ''
        this.showVisualConfig = true
      })
    },
    // Submit YAML file
    submitYamlFile (yamlFileList) {
      this.uploadYamlLoading = true
      let fd = new FormData()
      fd.append('file', yamlFileList[0])
      Workspace.submitYamlFileApi(this.userId, this.projectId, fd, 'upload').then(res => {
        this.hasValidate = true
        if (res.data.fileId) {
          this.fileUploadSuccess = true
          this.yamlFileList = yamlFileList
          this.appYamlFileId = res.data.fileId
          this.markdownSource = '```yaml\r\n' + res.data.fileContent + '\r\n```'
          this.setApiHeight()
          this.$eg_messagebox({
            type: 'success',
            title: '',
            desc: this.$t('promptMessage.uploadSuccess'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
        } else {
          this.fileUploadSuccess = false
          this.appYamlFileId = ''
          this.yamlFileList = []
          this.markdownSource = ''
        }
        this.showResult = true
        this.showVisualConfig = false
        const { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess } = res.data
        this.checkFlag = { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess }
        this.submitData(this.appYamlFileId)
      }, (error) => {
        if (error.response.data.message === 'Failed to read content of helm template yaml') {
          this.$eg_messagebox({
            type: 'error',
            title: '',
            desc: this.$t('promptMessage.uploadYamlFailure'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
        } else if (error.response.data.message === 'yaml file is empty!') {
          this.$eg_messagebox({
            type: 'error',
            title: '',
            desc: this.$t('promptMessage.fileIsEmpty'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
        } else {
          this.$eg_messagebox({
            type: 'error',
            title: '',
            desc: this.$t('workspace.configYaml.yamlFileType'),
            cancelText: this.$t('common.cancelText')
          }).then(() => {}).catch(() => {})
        }
        this.appYamlFileId = ''
        this.yamlFileList = []
        this.hasValidate = false
        this.fileUploadSuccess = false
        this.checkFlag = {}
        this.markdownSource = ''
      }).finally(() => {
        this.uploadYamlLoading = false
      })
    },
    submitData (appYamlFileId) {
      // Get test configuration
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
        func(this.projectId, this.userId, params)
      })
    },
    initFileList () {
      if (this.appYamlFileId) {
        Workspace.getConfigVisualApi(this.appYamlFileId).then(res => {
          if (res.data.configType === 'upload') {
            let data = res.data
            this.yamlFileList = [{ name: data.fileName, fileId: data.fileId }]
            this.hasValidate = true
            this.fileUploadSuccess = true
            this.appYamlFileId = data.fileId
            this.showResult = false
            this.markdownSource = '```yaml\r\n' + data.content + '\r\n```'
            this.setApiHeight()
          } else {
            this.yamlFileList = []
            this.hasValidate = false
            this.fileUploadSuccess = false
            this.appYamlFileId = res.data.fileId
            this.markdownSource = ''
          }
        }).catch(() => {
          this.uploadYamlLoading = false
          this.hasValidate = false
          this.fileUploadSuccess = false
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
    getConfigType () {
      Workspace.getTestConfigApi(this.projectId).then(response => {
        this.appYamlFileId = response.data.deployFileId
        if (this.appYamlFileId) {
          Workspace.getConfigVisualApi(this.appYamlFileId).then(res => {
            if (res.data.configType === 'upload') {
              this.showFileImport = true
              this.showVisualConfig = false
            } else if (res.data.configType === 'config') {
              this.showFileImport = false
              this.showVisualConfig = true
              this.$refs.configVisual.getConfigFile()
            }
          })
        }
        this.initFileList()
      })
    }
  },
  watch: {
    selectConfigType (newVal, oldVal) {
      if (newVal === '2') {
        this.showFileImport = false
      } else {
        this.showFileImport = true
      }
    }
  },
  mounted () {
    this.getConfigType()
  }
}
</script>

<style lang="less">
.config-yaml-content {
  margin: 20px 0 0 53px;

  .config-yaml__text {
    font-size: 16px;
    font-family: defaultFontLight;
    color: #380879;
  }

  .yaml_content{
    white-space: pre-wrap;
    margin: 30px -47px -66px -92px;
    overflow: auto;
    max-height: 300px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;

    .v-note-wrapper{
      border: none;
    }

    .v-show-content {
      padding: 0 !important;
    }

    .v-note-wrapper .v-note-panel .v-note-show{
      overflow: hidden;
      .hljs, pre{
        background: #1e1e1e;
        color: #fff;
      }
    }

    .markdown-body .highlight pre, .markdown-body pre {
      border-radius: 0;
      margin-bottom: -50px;
    }
  }

  .uploader {
    margin-top: 15px;
    margin-left: -10px;
    background-color: transparent;

    .el-upload-list {
      margin: 0 10px 20px;
    }

    .el-upload-list::after {
      content: '';
      display: block;
      clear: both;
    }

    .el-upload-list__item-status-label {
      display: none;
    }

    .el-upload-list__item-name {
      padding-left: 20px;
      padding-right: 20px;
      box-shadow: 0 0 15px 2px #dedeea inset;
      border-radius: 8px;
      color: #7965e0;
    }

    .el-upload-list__item:hover {
      background-color: transparent;
    }

    .el-upload-list__item-name {
      font-size: 14px;
      color: #7965e0;
    }

    .el-upload-list__item-name:hover {
      color: #7965e0;
    }

    .el-icon-document {
      color: #7965e0;
    }

    .el-upload-list__item .el-icon-close {
      top: 8px;
      right: 10px;
    }

    .el-loading-mask {
      background-color: rgba(241,242,246,.5);
    }

    .el-icon-close-tip {
      display: none;
    }

    .uploader-button {
      display: inline-block;
      height: 39px;
      line-height: 39px;
      font-size: 16px;
      font-family: defaultFontLight;
      border: none;
      border-radius: 8px;
      color: #ffffff;
      background-color:#8278b7;
      padding: 0 20px;
      margin-left: 10px;
    }
  }

  .el-upload-list__item:first-child {
    margin-top: 20px;
  }

  .test.tit:first-child {
    display: none;
  }

  .test.tit {
    margin-top: 20px;
  }

  .test.tit .test {
    display: inline-block;
    margin-right: 15px;
    margin-top: 10px;
    font-size: 15px;
    font-family: defaultFontLight;
    color: #380879;
  }

  .green.test em{
    color: #3ac372;
  }

  .red.test em {
    color: #f23d3d;
  }

  .yellow.test em {
    position: relative;
    top: 1px;
    color: #f2bd3d;
    font-size: 15px;
    margin: 0 auto;
  }

  .test-result__tip {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
  }
}

.config-yaml-container2.show-file-import {
  padding-top: 50px;
}

.config-yaml-container2.hide-file-import {
  padding-top: 0;
}
</style>
