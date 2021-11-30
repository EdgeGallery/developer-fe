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
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      class="default_dialog"
      width="30%"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ this.isEdit ? $t('system.profileMgmt.modifyProfile'):$t('system.profileMgmt.newProfile') }}
      </div>
      <el-form>
        <el-form-item
          :label="$t('system.profileMgmt.file')"
          prop="file"
          ref="import"
        >
          <el-upload
            action=""
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :on-remove="handleDelte"
            :file-list="form.file"
            :auto-upload="false"
            accept=".zip"
          >
            <el-button
              slot="trigger"
              size="medium"
              plain
              class="featuresBtn"
            >
              {{ $t('system.profileMgmt.uploadFile') }}
            </el-button>
            <el-tooltip
              effect="dark"
              style="margin-left:10px;"
              :content="$t('system.profileMgmt.contentTip')"
              placement="right"
            >
              <span class="default_info_promt">i</span>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="closeAddDlg"
          class="bgBtn"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="onSubmit"
          class="bgBtn"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { profileMgmtApi } from '@/tools/api.js'
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    profileId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: {
        file: []
      }
    }
  },
  methods: {
    closeAddDlg () {
      this.$emit('closedig')
    },
    handleExceed () {
      this.$eg_messagebox(this.$t('system.fileExceed'), 'warning')
    },
    handleChange (file, fileList) {
      this.form.file.push(file.raw)
    },
    handleDelte (file, fileList) {
      this.form.file = fileList
    },
    onSubmit () {
      let fd = new FormData()
      fd.append('file', this.form.file[0])
      if (this.isEdit) {
        profileMgmtApi.modifyProfile(this.profileId, fd).then(res => {
          this.$eg_messagebox(this.$t('promptMessage.uploadSuccess'), 'success')
        }).catch(() => {
          this.$eg_messagebox(this.$t('promptMessage.uploadFailure'), 'error')
        })
      } else {
        profileMgmtApi.addProfile(fd).then(res => {
          this.$eg_messagebox(this.$t('promptMessage.uploadSuccess'), 'success')
        }).catch(() => {
          this.$eg_messagebox(this.$t('promptMessage.uploadFailure'), 'error')
        })
      }
      this.closeAddDlg()
      this.form = {
        file: []
      }
      this.$emit('getListData')
    }
  }
}
</script>
