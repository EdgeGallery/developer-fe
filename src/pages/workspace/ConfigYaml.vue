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
          class="config-yaml-uploader"
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
            rel="noopener noreferrer"
          >
            {{ $t('workspace.configYaml.uploadYaml') }}
          </a>
          <a
            class="uploader-button"
            :href="demoYaml"
            download="demo.yaml"
            rel="noopener noreferrer"
          >
            {{ $t('workspace.configYaml.downloadDemo') }}
          </a>
        </el-upload>
        <div v-show="hasValidate">
          <div
            v-if="!showResult"
            :class="appYamlFileId ? 'green test tit' : 'red test tit'"
          >
            {{ appYamlFileId ? $t('workspace.configYaml.pass') : $t('workspace.configYaml.fail') }}
          </div>
          <div
            v-if="showResult"
            class="test tit"
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
            preview-background="#1e1e1e"
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
          @backConfigYaml="backConfigYaml"
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
        this.$eg_messagebox(this.$t('workspace.configYaml.uploadYamlFirst'), 'warning')
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
        this.$eg_messagebox(this.$t('workspace.configYaml.yamlFileType'), 'warning')
        yamlFileList = []
      }
      if (yamlFileList.length > 0) {
        this.submitYamlFile(yamlFileList)
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$eg_messagebox(this.$t('promptMessage.onlyOneFile'), 'warning')
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
    // back to first page
    backConfigYaml () {
      this.submitData(null)
      this.hasValidate = false
      this.fileUploadSuccess = false
      this.yamlFileList = []
      this.appYamlFileId = ''
      this.checkFlag = {}
      this.markdownSource = ''
      this.showVisualConfig = true
      this.selectConfigType = '1'
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
          this.$eg_messagebox(this.$t('promptMessage.uploadSuccess'), 'success')
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
          this.$eg_messagebox(this.$t('promptMessage.uploadYamlFailure'), 'error')
        } else if (error.response.data.message === 'yaml file is empty!') {
          this.$eg_messagebox(this.$t('promptMessage.fileIsEmpty'), 'error')
        } else {
          this.$eg_messagebox(
            this.$t('promptMessage.imageInfoErr'),
            'error',
            this.$t('common.cancel'),
            this.$t('common.confirm')
          ).then(() => {
            this.jumpToImageList()
          })
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
    jumpToImageList () {
      let imageListHref = this.$router.resolve({ path: '/mecDeveloper/system/imagemgmt' })
      window.open(imageListHref.href, '_blank')
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
              this.selectConfigType = '1'
            } else if (res.data.configType === 'config') {
              this.showFileImport = false
              this.showVisualConfig = true
              this.selectConfigType = '2'
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
  created () {
    this.getConfigType()
  }
}
</script>

<style lang="less">
.config-yaml-content {
  margin: 20px 0 0 53px;

  .config-yaml__text {
    font-size: 16px;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    color: #380879;
  }

  .yaml_content{
    margin: 30px -40px -46px -92px;
    height: 300px !important;
  }

  .yaml_content .v-note-wrapper {
    height: 100%;
    min-height: 300px;
  }

  .yaml_content .v-note-wrapper .v-note-panel {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }

  .yaml_content .v-show-content {
    font-size: 14px;
  }

  .yaml_content .v-show-content pre {
    padding: 16px 30px;
    margin-bottom: 20px;
    background-color: #1e1e1e;
  }

  .yaml_content .hljs {
    background-color: #1e1e1e;
    color: #eee;
    line-height: 1.8;
    padding: 0;
  }

  .config-yaml-uploader {
    margin-top: 15px;
    margin-left: -10px;
    background-color: transparent;

    .el-upload-list {
      margin: 0 10px 10px;
    }

    .el-upload-list::after {
      content: '';
      display: block;
      clear: both;
    }

    .el-upload-list__item-status-label {
      display: none;
    }

    .el-upload-list__item:hover {
      background-color: transparent;
    }

    .el-upload-list__item-name {
      padding-left: 20px;
      padding-right: 20px;
      box-shadow: 0 0 15px 2px #dedeea inset;
      border-radius: 8px;
      color: #7965e0;
      font-size: 14px;
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
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;
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
    display: block;
    color: #380879;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
  }

  .test.tit {
    margin-top: 10px;
  }

  .test.tit .test {
    display: inline-block;
    margin-right: 15px;
    margin-top: 10px;
    font-size: 15px;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
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
