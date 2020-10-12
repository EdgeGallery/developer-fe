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
        <span class="namespan">{{ $t('workspace.imagename') }}</span>
        <el-input
          id="imageName"
          v-model="form.imageName"
          :placeholder="$t('workspace.imagename')"
          class="imageNameInput"
        />
        <span class="namespan">{{ $t('workspace.imageversion') }}</span>
        <el-input
          id="imageversion"
          v-model="form.imageVersion"
          :placeholder="$t('workspace.imageversion')"
          class="imageVersionInput"
        />
        <span class="namespan">{{ $t('workspace.inPort') }}</span>
        <el-input-number
          id="portIn"
          v-model="form.portIn"
          controls-position="right"
          :min="1"
          :max="999999"
          :placeholder="$t('workspace.inPort')"
          class="portInput"
        />
        <span class="namespan">{{ $t('workspace.outPort') }}</span>
        <el-input-number
          id="portOut"
          v-model="form.portOut"
          controls-position="right"
          :min="32000"
          :max="32767"
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
          class="imageResult el-form-error"
          v-if="showNameErrInfo"
        >
          {{ $t('promptMessage.imageNameErr') }}
        </p>
        <p
          class="imageResult el-form-error"
          v-if="showVersionErrInfo"
        >
          {{ $t('promptMessage.imageVersionErr') }}
        </p>
        <p
          class="imageResult"
          v-for="(item,index) in form.imageNameData"
          :key="index"
          v-loading="imageDataLoading"
          element-loading-spinner="el-icon-loading"
          :element-loading-text="$t('promptMessage.loadingText')"
        >
          <strong>{{ $t('workspace.imagename') }}:</strong>
          {{ item.name }}
          <strong>{{ $t('workspace.imageversion') }}:</strong>
          {{ item.version }}
          <strong>{{ $t('workspace.inPort') }}:</strong>
          {{ item.port }}
          <strong>{{ $t('workspace.outPort') }}:</strong>
          {{ item.nodePort }}
          <em
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
          {{ $t('workspace.method3') }}
        </p>
        <p>
          <el-upload
            id="uploadApp"
            class="upload-demo"
            action=""
            :limit="1"
            :on-change="handleChangeApp"
            :on-exceed="handleExceed"
            :file-list="form.appFileList"
            :auto-upload="false"
            :on-remove="removeUploadapp"
            name="appFile"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
            >
              {{ $t('workspace.uploadApppackage') }}
            </el-button>
          </el-upload>
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
        :label="$t('workspace.uploadYaml')"
        :label-width="formLabelWidth"
        :rules="[{ required: true }]"
      >
        <el-upload
          id="uploadYaml"
          class="upload-demo"
          action=""
          :on-change="handleChangeYaml"
          :file-list="form.yamlFileList"
          :auto-upload="false"
          :on-remove="removeUploadyaml"
          accept=".json,.yaml"
          name="yamlFile"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >
            {{ $t('workspace.uploadYaml') }}
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >
            <em class="el-icon-warning" />{{ $t('devTools.apiText') }}
          </div>
        </el-upload>
        <p
          class="imageResult"
          v-for="(item,index) in form.yamlFileData"
          :key="index"
          v-loading="uploadYamlLoading"
          element-loading-spinner="el-icon-loading"
          :element-loading-text="$t('promptMessage.loadingText')"
        >
          {{ item.fileName }}
          <em
            class="el-icon-close"
            @click="deleteYamlFile(item, index)"
          />
        </p>
      </el-form-item>
      <el-form-item
        :label="$t('devTools.uploadApi')"
        :label-width="formLabelWidth"
      >
        <el-upload
          id="uploadApi"
          class="upload-demo"
          action=""
          :limit="1"
          :on-change="handleChangeApi"
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
            <em class="el-icon-warning" />{{ $t('devTools.apiText') }}
          </div>
        </el-upload>
        <p
          class="imageResult"
          v-for="(item,index) in form.apiFileData"
          :key="index"
          v-loading="uploadApiLoading"
          element-loading-spinner="el-icon-loading"
          :element-loading-text="$t('promptMessage.loadingText')"
        >
          {{ item.fileName }}
          <em
            class="el-icon-close"
            @click="deleteApiFile(item, index)"
          />
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
export default {
  name: 'ImageSelect',
  props: {
    projectBeforeConfig: {
      type: Object,
      default: () => {}
    },
    allStepData: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      formLabelWidth: '150px',
      form: {
        imageName: '',
        imageVersion: '',
        portIn: '',
        portOut: '',
        apiFileList: [],
        yamlFileList: [],
        imageNameData: [],
        yamlFileData: [],
        apiFileData: [],
        appApiFileId: '' || this.projectBeforeConfig.appApiFileId
      },
      options: [],
      value: '',
      uploadApiLoading: false,
      uploadYamlLoading: false,
      imageDataLoading: true,
      yamlDataLoading: true,
      apiDataLoading: true,
      userId: sessionStorage.getItem('userId'),
      showNameErrInfo: false,
      showVersionErrInfo: false,
      fileType: ''
    }
  },
  methods: {
    // 验证要添加的镜像名称
    verifyImageName () {
      if (this.form.imageName === '') {
        this.showNameErrInfo = true
        return
      }
      this.showNameErrInfo = false
    },
    // 验证要添加的镜像版本
    verifyImageVersion () {
      if (this.form.imageVersion === '') {
        this.showVersionErrInfo = true
        return
      }
      this.showVersionErrInfo = false
    },
    // 方式二上传，添加镜像
    addImageName () {
      this.verifyImageName()
      this.verifyImageVersion()
      if (this.form.imageName && this.form.imageVersion && this.form.portIn && this.form.portOut) {
        let projectId = sessionStorage.getItem('mecDetailID')
        let params = {
          name: this.form.imageName,
          version: this.form.imageVersion,
          // 内部端口号
          port: this.form.portIn,
          // 外部端口号
          nodePort: this.form.portOut,
          projectId: projectId,
          type: 'DEVELOPER'
        }
        Workspace.addImageNameApi(projectId, params).then(res => {
          params.id = res.data.id
          this.getImage('post', params)
        })
      }
    },
    // 删除镜像
    deleteImageName (item, index) {
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.deleteImageNameApi(projectId, item.id).then(res => {
        this.form.imageNameData.splice(index, 1)
      })
    },
    // 选择Api文件
    handleChangeApi (file, fileList) {
      this.form.apiFileList.push(file.raw)
      this.fileType = this.form.apiFileList[0].name.substring(this.form.apiFileList[0].name.lastIndexOf('.') + 1)
      let fileTypeArr = ['yaml', 'json']
      if (fileTypeArr.indexOf(this.fileType) === -1) {
        this.$message.warning(this.$t('promptMessage.yamlFileType'))
        this.form.apiFileList = []
      }
      if (this.form.apiFileList.length > 0) {
        this.submitApiFile()
        this.form.apiFileList = []
      }
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    removeUploadapi (file, fileList) {
      this.form.apiFileList = []
    },
    // 上传Api
    submitApiFile () {
      if (this.form.apiFileList.length > 0) {
        this.uploadApiLoading = true
        let fd = new FormData()
        fd.append('file', this.form.apiFileList[0])
        Workspace.submitApiFileApi(this.userId, fd).then(res => {
          this.$emit('getAppapiFileId', false)
          this.form.appApiFileId = res.data.fileId
          this.uploadApiLoading = false
          this.$message({
            type: 'success',
            message: this.$t('promptMessage.uploadSuccess')
          })
          this.getApiFile()
        })
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.uploadApiFile')
        })
      }
    },
    // 获取上传的Api文件
    getApiFile () {
      this.form.apiFileData = []
      Workspace.getApiFileApi(this.form.appApiFileId, this.userId).then(res => {
        this.form.apiFileData.push(res.data)
        this.apiDataLoading = false
      })
    },
    // 删除上传的Api文件
    deleteApiFile (item, index) {
      this.form.apiFileData.splice(index, 1)
      this.$emit('getAppapiFileId', true)
    },
    // 选择Yaml文件
    handleChangeYaml (file, fileList) {
      this.form.yamlFileList.push(file.raw)
      this.fileType = this.form.yamlFileList[0].name.substring(this.form.yamlFileList[0].name.lastIndexOf('.') + 1)
      let fileTypeArr = ['yaml', 'json']
      if (fileTypeArr.indexOf(this.fileType) === -1) {
        this.$message.warning(this.$t('promptMessage.yamlFileType'))
        this.form.yamlFileList = []
      }
      this.submitYamlFile()
      this.form.yamlFileList = []
    },
    removeUploadyaml (file, fileList) {
      this.form.yamlFileList = []
    },
    handleChangeApp (file, fileList) {
      this.form.appFileList.push(file.raw)
    },
    removeUploadApp (file, fileList) {
      this.form.appFileList = []
    },
    // 上传Yaml文件
    submitYamlFile () {
      let projectId = sessionStorage.getItem('mecDetailID')
      if (this.form.yamlFileList.length > 0) {
        this.uploadYamlLoading = true
        let fd = new FormData()
        fd.append('file', this.form.yamlFileList[0])
        Workspace.submitYamlFileApi(this.userId, projectId, fd).then(res => {
          this.form.appYamlFileId = res.data.fileId
          this.uploadYamlLoading = false
          this.$message({
            type: 'success',
            message: this.$t('promptMessage.uploadSuccess')
          })
          this.getYamlFile()
        })
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.uploadYamlFile')
        })
      }
    },
    // 方式二获取image  type: 第一次获取get / 还是添加
    getImage (type, params) {
      let projectId = sessionStorage.getItem('mecDetailID')
      if (type === 'get') {
        Workspace.getImageApi(projectId).then(res => {
          res.data.images.forEach(item => {
            if (item.type === 'DEVELOPER') {
              this.form.imageNameData.push(item)
            }
          })
          this.imageDataLoading = false
        })
      } else {
        this.form.imageNameData.push({
          ...params
        })
        this.imageDataLoading = false
      }
    },
    // 获取已上传的yaml文件
    getYamlFile () {
      this.form.yamlFileData = []
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getYamlFileApi(this.userId, projectId).then(res => {
        res.data.forEach(item => {
          this.form.yamlFileData.push(item)
        })
        this.yamlDataLoading = false
      })
    },
    // 删除已上传的yaml文件
    deleteYamlFile (item, index) {
      Workspace.deleteYamlFileApi(item.fileId).then(res => {
        this.form.yamlFileData.splice(index, 1)
      })
    },
    // 判断方式二镜像和Yaml是否上传
    ifNext () {
      let imageNameData = this.form.imageNameData.length
      let yamlFileData = this.form.yamlFileData.length
      let ifNext = false
      if (imageNameData && yamlFileData) {
        ifNext = true
      } else {
        if (!imageNameData) {
          this.$message({
            message: this.$t('promptMessage.addImage'),
            type: 'warning'
          })
        } else if (!yamlFileData) {
          this.$message({
            message: this.$t('promptMessage.uploadYamlFile'),
            type: 'warning'
          })
        }
      }
      return ifNext
    },
    // 将数据传值给父组件
    emitStepData () {
      let ifNext = this.ifNext()
      if (ifNext) {
        this.$emit('getStepData', { step: 'first', data: this.form, ifNext })
      }
    },
    // 返回第一步时，保留填写的数据
    getFirstData () {
      if (this.allStepData.first) {
        let firstData = this.allStepData.first
        this.form.apiFileData = firstData.apiFileData
      }
    }
  },
  mounted () {
    // 获取方式二的image
    this.getImage('get')
    this.getYamlFile()
    this.getFirstData()
    if (this.projectBeforeConfig.appApiFileId) {
      this.form.appApiFileId = this.projectBeforeConfig.appApiFileId
      this.getApiFile()
    }
  }
}
</script>

<style lang="less">
  .imageSelect{
    width: 88%;
    margin-left: 6%;
    .upload-demo .el-upload__tip{
      display: inline-block;
      margin: 0 0 0 15px;
    }
    .namespan{
      float: left;
    }
    input{
      height: 30px;
      line-height: 30px;
    }
    .el-input-number{
      line-height: 30px;
      margin-top: 5px;
    }
    .el-input-number.is-controls-right .el-input__inner{
      padding: 0 30px 0 15px;
    }
    .el-input-number.is-controls-right .el-input-number__decrease, .el-input-number.is-controls-right .el-input-number__increase{
      line-height: 15px;
      width: 20px;
    }
    .el-input-number__decrease i{
      position: relative;
      top: 1px;
    }
    .el-form-item__label{
      padding:0 20px 0 0;
    }
    .imageNameInput{
      float: left;
      width: 160px;
      padding: 0 5px;
      margin:0 10px 0 0;
    }
    .imageVersionInput{
      float: left;
      width: 90px;
      padding: 0 5px;
      margin-right: 10px;
    }
    .portInput{
      float: left;
      width: 90px;
      margin-left: 5px;
      margin-right: 10px;
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
      em{
        margin-left: 10px;
        cursor: pointer;
      }
      em:hover{
        color: #688ef3;
      }
    }
    .el-form-error{
      color: #f56c6c;
      font-size: 12px;
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
    .el-loading-spinner{
      p{
        line-height: 0px;
      }
    }
    .el-icon-warning{
      color: #688ef3;
      margin-right: 5px;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 1380px) {
    .imageSelect {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
