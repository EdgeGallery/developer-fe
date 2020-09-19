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
  <div class="toolchain">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/list' }">
        {{ $t('breadCrumb.devTools') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('workspace.toolChain') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="toolchain-main"
      v-loading="analysisLoading"
      :element-loading-text="uploadCodeText"
    >
      <el-row>
        <el-col
          :span="16"
          class="analysis"
        >
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
            :label-width="labelWidth"
            size="mini"
          >
            <el-form-item :label="$t('workspace.uploadSourceCode')">
              <el-upload
                id="uploadCode"
                class="upload-demo"
                ref="uploadFile"
                action=""
                :limit="1"
                :on-change="handleChangeCode"
                :on-exceed="handleExceed"
                :file-list="codeFileList"
                :auto-upload="false"
                :on-remove="removeUpload"
                accept=".tar.gz"
                name="codeFile"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >
                  {{ $t('workspace.uploadSourceCode') }}
                </el-button>
              </el-upload>
              <p
                class="codeResult"
                v-if="sourceCodeExist"
                v-loading="!sourceCodeExist"
              >
                {{ sourceCodeName }}
                <em
                  class="el-icon-close"
                  @click="deleteSourceCode"
                />
              </p>
            </el-form-item>
            <el-form-item :label="$t('workspace.targetOS')">
              <el-select
                v-model="form.targetOs"
                filterable
              >
                <el-option
                  v-for="item in osOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('workspace.buildTools')">
              <el-select v-model="form.buildTool">
                <el-option
                  v-for="item in toolOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('workspace.compileCommand')"
              prop="command"
            >
              <el-select
                v-model="form.command"
                disabled
              >
                <el-option
                  v-for="item in commandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('workspace.compilerVersion')">
              <el-select
                v-model="form.compilerVersion"
                filterable
              >
                <el-option
                  v-for="item in compilerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('workspace.targetVersion')">
              <el-select v-model="form.systemVersion">
                <el-option
                  v-for="item in systemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              size="large"
              class="analysisBtn"
            >
              <el-button
                size="small"
                @click="analysisCode"
              >
                {{ $t('workspace.analysis') }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col
          :span="8"
          class="report"
          id="report"
        >
          <h3>{{ $t('workspace.historicalReport') }}（{{ reportNum }}）</h3>
          <el-table
            :data="reportListData"
            style="width: 100%"
            v-loading="reportListLoading"
          >
            <el-table-column
              width="180"
            >
              <template slot-scope="scope">
                <span @click="viewReport(scope.row)">{{ scope.row }}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <em
                  class="el-icon-download"
                  @click="clickdownLoadReport(scope.row)"
                />
                <em
                  class="el-icon-delete"
                  @click="deleteReport(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { Get, Post, Delete, downLoadReport } from '../../tools/tool.js'
export default {
  name: 'Toolchain',
  data () {
    return {
      projectId: sessionStorage.getItem('mecDetailID'),
      sourceCodeName: '',
      sourceCodeExist: false,
      labelWidth: '140px',
      form: {
        targetOs: 'CentOS 7.6',
        buildTool: 'make',
        command: 'make',
        compilerVersion: 'GCC 4.8.5',
        systemVersion: 'v4.14.0'
      },
      rules: {
        command: [
          { required: true, message: this.$t('promptMessage.selectCommand'), trigger: 'change' }
        ]
      },
      osOptions: [
        {
          value: '1',
          label: 'CentOS 7.6'
        },
        {
          value: '2',
          label: 'NeoKylin V7U5'
        },
        {
          value: '3',
          label: 'NeoKylin V7U6'
        },
        {
          value: '4',
          label: 'Deepin V15.2'
        },
        {
          value: '5',
          label: 'Ubuntu 18.04.1'
        },
        {
          value: '6',
          label: 'LinxOS 6.0.90'
        },
        {
          value: '7',
          label: 'Debian 10'
        },
        {
          value: '8',
          label: 'SUSE SLES 15.1'
        },
        {
          value: '9',
          label: 'EulerOS2.8'
        }
      ],
      toolOptions: [
        {
          value: '1',
          label: 'make'
        }
      ],
      commandOptions: [
        {
          value: '1',
          label: 'make'
        }
      ],
      compilerOptions: [
        {
          value: '1',
          label: 'GCC 4.8.5'
        },
        {
          value: '2',
          label: 'GCC 4.9.3'
        },
        {
          value: '3',
          label: 'GCC 5.1'
        },
        {
          value: '4',
          label: 'GCC 5.2'
        },
        {
          value: '5',
          label: 'GCC 5.3'
        },
        {
          value: '6',
          label: 'GCC 5.4'
        },
        {
          value: '7',
          label: 'GCC 5.5'
        },
        {
          value: '8',
          label: 'GCC 6.1'
        },
        {
          value: '9',
          label: 'GCC 6.2'
        },
        {
          value: '10',
          label: 'GCC 6.3'
        },
        {
          value: '11',
          label: 'GCC 6.4'
        },
        {
          value: '12',
          label: 'GCC 6.5'
        },
        {
          value: '13',
          label: 'GCC 7.1'
        },
        {
          value: '14',
          label: 'GCC 7.2'
        },
        {
          value: '15',
          label: 'GCC 7.3'
        },
        {
          value: '16',
          label: 'GCC 7.4'
        },
        {
          value: '17',
          label: 'GCC 8.1'
        },
        {
          value: '18',
          label: 'GCC 8.2'
        },
        {
          value: '19',
          label: 'GCC 8.3'
        }
      ],
      systemOptions: [
        {
          value: '1',
          label: 'v4.14.0'
        }
      ],
      reportListData: [],
      reportListLoading: true,
      reportNum: 0,
      codeFileList: [],
      sourceCodePath: sessionStorage.getItem('sourceCodePath'),
      analysisLoading: false,
      uploadCodeText: ''
    }
  },
  mounted () {
    this.getSourceCode()
    this.getScanTask()
    function divHeight () {
      const oDiv = document.getElementById('report')
      const deviceHeight = document.documentElement.clientHeight
      oDiv.style.height = Number(deviceHeight) - 330 + 'px'
    }
    divHeight()
    window.onresize = function () {
      divHeight()
    }
  },
  methods: {
    // 查询已上传的源代码
    getSourceCode () {
      Get('mec/toolchain/v1/porting/' + this.projectId, '', 'toolchain').then(res => {
        this.sourceCodeName = res.data.sourceCodeName
        this.sourceCodeExist = res.data.sourceCodeExist
      })
    },
    // 删除已上传的源代码
    deleteSourceCode () {
      Delete('mec/toolchain/v1/porting/' + this.projectId, '', 'toolchain').then(res => {
        this.getSourceCode()
        sessionStorage.setItem('sourceCodePath', '')
      })
    },
    // 上传源代码
    handleChangeCode (file, fileList) {
      this.codeFileList.push(file.raw)
      if (file.size / 1024 / 1024 > 10) {
        this.$message.warning(this.$t('promptMessage.moreThan10M'))
        this.codeFileList = []
      } else if (this.sourceCodeName === '') {
        this.codeFileList = []
        this.analysisLoading = true
        this.codeFileList.push(file.raw)
        let formdata = new FormData()
        formdata.append('file', this.codeFileList[0])
        this.uploadCodeText = this.$t('promptMessage.uploadCodeText')
        Post('mec/toolchain/v1/porting/' + this.projectId, formdata, 'toolchain').then(res => {
          if (res.status === 200) {
            this.analysisLoading = false
            sessionStorage.setItem('sourceCodePath', res.data.sourcePath)
          } else {
            this.codeFileList = []
            this.$message.error(this.$t('workspace.uploadCodeFail'))
            this.analysisLoading = false
          }
        })
      } else {
        this.handleExceed(file, fileList)
        this.codeFileList = []
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    removeUpload (file, fileList) {
      this.codeFileList = fileList
    },
    // 点击分析按钮，创建分析任务
    analysisCode () {
      let params = {
        'constructtool': this.form.buildTool,
        'compilecommand': this.form.command,
        'targetos': this.form.targetOs.toLocaleLowerCase(),
        'targetkernel': this.form.systemVersion.slice(1),
        'compiler': {
          'type': 'gcc',
          'version': this.form.compilerVersion.slice(4)
        }
      }
      this.analysisLoading = true
      this.uploadCodeText = this.$t('promptMessage.analyzingText')
      Post('mec/toolchain/v1/porting/' + this.projectId + '/tasks', params, 'toolchain').then(res => {
        this.getScanTask()
        this.analysisLoading = false
      }).catch(err => {
        this.analysisLoading = false
        this.$message({
          message: this.$t('promptMessage.analysisCodeFail'),
          type: 'error',
          duration: '2000'
        })
        console.log(err)
      })
    },
    // 查询扫描任务列表
    getScanTask () {
      Get('mec/toolchain/v1/porting/' + this.projectId + '/tasks', '', 'toolchain').then(res => {
        if (res.status === 200) {
          this.reportNum = res.data.data.totalcount
          this.reportListData = res.data.data.tasklist
          if (this.reportNum !== 0) {
            this.reportListData.sort(function (a, b) {
              return a < b ? 1 : -1
            })
          }
          this.reportListLoading = false
        }
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.reportListLoading = false
        }, 2000)
      })
    },
    // 查看报告详情
    viewReport (reportId) {
      sessionStorage.setItem('reportId', reportId)
      this.$router.push({
        name: 'toolReport',
        params: {
          id: reportId
        }
      })
    },
    // 下载报告
    clickdownLoadReport (reportId) {
      let url = 'mec/toolchain/v1/porting/' + this.projectId + '/tasks/' + reportId + '/download'
      downLoadReport({ url, reportId })
    },
    // 删除报告
    deleteReport (reportId) {
      this.$confirm(this.$t('devTools.deleteList'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        Delete('mec/toolchain/v1/porting/' + this.projectId + '/tasks/' + reportId, '', 'toolchain').then(res => {
          this.getScanTask()
        })
      })
    }
  }
}
</script>
<style lang='less'>
.toolchain{
  .toolchain-main{
    padding:80px 40px 40px;
    background: #fff;
  }
  .analysis{
    padding: 0 10%;
    .codeResult{
      clear: both;
      height: 30px;
      line-height: 30px;
      em{
        margin-left: 10px;
        cursor: pointer;
      }
      em:hover{
        color: #688ef3;
      }
    }
    textarea{
      width: 100%;
    }
    .el-select{
      width: 100%;
    }
    .analysisBtn{
      text-align: center;
    }
  }
  .report{
    padding: 0 2%;
    height: 100%;
    overflow-y: auto;
    h3{
      border-bottom: 1px dashed #dadadc;
      padding-bottom: 10px;
      margin-bottom: 15px;
      font-weight: normal;
    }
    .el-table{
      .el-table__header-wrapper{
        display: none;
      }
      td:last-child{
        text-align: right;
      em{
          font-size: 18px;
          margin-right: 10px;
          cursor: pointer;
        }
        em:hover{
          color: #409EFF;
        }
      }
      td:first-child{
        color: #327bc6;
        cursor: pointer;
      }
      td:first-child:hover{
        color: #409EFF;
      }
      .cell{
        padding-left: 0px;
      }
    }
  }
  .upload-demo .el-button--primary{
    margin-top: 0px;
  }
  .el-form-item__label{
    text-align: left;
  }
  .el-form-item__label:before{
    margin-left: -10px;
  }
  .p_gray{
    color: #9ea4b3;
    font-size: 12px;
  }

}
@media screen and (min-width: 1360px) {
  .analysis{
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 30px;
      }
  }

    }
</style>