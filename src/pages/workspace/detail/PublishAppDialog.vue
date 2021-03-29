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
  <div class="uploadOPenapiDialog">
    <el-dialog
      :title="$t('workspace.publish')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-checkbox
        id="publishtext"
        v-model="isPublish"
      >
        {{ $t('workspace.publishtext') }}
      </el-checkbox>
      <el-checkbox
        id="publictext"
        v-model="isPublic"
        :disabled="appApiFileId"
      >
        {{ $t('workspace.publictext') }}
      </el-checkbox>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          @click="handleClose"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          :loading="confimLoading"
          @click="confirmPublish"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Workspace } from '../../../tools/api.js'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    appApiFileIdTemp: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      isPublish: true,
      isPublic: false,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      appApiFileId: this.appApiFileIdTemp,
      confimLoading: false
    }
  },
  watch: {
    value (val) {
      console.log(val)
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    confirmPublish () {
      let projectId = sessionStorage.getItem('mecDetailID')
      let appInstanceId = sessionStorage.getItem('appInstanceId')
      // 发布APP到Appstore
      if (this.isPublish) {
        this.confimLoading = true
        Workspace.isPublishApi(appInstanceId, projectId, this.userId, this.userName).then(res => {
          this.handleClose()
          this.confimLoading = false
        }).catch(() => {
          this.$message.error(this.$t('promptMessage.isPublishFailed'))
          this.confimLoading = false
        })
      }
      // 公开APP的API能力
      if (this.isPublic) {
        this.confimLoading = true
        Workspace.isPublicApi(projectId, this.userId).then(res => {
          this.handleClose()
          this.confimLoading = false
        }).catch(() => {
          this.$message.error(this.$t('promptMessage.isPublicFailed'))
          this.confimLoading = false
        })
      }
      if (!this.isPublish && !this.isPublic) {
        this.handleClose()
      }
    }
  }
}

</script>
<style lang='less' scoped>
.uploadOPenapiDialog{
.el-dialog__body {
    padding-top: 30px !important;
    .el-checkbox {
      display: block;
      width: 80%;
      padding: 20px 10% 0;
    }
  }
}

</style>
