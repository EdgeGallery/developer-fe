<!--
  -  Copyright 2022 Huawei Technologies Co., Ltd.
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
  <div class="hostManagement padding-inner">
    <div class="system-title">
      {{ $t('devSystem.systemHost') }}
      <el-button
        id="btn_addhost"
        class="common-add-btn rt"
        @click="handleShowForm(defaultForm)"
      >
        {{ $t('devSystem.addHost') }}
      </el-button>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="onClose"
      class="dialog_host default_dialog"
    >
      <div
        class="common-dlg-title"
      >
        {{ form.id ? $t('common.edit') : $t('devSystem.addHost') }}
      </div>
      <el-form
        v-show="!showLog && visible"
        :model="form"
        ref="form"
        :rules="rules"
        :label-width="language==='cn'?formLabelWidth:formLabelWidthEn"
        label-position="right"
        class="common-form"
      >
        <el-form-item
          :label="$t('devSystem.name')"
          prop="name"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.name"
          />
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.inPort')"
          prop="lcmPort"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.lcmPort"
          />
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.lcmIp')"
          prop="lcmIp"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.lcmIp"
          />
        </el-form-item>
        <el-form-item
          label="IcmProtocol"
          prop="lcmProtocol"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.lcmProtocol"
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
          label="mecPortocol"
          prop="mecHostProtocol"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.mecHostProtocol"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in mecHostProtocolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.mecHost')"
          prop="mecHostIp"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.mecHostIp"
          />
        </el-form-item>
        <el-form-item
          label="mecPort"
          prop="mecHostPort"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.mecHostPort"
          />
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.username')"
          prop="mecHostUserName"
          class="w50"
          v-if="!form.id"
        >
          <el-input
            size="small"
            v-model="form.mecHostUserName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.password')"
          prop="mecHostPassword"
          class="w50"
          v-if="!form.id"
        >
          <el-input
            type="password"
            size="small"
            v-model="form.mecHostPassword"
          />
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.status')"
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
          :label="$t('devSystem.architecture')"
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
          :label="$t('devSystem.system')"
          prop="vimType"
        >
          <el-radio-group
            v-model="form.vimType"
            class="common-radio"
            @change="changeOs"
          >
            <el-radio label="K8S">
              K8S
            </el-radio>
            <el-radio label="OpenStack">
              OpenStack
            </el-radio>
            <el-radio label="FusionSphere">
              FusionSphere
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.address')"
          prop="address"
        >
          <el-input
            type="textarea"
            size="small"
            v-model="form.address"
          />
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.resourceConfig')"
        >
          <el-input
            size="small"
            v-model="form.resource"
            class="suffix-input"
          >
            <span
              slot="suffix"
              @click="addMore('resource')"
              class="view_more_btn"
            >
              {{ $t('common.check') }}</span>
          </el-input>
        </el-form-item>
        <el-form-item
          :label="$t('devSystem.networkConfig')"
          v-if="showOther"
        >
          <el-input
            size="small"
            v-model="form.networkParameter"
            class="suffix-input"
          >
            <span
              slot="suffix"
              @click="addMore('network')"
              class="view_more_btn"
            >
              {{ $t('common.check') }}</span>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="configId"
          :label="$t('devSystem.config_id')"
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
              id="btn_host_upload_config"
              slot="trigger"
              size="medium"
              plain
              class="featuresBtn"
            >
              {{ $t('devSystem.upload') + $t('devSystem.config_id') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="this.$t('devSystem.promptMessage.typeConfig')"
              placement="right"
            >
              <span class="common-info tip-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        v-show="!showLog && visible"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="btn_add_host_cancel"
          @click="visible = false"
          class="common-btn"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="btn_add_host_confirm"
          size="medium"
          :loading="loading"
          @click="onSubmit"
          class="common-btn"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
      <el-dialog
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        append-to-body
        class="other_setting default_dialog"
      >
        <div
          class="common-dlg-title"
        >
          {{ $t('devSystem.configParamas') }}
          <em
            class="el-icon-circle-plus-outline rt editBtn"
            @click="addListData"
          />
        </div>
        <div
          class="innerVisible_div"
          v-if="configType==='resource'"
        >
          <p
            v-for="(item,index) in otherDataResource"
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
              class="el-icon-delete editBtn"
              @click="deleteListData(index)"
            />
          </p>
        </div>
        <div
          class="innerVisible_div"
          v-if="configType==='network'"
        >
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
            id="btn_add_host_params_cancel"
            @click="innerVisible=false"
            class="common-btn"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            id="btn_add_host_params_confirm"
            @click="confirmData"
            class="common-btn"
          >{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
    </el-dialog>
    <div class="list common-div-bg clear">
      <div class="title">
        <span>
          <el-input
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('devSystem.inputName')"
            class="search_input"
            @keyup.enter.native="searchListData"
            @clear="searchListData"
            @change="searchListData"
            suffix-icon="el-icon-search"
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
        row-key="id"
        :data="allListData"
        class="common-table"
      >
        <el-table-column
          prop="name"
          :label="$t('devSystem.name')"
          min-width="10%"
        />
        <el-table-column
          prop="vimType"
          :label="$t('devSystem.system')"
          min-width="10%"
        />
        <el-table-column
          prop="lcmIp"
          :label="$t('devSystem.lcmIp')"
          min-width="10%"
        />
        <el-table-column
          prop="mecHostIp"
          :label="$t('devSystem.mecHost')"
          min-width="13%"
        />
        <el-table-column
          prop="lcmPort"
          :label="$t('devSystem.inPort')"
          min-width="9%"
        />
        <el-table-column
          prop="lcmProtocol"
          label="IcmProtocol"
          min-width="14%"
        />
        <el-table-column
          prop="status"
          :label="$t('devSystem.status')"
          min-width="9%"
        />
        <el-table-column
          prop="architecture"
          :label="$t('devSystem.architecture')"
          min-width="9%"
        />
        <el-table-column
          :label="$t('common.operation')"
          min-width="21%"
        >
          <template slot-scope="scope">
            <el-button
              id="btn_hostlist_edit"
              :loading="loading"
              class="operation-btn-text"
              @click="handleShowForm(scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              id="btn_hostlist_delete"
              :loading="loading"
              class="operation-btn-text"
              @click="handleDelete(scope.row)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty_img">
            <p>{{ $t('common.noData') }}</p>
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
import pagination from '../../../components/Pagination.vue'
import { systemApi, applicationApi } from '../../../api/developerApi'
import { Architecture } from '../../../tools/commondata.js'
import { common } from '../../../tools/common.js'
import commonUtil from '../../../tools/devCommonUtil.js'

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
    const validateName = (rule, value, callback) => {
      let reg = /^[\s\S]{6,50}$/
      if (!value) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.name')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}6~50 ${this.$t('devSystem.char')}`))
      } else {
        callback()
      }
    }
    const validateMechost = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.mecHost')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('devSystem.promptMessage.hostErrorInfo')))
      } else {
        callback()
      }
    }
    const validateLcmIp = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.lcmIp')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('devSystem.promptMessage.ipErrorInfo')))
      } else {
        callback()
      }
    }
    const validatePort = (rule, value, callback) => {
      let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.inPort')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.correct')}${this.$t('devSystem.inPort')}`))
      } else {
        callback()
      }
    }
    const validateAddress = (rule, value, callback) => {
      let reg = /^(?!\s)(?!.*?\s$)[\u4E00-\u9FA5a-zA-Z0-9\s/]{1,128}$/
      if (!value) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.address')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}1~128 ${this.$t('devSystem.char')},${this.$t('devSystem.promptMessage.textWrap')}`))
      } else {
        callback()
      }
    }
    const validateUserName = (rule, value, callback) => {
      let reg = /^[\s\S]{1,20}$/
      if (!value) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.username')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}1~20 ${this.$t('devSystem.char')}`))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      let reg = /^[\s\S]{1,20}$/
      if (!value) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.password')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('devSystem.pleaseInput')}1~20 ${this.$t('devSystem.char')}`))
      } else {
        callback()
      }
    }
    return {
      showLog: false,
      configId_file_list: [],
      limitSize: 2,
      offsetPage: 0,
      listTotal: 0,
      protocolOptions: [
        { label: 'http', value: 'http' },
        { label: 'https', value: 'https' }
      ],
      mecHostProtocolOptions: [
        { label: 'http', value: 'http' },
        { label: 'https', value: 'https' }
      ],
      statusOptions: [
        { label: 'NORMAL', value: 'NORMAL' },
        { label: 'BUSY', value: 'BUSY' },
        { label: 'STOP', value: 'STOP' }
      ],
      architectureOptions: Architecture,
      formLabelWidth: '135px',
      formLabelWidthEn: '185px',
      form: {
        lcmPort: 31252,
        architecture: 'X86',
        lcmProtocol: 'https',
        status: 'NORMAL',
        vimType: 'K8S',
        resource: null,
        mecHostPort: 22,
        mecHostProtocol: 'http'
      },
      defaultForm: {
        lcmPort: 31252,
        architecture: 'X86',
        lcmProtocol: 'https',
        status: 'NORMAL',
        vimType: 'K8S',
        networkParameter: `APP_Plane01_Network=MEC_APP_MP1;APP_Plane02_Network=MEC_APP_Public;APP_Plane03_Network=MEC_APP_Private;APP_Plane04_Network=Internal_Network;VDU1_APP_Plane01_IP=192.168.221.0/24;VDU1_APP_Plane02_IP=192.168.222.0/24;VDU1_APP_Plane03_IP=192.168.220.0/24;VDU1_APP_Plane04_IP=192.168.223.0/24`,
        resource: `VCPU数量=20;内存资源=50G;存储资源=1000G;网络=不支持5G;GPU算力=NA;AI加速=1*Atlas300C(16G);终端=NA`,
        mecHostPort: 22,
        mecHostProtocol: 'http'
      },
      rules: {
        name: [
          { required: true, validator: validateName }
        ],
        vimType: [
          { required: true }
        ],
        mecHostIp: [
          { required: true, validator: validateMechost }
        ],
        lcmIp: [
          { required: true, validator: validateLcmIp }
        ],
        lcmPort: [
          { required: true, validator: validatePort }
        ],
        architecture: [
          { required: true }
        ],
        lcmProtocol: [
          { required: true }
        ],
        mecHostProtocol: [
          { required: true }
        ],
        address: [
          { required: true, validator: validateAddress }
        ],
        mecHostUserName: [
          { required: true, validator: validateUserName }
        ],
        mecHostPassword: [
          { required: true, validator: validatePassword }
        ],
        status: [
          { required: true }
        ],
        portRangeMin: [{ required: true,
          validator: (r, v, callback) => {
            validate(['portRangeMin', 'portRangeMax'], callback, `${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.portRange')}`, [{ rule: () => {
              return /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(this.form.portRangeMin) && /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(this.form.portRangeMax)
            },
            message: `${this.$t('devSystem.pleaseInput')}${this.$t('devSystem.correct')}${this.$t('devSystem.inPort')}` }])
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
      otherDataResource: [],
      otherData: [],
      screenHeight: document.body.clientHeight,
      currentIndex: -1,
      showOther: false,
      configType: 'resource'
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
      common.setDivHeightFun(this.screenHeight, 'list', 315)
    },
    addMore (type) {
      this.configType = type
      this.innerVisible = true
      let _str = ''
      this.otherData = []
      this.otherDataResource = []
      _str = type === 'resource' ? this.form.resource : this.form.networkParameter
      let arrTemp = _str.split(';')
      arrTemp.forEach(item => {
        let obj = {
          name: '',
          value: ''
        }
        obj.name = item.split('=')[0]
        obj.value = item.split('=')[1]
        type === 'resource' ? this.otherDataResource.push(obj) : this.otherData.push(obj)
      })
    },
    addListData () {
      let obj = {
        name: '',
        value: ''
      }
      this.configType === 'resource' ? this.otherDataResource.unshift(obj) : this.otherData.unshift(obj)
    },
    deleteListData (index) {
      this.configType === 'resource' ? this.otherDataResource.splice(index, 1) : this.otherData.splice(index, 1)
    },
    confirmData () {
      let nullMum = 0
      if (this.configType === 'resource') {
        this.otherDataResource.forEach(item => {
          if (item.name === '' || item.value === '') {
            nullMum++
          }
        })
      } else {
        this.otherData.forEach(item => {
          if (item.name === '' || item.value === '') {
            nullMum++
          }
        })
      }
      if (nullMum === 0) {
        let str = ''
        if (this.configType === 'resource') {
          this.otherDataResource.forEach(item => {
            str += item.name + '=' + item.value + ';'
          })
          this.form.resource = str.substr(0, str.length - 1)
        } else {
          this.otherData.forEach(item => {
            str += item.name + '=' + item.value + ';'
          })
          this.form.networkParameter = str.substr(0, str.length - 1)
        }
        this.innerVisible = false
      } else {
        this.$eg_messagebox(this.$t('devSystem.completeInfo'), 'warning')
      }
    },
    handleDelete (data) {
      this.$eg_messagebox(this.$t('devSystem.deleteConfirm'), 'warning', this.$t('common.cancel'), this.$t('common.confirm')).then(() => {
        this.loading = true
        systemApi.deleteHost(data.id).finally(() => {
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
            this.form.networkParameter = ''
          }
          systemApi.saveHostInfo({ ...this.form, ...params, userId: this.userName }).then(res => {
            if (res.data) {
              this.$eg_messagebox((this.form.id ? this.$t('common.edit') : this.$t('devSystem.addHost')) + this.$t('devSystem.success'), 'success')
              this.onClose()
            } else {
              throw new Error()
            }
          }).catch(error => {
            if (error.response.data.message === 'mecHost already exists!') {
              this.$eg_messagebox(this.$t('devSystem.imageMgmt.promptMessage.mecHostExist'), 'error')
            }
            let defaultMsg = this.$t('devSystem.addHostFail')
            commonUtil.showTipMsg(this.language, error, defaultMsg)
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
      systemApi.getHosts({ name: this.enterQuery, vimType: '', architecture: '', limit: this.limitSize, offset: this.offsetPage }).then(res => {
        this.allListData = res.data.results || []
        this.listTotal = res.data.total
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
        this.$eg_messagebox(this.$t('devSystem.promptMessage.typeError') + ' , ' + this.$t('devSystem.promptMessage.typeConfig'), 'warning')
      }
    },
    submitFile (key, fileList) {
      const fd = new FormData()
      fd.append('file', fileList[0])
      this.loading = true
      systemApi.submitConfigFileApi(fd).then(res => {
        if (res.data.fileId) {
          this[`${key}_file_list`] = fileList
          this.form[key] = res.data.fileId
          this.$eg_messagebox(this.$t('devSystem.promptMessage.uploadSuccess'), 'success')
        } else {
          this.handleRemove(key)
          throw new Error()
        }
      }).catch((error) => {
        if (error && error.response && error.response.data.code === 403) {
          this.$eg_messagebox(this.$t('devSystem.promptMessage.guestPrompt'), 'warning')
        } else {
          this.$eg_messagebox(this.$t('devSystem.promptMessage.uploadFailure'), 'error')
        }
        this.handleRemove(key)
      }).finally(() => {
        this.loading = false
      })
    },
    handleExceed () {
      this.$eg_messagebox(this.$t('devSystem.fileExceed'), 'warning')
    },
    handleShowForm (v) {
      this.form = JSON.parse(JSON.stringify(v))
      applicationApi.getFileInfo(this.form.configId).then(res => {
        if (res && res.data) {
          this.configId_file_list.length = 0
          let obj = { name: res.data.fileName }
          this.configId_file_list.push(obj)
        }
      })
      delete this.form.userName
      if (this.form.vimType === 'K8S') {
        this.showOther = false
      } else {
        this.showOther = true
      }
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
  },
  beforeRouteEnter (to, from, next) {
    sessionStorage.removeItem('currentPage')
    next()
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
    overflow: auto;
    padding-right: 40px !important;
  }
}
.innerVisible_div{
  margin-bottom: 20px;
  .container{
    padding-top: 20px;
    .el-input{
      float: left;
      width: calc((100% - 65px)/2);
      .el-input__inner{
        background: #4e3494;
        color: #fff;
      }
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
  padding-top: 60px;
  .dialog_host .el-dialog{
    min-width: 850px;
  }
  .suffix-input .el-input__inner{
    padding-right: 60px;
  }
  .view_more_btn{
    color: #fff;
    background: rgba(255,255,255,.1);
    padding: 2px 8px;
    border-radius: 5px;
    position: relative;
    top: 1px;
    cursor: pointer;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .el-form-item__label{
    padding: 0px 7px 0 0 !important;
  }
  .list {
    .title{
      margin-bottom: 20px;
    }
  }
  .el-upload-list__item{
    background-color:transparent;
    transition: none !important;
  }
  .tip-info{
    left: 10px;
    top: 7px;
  }
}

</style>
