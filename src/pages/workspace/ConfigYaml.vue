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
  <div class="config-yaml">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item :label="$t('workspace.appimage')">
        <p
          v-for="item in form.appImage"
          :key="item.id"
          v-loading="getImageLoading"
          element-loading-spinner="el-icon-loading"
          :element-loading-text="$t('promptMessage.loadingText')"
        >
          <strong style="margin: 0 5px;">{{ $t('workspace.imagename') }}:</strong>
          {{ item.name }}: {{ item.version }}

          <strong style="margin: 0 5px;">{{ $t('workspace.inPort') }}:</strong>
          {{ item.port }}
          <strong style="margin: 0 5px;">{{ $t('workspace.outPort') }}:</strong>
          {{ item.nodePort }}
        </p>
      </el-form-item>
      <el-form-item :label="$t('workspace.addimage')">
        <el-select
          id="selectImage"
          v-model="form.image"
          :placeholder="$t('workspace.select')"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
        <el-input-number
          id="inputPort"
          v-model="form.imagePort"
          :min="1"
          :max="999999"
          controls-position="right"
          :placeholder="$t('workspace.port')"
          class="portInput"
        />
        <el-button
          id="addBtn"
          @click="addImage"
          class="addBtn"
        >
          {{ $t('workspace.add') }}
        </el-button>
        <p
          v-for="(item, index) in form.addImagesList"
          :key="index"
          class="imageResult"
          v-loading="getImageLoading"
          element-loading-spinner="el-icon-loading"
          :element-loading-text="$t('promptMessage.loadingText')"
        >
          <strong>Image: &nbsp;&nbsp;&nbsp;</strong>{{ item.name }} : {{ item.version }};&nbsp;&nbsp;
          <strong>Port: &nbsp;&nbsp;&nbsp;</strong>{{ item.port }}
          <em
            class="el-icon-close curp"
            @click="deleteImagesList(item, index)"
          />
        </p>
      </el-form-item>
      <el-form-item
        :label="$t('workspace.service')"
      >
        <el-input
          id="serviceName"
          v-model="form.serviceName"
          :placeholder="$t('workspace.servicename')"
          class="serviceName"
        />
        <el-input
          id="serviceHref"
          v-model="form.serviceHref"
          :placeholder="$t('workspace.href')"
          class="serviceName"
        />
        <el-input-number
          id="servicePort"
          v-model="form.servicePort"
          controls-position="right"
          :min="32000"
          :max="32767"
          :placeholder="$t('workspace.port')"
          class="portInput"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Get, Post, Delete } from '../../tools/tool.js'
export default {
  name: 'ConfigYaml',
  props: {
    projectBeforeConfig: {
      type: Object,
      default () {
        return {
          agentConfig: {}
        }
      }
    },
    allStepData: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      form: {
        appImage: [],
        image: '',
        imagePort: '',
        addImagesList: [],
        serviceName: '',
        serviceHref: '',
        servicePort: ''
      },
      options: [{
        value: '1',
        label: 'postgre:9.6.15'
      }, {
        value: '2',
        label: 'redis: alpine'
      }],
      value: '',
      getImageLoading: true
    }
  },
  methods: {
    addImage () {
      if (this.form.imagePort && this.form.image) {
        let projectId = sessionStorage.getItem('mecDetailID')
        let url = 'mec/developer/v1/projects/' + projectId + '/image'
        let params = {
          name: this.form.image.split(':')[0],
          version: this.form.image.split(':')[1],
          port: this.form.imagePort,
          projectId: projectId,
          type: ['OTHER']
        }
        Post(url, params).then(res => {
          this.form.addImagesList.push(res.data)
        })
      }
    },
    deleteImagesList (item, index) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image/' + item.id
      Delete(url).then(res => {
        this.getImage()
        this.form.addImagesList.splice(index, 1)
      })
    },
    getImage (type) {
      let projectId = sessionStorage.getItem('mecDetailID')
      let url = 'mec/developer/v1/projects/' + projectId + '/image'
      Get(url).then(res => {
        if (type === 'get') {
          res.data.images.forEach(item => {
            if (item.type === 'OTHER') {
              this.form.addImagesList.push(item)
            } else {
              this.form.appImage.push(item)
            }
          })
          this.getImageLoading = false
        }
      })
    },
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        this.form.appImage = [...this.form.appImage, ...this.form.addImagesList]
        let image = new Set(this.form.appImage)
        this.form.appImage = [...image]
        this.$emit('getStepData', { step: 'second', data: this.form, ifNext })
      }
    },
    getSecondData () {
      if (this.allStepData.second) {
        let secondData = this.allStepData.second
        this.form.serviceName = secondData.serviceName
        this.form.serviceHref = secondData.serviceHref
        this.form.servicePort = secondData.servicePort
      }
    }
  },
  mounted () {
    this.getImage('get')
    this.getSecondData()
    if (this.projectBeforeConfig.agentConfig) {
      this.form.serviceName = this.projectBeforeConfig.agentConfig.serviceName
      this.form.serviceHref = this.projectBeforeConfig.agentConfig.href
      this.form.servicePort = this.projectBeforeConfig.agentConfig.port
    }
  }
}
</script>

<style lang="less">
.config-yaml{
  input{
    height: 30px;
    line-height: 30px;
  }
  .el-input{
    width: 100%;
    margin-right: 10px;
  }
  .el-select .el-input{
    width: 150px;
  }
  .el-input.serviceName{
    width: 150px;
  }
  .addBtn{
    padding: 7px 20px;
    background-color: #fff;
    border: 1px solid #688ef3;
    color: #688ef3;
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
  .portInput{
    width: 90px;
    margin-left: 5px;
    margin-right: 10px;
  }
  .imageResult i{
    margin-left: 10px;
  }
  .imageResult i:hover{
    color: #688ef3;
  }
  .el-loading-spinner{
    p{
      line-height: 0px;
    }
  }
}
</style>
