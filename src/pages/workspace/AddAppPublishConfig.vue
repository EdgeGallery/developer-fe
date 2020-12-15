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
      width="40%"
      :before-close="handleClose"
      center
    >
      <el-form
        :model="form"
        class="config_form"
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
          <span class="span_left">{{ $t('workspace.internalPort') }} :</span>
          <el-input
            v-model="form.internalPort"
            :placeholder="$t('workspace.internalPort')"
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
              :label="item"
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
              :label="item"
              name="dnsRulesList"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          class="service_row trafficRules"
        >
          <span class="span_left">{{ $t('workspace.appRelease.capabilityType') }} :</span>
          <span
            class="selected_ability"
            v-if="hasAbility"
          >{{ capabilityType }}</span>
          <el-button
            class="ability_btn featuresBtn"
            @click="selectCapability"
          >
            {{ $t('common.select') }}
          </el-button>
        </el-form-item>
        <el-dialog
          :title="$t('workspace.chooseAbilities')"
          :visible.sync="capabilityDialog"
          width="30%"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-tree
            class="capability_tree"
            :data="treeData"
            default-expand-all
            highlight-current
            :props="defaultProps"
            @node-click="handleNodeClick"
          />
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="capabilityDialog=false">{{ $t('common.cancel') }}</el-button>
            <el-button
              type="primary"
              class="bgBtn"
              @click="closeCapability"
            >{{ $t('common.confirm') }}</el-button>
          </span>
        </el-dialog>
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
import { Workspace } from '../../tools/api.js'
import { Capability } from '../../tools/project_data.js'
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
      form: {},
      trafficRulesList: [],
      dnsRulesList: [],
      optionsProtocol: [{
        value: '0',
        label: 'HTTP'
      }, {
        value: '1',
        label: 'HTTPS'
      }],
      optionsTrafficRules: [],
      optionsDnsRules: [],
      formLabelWidth: '0px',
      apiFileList: [],
      apiMdList: [],
      userId: sessionStorage.getItem('userId'),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [],
      capabilityType: '',
      capabilityTemp: '',
      groupIdTemp: '',
      capabilityDialog: false,
      capabilityGroups: [],
      hasAbility: false,
      language: localStorage.getItem('language')
    }
  },
  methods: {
    getEditConfigData () {
      let data = JSON.parse(JSON.stringify(this.editRuleDataprop))
      this.form = data
      this.form.trafficRulesList = data.trafficRulesList.split(',')
      this.form.dnsRulesList = data.dnsRulesList.split(',')
      this.removeEmpty(this.form.trafficRulesList)
      this.removeEmpty(this.form.dnsRulesList)
    },
    getRuleList () {
      let trafficData = []
      if (sessionStorage.getItem('trafficData')) {
        trafficData = JSON.parse(sessionStorage.getItem('trafficData'))
      }
      let dnsData = []
      if (sessionStorage.getItem('dnsData')) {
        dnsData = JSON.parse(sessionStorage.getItem('dnsData'))
      }
      let trafficArr = []
      trafficData.forEach(item => {
        trafficArr.push(item.trafficRuleId)
      })
      this.optionsTrafficRules = trafficArr
      let dnsArr = []
      dnsData.forEach(item => {
        dnsArr.push(item.dnsRuleId)
      })
      this.optionsDnsRules = dnsArr
    },
    removeEmpty (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === '' || typeof (arr[i]) === 'undefined') {
          arr.splice(i, 1)
          i = i - 1
        }
      }
      return arr
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
      if (this.apiFileList.length > 0) {
        this.uploadFile(this.apiFileList, 'api')
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
      if (this.apiMdList.length > 0) {
        this.uploadFile(this.apiMdList, 'md')
      }
    },
    removeApiMd (file, fileList) {
      this.apiMdList = fileList
    },
    uploadFile (fileList, name) {
      let fd = new FormData()
      fd.append('file', fileList[0])
      Workspace.submitApiFileApi(this.userId, fd).then(res => {
        if (name === 'api') {
          this.form.apiJson = res.data.fileId
        } else if (name === 'md') {
          this.form.apiMd = res.data.fileId
        }
        this.$message.success(this.$t('promptMessage.uploadSuccess'))
      }).catch(() => {
        if (name === 'api') {
          this.apiFileList = []
        } else if (name === 'md') {
          this.apiMdList = []
        }
        this.$message.error(this.$t('promptMessage.uploadFailure'))
      })
    },
    // 获取能力列表
    getCapabilityData () {
      this.treeData = []
      Workspace.getCapabilityListApi().then(res => {
        this.capabilityGroups = res.data
        // oneLevel
        let oneLevel = []
        this.capabilityGroups.forEach(item => {
          item.oneLevelName = this.checkProjectData(item.oneLevelName)
          oneLevel.push(item.oneLevelName)
        })
        oneLevel = Array.from(new Set(oneLevel))

        oneLevel.forEach(item => {
          let obj = {
            label: '',
            children: []
          }
          obj.label = item
          this.treeData.push(obj)
        })

        this.capabilityGroups.forEach(item => {
          this.treeData.forEach(itemTwo => {
          // twoLevel
            if (itemTwo.label === item.oneLevelName) {
              let objTwo = {
                label: '',
                groupId: '',
                children: []
              }
              if (item.twoLevelName) {
                item.twoLevelName = this.checkProjectData(item.twoLevelName)
                objTwo.label = item.twoLevelName
                objTwo.groupId = item.groupId
                itemTwo.children.push(objTwo)
              }
            }
            // threeLevel
            itemTwo.children.forEach(itemThree => {
              if (itemThree.label === item.twoLevelName) {
                let objThree = {
                  label: '',
                  groupId: '',
                  children: []
                }
                if (item.threeLevelName) {
                  item.threeLevelName = this.checkProjectData(item.threeLevelName)
                  objThree.label = item.threeLevelName
                  objThree.groupId = item.groupId
                  itemThree.children.push(objThree)
                }
              }
            })
            itemTwo.children.forEach(itemFour => {
            // console.log(itemFour)
            })
            // fourLevel
            itemTwo.children.forEach(itemThree => {
            // console.log(itemThree)
            })
          })
        })
      })
    },
    getFirstCapability () {
      Workspace.getCapabilityListApi().then(res => {
        let data = res.data[0]
        if (data.fiveLevelName) {
          this.capabilityType = data.fiveLevelName
        } else if (data.fourLevelName) {
          this.capabilityType = data.fourLevelName
        } else if (data.threeLevelName) {
          this.capabilityType = data.threeLevelName
        } else if (data.twoLevelName) {
          this.capabilityType = data.twoLevelName
        } else if (data.oneLevelName) {
          this.capabilityType = data.oneLevelName
        }
        this.hasAbility = true
        this.capabilityType = this.checkProjectData(this.capabilityType)
      })
    },
    // 中英文切换
    checkProjectData (name) {
      Capability.forEach(itemFe => {
        if (this.language === 'cn') {
          if (name === itemFe.label[1]) {
            name = itemFe.label[0]
          }
        } else {
          if (name === itemFe.label[0]) {
            name = itemFe.label[1]
          }
        }
      })
      return name
    },
    selectCapability () {
      this.capabilityDialog = true
      this.getCapabilityData()
      this.setApiHeight()
    },
    handleNodeClick (val) {
      if (val.children.length === 0) {
        this.capabilityTemp = val.label
        this.groupIdTemp = val.groupId
      }
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oDiv = document.getElementsByClassName('capability_tree')[0]
        const deviceHeight = document.documentElement.clientHeight
        oDiv.style.height = Number(deviceHeight) * 0.4 + 'px'
      })
    },
    closeCapability () {
      this.capabilityType = this.capabilityTemp
      this.form.groupId = this.groupIdTemp
      this.capabilityDialog = false
    },
    addPublicConfig () {
      this.form.trafficRulesList = this.form.trafficRulesList.join(',')
      this.form.dnsRulesList = this.form.dnsRulesList.join(',')
      this.$emit('getAddPublicConfigData', this.form)
      this.handleClose()
    }
  },
  mounted () {
    this.getEditConfigData()
    this.getRuleList()
    this.getFirstCapability()
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
    .el-form-item--mini.el-form-item{
      margin-bottom: 22px;
    }
    .service_row{
      span.span_left{
        width: 120px;
      }
      .el-input{
        width: 200px;
        float: left;
        height: 28px;
        margin: 0 15px 0px 0;
      }
      .el-select{
        float: left;
        .el-input{
          width: 200px;
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
      width: calc( 100% - 120px );
    }
  }
}
.capability_tree{
  overflow-y: auto;
  margin-right: 20px;
}
.selected_ability{
  float: left;
  padding: 2px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor:default;
}
.ability_btn{
  float: left;
  margin-left: 10px;
  padding: 10px 15px;
}
</style>
