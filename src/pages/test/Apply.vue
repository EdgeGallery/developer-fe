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
  <div class="apply">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/test/how' }">
        {{ $t('breadCrumb.test') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item><a>{{ $t('breadCrumb.testApplication') }}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="apply-main">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item
              :label="$t('test.testApp.uploadApp')"
              prop="appFileList"
            >
              <el-upload
                id="uploadApp"
                class="upload-demo"
                ref="upload"
                action
                :limit="1"
                :file-list="appFileList"
                :on-change="handleAppChanged"
                :on-remove="removeUpload"
                :on-exceed="handleExceed"
                :auto-upload="false"
                accept=".csar"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >
                  {{ $t('test.testApp.uploadApp') }}
                </el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  <em class="el-icon-warning" />{{ $t('test.testApp.appFormat') }}
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item
              :label="$t('test.testApp.uploadLogo')"
              prop="logoFileList"
              class="logo_div"
            >
              <el-upload
                id="uploadLogo"
                class="upload-demo"
                ref="upload"
                action
                :limit="1"
                :file-list="logoFileList"
                :on-change="handleLogoChanged"
                :on-exceed="handleExceed"
                :on-remove="handleDelteAppIcon"
                :auto-upload="false"
                accept=".jpg,.png"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  class="uploadBtn"
                >
                  {{ $t('test.testApp.uploadLogo') }}
                </el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  <em class="el-icon-warning" />{{ $t('test.testApp.logoFormat') }}
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
            </el-form-item>
            <el-form-item
              :label="$t('workspace.industry')"
              prop="industry"
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
              prop="type"
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
              prop="affinity"
            >
              <el-checkbox-group id="projectArch">
                <el-select
                  v-model="form.affinity"
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
              :label="$t('test.testApp.description')"
              prop="appDesc"
            >
              <el-input
                id="appDescription"
                type="textarea"
                v-model="form.appDesc"
                :placeholder="$t('test.testApp.description')"
                :rows="4"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                id="uploadBtn"
                type="primary"
                :loading="uploadBtnLoading"
                @click="submitTrue"
              >
                {{ $t('test.testApp.upload') }}
              </el-button>
              <el-button
                id="cancelBtn"
                @click="resetForm('form')"
              >
                {{ $t('test.testTask.reset') }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Industry, Type, Architecture } from '../../tools/project_data.js'
import { Post, Get } from './../../tools/tool.js'
export default {
  name: 'Apply',
  data () {
    let validateDesc = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('promptMessage.descriptionEmpty')))
      } else {
        return callback()
      }
    }
    return {
      form: {
        affinity: ['x86'],
        appIcon: [],
        appDesc: '',
        userId: '',
        industry: ['Smart Park'],
        type: 'Video Application'
      },
      industryOptions: Industry,
      typeOptions: Type,
      architectureOptions: Architecture,
      rules: {
        appFileList: [
          { required: true }
        ],
        logoFileList: [
          { required: true }
        ],
        industry: [
          { required: true, message: this.$t('promptMessage.industryEmpty') }
        ],
        type: [
          { required: true }
        ],
        affinity: [
          { required: true, message: this.$t('promptMessage.architectureEmpty') }
        ],
        appDesc: [
          { required: true, validator: validateDesc }
        ]
      },
      appFileList: [],
      logoFileList: [],
      defaultActive: '',
      defaultIconFile: [],
      defaultIcon: [
        require('../../assets/images/appicon1.png'),
        require('../../assets/images/appicon2.png'),
        require('../../assets/images/appicon3.png')
      ],
      uploadBtnLoading: false,
      language: localStorage.getItem('language')
    }
  },
  methods: {
    keyupSubmit () {
      document.onkeydown = e => {
        let _key = window.event.keyCode
        if (_key === 13) {
          this.submitTrue()
        }
      }
    },
    // 提交上传
    onSubmit () {
      let formdata = new FormData()
      Object.keys(this.form).forEach(item => {
        formdata.append(item, this.form[item])
      })
      formdata.append('appFile', this.appFileList[0])
      formdata.append('logoFile', this.form.appIcon.length > 0 ? this.form.appIcon[0] : this.defaultIconFile[0])
      console.log(formdata)
      let url = 'mec/developer/v1/apps/'
      Post(url, formdata).then(res => {
        let appId = res.data.appId
        this.$nextTick(this.startTest(appId))
      }).catch(err => {
        this.$message.error(this.$t('promptMessage.uploadFailure'))
        console.log(err)
        this.uploadBtnLoading = false
      })
    },
    // 确认上传
    submitTrue () {
      this.uploadBtnLoading = true
      let appFileList = this.appFileList.length
      let logoFileList = this.logoFileList.length || this.defaultIconFile.length
      let affinity = this.form.affinity.length
      let type = this.form.type
      let appDesc = this.form.appDesc
      if (!appFileList) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.appEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!logoFileList) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.logoEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!affinity) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.affinityEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!type) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.typeEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!appDesc) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.descriptionEmpty')
        })
        this.uploadBtnLoading = false
      } else {
        this.onSubmit()
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    startTest (appId) {
      let url = 'mec/developer/v1/apps/' + appId + '/action/start-test?userId=' + this.form.userId
      Get(url).then(res => {
        this.uploadBtnLoading = false
        this.$message({
          message: this.$t('promptMessage.testSuccess'),
          type: 'success'
        })
        this.$router.push('/mecDeveloper/test/task')
      }).catch(err => {
        this.$message.error(this.$t('promptMessage.testFail'))
        console.log(err)
        this.uploadBtnLoading = false
      })
    },
    handleAppChanged (file, fileList) {
      this.appFileList.push(file.raw)
      if (file.size / 1024 / 1024 > 10) {
        this.$message.warning(this.$t('promptMessage.moreThan10M'))
        this.appFileList = []
      }
    },
    removeUpload (file, fileList) {
      this.appFileList = fileList
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    handleLogoChanged (file, filelist) {
      this.form.appIcon = []
      this.defaultIconFile = []
      this.defaultActive = ''
      this.logoFileList.push(file.raw)
      if (file.size / 1024 > 500) {
        this.$message.warning(this.$t('promptMessage.moreThan500'))
        this.logoFileList = []
      }
      let type = file.raw.type.split('/')[0]
      if (type === 'image') {
        this.form.appIcon.push(file.raw)
      } else {
        this.form.appIcon = []
        this.$message({
          type: 'warning',
          message: 'Please upload pictures.'
        })
      }
    },
    handleDelte (file, fileList) {
      this.appFileList = fileList
    },
    handleDelteAppIcon (file, fileList) {
      this.logoFileList = fileList
    },
    getBase64Image (img) {
      let canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      let ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
      let dataURL = canvas.toDataURL('image/' + ext)
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
        }
      }
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
  watch: {
    '$i18n.locale': function () {
      this.changeDataLanguage()
      this.checkProjectData()
      this.$refs['form'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['form'].validateField(item.labelFor)
        }
      })
    }
  },
  mounted () {
    this.form.userId = sessionStorage.getItem('userId')
  },
  created () {
    this.keyupSubmit()
  }
}
</script>

<style lang='less'>
.apply{
  .apply-main{
    background-color: #fff;
    padding: 40px;
    .el-upload{
      float: left;
      margin-right: 20px;
      .el-button--primary{
        background-color: #fff;
        border-color: #688ef3;
        color: #282B33;
        padding: 6px 20px;
        margin-top: 8px;
      }
    }
    .el-icon-warning{
      color: #688ef3;
      margin-right: 5px;
      font-size: 14px;
    }
    .upload-demo .el-upload__tip{
      margin-top: 0;
    }
    .list-select input{
      height: 30px;
      line-height: 30px;
    }
    .el-button{
      padding: 8px 20px;
    }
    .el-button--primary{
      background-color: #688ef3;
    }
    .el-button.el-button--default{
      background-color: none;
      color: #688ef3;
      border: 1px solid #688ef3;
    }
  }
  .el-form-item.logo_div{
    margin-bottom: 10px;
  }
  .default-icon{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .box{
      position: relative;
      width: 64px;
      height: 64px;
      margin: 10px 15px 10px 0;
      img{
        width: 60px;
        height: 60px;
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
  .el-upload-list{
    line-height: 25px;
  }

  .el-upload-list__item{
    margin-bottom: 10px;
  }
}

</style>
