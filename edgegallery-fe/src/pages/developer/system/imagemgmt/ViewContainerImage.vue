<!--
  -  Copyright 2022 Huawei Technologies Co., Ltd.
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
      append-to-body
      center
    >
      <div class="common-dlg-title">
        {{ $t('devSystem.imageMgmt.tip.viewImg') }}
      </div>
      <el-form
        label-width="110px"
        label-position="left"
        class="common-form"
      >
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item
              :label="$t('devSystem.imageMgmt.imgName')"
            >
              <span>{{ imageData.imageName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('devSystem.imageMgmt.userName')"
            >
              <span>{{ imageData.userName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item
              :label="$t('devSystem.imageMgmt.imgType')"
            >
              <span>{{ convertImgType(imageData.imageType) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('devSystem.imageMgmt.osVersion')"
            >
              <span>{{ imageData.imageVersion }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item
              :label="$t('devSystem.imageMgmt.createTime')"
            >
              <span>{{ dateChange(imageData.createTime) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item
              :label="$t('devSystem.status')"
            >
              <span>{{ convertStatus(imageData.imageStatus) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <el-form-item
              :label="$t('devSystem.imageMgmt.uploadTime')"
            >
              <span>{{ dateChange(imageData.uploadTime) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
      >
        <el-button
          id="btn_close"
          @click="close()"
          class="common-btn"
        >
          {{ $t('common.close') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDateTime } from '@/tools/common.js'
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
      return formatDateTime(timestr)
    },
    initOptionList () {
      this.imageTypeOptionList = [
        { value: 'public', label: this.$t('devSystem.imageMgmt.typeValue.public') },
        { value: 'private', label: this.$t('devSystem.imageMgmt.typeValue.private') }
      ]
      this.statusOptionList = [
        { value: 'UPLOAD_WAIT', label: this.$t('devSystem.imageMgmt.statusValue.uploadWait') },
        { value: 'UPLOADING', label: this.$t('devSystem.imageMgmt.statusValue.uploading') },
        { value: 'UPLOADING_MERGING', label: this.$t('devSystem.imageMgmt.statusValue.merging') },
        { value: 'UPLOAD_SUCCEED', label: this.$t('devSystem.imageMgmt.statusValue.uploadSucceeded') },
        { value: 'UPLOAD_FAILED', label: this.$t('devSystem.imageMgmt.statusValue.uploadFailed') },
        { value: 'UPLOAD_CANCELLED', label: this.$t('devSystem.imageMgmt.statusValue.uploadCancelled') },
        { value: 'PUBLISHED', label: this.$t('devSystem.imageMgmt.statusValue.published') }
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
  margin-bottom:10px !important;
}
</style>
