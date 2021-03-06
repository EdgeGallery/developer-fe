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
  <div class="firststep">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-position="right"
      class="clear"
    >
      <el-form-item
        :label="$t('workspace.appName')"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input
          id="projectName"
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.version')"
        :label-width="formLabelWidth"
        prop="version"
      >
        <el-input
          id="projectVersion"
          v-model="form.version"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.provider')"
        :label-width="formLabelWidth"
        prop="provider"
      >
        <el-input
          id="projectProvider"
          v-model="form.provider"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.deployType')"
        :label-width="formLabelWidth"
        prop="deployPlatform"
        class="f50 deployType"
      >
        <el-radio
          v-model="form.deployPlatform"
          label="KUBERNETES"
        >
          <em class="dockerDeploy" />
          {{ $t('workspace.containerImage') }}
        </el-radio>
        <el-radio
          v-model="form.deployPlatform"
          label="VIRTUALMACHINE"
        >
          <em class="vmDeploy" />
          {{ $t('workspace.vmImage') }}
        </el-radio>
      </el-form-item>
      <el-form-item
        :label="$t('workspace.architecture')"
        :label-width="formLabelWidth"
        prop="platform"
        class="f50"
      >
        <el-checkbox-group id="projectArch">
          <el-select
            v-model="form.platform[0]"
            class="list-select"
          >
            <el-option
              v-for="(item,index) in architectureOptions"
              :key="index"
              :label="item.label"
              :value="item.label"
              :id="item.label"
            />
          </el-select>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        :label="$t('workspace.industry')"
        :label-width="formLabelWidth"
        prop="industry"
        class="f50"
      >
        <el-checkbox-group id="projectIndustry">
          <el-select
            v-model="form.industry[0]"
            class="list-select"
            @change="checkProjectData"
          >
            <el-option
              v-for="(item,index) in industryOptions"
              :key="index"
              :label="language==='cn'?item.label[0]:item.label[1]"
              :value="item.value"
              :id="item.value"
            />
          </el-select>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        :label="$t('test.testApp.type')"
        :label-width="formLabelWidth"
        prop="type"
        class="f50"
      >
        <el-checkbox-group id="projectType">
          <el-select
            v-model="form.type"
            class="list-select"
            @change="changeIcon"
          >
            <el-option
              v-for="(item,index) in typeOptions"
              :key="index"
              :label="language==='cn'?item.label[0]:item.label[1]"
              :value="item.value"
              :id="item.value"
            />
          </el-select>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        :label="$t('workspace.icon')"
        :label-width="formLabelWidth"
        prop="logoFileList"
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
              :class="{ active: form.defaultActive === index }"
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
          :on-exceed="handleExceed"
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
      <el-form-item
        :label="$t('test.testApp.description')"
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input
          id="projectDescription"
          type="textarea"
          v-model="form.description"
          :placeholder="$t('test.testApp.description')"
          :rows="3"
          maxlength="1024"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Industry, Type, Architecture } from '../../tools/project_data.js'
import { Workspace } from '../../tools/api.js'
export default {
  name: '',
  props: {
    projectTypeprop: {
      type: String,
      default: 'CREATE_NEW'
    },
    allStepData: {
      type: Object,
      required: true
    },
    iconFileIdProp: {
      type: String,
      default: ''
    }
  },
  data () {
    let validateProjectName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('promptMessage.projectNameEmpty')))
      } else {
        return callback()
      }
    }
    let validateVersion = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('promptMessage.versionEmpty')))
      } else {
        return callback()
      }
    }
    let validateProvider = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('promptMessage.providerEmpty')))
      } else {
        return callback()
      }
    }
    let validateDescription = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('promptMessage.descriptionEmpty')))
      } else {
        return callback()
      }
    }
    return {
      form: {
        projectType: this.projectTypeprop,
        name: '',
        version: 'v1.0',
        provider: 'Huawei',
        industry: ['Smart Park'],
        type: 'Video Application',
        platform: ['X86'],
        appIcon: [],
        iconFileId: '',
        description: '',
        status: 'ONLINE',
        base64Session: false,
        defaultActive: '',
        deployPlatform: 'KUBERNETES'
      },
      industryOptions: Industry,
      typeOptions: Type,
      architectureOptions: Architecture,
      value: 0,
      logoFileList: [],
      defaultIconFile: [],
      defaultIconData: [
        require('../../assets/images/project_videoapp.png'),
        require('../../assets/images/project_game.png'),
        require('../../assets/images/project_videosur.png'),
        require('../../assets/images/project_security.png'),
        require('../../assets/images/project_blockchain.png'),
        require('../../assets/images/project_smartdevice.png'),
        require('../../assets/images/project_iot.png'),
        require('../../assets/images/project_data.png'),
        require('../../assets/images/project_vr.png'),
        require('../../assets/images/project_api.png'),
        require('../../assets/images/project_sdk.png'),
        require('../../assets/images/project_mep.png')
      ],
      defaultIcon: [
        require('../../assets/images/project_videoapp.png')
      ],
      showErr: false,
      rules: {
        name: [
          { required: true, validator: validateProjectName, trigger: 'blur' },
          { pattern: /^(?!_)(?!-)(?!\s)(?!.*?_$)(?!.*?-$)(?!.*?\s$)(?![0-9]+$)[a-zA-Z0-9_-]{4,32}$/, message: this.$t('promptMessage.nameRule') }
        ],
        version: [
          { required: true, validator: validateVersion, trigger: 'blur' },
          { pattern: /^[\w\\-][\w\\-\s.]{0,9}$/g, message: this.$t('promptMessage.versionRule') }
        ],
        provider: [
          { required: true, validator: validateProvider, trigger: 'blur' },
          { pattern: /^\S.{0,29}$/g, message: this.$t('promptMessage.providerRule') }
        ],
        deployPlatform: [
          { required: true, message: this.$t('promptMessage.deployTypeEmpty') }
        ],
        industry: [
          { required: true, message: this.$t('promptMessage.industryEmpty') }
        ],
        type: [
          { required: true }
        ],
        platform: [
          { required: true, message: this.$t('promptMessage.architectureEmpty'), trigger: 'change' }
        ],
        logoFileList: [
          { required: true, message: 'Icon is required', trigger: 'change' }
        ],
        description: [
          { required: true, validator: validateDescription, trigger: 'blur' },
          { pattern: /^(?!\s)(?![0-9]+$)[\S.\s\n\r]{1,1024}$/g, message: this.$t('promptMessage.introductionRule') }
        ]
      },
      formLabelWidth: '110px',
      language: localStorage.getItem('language'),
      uploadIcon: false,
      userId: sessionStorage.getItem('userId')
    }
  },

  methods: {
    // When returning to the first step. fetch first step data
    getFirstData () {
      if (this.allStepData.first) {
        this.form = this.allStepData.first
        if (this.form.defaultActive !== '') {
          this.logoFileList = []
          this.changeIcon(this.allStepData.first.type)
        } else {
          this.logoFileList = this.form.appIcon
          let iconUrl = this.getIcon(this.iconFileIdProp)
          let currUrl = window.location.origin
          this.logoFileList[0].url = currUrl + iconUrl
          this.handleChangeLogo(this.logoFileList[0])
        }
      } else {
        this.chooseDefaultIcon(this.defaultIcon[0], 0)
      }
    },
    // Get project Icon
    getIcon (fileId) {
      return Workspace.getIconApi(fileId, this.userId)
    },
    changeIcon (val) {
      this.form.base64Session = true
      this.defaultIconFile = []
      this.form.defaultActive = 0
      switch (val) {
        case 'Video Application':
          this.defaultIcon.splice(0, 1, this.defaultIconData[0])
          break
        case 'Game':
          this.defaultIcon.splice(0, 1, this.defaultIconData[1])
          break
        case 'Video Surveillance':
          this.defaultIcon.splice(0, 1, this.defaultIconData[2])
          break
        case 'Safety':
          this.defaultIcon.splice(0, 1, this.defaultIconData[3])
          break
        case 'Blockchain':
          this.defaultIcon.splice(0, 1, this.defaultIconData[4])
          break
        case 'Smart Device':
          this.defaultIcon.splice(0, 1, this.defaultIconData[5])
          break
        case 'Internet of Things':
          this.defaultIcon.splice(0, 1, this.defaultIconData[6])
          break
        case 'Big Data':
          this.defaultIcon.splice(0, 1, this.defaultIconData[7])
          break
        case 'AR/VR':
          this.defaultIcon.splice(0, 1, this.defaultIconData[8])
          break
        case 'API':
          this.defaultIcon.splice(0, 1, this.defaultIconData[9])
          break
        case 'SDK':
          this.defaultIcon.splice(0, 1, this.defaultIconData[10])
          break
        case 'MEP':
          this.defaultIcon.splice(0, 1, this.defaultIconData[11])
          break
      }
      if (this.logoFileList.length !== 0) {
        this.handleChangeLogo(this.logoFileList[0])
      } else {
        this.conversionIcon(this.defaultIcon[0])
      }
      this.checkProjectData()
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
          this.$message.warning(this.$t('promptMessage.fileNameType'))
          this.logoFileList = []
        } else {
          this.logoFileList.push(file)
          listTemp.push(file)
          this.form.appIcon = listTemp
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
    handleExceed (file, fileList) {
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
      let image = new Image()
      image.src = file
      image.onload = () => {
        // Transfer static pic to base64 format
        let base64 = this.getBase64Image(image)
        // Transfer base64 format to file steam
        this.defaultIconFile.push(this.base64toFile(base64))
        this.form.appIcon = this.defaultIconFile
        this.showErr = !this.defaultIconFile
      }
    },
    // Pass the parameters to parent component
    emitStepData () {
      this.$emit('getStepData', { data: this.form, step: 'first' })
    },
    changeDataLanguage () {
      let language = localStorage.getItem('language')
      this.language = language
    },
    // Translate to English
    checkProjectData () {
      Industry.forEach(itemFe => {
        let pos = this.form.industry.indexOf(itemFe.label[0])
        if (pos !== -1) {
          this.form.industry.splice(pos, 1, itemFe.label[1])
        }
      })
      Type.forEach(itemFe => {
        if (this.form.type === itemFe.label[0]) {
          this.form.type = itemFe.label[1]
        }
      })
    },
    // Adjust width when language changes
    editWidth () {
      let selectWidth = document.getElementsByClassName('el-form-item__content')
      if (this.language === 'cn') {
        this.formLabelWidth = '110px'
        selectWidth.forEach(item => {
          item.style.width = 'calc(100% - 110px)'
        })
      } else {
        this.formLabelWidth = '160px'
        selectWidth.forEach(item => {
          item.style.width = 'calc(100% - 160px)'
        })
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.changeDataLanguage()
      this.$refs['form'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['form'].validateField(item.labelFor)
        }
      })
    }
  },
  mounted () {
    this.getFirstData()
    this.editWidth()
  }
}
</script>

<style lang="less">
  .firststep{
    .el-input__inner{
      height: 35px;
      line-height: 35px;
    }
    .list-select input{
      height: 35px;
      line-height: 35px;
    }
    .el-form-item__label{
      padding: 0 20px 0 0;
      font-size: 16px;
      color: #adb0bb;
    }
    .deployType em,.deployType .is-checked em{
      width: 28px;
      height: 28px;
      display: inline-block;
      background-size: cover;
      position: relative;
      top: 9px;
    }
    .dockerDeploy{
      background: url('../../assets/images/deploy_docker_dis.png') center center no-repeat;
    }
    .vmDeploy{
      background: url('../../assets/images/deploy_vm_dis.png') center center no-repeat;
    }
    .is-checked .dockerDeploy{
      background: url('../../assets/images/deploy_docker.png') center center no-repeat;
    }
    .is-checked .vmDeploy{
      background: url('../../assets/images/deploy_vm.png') center center no-repeat;
    }
    .el-radio__input.is-checked .el-radio__inner{
      background-color: #688ef3;
      border-color: #688ef3;
    }
    .el-radio__input.is-checked+.el-radio__label{
      color: #688ef3;
    }
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
    .el-form-item.icon{
      content: '';
      display: block;
      clear: both;
    }
    .f50{
      float: left;
      width: 50%;
      .el-form-item__content{
        width: calc(100% - 110px);
      }
      .el-select{
        width: 100%;
      }
    }
    .el-upload-list{
      width: auto;
      /* width: 40px;
      height: 40px;
      margin-right: 15px; */
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
</style>
