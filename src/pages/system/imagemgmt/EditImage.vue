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
        prop="name"
        class="half"
      >
        <el-input
          id="elinput_systemName"
          size="small"
          v-model="imageDataForm.name"
          :placeholder="$t('system.imageMgmt.imgName')"
          clearable
        />
        <el-tooltip
          class="name_tip"
          effect="light"
          :content="this.$t('system.imageMgmt.tip.nameRule')"
          placement="bottom"
        >
          <span
            class="default_info_promt"
            :style="{marginTop:'15px'}"
          >i</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        :label="$t('system.imageMgmt.osName')"
        prop="osType"
        class="half"
      >
        <el-select
          id="elselect_operateSystem"
          v-model="imageDataForm.osType"
          size="small"
        >
          <el-option
            v-for="item in operateSystemOptList"
            :label="item"
            :value="item"
            :key="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('system.imageMgmt.osVersion')"
        prop="osVersion"
        class="half"
      >
        <el-input
          id="elinput_osversion"
          maxlength="20"
          size="small"
          v-model="imageDataForm.osVersion"
          :placeholder="$t('system.imageMgmt.osVersion')"
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="$t('system.imageMgmt.sysDisk')"
        prop="systemDiskSize"
        class="elinput_sysdisk half"
      >
        <el-input
          id="elinput_sysdisk"
          maxlength="4"
          size="small"
          v-model="imageDataForm.systemDiskSize"
          :placeholder="$t('system.imageMgmt.sysDisk')"
          clearable
        />
        <span class="span_right">G</span>
      </el-form-item>
      <el-form-item
        v-show="isAdmin"
        :label="$t('system.imageMgmt.imgType')"
        prop="visibleType"
        class="lt"
      >
        <el-radio-group
          v-model="imageDataForm.visibleType"
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
      <el-form-item
        :label="$t('system.imageMgmt.osBit')"
        prop="osBitType"
        class="lt"
      >
        <el-radio-group
          v-model="imageDataForm.osBitType"
          class="default_radio"
        >
          <el-radio
            v-for="(item,index) in systemBitOptionList"
            :key="index"
            :label="item"
          >
            {{ item }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        id="btn_cancel"
        @click="cancel()"
        class="bgBtn"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="btn_confirm"
        type="primary"
        @click="confirm()"
        class="bgBtn"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { imageMgmtService } from '../../../tools/api.js'
export default {
  name: 'EditImage',
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
        callback(new Error(this.$t('system.imageMgmt.tip.nameRules')))
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
      let pattern = /^[\w\\-][\w\\-\s.]{0,19}$/g
      if (value.match(pattern) === null) {
        callback(new Error(this.$t('system.imageMgmt.tip.versionRule')))
      } else {
        callback()
      }
    }
    var validateSystemDiskEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('system.imageMgmt.tip.systemDiskEmpty')))
      } else {
        callback()
      }
    }
    var validateSystemDiskRule = (rule, value, callback) => {
      let _strValue = value.toString()
      let pattern = /^\d{2,4}$/
      if (_strValue.match(pattern) === null) {
        callback(new Error(this.$t('system.imageMgmt.tip.systemDiskRule')))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '115px',
      formLabelWidthEn: '160px',
      language: localStorage.getItem('language'),
      isAdmin: false,
      dlgTitle: this.$t('system.imageMgmt.tip.newImg'),
      imageTypeOptionList: [],
      operateSystemOptList: [
        'ubuntu',
        'centos',
        'windows',
        'cirros'
      ],
      systemBitOptionList: ['64', '32'],
      systemFormatOptionList: ['qcow2', 'iso'],
      imageDataForm: {
        'name': '',
        'visibleType': '',
        'osType': 'ubuntu',
        'osVersion': '',
        'osBitType': '64',
        'systemDiskSize': ''
      },
      rules: {
        name: [
          { required: true, validator: validateImgNameEmpty, trigger: 'blur' },
          { validator: validateImgNameRule }
        ],
        osVersion: [
          { required: true, validator: validateVersionEmpty, trigger: 'blur' },
          { validator: validateVersionRule }
        ],
        systemDiskSize: [
          { required: true, validator: validateSystemDiskEmpty, trigger: 'blur' },
          { validator: validateSystemDiskRule }
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
    this.imageDataForm.visibleType = this.isAdmin ? 'public' : 'private'
  },
  methods: {
    initUser () {
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
      if (this.imageData && this.imageData.name) {
        this.imageDataForm.name = this.imageData.name
        this.imageDataForm.visibleType = this.imageData.visibleType
        this.imageDataForm.osType = this.imageData.osType
        this.imageDataForm.osVersion = this.imageData.osVersion
        this.imageDataForm.osBitType = this.imageData.osBitType
        this.imageDataForm.systemDiskSize = this.imageData.systemDiskSize

        this.isModify = true
        this.systemIdToModi = this.imageData.id
        this.dlgTitle = this.$t('system.imageMgmt.tip.editImg')
      } else {
        this.imageDataForm.name = ''
        this.imageDataForm.visibleType = this.isAdmin ? 'public' : 'private'
        this.imageDataForm.osType = 'ubuntu'
        this.imageDataForm.osVersion = ''
        this.imageDataForm.osBitType = '64'
        this.imageDataForm.systemDiskSize = ''

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
          imageMgmtService.newImage(this.imageDataForm).then(() => {
            this.$message.success(this.$t('system.imageMgmt.tip.newImg') + this.$t('system.success'))
            this.$emit('processEditImageSuccess', 'vm')
          }).catch((error) => {
            this.processEditError(error)
          })
        } else {
          imageMgmtService.modifyImage(this.imageDataForm, this.systemIdToModi).then(() => {
            this.$message.success(this.$t('promptMessage.editSuccess'))
            this.$emit('processEditImageSuccess', 'vm')
          }).catch((error) => {
            this.processEditError(error)
          })
        }
      })
    },
    processEditError (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === 'image Name can not duplicate.') {
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
  background: #efefef;
  border-radius: 12px;
}
.edit_image_dialog_en .el-dialog{
  min-width: 780px;
}
.el-form-item{
  margin:20 !important;
  position: relative;
  .name_tip{
    position: absolute;
    right: -20px;
    bottom: 7px;
    z-index: 99;
  }
}
.elinput_sysdisk{
  .span_right{
    position: absolute;
    right: -20px;
    bottom: 0;
  }
}
.el-tooltip__popper.is-light {
  border: 1px solid #ddd;
}
</style>
