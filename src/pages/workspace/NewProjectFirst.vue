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
      label-position="left"
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
        :label="$t('workspace.industry')"
        :label-width="formLabelWidth"
        prop="industry"
        class="platform"
      >
        <el-checkbox-group id="projectIndustry">
          <el-select
            v-model="form.industry"
            class="list-select"
            multiple
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
        class="platform"
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
        :label="$t('workspace.architecture')"
        :label-width="formLabelWidth"
        prop="platform"
        class="platform"
      >
        <el-checkbox-group id="projectArch">
          <el-select
            v-model="form.platform"
            class="list-select"
            multiple
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
        :label="$t('workspace.icon')"
        :label-width="formLabelWidth"
        prop="logoFileList"
      >
        <el-upload
          id="projectLogo"
          class="upload-demo"
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
          <div
            slot="tip"
            class="el-upload__tip"
          >
            <em class="el-icon-warning" />{{ $t('workspace.limitition') }}
          </div>
        </el-upload>
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
              :class="{ active: defaultActive === index }"
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
        base64Session: false
      },
      industryOptions: Industry,
      typeOptions: Type,
      architectureOptions: Architecture,
      value: 0,
      logoFileList: [],
      defaultActive: '',
      defaultIconFile: [],
      defaultIcon: [
        require('../../assets/images/appicon1.png'),
        require('../../assets/images/appicon2.png'),
        require('../../assets/images/appicon3.png')
      ],
      showErr: false,
      rules: {
        name: [
          { required: true, validator: validateProjectName, trigger: 'blur' },
          { pattern: /^(?=.*\S).{1,30}$/g, message: this.$t('promptMessage.nameRule') }
        ],
        version: [
          { required: true, validator: validateVersion, trigger: 'blur' },
          { pattern: /^(?=.*\S).{1,10}$/g, message: this.$t('promptMessage.versionRule') }
        ],
        provider: [
          { required: true, validator: validateProvider, trigger: 'blur' },
          { pattern: /^(?=.*\S).{1,30}$/g, message: this.$t('promptMessage.nameRule') }
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
          { pattern: /^(?=.*\S).{1,260}$/g, message: this.$t('promptMessage.introductionRule') }
        ]
      },
      formLabelWidth: '110px',
      language: localStorage.getItem('language')
    }
  },

  methods: {
    handleChangeLogo (file, fileList) {
      this.form.base64Session = true
      this.form.appIcon = []
      this.defaultIconFile = []
      this.defaultActive = ''
      this.logoFileList.push(file.raw)
      if (file.size / 1024 > 500) {
        this.$message.warning(this.$t('promptMessage.moreThan500'))
        this.logoFileList = []
      }
      let fileTypeArr = ['jpg', 'png']
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType) === -1) {
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
    chooseDefaultIcon (file, index) {
      this.form.base64Session = true
      this.logoFileList = []
      this.defaultIconFile = []
      if (this.defaultActive === index) {
        this.defaultActive = ''
      } else {
        this.defaultActive = index
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
    emitStepData () {
      // if (!this.form.appIcon.length) this.chooseDefaultIcon(this.defaultIcon[0], 1)
      this.$emit('getStepData', { data: this.form, step: 'first' })
    },
    changeDataLanguage () {
      let language = localStorage.getItem('language')
      this.language = language
    },
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
  mounted () {}
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
      .el-upload__tip{
        margin-top: 10px;
      }
    }
    .default-icon{
    display: flex;
    flex-wrap: wrap;
    .box{
      position: relative;
      width: 60px;
      height: 60px;
      margin: 10px 15px 10px 0;
      img{
        width: 56px;
        height: 56px;
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
    .el-form-item.platform{
      margin-bottom: 8px;
    }
    .el-upload-list__item:first-child{
      margin-top: 0;
    }
    .el-form-item__error{
      padding-top: 0;
    }
  }
</style>
