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
  <div class="hostManagement padding_default">
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
            prop="userId"
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
          :label="$t('breadCrumb.system')"
          prop="os"
          class="w50"
        >
          <el-radio-group v-model="form.os">
            <el-radio label="K8S">
              K8S
            </el-radio>
            <el-radio label="OpenStack">
              OpenStack
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('system.lcmIp')"
          prop="lcmIp"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.lcmIp"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.mecHost')"
          prop="mecHost"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.mecHost"
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
          v-if="!form.hostId"
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
          v-if="!form.hostId"
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
        <el-form-item :label="$t('system.other')">
          <el-input
            size="small"
            v-model="form.parameter"
          >
            <em
              slot="suffix"
              class="el-icon-s-order"
              @click="addMore"
            />
          </el-input>
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
        <el-dialog
          :title="$t('system.other')"
          :visible.sync="innerVisible"
          :close-on-click-modal="false"
          append-to-body
          class="other_setting"
        >
          <div class="innerVisible_div">
            <p class="operation_btn">
              <em
                class="el-icon-plus"
                @click="addListData"
              />
            </p>
            <p
              v-for="(item,index) in otherData"
              :key="index"
              class="container clear"
            >
              <el-input
                type="text"
                size="small"
                v-model="item.name"
              />
              <span class="equal">=</span>
              <el-input
                type="text"
                size="small"
                v-model="item.value"
              />
              <em
                class="el-icon-delete"
                @click="deleteListData(index)"
              />
            </p>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="innerVisible = false">{{ $t('common.cancel') }}</el-button>
            <el-button
              type="primary"
              @click="confirmData"
            >{{ $t('common.confirm') }}</el-button>
          </span>
        </el-dialog>
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
    <div class="list clear">
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
            @click="searchListData"
          >
            {{ $t('test.testTask.inquire') }}
          </el-button>
        </span>
      </div>
      <el-table
        v-loading="loading"
        row-key="hostId"
        :data="allListData"
        header-cell-class-name="headerStyle"
      >
        <el-table-column
          prop="name"
          :label="$t('system.name')"
        />
        <el-table-column
          prop="os"
          :label="$t('breadCrumb.system')"
        />
        <el-table-column
          prop="lcmIp"
          :label="$t('system.lcmIp')"
        />
        <el-table-column
          prop="mecHost"
          :label="$t('system.mecHost')"
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
        <el-table-column
          :label="$t('workspace.operation')"
          width="170"
        >
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
        <template slot="empty">
          <div>
            <img
              src="../../assets/images/empty.png"
              alt=""
              style="padding: 10px;"
            >
            <p>{{ $t('api.noDataNotice') }}</p>
          </div>
        </template>
      </el-table>
      <div class="pagebar">
        <pagination
          :table-data="allListData"
          :list-total="listTotal"
          @getCurrentPageData="getCurrentPageData"
          ref="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '../../components/common/Pagination.vue'
import { Workspace, System } from '@/tools/api.js'
import { Architecture } from '@/tools/project_data.js'

export default {
  name: 'HostList',
  components: {
    pagination
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
      limitSize: 2,
      offsetPage: 0,
      listTotal: 0,
      logData: [],
      protocolOptions: [
        { label: 'http', value: 'http' },
        { label: 'https', value: 'https' }
      ],
      statusOptions: [
        { label: 'NORMAL', value: 'NORMAL' },
        { label: 'BUSY', value: 'BUSY' },
        { label: 'STOP', value: 'STOP' }
      ],
      architectureOptions: Architecture,
      formLabelWidth: '110px',
      form: {
        port: 31252,
        portRangeMin: '30000',
        portRangeMax: '32000',
        architecture: 'X86',
        protocol: 'https',
        status: 'NORMAL',
        os: 'K8S'
      },
      defaultForm: {
        port: 31252,
        portRangeMin: '30000',
        portRangeMax: '32000',
        architecture: 'X86',
        protocol: 'https',
        status: 'NORMAL',
        os: 'K8S',
        parameter: `DC_ID=FS_M:Manger_VPC;
az_dc=nova;
mep_certificate=YHXGFTWU!@$%@&%#(DH(122479+_);
app_mp1_ip=192.168.226.201;app_mp1_mask=255.255.255.0;app_mp1_gw=192.168.226.1;
app_n6_ip=192.168.225.202;app_n6_mask=255.255.255.0;app_n6_gw=192.168.225.1;
app_internet_ip=192.168.227.203;app_internet_mask=255.255.255.0;app_internet_gw=192.168.227.1;
mep_ip=119.8.47.5;mep_port=8443;
network_name_mep=mec_network_mep;network_mep_physnet=physnet2;network_mep_vlanid=2653;
network_name_n6=mec_network_n6;network_n6_physnet=physnet2;network_n6_vlanid=2652;
network_name_internet=mec_network_internet;network_internet_physnet=physnet2;network_internet_vlanid=2651;
ue_ip_segment=0.0.0.0/0;
mec_internet_ip=0.0.0.0`
      },
      rules: {
        // configId: [{ required: true, validator: (r, v, callback) => { validate(['configId'], callback, this.$t('system.pleaseUpload')) } }],
        name: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.name')}` },
          { min: 6, max: 50, message: `${this.$t('system.pleaseInput')}6~50 ${this.$t('system.char')}` }
        ],
        os: [
          { required: true }
        ],
        mecHost: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.mecHost')}` },
          { message: this.$t('promptMessage.hostErrorInfo'), pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ }
        ],
        lcmIp: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.lcmIp')}` },
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
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.address')}` },
          { min: 1, max: 100, message: `${this.$t('system.pleaseInput')}1~100 ${this.$t('system.char')}` }
        ],
        userName: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.username')}` },
          { min: 1, max: 20, message: `${this.$t('system.pleaseInput')}1~20 ${this.$t('system.char')}` }
        ],
        password: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.password')}` },
          { min: 1, max: 20, message: `${this.$t('system.pleaseInput')}1~20 ${this.$t('system.char')}` }
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
      enterQuery: '',
      loading: false,
      userName: sessionStorage.getItem('userName'),
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      innerVisible: false,
      otherData: []
    }
  },
  mounted () {
    this.getListData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    $route (to, from) {
      this.getListData()
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getListData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getListData()
    }
  },
  methods: {
    addMore () {
      this.innerVisible = true
      this.otherData = []
      let str = this.form.parameter
      if (str) {
        let arrTemp = str.split(';')
        arrTemp.forEach(item => {
          let obj = {
            name: '',
            value: ''
          }
          obj.name = item.split('=')[0]
          obj.value = item.split('=')[1]
          this.otherData.push(obj)
        })
      }
    },
    addListData () {
      let obj = {
        name: '',
        value: ''
      }
      this.otherData.unshift(obj)
    },
    deleteListData (index) {
      this.otherData.splice(index, 1)
    },
    confirmData () {
      let nullMum = 0
      this.otherData.forEach(item => {
        if (item.name === '' || item.value === '') {
          nullMum++
        }
      })
      if (nullMum === 0) {
        let str = ''
        this.otherData.forEach(item => {
          str += item.name + '=' + item.value + ';'
        })
        this.form.parameter = str.substr(0, str.length - 1)
        this.innerVisible = false
      } else {
        this.$message.warning(this.$t('system.completeInfo'))
      }
    },
    handleDelete ({ hostId }) {
      this.$confirm(this.$t('system.deleteConfirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        System.deleteHost(hostId).finally(() => {
          this.loading = false
          this.getListData()
        })
      })
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
          System.saveHostInfo({ ...this.form, ...params, userId: this.userName }).then(res => {
            if (res.data) {
              this.$message.success((this.form.hostId ? this.$t('api.modify') : this.$t('system.addHost')) + this.$t('system.success'))
              this.onClose()
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.$message.error(this.$t('promptMessage.saveFail'))
          }).finally(() => {
            this.loading = false
            this.getListData()
          })
        }
      })
    },
    searchListData () {
      sessionStorage.setItem('currentPage', 1)
      this.getListData()
    },
    // Fetch list data
    getListData () {
      this.loading = true
      System.getHosts({ name: this.enterQuery, offset: this.offsetPage, limit: this.limitSize }).then(res => {
        this.allListData = res.data.results || []
        this.listTotal = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    getLogData ({ hostId }) {
      this.loading = true
      System.getLogData(hostId).then(res => {
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
      delete this.form.userName
      this.configId_file_list = []
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    }
  }
}
</script>

<style lang="less">
.other_setting{
  .el-dialog{
    width: 600px;
  }
  .el-dialog__body{
    max-height: 625px;
    overflow: auto;
  }
}
.innerVisible_div{
  .operation_btn{
    text-align: right;
    .el-icon-plus{
      font-size: 16px;
      cursor: pointer;
    }
  }
  .container{
    padding-top: 10px;
    .el-input{
      float: left;
      width: calc((100% - 65px)/2);
    }
    .equal{
      float: left;
      width: 15px;
      height: 32px;
      line-height: 32px;
      margin: 0 10px;
    }
    .el-icon-delete{
      color: #ccc;
      width: 30px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      text-align: right;
    }
    .el-icon-delete:hover{
      cursor: pointer;
      color: #5b7ede;
    }
  }

}
.hostManagement {
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .el-form-item__label {
    padding: 0 20px 0 0
  }
  .list {
    min-height: 500px;
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
