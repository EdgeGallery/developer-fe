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
  <div class="addDnsRules defaultFontLight">
    <el-dialog
      :title="$t('workspace.add')+$t('workspace.dnsRules')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      center
    >
      <p class="title">
        {{ $t('workspace.add')+$t('workspace.dnsRules') }}
      </p>
      <el-form
        :class="{'addDns_en':language==='en'}"
        :model="form"
        size="middle"
        ref="form"
      >
        <el-form-item
          :label="$t('workspace.appRelease.dnsRuleId')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.dnsRuleId"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.appRelease.domainName')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.domainName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('workspace.appRelease.ipAddressType')"
          :label-width="formLabelWidth"
          class="ipAddressType"
        >
          <el-select
            v-model="form.ipAddressType"
            class="list-select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
              :id="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('workspace.appRelease.ipAddress')"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.ipAddress"
          />
        </el-form-item>
        <el-form-item
          label="TTL"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.ttl"
          />
        </el-form-item>
      </el-form>

      <span
        :class="{'button_en':language==='en'}"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          size="medium"
          class="cancel"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="addDnsRules"
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
    },
    editRuleDataprop: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      dialogVisible: this.value,
      form: JSON.parse(JSON.stringify(this.editRuleDataprop)),
      options: [
        {
          value: 0,
          label: 'IP_V4'
        }, {
          value: 1,
          label: 'IP_V6'
        }
      ],
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    addDnsRules () {
      this.$emit('getAddDnsData', this.form)
      this.handleClose()
    }
  }
}

</script>
<style lang='less'>
.addDnsRules{
  .addDns_en{
    .el-form-item__label{
      width:140px !important;
    }
    .el-form-item__content{
      margin-left:140px !important;
    }
  }
  .el-form{
    padding-left:10px;
    width: 95%;
    .ipAddressType{
      text-align: left;
    }
    .el-input__inner{
      height:36px;
      line-height:36px;
      border-radius:8px;
      border-color:#fff;
      font-family: defaultFontLight;
      font-size:16px;
      color:#a698b9;
    }
  }
  .el-form-item__label{
    font-size:16px;
    padding-right:24px;
    color:#380879;
  }
}

</style>
