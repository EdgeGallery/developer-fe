<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
      <UploadBigFile />
    </div>

    <h3 class="image_title clear">
      <span class="span_lefts">{{ $t('workspace.uploadImage.mode3') }}</span>
      <span class="span_right">
        {{ $t('workspace.uploadImage.mode3Desc') }}
      </span>
    </h3>
    <div class="tip gray">
      <div>
        {{ $t('workspace.uploadImage.mode3Tip') }}
        <el-link
          :href="install_href"
          target="_blank"
          type="primary"
          class="install_link"
        >
          {{ $t('workspace.uploadImage.installation') }}
        </el-link>
      </div>
      <div class="node-info clear">
        <div class="node-info-title p5">
          {{ $t('workspace.uploadImage.importNode') }}
        </div>
        <div class="ip_div">
          <el-input
            @input="onChangeNodeInfo()"
            class="input width-200"
            size="small"
            v-model="ip"
            placeholder="IP"
          />
          <span
            class="ip_errInfp error"
            v-if="isIpError"
          >{{ $t('promptMessage.ipErrorInfo') }}</span>
        </div>
        <div class="port_div">
          <el-input
            @input="onChangePortInfo()"
            class="input  width-100"
            size="small"
            v-model="port"
            placeholder="Port"
          />
          <el-button
            type="primary"
            plain
            size="small"
            @click="handleSaveNodeInfo()"
          >
            {{ $t('workspace.uploadImage.test') }}
          </el-button>
          <span
            class="port_errInfp error"
            v-if="isPortError"
          >{{ $t('promptMessage.portErrorInfo') }}</span>
        </div>
      </div>
      <div class="node-info">
        <div class="node-info-title">
          {{ $t('workspace.uploadImage.useEnv') }}
        </div>
        <el-switch
          @change="onChangeSwitch"
          v-model="enable"
        />
        <el-tooltip
          class="item"
          effect="dark"
          :content="this.$t('workspace.uploadImage.useEnvTip')"
          placement="right"
        >
          <em class="el-icon-question" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import UploadBigFile from '../../components/common/UploadBigFile.vue'
import { Workspace } from '../../tools/api.js'
export default {
  name: 'ImageSelect',
  components: {
    UploadBigFile
  },
  props: {
    projectBeforeConfig: {
      type: Object,
      default: () => {}
    },
    allStepData: {
      type: Object,
      default: () => {}
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
      isPortError: false
    }
  },
  methods: {
    handleSaveNodeInfo () {
      Workspace.saveNodeInfo(this.userId, { hostId: this.hostId, ip: this.ip, port: this.port }).then(res => {
        if (res && res.data && res.data.hostId) {
          this.validate = true
          this.hostId = res.data.hostId
          this.$message.success(this.$t('workspace.uploadImage.successfulTest'))
        }
      }, (error) => {
        if (error.response.data.code === 403) {
          this.$message.error(this.$t('promptMessage.guestPrompt'))
        } else {
          this.$message.error(this.$t('workspace.uploadImage.failTest'))
        }
        this.enable = false
        this.validate = false
      })
    },
    onChangeNodeInfo () {
      this.validate = false
      this.enable = false
      const ipValidate = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(this.ip)
      if (!ipValidate) {
        this.isIpError = true
      } else {
        this.isIpError = false
      }
    },
    onChangePortInfo () {
      this.validate = false
      this.enable = false
      const portValidate = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(this.port) && (this.port >= 30000 && this.port <= 30400)
      if (!portValidate) {
        this.isPortError = true
      } else {
        this.isPortError = false
      }
    },
    onChangeSwitch (v) {
      if (!this.validate && v) {
        this.$message.warning(this.$t('workspace.uploadImage.testfirst'))
        this.enable = false
        return
      }
      this.enable = v
    },
    getNodeInfo () {
      if (Array.isArray(this.projectBeforeConfig.hosts) && this.projectBeforeConfig.hosts.length) {
        Workspace.getNodeInfo(this.userId).then(res => {
          if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
            const nodeInfo = res.data.find(s => s.hostId === this.projectBeforeConfig.hosts[0].hostId) || {}
            this.hostId = nodeInfo.hostId
            this.ip = nodeInfo.ip
            this.port = nodeInfo.port
          }
        })
      }
    },
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = { ip: this.ip, port: this.port, hostId: this.hostId, enable: this.enable }
        this.$emit('getStepData', { step: 'third', data, ifNext })
      }
    }
  },
  mounted () {
    if (this.allStepData.third) {
      this.hostId = this.allStepData.third.hostId
      this.ip = this.allStepData.third.ip
      this.port = this.allStepData.third.port
      this.enable = this.allStepData.third.enable
    } else {
      this.enable = !!this.projectBeforeConfig.privateHost
      if (this.enable) {
        this.validate = true
      }
      this.getNodeInfo()
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
