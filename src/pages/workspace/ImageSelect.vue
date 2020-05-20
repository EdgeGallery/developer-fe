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
          @blur="verifyImageName"
          class="imageNameInput"
        />
        <span class="namespan">{{ $t('workspace.imageversion') }}</span>
        <el-input
          id="imageversion"
          v-model="form.imageVersion"
          :placeholder="$t('workspace.imageversion')"
          @blur="verifyImageVersion"
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
          <b>{{ $t('workspace.imagename') }}:</b>
          {{ item.name }}
          <b>{{ $t('workspace.imageversion') }}:</b>
          {{ item.version }}
          <b>{{ $t('workspace.inPort') }}:</b>
          {{ item.port }}
          <b>{{ $t('workspace.outPort') }}:</b>
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
        :label="$t('workspace.uploadYaml')"
        :label-width="formLabelWidth"
      >
        <el-upload
          id="uploadYaml"
          class="upload-demo"
          action=""
          :limit="1"
          :on-change="handleChangeYaml"
          :on-exceed="handleExceed"
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
            <i class="el-icon-warning" />{{ $t('devTools.apiText') }}
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
          <i
            class="el-icon-close"
            @click="deleteYamlFile(item, index)"
          />
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
        imageVersion: '',
        portIn: '',
        portOut: '',
        apiFileList: [],
        yamlFileList: [],
        imageNameData: [],
        yamlFileData: [],
        appApiFileId: '' || this.projectBeforeConfig.appApiFileId
      },
      options: [],
      value: '',
      uploadApiLoading: false,
      uploadYamlLoading: false,
      imageDataLoading: true,
      yamlDataLoading: true,
      userId: sessionStorage.getItem('userId'),
      showNameErrInfo: false,
      showVersionErrInfo: false,
      fileType: ''
    }
  },
  methods: {
    verifyImageName () {
      if (this.form.imageName === '') {
        this.showNameErrInfo = true
        return
      }
      this.showNameErrInfo = false
    },
    verifyImageVersion () {
      if (this.form.imageVersion === '') {
        this.showVersionErrInfo = true
        return
      }
      this.showVersionErrInfo = false
    },
    // 方式二上传
    addImageName () {
      this.verifyImageName()
      this.verifyImageVersion()
      if (this.form.imageName && this.form.imageVersion && this.form.portIn && this.form.portOut) {
        let projectId = sessionStorage.getItem('mecDetailID')
        let url = 'mec/developer/v1/projects/' + projectId + '/image'
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
        Post(url, params).then(res => {
          params.id = res.data.id
          this.getImage('post', params)
        })
      }
    },
    deleteImageName (item, index) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image/' + item.id
      Delete(url).then(res => {
        this.form.imageNameData.splice(index, 1)
      })
    },
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
    submitApiFile () {
      if (this.form.apiFileList.length > 0) {
        this.uploadApiLoading = true
        let url = 'mec/developer/v1/files?userId=' + this.userId
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
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('promptMessage.uploadApiFile')
        })
      }
    },
    handleChangeYaml (file, fileList) {
      this.form.yamlFileList.push(file.raw)
      this.fileType = this.form.yamlFileList[0].name.substring(this.form.yamlFileList[0].name.lastIndexOf('.') + 1)
      let fileTypeArr = ['yaml', 'json']
      if (fileTypeArr.indexOf(this.fileType) === -1) {
        this.$message.warning(this.$t('promptMessage.yamlFileType'))
        this.form.yamlFileList = []
      }
      if (this.form.yamlFileList.length > 0) {
        this.submitYamlFile()
        this.form.yamlFileList = []
      }
    },
    removeUploadyaml (file, fileList) {
      this.form.yamlFileList = []
    },
    submitYamlFile () {
      let projectId = sessionStorage.getItem('mecDetailID')
      if (this.form.yamlFileList.length > 0) {
        this.uploadYamlLoading = true
        let url = 'mec/developer/v1/files/helm-template-yaml?userId=' + this.userId + '&projectId=' + projectId
        let fd = new FormData()
        fd.append('file', this.form.yamlFileList[0])
        Post(url, fd).then(res => {
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
          message: this.$t('promptMessage.uploadApiFile')
        })
      }
    },
    // 方式二获取image  type: 第一次获取get / 还是添加
    getImage (type, params) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image'
      if (type === 'get') {
        Get(url).then(res => {
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
    getYamlFile () {
      this.form.yamlFileData = []
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/files/helm-template-yaml?userId=' + this.userId + '&projectId=' + projectId
      Get(url).then(res => {
        res.data.forEach(item => {
          this.form.yamlFileData.push(item)
        })
        this.yamlDataLoading = false
      })
    },
    deleteYamlFile (item, index) {
      let url = 'mec/developer/v1/files/helm-template-yaml?fileId=' + item.fileId
      Delete(url).then(res => {
        this.form.yamlFileData.splice(index, 1)
      })
    },
    ifNext () {
      this.verifyImageName()
      this.verifyImageVersion()
      let apiFileId = this.form.appApiFileId
      let imageNameData = this.form.imageNameData.length
      let ifNext = false
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
    this.getYamlFile()
    if (this.projectBeforeConfig.appApiFileId) this.form.appApiFileId = this.projectBeforeConfig.appApiFileId
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
      i{
        margin-left: 10px;
        cursor: pointer;
      }
      i:hover{
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
  }
  @media screen and (max-width: 1380px) {
    .imageSelect {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
