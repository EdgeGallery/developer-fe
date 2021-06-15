<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="imageSelect">
    <h3 class="image_title clear">
      <span class="span_lefts">{{ $t('workspace.uploadImage.mode1') }}</span>
      <span class="span_right">
        {{ $t('workspace.uploadImage.mode1Desc') }}
        <el-tooltip
          class="item"
          effect="dark"
          :content="this.$t('workspace.uploadImage.mode1Tip')"
          placement="right"
        >
          <em class="el-icon-question" />
        </el-tooltip>
      </span>
    </h3>
    <h3
      class="image_title clear"
    >
      <span class="span_lefts">{{ $t('workspace.uploadImage.mode2') }}</span>
      <span class="span_right">
        {{ $t('workspace.uploadImage.mode2Desc') }}
      </span>
    </h3>
    <div class="upload-image">
      <UploadBigFile
        :upload-url-prop="uploadUrl"
        :merge-url-prop="mergeUrl"
        :btn-name-prop="btnName"
        :params-name-prop="paramsName"
      />
    </div>
  </div>
</template>

<script>
import UploadBigFile from '../../components/common/UploadBigFile.vue'
export default {
  name: 'ImageSelect',
  components: {
    UploadBigFile
  },
  props: {
    projectBeforeConfig: {
      type: Object,
      required: true
    },
    allStepData: {
      type: Object,
      required: true
    }
  },
  computed: {
    btnName () {
      return this.$t('workspace.uploadImage.uploadAppImage')
    }
  },
  data () {
    return {
      validate: false,
      userId: sessionStorage.getItem('userId'),
      hostId: '',
      ip: '',
      port: '',
      enable: false,
      install_href: 'https://gitee.com/edgegallery/docs/blob/master/Projects/Developer/add_edgeNode_guide.md',
      isIpError: false,
      isPortError: false,
      uploadUrl: 'mec/developer/v1/image/upload',
      mergeUrl: 'mec/developer/v1/image/merge?fileName=',
      paramsName: 'guid'
    }
  },
  methods: {
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = { ip: '', port: '', hostId: '', enable: false }
        this.$emit('getStepData', { step: 'third', data, ifNext })
      }
    }
  }
}
</script>

<style lang="less">
  .imageSelect {
    width: 88%;
    margin-left: 6%;
    .image_title{
      font-size: 16px;
      margin-top: 20px;
      span{
        float: left;
        margin-bottom: 10px;
      }
      span.span_lefts{
        width: 62px;
        margin-right: 10px;
      }
      span.span_right{
        width: calc( 100% - 72px);
      }
    }
    .upload-image {
      margin: 0px 0 15px 72px;
    }
    .el-icon-question:before{
      color: #688ef3;
      font-size: 16px;
      margin-left: 5px;
    }
    .el-icon-question.gray:before{
      color: #adb0b8;
    }
    .install_link{
      margin: 0 0 0 10px;
      font-size: 13px;
      color: #688ef3;
      span{
        margin-bottom: 4px;
      }
    }
    .gray {
      color: #adb0b8;
    }

    .tip {
      font-size: 12px;
      margin: 0px 72px 15px 72px;
      line-height: 20px;
    }

    .table-container {
      padding: 20px 72px;
    }

    .el-table {
      width: 100%;
      margin-bottom: 20px;
    }
    .el-table th{
      background-color:#f5f5f6;
    }
    .el-table--mini td{
      padding: 4px 0;
    }

    .table-tip {
      cursor: pointer;
      padding: 20px 0px;
      text-align: right;
      font-size: 14px;
      color: #6c92fa;
    }

    .node-info {
      padding: 10px 75px 0px 0px;
      color: #2c3e50;
      .width-100 {
        width: 100px;
      }
      .width-200 {
        width: 200px;
      }
      .input {
        margin-right: 15px;
      }
      .node-info-title {
        width: 120px;
        display: inline-block;
        font-size: 14px;
        font-weight: normal;
      }
      .p5{
        padding-top: 5px;
      }
      .el-switch{
        margin-right: 15px;
      }
      .env-tip {
        font-size: 12px;
        display: inline-block;
      }
      .el-icon-question{
        margin-top: 3px;
        position:absolute;
      }
      .port_div, .ip_div, .node-info-title{
        float: left;
        height: 35px;
      }
      .err_div{
        float: left;
        width: 100%;
        span{
          float: left;
        }
      }
      .ip_errInfp{
        display: block;
        width: 200px;
      }
      .port_errInfp{
        display: block;
      }
    }
  }

  @media screen and (max-width: 1380px) {
    .imageSelect {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
