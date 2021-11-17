<template>
  <div
    class="common-div-bg capability-publish"
  >
    <h3 class="common-dlg-title">
      基本信息
    </h3>
    <div>
      <el-form
        :model="serviceFormData"
        class="common-form"
        label-width="100px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="二级能力"
          class="cb"
        >
          <el-input v-model="serviceFormData.twoLevelName" />
        </el-form-item>
        <el-form-item
          label="一级能力"
        >
          <el-input v-model="serviceFormData.oneLevelName" />
        </el-form-item>
        <el-form-item
          label="描述"
          class="cb"
        >
          <el-input
            v-model="serviceFormData.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item
          label="API定义文件"
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
            <span class="cap-upload-btn">
              API定义文件
            </span>
            <el-tooltip
              class="item"
              effect="dark"
              content="仅支持.yaml文档"
              placement="right"
            >
              <em class="el-icon-info file-tip-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="说明文档"
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
            <span class="cap-upload-btn">
              说明文档
            </span>
            <el-tooltip
              class="item"
              effect="dark"
              content="仅支持.md文档"
              placement="right"
            >
              <em class="el-icon-info file-tip-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item
          label="图片"
          class="label-item-half"
        >
          <img
            src="../../../assets/images/capability/capability_default_img.png"
            alt="default_capability"
          >
        </el-form-item> -->
        <el-form-item
          label="自定义图片"
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
            <span class="cap-upload-btn">
              自定义图片
            </span><el-tooltip
              class="item"
              effect="dark"
              content="仅支持.jpg或者.png图片"
              placement="right"
            >
              <em class="el-icon-info file-tip-info" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <h3 class="common-dlg-title">
          注册信息
        </h3>
        <el-form-item
          label="服务名称"
          class="label-item-half"
        >
          <el-input v-model="serviceFormData.serviceName" />
        </el-form-item>
        <el-form-item
          label="内部端口号"
          class="label-item-half"
        >
          <el-input
            type="number"
            v-model="serviceFormData.internalPort"
          />
        </el-form-item>
        <el-form-item
          label="版本"
          class="label-item-half"
        >
          <el-input v-model="serviceFormData.version" />
        </el-form-item>
        <el-form-item
          label="协议"
          class="label-item-half"
        >
          <el-input v-model="serviceFormData.protocol" />
        </el-form-item>
        <el-form-item
          label="在线体验URL"
          class="cb"
        >
          <el-input v-model="serviceFormData.experienceUrl" />
        </el-form-item>
        <!-- <el-form-item
          label="流量规则"
        />
        <el-form-item
          label="DNS规则"
        /> -->
      </el-form>
      <el-button
        class="common-btn rt"
        @click="handleUpload('api',apiFileList[0])"
      >
        完成
      </el-button>
      <el-button
        class="common-cancel-btn rt"
        @click="$router.go(-1)"
      >
        取消
      </el-button>
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
        oneLevelNameEn: '',
        twoLevelNameEn: '',
        author: ''
      },
      apiFileList: [],
      guideFileId: [],
      iconFileList: [],
      apiFileId: '',
      docFileId: '',
      iconFileId: '',
      isModify: false,
      serviceId: ''
    }
  },
  methods: {
    confirmToChoose () {
      this.$router.push('/EG/developer/capabilityCenter')
    },
    handleApiChange (file) {
      this.apiFileList = []
      if (file) {
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.apiFileList = []
        } else {
          this.apiFileList.push(file.raw)
        }
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length > 1) {
        this.$message.warning('最多上传一个文件！')
      }
    },
    handleDocChange (file) {
      this.guideFileId = []
      if (file) {
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
        if (file.raw && file.raw.name.indexOf(' ') !== -1) {
          this.iconFileList = []
        } else {
          this.iconFileList.push(file.raw)
        }
      }
    },
    handleUpload (key, file) {
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
    },
    publishService () {
      if (this.isModify) {
        applicationApi.modifyPublishedService(this.appId, this.serviceId, this.serviceFormData).then(res => {
          this.$message.success('编辑能力成功！')
          this.$router.push('/EG/developer/capabilityCenter')
        })
      } else {
        applicationApi.publishService(this.appId, this.serviceFormData).then(res => {
          this.$message.success('发布能力成功！')
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
    }
  },
  mounted () {
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
    top: 9%;
    left: 35%;
    width: 35%;
    padding: 35px;
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
  .file-tip-info{
    margin-left: 5px;
    top: 0px;
    left: 0px;
  }
</style>
