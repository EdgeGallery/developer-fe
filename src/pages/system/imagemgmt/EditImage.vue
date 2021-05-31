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
  <div>
    <el-dialog
      :title="dlgTitle"
      :visible.sync="showDlg"
      @closed="cancel"
      width="25%"
    >
      <div style="margin-top:20px">
        <el-form
          label-width="150px"
          :model="imageDataForm"
          ref="imageDataForm"
          :rules="rules"
        >
          <el-form-item
            :label="$t('system.imageMgmt.imgName')"
            prop="systemName"
          >
            <el-input
              id="elinput_systemName"
              maxlength="32"
              size="small"
              style="width:95%"
              v-model="imageDataForm.systemName"
              :placeholder="$t('system.imageMgmt.imgName')"
              clearable
            />
          </el-form-item>
          <el-form-item
            v-show="isAdmin"
            :label="$t('system.imageMgmt.imgType')"
            prop="type"
          >
            <el-radio-group v-model="imageDataForm.type">
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
            :label="$t('system.imageMgmt.osName')"
            prop="operateSystem"
          >
            <el-select
              id="elselect_operateSystem"
              v-model="imageDataForm.operateSystem"
              size="small"
              style="width:95%"
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
            prop="version"
          >
            <el-input
              id="elinput_osversion"
              maxlength="10"
              size="small"
              style="width:95%"
              v-model="imageDataForm.version"
              :placeholder="$t('system.imageMgmt.osVersion')"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.imageMgmt.osBit')"
            prop="systemBit"
          >
            <el-radio-group v-model="imageDataForm.systemBit">
              <el-radio
                v-for="(item,index) in systemBitOptionList"
                :key="index"
                :label="item"
              >
                {{ item }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            :label="$t('system.imageMgmt.sysDisk')"
            prop="systemDisk"
          >
            <el-input
              id="elinput_sysdisk"
              maxlength="4"
              size="small"
              style="width:95%"
              v-model="imageDataForm.systemDisk"
              :placeholder="$t('system.imageMgmt.sysDisk')"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.imageMgmt.imgFormat')"
            prop="systemFormat"
          >
            <el-radio-group v-model="imageDataForm.systemFormat">
              <el-radio
                v-for="(item,index) in systemFormatOptionList"
                :key="index"
                :label="item"
              >
                {{ item }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top:20px;text-align:right">
        <el-button
          id="btn_cancel"
          @click="cancel()"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="btn_confirm"
          type="primary"
          @click="confirm()"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { imageMgmtService } from '../../../tools/api.js'
export default {
  name: 'EditImage',
  props: {
    showDlg: {
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
    return {
      userId: '',
      isAdmin: false,
      dlgTitle: this.$t('system.imageMgmt.tip.newImg'),
      imageTypeOptionList: [],
      operateSystemOptList: [
        'ubuntu',
        'centos',
        'window',
        'cirros'
      ],
      systemBitOptionList: ['32', '64'],
      systemFormatOptionList: ['qcow2', 'iso'],
      imageDataForm: {
        'systemName': '',
        'type': '',
        'operateSystem': 'ubuntu',
        'version': '',
        'systemBit': '32',
        'systemDisk': '',
        'systemFormat': 'qcow2'
      },
      rules: {
        systemName: [
          { required: true, message: this.$t('promptMessage.nameEmpty'), trigger: 'blur' },
          { pattern: /^(?!_)(?!-)(?!\s)(?!.*?_$)(?!.*?-$)(?!.*?\s$)[a-zA-Z0-9_-]{4,32}$/, message: this.$t('promptMessage.nameRule') }
        ],
        version: [
          { required: true, message: this.$t('system.imageMgmt.tip.versionEmpty'), trigger: 'blur' },
          { pattern: /^[\w\\-][\w\\-\s.]{0,9}$/g, message: this.$t('promptMessage.versionRule') }
        ],
        systemDisk: [
          { required: true, message: this.$t('system.imageMgmt.tip.systemDiskEmpty'), trigger: 'blur' },
          { pattern: /^\d{2,4}$/, message: this.$t('system.imageMgmt.tip.systemDiskRule') }
        ]
      },

      isModify: false,
      systemIdToModi: -1
    }
  },
  watch: {
    showDlg (val) {
      if (val) {
        this.init()
      }
    },
    '$i18n.locale': function () {
      this.initOptionList()
      this.$refs['imageDataForm'].fields.forEach(item => {
        if (item.validateState === 'error') {
          this.$refs['imageDataForm'].validateField(item.labelFor)
        }
      })
      this.dlgTitle = this.isModify ? this.$t('system.imageMgmt.tip.editImg')
        : this.$t('system.imageMgmt.tip.newImg')
    }
  },
  mounted () {
    this.initUser()
    this.initOptionList()
    this.imageDataForm.type = this.isAdmin ? 'public' : 'private'
  },
  methods: {
    initUser () {
      this.userId = sessionStorage.getItem('userId')
      let _authorities = sessionStorage.getItem('userAuthorities')
      if (_authorities && _authorities.length > 0) {
        this.isAdmin = _authorities.includes('ROLE_DEVELOPER_ADMIN')
      }
    },
    resetForm () {
      this.$refs['imageDataForm'].resetFields()
    },
    initOptionList () {
      this.imageTypeOptionList = [
        { value: 'public', label: this.$t('system.imageMgmt.typeValue.public') },
        { value: 'private', label: this.$t('system.imageMgmt.typeValue.private') }
      ]
    },
    init () {
      this.resetForm()
      if (this.imageData && this.imageData.systemName) {
        this.imageDataForm.systemName = this.imageData.systemName
        this.imageDataForm.type = this.imageData.type
        this.imageDataForm.operateSystem = this.imageData.operateSystem
        this.imageDataForm.version = this.imageData.version
        this.imageDataForm.systemBit = this.imageData.systemBit
        this.imageDataForm.systemDisk = this.imageData.systemDisk
        this.imageDataForm.systemFormat = this.imageData.systemFormat

        this.isModify = true
        this.systemIdToModi = this.imageData.systemId
        this.dlgTitle = this.$t('system.imageMgmt.tip.editImg')
      }
    },
    cancel () {
      this.showDlg = false
      this.$emit('cancelEditImageDlg')
    },
    confirm () {
      this.$refs['imageDataForm'].validate((valid) => {
        if (!valid) {
          return
        }

        if (!this.isModify) {
          imageMgmtService.newImage(this.imageDataForm, this.userId).then(() => {
            this.$emit('processEditImageSuccess')
          }).catch(() => {
            this.$message.error(this.$t('system.imageMgmt.tip.newImgFailed'))
          })
        } else {
          imageMgmtService.modifyImage(this.imageDataForm, this.systemIdToModi, this.userId).then(() => {
            this.$emit('processEditImageSuccess')
          }).catch(() => {
            this.$message.error(this.$t('system.imageMgmt.tip.modifyImgFailed'))
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.el-form-item{
  margin:20 !important;
}
</style>
