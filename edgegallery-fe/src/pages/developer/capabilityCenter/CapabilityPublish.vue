<template>
  <div
    class="common-div-bg capability-publish"
  >
    <h3 class="common-dlg-title">
      {{ $t('service.basicInfo') }}
    </h3>
    <div>
      <el-form
        :model="serviceFormData"
        :rules="serviceFormRule"
        ref="serviceForm"
        class="common-form"
        label-width="210px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          :label="$t('service.firLevel')"
        >
          <el-select
            v-model="serviceFormData.oneLevelNameEn"
            :placeholder="$t('service.firLevel')"
            @change="oneLevelNameChanged"
          >
            <el-option
              v-for="item in serviceOptions"
              :key="item.id"
              :label="language==='cn'?item.name:item.nameEn"
              :value="item.nameEn"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('service.secLevelCn')"
          class="cb"
          prop="twoLevelName"
        >
          <el-input v-model="serviceFormData.twoLevelName" />
        </el-form-item>
        <el-form-item
          :label="$t('service.secLevelEn')"
          class="cb"
          prop="twoLevelNameEn"
        >
          <el-input v-model="serviceFormData.twoLevelNameEn" />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.description')"
          class="cb"
          prop="description"
        >
          <el-input
            v-model="serviceFormData.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            :placeholder="$t('service.inputBox')"
          />
        </el-form-item>
        <el-form-item
          :label="$t('service.apiFile')"
          class="label-item-half"
        >
          <el-upload
            :on-change="handleApiChange"
            :auto-upload="false"
            action=""
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="apiFileList"
            accept=".yaml"
          >
            <el-button class="inner-btn">
              {{ $t('incubation.upload') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="$t('service.yamlMust')"
              placement="right"
            >
              <em class="common-info tip-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('service.guideFile')"
          class="label-item-half"
        >
          <el-upload
            :on-change="handleDocChange"
            :auto-upload="false"
            action=""
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="guideFileId"
            accept=".md"
          >
            <el-button class="inner-btn">
              {{ $t('incubation.upload') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="$t('service.mdMust')"
              placement="right"
            >
              <em class="common-info tip-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="$t('service.customPic')"
          class="cb"
        >
          <el-upload
            :on-change="handleIconChange"
            :auto-upload="false"
            action=""
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="iconFileList"
            accept=".jpg,.png"
          >
            <el-button class="inner-btn">
              {{ $t('incubation.upload') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="$t('incubation.logoLimit')"
              placement="right"
            >
              <em class="common-info tip-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <h3 class="common-dlg-title">
          {{ $t('service.registrationInfo') }}
        </h3>
        <el-form-item
          :label="$t('service.serviceName')"
          class="label-item-half"
          prop="serviceName"
        >
          <el-input v-model="serviceFormData.serviceName" />
        </el-form-item>
        <el-form-item
          :label="$t('service.internalPort')"
          class="label-item-half"
          prop="internalPort"
        >
          <el-input
            type="number"
            v-model="serviceFormData.internalPort"
          />
        </el-form-item>
        <el-form-item
          :label="$t('incubation.version')"
          class="label-item-half"
          prop="version"
        >
          <el-input v-model="serviceFormData.version" />
        </el-form-item>
        <el-form-item
          :label="$t('service.protocol')"
          class="label-item-half"
          prop="protocol"
        >
          <el-input v-model="serviceFormData.protocol" />
        </el-form-item>
        <el-form-item
          :label="$t('service.expURL')"
          class="cb"
        >
          <el-input v-model="serviceFormData.experienceUrl" />
        </el-form-item>
      </el-form>
      <div class="rt">
        <el-button
          class="common-btn"
          @click="$router.go(-1)"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="handleUpload('api',apiFileList[0])"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { applicationApi } from '../../../api/developerApi.js'
export default {
  name: 'CapCenter',
  data () {
    return {
      appId: sessionStorage.getItem('applicationId'),
      serviceFormData: {
        dnsRuleIdList: [],
        trafficRuleIdList: [],
        oneLevelName: '电信网络能力',
        oneLevelNameEn: 'Telecom network',
        twoLevelNameEn: '',
        twoLevelName: '',
        author: ''
      },
      serviceFormRule: {
        twoLevelNameEn: [
          { required: true, message: this.$t('service.secondLevelNameEnTip'), trigger: 'blur' },
          { min: 3, max: 15, message: this.$t('incubation.lengthTip'), trigger: 'blur' }
        ],
        twoLevelName: [
          { required: true, message: this.$t('service.secondLevelNameCnTip'), trigger: 'blur' },
          { min: 3, max: 15, message: this.$t('incubation.lengthTip'), trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t('incubation.descTip'), trigger: 'blur' }
        ],
        serviceName: [
          { required: true, message: this.$t('service.serviceNameTip'), trigger: 'blur' }
        ],
        version: [
          { required: true, message: this.$t('incubation.versionTip'), trigger: 'blur' }
        ],
        protocol: [
          { required: true, message: this.$t('service.protocolTip'), trigger: 'blur' }
        ],
        internalPort: [
          { required: true, message: this.$t('service.innerPortTip'), trigger: 'blur' }
        ]
      },
      apiFileList: [],
      guideFileId: [],
      iconFileList: [],
      apiFileId: '',
      docFileId: '',
      iconFileId: '',
      isModify: false,
      serviceId: '',
      serviceOptions: [],
      language: localStorage.getItem('language') || 'cn'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    oneLevelNameChanged (val) {
      this.serviceOptions.forEach(ser => {
        if (ser.nameEn === val) {
          this.serviceFormData.oneLevelName = ser.name
        }
      })
    },
    confirmToChoose () {
      this.$router.push('/EG/developer/capabilityCenter')
    },
    handleApiChange (file) {
      this.apiFileList = []
      if (file) {
        if (file.size / 1024 / 1024 > 2) {
          this.mdFileList = []
          this.$message.warning(this.$t('incubation.uploadSizeLimit'))
        }
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.apiFileList = []
        } else {
          this.apiFileList.push(file.raw)
        }
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length > 1) {
        this.$message.warning(this.$t('incubation.uploadLimit'))
      }
    },
    handleDocChange (file) {
      this.guideFileId = []
      if (file) {
        if (file.size / 1024 / 1024 > 2) {
          this.mdFileList = []
          this.$message.warning(this.$t('incubation.uploadSizeLimit'))
        }
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.guideFileId = []
        } else {
          this.guideFileId.push(file.raw)
        }
      }
    },
    handleIconChange (file) {
      this.iconFileList = []
      if (file) {
        if (file.size / 1024 / 1024 > 2) {
          this.mdFileList = []
          this.$message.warning(this.$t('incubation.uploadSizeLimit'))
        }
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.iconFileList = []
        } else {
          this.iconFileList.push(file.raw)
        }
      }
    },
    handleUpload (key, file) {
      this.$refs['serviceForm'].validate((valid) => {
        if (valid) {
          if (this.isModify) {
            this.publishService()
          } else {
            let formdata = new FormData()
            formdata.append('file', file)
            formdata.append('fileType', key)
            applicationApi.uploadFileApi(formdata).then(res => {
              if (res && res.data) {
                if (key === 'api') {
                  this.apiFileId = res.data.fileId
                  this.handleUpload('md', this.guideFileId[0])
                } else if (key === 'md') {
                  this.docFileId = res.data.fileId
                  this.handleUpload('icon', this.iconFileList[0])
                } else {
                  this.iconFileId = res.data.fileId
                  this.serviceFormData.apiFileId = this.apiFileId
                  this.serviceFormData.guideFileId = this.docFileId
                  this.serviceFormData.iconFileId = this.iconFileId
                  this.publishService()
                }
              }
            })
          }
        }
      })
    },
    publishService () {
      if (this.isModify) {
        applicationApi.modifyPublishedService(this.appId, this.serviceId, this.serviceFormData).then(res => {
          this.$message.success(this.$t('service.editSuccess'))
          this.$router.push('/EG/developer/capabilityCenter')
        })
      } else {
        applicationApi.publishService(this.appId, this.serviceFormData).then(res => {
          this.$message.success(this.$t('service.publishSuccess'))
          this.$router.push('/EG/developer/capabilityCenter')
        })
      }
    },
    getFileInfo (type, fileId) {
      applicationApi.getFileInfo(fileId).then(res => {
        let obj = {
          name: res.data.fileName
        }
        if (type === 1) {
          this.apiFileList.push(obj)
        } else if (type === 2) {
          this.guideFileId.push(obj)
        } else {
          this.iconFileList.push(obj)
        }
      })
    },
    getServiceOptions () {
      applicationApi.getServiceList().then(res => {
        this.serviceOptions = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getServiceOptions()
    if (this.$route.query && this.$route.query.serviceName) {
      this.isModify = true
      this.serviceFormData = this.$route.query
      this.serviceId = this.$route.query.appServiceProducedId
      this.getFileInfo(1, this.serviceFormData.apiFileId)
      this.getFileInfo(2, this.serviceFormData.guideFileId)
      this.getFileInfo(3, this.serviceFormData.iconFileId)
    }
  }
}
</script>

<style lang="less" scoped>
  .capability-publish{
    position: absolute;
    top: 0%;
    left: 25%;
    width: 50%;
    padding: 15px 35px;
  }
  .cap-upload-btn{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 25px;
    font-size: 14px;
    border-radius: 12px;
    background: rgba(255,255,255,.3);
  }
  .tip-info{
    left: 10px;
    top: 2px;
  }
</style>
