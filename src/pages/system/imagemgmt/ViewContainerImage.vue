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
      :close-on-click-modal="false"
      :visible.sync="showDlg"
      class="view_image_dialog default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('system.imageMgmt.tip.viewImg') }}
      </div>
      <el-form
        label-width="110px"
        label-position="left"
      >
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item
              :label="$t('system.imageMgmt.imgName')"
            >
              <span>{{ imageData.imageName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('system.imageMgmt.userName')"
            >
              <span>{{ imageData.userName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item
              :label="$t('system.imageMgmt.imgType')"
            >
              <span>{{ convertImgType(imageData.imageType) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('system.imageMgmt.osVersion')"
            >
              <span>{{ imageData.imageVersion }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item
              :label="$t('system.imageMgmt.createTime')"
            >
              <span>{{ dateChange(imageData.createTime) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item
              :label="$t('common.status')"
            >
              <span>{{ convertStatus(imageData.imageStatus) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item
              :label="$t('system.imageMgmt.uploadTime')"
            >
              <span>{{ dateChange(imageData.uploadTime) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer center"
      >
        <el-button
          id="btn_close"
          @click="close()"
          class="bgBtn"
        >
          {{ $t('common.close') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { common } from '../../../tools/common.js'
export default {
  name: 'ViewImage',
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
      imageTypeOptionList: [],
      statusOptionList: []
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.initOptionList()
    }
  },
  mounted () {
    this.initOptionList()
  },
  methods: {
    dateChange (timestr) {
      return common.dateChange(timestr)
    },
    initOptionList () {
      this.imageTypeOptionList = [
        { value: 'public', label: this.$t('system.imageMgmt.typeValue.public') },
        { value: 'private', label: this.$t('system.imageMgmt.typeValue.private') }
      ]
      this.statusOptionList = [
        { value: 'UPLOAD_WAIT', label: this.$t('system.imageMgmt.statusValue.uploadWait') },
        { value: 'UPLOADING', label: this.$t('system.imageMgmt.statusValue.uploading') },
        { value: 'UPLOADING_MERGING', label: this.$t('system.imageMgmt.statusValue.merging') },
        { value: 'UPLOAD_SUCCEED', label: this.$t('system.imageMgmt.statusValue.uploadSucceeded') },
        { value: 'UPLOAD_FAILED', label: this.$t('system.imageMgmt.statusValue.uploadFailed') },
        { value: 'UPLOAD_CANCELLED', label: this.$t('system.imageMgmt.statusValue.uploadCancelled') },
        { value: 'PUBLISHED', label: this.$t('system.imageMgmt.statusValue.published') }
      ]
    },
    convertImgType (typeValue) {
      if (typeValue) {
        let imgTypeOption = this.imageTypeOptionList.find(item => item.value === typeValue)
        if (imgTypeOption) {
          return imgTypeOption.label
        }
      }

      return this.$t('common.unknown')
    },
    convertStatus (statusValue) {
      if (statusValue) {
        let statusOption = this.statusOptionList.find(item => item.value === statusValue)
        if (statusOption) {
          return statusOption.label
        }
      }

      return this.$t('common.unknown')
    },
    close () {
      this.showDlg = false
      this.$emit('processCloseViewImage')
    }
  }
}
</script>
<style lang='less' scoped>
.el-form-item{
  margin:0 !important;
}
</style>
