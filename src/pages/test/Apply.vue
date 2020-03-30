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
                  <i class="el-icon-warning" />{{ $t('test.testApp.appFormat') }}
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
                  <i class="el-icon-warning" />{{ $t('test.testApp.logoFormat') }}
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
              :label="$t('test.testApp.affinity')"
              prop="affinity"
            >
              <el-checkbox-group
                id="affinintyCheckbox"
                v-model="form.affinity"
                v-loading="tagsLoading"
              >
                <el-checkbox
                  v-for="(item,index) in appTagList"
                  :id="item"
                  :key="index"
                  :label="item"
                />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              :label="$t('test.testApp.type')"
              prop="type"
            >
              <el-checkbox-group>
                <el-select
                  id="selectAppType"
                  v-model="form.type"
                  class="list-select"
                  :placeholder="$t('test.testApp.type')"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
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
import { Post, Get } from './../../tools/tool.js'
export default {
  name: 'Apply',
  data () {
    return {
      form: {
        affinity: [],
        appIcon: [],
        appDesc: '',
        userId: '',
        type: ''
      },
      rules: {
        appFileList: [
          { required: true }
        ],
        logoFileList: [
          { required: true }
        ],
        affinity: [
          { required: true }
        ],
        type: [
          { required: true }
        ],
        appDesc: [
          { required: true }
        ]
      },
      appFileList: [],
      logoFileList: [],
      appTagList: [],
      defaultActive: '',
      defaultIconFile: '',
      defaultIcon: [
        require('../../assets/images/appicon1.png'),
        require('../../assets/images/appicon2.png'),
        require('../../assets/images/appicon3.png')
      ],
      options: [
        {
          value: 0,
          label: 'Video'
        }, {
          value: 1,
          label: 'Game'
        }, {
          value: 2,
          label: 'Video Surveillance'
        }, {
          value: 3,
          label: 'AR'
        }, {
          value: 4,
          label: 'Calculate'
        }, {
          value: 5,
          label: 'MEP'
        }
      ],
      value: '',
      uploadBtnLoading: false,
      tagsLoading: true
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
      formdata.append('logoFile', this.form.appIcon.length > 0 ? this.form.appIcon[0] : this.defaultIconFile)
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
      let logoFileList = this.logoFileList.length || this.defaultIconFile
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
      this.defaultIconFile = ''
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
          this.defaultIconFile = this.base64toFile(base64)
        }
      }
    }
  },
  mounted () {
    let url = 'mec/developer/v1/apps/tags'
    Get(url).then(res => {
      this.appTagList = res.data.tags
      this.tagsLoading = false
    })
    this.form.userId = sessionStorage.getItem('userId')

    let defaultImg = this.defaultIcon[0]
    let image = new Image()
    image.src = defaultImg
    image.onload = () => {
      // 将静态图片转化为base64
      let base64 = this.getBase64Image(image)
      // base64转化为文件流
      this.defaultIconFile.push(this.base64toFile(base64))
      this.form.appIcon = this.defaultIconFile
    }
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
      // border: 1px solid #eee;
      width: 64px;
      height: 64px;
      margin: 10px 15px 10px 0;
      img{
        width: 60px;
        height: 60px;
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
