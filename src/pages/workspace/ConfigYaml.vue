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
    <div class="container1">
      <div class="work-title-clickable">
        <el-radio
          class="work-radio"
          v-model="selectConfigType"
          label="1"
        >
          {{ $t('workspace.configYaml.importFile') }}
        </el-radio>
      </div>
      <div class="content">
        <div class="work-p">
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
          <el-button slot="trigger">
            {{ $t('workspace.configYaml.uploadYaml') }}
          </el-button>
          <el-button
            class="down-demo"
            :href="demoYaml"
            download="demo.yaml"
          >
            {{ $t('workspace.configYaml.downloadDemo') }}
          </el-button>
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
        </div>
      </div>
    </div>
    <div class="container2">
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
        class="content"
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
        class="work-p content"
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
      activeName: 'first',
      hasValidate: false,
      userId: sessionStorage.getItem('userId'),
      projectId: sessionStorage.getItem('mecDetailID'),
      markdownSource: '',
      showResult: true,
      fileUploadSuccess: false,
      selectConfigType: '1'
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
    // Choose YAML file
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
          this.$message({
            type: 'success',
            message: this.$t('promptMessage.uploadSuccess')
          })
        } else {
          this.fileUploadSuccess = false
          this.appYamlFileId = ''
          this.yamlFileList = []
          this.markdownSource = ''
        }
        this.showResult = true
        const { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess } = res.data
        this.checkFlag = { formatSuccess, imageSuccess, mepAgentSuccess, serviceSuccess }
        this.submitData(this.appYamlFileId)
      }, (error) => {
        if (error.response.data.message === 'Failed to read content of helm template yaml') {
          this.$message.error(this.$t('promptMessage.uploadYamlFailure'))
        } else if (error.response.data.message === 'yaml file is empty!') {
          this.$message.error(this.$t('promptMessage.fileIsEmpty'))
        } else {
          this.$message.error(this.$t('promptMessage.imageInfoErr'))
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
.config-yaml {
  .content {
    margin: 20px 53px;

    .tip {
      font-size: 14px;
    }

    .uploader {
      margin-top: 15px;
      margin-left: -10px;

      .el-button {
        height: 32px;
        line-height: 32px;
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
  }

  .container2 {
    padding-top: 30px;
  }
}
</style>
