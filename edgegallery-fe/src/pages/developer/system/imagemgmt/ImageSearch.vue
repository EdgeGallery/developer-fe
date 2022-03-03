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
          :placeholder="$t('devSystem.imageMgmt.imgName')"
          @keyup.enter.native="search"
          class="search_input"
          @clear="search"
          @change="search"
          suffix-icon="el-icon-search"
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
          :start-placeholder="$t('devSystem.imageMgmt.beginTime')"
          :end-placeholder="$t('devSystem.imageMgmt.endTime')"
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
      formData: {
        systemName: '',
        searchTimeRange: []
      }
    }
  },
  methods: {
    search () {
      sessionStorage.setItem('currentPage', 1)
      this.$emit('getSearchData', this.formData)
    }
  }
}
</script>
<style lang='less'>
.search{
  margin-top: 10px;
  .create_time{
    width: 305px;
    border-radius: 8px;
    border-color: #5e40c8;
    height: 30px;
    margin-left: 30px;
    position: relative;
    .el-icon-date:before{
      display: none;
    }
    .el-range-input{
      width: 45%;
    }
  }
  .el-date-editor .el-range-separator{
    color: #fff;
  }
  .create_time.el-input__inner, .create_time input{
    background-color: transparent !important;
    color: #fff;
  }
  .el-range-editor.el-input__inner{
    padding: 0;
  }
}
</style>
