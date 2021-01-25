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
      <div class="toochain_info">
        <p>{{ $t('devTools.toolChainInfo1') }}</p>
        <p>{{ $t('devTools.toolChainInfo2') }}</p>
        <ul>
          <li>{{ $t('devTools.toolChainInfo3') }}</li>
          <li>{{ $t('devTools.toolChainInfo4') }}</li>
          <li>{{ $t('devTools.toolChainInfo5') }}</li>
        </ul>
      </div>
      <el-row>
        <el-col
          :sm="16"
          :xs="24"
          class="analysis"
        >
          <el-form
            ref="form"
            :rules="rules"
            :model="form"
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
                :show-file-list="false"
                :auto-upload="false"
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
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  <em class="el-icon-warning" />{{ $t('devTools.toolChainText') }}
                </div>
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
          :sm="8"
          :xs="24"
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
                <el-link
                  :href="downloadReport(scope.row)"
                  :underline="false"
                >
                  <em
                    class="el-icon-download"
                  />
                </el-link>
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
import { Plugin } from '../../tools/api.js'
export default {
  name: 'Toolchain',
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
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
    this.setDivHeight()
    window.onresize = () => {
      return (() => {
        this.setDivHeight()
      })()
    }
  },
  methods: {
    setDivHeight () {
      const oDiv = document.getElementById('report')
      const deviceHeight = document.documentElement.clientHeight
      oDiv.style.height = Number(deviceHeight) - 330 + 'px'
    },
    // 查询已上传的源代码
    getSourceCode () {
      Plugin.getSourceCodeApi(this.userId, '', 'toolchain').then(res => {
        this.sourceCodeName = res.data.sourceCodeName
        this.sourceCodeExist = res.data.sourceCodeExist
      })
    },
    // 删除已上传的源代码
    deleteSourceCode () {
      Plugin.deleteSourceCodeApi(this.userId, '', 'toolchain').then(res => {
        this.codeFileList = []
        this.getSourceCode()
        sessionStorage.setItem('sourceCodePath', '')
      })
    },
    // 上传源代码
    handleChangeCode (file, fileList) {
      let fileTypeArr = ['tar.gz']
      this.fileType = fileList[0].name.substr(fileList[0].name.lastIndexOf('.', fileList[0].name.lastIndexOf('.') - 1) + 1)
      if (fileTypeArr.indexOf(this.fileType) === -1) {
        this.$message.warning(this.$t('promptMessage.checkFileType'))
        this.codeFileList = []
      } else if (file.size / 1024 / 1024 > 10) {
        this.$message.warning(this.$t('promptMessage.moreThan10M'))
        this.codeFileList = []
      } else if (file.raw.name.indexOf(' ') !== -1) {
        this.$message.warning(this.$t('promptMessage.fileNameType'))
        this.codeFileList = []
      } else if (this.sourceCodeName === '') {
        this.codeFileList = []
        this.analysisLoading = true
        let formdata = new FormData()
        formdata.append('file', file.raw)
        this.uploadCodeText = this.$t('promptMessage.uploadCodeText')
        Plugin.uploadSourceCodeApi(this.userId, formdata, 'toolchain').then(res => {
          if (res.status === 200) {
            this.sourceCodeName = file.raw.name
            this.sourceCodeExist = true
            this.analysisLoading = false
            sessionStorage.setItem('sourceCodePath', res.data.sourcePath)
          } else {
            this.$message.error(this.$t('workspace.uploadCodeFail'))
            this.analysisLoading = false
            this.sourceCodeName = ''
            this.sourceCodeExist = false
          }
        }).catch(err => {
          this.analysisLoading = false
          if (err.response.data.code === 403) {
            this.$message.error(this.$t('promptMessage.guestPrompt'))
          } else {
            this.$message.error(this.$t('workspace.uploadCodeFail'))
          }
        })
      } else {
        this.handleExceed()
        this.codeFileList = []
      }
    },
    handleExceed () {
      if (this.sourceCodeExist) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    // 点击分析按钮，创建分析任务
    analysisCode () {
      if (this.sourceCodeName === '') {
        this.$message.warning(this.$t('promptMessage.codeEmpty'))
      } else {
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
        Plugin.analysisCodeApi(this.userId, params, 'toolchain').then(res => {
          this.getScanTask()
          this.analysisLoading = false
        }).catch(err => {
          this.analysisLoading = false
          if (err.response.data.code === 403) {
            this.$message.error(this.$t('promptMessage.guestPrompt'))
          } else {
            this.$message.error(this.$t('promptMessage.analysisCodeFail'))
          }
        })
      }
    },
    // 查询扫描任务列表
    getScanTask () {
      Plugin.getScanTaskApi(this.userId, '', 'toolchain').then(res => {
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
    downloadReport (reportId) {
      return Plugin.downLoadReportApi(this.userId, reportId)
    },
    // 删除报告
    deleteReport (reportId) {
      this.$confirm(this.$t('devTools.deleteReport'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        Plugin.deleteReportApi(this.userId, reportId, '', 'toolchain').then(res => {
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
    .el-form-item__content{
      float: left;
      width: calc(100% - 140px);
    }
    .el-form-item:last-child .el-form-item__content{
      margin-left: 140px;
      text-align: left;
    }
    .toochain_info{
      font-size: 14px;
      width: 90%;
      padding: 0 0 30px 10%;
      line-height: 25px;
      text-align: justify;
      p{
        margin-bottom: 10px;
      }
      ul{
        padding-left: 30px;
        li{
          list-style: disc;
          line-height: 25px;
        }
      }
    }
  }
  .analysis{
    padding: 0 10%;
    .el-upload{
      float: left;
    }
    .el-upload__tip{
      float: left;
      margin: 4px 0 0 15px;
    }
    .el-icon-warning{
      color: #688ef3;
      margin-right: 5px;
      font-size: 14px;
    }
    .el-upload-list{
      float: left;
      width: 100%;
    }
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
    float: left;
    text-align: left;
    width: 140px;
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
@media screen and (max-width: 465px){
  .toolchain .toolchain-main .el-form-item__content{
    width: 100%;
  }
}
</style>
