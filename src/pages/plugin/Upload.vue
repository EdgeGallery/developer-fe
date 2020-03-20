<template>
  <div class="upload">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/list#1' }">
        {{ $t('breadCrumb.devTools') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item><a>{{ $t('breadCrumb.upload') }}</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="upload-main">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
            label-position="left"
          >
            <el-form-item
              :label="$t('devTools.pluginName')"
              prop="pluginName"
            >
              <el-input
                id="pluginName"
                v-model="form.pluginName"
                name="pluginName"
                class="input"
              />
            </el-form-item>
            <el-form-item
              :label="$t('devTools.pluginFunction')"
              prop="codeLanguage"
            >
              <el-select
                id="selectFunction"
                v-model="form.codeLanguage"
                :placeholder="$t('devTools.pluginFunction')"
                name="codeLanguage"
                class="list-select"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                  :id="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('devTools.uploadPlugin')"
              prop="plugFileList"
            >
              <el-upload
                id="uploadPlugin"
                class="upload-demo"
                ref="uploadFile"
                action=""
                :limit="1"
                :on-change="handleChangePlug"
                :on-exceed="handleExceed"
                :file-list="plugFileList"
                :auto-upload="false"
                :on-remove="removeUpload"
                accept=".csar,.zip,.rar"
                name="pluginFile"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >
                  {{ $t('devTools.uploadPlugin') }}
                </el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  <i class="el-icon-warning" />{{ $t('devTools.fileText') }}
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item
              :label="$t('devTools.uploadLogo')"
              prop="logoFileList"
            >
              <el-upload
                id="uploadLogo"
                class="upload-demo"
                ref="uploadLogo"
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
                  {{ $t('devTools.uploadLogo') }}
                </el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  <i class="el-icon-warning" />{{ $t('devTools.logoText') }}
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
                  <i
                    class="el-icon-success"
                    :class="{ active: defaultActive === index }"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item
              :label="$t('devTools.uploadApi')"
              prop="apiFileList"
            >
              <el-upload
                id="uploadApi"
                class="upload-demo"
                ref="uploadApi"
                action=""
                :limit="1"
                :on-change="handleChangeApi"
                :on-exceed="handleExceed"
                :file-list="apiFileList"
                :auto-upload="false"
                :on-remove="removeUploadapi"
                accept=".json,.yaml"
                name="apiFile"
              >
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                >
                  {{ $t('devTools.uploadApi') }}
                </el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >
                  <i class="el-icon-warning" />{{ $t('devTools.apiText') }}
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item
              :label="$t('devTools.version')"
              prop="version"
            >
              <el-input
                id="inputVersion"
                v-model="form.version"
                name="version"
                class="input"
              />
            </el-form-item>
            <el-form-item
              :label="$t('devTools.description')"
              prop="introduction"
            >
              <el-input
                id="inputDescription"
                type="textarea"
                v-model="form.introduction"
                name="introduction"
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
                {{ $t('devTools.uploadNow') }}
              </el-button>
              <el-button id="cancelBtn">
                {{ $t('common.cancel') }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Post } from './../../tools/tool.js'
export default {
  name: 'Upload',
  data () {
    return {
      form: {
        pluginName: '',
        codeLanguage: '',
        pluginType: 1,
        version: '',
        introduction: '',
        userName: '',
        pluginSize: 0,
        appIcon: []
      },
      plugFileList: [],
      logoFileList: [],
      apiFileList: [],
      rules: {
        pluginName: [
          { required: true }
        ],
        codeLanguage: [
          { required: true }
        ],
        pluginType: [
          { required: true }
        ],
        plugFileList: [
          { required: true }
        ],
        logoFileList: [
          { required: true }
        ],
        apiFileList: [
          { required: true }
        ],
        version: [
          { required: true }
        ],
        introduction: [
          { required: true }
        ]
      },
      options: [
        {
          value: 0,
          label: 'JAVA'
        }, {
          value: 1,
          label: 'Python'
        }, {
          value: 2,
          label: 'Go'
        }, {
          value: 3,
          label: '.Net'
        }, {
          value: 4,
          label: 'PHP'
        }
      ],
      optionsType: [
        {
          value: 1,
          label: 'Plugin'
        }, {
          value: 2,
          label: 'SDK'
        }
      ],
      defaultActive: '',
      defaultIconFile: '',
      defaultIcon: [
        require('../../assets/images/go.png'),
        require('../../assets/images/java.png'),
        require('../../assets/images/net.png'),
        require('../../assets/images/node.png'),
        require('../../assets/images/php.png'),
        require('../../assets/images/python.png')
      ],
      uploadBtnLoading: false
    }
  },
  mounted () {
    let userJsonStr = sessionStorage.getItem('userId')
    let user = JSON.parse(userJsonStr)
    this.form.userName = user.username
  },
  created () {
    this.keyupSubmit()
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
      formdata.append('pluginFile', this.plugFileList[0])
      formdata.append('logoFile', this.form.appIcon.length > 0 ? this.form.appIcon[0] : this.defaultIconFile)
      formdata.append('apiFile', this.apiFileList[0])
      let url = 'mec/developer/v1/plugins/'
      Post(url, formdata).then(res => {
        this.$message({
          message: this.$t('promptMessage.uploadSuccess'),
          type: 'success'
        })
        let href
        if (this.form.pluginType === 1) {
          href = '/mecDeveloper/plugin/list#1'
        }
        this.$router.push(href)
      }).catch(err => {
        this.$message.error(this.$t('promptMessage.uploadFailure'))
        console.log(err)
        this.uploadBtnLoading = false
      })
    },
    // 确认上传
    submitTrue () {
      this.uploadBtnLoading = true
      let pluginName = this.form.pluginName
      let codeLanguage = this.form.codeLanguage
      let pluginType = this.form.pluginType
      let plugFileList = this.plugFileList.length
      let logoFileList = this.logoFileList.length || this.defaultIconFile
      let apiFileList = this.apiFileList.length
      let version = this.form.version
      let introduction = this.form.introduction
      if (!pluginName) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.pluginNameEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!codeLanguage) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.pluginFunEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!pluginType) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.plugTypeEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!plugFileList) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.pluginFileEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!logoFileList) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.logoEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!apiFileList) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.apiEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!version) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.versionEmpty')
        })
        this.uploadBtnLoading = false
      } else if (!introduction) {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.descriptionEmpty')
        })
        this.uploadBtnLoading = false
      } else {
        this.onSubmit()
      }
    },
    handleChangeLogo (file, fileList) {
      this.form.appIcon = []
      this.defaultIconFile = ''
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
    handleChangePlug (file, fileList) {
      this.$store.state.pluginSize = file.size / 1024 / 1024
      this.plugFileList.push(file.raw)
      if (file.size / 1024 / 1024 > 10) {
        this.$message.warning(this.$t('promptMessage.moreThan150'))
        this.plugFileList = []
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    handleChangeApi (file, fileList) {
      this.apiFileList.push(file.raw)
    },
    removeUpload (file, fileList) {
      this.plugFileList = fileList
    },
    removeUploadLogo (file, fileList) {
      this.logoFileList = fileList
    },
    removeUploadapi (file, fileList) {
      this.apiFileList = fileList
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
      this.defaultIconFile = ''
      if (this.defaultActive === index) {
        this.defaultActive = ''
      } else {
        this.defaultActive = index
        let image = new Image()
        image.src = file
        // 将静态图片转化为base64
        let base64 = this.getBase64Image(image)
        // base64转化为文件流
        this.defaultIconFile = this.base64toFile(base64)
      }
    }
  }
}
</script>

<style lang='less'>
.upload{
  .upload-main{
    background-color: #fff;
    padding: 40px;
    input{
      height: 30px;
      line-height: 30px;
    }
    .input{
      width: 300px;
    }
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
    .el-button--primary{
      background-color: #688ef3;
      color: #fff;
    }
    .el-button--default{
      background-color: none;
      color: #688ef3;
      border: 1px solid #688ef3;
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
  .hidden{ height: 0; overflow: hidden;}
  .default-icon{
      display: flex;
      flex-wrap: wrap;
      .box{
        position: relative;
        border: 1px solid #eee;
        width: 68px;
        height: 68px;
        margin: 20px 15px 0px 0;
        img{
          width: 68px;
          height: 68px;
        }
        i{
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
