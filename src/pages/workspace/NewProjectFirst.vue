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
  <div class="firststep">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-position="left"
    >
      <el-form-item
        :label="$t('workspace.appName')"
        :label-width="formLabelWidth"
        prop="name"
      >
        <el-input
          id="projectName"
          v-model="form.name"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.version')"
        :label-width="formLabelWidth"
        prop="version"
      >
        <el-input
          id="projectVersion"
          v-model="form.version"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.provider')"
        :label-width="formLabelWidth"
        prop="provider"
      >
        <el-input
          id="projectProvider"
          v-model="form.provider"
        />
      </el-form-item>
      <el-form-item
        :label="$t('workspace.platform')"
        :label-width="formLabelWidth"
        prop="platform"
        class="platform"
      >
        <el-radio-group
          id="platformList"
          v-model="form.platform"
        >
          <el-radio
            v-for="(item,index) in platformList"
            :id="item"
            :key="index"
            :label="item"
          >
            {{ item }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('test.testApp.type')"
        :label-width="formLabelWidth"
        prop="type"
        class="platform"
      >
        <el-checkbox-group id="projectType">
          <el-select
            v-model="form.type"
            :placeholder="$t('test.testApp.choosetype')"
            class="list-select"
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
        :label="$t('workspace.icon')"
        :label-width="formLabelWidth"
        prop="logoFileList"
      >
        <el-upload
          id="projectLogo"
          class="upload-demo"
          ref="upload"
          action=""
          :limit="1"
          :file-list="logoFileList"
          :on-change="handleChangeLogo"
          :auto-upload="false"
          :on-remove="removeUploadLogo"
          accept=".jpg,.png"
          name="file"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
          >
            {{ $t('workspace.uploadIcon') }}
          </el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >
            <i class="el-icon-warning" />{{ $t('workspace.limitition') }}
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
        <div
          class="el-form-error"
          v-if="showErr"
        >
          {{ $t('workspace.iconRequired') }}
        </div>
      </el-form-item>
      <el-form-item
        :label="$t('test.testApp.description')"
        :label-width="formLabelWidth"
      >
        <el-input
          id="projectDescription"
          type="textarea"
          v-model="form.description"
          :placeholder="$t('test.testApp.description')"
          :rows="2"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    projectTypeprop: {
      type: String,
      default: 'CREATE_NEW'
    }
  },
  data () {
    return {
      form: {
        projectType: this.projectTypeprop,
        name: 'Video_Surveillance_app',
        version: '1.0',
        provider: 'Huawei',
        platform: 'KunPeng',
        type: 'Video',
        appIcon: [],
        iconFileId: '',
        description: '',
        status: 'ONLINE',
        base64Session: false
      },
      platformList: ['KunPeng', 'X86'],
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
      value: 0,
      logoFileList: [],
      defaultActive: 0,
      defaultIconFile: [],
      defaultIcon: [
        require('../../assets/images/appicon1.png'),
        require('../../assets/images/appicon2.png'),
        require('../../assets/images/appicon3.png')
      ],
      showErr: false,
      rules: {
        name: [
          { required: true, message: 'APP Name is required', trigger: 'blur' }
        ],
        version: [
          { required: true, message: 'Version is required', trigger: 'blur' }
        ],
        provider: [
          { required: true, message: 'Provider is required', trigger: 'blur' }
        ],
        platform: [
          { required: true }
        ],
        type: [
          { required: true }
        ],
        logoFileList: [
          { required: true, message: 'Icon is required', trigger: 'change' }
        ]
      },
      formLabelWidth: '100px',
      formdata: new FormData()
    }
  },

  methods: {
    handleChangeLogo (file, fileList) {
      this.form.base64Session = true
      this.form.appIcon = []
      this.defaultIconFile = []
      this.defaultActive = ''
      this.logoFileList.push(file.raw)
      if (file.size / 1024 > 500) {
        this.$message.warning(this.$t('promptMessage.moreThan500'))
        this.logoFileList = []
      }
      let type = file.raw.type.split('/')[0]
      this.fileToBase64(file.raw)
      if (type === 'image') {
        this.form.appIcon.push(file.raw)
      } else {
        this.form.appIcon = []
        this.$message({
          type: 'warning',
          message: 'Please upload pictures.'
        })
      }
      this.showErr = !this.logoFileList
    },
    removeUploadLogo (file, fileList) {
      this.logoFileList = fileList
      this.showErr = this.logoFileList
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
    chooseDefaultIcon (file, index) {
      this.form.base64Session = true
      this.logoFileList = []
      this.defaultIconFile = []
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
          this.defaultIconFile.push(this.base64toFile(base64))
          this.form.appIcon = this.defaultIconFile
          this.showErr = !this.defaultIconFile
        }
      }
    },
    emitStepData () {
      if (!this.form.appIcon.length) this.chooseDefaultIcon(this.defaultIcon[0], 1)
      this.$emit('getStepData', { data: this.form, step: 'first' })
    }
  },
  created () {
  },
  mounted () {
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
  }
}
</script>

<style lang="less">
  .firststep{
    .el-input__inner{
      height: 35px;
      line-height: 35px;
    }
    .list-select input{
      height: 35px;
      line-height: 35px;
    }
    .el-form-item__label{
      padding: 0 20px 0 0;
    }
    .el-radio__input.is-checked .el-radio__inner{
      background-color: #688ef3;
      border-color: #688ef3;
    }
    .el-radio__input.is-checked+.el-radio__label{
      color: #688ef3;
    }
    .upload-demo{
      .el-button--primary{
        background-color: #fff;
        border-color: #688ef3;
        color: #688ef3;
        padding: 6px 20px;
        margin-top: 8px;
      }
      .el-icon-warning{
        color: #688ef3;
        margin-right: 5px;
        font-size: 14px;
      }
      .el-upload__tip{
        margin-top: 10px;
      }
    }
    .el-form-item{
      margin-bottom: 15px;
    }
    .el-form-item.platform{
      margin-bottom: 8px;
    }
    .el-upload-list__item:first-child{
      margin-top: 0;
    }
    .el-form-item__error{
      padding-top: 0;
    }
  }
</style>
