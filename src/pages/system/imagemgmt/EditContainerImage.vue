<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="showDlg"
    class="edit_image_dialog default_dialog"
    :class="{'edit_image_dialog_en':language==='en'}"
  >
    <div
      slot="title"
      class="el-dialog__title"
    >
      <em class="title_icon" />{{ dlgTitle }}
    </div>
    <el-form
      :label-width="language==='cn'?formLabelWidth:formLabelWidthEn"
      :model="imageDataForm"
      ref="imageDataForm"
      :rules="rules"
      class="clear"
    >
      <el-form-item
        :label="$t('system.imageMgmt.imgName')"
        prop="imageName"
        class="half"
      >
        <el-input
          id="elinput_systemName_container"
          maxlength="32"
          size="small"
          v-model="imageDataForm.imageName"
          :placeholder="$t('system.imageMgmt.imgName')"
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="$t('system.imageMgmt.osVersion')"
        prop="imageVersion"
        class="half"
      >
        <el-input
          id="elinput_osversion_container"
          maxlength="10"
          size="small"
          v-model="imageDataForm.imageVersion"
          :placeholder="$t('system.imageMgmt.osVersion')"
          clearable
        />
      </el-form-item>
      <el-form-item
        v-show="isAdmin"
        :label="$t('system.imageMgmt.imgType')"
        class="lt"
      >
        <el-radio-group
          v-model="imageDataForm.imageType"
          class="default_radio"
        >
          <el-radio
            v-for="(item,index) in imageTypeOptionList"
            :key="index"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        id="btn_cancel_container"
        @click="cancel()"
        class="bgBtn defaultFontLight"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="btn_confirm_container"
        type="primary"
        @click="confirm()"
        class="bgBtn defaultFontLight"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { imageMgmtService } from '../../../tools/api.js'
export default {
  name: 'EditImageContainer',
  props: {
    value: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    imageData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    var validateImgNameEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('promptMessage.nameEmpty')))
      } else {
        callback()
      }
    }
    var validateImgNameRule = (rule, value, callback) => {
      let pattern = /^(?!_)(?!-)(?!\s)(?!.*?_$)(?!.*?-$)(?!.*?\s$)[a-zA-Z0-9_-]{4,32}$/
      if (value.match(pattern) === null) {
        callback(new Error(this.$t('system.imageMgmt.tip.nameRule')))
      } else {
        callback()
      }
    }
    var validateVersionEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('system.imageMgmt.tip.versionEmpty')))
      } else {
        callback()
      }
    }
    var validateVersionRule = (rule, value, callback) => {
      let pattern = /^[\w\\-][\w\\-\s.]{0,9}$/g
      if (value.match(pattern) === null) {
        callback(new Error(this.$t('system.imageMgmt.tip.versionRule')))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '100px',
      formLabelWidthEn: '130px',
      language: localStorage.getItem('language'),
      userId: '',
      userName: '',
      isAdmin: false,
      dlgTitle: this.$t('system.imageMgmt.tip.newImg'),
      imageTypeOptionList: [],
      imageDataForm: {
        'imageId': '',
        'imageName': '',
        'imageVersion': '',
        'userId': '',
        'userName': '',
        'uploadTime': '',
        'createTime': '',
        'imageType': '',
        'imagePath': '',
        'fileName': ''
      },
      rules: {
        imageName: [
          { validator: validateImgNameEmpty, trigger: 'blur' },
          { validator: validateImgNameRule }
        ],
        imageVersion: [
          { validator: validateVersionEmpty, trigger: 'blur' },
          { validator: validateVersionRule }
        ]
      },
      isModify: false,
      systemIdToModi: -1,
      showDlg: this.value
    }
  },
  watch: {
    value (val) {
      this.showDlg = val
      if (val) {
        this.init()
      }
    },
    '$i18n.locale': function () {
      this.initOptionList()
      this.language = localStorage.getItem('language')
      this.dlgTitle = this.isModify ? this.$t('system.imageMgmt.tip.editImg')
        : this.$t('system.imageMgmt.tip.newImg')
    }
  },
  mounted () {
    this.initUser()
    this.initOptionList()
    this.imageDataForm.imageType = this.isAdmin ? 'public' : 'private'
  },
  methods: {
    initUser () {
      this.userId = sessionStorage.getItem('userId')
      this.userName = sessionStorage.getItem('userName')
      this.imageDataForm.userId = this.userId
      this.imageDataForm.userName = this.userName
      let _authorities = sessionStorage.getItem('userAuthorities')
      if (_authorities && _authorities.length > 0) {
        this.isAdmin = _authorities.includes('ROLE_DEVELOPER_ADMIN')
      }
    },
    resetForm () {
      if (this.$refs['imageDataForm']) {
        this.$refs['imageDataForm'].resetFields()
      }
    },
    initOptionList () {
      this.imageTypeOptionList = [
        { value: 'public', label: this.$t('system.imageMgmt.typeValue.public') },
        { value: 'private', label: this.$t('system.imageMgmt.typeValue.private') }
      ]
    },
    init () {
      this.resetForm()
      if (this.imageData && this.imageData.imageId) {
        this.imageDataForm.imageName = this.imageData.imageName
        this.imageDataForm.imageVersion = this.imageData.imageVersion
        this.imageDataForm.imageType = this.imageData.imageType
        this.imageDataForm.imageStatus = this.imageData.imageStatus

        this.isModify = true
        this.systemIdToModi = this.imageData.imageId
        this.dlgTitle = this.$t('system.imageMgmt.tip.editImg')
      } else {
        this.imageDataForm.imageName = ''
        this.imageDataForm.imageVersion = ''
        this.imageDataForm.imageStatus = this.imageData.imageStatus
        this.imageDataForm.imageType = this.isAdmin ? 'public' : 'private'

        this.isModify = false
        this.systemIdToModi = -1
        this.dlgTitle = this.$t('system.imageMgmt.tip.newImg')
      }
    },
    cancel () {
      this.$emit('input', false)
    },
    confirm () {
      this.$refs['imageDataForm'].validate((valid) => {
        if (!valid) {
          return
        }
        if (!this.isModify) {
          imageMgmtService.newContainerImage(this.imageDataForm).then(() => {
            this.$message.success(this.$t('system.imageMgmt.tip.newImg') + this.$t('system.success'))
            this.$emit('processEditImageSuccess', 'container')
          }).catch((error) => {
            this.processEditError(error)
          })
        } else {
          imageMgmtService.modifyContainerImage(this.imageDataForm, this.systemIdToModi).then(() => {
            this.$message.success(this.$t('promptMessage.editSuccess'))
            this.$emit('processEditImageSuccess', 'container')
          }).catch((error) => {
            this.processEditError(error)
          })
        }
      })
    },
    processEditError (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === 'exist the same imageName') {
          this.$message.error(this.$t('system.imageMgmt.tip.systemNameExist'))
          return
        }
      }
      let _resKey = this.isModify ? 'system.imageMgmt.tip.modifyImgFailed' : 'system.imageMgmt.tip.newImgFailed'
      this.$message.error(this.$t(_resKey))
    }
  }
}
</script>
<style lang='less'>
.edit_image_dialog .el-dialog{
  width: 47%;
  min-width: 570px;
}
.edit_image_dialog_en .el-dialog{
  min-width: 715px;
}
.el-form-item{
  margin:20 !important;
}
</style>
