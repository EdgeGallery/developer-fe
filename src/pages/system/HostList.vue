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
  <div class="hostManagement">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.system') }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.systemHost') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dialog
      :title="showLog ? $t('system.useDetail') : form.hostId ? $t('api.modify') : $t('system.addHost')"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="onClose"
    >
      <div v-show="showLog && visible">
        <el-table
          row-key="logId"
          :data="logData"
          :style="{maxHeight: '300px', overflow: 'auto'}"
        >
          <el-table-column
            prop="userName"
            :label="$t('system.log.userName')"
          />
          <el-table-column
            prop="projectName"
            :label="$t('system.log.projectName')"
          />
          <el-table-column
            prop="appInstancesId"
            :label="$t('system.log.appInstancesId')"
          />
          <el-table-column
            prop="deployTime"
            :label="$t('system.log.deployTime')"
          />
          <el-table-column
            prop="status"
            :label="$t('system.log.status')"
          />
          <el-table-column
            prop="operation"
            :label="$t('system.log.operation')"
          />
        </el-table>
      </div>
      <el-form
        v-show="!showLog && visible"
        :model="form"
        ref="form"
        :rules="rules"
        :label-width="formLabelWidth"
        label-position="right"
      >
        <el-form-item
          :label="$t('workspace.name')"
          prop="name"
        >
          <el-input
            size="small"
            v-model="form.name"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.appRelease.ipAddress')"
          prop="ip"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.ip"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.inPort')"
          prop="port"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.port"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.username')"
          prop="userName"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.userName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.password')"
          prop="password"
          class="w50"
        >
          <el-input
            type="password"
            size="small"
            v-model="form.password"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.protocol')"
          prop="protocol"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.protocol"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in protocolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.architecture')"
          prop="architecture"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.architecture"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in architectureOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.status')"
          prop="status"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.status"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('system.portRange')"
          prop="portRangeMin"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.portRangeMin"
            :style="{width: '85px'}"
          />
          <el-input
            size="small"
            v-model="form.portRangeMax"
            :style="{width: '85px',marginLeft:'16px'}"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.address')"
          prop="address"
        >
          <el-input
            type="textarea"
            size="small"
            v-model="form.address"
          />
        </el-form-item>
        <el-form-item
          prop="configId"
        >
          <el-upload
            action=""
            :file-list="configId_file_list"
            :limit="1"
            :auto-upload="false"
            :on-change="(file) => { handleUpload('configId', file) }"
            :on-exceed="handleExceed"
            :on-remove="(file) => { handleRemove('configId', file) }"
          >
            <el-button
              slot="trigger"
              size="medium"
              plain
              type="primary"
            >
              {{ $t('system.upload') + $t('system.config_id') }}
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        v-show="!showLog && visible"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="onSubmit"
          class="confirm"
        >
          {{ $t('workspace.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <div class="list">
      <div class="title">
        <el-button
          type="primary"
          size="medium"
          @click="handleShowForm(defaultForm)"
        >
          {{ $t('system.addHost') }}
        </el-button>
        <span>
          <el-input
            :style="{width: '200px'}"
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('system.name')"
          />
          <el-button
            :loading="loading"
            :style="{marginLeft: '10px'}"
            size="medium"
            @click="handleChangePage('currentPage', 1)"
          >
            {{ $t('test.testTask.inquire') }}
          </el-button>
        </span>
      </div>
      <el-table
        v-loading="loading"
        row-key="hostId"
        :data="allListData"
      >
        <el-table-column
          prop="name"
          :label="$t('system.name')"
        />
        <el-table-column
          prop="ip"
          :label="$t('workspace.appRelease.ipAddress')"
        />
        <el-table-column
          prop="port"
          :label="$t('system.inPort')"
        />
        <el-table-column
          prop="protocol"
          :label="$t('workspace.protocol')"
        />
        <el-table-column
          prop="status"
          :label="$t('workspace.status')"
        />
        <el-table-column
          prop="architecture"
          :label="$t('workspace.architecture')"
        />
        <el-table-column :label="$t('workspace.operation')">
          <template slot-scope="scope">
            <el-button
              size="medium"
              type="text"
              @click="handleShowForm(scope.row)"
            >
              {{ $t('api.modify') }}
            </el-button>
            <el-button
              :loading="loading"
              size="medium"
              type="text"
              @click="getLogData(scope.row)"
            >
              {{ $t('system.useDetail') }}
            </el-button>
            <el-button
              :loading="loading"
              size="medium"
              type="text"
              @click="handleDelete(scope.row)"
            >
              {{ $t('devTools.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagebar">
        <el-pagination
          background
          @size-change="v => handleChangePage('pageSize', v)"
          @current-change="v => handleChangePage('currentPage', v)"
          :current-page="currentPage"
          :page-sizes="[10, 1]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Workspace, System } from '@/tools/api.js'
import { Architecture } from '@/tools/project_data.js'

export default {
  name: 'HostList',
  components: {
  },
  data () {
    const validate = (v, callback, errorMsg, rules) => {
      if (rules) {
        rules.forEach(item => {
          if (!item.rule(v)) {
            return callback(new Error(item.message))
          }
        })
      } else {
        if (v.some(s => [undefined, null, ''].includes(this.form[s]))) {
          return callback(new Error(errorMsg))
        }
      }
      return callback()
    }
    return {
      showLog: false,
      configId_file_list: [],
      pageSize: 10,
      currentPage: 1,
      logData: [],
      protocolOptions: [
        { label: 'HTTP', value: 'http' },
        { label: 'HTTPS', value: 'https' }
      ],
      statusOptions: [
        { label: 'NORMAL', value: 'NORMAL' },
        { label: 'BUSY', value: 'BUSY' },
        { label: 'STOP', value: 'STOP' }
      ],
      architectureOptions: Architecture,
      formLabelWidth: '110px',
      form: {
        portRangeMin: '30000',
        portRangeMax: '32767',
        architecture: 'X86',
        protocol: 'http',
        status: 'NORMAL'
      },
      defaultForm: {
        portRangeMin: '30000',
        portRangeMax: '32767',
        architecture: 'X86',
        protocol: 'http',
        status: 'NORMAL'
      },
      rules: {
        // configId: [{ required: true, validator: (r, v, callback) => { validate(['configId'], callback, this.$t('system.pleaseUpload')) } }],
        name: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.name')}` },
          { min: 6, max: 50, message: `${this.$t('system.pleaseInput')}6~50 ${this.$t('system.char')}` }
        ],
        ip: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.appRelease.ipAddress')}` },
          { message: this.$t('promptMessage.ipErrorInfo'), pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ }
        ],
        port: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.inPort')}` },
          { message: `${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}`, pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/ }
        ],
        architecture: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.architecture')}` }
        ],
        protocol: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.protocol')}` }
        ],
        address: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.address')}` }
        ],
        userName: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.username')}` }
        ],
        password: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.password')}` }
        ],
        status: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.status')}` }
        ],
        portRangeMin: [{ required: true,
          validator: (r, v, callback) => {
            validate(['portRangeMin', 'portRangeMax'], callback, `${this.$t('system.pleaseInput')}${this.$t('system.portRange')}`, [{ rule: () => {
              return /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(this.form.portRangeMin) && /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(this.form.portRangeMax)
            },
            message: `${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}` }])
          } }]
      },
      visible: false,
      allListData: [],
      listTotal: 0,
      enterQuery: '',
      loading: false,
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language')
    }
  },
  mounted () {
    this.getListData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    handleDelete ({ hostId }) {
      this.$confirm(this.$t('system.deleteConfirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        System.deleteHost({ hostId, userId: this.userId }).finally(() => {
          this.loading = false
          this.handleChangePage('currentPage', 1)
        })
      }, () => {})
    },
    onClose () {
      if (this.showLog) {
        this.showLog = false
      }
      this.visible = false
    },
    onSubmit () {
      this.$refs.form.validate((valid, params) => {
        if (valid) {
          this.loading = true
          System.saveNodeInfo({ userId: this.userId, ...this.form, ...params }).then(res => {
            if (res && res.data && res.data.hostId) {
              this.$message.success(`${this.$t(`${this.form.hostId ? 'api.modify' : 'system.addHost'}`)}${this.$t(`system.success`)}`)
              this.onClose()
            } else {
              throw new Error()
            }
          }).catch(error => {
            const msg = (error && error.response && error.response.data) ? error.response.data.message : `${this.$t(`${this.form.hostId ? 'api.modify' : 'system.addHost'}`)}${this.$t(`system.error`)}`
            this.$message.error(msg)
          }).finally(() => {
            this.loading = false
            this.getListData()
          })
        }
      })
    },
    handleChangePage (key, v) {
      if (key === 'PageSize') {
        this.currentPage = 1
      }
      this[key] = v
      this.getListData()
    },
    // 获取列表
    getListData () {
      this.loading = true
      System.getNodes({ name: this.enterQuery, userId: this.userId, offset: this.currentPage - 1, limit: this.pageSize }).then(res => {
        this.allListData = res.data.results || []
        this.listTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    getLogData ({ hostId }) {
      this.loading = true
      System.getLogData({ userId: this.userId, hostId }).then(res => {
        this.logData = res.data || []
        this.showLog = true
        this.visible = true
      }).finally(() => {
        this.loading = false
      })
    },
    handleRemove (key) {
      this[`${key}_file_list`] = []
      this.form[key] = ''
    },
    handleUpload (key, file) {
      this.submitFile(key, [file.raw])
    },
    submitFile (key, fileList) {
      const fd = new FormData()
      fd.append('file', fileList[0])
      this.loading = true
      Workspace.submitApiFileApi(this.userId, fd).then(res => {
        if (res.data.fileId) {
          this[`${key}_file_list`] = fileList
          this.form[key] = res.data.fileId
          this.$message({
            type: 'success',
            message: this.$t('promptMessage.uploadSuccess')
          })
        } else {
          this.handleRemove(key)
          throw new Error()
        }
      }).catch((error) => {
        if (error && error.response && error.response.data.code === 403) {
          this.$message.error(this.$t('promptMessage.guestPrompt'))
        } else {
          this.$message.error(this.$t('promptMessage.uploadFailure'))
        }
        this.handleRemove(key)
      }).finally(() => {
        this.loading = false
      })
    },
    handleExceed () {
      this.$message.warning(this.$t('system.fileExceed'))
    },
    handleShowForm (v) {
      this.form = JSON.parse(JSON.stringify(v))
      this.configId_file_list = []
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  }
}
</script>

<style lang="less">
.hostManagement {
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .el-form-item__label {
    padding: 0 20px 0 0
  }
  .list {
    height: 800px;
    background-color: white;
    padding: 20px;
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .el-table {
      font-size: 14px;
      .icon_pic {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      thead {
        color: #282b33;
        font-weight: 100;
        font-size: 14px;
        th,
        tr {
          background-color: #f5f5f5;
        }
      }
      tbody {
        td {
          padding: 8px;
          .el-button--text {
            color: #5b7ede;
          }
          .cell{
            padding-left: 0;
          }
        }
      }
    }
  }
  .dialog-footer {
    text-align: center;
  }
}

</style>