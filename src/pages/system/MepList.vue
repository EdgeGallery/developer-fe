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
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.system') }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.systemMep') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dialog
      :title="form.groupId ? $t('api.modify') : $t('system.addMep')"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="onClose"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        :label-width="formLabelWidth"
        label-position="right"
        class="clear"
        size="small"
      >
        <h3 :style="{margin: '10px 0px '}">
          {{ $t('system.basicInfo') }}
        </h3>
        <el-form-item
          :label="$t('system.capType')"
          prop="oneLevelName"
          class="w50 lt"
        >
          <el-input
            :placeholder="$t('system.zh_cn')"
            v-model="form.oneLevelName"
          />
        </el-form-item>
        <el-form-item
          prop="oneLevelNameEn"
          class="w50 lt right_item"
          label-width="0"
        >
          <el-input
            :placeholder="$t('system.en')"
            v-model="form.oneLevelNameEn"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.serviceName')"
          prop="twoLevelName"
          class="w50 lt"
        >
          <el-input
            :placeholder="$t('system.zh_cn')"
            v-model="form.twoLevelName"
          />
        </el-form-item>
        <el-form-item
          prop="twoLevelNameEn"
          class="w50 lt right_item"
          label-width="0"
        >
          <el-input
            :placeholder="$t('system.en')"
            v-model="form.twoLevelNameEn"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.apiFileId')"
          prop="apiFileId"
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
              plain
              type="primary"
            >
              {{ $t('system.upload') + $t('system.apiFileId') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="this.$t('devTools.apiText')"
              placement="right"
            >
              <em class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('system.guideFileId')"
          prop="guideFileId"
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
            class="w50 lt"
          >
            <el-button
              slot="trigger"
              size="medium"
              plain
              type="primary"
            >
              {{ $t('system.guideFileId_zh') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="this.$t('workspace.apiFunctionMd')"
              placement="right"
            >
              <em class="el-icon-question" />
            </el-tooltip>
          </el-upload>
          <el-upload
            action=""
            :file-list="guideFileIdEn_file_list"
            :limit="1"
            :auto-upload="false"
            :on-change="(file,fileList) => { handleUpload('guideFileIdEn', file,fileList,['md'],'documentFileEn') }"
            :on-exceed="handleExceed"
            :on-remove="(file) => { handleRemove('guideFileIdEn', file) }"
            accept=".md"
            class="w50 lt"
          >
            <el-button
              slot="trigger"
              size="medium"
              plain
              type="primary"
            >
              {{ $t('system.guideFileId_en') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="this.$t('workspace.apiFunctionMd')"
              placement="right"
            >
              <em class="el-icon-question" />
            </el-tooltip>
          </el-upload>
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
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.icon')"
          :label-width="formLabelWidth"
          class="icon"
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
                :class="{ active: defaultForm.defaultActive === index }"
              />
            </div>
          </div>
          <em
            class="upIcon el-icon-success"
            :class="{ active: uploadIcon }"
            v-if="uploadIcon"
          />
          <el-upload
            id="projectLogo"
            class="upload-demo clear"
            ref="upload"
            action=""
            list-type="picture-card"
            :limit="1"
            :file-list="logoFileList"
            :on-change="handleChangeLogo"
            :on-exceed="handleExceedIcon"
            :auto-upload="false"
            :on-remove="removeUploadLogo"
            accept=".jpg,.png"
            name="file"
          >
            <em class="el-icon-plus" />
          </el-upload>
          <el-tooltip
            class="item"
            effect="dark"
            :content="this.$t('workspace.limitition')"
            placement="right"
          >
            <em class="el-icon-question" />
          </el-tooltip>
          <div
            class="el-form-error"
            v-if="showErr"
          >
            {{ $t('workspace.iconRequired') }}
          </div>
        </el-form-item>
        <h3 :style="{margin: '10px 0px '}">
          {{ $t('system.registerInfo') }}
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
      </el-form>
      <div
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
          {{ $t('system.addMep') }}
        </el-button>
        <span>
          <el-input
            :style="{width: '200px'}"
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('system.serviceName')"
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
        row-key="groupId"
        :data="allListData"
        header-cell-class-name="headerStyle"
      >
        <el-table-column
          prop="twoLevelName"
          :label="$t('system.serviceName')"
        >
          <template slot-scope="scope">
            {{ language === 'cn' ? scope.row.twoLevelName : scope.row.twoLevelNameEn }}
          </template>
        </el-table-column>
        <el-table-column
          prop="version"
          :label="$t('system.version')"
        >
          <template slot-scope="scope">
            {{ (scope.row.capabilityDetailList || [{ version: '-' }])[0].version }}
          </template>
        </el-table-column>
        <el-table-column
          prop="oneLevelName"
          :label="$t('system.capType')"
        >
          <template slot-scope="scope">
            {{ language === 'cn' ? scope.row.oneLevelName : scope.row.oneLevelNameEn }}
          </template>
        </el-table-column>
        <el-table-column
          prop="provider"
          :label="$t('system.provider')"
        >
          <template slot-scope="scope">
            {{ (scope.row.capabilityDetailList || [{ provider: '-' }])[0].provider }}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          :label="$t('system.type')"
        />
        <el-table-column
          prop="description"
          :label="$t('workspace.description')"
          width="300"
        >
          <template slot-scope="scope">
            {{ language === 'cn' ? scope.row.description : scope.row.descriptionEn }}
          </template>
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              width="300"
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
        <el-table-column :label="$t('workspace.operation')">
          <template slot-scope="scope">
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
import { System, Workspace } from '@/tools/api.js'

export default {
  name: 'HostList',
  components: {
    pagination
  },
  data () {
    return {
      apiFileId_file_list: [],
      guideFileId_file_list: [],
      guideFileIdEn_file_list: [],
      limitSize: 2,
      offsetPage: 0,
      listTotal: 0,
      protocolOptions: [
        { label: 'HTTP', value: 'http' },
        { label: 'HTTPS', value: 'https' }
      ],
      formLabelWidth: '120px',
      form: {},
      defaultForm: {
        protocol: 'https',
        // iconFileId: '35a52055-42b5-4b5f-bc2b-8a02259f2572',
        author: sessionStorage.getItem('userName'),
        appIcon: [],
        iconFileId: '',
        base64Session: false,
        defaultActive: ''
      },
      rules: {
        apiFileId: [{ required: true, message: this.$t('promptMessage.uploadApiFile'), trigger: 'change' }],
        guideFileId: [{ required: true, message: this.$t('promptMessage.systemDocument'), trigger: 'change' }],
        twoLevelName: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}` },
          { pattern: /^[^a-zA-Z]{1,20}$/g, message: this.$t('promptMessage.systemCapaNameCn') }
        ],
        twoLevelNameEn: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}` },
          { pattern: /^[^\u4E00-\u9FA5]{1,40}$/g, message: this.$t('promptMessage.systemCapaNameEn') }
        ],
        oneLevelName: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.capType')}` },
          { pattern: /^[^a-zA-Z]{1,20}$/g, message: this.$t('promptMessage.systemCapaNameCn') }
        ],
        oneLevelNameEn: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.capType')}` },
          { pattern: /^[^\u4E00-\u9FA5]{1,40}$/g, message: this.$t('promptMessage.systemCapaNameEn') }
        ],
        port: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.inPort')}` },
          { message: `${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}`, pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/ }
        ],
        description: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.description')}` },
          { pattern: /^[^a-zA-Z]{1,100}$/g, message: this.$t('promptMessage.systemCapaDescCn') }
        ],
        descriptionEn: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.description')}` },
          { pattern: /^[^\u4E00-\u9FA5]{1,200}$/g, message: this.$t('promptMessage.systemCapaDescEn') }
        ],
        protocol: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.protocol')}` }
        ],
        host: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}` },
          { pattern: /^[\S\s]{1,20}$/g, message: this.$t('promptMessage.systemServiceName') }
        ],
        version: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.version')}` },
          { min: 1, max: 20, message: `${this.$t('system.pleaseInput')}1~20 ${this.$t('system.char')}` }
        ],
        provider: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.provider')}` },
          { pattern: /^[\S\s]{1,20}$/g, message: this.$t('promptMessage.systemProviderName') }
        ]
      },
      visible: false,
      allListData: [],
      enterQuery: '',
      loading: false,
      userName: sessionStorage.getItem('userName'),
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      defaultIcon: [
        // require('../../assets/images/project_videoapp.png')
        require('../../assets/images/home_capa_pic0.png')
      ],
      showErr: false,
      logoFileList: [],
      uploadIcon: false
    }
  },
  mounted () {
    this.getListData()
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
    // 上传图标
    handleChangeLogo (file) {
      let listTemp = []
      this.defaultForm.base64Session = true
      this.defaultForm.appIcon = []
      this.defaultIconFile = []
      this.logoFileList = []
      this.defaultForm.defaultActive = ''
      if (file) {
        if (file.raw.name.indexOf(' ') !== -1) {
          this.$message.warning(this.$t('promptMessage.fileNameType'))
          this.logoFileList = []
        } else {
          this.logoFileList.push(file)
          listTemp.push(file)
          this.defaultForm.appIcon = listTemp
          this.uploadIcon = true
        }
        if (file.size / 1024 / 1024 > 2) {
          this.$message.warning(this.$t('promptMessage.moreThan2'))
          this.logoFileList = []
        }
        let fileTypeArr = ['jpg', 'png']
        this.fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
          this.$message.warning(this.$t('promptMessage.checkFileType'))
          this.logoFileList = []
        }
      }
      this.showErr = !this.logoFileList
    },
    removeUploadLogo (file) {
      this.uploadIcon = false
      this.logoFileList = []
      this.showErr = this.logoFileList
      this.chooseDefaultIcon(this.defaultIcon[0], 0)
    },
    handleExceedIcon (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    fileToBase64 (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        sessionStorage.setItem('base64', reader.result)
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
    // 选择默认图标
    chooseDefaultIcon (file, index) {
      console.log(file)
      this.logoFileList = []
      this.uploadIcon = false
      this.defaultForm.base64Session = true
      this.defaultIconFile = []
      if (this.defaultForm.defaultActive === index) {
        this.defaultForm.defaultActive = ''
        this.defaultForm.appIcon = []
        this.showErr = !this.defaultIconFile.length
      } else {
        this.defaultForm.defaultActive = index
        this.conversionIcon(file)
      }
    },
    conversionIcon (file) {
      let image = new Image()
      image.src = file
      image.onload = () => {
        // 将静态图片转化为base64
        let base64 = this.getBase64Image(image)
        // base64转化为文件流
        this.defaultIconFile.push(this.base64toFile(base64))
        this.defaultForm.appIcon = this.defaultIconFile
        this.showErr = !this.defaultIconFile
      }
    },
    handleDelete ({ groupId }) {
      this.$confirm(this.$t('system.deleteConfirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        System.deleteService({ groupId }).finally(() => {
          this.loading = false
          this.getListData()
        })
      })
    },
    onClose () {
      this.visible = false
    },
    handleExceed () {
      this.$message.warning(this.$t('system.fileExceed'))
    },
    onSubmit () {
      this.$refs.form.validate((valid, params) => {
        if (valid) {
          this.loading = true
          const data = { ...this.form, ...params }
          const { host, provider, apiFileId, guideFileId, guideFileIdEn, port, version, protocol, ...rest } = data
          System.saveService({
            type: 'OPENMEP',
            capabilityDetailList: [
              {
                service: rest.twoLevelName,
                serviceEn: rest.twoLevelNameEn,
                host,
                version,
                port,
                protocol,
                userId: this.userName,
                apiFileId,
                guideFileId,
                guideFileIdEn,
                provider
              }
            ],
            ...rest
          }).then(res => {
            if (res && res.data && res.data.groupId) {
              this.$message.success((this.form.groupId ? this.$t('api.modify') : this.$t('system.addHost')) + this.$t('system.success'))
              this.onClose()
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.$message.error(this.$t('system.addMep') + this.$t('system.error'))
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
    // 获取列表
    getListData () {
      this.loading = true
      const qs = { offset: this.offsetPage, limit: this.limitSize }
      if (this.language === 'cn') {
        qs.twoLevelName = this.enterQuery
      } else {
        qs.twoLevelNameEn = this.enterQuery
      }
      System.getSerives(qs).then(res => {
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
    // 检查上传文件类型
    checkFileType (fileList, fileTypeArr, uploadFileList) {
      let checkPassed = true
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
        this.$message.warning(this.$t('promptMessage.checkFileType'))
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
    handleShowForm (v) {
      this.form = JSON.parse(JSON.stringify(v))
      this.apiFileId_file_list = []
      this.guideFileId_file_list = []
      this.guideFileIdEn_file_list = []
      this.visible = true
      this.chooseDefaultIcon(this.defaultIcon[0], 0)
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
.capManagement {
  .el-dialog{
    width: 45%;
  }
  @media screen and (max-width:1380px){
    .el-dialog{
      width: 65%;
    }
  }
  h3{
    float: left;
    width: 100%;
  }
  .el-form-item{
    float: left;
    width: 100%;
    .el-input{
      max-width: 290px;
    }
    .el-icon-question:before {
      color: #688ef3;
      font-size: 16px;
      margin-left: 10px;
    }
  }
  .right_item{
    padding-left: 20px;
  }

  .el-form-item.icon{
    content: '';
    display: block;
    clear: both;
    .upload-demo{
      float: left;
      .el-button--primary{
        background-color: #fff;
        border-color: #688ef3;
        color: #688ef3;
        padding: 6px 20px;
        margin-top: 8px;
      }
      .el-icon-warning{
        color: #688ef3;
        margin-right: 5px;
        font-size: 14px;
      }
      .el-upload{
        float: left;
        width: 34px;
        height: 34px;
        line-height: 34px;
        margin: 3px 15px 0 0;
      }
      .el-upload-list__item-preview{
        opacity: 0;
      }
    }
    .el-icon-question{
      float: left;
      margin-top: 12px;
    }
    .el-icon-question:before {
      color: #688ef3;
      font-size: 16px;
    }
    .default-icon{
      float: left;
      display: flex;
      flex-wrap: wrap;
      .box{
        position: relative;
        width: 44px;
        height: 44px;
        margin: 0 15px 0 0;
        img{
          width: 40px;
          height: 40px;
        }
        em{
          display: inline-block;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .active{
          color: #409EFF;
        }
      }
    }
    .upIcon.el-icon-success{
      position: absolute;
      top: 30px;
      left: 88px;
      z-index: 99;
    }
    .upIcon.active{
      color: #409EFF;
    }
    .el-form-item{
      margin-bottom: 15px;
    }
    .el-upload-list__item:first-child{
      width: 40px;
      height: 40px;
      min-width: 40px;
      border: none;
      margin: 0 15px 0 0;
    }
    .el-form-error{
      float: left;
      color: #F56C6C;
      font-size: 12px;
      line-height: 1;
      margin: 14px 0 0 10px;
    }
  }
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
