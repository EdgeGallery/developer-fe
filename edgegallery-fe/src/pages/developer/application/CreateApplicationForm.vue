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
        label-width="105px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          :label="$t('incubation.appName')"
          class="cb"
        >
          <el-input v-model="applicationFormData.name" />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.version')"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.version" />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.provider')"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.provider" />
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
              label="容器"
              value="CONTAINER"
            />
            <el-option
              label="虚拟机"
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
              :label="item.label[0]"
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
              :label="item.label[0]"
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
              class="default-icon"
              :class="isUploadIcon?'':'choose-default-icon'"
            />
            <div class="or">
              {{ $t('incubation.or') }}
            </div>
            <div class="uplod-icon">
              <el-upload
                class="upload-content"
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
                effect="dark"
                :content="$t('incubation.logoLimit')"
                placement="right"
              >
                <em
                  class="common-info icon-upload-info"
                  :class="{'icon-info-active':logoFileList.length>0}"
                />
              </el-tooltip>
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
            :file-list="mdFileList"
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
        >
          <el-input
            v-model="applicationFormData.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div class="btn-container">
        <el-button
          class="common-btn"
          @click="$router.go(-1)"
        >
          返回
        </el-button>
        <el-button
          class="common-btn"
          @click="confirmForm()"
        >
          完成
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { applicationApi } from '../../../api/developerApi.js'
import { Industry, Type, Architecture } from '../../../tools/commondata.js'
export default {
  name: 'CreateProComp',
  data () {
    return {
      applicationFormData: {
        'name': '',
        'version': '',
        'provider': '',
        'appClass': 'CONTAINER',
        'architecture': 'X86',
        'industry': '智慧园区',
        'type': '视频应用',
        'description': '',
        'appCreateType': 'INTEGRATED',
        'iconFileId': '',
        'guideFileId': ''
      },
      applicationFormRules: {
        name: [
          { required: true, message: '请输应用名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输入应用版本', trigger: 'blur' }
        ],
        provider: [
          { required: true, message: '请输入应用开发商', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入应用描述', trigger: 'blur' }
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
      appId: sessionStorage.getItem('applicationId') || ''
    }
  },
  methods: {
    handleChangeLogo (file) {
      this.logoFileList = []
      if (file) {
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.logoFileList = []
        } else {
          this.logoFileList.push(file.raw)
          this.isUploadIcon = true
        }
        if (file.size / 1024 / 1024 > 2) {
          this.logoFileList = []
        }
        let fileTypeArr = ['jpg', 'png']
        if (file.name) {
          let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
          if (fileTypeArr.indexOf(fileType.toLowerCase()) === -1) {
            this.logoFileList = []
          }
        }
      }
    },
    removeUploadLogo (file) {
      this.logoFileList = []
      this.isUploadIcon = false
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning('最多上传一个文件！')
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
    conversionIcon () {
      let image = new Image()
      image.src = this.defaultIconSrc
      image.onload = () => {
        let base64 = this.getBase64Image(image)
        this.defaultIconFile.push(this.base64toFile(base64))
      }
    },
    handleMdExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning('最多上传一个文件！')
      }
    },
    handleChangeMd (file) {
      this.mdFileList = []
      if (file) {
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.mdFileList = []
        } else {
          this.mdFileList.push(file.raw)
        }
        if (file.size / 1024 / 1024 > 2) {
          this.mdFileList = []
        }
        let fileTypeArr = ['md']
        if (file.name) {
          let fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
          if (fileTypeArr.indexOf(fileType.toLowerCase()) === -1) {
            this.mdFileList = []
          }
        }
      }
    },
    uploadMdFile (fileId) {
      let formdata = new FormData()
      formdata.append('file', this.mdFileList[0])
      formdata.append('fileType', 'md')
      applicationApi.uploadFileApi(formdata).then(res => {
        if (res.data && res.data.fileId) {
          this.confirmToCreate(fileId, res.data.fileId)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    confirmForm () {
      this.$refs['applicationForm'].validate((valid) => {
        if (valid) {
          let formdata = new FormData()
          if (this.logoFileList.length > 0) {
            formdata.append('file', this.logoFileList[0])
            formdata.append('fileType', 'icon')
          } else {
            formdata.append('file', this.defaultIconFile[0])
            formdata.append('fileType', 'icon')
          }
          if (this.appId.length > 0) {
            this.modifyApp()
          } else {
            applicationApi.uploadFileApi(formdata).then(res => {
              if (res.data && res.data.fileId) {
                this.uploadMdFile(res.data.fileId)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          console.log('error submit!!')
        }
      })
    },
    modifyApp () {
      this.applicationFormData.id = this.appId
      applicationApi.modifyApp(this.appId, this.applicationFormData).then(res => {
        this.$message.success('更新应用成功！')
        this.$router.push('/EG/developer/home')
      })
    },
    confirmToCreate (iconFileId, mdFileId) {
      this.applicationFormData.iconFileId = iconFileId
      this.applicationFormData.guideFileId = mdFileId
      applicationApi.createNewApp(this.applicationFormData).then(res => {
        this.$store.commit('changeFlow', '1')
        this.$store.commit('changeZoom', '2')
        sessionStorage.setItem('applicationId', res.data.id)
        this.$message.success('创建应用成功！')
        this.$store.commit('changeApp', res.data.name)
        this.$router.push('/EG/developer/home')
      }).catch(err => {
        console.log(err)
      })
    },
    getApplicationInfo (appId) {
      applicationApi.getAppInfo(appId).then(res => {
        Object.keys(this.applicationFormData).forEach((key, index) => {
          this.applicationFormData[key] = res.data[key]
        })
        this.getFileIconInfo(res.data.iconFileId)
        this.getMdFileInfo(res.data.guideFileId)
      }).catch(err => {
        console.log(err)
      })
    },
    getFileIconInfo (iconFileId) {
      let image = new Image()
      image.src = '/mec-developer/mec/developer/v2/upload-files/' + iconFileId + '/action/get-file-stream'
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
    }
  },
  mounted () {
    this.conversionIcon()
    this.getMdFileInfo()
    if (this.appId.length > 0) {
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
    height: 30px;
    .default-icon{
      width: 30px;
      height: 30px;
      background: url("../../../assets/images/application/app_default_icon.png") no-repeat center;
      background-size: cover;
    }
    .or{
      line-height: 30px;
      margin: 0 10px;
    }
    .upload-icon{
      height: 30px;
      line-height: 30px;
      display: flex;
    }
    .upload-content{
      display: flex;
      justify-content: left;
    }
  }
  .icon-upload-info{
    top: -27px;
    left: 30px;
  }
   .guide-upload-info{
    top: 2px;
    left: 8px;
  }
  .icon-info-active {
    position: relative;
    top: -52px;
    left: 60px;
    height: 15px;
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
  }
  .el-upload-list__item{
    background: #fff;
  }
  .el-upload--text{
    float: left;
  }
</style>
