<template>
  <div>
    <el-dialog
      :visible.sync="isModifyVisible"
      :close-on-click-modal="false"
      class="default_dialog"
      width="60%"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('toolBox.appEditor.edit') }}
      </div>
      <div class="app-preview">
        <el-row>
          <el-col
            :span="8"
            class="file-list"
          >
            <el-tree
              class="app-tree"
              :data="appPageListData"
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
          </el-col>
          <el-col :span="16">
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
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="bgBtn"
          v-show="!isEditFile"
          @click="modifyFile()"
        >
          {{ $t('common.edit') }}
        </el-button>
        <el-button
          class="bgBtn"
          v-show="isEditFile"
          @click="saveFile()"
        >
          {{ $t('common.save') }}
        </el-button>
        <el-button
          class="bgBtn"
          @click="confirm()"
        >
          {{ $t("common.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { applicationEditorApi } from '@/tools/api.js'
export default {
  name: 'ModifyPackageDlg',
  props: {
    isModifyVisible: {
      type: Boolean,
      default: false
    },
    packageId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'fileName'
      },
      appPageListData: [],
      markdownSource: '',
      viewOrEdit: 'preview',
      isEditFile: false,
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
    getPkgFileList () {
      applicationEditorApi.getPkgStucture(this.packageId).then(res => {
        if (!res.data || res.data.length === 0) {
          return
        }
        this.appPageListData = res.data[0].children
        this.clickFirstNode()
        this.$eg_messagebox(this.$t('toolBox.appEditor.checkMf'), 'warning')
      })
    },
    clickFirstNode () {
      this.$nextTick().then(() => {
        const firstNode = document.querySelector(
          '.app-tree .el-tree-node .el-tree-node__children .el-tree-node'
        )
        if (firstNode && this.helmChartId !== '') {
          firstNode.click()
        }
      })
    },
    handleNodeClick (val) {
      if (val.children) {
        return
      }
      this.filePath = val.filePath
      this.FileName = val.fileName
      this.getFileContent()
    },
    getFileContent () {
      let _file = {
        filePath: this.filePath
      }
      this.fileType = this.FileName.substr(this.FileName.lastIndexOf('.'))
      applicationEditorApi.getPkgContent(this.packageId, _file).then(res => {
        let typeArr = ['.zip', '.tgz', '.png']
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
      let unSupportTypes = ['.zip', '.tgz', '.png']
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
      applicationEditorApi.modifyPkgFile(this.packageId, this.saveFileparams).then(res => {
        this.getFileContent(this.filePath, this.FileName)
      })
    },
    confirm () {
      this.$emit('closedlg')
    }
  },
  mounted () {
    this.getPkgFileList()
  }
}
</script>
<style lang="less">
  .default_dialog .el-dialog__body {
      padding: 0 40px 0 !important;
  }
  .app-preview {
    border-radius: 16px;
    .el-row {
      .file-list, .markdown-body {
        height: 425px;
        overflow: auto;
        background: #fff;
      }
      .file-list {
        border-radius: 4px;
      }
      .file-desc {
        padding-left: 15px;
      }
      .el-tree {
        width: 270px;
        border-radius: 4px;
        .el-tree-node__expand-icon{
          color: #606266;
        }
        .el-tree-node__content {
          height: 26px;
          line-height: 26px;
          .el-tree-node__expand-icon.is-leaf {
            color: transparent;
          }
        }
        .el-tree-node__content:hover {
          background-color: transparent;
        }
      }
      .el-tree.app-tree .el-tree-node__content:hover,
      .app-tree.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
        background-color: #e7e3f3;
      }
    }
  }
</style>
