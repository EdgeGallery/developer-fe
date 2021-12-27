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
  <div class="appd-preview">
    <div class="common-div-bg appd-preview-warraper">
      <div class="app-package-preview-title">
        {{ $t('appPackage.appdDetail') }}
      </div>
      <el-row>
        <el-col
          :span="6"
          class="file-list"
        >
          <el-tree
            class="appd-tree"
            :data="appPageListData"
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @node-click="handleNodeClick"
          />
        </el-col>
        <el-col :span="18">
          <div class="file-desc">
            <mavon-editor
              class="common-mavon-editor"
              v-model="markdownSource"
              :toolbars-flag="false"
              :subfield="false"
              :default-open="viewOrEdit"
              :box-shadow="false"
            />
          </div>
        </el-col>
      </el-row>
      <div class="btn-container appdPreviewBtn">
        <el-button
          class="common-btn"
          v-show="!isEditFile"
          @click="modifyFile()"
        >
          {{ $t('common.edit') }}
        </el-button>
        <el-button
          class="common-btn"
          v-show="isEditFile"
          @click="saveFile()"
        >
          {{ $t('common.save') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="confirm()"
        >
          {{ $t("common.confirm") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { imageApi } from '../../../api/developerApi'
export default {
  name: 'AppdPreview',
  components: {},
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'fileName'
      },
      appPageListData: [],
      fileContent: '',
      markdownSource: '',
      packageId: this.$route.query.packageId,
      viewOrEdit: 'preview',
      isEditFile: false,
      modifyFileName: '',
      filePath: '',
      fileType: '',
      FileName: '',
      saveFileparams: {
        filePath: '',
        content: ''
      }
    }
  },
  methods: {
    confirm () {
      imageApi.packageToZip(this.packageId).then(res => {
        this.$eg_messagebox(this.$t('appPackage.packageFinish'), 'success', '', this.$t('common.confirm'), this.$t('appPackage.subText')).then(() => {
          this.$store.commit('changeFlow', '4')
          this.$router.push('/EG/developer/home')
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('appPackage.packageFail'),
          type: 'error'
        })
      })
    },
    getAppPackageList () {
      imageApi.getPackageStructure(this.packageId).then(res => {
        if (!res.data || res.data.length === 0) {
          return
        }
        this.appPageListData = res.data[0].children
        if (this.appPageListData.length > 0) {
          this.$nextTick(function () {
            const firstNode = document.querySelector(
              '.appd-tree .el-tree-node .el-tree-node__children .el-tree-node'
            )
            firstNode.click()
          })
        }
      })
    },
    handleNodeClick (val) {
      if (val.children) {
        return
      }
      this.filePath = val.filePath
      console.log(this.filePath)
      this.FileName = val.fileName
      this.getFileDetail()
    },
    getFileDetail () {
      let _file = {
        filePath: this.filePath
      }
      this.fileType = this.FileName.substr(this.FileName.lastIndexOf('.'))
      imageApi.getPackageFile(this.packageId, _file).then(res => {
        let typeArr = ['.zip', '.tgz', '.png', '.jpg']
        if (this.fileType === '.md') {
          this.markdownSource = res.data.content
        } else if (typeArr.includes(this.fileType)) {
          this.markdownSource = '文件格式不支持'
        } else if (this.fileType === '.json') {
          if (res.data.length === 0) {
            this.markdownSource = '```yaml\r\n' + '文件内容为空' + '\r\n```'
          } else {
            this.markdownSource = '```json\r\n' + res.data.content + '\r\n```'
          }
        } else if (JSON.stringify(res.data.content) === '""') {
          this.markdownSource = '```yaml\r\n' + '文件内容为空' + '\r\n```'
        } else {
          this.markdownSource = '```yaml\r\n' + res.data.content + '\r\n```'
        }
      })
    },
    modifyFile () {
      let unSupportTypes = ['.zip', '.tgz', '.png', '.jpg']
      if (unSupportTypes.includes(this.fileType)) {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('appPackage.notSupport'),
          type: 'error'
        })
      } else {
        this.viewOrEdit = 'edit'
        this.isEditFile = true
      }
      if (this.fileType !== '.md' && !unSupportTypes.includes(this.fileType)) {
        let _content = this.markdownSource.substring(9, (this.markdownSource.length - 5))
        this.markdownSource = _content
      }
    },
    saveFile () {
      this.viewOrEdit = 'preview'
      this.isEditFile = false
      this.saveFileparams.filePath = this.filePath
      this.saveFileparams.content = this.markdownSource
      if (this.fileType === '.json') {
        this.markdownSource = '```json\r\n' + this.markdownSource + '\r\n```'
      } else if (this.fileType !== '.md') {
        this.markdownSource = '```yaml\r\n' + this.markdownSource + '\r\n```'
      }
      imageApi.modifyPackageFile(this.packageId, this.saveFileparams).then(res => {
        this.getFileDetail(this.filePath, this.FileName)
      })
    }
  },
  mounted () {
    this.getAppPackageList()
  }
}
</script>

<style lang="less">
.appd-preview {
  background: transparent;
  height: 90%;
  .appd-preview-warraper::-webkit-scrollbar,.file-list::-webkit-scrollbar {
    display: none;
  }
  .appd-preview-warraper {
    width: 76%;
    max-height: 95%;
    overflow: auto;
    border-radius: 16px;
    margin: 51px auto;
    padding: 40px 40px 40px 40px;
    .app-package-preview-title {
      height: 30px;
      line-height: 30px;
      font-size: 28px;
      text-align: center;
    }
    .rules-title:before {
      margin-right: 7px;
      background-color: #76e1e9;
    }
    .el-row {
      margin-top: 20px;
      .file-list, .markdown-body {
        height: 500px;
        overflow: auto;
      }
      .file-list {
        border-radius: 16px;
        border: 1px #ffffff solid;
        .el-tree{
          overflow-x: auto;
        }
        .el-tree-node__label {
          font-size: 16px;
        }
      }
      .file-desc {
        padding-left: 15px;
      }
      .el-tree {
        background-color: transparent;
        color: #ffffff;
        .el-tree__empty-text {
          color: #ffffff;
        }
        .el-tree-node__content {
          height: 35px;
          line-height: 35px;
          .el-tree-node__expand-icon {
            color: #ffffff;
          }
          .el-tree-node__expand-icon.is-leaf {
            color: transparent;
          }
        }
        .el-tree-node__content:hover {
          background-color: transparent;
        }
      }
      .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        background-color: rgba(255,255,255,.3);
      }
    }
    .appdPreviewBtn {
      .el-button {
        border-radius: 12px;
        font-size: 14px;
        line-height: 19px;
        padding: 3px 32px;
      }
      .el-button + .el-button {
        margin-left: 60px;
      }
    }
  }
}
</style>
