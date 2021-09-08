<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="addAppPublish defaultFontLight">
    <el-dialog
      :title="$t('workspace.add')+$t('workspace.appPublishConfig')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      center
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        class="config_form"
        :class="{'addAppPublishConfig_en':language==='en'}"
        size="small"
      >
        <el-form-item
          :label="$t('workspace.basicInformation')"
          label-width="100%"
          class="service_title"
        />
        <el-form-item
          :label="$t('system.twoLevelCapability')"
          :label-width="formLabelWidth"
          class="service_row"
          prop="twoLevelName"
        >
          <el-input
            v-model="form.twoLevelName"
            :placeholder="$t('workspace.name')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.oneLevelCapability')"
          :label-width="formLabelWidth"
          class="service_row"
          prop="oneLevelName"
        >
          <el-select
            v-model="form.oneLevelData"
            size="mini"
            class="select_right"
            @change="selectOnelevelName"
            ref="capabilityGroup"
          >
            <el-option
              v-for="item in optionsCapability"
              :key="item.id"
              :label="language==='cn'?item.name:item.nameEn"
              :value="language==='cn'?item.name:item.nameEn"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.description')"
          :label-width="formLabelWidth"
          class="service_row"
          prop="description"
        >
          <el-input
            type="textarea"
            v-model="form.description"
            :placeholder="$t('workspace.description')"
            :rows="2"
            maxlength="400"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          :label="$t('devTools.uploadApiFile')"
          :label-width="formLabelWidth"
          class="service_row f50"
          :class="{'f55_en':language==='en'}"
          prop="apiJson"
          ref="apiFileItem"
        >
          <el-upload
            class="upload-demo clear"
            action=""
            :limit="1"
            :on-change="handleChangeApi"
            :on-exceed="handleExceed"
            :file-list="apiFileList"
            :auto-upload="false"
            :on-remove="removeUploadapi"
            accept=".json,.yaml"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              class="featuresBtn"
            >
              {{ $t('devTools.uploadApiFile') }}
            </el-button>
            <el-tooltip
              class="item"
              effect="dark"
              :content="this.$t('devTools.apiText')"
              placement="right"
            >
              <em class="el-icon-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>

        <el-form-item
          :label="$t('workspace.uploadFile')"
          :label-width="formLabelWidth"
          class="service_row f50"
          :class="{'f55_en':language==='en'}"
          prop="apiMd"
          ref="apiMdItem"
        >
          <el-upload
            class="upload-demo clear"
            action=""
            :limit="1"
            :on-change="changeApiMd"
            :on-exceed="handleExceed"
            :file-list="apiMdList"
            :auto-upload="false"
            :on-remove="removeApiMd"
            accept=".md"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              class="featuresBtn"
            >
              {{ $t('workspace.uploadFile') }}
            </el-button>
            <el-tooltip
              class="item"
              effect="dark"
              :content="this.$t('workspace.apiFunctionMd')"
              placement="right"
            >
              <em class="el-icon-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.icon')"
          :label-width="formLabelWidth"
          class="icon lt service_row"
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
              style="marginTop:10px"
            >i</span>
          </el-tooltip>
          <div
            class="el-form-error"
            v-if="showErr"
          >
            {{ $t('workspace.iconRequired') }}
          </div>
        </el-form-item>

        <el-form-item
          :label="$t('workspace.registInformation')"
          label-width="100%"
          class="service_title"
        />
        <el-form-item
          :label="$t('workspace.servicename')"
          :label-width="formLabelWidth"
          class="service_row f50"
          prop="serviceName"
        >
          <el-input
            v-model="form.serviceName"
            :placeholder="$t('workspace.servicename')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.internalPort')"
          :label-width="formLabelWidth"
          class="service_row f50"
          prop="internalPort"
        >
          <el-input
            v-model="form.internalPort"
            :placeholder="$t('workspace.internalPort')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.version')"
          :label-width="formLabelWidth"
          class="service_row f50"
          prop="version"
        >
          <el-input
            v-model="form.version"
            :placeholder="$t('workspace.version')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.protocol')"
          :label-width="formLabelWidth"
          class="service_row f50"
          prop="protocol"
        >
          <el-select
            v-model="form.protocol"
            size="mini"
            class="select_right"
          >
            <el-option
              v-for="item in optionsProtocol"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('api.onlineExperience')+' url'"
          :label-width="formLabelWidth"
          class="service_row"
        >
          <el-input
            v-model="form.experienceUrl"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.trafficRules')"
          :label-width="formLabelWidth"
          class="service_row"
        >
          <el-checkbox-group
            v-model="form.trafficRulesList"
          >
            <el-checkbox
              v-for="(item,index) in optionsTrafficRules"
              :key="index"
              :label="item"
              name="trafficRulesList"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.dnsRules')"
          :label-width="formLabelWidth"
          class="service_row"
        >
          <el-checkbox-group
            v-model="form.dnsRulesList"
          >
            <el-checkbox
              v-for="(item,index) in optionsDnsRules"
              :key="index"
              :label="item"
              name="dnsRulesList"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <span
        :class="{'button_en':language==='en'}"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          size="medium"
          class="cancel"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="addPublicConfig"
          size="medium"
          class="confirm"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Workspace, Capability } from '../../tools/api.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    editRuleDataprop: {
      type: Object,
      required: true
    },
    editIndexprop: {
      type: Number,
      default: 0
    }
  },
  data () {
    const validateTwoLevelName = (rule, value, callback) => {
      let reg = /^(?!\s)[\S.\s\n\r]{1,40}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.twoLevelName')))
      } else {
        callback()
      }
    }
    const validateApiJson = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('promptMessage.uploadApiFile')))
      } else {
        callback()
      }
    }
    const validateApiMd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseUpload')}${this.$t('system.guideFileId')}`))
      } else {
        callback()
      }
    }
    const validateDescription = (rule, value, callback) => {
      let reg = /^(?!\s)[\S.\s\n\r]{1,400}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('workspace.description')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.serviceDesc')))
      } else {
        callback()
      }
    }
    const validateServiceName = (rule, value, callback) => {
      let reg = /^(?!\s)[\S.\s\n\r]{1,40}$/g
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.twoLevelName')))
      } else {
        callback()
      }
    }
    const validateInternalPort = (rule, value, callback) => {
      let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.inPort')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}`))
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
    return {
      dialogVisible: this.value,
      form: {
        oneLevelData: '',
        oneLevelName: '',
        oneLevelNameEn: '',
        appIcon: [],
        internalPort: '',
        base64Session: false,
        defaultActive: '',
        experienceUrl: ''
      },
      trafficRulesList: [],
      dnsRulesList: [],
      optionsProtocol: [{
        value: '0',
        label: 'http'
      }, {
        value: '1',
        label: 'https'
      }],
      capabilityGroup: '',
      optionsCapability: [],
      optionsTrafficRules: [],
      optionsDnsRules: [],
      formLabelWidth: '120px',
      apiFileList: [],
      apiMdList: [],
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      rules: {
        twoLevelName: [
          { required: true, validator: validateTwoLevelName }
        ],
        oneLevelName: [
          { required: true }
        ],
        apiJson: [{ required: true, validator: validateApiJson, trigger: 'change' }],
        apiMd: [{ required: true, validator: validateApiMd, trigger: 'change' }],
        description: [
          { required: true, validator: validateDescription }
        ],
        serviceName: [
          { required: true, validator: validateServiceName }
        ],
        internalPort: [
          { required: true, validator: validateInternalPort }
        ],
        version: [
          { required: true, validator: validateVersion }
        ],
        protocol: [
          { required: true, trigger: 'change' }
        ],
        appIcon: [
          { required: true, trigger: 'change' }
        ]
      },
      oneLevelMap: new Map(),
      logoFileList: [],
      defaultIcon: [
        require('../../assets/images/service_default_pic.jpg')
      ],
      uploadIcon: false,
      showErr: false,
      defaultIconFile: [],
      projectId: sessionStorage.getItem('mecDetailID')
    }
  },
  methods: {
    selectOnelevelName (name) {
      this.optionsCapability.forEach(item => {
        if (name === item.name) {
          this.form.oneLevelName = item.name
          this.form.oneLevelNameEn = item.nameEn
        }
        if (name === item.nameEn) {
          this.form.oneLevelName = item.name
          this.form.oneLevelNameEn = item.nameEn
        }
      })
    },
    getReleaseConfig (editIndex) {
      Workspace.getReleaseConfigApi(this.projectId).then(res => {
        let data = res.data
        this.form.oneLevelData = this.language === 'cn' ? data.capabilitiesDetail.serviceDetails[editIndex].oneLevelName : data.capabilitiesDetail.serviceDetails[editIndex].oneLevelNameEn
        this.form.oneLevelName = data.capabilitiesDetail.serviceDetails[editIndex].oneLevelName
        this.form.oneLevelNameEn = data.capabilitiesDetail.serviceDetails[editIndex].oneLevelNameEn
      })
    },
    getEditConfigData () {
      let data = JSON.parse(JSON.stringify(this.editRuleDataprop))
      let editIndex = this.editIndexprop
      if (data) {
        this.form = data
        this.form.oneLevelData = ''
        this.getReleaseConfig(editIndex)
        if (data.trafficRulesList && data.trafficRulesList[0] !== '') {
          this.form.trafficRulesList = data.trafficRulesList.split(',')
        }
        if (data.dnsRulesList && data.dnsRulesList[0] !== '') {
          this.form.dnsRulesList = data.dnsRulesList.split(',')
        }
        this.removeEmpty(this.form.trafficRulesList)
        this.removeEmpty(this.form.dnsRulesList)
        if (this.form.apiJson) {
          this.getFileList(this.form.apiJson, 'apiJson')
        }
        if (this.form.apiMd) {
          this.getFileList(this.form.apiMd, 'apiMd')
        }
        if (this.form.iconFileId) {
          this.getFileList(this.form.iconFileId, 'iconFileId')
        } else {
          this.chooseDefaultIcon(this.defaultIcon[0], 0)
        }
      }
    },
    getFileList (fileId, type) {
      Workspace.getApiFileApi(fileId, this.userId).then(res => {
        let obj = { name: '' }
        obj.name = res.data.fileName
        if (type === 'apiJson' && fileId && res.data.fileName) {
          this.apiFileList.push(obj)
        }
        if (type === 'apiMd' && fileId && res.data.fileName) {
          this.apiMdList.push(obj)
        }
        if (type === 'iconFileId' && fileId) {
          let iconUrl = this.getIcon(this.form.iconFileId)
          let currUrl = window.location.origin
          let iconObj = {}
          iconObj.url = iconUrl + currUrl
          this.uploadIcon = true
          this.form.appIcon = []
          this.form.defaultActive = ''
          this.logoFileList.push(iconObj)
        }
      })
    },
    getIcon (fileId) {
      return Workspace.getIconApi(fileId, this.userId)
    },
    getRuleList () {
      let trafficData = []
      if (sessionStorage.getItem('trafficData')) {
        trafficData = JSON.parse(sessionStorage.getItem('trafficData'))
      }
      let dnsData = []
      if (sessionStorage.getItem('dnsData')) {
        dnsData = JSON.parse(sessionStorage.getItem('dnsData'))
      }
      let trafficArr = []
      trafficData.forEach(item => {
        trafficArr.push(item.trafficRuleId)
      })
      this.optionsTrafficRules = trafficArr
      let dnsArr = []
      dnsData.forEach(item => {
        dnsArr.push(item.dnsRuleId)
      })
      this.optionsDnsRules = dnsArr
    },
    removeEmpty (arr) {
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === '' || typeof (arr[i]) === 'undefined') {
            arr.splice(i, 1)
          }
        }
        return arr
      }
    },
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    // Check uploaded file type
    checkFileType (fileList, fileTypeArr, uploadFileList) {
      let checkPassed = true
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
        this.$eg_messagebox(this.$t('promptMessage.checkFileType'), 'warning')
        checkPassed = false
      }
      return checkPassed
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$eg_messagebox(this.$t('promptMessage.onlyOneFile'), 'warning')
      }
    },
    // Upload API
    handleChangeApi (file, fileList) {
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$eg_messagebox(this.$t('promptMessage.fileNameType'), 'warning')
        this.apiFileList = []
      } else {
        this.apiFileList.push(file.raw)
        this.$refs.apiFileItem.clearValidate()
      }
      let fileTypeArr = ['yaml', 'json']
      let checkPassed = this.checkFileType(fileList, fileTypeArr)
      if (!checkPassed) {
        this.apiFileList = []
      }
      if (this.apiFileList.length > 0) {
        this.uploadFile(this.apiFileList, 'api')
      }
    },
    removeUploadapi (file, fileList) {
      this.apiFileList = fileList
    },
    // Upload Api description file
    changeApiMd (file, fileList) {
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$eg_messagebox(this.$t('promptMessage.fileNameType'), 'warning')
        this.apiMdList = []
      } else {
        this.apiMdList.push(file.raw)
        this.$refs.apiMdItem.clearValidate()
      }
      let fileTypeArr = ['md']
      let checkPassed = this.checkFileType(fileList, fileTypeArr)
      if (!checkPassed) {
        this.apiMdList = []
      }
      if (this.apiMdList.length > 0) {
        this.uploadFile(this.apiMdList, 'md')
      }
    },
    removeApiMd (file, fileList) {
      this.apiMdList = fileList
    },
    uploadFile (fileList, name) {
      let fd = new FormData()
      fd.append('file', fileList[0])
      Workspace.submitApiFileApi(this.userId, fd).then(res => {
        if (name === 'api') {
          this.form.apiJson = res.data.fileId
        } else if (name === 'md') {
          this.form.apiMd = res.data.fileId
        }
        this.$eg_messagebox(this.$t('promptMessage.uploadSuccess'), 'success')
      }).catch(() => {
        if (name === 'api') {
          this.apiFileList = []
        } else if (name === 'md') {
          this.apiMdList = []
        }
        this.$eg_messagebox(this.$t('promptMessage.uploadFailure'), 'error')
      })
    },
    // Fetch first left capability list
    getOneLevelCapability () {
      Capability.getAllCapabilityGroup().then(result => {
        let data = result.data
        data.forEach(item => {
          item.label = this.language === 'cn' ? item.name : item.nameEn
        })
        this.optionsCapability = data
        if (data.length > 0) {
          this.form.oneLevelData = this.language === 'cn' ? this.optionsCapability[0].name : this.optionsCapability[0].nameEn
          this.form.oneLevelName = this.optionsCapability[0].name
          this.form.oneLevelNameEn = this.optionsCapability[0].nameEn
        }
        this.getEditConfigData()
      })
    },
    addPublicConfig () {
      if (this.form.appIcon || this.logoFileList.length !== 0) {
        this.$refs.iconFileItem.clearValidate()
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.trafficRulesList = this.form.trafficRulesList.join(',')
          this.form.dnsRulesList = this.form.dnsRulesList.join(',')
          this.form.author = sessionStorage.getItem('userName')
          this.$emit('getAddPublicConfigData', this.form)
          this.handleClose()
        }
      })
      if (this.apiMdList.length !== 0) {
        this.$refs.apiMdItem.clearValidate()
      }
      if (this.apiFileList.length !== 0) {
        this.$refs.apiFileItem.clearValidate()
      }
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
    }
  },
  mounted () {
    this.getOneLevelCapability()
    this.getRuleList()
  }
}

</script>
<style lang='less'>
.addAppPublish{
  .addAppPublishConfig_en{
     .service_row .el-form-item__label{
       width:155px !important;
     }
     .service_row .el-form-item__content{
       margin-left:155px !important;
     }
  }
  .el-dialog__footer{
    padding-bottom:0px;
  }
  .el-button--default{
    border: 1px solid #5844be;
    color: #fff;
    background-color: #5844be;
    padding: 8px 15px;
    border-radius:10px;
  }
  .el-button--primary{
      border: 1px solid #5844be;
      color: #fff;
      background-color: #5844be;
      padding: 8px 15px;
      border-radius:10px;

    }
.el-upload{
  margin-right:5px !important;
}
.el-button.featuresBtn{
      background: #a59fc9 !important;
    border: 1px solid #a59fc9 !important;
    color: #fff !important;
    border-radius: 8px !important;
    font-size:16px !important;
    width:100% !important;
}
.el-form{
  width:95% !important;
}
.el-form .el-tooltip{
  font-size:16px;
}
.el-icon-info:before{
  color:#5844be;
}

  .el-form{
    width: 100%;
    .service_row .el-form-item__content > span{
      float: left;
    }
    .el-form-item--mini.el-form-item{
      margin-bottom: 22px;
    }
    .upload_file{
        padding-left: 30px;
      }
    .service_row{
      .el-select{
        width: 100%;
      }
      .el-form-item__label{
        color: #380879;
        padding-right:20px;
        font-size: 16px;
      }
    }
    .service_row:before{
      content: '';
      display: block;
      clear: both;
    }
    .service_title{
      .el-form-item__label{
        font-weight:200 !important;
        text-align: left;
        font-size: 20px;
        color: #380879;
      }

  .el-form-item__label::before{
    content:'';
    display:inline-block;
    width:17px;
    height:17px;
    margin-right:13px;
    background: linear-gradient(60deg,#70dcc7,#bdeae1);
    position: relative;
    top:2px;
    border-radius:3px;
  }
    }
    .el-tooltip{
      float: left;
      margin-top: 10px;
    }
    .el-icon-question:before {
      color: #688ef3;
      font-size: 16px;
    }
    .f50{
      float: left;
      width: 50%;
    }
    .el-checkbox-group{
      text-align: left;
      float: left;
      width: calc( 100% - 120px );
    }

    .el-input--mini .el-input__inner{
      height:36px;
      line-height:36px;
      border-radius:8px;
      font-size:16px;
      font-family: defaultFontLight;
      border-color:#fff;
    }
    .el-textarea__inner{
      border-color:#fff;
       font-family: defaultFontLight;
       font-size:16px;
    }
    .el-input__count{
      font-size:16px;
    }
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
  .icon .upload-demo{
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
    }
    .el-upload-list__item{
      width: auto;
      height: 40px;
      min-width: 40px;
      border: none;
      margin: 0 15px 0 0;
      background-color:transparent;
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
    margin-top: 4px;
  }
}
.capability_tree{
  overflow-y: auto;
  margin-right: 20px;
}
.selected_ability{
  float: left;
  padding: 2px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor:default;
  margin-right: 10px;
}
.ability_btn{
  float: left;
  padding: 10px 15px;
}
</style>
