<template>
  <div class="new-application">
    <h3 class="common-dlg-title lt">
      项目信息
    </h3>
    <div>
      <el-form
        :model="applicationFormData"
        :rules="applicationFormRules"
        ref="applicationForm"
        class="common-form"
        label-width="100px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="应用名称"
          class="cb"
        >
          <el-input v-model="applicationFormData.name" />
        </el-form-item>
        <el-form-item
          label="版本"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.version" />
        </el-form-item>
        <el-form-item
          label="提供者"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.provider" />
        </el-form-item>
        <el-form-item
          label="负载类型"
          class="label-item-half"
        >
          <el-select
            v-model="applicationFormData.appClass"
            placeholder="请选择负载类型"
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
          label="架构"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.architecture" />
        </el-form-item>
        <el-form-item
          label="行业"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.indusry" />
        </el-form-item>
        <el-form-item
          label="类型"
          class="label-item-half"
        >
          <el-input v-model="applicationFormData.type" />
        </el-form-item>
        <el-form-item
          label="图标"
          class="cb choose-icon"
        >
          <div class="upload-comp">
            <div
              class="default-icon"
              @click="chooseDefaultIcon"
            />
            <div class="or">
              或
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
                class="item"
                effect="dark"
                content="必须是jpg、png格式图片"
                placement="right"
              >
                <em class="el-icon-info" />
              </el-tooltip>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label="描述"
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
      <el-button
        class="common-btn rt"
        @click="confirmForm()"
      >
        完成
      </el-button>
      <el-button
        class="common-cancel-btn rt"
        @click="$router.go(-1)"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { applicationApi } from '../../../api/developerApi.js'
export default {
  name: 'CreateProComp',
  data () {
    return {
      applicationFormData: {
        'name': '',
        'version': '',
        'provider': '',
        'appClass': '',
        'architecture': '',
        'indusry': '',
        'type': '',
        'description': '',
        'appCreateType': 'INTEGRATED'
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
        appClass: [
          { required: true, message: '请输入应用负载类型', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入应用场景类型', trigger: 'blur' }
        ],
        architecture: [
          { required: true, message: '请输入应用架构', trigger: 'blur' }
        ],
        industry: [
          { required: true, message: '请输入应用所属行业', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入应用描述', trigger: 'blur' }
        ]
      },
      isUploadIcon: false,
      logoFileList: [],
      defaultIconFile: []
    }
  },
  methods: {
    handleChangeLogo (file) {
      this.defaultIconFile = []
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
          this.fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
          if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
            this.logoFileList = []
          }
        }
      }
    },
    removeUploadLogo (file) {
      this.isUploadIcon = false
      this.logoFileList = []
      this.chooseDefaultIcon()
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning('最多上传一个文件！')
      }
    },
    chooseDefaultIcon (file, index) {
      this.logoFileList = []
      this.isUploadIcon = false
      this.defaultIconFile = []
    },
    confirmForm () {
      this.$refs['applicationForm'].validate((valid) => {
        if (valid) {
          let formdata = new FormData()
          console.log(this.logoFileList)
          formdata.append('file', this.logoFileList[0])
          formdata.append('fileType', 'icon')
          applicationApi.uploadAppIcon(formdata).then(res => {
            if (res.data && res.data.fileId) {
              this.confirmToCreate(res.data.fileId)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
        }
      })
    },
    confirmToCreate (fileId) {
      this.applicationFormData.iconFileId = fileId
      applicationApi.createNewApp(this.applicationFormData).then(res => {
        this.$store.commit('changeFlow', 1)
        sessionStorage.setItem('applicationId', res.data.id)
        this.$router.push('/EG/developer/home')
      }).catch(err => {
        console.log(err)
      })
    },
    getApplicationInfo (appId) {
      applicationApi.getAppInfo(appId).then(res => {
        this.applicationFormData = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    let appId = sessionStorage.getItem('applicationId')
    if (appId) {
      this.getApplicationInfo(appId)
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
    height: 45px;
    .default-icon{
      width: 45px;
      height: 45px;
      background: url("../../../assets/images/projects/pro_history_pro.png") no-repeat center;
      background-size: cover;
    }
    .or{
      line-height: 45px;
      margin: 0 10px;
    }
    .upload-icon{
      height: 45px;
      line-height: 45px;
      display: flex;
    }
    .upload-content{
      display: flex;
      justify-content: left;
    }
  }
  .el-upload--picture-card{
    width: 45px;
    height: 45px;
    line-height: 45px;;
    background: rgba(255,255,255,.5);
  }
  .el-upload-list--picture-card .el-upload-list__item{
    width: 45px;
    height: 45px;
    min-width: 45px;
  }
  .el-upload-list{
    width: auto;
  }
  .el-icon-info {
    position: relative;
    top: -35px;
    left: 35px;
    height: 15px;
  }
</style>
