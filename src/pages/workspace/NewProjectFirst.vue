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
        class="f50"
      >
        <el-radio
          v-model="form.deployPlatform"
          label="KUBERNETES"
        >
          {{ $t('workspace.containerImage') }}
        </el-radio>
        <el-radio
          v-model="form.deployPlatform"
          label="VIRTUALMACHINE"
          :disabled="!ifVM"
        >
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
            @change="checkProjectData"
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
        <el-upload
          id="projectLogo"
          class="upload-demo clear"
          ref="upload"
          action=""
          :limit="1"
          :file-list="logoFileList"
          :on-change="handleChangeLogo"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :on-remove="removeUploadLogo"
          accept=".jpg,.png"
          name="file"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >
            {{ $t('workspace.uploadIcon') }}
          </el-button>
          <el-tooltip
            class="item"
            effect="dark"
            :content="this.$t('workspace.limitition')"
            placement="right"
          >
            <em class="el-icon-question" />
          </el-tooltip>
        </el-upload>
        <div class="default-icon">
          <div
            class="box"
            v-for="(item, index) in defaultIcon"
            @click="chooseDefaultIcon(item.src, index)"
            :key="item.src"
          >
            <img
              :src="item.src"
              :alt="item.name"
              :title="item.name"
            >
            <em
              class="el-icon-success"
              :class="{ active: form.defaultActive === index }"
            />
          </div>
        </div>
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
          :rows="2"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Industry, Type, Architecture } from '../../tools/project_data.js'
export default {
  name: '',
  props: {
    projectTypeprop: {
      type: String,
      default: 'CREATE_NEW'
    },
    allStepData: {
      type: Object,
      default: () => {}
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
        name: 'Video_Surveillance_app',
        version: '1.0',
        provider: 'Huawei',
        industry: ['Smart Park'],
        type: 'Video Application',
        platform: ['x86'],
        appIcon: [],
        iconFileId: '',
        description: '',
        status: 'ONLINE',
        base64Session: false,
        defaultActive: '',
        deployPlatform: 'KUBERNETES'
      },
      ifVM: false,
      industryOptions: Industry,
      typeOptions: Type,
      architectureOptions: Architecture,
      value: 0,
      logoFileList: [],
      defaultIconFile: [],
      defaultIcon: [
        {
          src: require('../../assets/images/project_videoapp.png'),
          name: '视频应用'
        },
        {
          src: require('../../assets/images/project_game.png'),
          name: '游戏'
        },
        {
          src: require('../../assets/images/project_videosur.png'),
          name: '视频监控'
        },
        {
          src: require('../../assets/images/project_security.png'),
          name: '安全'
        },
        {
          src: require('../../assets/images/project_blockchain.png'),
          name: '区块链'
        },
        {
          src: require('../../assets/images/project_smartdevice.png'),
          name: '智能设备'
        },
        {
          src: require('../../assets/images/project_iot.png'),
          name: '物联网'
        },
        {
          src: require('../../assets/images/project_data.png'),
          name: '大数据'
        },
        {
          src: require('../../assets/images/project_vr.png'),
          name: 'AR/VR'
        },
        {
          src: require('../../assets/images/project_api.png'),
          name: 'API'
        },
        {
          src: require('../../assets/images/project_sdk.png'),
          name: 'SDK'
        },
        {
          src: require('../../assets/images/project_mep.png'),
          name: 'MEP'
        }
      ],
      showErr: false,
      rules: {
        name: [
          { required: true, validator: validateProjectName, trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9][\w\\-\s]{3,127}$/g, message: this.$t('promptMessage.nameRule') }
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
          { pattern: /^\S.{0,259}$/g, message: this.$t('promptMessage.introductionRule') }
        ]
      },
      formLabelWidth: '110px',
      language: localStorage.getItem('language')
    }
  },

  methods: {
    // 退回到第一步时，保留上一次选择
    getFirstData () {
      if (this.allStepData.first) {
        this.form = this.allStepData.first
        if (this.form.defaultActive !== '') {
          this.form.logoFileList = []
        } else {
          this.logoFileList = this.form.appIcon
        }
      }
    },
    // 上传图标
    handleChangeLogo (file, fileList) {
      this.form.base64Session = true
      this.form.appIcon = []
      this.defaultIconFile = []
      this.form.defaultActive = ''
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$message.warning(this.$t('promptMessage.fileNameType'))
        this.logoFileList = []
      } else {
        this.logoFileList.push(file.raw)
      }
      if (file.size / 1024 / 1024 > 2) {
        this.$message.warning(this.$t('promptMessage.moreThan2'))
        this.logoFileList = []
      }
      let fileTypeArr = ['jpg', 'png']
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
        this.$message.warning(this.$t('promptMessage.checkFileType'))
        this.logoFileList = []
      }
      this.showErr = !this.logoFileList
      this.form.appIcon = this.logoFileList
    },
    removeUploadLogo (file, fileList) {
      this.logoFileList = fileList
      this.showErr = this.logoFileList
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
    // 选择默认图标
    chooseDefaultIcon (file, index) {
      this.form.base64Session = true
      this.logoFileList = []
      this.defaultIconFile = []
      if (this.form.defaultActive === index) {
        this.form.defaultActive = ''
      } else {
        this.form.defaultActive = index
        let image = new Image()
        image.src = file
        image.onload = () => {
          // 将静态图片转化为base64
          let base64 = this.getBase64Image(image)
          // base64转化为文件流
          this.defaultIconFile.push(this.base64toFile(base64))
          this.form.appIcon = this.defaultIconFile
          this.showErr = !this.defaultIconFile
        }
      }
    },
    // 将基本信息传值给父组件
    emitStepData () {
      this.$emit('getStepData', { data: this.form, step: 'first' })
    },
    changeDataLanguage () {
      let language = localStorage.getItem('language')
      this.language = language
    },
    // 行业、类型的选型中英文切换
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
    // 中英文切换修改左侧标题宽度
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
  created () {
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
    if (sessionStorage.getItem('ifVM') === 'true') {
      this.ifVM = true
    }
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
    .el-radio__input.is-checked .el-radio__inner{
      background-color: #688ef3;
      border-color: #688ef3;
    }
    .el-radio__input.is-checked+.el-radio__label{
      color: #688ef3;
    }
    .upload-demo{
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
      }
      .el-icon-question:before {
        color: #688ef3;
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .default-icon{
      float: left;
      display: flex;
      flex-wrap: wrap;
      .box{
        position: relative;
        width: 44px;
        height: 44px;
        margin: 5px 15px 0 0;
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
          font-weight: 800;
        }
      }
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
    .el-upload-list__item:first-child{
      margin-top: 0;
    }
    .el-form-error{
      padding-top: 0;
    }
  }
</style>
