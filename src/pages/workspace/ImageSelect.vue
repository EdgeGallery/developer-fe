<template>
  <div class="imageSelect">
    <el-form
      :model="form"
      ref="form"
    >
      <el-form-item
        id="selectImage"
        :label="$t('workspace.selectImage')"
        :label-width="formLabelWidth"
      >
        {{ $t('workspace.method1') }}
        <el-select
          disabled
          v-model="value"
          filterable
          :placeholder="$t('workspace.select')"
          class="elSelect"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label=""
        :label-width="formLabelWidth"
      >
        <p>{{ $t('workspace.method2') }}</p>
        <el-input
          id="imageName"
          v-model="form.imageName"
          :placeholder="$t('workspace.imagename')"
          class="imageNameInput"
        />
        <el-input
          id="portIn"
          v-model.number="form.portIn"
          type="number"
          :placeholder="$t('workspace.inPort')"
          class="portInput"
        />
        <el-input
          id="portOut"
          v-model.number="form.portOut"
          type="number"
          :placeholder="$t('workspace.outPort')"
          class="portInput"
        />

        <el-button
          id="addBtn"
          type="primary"
          class="addBtn"
          @click="addImageName"
        >
          {{ $t('workspace.add') }}
        </el-button>
        <p
          class="imageResult"
          v-for="(item,index) in form.imageNameData"
          :key="index"
        >
          <b style="margin: 0 5px;">{{ $t('workspace.imagename') }}:</b>
          {{ item.name }}: {{ item.version }}

          <b style="margin: 0 5px;">{{ $t('workspace.inPort') }}:</b>
          {{ item.port }}
          <b style="margin: 0 5px;">{{ $t('workspace.outPort') }}:</b>
          {{ item.nodePort }}
          <i
            class="el-icon-close"
            @click="deleteImageName(item, index)"
          />
        </p>
      </el-form-item>
      <el-form-item
        label=""
        :label-width="formLabelWidth"
      >
        <p>
          <el-button
            type="text"
            :disabled="true"
            class="btnText"
          >
            {{ $t('workspace.method3') }}
          </el-button>
        </p>
        <p>
          <el-button
            type="text"
            :disabled="true"
            class="btnText"
          >
            {{ $t('workspace.method4') }}
          </el-button>
        </p>
      </el-form-item>
      <el-form-item
        :label="$t('devTools.uploadApi')"
        :label-width="formLabelWidth"
        :rules="[{ required: true }]"
      >
        <el-upload
          id="uploadApi"
          class="upload-demo"
          ref="upload"
          action=""
          :limit="1"
          :on-change="handleChangeApi"
          :on-exceed="handleExceed"
          :file-list="form.apiFileList"
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
        <el-button
          id="confirmApiBtn"
          size="mini"
          type="primary"
          @click="submitApiFile"
          :loading="uploadApiLoading"
        >
          {{ $t('workspace.confirmUpload') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Get, Post, Delete } from '../../tools/tool.js'
export default {
  name: 'ImageSelect',
  props: {
    projectBeforeConfig: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      formLabelWidth: '150px',
      form: {
        imageName: '',
        portIn: '',
        portOut: '',
        apiFileList: [],
        imageNameData: [],
        appApiFileId: '' || this.projectBeforeConfig.appApiFileId
      },
      options: [],
      value: '',
      uploadApiLoading: false
    }
  },
  methods: {
    // 方式二上传
    addImageName () {
      if (this.form.imageName && this.form.portIn && this.form.portOut) {
        let projectId = sessionStorage.getItem('mecDetailID')
        let url = 'mec/developer/v1/projects/' + projectId + '/image'
        let params = {
          name: this.form.imageName.split(':')[0],
          version: this.form.imageName.split(':')[1],
          // 内部端口号
          port: this.form.portIn,
          // 外部端口号
          nodePort: this.form.portOut,
          projectId: projectId,
          type: ['DEVELOPER']
        }
        Post(url, params).then(res => {
          this.form.imageNameData.push(res.data)
        })
      }
    },
    deleteImageName (item, index) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image/' + item.id
      let params = {
        imageid: item.id
      }
      Delete(url, params).then(res => {
        this.form.imageNameData.splice(index, 1)
      })
    },
    handleChangeApi (file, fileList) {
      this.form.apiFileList.push(file.raw)
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    removeUploadapi (file, fileList) {
      this.form.apiFileList = []
    },
    submitApiFile () {
      this.uploadApiLoading = true
      let url = 'mec/developer/v1/files'
      let fd = new FormData()
      fd.append('file', this.form.apiFileList[0])
      Post(url, fd).then(res => {
        this.form.appApiFileId = res.data.fileId
        this.uploadApiLoading = false
        this.$message({
          type: 'success',
          message: this.$t('promptMessage.uploadSuccess')
        })
      })
    },
    // 方式二获取image  type: 第一次获取get / 还是添加
    getImage (type) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image'
      Get(url).then(res => {
        if (type === 'get') {
          res.data.forEach(item => {
            if (item.type === 'DEVELOPER') {
              this.form.imageNameData.push(item)
            }
          })
        }
      })
    },
    ifNext () {
      let apiFileId = this.form.appApiFileId
      let imageNameData = this.form.imageNameData.length
      let ifNext = false
      if (this.form.imageName && !(this.form.imageName.indexOf(':') > -1)) {
        this.$message({
          message: this.$t('promptMessage.imageNameRules'),
          type: 'warning'
        })
      }
      if (apiFileId && imageNameData) {
        ifNext = true
      } else {
        if (!apiFileId) {
          this.$message({
            message: this.$t('promptMessage.uploadApiFile'),
            type: 'warning'
          })
        } else if (!imageNameData) {
          this.$message({
            message: this.$t('promptMessage.addImage'),
            type: 'warning'
          })
        }
      }
      return ifNext
    },
    emitStepData () {
      let ifNext = this.ifNext()
      if (ifNext) {
        this.$emit('getStepData', { step: 'first', data: this.form, ifNext })
      }
    }
  },
  mounted () {
    // 获取方式二的image
    this.getImage('get')
    if (this.projectBeforeConfig.appApiFileId) this.form.appApiFileId = this.projectBeforeConfig.appApiFileId
  }
}
</script>

<style lang="less">
  .imageSelect{
    width: 88%;
    margin-left: 6%;
    input{
      height: 30px;
      line-height: 30px;
    }
    .el-form-item__label{
      padding:0 20px 0 0;
    }
    .imageNameInput{
      float: left;
      width: 200px;
    }
    .portInput{
      float: left;
      width: 120px;
      margin-left: 10px;
    }
    .addBtn{
      float: left;
      margin: 5px 0 0 10px;
      padding: 7px 20px;
      background-color: #fff;
      border: 1px solid #688ef3;
      color: #688ef3;
    }
    .imageResult{
      clear: both;
      height: 30px;
      line-height: 30px;
      i{
        margin-left: 10px;
        cursor: pointer;
      }
      i:hover{
        color: #688ef3;
      }
    }
    .btnText.el-button{
      white-space:normal;
      line-height: 20px;
    }
    .elRow {
      margin-top: 50px;
    }
    .elImageRow {
      margin-top: 20px;
    }
    .elSelect {
      width: 260px;
      display: block;
    }
    .el-form-item.or{
      margin-bottom: 0px;
      .el-form-item__label{
        line-height: 20px;
      }
    }
  }
</style>
