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
  <div class="addAppPublish">
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
        size="mini"
      >
        <el-form-item
          :label="$t('workspace.basicInformation')"
          label-width="100%"
          class="service_title"
        />
        <el-form-item
          :label="$t('workspace.name')"
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
          :label="$t('workspace.appRelease.capabilityType')"
          :label-width="formLabelWidth"
          class="service_row"
          prop="oneLevelName"
        >
          <el-select
            v-model="form.oneLevelName"
            size="mini"
            class="select_right"
            @change="selectOnelevelName"
          >
            <el-option
              v-for="item in optionsCapability"
              :key="item.key"
              :label="language==='cn'?item.key:item.value"
              :value="language==='cn'?item.key:item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('devTools.uploadApiFile')"
          :label-width="formLabelWidth"
          class="service_row f50 fileP"
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
              <em class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.uploadFile')"
          :label-width="formLabelWidth"
          class="service_row f50 fileP"
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
              <em class="el-icon-question" />
            </el-tooltip>
          </el-upload>
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
              :value="item.value"
            />
          </el-select>
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
import { Workspace, Api } from '../../tools/api.js'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    editRuleDataprop: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      form: {},
      trafficRulesList: [],
      dnsRulesList: [],
      optionsProtocol: [{
        value: '0',
        label: 'http'
      }, {
        value: '1',
        label: 'https'
      }],
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
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}` },
          { pattern: /^(?!\s)[\S.\s\n\r]{1,40}$/g, message: this.$t('promptMessage.twoLevelName') }
        ],
        oneLevelName: [
          { required: true, message: this.$t('test.testApp.choosetype'), trigger: 'change' }
        ],
        apiJson: [{ required: true, message: this.$t('promptMessage.uploadApiFile'), trigger: 'change' }],
        apiMd: [{ required: true, message: `${this.$t('system.pleaseUpload')}${this.$t('system.guideFileId')}`, trigger: 'change' }],
        description: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('workspace.description')}` },
          { pattern: /^(?!\s)[\S.\s\n\r]{1,400}$/g, message: this.$t('promptMessage.serviceDesc') }
        ],
        serviceName: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.serviceName')}` },
          { pattern: /^(?!\s)[\S.\s\n\r]{1,40}$/g, message: this.$t('promptMessage.twoLevelName') }
        ],
        internalPort: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.inPort')}` },
          { message: `${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}`, pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/ }
        ],
        version: [
          { required: true, message: `${this.$t('system.pleaseInput')}${this.$t('system.version')}` },
          { min: 1, max: 20, message: `${this.$t('system.pleaseInput')}1~20 ${this.$t('system.char')}` }
        ],
        protocol: [
          { required: true, trigger: 'change' }
        ]
      },
      oneLevelMap: new Map()
    }
  },
  methods: {
    selectOnelevelName (name) {
      this.optionsCapability.forEach(item => {
        if (name === item.key) {
          this.form.oneLevelName = item.key
          this.form.oneLevelNameEn = item.value
        }
        if (name === item.value) {
          this.form.oneLevelName = item.value
          this.form.oneLevelNameEn = item.key
        }
      })
    },
    getEditConfigData () {
      let data = JSON.parse(JSON.stringify(this.editRuleDataprop))
      if (data) {
        this.form = data
        this.form.trafficRulesList = data.trafficRulesList.split(',')
        this.form.dnsRulesList = data.dnsRulesList.split(',')
        this.removeEmpty(this.form.trafficRulesList)
        this.removeEmpty(this.form.dnsRulesList)
        if (this.form.apiJson) {
          this.getFileList(this.form.apiJson, 'apiJson')
        }
        if (this.form.apiMd) {
          this.getFileList(this.form.apiMd, 'apiMd')
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
      })
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
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === '' || typeof (arr[i]) === 'undefined') {
          arr.splice(i, 1)
        }
      }
      return arr
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
        this.$message.warning(this.$t('promptMessage.checkFileType'))
        checkPassed = false
      }
      return checkPassed
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    // Upload API
    handleChangeApi (file, fileList) {
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$message.warning(this.$t('promptMessage.fileNameType'))
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
        this.$message.warning(this.$t('promptMessage.fileNameType'))
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
        this.$message.success(this.$t('promptMessage.uploadSuccess'))
      }).catch(() => {
        if (name === 'api') {
          this.apiFileList = []
        } else if (name === 'md') {
          this.apiMdList = []
        }
        this.$message.error(this.$t('promptMessage.uploadFailure'))
      })
    },
    // Fetch first left capability list
    getOneLevelCapability () {
      Api.getCapabilityGroupsApi().then(res => {
        let oneLevel = []
        res.data.forEach(item => {
          this.oneLevelMap.set(item.oneLevelName, item.oneLevelNameEn)
        })
        this.oneLevelMap.forEach(function (value, key) {
          oneLevel.push({ key, value })
        })
        this.form.oneLevelName = this.language === 'cn' ? oneLevel[0].key : oneLevel[0].value
        this.form.oneLevelNameEn = oneLevel[0].value
        this.optionsCapability = oneLevel
      })
    },
    addPublicConfig () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.trafficRulesList = this.form.trafficRulesList.join(',')
          this.form.dnsRulesList = this.form.dnsRulesList.join(',')
          this.form.iconFileId = '20aeed6a-f05f-4789-94b5-8a50db67d096'
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
    }
  },
  mounted () {
    this.getEditConfigData()
    this.getRuleList()
    this.getOneLevelCapability()
  }
}

</script>
<style lang='less'>
.addAppPublish{
  .el-dialog{
    width: 40%;
  }
  @media screen and (max-width:1450px){
    .el-dialog{
      width: 55%;
    }
  }
  .el-dialog--center{
    .el-dialog__header{
      text-align: left;
    }
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
        color: #adb0b8;
      }
    }
    .service_row:before{
      content: '';
      display: block;
      clear: both;
    }
    .service_title{
      .el-form-item__label{
        text-align: left;
        font-size: 18px;
        color: #606266;
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
    .fileP{
      .el-form-item__label{
        padding-top: 2px;
      }
    }
    .el-checkbox-group{
      text-align: left;
      float: left;
      width: calc( 100% - 120px );
    }
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
