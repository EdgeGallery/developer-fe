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
    <h3 class="title">
      <div class="way">
        {{ $t('workspace.uploadImage.mode1') }}
      </div>
      <div class="way-desc">
        {{ $t('workspace.uploadImage.mode1Desc') }}
      </div>
    </h3>
    <div class="tip red">
      {{$t('workspace.uploadImage.mode1Tip')}}
    </div>
    <h3 class="title">
      <div class="way">
        {{$t('workspace.uploadImage.mode2')}}
      </div>
      <div class="way-desc">
        {{$t('workspace.uploadImage.mode2Desc')}}
      </div>
    </h3>
    <div class="tip red">
      {{$t('workspace.uploadImage.mode2Tip')}}
    </div>
    <el-button
      class="upload-image"
      type="primary"
      plain
      size="mini"
    >
      {{$t('workspace.uploadImage.uploadAppImage')}}
      </el-button>
    <h3 class="title">
      <div class="way">
        {{$t('workspace.uploadImage.mode3')}}
      </div>
      <div class="way-desc">
        {{$t('workspace.uploadImage.mode3Desc')}}
      </div>
    </h3>
    <div class="tip gray">
      {{$t('workspace.uploadImage.mode3Tip')}}
    </div>
    <div class="table-container">
      <el-table
        :border="true"
        size="mini"
        :data="softwareList"
        class="table"
      >
        <el-table-column
          prop="name"
          :label="$t('workspace.uploadImage.software')"
        />
        <el-table-column
          prop="version"
          :label="$t('workspace.uploadImage.version')"
        />
      </el-table>
      <div class="table-tip">
        {{$t('workspace.uploadImage.installation')}}
      </div>
    </div>
    <div class="node-info">
      <div class="node-info-title">
        {{$t('workspace.uploadImage.importNode')}}
      </div>
      <el-input
        @input="onChangeNodeInfo()"
        class="input width-200"
        size="small"
        v-model="ip"
        placeholder="endpoint"
      />
      <el-input
        @input="onChangeNodeInfo()"
        class="input  width-100"
        size="small"
        v-model="port"
        placeholder="port"
      />
      <el-button
        type="primary"
        plain
        size="small"
        @click="handleSaveNodeInfo()"
      >
      {{$t('workspace.uploadImage.test')}}
      </el-button>
    </div>
    <div class="node-info">
      <div class="node-info-title">
      {{$t('workspace.uploadImage.useEnv')}}
      </div>
      <el-switch
        @change="onChangeSwitch"
        v-model="enable"
      />
      <div class="env-tip red">
        {{$t('workspace.uploadImage.useEnvTip')}}
      </div>
    </div>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
export default {
  name: 'ImageSelect',
  props: {
    projectBeforeConfig: {
      type: Object,
      default: () => { }
    },
    allStepData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      validate: false,
      userId: sessionStorage.getItem('userId'),
      nodeInfo: {},
      ip: '',
      port: '',
      enable: false,
      softwareList: [
        { name: 'Ubuntu', version: '18.04' },
        { name: 'Docker', version: '18.09' },
        { name: 'APPLCM', version: '0.9' },
        { name: 'Kubernetes', version: '1.18.7' },
        { name: 'Helm', version: '3.2.4' },
        { name: 'MEP', version: '0.9' }
      ]
    }
  },
  methods: {
    handleSaveNodeInfo () {
      Workspace.saveNodeInfo(this.userId, { ...this.nodeInfo, ip: this.ip, port: this.port }).then(res => {
        if (res && res.data && res.data.hostId) {
          this.validate = true
          this.$message.success(this.$t('workspace.uploadImage.successfulTest'))
          this.getNodeInfo()
        }
      }, (error) => {
        this.$message({
          type: 'error',
          message: error.response.data.message
        })
        this.enable = false
        this.validate = false
      })
    },
    onChangeNodeInfo () {
      this.validate = false
      this.enable = false
      console.log(this.nodeInfo)
    },
    onChangeSwitch (v) {
      if (!this.validate) {
        this.$message.warning(this.$t('workspace.uploadImage.testfirst'))
        this.enable = false
        return
      }
      this.enable = v
    },
    getNodeInfo () {
      Workspace.getNodeInfo(this.userId).then(res => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const nodeInfo = res.data[0]
          this.nodeInfo = nodeInfo
          this.ip = nodeInfo.ip
          this.port = nodeInfo.port
        }
      })
    },
    emitStepData () {
      let ifNext = true
      if (ifNext) {
        const data = this.enable ? { hostId: this.nodeInfo.hostId, enable: true } : {}
        this.$emit('getStepData', { step: 'third', data, ifNext })
      }
    }
  },
  mounted () {
    this.getNodeInfo()
  }
}
</script>

<style lang="less" scoped>
  .imageSelect {
    width: 88%;
    margin-left: 6%;

    .upload-image {
      margin: 0px 72px 15px 72px;
    }
    .red {
      color: red;
    }

    .gray {
      color: gray;
    }

    .way {
      display: inline-block;
      width: 60px;
    }

    .way-desc {
      display: inline-block;
      width: calc(100% - 60px);
    }

    .tip {
      font-size: 12px;
      margin: 0px 72px 15px 72px;
    }

    .table-container {
      padding: 0px 72px;
    }

    .table {
      width: 100%;
    }

    .table-tip {
      cursor: pointer;
      padding: 15px 0px;
      text-align: right;
      font-size: 14px;
      color: #6c92fa;
    }

    .node-info {
      padding: 0px 72px 15px 72px;
      .width-100 {
        width: 100px;
      }
      .width-200 {
        width: 200px;
      }
      .input {
        /* display: inline-block; */
        margin-right: 15px;
      }
      .node-info-title {
        width: 120px;
        display: inline-block;
        font-size: 14px;
        font-weight: normal;
      }
      .env-tip {
        font-size: 12px;
        padding-left: 15px;
        display: inline-block;
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
