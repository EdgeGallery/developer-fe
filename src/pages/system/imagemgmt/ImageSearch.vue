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
  <div class="search">
    <el-form
      :model="formData"
      ref="formData"
      label-position="center"
      class="clear"
    >
      <el-form-item
        prop="systemName"
        class="lt"
      >
        <el-input
          maxlength="50"
          size="small"
          v-model="formData.systemName"
          :placeholder="$t('system.imageMgmt.imgName')"
          @keyup.enter.native="search"
          class="search_input"
          @clear="search"
          @change="search"
        >
          <em
            slot="suffix"
            class="search_icon"
            @click="search"
          />
        </el-input>
      </el-form-item>
      <el-form-item
        prop="searchTimeRange"
        class="lt"
      >
        <el-date-picker
          v-model="formData.searchTimeRange"
          type="daterange"
          size="small"
          value-format="yyyy-MM-dd"
          :start-placeholder="$t('system.imageMgmt.beginTime')"
          :end-placeholder="$t('system.imageMgmt.endTime')"
          class="create_time"
          @change="search"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'ImageSearch',
  data () {
    return {
      statusOptionList: [],
      formData: {
        systemName: '',
        searchTimeRange: []
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.initStatusOptionList()
    }
  },
  mounted () {
    this.initStatusOptionList()
  },
  methods: {
    search () {
      sessionStorage.setItem('currentPage', 1)
      this.$emit('getSearchData', this.formData)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('getSearchData', this.formData)
    },
    initStatusOptionList () {
      this.statusOptionList = [
        { value: 'All', label: this.$t('common.all') },
        { value: 'UPLOAD_WAIT', label: this.$t('system.imageMgmt.statusValue.uploadWait') },
        { value: 'UPLOADING', label: this.$t('system.imageMgmt.statusValue.uploading') },
        { value: 'UPLOADING_MERGING', label: this.$t('system.imageMgmt.statusValue.merging') },
        { value: 'UPLOAD_SUCCEED', label: this.$t('system.imageMgmt.statusValue.uploadSucceeded') },
        { value: 'UPLOAD_FAILED', label: this.$t('system.imageMgmt.statusValue.uploadFailed') },
        { value: 'UPLOAD_CANCELLED', label: this.$t('system.imageMgmt.statusValue.uploadCancelled') },
        { value: 'PUBLISHED', label: this.$t('system.imageMgmt.statusValue.published') }
      ]
    }
  }
}
</script>
<style lang='less'>
.search{
  margin-top: 10px;
  // .search_input{
  //   width: 215px;
  //   .el-input__inner{
  //     border-radius: 8px;
  //     border-color: #5e40c8;
  //     height: 30px;
  //     line-height: 30px;
  //   }
  //   .search_icon{
  //     display: inline-block;
  //     width: 15px;
  //     height: 15px;
  //     background: url('../../../assets/images/work_project_search_icon.png');
  //     position: relative;
  //     top: 3px;
  //     cursor: pointer;
  //     margin-right: 5px;
  //   }
  // }
  .create_time{
    width: 260px;
    border-radius: 8px;
    border-color: #5e40c8;
    height: 30px;
    margin-left: 30px;
    position: relative;
    top: -1px;
    .el-icon-date:before{
      display: none;
    }
    .el-range-input{
      width: 45%;
    }
    .el-icon-circle-close:before{
      position: relative;
      top: 2px;
    }
  }
  .el-range-editor.el-input__inner{
    padding: 0;
  }
  .el-form-item .el-form-item__content{
    height: 30px;
    line-height: 30px;
  }
  .el-select{
    width:80%;
  }
}
</style>
