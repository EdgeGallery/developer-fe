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
  <div class="capManagement padding_default">
    <div class="title_top title_left defaultFontBlod">
      {{ $t('breadCrumb.systemMep') }}
      <span class="line_bot1" />
      <el-button
        class="createservice_btn linearGradient2 image_mgmt"
        @click="handleShowForm"
      >
        <em class="new_icon" />
        {{ $t('system.addMep') }}
      </el-button>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      class="dialog_service default_dialog"
      :class="{'dialog_service_en':language==='en'}"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        :label-width="language==='cn'?formLabelWidth:formLabelWidthEn"
        label-position="right"
        class="clear"
        size="small"
      >
        <h3 class="service_title">
          <em class="title_icon" />{{ $t('system.basicInfo') }}
        </h3>
        <el-form-item
          :label="$t('system.oneLevelCapability')"
          prop="group.name"
          class="w50 lt"
        >
          <el-select
            v-model="form.group.name"
            :placeholder="$t('common.select')"
            @change="changeOneLevelName"
            :disabled="!isAddService"
          >
            <el-option
              v-for="item in optionsCapability"
              :key="item.nameEn"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="group.nameEn"
          class="w50 lt right_item"
          label-width="0"
        >
          <el-select
            v-model="form.group.nameEn"
            :placeholder="$t('common.select')"
            @change="changeOneLevelNameEn"
            :disabled="!isAddService"
          >
            <el-option
              v-for="item in optionsCapability"
              :key="item.nameEn"
              :label="item.nameEn"
              :value="item.nameEn"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('system.twoLevelCapability')"
          prop="name"
          class="w50 lt"
        >
          <el-input
            :placeholder="$t('system.zh_cn')"
            v-model="form.name"
          />
        </el-form-item>
        <el-form-item
          prop="nameEn"
          class="w50 lt right_item"
          label-width="0"
        >
          <el-input
            :placeholder="$t('system.en')"
            v-model="form.nameEn"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.description')"
          prop="description"
          class="w50 lt"
        >
          <el-input
            :placeholder="$t('system.zh_cn')"
            type="textarea"
            v-model="form.description"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          prop="descriptionEn"
          class="w50 lt right_item"
          label-width="0"
        >
          <el-input
            :placeholder="$t('system.en')"
            type="textarea"
            v-model="form.descriptionEn"
            maxlength="400"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.apiFileId')"
          prop="apiFileId"
          ref="apiFileItem"
        >
          <el-upload
            action=""
            :file-list="apiFileId_file_list"
            :limit="1"
            :auto-upload="false"
            :on-change="(file,fileList) => { handleUpload('apiFileId', file,fileList,['yaml', 'json'],'apiFile') }"
            :on-exceed="handleExceed"
            :on-remove="(file) => { handleRemove('apiFileId', file) }"
            accept=".yaml,.json"
          >
            <el-button
              slot="trigger"
              size="medium"
              class="featuresBtn"
            >
              {{ $t('system.upload') + $t('system.apiFileId') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="this.$t('devTools.apiText')"
              placement="right"
            >
              <span class="default_info_promt">i</span>
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <div class="clear lt">
          <el-form-item
            :label="$t('system.guideFileId')"
            prop="guideFileId"
            ref="guideFileItem"
            class="w50 lt"
          >
            <el-upload
              action=""
              :file-list="guideFileId_file_list"
              :limit="1"
              :auto-upload="false"
              :on-change="(file,fileList) => { handleUpload('guideFileId', file,fileList,['md'],'documentFile') }"
              :on-exceed="handleExceed"
              :on-remove="(file) => { handleRemove('guideFileId', file) }"
              accept=".md"
            >
              <el-button
                slot="trigger"
                size="medium"
                class="featuresBtn"
              >
                {{ $t('system.guideFileId_zh') }}
              </el-button>
              <el-tooltip
                effect="dark"
                :content="this.$t('workspace.apiFunctionMd')"
                placement="right"
              >
                <span class="default_info_promt">i</span>
              </el-tooltip>
            </el-upload>
          </el-form-item>
          <el-form-item
            prop="guideFileIdEn"
            ref="guideFileEnItem"
            class="w50 lt"
          >
            <el-upload
              action=""
              :file-list="guideFileIdEn_file_list"
              :limit="1"
              :auto-upload="false"
              :on-change="(file,fileList) => { handleUpload('guideFileIdEn', file,fileList,['md'],'documentFileEn') }"
              :on-exceed="handleExceed"
              :on-remove="(file) => { handleRemove('guideFileIdEn', file) }"
              accept=".md"
            >
              <el-button
                slot="trigger"
                size="medium"
                class="featuresBtn"
              >
                {{ $t('system.guideFileId_en') }}
              </el-button>
              <el-tooltip
                effect="dark"
                :content="this.$t('workspace.apiFunctionMd')"
                placement="right"
              >
                <span class="default_info_promt">i</span>
              </el-tooltip>
            </el-upload>
          </el-form-item>
          <el-form-item
            :label="$t('workspace.icon')"
            class="icon"
            ref="iconFileItem"
            prop="appIcon"
          >
            <div class="default-icon">
              <div
                class="box"
                v-for="(item, index) in defaultIcon"
                @click="chooseDefaultIcon(item, index)"
                :key="item"
              >
                <img
                  :src="item"
                  alt=""
                >
                <em
                  class="el-icon-success"
                  :class="{ active: form.defaultActive === index }"
                />
                <span>{{ $t('workspace.defaultIcon') }}</span>
              </div>
            </div>
            <el-upload
              id="projectLogo"
              class="upload-demo clear"
              ref="upload"
              action=""
              list-type="picture-card"
              :limit="1"
              :file-list="logoFileList"
              :on-change="handleChangeLogo"
              :on-exceed="handleExceed"
              :auto-upload="false"
              :on-remove="removeUploadLogo"
              accept=".jpg,.png"
              name="file"
            >
              <em
                class="upIcon el-icon-success"
                :class="{ active: uploadIcon }"
                v-if="uploadIcon"
              />
              <em class="el-icon-plus" />
            </el-upload>
            <span class="uploadIconSpan">{{ $t('workspace.customIcon') }}</span>
            <el-tooltip
              class="item"
              effect="dark"
              :content="this.$t('workspace.limitition')"
              placement="right"
            >
              <span
                class="default_info_promt"
                :style="{marginTop:'15px'}"
              >i</span>
            </el-tooltip>
            <div
              class="el-form-error"
              v-if="showErr"
            >
              {{ $t('workspace.iconRequired') }}
            </div>
          </el-form-item>
        </div>
        <h3 class="service_title">
          <em class="title_icon" />{{ $t('system.registerInfo') }}
        </h3>
        <el-form-item
          :label="$t('system.serviceName')"
          prop="host"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.host"
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
          :label="$t('system.version')"
          prop="version"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.version"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.protocol')"
          prop="protocol"
          class="w50"
        >
          <el-select
            v-model="form.protocol"
            size="small"
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
          :label="$t('system.provider')"
          prop="provider"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.provider"
          />
        </el-form-item>
        <el-form-item
          :label="$t('api.onlineExperience')+' url'"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.experienceUrl"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="onClose"
          class="bgBtn"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="onSubmit"
          class="bgBtn"
        >
          {{ $t('workspace.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <div class="list clear">
      <div class="title">
        <span>
          <el-input
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('system.serviceName')"
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
        row-key="id"
        :data="allListData"
        class="tableStyle"
      >
        <el-table-column
          prop="name"
          :label="$t('system.serviceName')"
          min-width="14%"
        >
          <template slot-scope="scope">
            {{ language === 'cn' ? scope.row.name : scope.row.nameEn }}
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          :label="$t('system.version')"
          min-width="11"
        >
          <template slot-scope="scope">
            {{ scope.row.version }}
          </template>
        </el-table-column>
        <el-table-column
          prop="group.name"
          :label="$t('system.capType')"
          min-width="14%"
        >
          <template slot-scope="scope">
            {{ language === 'cn' ? scope.row.group.name : scope.row.group.nameEn }}
          </template>
        </el-table-column>
        <el-table-column
          prop="provider"
          :label="$t('system.provider')"
          min-width="14%"
        >
          <template slot-scope="scope">
            {{ scope.row.provider }}
          </template>
        </el-table-column>
        <el-table-column
          prop="group.type"
          :label="$t('system.type')"
          min-width="12%"
        >
          <template slot-scope="scope">
            {{ scope.row.group.type }}
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          :label="$t('workspace.description')"
          min-width="22%"
        >
          <template slot-scope="scope">
            {{ language === 'cn' ? scope.row.description : scope.row.descriptionEn }}
          </template>
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              width="100%"
              trigger="hover"
              v-if="language === 'cn' ? scope.row.description : scope.row.descriptionEn >24"
            >
              <div>{{ language === 'cn' ? scope.row.description : scope.row.descriptionEn }}</div>
              <div slot="reference">
                {{ language === 'cn' ? scope.row.description : scope.row.descriptionEn }}
              </div>
            </el-popover>
            <div v-else>
              {{ language === 'cn' ? scope.row.description : scope.row.descriptionEn }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('workspace.operation')"
          min-width="15%"
        >
          <template slot-scope="scope">
            <el-button
              :loading="loading"
              class="operations_btn"
              @click="handleEdit(scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              :loading="loading"
              class="operations_btn"
              @click="handleDelete(scope.row)"
            >
              {{ $t('devTools.delete') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty_img">
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
import { Workspace, Capability } from '@/tools/api.js'
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
    const validateName = (rule, value, callback) => {
      let reg = /^(?!\s)[\S.\s\n\r]{1,20}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.systemCapaNameCn')))
      } else {
        callback()
      }
    }
    const validateNameEn = (rule, value, callback) => {
      let reg = /^(?!\s)[^\u4E00-\u9FA5]{1,40}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.systemCapaNameEn')))
      } else {
        callback()
      }
    }
    const validatePort = (rule, value, callback) => {
      let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.inPort')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}`))
      } else {
        callback()
      }
    }
    const validateDescription = (rule, value, callback) => {
      let reg = /^(?!\s)[\S.\s\n\r]{1,200}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('workspace.description')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.systemCapaDescCn')))
      } else {
        callback()
      }
    }
    const validateDescriptionEn = (rule, value, callback) => {
      let reg = /^(?!\s)[^\u4E00-\u9FA5]{1,400}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('workspace.description')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.systemCapaDescEn')))
      } else {
        callback()
      }
    }
    const validateAppIcon = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('workspace.iconRequired')))
      } else {
        callback()
      }
    }
    const validateHost = (rule, value, callback) => {
      let reg = /^[\S\s]{1,40}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.systemServiceName')))
      } else {
        callback()
      }
    }
    const validateVersion = (rule, value, callback) => {
      let reg = /^[\s\S]{1,20}$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.version')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('system.pleaseInput')}1~20 ${this.$t('system.char')}`))
      } else {
        callback()
      }
    }
    const validateProvider = (rule, value, callback) => {
      let reg = /^[\S\s]{1,20}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.provider')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.systemProviderName')))
      } else {
        callback()
      }
    }
    return {
      apiFileId_file_list: [],
      guideFileId_file_list: [],
      guideFileIdEn_file_list: [],
      limitSize: 2,
      offsetPage: 0,
      listTotal: 0,
      protocolOptions: [
        { label: 'http', value: 'http' },
        { label: 'https', value: 'https' }
      ],
      formLabelWidth: '125px',
      formLabelWidthEn: '175px',
      form: {
        name: '',
        nameEn: '',
        description: '',
        descriptionEn: '',
        host: '',
        port: '',
        version: '',
        protocol: 'https',
        provider: '',
        group: {
          name: '',
          nameEn: '',
          author: sessionStorage.getItem('userName')
        },
        iconFileId: '',
        author: sessionStorage.getItem('userName'),
        userId: sessionStorage.getItem('userId'),
        apiFileId: '',
        guideFileId: '',
        guideFileIdEn: '',
        uploadTime: 0,
        appIcon: [],
        base64Session: false,
        defaultActive: '',
        experienceUrl: ''
      },
      defaultForm: {
        name: '',
        nameEn: '',
        description: '',
        descriptionEn: '',
        host: '',
        port: '',
        version: '',
        protocol: 'https',
        provider: '',
        group: {
          name: '',
          nameEn: '',
          author: sessionStorage.getItem('userName')
        },
        iconFileId: '',
        author: sessionStorage.getItem('userName'),
        userId: sessionStorage.getItem('userId'),
        apiFileId: '',
        guideFileId: '',
        guideFileIdEn: '',
        uploadTime: 0,
        appIcon: [],
        base64Session: false,
        defaultActive: '',
        experienceUrl: ''
      },
      rules: {
        apiFileId: [
          { required: true, validator: (r, v, callback) => { validate(['apiFileId'], callback, this.$t('promptMessage.uploadApiFile')) }, trigger: 'change' }
        ],
        guideFileId: [
          { required: true, validator: (r, v, callback) => { validate(['guideFileId'], callback, this.$t('promptMessage.systemDocument')) }, trigger: 'change' }
        ],
        guideFileIdEn: [
          { required: true, validator: (r, v, callback) => { validate(['guideFileIdEn'], callback, this.$t('promptMessage.systemDocumentEn')) }, trigger: 'change' }
        ],
        name: [
          { required: true, validator: validateName }
        ],
        nameEn: [
          { required: true, validator: validateNameEn }
        ],
        'group.name': [
          { required: true }
        ],
        'group.nameEn': [
          { required: true }
        ],
        port: [
          { required: true, validator: validatePort }
        ],
        description: [
          { required: true, validator: validateDescription }
        ],
        descriptionEn: [
          { required: true, validator: validateDescriptionEn }
        ],
        protocol: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.protocol')}` }
        ],
        host: [
          { required: true, validator: validateHost }
        ],
        version: [
          { required: true, validator: validateVersion }
        ],
        provider: [
          { required: true, validator: validateProvider }
        ],
        appIcon: [
          { required: true, validator: validateAppIcon, trigger: 'change' }
        ]
      },
      visible: false,
      allListData: [],
      enterQuery: '',
      loading: false,
      userName: sessionStorage.getItem('userName'),
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      screenHeight: document.body.clientHeight,
      optionsCapability: [],
      oneLevelNameArr: [],
      oneLevelNameEnArr: [],
      logoFileList: [],
      defaultIcon: [
        require('../../assets/images/service_default_pic.jpg')
      ],
      uploadIcon: false,
      showErr: false,
      defaultIconFile: [],
      isAddService: true
    }
  },
  mounted () {
    this.setDivHeight()
    this.getListData()
    this.getOneLevelCapability()
    this.chooseDefaultIcon(this.defaultIcon[0], 0)
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.$refs['form'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['form'].validateField(item.labelFor)
        }
      })
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
    getOneLevelCapability () {
      Capability.getAllCapabilityGroup().then(result => {
        if (result.data.length > 0) {
          this.optionsCapability = result.data
          this.defaultForm.group.name = this.optionsCapability[0].name
          this.defaultForm.group.nameEn = this.optionsCapability[0].nameEn
        }
      })
    },
    changeOneLevelName () {
      this.optionsCapability.forEach(item => {
        this.oneLevelNameArr.push(item.name)
        if (item.name === this.form.group.name) {
          this.form.group.nameEn = item.nameEn
        }
      })
    },
    changeOneLevelNameEn () {
      this.optionsCapability.forEach(item => {
        this.oneLevelNameEnArr.push(item.nameEn)
        if (item.nameEn === this.form.group.nameEn) {
          this.form.group.name = item.name
        }
      })
    },
    getIconFileId () {
      let iconData
      if (this.form.appIcon[0].raw) {
        iconData = this.form.appIcon[0].raw
      } else {
        iconData = this.form.appIcon[0]
      }
      let formdata = new FormData()
      formdata.append('file', iconData)
      Workspace.postIconFileIdApi(this.userId, formdata).then(res => {
        this.form.iconFileId = res.data.fileId
      })
    },
    // Upload logo
    handleChangeLogo (file) {
      let listTemp = []
      this.form.base64Session = true
      this.form.appIcon = []
      this.defaultIconFile = []
      this.logoFileList = []
      this.form.defaultActive = ''
      if (file) {
        if (file.raw.name.indexOf(' ') !== -1) {
          this.$eg_messagebox(this.$t('promptMessage.fileNameType'), 'warning')
          this.logoFileList = []
        } else {
          this.logoFileList.push(file)
          listTemp.push(file)
          this.form.appIcon = listTemp
          this.uploadIcon = true
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$eg_messagebox(this.$t('promptMessage.moreThan2'), 'warning')
          this.logoFileList = []
        }
        let fileTypeArr = ['jpg', 'png']
        this.fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
          this.$eg_messagebox(this.$t('promptMessage.checkFileType'), 'warning')
          this.logoFileList = []
        }
      }
      this.showErr = !this.logoFileList
      this.getIconFileId()
    },
    removeUploadLogo (file) {
      this.uploadIcon = false
      this.logoFileList = []
      this.showErr = this.logoFileList
      this.chooseDefaultIcon(this.defaultIcon[0], 0)
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$eg_messagebox(this.$t('promptMessage.onlyOneFile'), 'warning')
      }
    },
    getBase64Image (img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      let dataURL = canvas.toDataURL('image/' + ext)
      sessionStorage.setItem('base64', dataURL)
      return dataURL
    },
    base64toFile (dataurl) {
      let arr = dataurl.split(',')
      let filename = new Date().getTime()
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename + '.' + suffix, {
        type: mime
      })
    },
    // Select default icon
    chooseDefaultIcon (file, index) {
      this.logoFileList = []
      this.uploadIcon = false
      this.form.base64Session = true
      this.defaultIconFile = []
      if (this.form.defaultActive === index) {
        this.form.defaultActive = ''
        this.form.appIcon = []
        this.showErr = !this.defaultIconFile.length
      } else {
        this.form.defaultActive = index
        this.conversionIcon(file)
      }
    },
    conversionIcon (file) {
      this.form.appIcon = []
      let image = new Image()
      image.src = file
      image.onload = () => {
        // Transfer static pic to base64 format
        let base64 = this.getBase64Image(image)
        // Transfer base64 format to file steam
        this.defaultIconFile.push(this.base64toFile(base64))
        this.form.appIcon = this.defaultIconFile
        this.showErr = !this.defaultIconFile
        this.getIconFileId()
      }
    },
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'capManagement', 261)
    },
    handleDelete (row) {
      this.$confirm(this.$t('system.deleteConfirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        Capability.deleteCapabilityById(row.id).finally(() => {
          this.loading = false
          this.getListData()
        })
      })
    },
    handleEdit (row) {
      this.apiFileId_file_list = []
      this.guideFileId_file_list = []
      this.guideFileIdEn_file_list = []
      this.logoFileList = []
      this.isAddService = false
      this.form = JSON.parse(JSON.stringify(row))
      let obj = {}
      obj.url = this.getIcon(this.form.iconFileId)
      this.uploadIcon = true
      this.form.appIcon = []
      this.defaultIconFile = []
      this.form.defaultActive = ''
      this.logoFileList.push(obj)
      this.getFileList('apiFileId', this.form.apiFileId)
      this.getFileList('guideFileId', this.form.guideFileId)
      this.getFileList('guideFileIdEn', this.form.guideFileIdEn)
      this.visible = true
    },
    getIcon (fileId) {
      return Workspace.getIconApi(fileId, this.userId)
    },
    getFileList (fileType, fileId) {
      Workspace.getApiFileApi(fileId, this.userId).then(res => {
        let obj = { name: '' }
        obj.name = res.data.fileName
        if (fileType === 'apiFileId') {
          this.apiFileId_file_list.push(obj)
        } else if (fileType === 'guideFileId') {
          this.guideFileId_file_list.push(obj)
        } else if (fileType === 'guideFileIdEn') {
          this.guideFileIdEn_file_list.push(obj)
        }
      })
    },
    onClose () {
      this.visible = false
    },
    createCapabilityFun (data) {
      Capability.createCapability(data).then(res => {
        if (res && res.data && res.data.id) {
          this.$eg_messagebox(this.$t('system.addMep') + this.$t('system.success'), 'success')
          this.onClose()
          this.$refs['form'].resetFields()
        } else {
          throw new Error()
        }
        this.getListData()
      }).catch(err => {
        if (err.response.data.message === 'The capability is exist') {
          this.$eg_messagebox(this.$t('system.isExistCapability'), 'error')
        } else {
          this.$eg_messagebox(this.$t('system.addMep') + this.$t('system.error'), 'error')
        }
      })
    },
    editCapabilityFun (data) {
      Capability.editCapability(this.form.id, data).then(() => {
        this.$eg_messagebox(this.$t('api.modify') + this.$t('system.success'), 'success')
        this.onClose()
        this.$refs['form'].resetFields()
        this.getListData()
      }).catch(() => {
        this.$eg_messagebox(this.$t('api.modify') + this.$t('system.error'), 'error')
      })
    },
    onSubmit () {
      if (!this.isAddService && this.logoFileList.length > 0) {
        this.form.appIcon = this.logoFileList
      }
      this.$refs['form'].validate((valid, params) => {
        if (valid) {
          this.loading = true
          let data = { ...this.form, ...params }
          data.group.type = 'OPENMEP'
          if (this.isAddService) {
            this.createCapabilityFun(data)
          } else {
            this.editCapabilityFun(data)
          }
          this.loading = false
          sessionStorage.setItem('currentPage', 1)
        }
      })
    },
    searchListData () {
      sessionStorage.setItem('currentPage', 1)
      this.getListData()
    },
    // Get a list of capabilities
    getListData () {
      this.loading = true
      const qs = { offset: this.offsetPage, limit: this.limitSize }
      if (this.language === 'cn') {
        qs.name = this.enterQuery
        Capability.getCapabilityByNameWithFuzzy(qs).then(result => {
          this.allListData = result.data.results || []
          this.listTotal = result.data.total
        }).finally(() => {
          this.loading = false
        })
      } else {
        qs.nameEn = this.enterQuery
        Capability.getCapabilityByNameWithFuzzy(qs).then(result => {
          this.allListData = result.data.results || []
          this.listTotal = result.data.total
        }).finally(() => {
          this.loading = false
        })
      }
    },
    handleRemove (key) {
      this[`${key}_file_list`] = []
      this.form[key] = ''
    },
    // Check upload file type
    checkFileType (fileList, fileTypeArr, uploadFileList) {
      let checkPassed = true
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
        this.$eg_messagebox(this.$t('promptMessage.checkFileType'), 'warning')
        checkPassed = false
      }
      return checkPassed
    },
    handleUpload (key, file, fileList, fileTypeArr, fileName) {
      let fileNameProp = fileName
      let checkPassed = this.checkFileType(fileList, fileTypeArr)
      if (!checkPassed) {
        if (fileNameProp === 'apiFile') {
          this.apiFileId_file_list = []
        } else if (fileNameProp === 'documentFile') {
          this.guideFileId_file_list = []
        } else if (fileNameProp === 'documentFileEn') {
          this.guideFileIdEn_file_list = []
        }
      } else {
        this.submitFile(key, [file.raw])
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
          if (this[`${key}_file_list`].length !== 0) {
            if (key === 'apiFileId') {
              this.$refs.apiFileItem.clearValidate()
            } else if (key === 'guideFileId') {
              this.$refs.guideFileItem.clearValidate()
            } else if (key === 'guideFileIdEn') {
              this.$refs.guideFileEnItem.clearValidate()
            }
          }
        } else {
          this.handleRemove(key)
          throw new Error()
        }
      }).catch((error) => {
        if (error && error.response && error.response.data.code === 403) {
          this.$eg_messagebox(this.$t('promptMessage.guestPrompt'), 'error')
        } else {
          this.$eg_messagebox(this.$t('promptMessage.uploadFailure'), 'error')
        }
        this.handleRemove(key)
      }).finally(() => {
        this.loading = false
      })
    },
    handleShowForm () {
      this.apiFileId_file_list = []
      this.guideFileId_file_list = []
      this.guideFileIdEn_file_list = []
      this.form = JSON.parse(JSON.stringify(this.defaultForm))
      this.defaultIcon[0] = require('../../assets/images/service_default_pic.jpg')
      this.chooseDefaultIcon(this.defaultIcon[0], 0)
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
      this.visible = true
      this.isAddService = true
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
.capManagement {
  .createservice_btn{
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
  .dialog_service .el-dialog{
    min-width: 850px;
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding-top: 30px !important;
    }
    .service_title{
      color: #380879;
      margin: 10px 0;
      font-weight: normal;
    }
  }
  .dialog_service_en .el-dialog{
    width: 60%;
  }
  h3{
    float: left;
    width: 100%;
  }
  .el-form-item{
    float: left;
    width: 100%;
    .el-icon-question:before {
      color: #688ef3;
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .right_item{
    padding-left: 20px;
  }
  .w50 {
    width: 50%;
    display: inline-block;
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
  .dialog-footer {
    text-align: center;
  }
  .default-icon{
    float: left;
    display: flex;
    flex-wrap: wrap;
    .box{
      position: ab;
      width: 160px;
      height: 44px;
      margin: 0 15px 0 0;
      img{
        height: 40px;
      }
      span{
        vertical-align: top;
        margin-left:10px;
        font-size:16px;
        color:#380879;
        position: relative;
        top: 5px;
      }
      em{
        display: inline-block;
        position: relative;
        bottom: -7px;
        right: 5px;
      }
      .active{
        color: #5e40c8;
      }
    }
  }
  .upIcon.el-icon-success{
    position: absolute;
    top: 30px;
    right: 40px;
    z-index: 99;
  }
  .upIcon.active{
    color: #5e40c8;
  }
  .upload-demo{
    float: left;
    .el-upload-list__item-status-label{
      display: none !important;
    }
    .el-upload{
      float: left;
      width: 34px;
      height: 34px;
      line-height: 34px;
      margin: 3px 15px 0 0;
      position: relative;
    }
    .el-upload-list{
      width: auto;
    }
    .el-upload-list__item{
      border-radius: 0;
      width: auto;
      height: 40px;
      min-width: 40px;
      border: none;
      margin: 0 15px 0 0;
      background-color:transparent;
      transition: none !important;
    }
    .el-upload-list__item-preview{
      opacity: 0;
    }
  }
  .el-form-error{
    display: inline-block;
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    margin: 14px 10px 0px 20px;
  }
  .uploadIconSpan{
    font-size:16px;
    color:#380879;
    margin-right:10px;
  }
}

</style>
