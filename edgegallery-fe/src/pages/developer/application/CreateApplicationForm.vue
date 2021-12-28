<template>
  <div class="new-application">
    <h3 class="common-dlg-title lt">
      {{ $t('incubation.appInfo') }}
    </h3>
    <div>
      <el-form
        :model="applicationFormData"
        :rules="applicationFormRules"
        ref="applicationForm"
        class="common-form"
        label-width="170px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          :label="$t('incubation.appName')"
          class="cb"
          prop="name"
        >
          <el-input
            v-model="applicationFormData.name"
            minlength="2"
            maxlength="35"
          />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.version')"
          class="label-item-half"
          prop="version"
        >
          <el-input
            v-model="applicationFormData.version"
            minlength="2"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.provider')"
          class="label-item-half"
          prop="provider"
        >
          <el-input
            v-model="applicationFormData.provider"
            minlength="2"
            maxlength="35"
          />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.appClass')"
          class="label-item-half"
        >
          <el-select
            v-model="applicationFormData.appClass"
            :placeholder="$t('incubation.chooseAppClass')"
          >
            <el-option
              :label="$t('incubation.container')"
              value="CONTAINER"
            />
            <el-option
              :label="$t('incubation.vm')"
              value="VM"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('incubation.architecture')"
          class="label-item-half"
        >
          <el-select
            v-model="applicationFormData.architecture"
            :placeholder="$t('incubation.chooseArchitecture')"
          >
            <el-option
              v-for="item in architectureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('incubation.industry')"
          class="label-item-half"
        >
          <el-select
            v-model="applicationFormData.industry"
            :placeholder="$t('incubation.chooseIndustry')"
          >
            <el-option
              v-for="item in industryOptions"
              :key="item.value"
              :label="language==='cn'?item.label[0]:item.label[1]"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('incubation.type')"
          class="label-item-half"
        >
          <el-select
            v-model="applicationFormData.type"
            :placeholder="$t('incubation.chooseType')"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="language==='cn'?item.label[0]:item.label[1]"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('incubation.logo')"
          class="label-item-half choose-icon"
        >
          <div class="upload-comp">
            <div
              class="default-icon cp"
              :class="isUploadIcon?'':'choose-default-icon'"
              @click="removeLogo"
            />
            <div class="or">
              {{ $t('incubation.or') }}
            </div>
            <div :class="{'upload-icon':logoFileList.length>0}">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                action=""
                :show-file-list="false"
                :file-list="logoFileList"
                :on-change="handleChangeLogo"
                :auto-upload="false"
                accept=".jpg,.png"
                name="file"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar"
                  alt=""
                >
                <em
                  v-else
                  class="el-icon-plus el-icon-plus-app"
                />
                <el-tooltip
                  effect="dark"
                  :content="$t('incubation.logoLimit')"
                  placement="right"
                >
                  <em
                    class="common-info icon-upload-info"
                    :class="{'icon-info-active':logoFileList.length>0}"
                  />
                </el-tooltip>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('incubation.guideDoc')"
          class="label-item-half"
        >
          <el-upload
            class="upload-demo lt"
            :on-change="handleChangeMd"
            :auto-upload="false"
            action=""
            multiple
            :limit="1"
            :on-exceed="handleMdExceed"
            :on-remove="removeMdFile"
            :file-list="mdFileList"
            accept=".md"
          >
            <el-button
              size="small"
              type="primary"
              class="inner-btn"
            >
              {{ $t('incubation.upload') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="$t('incubation.docLimit')"
              placement="right"
            >
              <em class="common-info  guide-upload-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('incubation.description')"
          class="cb"
          prop="description"
        >
          <el-input
            v-model="applicationFormData.description"
            type="textarea"
            maxlength="120"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 4}"
            resize="none"
          />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.packageSpecs')"
          class="cb"
          prop="pkgSpecId"
          v-if="isShowSpecOption && applicationFormData.appClass==='VM'"
        >
          <el-select
            v-model="applicationFormData.pkgSpecId"
            :placeholder="$t('incubation.chooseSpecs')"
          >
            <el-option
              v-for="item in specOptions"
              :key="item.id"
              :label="language==='cn'?item.zhName:item.enName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn-container">
        <el-button
          class="common-btn"
          @click="$router.go(-1)"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="confirmForm('applicationForm')"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { applicationApi, URL_PREFIX_DEVELOPER } from '../../../api/developerApi.js'
import { Industry, Type, Architecture } from '../../../tools/commondata.js'
export default {
  name: 'CreateProComp',
  data () {
    let validateProjectName = (rule, value, callback) => {
      let reg = /^(?!_)(?!-)(?!\s)(?!.*?_$)(?!.*?-$)(?!.*?\s$)(?![0-9]+$)[\u4E00-\u9FA5a-zA-Z0-9_-]{4,32}$/
      if (!value) {
        return callback(new Error(this.$t('incubation.nameTip')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('incubation.nameRule')))
      } else {
        return callback()
      }
    }
    let validateVersion = (rule, value, callback) => {
      let reg = /^[\w\\-][\w\\-\s.]{0,9}$/g
      if (!value) {
        return callback(new Error(this.$t('incubation.versionTip')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('incubation.versionRule')))
      } else {
        return callback()
      }
    }
    let validateProvider = (rule, value, callback) => {
      let reg = /^\S.{0,29}$/g
      if (!value) {
        return callback(new Error(this.$t('incubation.providerTip')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('incubation.providerRule')))
      } else {
        return callback()
      }
    }
    let validateDescription = (rule, value, callback) => {
      let reg = /^(?!\s)(?![0-9]+$)[\S.\s\n\r]{1,1024}$/g
      if (!value) {
        return callback(new Error(this.$t('incubation.descTip')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('incubation.descriptionRule')))
      } else {
        return callback()
      }
    }
    return {
      applicationFormData: {
        'name': '',
        'version': '',
        'provider': '',
        'appClass': 'VM',
        'architecture': 'X86',
        'industry': 'Smart Park',
        'type': 'Video Application',
        'description': '',
        'appCreateType': 'INTEGRATED',
        'iconFileId': '',
        'guideFileId': '',
        'pkgSpecId': ''
      },
      applicationFormRules: {
        name: [
          { required: true, validator: validateProjectName }
        ],
        version: [
          { required: true, validator: validateVersion }
        ],
        provider: [
          { required: true, validator: validateProvider }
        ],
        description: [
          { required: true, validator: validateDescription }
        ]
      },
      defaultIconSrc: require('../../../assets/images/application/app_default_icon.png'),
      industryOptions: Industry,
      typeOptions: Type,
      architectureOptions: Architecture,
      isUploadIcon: false,
      logoFileList: [],
      mdFileList: [],
      defaultIconFile: [],
      appId: sessionStorage.getItem('applicationId') || '',
      language: localStorage.getItem('language') || 'cn',
      isMdChanged: false,
      isIconChanged: false,
      imageUrl: '',
      isShowDeleteBtn: false,
      specOptions: [],
      isShowSpecOption: false
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.$refs['applicationForm'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['applicationForm'].validateField(item.labelFor)
        }
      })
    }
  },
  methods: {
    handleChangeLogo (file) {
      this.logoFileList = []
      if (file) {
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.$message.warning(this.$t('service.fileNameType'))
          this.logoFileList = []
        } else {
          this.isIconChanged = true
          this.logoFileList.push(file.raw)
          this.imageUrl = URL.createObjectURL(file.raw)
          let formdata = new FormData()
          formdata.append('file', this.logoFileList[0])
          formdata.append('fileType', 'icon')
          applicationApi.uploadFileApi(formdata).then(res => {
            if (res.data && res.data.fileId) {
              this.applicationFormData.iconFileId = res.data.fileId
              this.isUploadIcon = true
            }
          })
        }
        this.checkLogoFile(file)
      }
    },
    checkLogoFile (file) {
      if (file.size / 1024 / 1024 > 2) {
        this.logoFileList = []
        this.$message.warning(this.$t('incubation.uploadSizeLimit'))
      }
      let fileTypeArr = ['jpg', 'png']
      if (file.name) {
        let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (fileTypeArr.indexOf(fileType.toLowerCase()) === -1) {
          this.logoFileList = []
        }
      }
    },
    removeLogo (file) {
      this.imageUrl = ''
      this.logoFileList = []
      this.isUploadIcon = false
      this.isIconChanged = false
      this.isShowDeleteBtn = false
    },
    handleChangeMd (file) {
      this.mdFileList = []
      if (file) {
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.$message.warning(this.$t('service.fileNameType'))
          this.mdFileList = []
        } else {
          this.mdFileList.push(file.raw)
          this.isMdChanged = true
          let formdata = new FormData()
          formdata.append('file', this.mdFileList[0])
          formdata.append('fileType', 'md')
          applicationApi.uploadFileApi(formdata).then(res => {
            if (res.data && res.data.fileId) {
              this.applicationFormData.guideFileId = res.data.fileId
            }
          }).catch(err => {
            console.log(err)
          })
        }
        this.checkMdFile(file)
      }
    },
    checkMdFile (file) {
      if (file.size / 1024 / 1024 > 2) {
        this.mdFileList = []
        this.$message.warning(this.$t('incubation.uploadSizeLimit'))
      }
      let fileTypeArr = ['md']
      if (file.name) {
        let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (fileTypeArr.indexOf(fileType.toLowerCase()) === -1) {
          this.mdFileList = []
        }
      }
    },
    handleMdExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('incubation.fileLimitNum'))
      }
    },
    removeMdFile () {
      this.mdFileList = []
      this.isMdChanged = false
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
    conversionIcon () {
      let image = new Image()
      image.src = this.defaultIconSrc
      image.onload = () => {
        let base64 = this.getBase64Image(image)
        this.defaultIconFile.push(this.base64toFile(base64))
      }
    },
    uploadDefaultIconFile (type) {
      let formdata = new FormData()
      formdata.append('file', this.defaultIconFile[0])
      formdata.append('fileType', 'icon')
      applicationApi.uploadFileApi(formdata).then(res => {
        if (res.data && res.data.fileId) {
          this.applicationFormData.iconFileId = res.data.fileId
          this.appId.length > 0 ? this.confirmToModify() : this.confirmToCreate()
        }
      })
    },
    confirmForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.mdFileList.length < 0) {
            this.$message.warning(this.$t('incubation.uploadMdFileTip'))
          } else {
            if (this.logoFileList.length === 0) {
              this.uploadDefaultIconFile()
            } else {
              this.appId.length > 0 ? this.confirmToModify() : this.confirmToCreate()
            }
          }
        }
      })
    },
    confirmToModify () {
      this.applicationFormData.id = this.appId
      applicationApi.modifyApp(this.appId, this.applicationFormData).then(res => {
        sessionStorage.setItem('vimType', this.applicationFormData.appClass === 'VM' ? 'OpenStack' : 'K8S')
        sessionStorage.setItem('loadtype', this.applicationFormData.appClass === 'VM' ? 'vm' : 'container')
        sessionStorage.setItem('architecture', this.applicationFormData.architecture)
        sessionStorage.setItem('pkgSpecId', this.applicationFormData.pkgSpecId)
        this.$message.success(this.$t('incubation.modifyAppSuccess'))
        this.$router.push('/EG/developer/home')
      }).catch(err => {
        console.log(err)
        this.$message.success(this.$t('incubation.modifyAppFailed'))
      })
    },
    confirmToCreate () {
      applicationApi.createNewApp(this.applicationFormData).then(res => {
        sessionStorage.setItem('vimType', this.applicationFormData.appClass === 'VM' ? 'OpenStack' : 'K8S')
        sessionStorage.setItem('loadtype', this.applicationFormData.appClass === 'VM' ? 'vm' : 'container')
        sessionStorage.setItem('architecture', this.applicationFormData.architecture)
        sessionStorage.setItem('pkgSpecId', this.applicationFormData.pkgSpecId)
        this.$store.commit('changeFlow', '2')
        this.$store.commit('changeZoom', '2')
        sessionStorage.removeItem('currentAppList')
        sessionStorage.setItem('applicationId', res.data.id)
        sessionStorage.setItem('currentApplicationId', res.data.id)
        this.$message.success(this.$t('incubation.addAppSuccess'))
        this.$store.commit('changeApp', res.data.name)
        this.$router.push('/EG/developer/home')
      }).catch(err => {
        this.$message.warning(this.$t('incubation.addAppFailed'))
        console.log(err)
      })
    },
    getApplicationInfo (appId) {
      applicationApi.getAppInfo(appId).then(res => {
        Object.keys(this.applicationFormData).forEach((key, index) => {
          this.applicationFormData[key] = res.data[key]
        })
        this.applicationFormData.status = res.data.status
        this.getFileIconInfo(res.data.iconFileId)
        this.getMdFileInfo(res.data.guideFileId)
      }).catch(err => {
        console.log(err)
      })
    },
    getFileIconInfo (iconFileId) {
      let image = new Image()
      image.src = URL_PREFIX_DEVELOPER + 'upload-files/' + iconFileId + '/action/get-file-stream'
      this.imageUrl = image.src
      image.onload = () => {
        let base64 = this.getBase64Image(image)
        this.logoFileList.push(this.base64toFile(base64))
      }
    },
    getMdFileInfo (mdFileId) {
      applicationApi.getFileInfo(mdFileId).then(res => {
        if (res && res.data) {
          this.mdFileList.length = 0
          let obj = { name: res.data.fileName }
          this.mdFileList.push(obj)
        }
      })
    },
    initSpecOptions () {
      applicationApi.getSpecOptions().then(res => {
        if (res.data && res.data.length > 0) {
          this.specOptions = res.data
          this.isShowSpecOption = true
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.initSpecOptions()
    this.conversionIcon()
    if (this.appId.length > 0) {
      this.isUploadIcon = true
      this.getApplicationInfo(this.appId)
    }
  }
}
</script>

<style lang="less">
  .click-disable {
    pointer-events: none;
  }
  .upload-comp{
    display: flex;
    justify-content: left;
    height: 46px;
    .default-icon{
      width: 63px;
      height: 46px;
      background: url("../../../assets/images/application/app_default_icon.png") no-repeat center;
      background-size: cover;
    }
    .or{
      line-height: 46px;
      margin: 0 10px;
    }
    .upload-icon{
      position: relative;
      .el-upload::before{
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../../assets/images/application/selected.png') center no-repeat;
        background-size: cover;
        position: absolute;
        top: -7px;
        left: 35px;
      }
    }
    .upload-content{
      display: flex;
      justify-content: left;
    }
  }
  .el-upload{
    display: flex;
  }
  .icon-upload-info{
    top: 11px;
    left: 10px;
  }
   .guide-upload-info{
    top: 11px;
    left: 8px;
  }
  .icon-info-active {
    position: relative;
    top: 11px;
    left: 10px;
    height: 24px;
  }
  .upload-md-btn{
    background: rgba(255,255,255,.5);
  }
  .md-guide-info{
    position: relative;
    top: 0px;
    left: 5px;
    height: 15px;
  }
  .el-upload--picture-card{
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: rgba(255,255,255,.5);
  }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 30px;
    height: 30px;
    min-width: 30px;
  }
  .el-upload-list{
    width: auto;
    margin-left: 20px;
  }
  .el-upload-list__item{
    background: #fff;
  }
  .el-upload--text{
    float: left;
  }
  .avatar{
    width:  44px;
    height: 44px;
    border: 1px solid #fff;
    border-radius: 6px;
  }
  .el-icon-plus.el-icon-plus-app{
    border: 1px dashed #fff;
    border-radius: 6px;
    box-sizing: border-box;
    width: 46px;
    height: 46px;
    line-height: 46px;
  }
  .el-icon-plus.el-icon-plus-app:before{
    font-size: 22px;
    top: 0 !important;
  }
  .el-icon-delete{
    width: 28px;
    height: 28px;
    background: #000;
    opacity: 0.5;
    position: relative;
    left: -29px;
    top: 1px;
    border-radius: 6px;
    z-index: 10;
    line-height: 28px;
  }
  .choose-default-icon::after{
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('../../../assets/images/application/selected.png') center no-repeat;
    background-size: cover;
    position: relative;
    top: -18px;
    left: 30px;
  }
</style>
