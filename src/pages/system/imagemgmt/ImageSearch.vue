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
    <el-row>
      <el-col :span="24" />
    </el-row>
    <el-form
      :model="formData"
      ref="formData"
      label-position="right"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item
            :label="$t('system.imageMgmt.imgName')"
            prop="systemName"
            label-width="120px"
          >
            <el-input
              id="elinput_systemName"
              maxlength="50"
              size="small"
              style="width:95%"
              v-model="formData.systemName"
              :placeholder="$t('system.imageMgmt.imgName')"
              @keyup.enter.native="search"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            :label="$t('system.imageMgmt.osName')"
            prop="operateSystem"
            label-width="135px"
          >
            <el-input
              id="elinput_operateSystem"
              maxlength="20"
              size="small"
              style="width:95%"
              v-model="formData.operateSystem"
              :placeholder="$t('system.imageMgmt.osName')"
              @keyup.enter.native="search"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            :label="$t('common.status')"
            prop="status"
            label-width="60px"
          >
            <el-select
              id="elselect_status"
              v-model="formData.status"
              size="small"
              style="width:95%"
              @change="search"
            >
              <el-option
                v-for="item in statusOptionList"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            :label="$t('system.imageMgmt.createTime')"
            prop="createTimeRange"
            label-width="150px"
          >
            <el-date-picker
              id="eldatepicker_createTimeRange"
              v-model="formData.createTimeRange"
              type="daterange"
              size="small"
              style="width:95%"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('system.imageMgmt.beginTime')"
              :end-placeholder="$t('system.imageMgmt.endTime')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div
            class="flex"
            style="justify-content: center; align-items: center;"
          >
            <el-button
              id="resetBtn"
              @click="resetForm('formData')"
            >
              {{ $t('common.reset') }}
            </el-button>
            <el-button
              id="searchBtn"
              type="primary"
              @click="search"
            >
              {{ $t('common.search') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
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
        operateSystem: '',
        status: 'All',
        createTimeRange: []
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
        { value: 'UPLOAD_SUCCEED', label: this.$t('system.imageMgmt.statusValue.uploadSucceeded') },
        { value: 'UPLOAD_FAILED', label: this.$t('system.imageMgmt.statusValue.uploadFailed') },
        { value: 'PUBLISHED', label: this.$t('system.imageMgmt.statusValue.published') }
      ]
    }
  }
}
</script>
<style lang='less' scoped>
.search{
  margin-top: 10px;
  .el-select{
    width:80%;
  }
  .el-input{
    width:80%;
  }
}
</style>
