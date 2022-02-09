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
        :file-list="helmChartFile"
        :auto-upload="false"
        accept=".yaml,.tgz"
        name="yamlFile"
        :disabled="helmChartFile.length>0 || uploadYamlLoading"
      >
        <a
          class="uploader-button"
          :class="{'btn-disabled':helmChartFile.length>0 || uploadYamlLoading}"
          slot="trigger"
          id="btn_uploadContainerFile"
          v-loading="uploadYamlLoading"
          element-loading-background="rgba(0, 0, 0, 0.2)"
          rel="noopener noreferrer"
        >
          {{ $t('container.uploadFile') }}
        </a>
        <el-tooltip
          effect="dark"
          :content="$t('sandboxPromptInfomation.containerScriptUploadTip')"
          placement="top-start"
        >
          <em class="script-upload-tip">i</em>
        </el-tooltip>
        <a
          class="uploader-button"
          :class="{'btn-disabled':helmChartFile.length===0}"
          id="btn_deleteContainerBtn"
          @click="deleteHelmChartsFile"
          rel="noopener noreferrer"
        >
          {{ $t('common.delete') }}
        </a>
        <a
          class="uploader-button"
          :href="demoYaml"
          download="demo.yaml"
          id="btn_downloadContainerDemoFile"
          rel="noopener noreferrer"
        >
          {{ $t('container.downloadDemo') }}
        </a>

        <div
          v-show="hasValidate"
        >
          <CheckResult :check-flag-prop="checkFlag" />
        </div>
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
            id="btn_editContainerScript"
            class="rt"
            :class="{'btn-disabled':helmChartFileList.length===0}"
            v-if="viewOrEditContent==='preview'"
            @click="editFile()"
          >
            {{ $t('common.edit') }}
          </el-button>
          <el-button
            id="btn_saveContainerScript"
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
            :data="helmChartFileList"
            :props="defaultProps"
            @node-click="handleNodeClick"
            highlight-current
            :empty-text="$t('common.noData')"
          >
            <span
              class="show-ellipsis"
              slot-scope="{ node }"
            >
              <span :title="node.label">{{ node.label }}</span>
            </span>
          </el-tree>
          <div
            class="file-content rt"
            id="file-content"
          >
            <mavon-editor
              class="common-mavon-editor"
              v-model="markdownSource"
              :toolbars-flag="false"
              :subfield="false"
              :default-open="viewOrEditContent"
              :box-shadow="false"
              preview-background="#4E3494"
            />
          </div>
          <CheckResult
            v-show="hasValidateSave"
            class="check-result-save"
            :check-flag-prop="checkFlag"
          />
        </div>
      </div>
      <div class="btn-container">
        <el-button
          id="btn_closeUploadScript"
          class="common-btn"
          @click="finishUploadScript"
        >
          {{ $t('common.close') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import demoYaml from '@/assets/file/test_helm_template.yaml'
import CheckResult from './CheckResult.vue'
import { sandbox } from '../../../../api/developerApi.js'
import devCommonUtil from '../../../../tools/devCommonUtil.js'
export default {
  name: 'ContainerScript',
  props: {
    isRequiredService: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CheckResult
  },
  data () {
    return {
      detailTitle: sessionStorage.getItem('sandboxName'),
      applicationId: sessionStorage.getItem('applicationId'),
      helmChartFile: [],
      uploadYamlLoading: false,
      demoYaml,
      viewOrEditContent: 'preview',
      helmChartFileList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      hasValidate: false,
      hasValidateSave: false,
      checkFlag: {
        formatSuccess: true,
        imageSuccess: true,
        serviceSuccess: true,
        mepAgentSuccess: this.isRequiredService
      },
      helmChartId: '',
      innerPath: '',
      markdownSource: '',
      saveFileparams: {
        innerFilePath: '',
        content: ''
      },
      imagesName: ''
    }
  },
  methods: {
    getHelmChartsFileList () {
      sandbox.container.getHelmchartsFileList(this.applicationId).then(res => {
        if (!res.data || res.data.length === 0) {
          return
        }
        let _data = res.data[0]
        this.helmChartId = _data.id
        this.helmChartFile = [{ name: _data.name }]
        this.hasValidate = true
        this.helmChartFileList = _data.helmChartFileList
        this.setResultDivLeft()
        this.clickFirstNode()
      })
    },
    handleChangeYaml (file, fileList) {
      let _helmChartFile = []
      _helmChartFile.push(file.raw)
      this.helmChartFile = []
      const fileType = file.raw.name.substring(file.raw.name.lastIndexOf('.') + 1)
      const fileTypeArr = ['yaml', 'tgz']
      if (!fileTypeArr.includes(fileType)) {
        this.$eg_messagebox(this.$t('workspace.configYaml.yamlFileType'), 'warning')
        _helmChartFile = []
      }
      if (_helmChartFile.length > 0) {
        this.setResultDivLeft()
        this.submitContainerScript(_helmChartFile)
      }
    },
    submitContainerScript (helmChartFile) {
      this.uploadYamlLoading = true
      let fd = new FormData()
      fd.append('file', helmChartFile[0])
      sandbox.container.postHelmChartsFile(this.applicationId, fd).then(res => {
        if (res.data.id) {
          this.helmChartFile = [{ name: res.data.name }]
          this.hasValidate = true
          this.helmChartId = res.data.id
          this.helmChartFileList = res.data.helmChartFileList
          this.$store.commit('changeFlow', '3')
          this.clickFirstNode()
        }
        this.checkFlag.serviceSuccess = true
        this.checkFlag.imageSuccess = true
        this.checkFlag.formatSuccess = true
      }, (error) => {
        this.hasValidate = false
        if (error.response.data.retCode === 20038) {
          this.checkFlag.serviceSuccess = false
        } else if (error.response.data.retCode === 20027) {
          this.checkFlag.imageSuccess = false
        } else if (error.response.data.message.indexOf('is not in standard format') > -1) {
          let _arrTemp = error.response.data.message.split(' ')
          this.imagesName = _arrTemp[1]
          this.$eg_messagebox(this.imagesName + ' ' + this.$t('sandboxPromptInfomation.imageInfoError'), 'error')
        } else if (error.response.data.retCode === 20025) {
          let _arrTemp = error.response.data.message.split(' ')
          this.imagesName = _arrTemp[1]
          this.$eg_messagebox(this.imagesName + ' ' + this.$t('sandboxPromptInfomation.notInHarbor'), 'error', this.$t('common.cancel'), this.$t('common.confirm')).then(() => {
            this.jumpToImageList()
          })
        } else {
          this.checkFlag.formatSuccess = false
        }
        let language = localStorage.getItem('language')
        let defaultMsg = this.$t('sandboxPromptInfomation.noFormat')
        devCommonUtil.showTipMsg(language, error, defaultMsg)
        this.helmChartFile = []
      }).finally(() => {
        this.uploadYamlLoading = false
      })
    },
    jumpToImageList () {
      let _isEGPlatform = window.location.href.indexOf('/EG/')
      let _imageListHref
      if (_isEGPlatform > 0) {
        _imageListHref = this.$router.resolve({ path: '/developer/mecDeveloper/system/imagemgmt' })
      } else {
        _imageListHref = this.$router.resolve({ path: '/mecDeveloper/system/imagemgmt' })
      }
      window.open(_imageListHref.href, '_blank')
    },
    editFile () {
      let _content = this.markdownSource.substring(9, (this.markdownSource.length - 5))
      this.markdownSource = _content
      this.viewOrEditContent = 'edit'
    },
    saveFile () {
      this.saveFileparams.innerFilePath = this.innerPath
      this.saveFileparams.content = this.markdownSource
      this.markdownSource = '```yaml\r\n' + this.markdownSource + '\r\n```'
      this.viewOrEditContent = 'preview'
      sandbox.container.saveHelmChartFile(this.applicationId, this.helmChartId, this.saveFileparams).then(res => {
        this.getHelmChartFileContent(this.innerPath)
      }).catch(error => {
        if (error.response.data.message === 'Service info not found in deployment yaml!') {
          this.$eg_messagebox(this.$t('sandboxPromptInfomation.noServiceInfo'), 'error')
          this.checkFlag.serviceSuccess = false
        } else if (error.response.data.message === 'Image info not found in deployment yaml!') {
          this.$eg_messagebox(this.$t('sandboxPromptInfomation.noImageInfo'), 'error')
          this.checkFlag.imageSuccess = false
        } else {
          this.$eg_messagebox(this.$t('sandboxPromptInfomation.noFormat'), 'error')
          this.checkFlag.formatSuccess = false
        }
      })
    },
    getHelmChartFileContent (filePath) {
      sandbox.container.getHelmChartFileContent(this.applicationId, this.helmChartId, filePath).then(res => {
        this.markdownSource = '```yaml\r\n' + res.data + '\r\n```'
      })
    },
    deleteHelmChartsFile () {
      this.$eg_messagebox(this.$t('promptInformation.confirmDelete'), 'warning', this.$t('common.cancel')).then(() => {
        sandbox.container.deleteHelmChartsFile(this.applicationId, this.helmChartId).then(() => {
          this.helmChartFile = []
          this.markdownSource = ''
          this.helmChartFileList = []
          this.hasValidate = false
        }).catch(() => {
          this.$eg_messagebox(this.$t('promptInformation.deleteFailed'), 'error')
        })
      }).catch(() => {
        this.$eg_messagebox(this.$t('promptInformation.deleteFailed'), 'error')
      })
    },
    handleNodeClick (data) {
      if (data.children) {
        return
      }
      this.innerPath = data.innerPath
      this.getHelmChartFileContent(data.innerPath)
    },
    clickFirstNode () {
      this.$nextTick().then(() => {
        const firstNode = document.querySelector('.el-tree-node .el-tree-node__content')
        if (firstNode && this.helmChartId !== '') {
          firstNode.click()
          setTimeout(() => {
            const lastNode = document.querySelector('.el-tree-node .el-tree-node__children .el-tree-node:nth-child(3)')
            if (lastNode && this.helmChartId !== '') {
              lastNode.click()
            }
          })
        }
      })
    },
    setResultDivLeft () {
      this.$nextTick().then(() => {
        let _oDiv = document.querySelector('.script-div .el-upload-list .el-upload-list__item-name')
        let _oDivResult = document.querySelector('.script-div .result')
        if (_oDiv.offsetWidth >= 440) {
          _oDivResult.style.left = 0 + 'px'
          _oDivResult.style.top = 75 + 'px'
        } else {
          _oDivResult.style.left = (_oDiv.offsetWidth + 32) + 'px'
        }
      })
    },
    finishUploadScript () {
      this.$emit('finishUploadScript')
    }
  },
  mounted () {
    this.getHelmChartsFileList()
  }
}
</script>

<style lang="less">
.container-script{
  height: 100%;
  position: relative;
  .script-div{
    width: 1000px;
    height: calc(100% - 150px);
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -15%);
  }
  .upload-btn{
    margin-left: 15px;
    position: relative;
    .el-upload{
      cursor: default;
    }
    .uploader-button{
      display: inline-block;
      height: 35px;
      line-height: 35px;
      border-radius: 4px;
      padding: 0 32px;
      margin-right: 24px;
      color: #fff;
      background-color: #4e3494;
      font-size: 16px;
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    }
    .uploader-button:hover{
      color: #806bbc;
      background-color: #412590;
      cursor: pointer;
    }
    .script-upload-tip{
      position: relative;
      left: -15px;
      display: inline-block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      border-radius: 50%;
      background: #604AD0;
      font-size: 14px;
      font-style: normal;
    }
  }
  .config-file{
    height: calc(100% - 222px);
    margin-top: 80px;
    .el-tree-node__label{
      font-size: 16px;
    }
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
        font-size: 16px;
        padding-left: 15px;
      }
    }
    .package{
      margin: 15px 0 0 15px;
      position: relative;
      height: calc(100% - 90px);
      .el-tree.container-package-tree{
        width: 295px;
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
        width: calc(100% - 305px);
        height: 100%;
        background: #4E3494;
        border-radius: 4px;
        overflow: hidden;
        overflow: auto;
      }
      .show-ellipsis {
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .markdown-body code{
        font-size: 100%;
      }
      .check-result-save{
        top: calc(100% + 10px);
      }
    }
  }
  .el-upload-list__item{
    background-color:transparent;
    transition: none !important;
    color: #fff;
    font-size: 16px;
    margin-top: 20px;
    .el-icon-close,.el-icon-upload-success{
      display: none;
    }
  }
  .el-upload-list__item-name{
    color: #fff !important;
    background: #301b69;
    display: inline;
    padding: 3px 10px;
    cursor: default !important;
  }
}
</style>
