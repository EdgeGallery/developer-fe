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
      :title="$t('system.imageMgmt.tip.viewImg')"
      :visible.sync="showDlg"
      @closed="cancel"
      width="40%"
    >
      <div style="margin-top:10px;margin-left:5%;margin-right:5%">
        <el-form
          label-width="150px"
          label-position="left"
        >
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item
                :label="$t('system.imageMgmt.imgName')"
              >
                <span>{{ imageData.systemName }}</span>
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
                <span>{{ convertImgType(imageData.type) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('system.imageMgmt.osName')"
              >
                <span>{{ imageData.operateSystem }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item
                :label="$t('system.imageMgmt.osVersion')"
              >
                <span>{{ imageData.version }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('system.imageMgmt.osBit')"
              >
                <span>{{ imageData.systemBit }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item
                :label="$t('system.imageMgmt.sysDisk')"
              >
                <span>{{ imageData.systemDisk }}G</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('system.imageMgmt.imgFormat')"
              >
                <span>{{ imageData.systemFormat }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item
                :label="$t('system.imageMgmt.createTime')"
              >
                <span>{{ imageData.createTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item
                :label="$t('common.status')"
              >
                <span>{{ convertStatus(imageData.status) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item
                :label="$t('system.imageMgmt.uploadTime')"
              >
                <span>{{ imageData.uploadTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="margin-top:20px;text-align:center">
        <el-button
          id="btn_close"
          @click="close()"
        >
          {{ $t('common.close') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
    initOptionList () {
      this.imageTypeOptionList = [
        { value: 'public', label: this.$t('system.imageMgmt.typeValue.public') },
        { value: 'private', label: this.$t('system.imageMgmt.typeValue.private') }
      ]
      this.statusOptionList = [
        { value: 'UPLOAD_WAIT', label: this.$t('system.imageMgmt.statusValue.uploadWait') },
        { value: 'UPLOADING', label: this.$t('system.imageMgmt.statusValue.uploading') },
        { value: 'UPLOAD_SUCCEED', label: this.$t('system.imageMgmt.statusValue.uploadSucceeded') },
        { value: 'UPLOAD_FAILED', label: this.$t('system.imageMgmt.statusValue.uploadFailed') },
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
