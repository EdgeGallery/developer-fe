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
          @click="confirmPublish"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Post } from '../../../tools/tool.js'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      isPublish: true,
      isPublic: false,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName')
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
      if (this.isPublish) {
        let url = 'mec/developer/v1/projects/' + projectId + '/action/upload?userId=' + this.userId + '&userName=' + this.userName
        Post(url, '').then(res => {
          this.handleClose()
        })
      }
      if (this.isPublic) {
        let url = 'mec/developer/v1/projects/' + projectId + '/action/open-api?userId=' + this.userId
        Post(url, '').then(res => {
          this.handleClose()
        })
      }
      this.$router.push({
        name: 'workspace'
      })
    }
  },
  mounted () {
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
