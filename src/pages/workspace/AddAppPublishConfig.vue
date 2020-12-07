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
  <div class="addAppPublish">
    <el-dialog
      :title="$t('workspace.add')+$t('workspace.appPublishConfig')"
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
          :label-width="formLabelWidth"
          class="service_row"
        >
          <span class="span_left">{{ $t('workspace.servicename') }} :</span>
          <el-input
            v-model="form.serviceName"
            :placeholder="$t('workspace.servicename')"
          />
          <span class="span_left">{{ $t('workspace.inPort') }} :</span>
          <el-input
            v-model="form.inPort"
            :placeholder="$t('workspace.inPort')"
          />
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          class="service_row"
        >
          <span class="span_left">{{ $t('workspace.version') }} :</span>
          <el-input
            v-model="form.version"
            :placeholder="$t('workspace.version')"
          />
          <span class="span_left">{{ $t('workspace.protocol') }} :</span>
          <el-select
            v-model="form.protocol"
            size="mini"
            class="select_right"
          >
            <el-option
              v-for="item in optionsProtocol"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
        >
          <el-upload
            class="upload-demo clear"
            action=""
            :limit="1"
            :on-change="handleChangeApi"
            :on-exceed="handleExceed"
            :file-list="apiFileList"
            :auto-upload="false"
            :on-remove="removeUploadapi"
            accept=".json,.yaml"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              class="featuresBtn"
            >
              {{ $t('devTools.uploadApi') }}
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              <em class="el-icon-warning" />{{ $t('devTools.apiText') }}
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
        >
          <el-upload
            class="upload-demo clear"
            action=""
            :limit="1"
            :on-change="changeApiMd"
            :on-exceed="handleExceed"
            :file-list="apiMdList"
            :auto-upload="false"
            :on-remove="removeApiMd"
            accept=".md"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              class="featuresBtn"
            >
              {{ $t('workspace.uploadFile') }}
            </el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              <em class="el-icon-warning" />{{ $t('workspace.apiFunctionMd') }}
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          class="service_row trafficRules"
        >
          <span class="span_left">{{ $t('workspace.trafficRules') }} :</span>
          <el-checkbox-group
            v-model="form.trafficRulesList"
          >
            <el-checkbox
              v-for="(item,index) in optionsTrafficRules"
              :key="index"
              :label="item.ruleId"
              name="trafficRulesList"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          class="service_row trafficRules"
        >
          <span class="span_left">{{ $t('workspace.dnsRules') }} :</span>
          <el-checkbox-group
            v-model="form.dnsRulesList"
          >
            <el-checkbox
              v-for="(item,index) in optionsDnsRules"
              :key="index"
              :label="item.ruleId"
              name="dnsRulesList"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <span
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
          @click="addPublicConfig"
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
      default: () => { }
    }
  },
  data () {
    return {
      dialogVisible: this.value,
      form: {
        serviceName: '',
        inPort: '',
        version: '',
        protocol: 'HTTP',
        trafficRulesList: [],
        dnsRulesList: []
      },
      // form: JSON.parse(JSON.stringify(this.editRuleDataprop)),
      trafficRulesList: [],
      dnsRulesList: [],
      optionsProtocol: [{
        value: '0',
        label: 'HTTP'
      }, {
        value: '1',
        label: 'HTTPS'
      }],
      optionsTrafficRules: [
        { ruleId: '流量规则1' },
        { ruleId: '流量规则2' },
        { ruleId: '流量规则3' }
      ],
      optionsDnsRules: [
        { ruleId: 'DNS规则1' },
        { ruleId: 'DNS规则2' }
      ],
      formLabelWidth: '0px',
      apiFileList: [],
      apiMdList: []
    }
  },
  methods: {
    getEditConfigData () {
      let data = JSON.parse(JSON.stringify(this.editRuleDataprop))
      this.form = data
      this.form.trafficRulesList = data.trafficRulesList.split('，')
      this.form.dnsRulesList = data.dnsRulesList.split('，')
    },
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    // 检查上传文件类型
    checkFileType (fileList, fileTypeArr, uploadFileList) {
      let checkPassed = true
      this.fileType = fileList[0].name.substring(fileList[0].name.lastIndexOf('.') + 1)
      if (fileTypeArr.indexOf(this.fileType.toLowerCase()) === -1) {
        this.$message.warning(this.$t('promptMessage.checkFileType'))
        checkPassed = false
      }
      return checkPassed
    },
    handleExceed (file, fileList) {
      if (fileList.length === 1) {
        this.$message.warning(this.$t('promptMessage.onlyOneFile'))
      }
    },
    // 上传Api
    handleChangeApi (file, fileList) {
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$message.warning(this.$t('promptMessage.fileNameType'))
        this.apiFileList = []
      } else {
        this.apiFileList.push(file.raw)
      }
      let fileTypeArr = ['yaml', 'json']
      let checkPassed = this.checkFileType(fileList, fileTypeArr)
      if (!checkPassed) {
        this.apiFileList = []
      }
    },
    removeUploadapi (file, fileList) {
      this.apiFileList = fileList
    },
    // 上传API描述文件
    changeApiMd (file, fileList) {
      if (file.raw.name.indexOf(' ') !== -1) {
        this.$message.warning(this.$t('promptMessage.fileNameType'))
        this.apiMdList = []
      } else {
        this.apiMdList.push(file.raw)
      }
      let fileTypeArr = ['md']
      let checkPassed = this.checkFileType(fileList, fileTypeArr)
      if (!checkPassed) {
        this.apiMdList = []
      }
    },
    removeApiMd (file, fileList) {
      this.apiMdList = fileList
    },
    addPublicConfig () {
      this.form.trafficRulesList = this.form.trafficRulesList.join('，')
      this.form.dnsRulesList = this.form.dnsRulesList.join('，')
      console.log(this.form)
      this.$emit('getAddPublicConfigData', this.form)
      this.handleClose()
    }
  },
  mounted () {
    this.getEditConfigData()
  }
}

</script>
<style lang='less'>
.addAppPublish{
  .el-dialog--center{
    .el-dialog__header{
      text-align: left;
    }
  }
  .el-form{
    width: 100%;
    .service_row .el-form-item__content > span{
      float: left;
    }
    .service_row{
      span.span_left{
        width: 100px;
      }
      .el-input{
        width: 120px;
        float: left;
        height: 28px;
        margin: 0 15px 0px 0;
      }
      .el-select{
        float: left;
        .el-input{
          width: 120px;
        }
      }
      .el-select.select_right{
        .el-input--suffix .el-input__inner{
          padding-right: 10px;
        }
        .el-input__icon{
          width: 20px;
        }
      }
    }
    .service_row.trafficRules{
      .el-select{
        .el-input{
          width: 300px;
        }
      }
    }
    .el-upload-list{
      float: left;
      width: 100%;
      text-align: left;
      .el-upload-list__item:first-child{
        width: 50%;
      }
    }
    .el-checkbox-group{
      text-align: left;
      float: left;
      width: calc( 100% - 100px );
    }
  }
}

</style>
