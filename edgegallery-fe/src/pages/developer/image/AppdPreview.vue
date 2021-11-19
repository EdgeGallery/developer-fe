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
            @node-click="getFileDetail"
          />
        </el-col>
        <el-col :span="18">
          <div class="file-desc">
            <mavon-editor
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
          {{ $t('appPackage.save') }}
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
        label: 'name'
      },
      appPageListData: [],
      fileType: '',
      fileContent: '',
      markdownSource: '',
      packageId: this.$route.query.packageId,
      viewOrEdit: 'preview',
      isEditFile: false,
      modifyFileName: ''
    }
  },
  methods: {
    confirm () {
      imageApi.packageToZip(this.packageId).then(res => {
        this.$eg_messagebox('打包完成', 'success', '', '确认', '认证前系统会默认释放虚拟机资源,释放后再不可再返回修改').then(() => {
          this.$store.commit('changeFlow', '4')
          this.$router.push('/EG/developer/home')
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: '打包失败',
          type: 'error'
        })
      })
    },
    getAppPackageList () {
      imageApi.getPackageStructure(this.packageId).then(res => {
        if (res.data.children) {
          this.appPageListData = res.data.children
          let APPD = {}
          this.appPageListData.forEach((item, index) => {
            if (item.name === 'APPD') {
              APPD = item
              this.appPageListData.splice(index, 1)
            }
          })
          this.appPageListData.unshift(APPD)
          if (this.appPageListData.length > 0) {
            this.$nextTick(function () {
              const firstNode = document.querySelector(
                '.appd-tree .el-tree-node .el-tree-node__children .el-tree-node'
              )
              firstNode.click()
            })
          }
        }
      })
    },
    getFileDetail (val) {
      this.modifyFileName = val.name
      this.fileType = this.modifyFileName.substr(this.modifyFileName.lastIndexOf('.'))
      if (!val.children) {
        imageApi.getPackageFile(this.packageId, val.name).then(res => {
          let typeArr = ['.zip', '.tgz', '.png']
          if (this.fileType === '.md') {
            this.markdownSource = res.data
          } else if (typeArr.includes(this.fileType)) {
            this.markdownSource = '文件格式不支持'
          } else if (this.fileType === '.json') {
            if (res.data.length === 0) {
              this.markdownSource = '文件内容为空'
            } else {
              this.markdownSource = '```json\r\n' + JSON.stringify(res.data, null, 2) + '\r\n```'
            }
          } else if (JSON.stringify(res.data) === '""') {
            this.markdownSource = '文件内容为空'
          } else {
            this.markdownSource = '```yaml\r\n' + res.data + '\r\n```'
          }
        })
      }
    },
    modifyFile () {
      let unSupportTypes = ['.zip', '.tgz', '.png']
      if (unSupportTypes.includes(this.fileType)) {
        this.$message({
          showClose: true,
          duration: 2000,
          message: '格式不支持修改',
          type: 'error'
        })
      } else {
        this.viewOrEdit = 'edit'
        this.isEditFile = true
      }
      let typeList = ['.md', '.json']
      if (this.markdownSource === '文件内容为空' && !typeList.includes(this.fileType)) {
        this.markdownSource = '```yaml\r\n' + '文件内容为空' + '\r\n```'
      }
    },
    saveFile () {
      this.viewOrEdit = 'preview'
      this.isEditFile = false
      let yamlList = ['.yaml', '.meta', '.mf', '.txt', '.csh']
      imageApi.getPackageFile(this.packageId, this.modifyFileName).then(response => {
        if (this.fileType === '.json') {
          let _configFileContent = '```json\r\n' + JSON.stringify(response.data, null, 2) + '\r\n```'
          if (_configFileContent !== this.markdownSource) {
            let _editMarkDownstr = this.markdownSource.substring(8, (this.markdownSource.length - 4))
            imageApi.modifyPackageFile(this.packageId, this.modifyFileName, _editMarkDownstr).then(res => {
              this.markdownSource = '```json\r\n' + JSON.stringify(res.data, null, 2) + '\r\n```'
            })
          } else {
            this.markdownSource = '```json\r\n' + JSON.stringify(response.data, null, 2) + '\r\n```'
          }
        } else if (yamlList.includes(this.fileType)) {
          let _configFileContent = '```yaml\r\n' + response.data + '\r\n```'
          if (_configFileContent !== this.markdownSource) {
            let _editMarkDownstr = this.markdownSource.substring(8, (this.markdownSource.length - 4))
            imageApi.modifyPackageFile(this.packageId, this.modifyFileName, _editMarkDownstr).then(res => {
              this.markdownSource = '```yaml\r\n' + res.data + '\r\n```'
            })
          } else {
            this.markdownSource = '```yaml\r\n' + response.data + '\r\n```'
          }
        } else {
          let _configFileContent = response.data
          if (_configFileContent !== this.markdownSource) {
            let _editMarkDownstr = this.markdownSource
            imageApi.modifyPackageFile(this.packageId, this.modifyFileName, _editMarkDownstr).then(res => {
              this.markdownSource = res.data
            })
          } else {
            this.markdownSource = response.data
          }
        }
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
    max-height: 85%;
    overflow: auto;
    border-radius: 16px;
    margin: 51px auto;
    padding: 40px 40px 40px 40px;
    .app-package-preview-title {
      height: 30px;
      line-height: 30px;
      font-size: 26px;
      text-align: center;
    }
    .rules-title:before {
      margin-right: 7px;
      background-color: #76e1e9;
    }
    .el-row {
      margin-top: 20px;
      .file-list, .markdown-body {
        height: 425px;
        overflow: auto;
      }
      .file-list {
        border-radius: 16px;
        border: 1px #ffffff solid;
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
