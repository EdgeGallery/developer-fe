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
    <div class="title_top title_left defaultFontBlod">
      {{ $t('breadCrumb.systemHost') }}
      <span class="line_bot1" />
      <el-button
        class="createimage_btn linearGradient2 image_mgmt"
        @click="handleShowForm(defaultForm)"
      >
        <em class="new_icon" />
        {{ $t('system.addHost') }}
      </el-button>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="onClose"
      class="dialog_host default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ showLog ? $t('system.useDetail') : form.hostId ? $t('api.modify') : $t('system.addHost') }}
      </div>
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
        <span
          slot="footer"
          class="dialog-footer mt20"
          style="paddingRight:0 !important"
        >
          <el-button
            id="btn_close"
            @click="onClose"
            class="bgBtn defaultFontLight"
          >
            {{ $t('common.close') }}
          </el-button>
        </span>
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
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.name"
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
          :label="$t('system.portRange')"
          prop="portRangeMin"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.portRangeMin"
            class="port_input"
          />
          <span class="port_span">-</span>
          <el-input
            size="small"
            v-model="form.portRangeMax"
            class="port_input"
          />
        </el-form-item>
        <el-form-item
          :label="$t('breadCrumb.system')"
          prop="os"
        >
          <el-radio-group
            v-model="form.os"
            class="default_radio"
            @change="changeOs"
          >
            <el-radio label="K8S">
              K8S
            </el-radio>
            <el-radio label="OpenStack">
              OpenStack
            </el-radio>
          </el-radio-group>
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
          :label="$t('system.other')"
          v-if="showOther"
        >
          <el-input
            size="small"
            v-model="form.parameter"
          >
            <span
              slot="suffix"
              @click="addMore"
              class="view_more_btn"
            >
              {{ $t('common.check') }}</span>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="configId"
          :label="$t('system.config_id')"
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
              class="featuresBtn"
            >
              {{ $t('system.upload') + $t('system.config_id') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="this.$t('promptMessage.typeConfig')"
              placement="right"
            >
              <em class="default_info el-icon-warning" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-dialog
          :visible.sync="innerVisible"
          :close-on-click-modal="false"
          append-to-body
          class="other_setting default_dialog"
        >
          <div
            slot="title"
            class="el-dialog__title"
          >
            <em class="title_icon" />{{ $t('system.other') }}
            <em
              v-if="isEdit"
              class="el-icon-circle-plus-outline rt editBtn"
              @click="addListData"
            />
          </div>
          <div class="innerVisible_div">
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
                v-if="isEdit"
                class="el-icon-delete editBtn"
                @click="deleteListData(index)"
              />
            </p>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              @click="innerVisible=isEdit=false"
              class="bgBtn defaultFontLight"
            >{{ $t('common.cancel') }}</el-button>
            <el-button
              v-if="!isEdit"
              @click="isEdit=true"
              class="bgBtn defaultFontLight"
            >{{ $t('common.edit') }}</el-button>
            <el-button
              type="primary"
              @click="confirmData"
              class="bgBtn defaultFontLight"
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
          @click="visible = false"
          class="bgBtn defaultFontLight"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="onSubmit"
          class="bgBtn defaultFontLight"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <div class="list clear">
      <div class="title">
        <span>
          <el-input
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('system.name')"
            class="search_input"
            @keyup.enter.native="searchListData"
            @clear="searchListData"
            @change="searchListData"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="searchListData"
            />
          </el-input>
        </span>
      </div>
      <el-table
        v-loading="loading"
        row-key="hostId"
        :data="allListData"
        class="tableStyle"
      >
        <el-table-column
          prop="name"
          :label="$t('system.name')"
          min-width="11%"
        />
        <el-table-column
          prop="os"
          :label="$t('breadCrumb.system')"
          min-width="9%"
        />
        <el-table-column
          prop="lcmIp"
          :label="$t('system.lcmIp')"
          min-width="10%"
        />
        <el-table-column
          prop="mecHost"
          :label="$t('system.mecHost')"
          min-width="15%"
        />
        <el-table-column
          prop="port"
          :label="$t('system.inPort')"
          min-width="11%"
        />
        <el-table-column
          prop="protocol"
          :label="$t('workspace.protocol')"
          min-width="9%"
        />
        <el-table-column
          prop="status"
          :label="$t('workspace.status')"
          min-width="11%"
        />
        <el-table-column
          prop="architecture"
          :label="$t('workspace.architecture')"
          min-width="9%"
        />
        <el-table-column
          :label="$t('workspace.operation')"
          min-width="15%"
        >
          <template slot-scope="scope">
            <el-button
              :loading="loading"
              class="operation_btn"
              @click="getLogData(scope.row)"
            >
              {{ $t('devTools.detail') }}
            </el-button>
            <el-button
              @mouseenter.native="showMoreBtnFun(scope.$index)"
              @mouseleave.native="showMoreBtnFun(-1)"
              class="operation_btn"
            >
              {{ $t('common.more') }}
              <el-collapse-transition>
                <div
                  v-show="currentIndex===scope.$index"
                  class="btn_div el-icon-caret-top"
                  @mouseenter="showMoreBtnFun(scope.$index)"
                  @mouseleave="showMoreBtnFun(-1)"
                >
                  <ul class="dropdown_list">
                    <li @click="handleShowForm(scope.row)">
                      <em />{{ $t('api.modify') }}
                    </li>
                    <li
                      :loading="loading"
                      @click="handleDelete(scope.row)"
                    >
                      <em />{{ $t('devTools.delete') }}
                    </li>
                  </ul>
                </div>
              </el-collapse-transition>
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
import { common } from '../../tools/common.js'

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
      otherData: [],
      screenHeight: document.body.clientHeight,
      currentIndex: -1,
      isEdit: false,
      showOther: false
    }
  },
  mounted () {
    this.setDivHeight()
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
    changeOs (val) {
      if (val === 'K8S') {
        this.showOther = false
      } else {
        this.showOther = true
      }
    },
    showMoreBtnFun (index) {
      this.currentIndex = index
    },
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'hostManagement', 261)
    },
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
        this.isEdit = false
      } else {
        this.$eg_messagebox({
          type: 'warning',
          title: '',
          desc: this.$t('system.completeInfo'),
          cancelText: this.$t('common.cancelText')
        })
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
          if (!this.showOther) {
            this.form.parameter = ''
          }
          System.saveHostInfo({ ...this.form, ...params, userId: this.userName }).then(res => {
            if (res.data) {
              this.$eg_messagebox({
                type: 'success',
                title: '',
                desc: (this.form.hostId ? this.$t('api.modify') : this.$t('system.addHost')) + this.$t('system.success'),
                cancelText: this.$t('common.cancelText')
              })
              this.onClose()
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.$eg_messagebox({
              type: 'error',
              title: '',
              desc: this.$t('promptMessage.saveFail'),
              cancelText: this.$t('common.cancelText')
            })
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
      if (file.name.indexOf('.') === -1) {
        this.submitFile(key, [file.raw])
      } else {
        this.configId_file_list = []
        this.$eg_messagebox({
          type: 'warning',
          title: '',
          desc: this.$t('promptMessage.typeError') + ' , ' + this.$t('promptMessage.typeConfig'),
          cancelText: this.$t('common.cancelText')
        })
      }
    },
    submitFile (key, fileList) {
      const fd = new FormData()
      fd.append('file', fileList[0])
      this.loading = true
      Workspace.submitApiFileApi(this.userId, fd).then(res => {
        if (res.data.fileId) {
          this[`${key}_file_list`] = fileList
          this.form[key] = res.data.fileId
          this.$eg_messagebox({
            type: 'success',
            title: '',
            desc: this.$t('promptMessage.uploadSuccess'),
            cancelText: this.$t('common.cancelText')
          })
        } else {
          this.handleRemove(key)
          throw new Error()
        }
      }).catch((error) => {
        if (error && error.response && error.response.data.code === 403) {
          this.$eg_messagebox({
            type: 'warning',
            title: '',
            desc: this.$t('promptMessage.guestPrompt'),
            cancelText: this.$t('common.cancelText')
          })
        } else {
          this.$eg_messagebox({
            type: 'error',
            title: '',
            desc: this.$t('promptMessage.uploadFailure'),
            cancelText: this.$t('common.cancelText')
          })
        }
        this.handleRemove(key)
      }).finally(() => {
        this.loading = false
      })
    },
    handleExceed () {
      this.$eg_messagebox({
        type: 'warning',
        title: '',
        desc: this.$t('system.fileExceed'),
        cancelText: this.$t('common.cancelText')
      })
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
    .editBtn:before{
      font-size: 20px;
      color: #a9a2c3;
      cursor: pointer;
    }
  }
  .el-dialog__body{
    max-height: 525px;
    overflow: auto;
    padding-right: 30px !important;
  }
  .dialog-footer{
    padding-right: 50px !important;
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
  .dialog_host .el-dialog{
    min-width: 850px;
  }
  .view_more_btn{
    color: #7a6e8a;
    background: #efefef;
    padding: 2px 8px;
    border-radius: 5px;
    position: relative;
    top: 1px;
    cursor: pointer;
  }
  .createimage_btn{
    position: absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    padding: 0 35px;
    .new_icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url('../../assets/images/work_new_project.png');
      margin-right: 3px;
      position: relative;
      top: 2px;
    }
  }
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .port_span{
    display: inline-block;
    width: 30px;
    text-align: center;
  }
  .port_input{
    width: calc(50% - 15px);
  }
  .el-form-item__label {
    padding: 0 20px 0 0
  }
  .list {
    border-radius: 16px;
    background: #fff;
    padding: 30px 60px;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
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
}

</style>
