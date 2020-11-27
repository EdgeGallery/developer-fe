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
  <div class="addDnsRules">
    <el-dialog
      :title="$t('workspace.add')+$t('workspace.dnsRules')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      :before-close="handleClose"
      center
    >
      <el-form
        :model="form"
        size="mini"
      >
        <el-form-item
          label="domaiName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.filterType"
          />
        </el-form-item>
        <el-form-item
          label="ipAddressType"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.priority"
          />
        </el-form-item><el-form-item
          label="ipAddress"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.priority"
          />
        </el-form-item>
        <el-form-item
          label="ttl"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.priority"
          />
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogVisible = false"
          size="medium"
          class="cancel"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
          size="medium"
          class="confirm"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    }
  },
  mounted () {
  }
}

</script>
<style lang='less'>
.addDnsRules{
  .el-dialog--center{
    .el-dialog__header{
      text-align: left;
    }
  }
  .el-form{
    width: 85%;
  }
}

</style>
