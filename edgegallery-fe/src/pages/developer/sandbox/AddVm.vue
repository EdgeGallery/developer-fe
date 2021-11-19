<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="addVm">
    <div class="common-div-bg addVm-bg">
      <el-collapse
        v-model="activeNames"
        class="vmCollapse"
      >
        <el-collapse-item
          title="虚拟机信息"
          name="1"
        >
          <div class="vm-info">
            <div class="addVm-top-title">
              <p>
                <span>*</span>虚拟机名称
              </p>
              <el-input
                class="common-input"
                v-model="addvmImages.name"
                placeholder="请输入虚拟机名称"
              />
            </div>
            <div class="addVm-top-title defaultFontLight">
              <p>用户名</p>
              <el-input
                class="common-input"
                v-model="addvmImages.vmCertificate.pwdCertificate.username"
                placeholder="请输入用户名"
              />
            </div>
            <div class="addVm-top-title defaultFontLight">
              <p>密码</p>
              <el-input
                type="password"
                class="common-input"
                show-password
                v-model="addvmImages.vmCertificate.pwdCertificate.password"
                placeholder="请输入密码"
              />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="选择虚拟机规格"
          name="2"
        >
          <div class="simulator-info-content">
            <div class="defaultFontLight">
              <el-radio-group
                class="common-radio"
                v-model="vmInfo.archType"
                @change="handleChangeArch"
              >
                <el-radio-button label="X86" />
                <el-radio-button label="ARM" />
              </el-radio-group>
              <el-table
                :data="vmInfo.vmRegulationList"
                class="common-table vm-table"
              >
                <el-table-column width="35px">
                  <template slot-scope="scope">
                    <el-radio
                      :label="scope.row.id"
                      v-model="addvmImages.flavorId"
                      class="common-radio"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  min-width="25%"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sence"
                  label="使用场景"
                  min-width="20%"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    {{ scope.row.description }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cpu"
                  label="CPU"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendCPUUnit"
                />
                <el-table-column
                  prop="memory"
                  label="内存"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendSizeUnit"
                />
                <el-table-column
                  prop="systemDiskSize"
                  label="系统盘"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendSizeUnit"
                />
                <el-table-column
                  prop="dataDiskSize"
                  label="数据盘"
                  min-width="10%"
                  show-overflow-tooltip
                  :formatter="appendSizeUnit"
                />
                <el-table-column
                  prop="otherExtraInfo"
                  label="其他能力"
                  min-width="15%"
                  show-overflow-tooltip
                />
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="配置网络端口"
          name="3"
        >
          <div class="internetInfos">
            <el-table
              class="common-table network-table vm-table"
              :data="vmNetworkList"
            >
              <el-table-column width="35">
                <template slot-scope="scope">
                  <el-checkbox
                    class="common-checkbox"
                    v-model="selectedNetworks"
                    :label="scope.row.name"
                    @change="changeInternet(selectedNetworks)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                width="200px"
                label="名称"
                show-overflow-tooltip
              />
              <el-table-column
                label="描述"
              >
                <template slot-scope="scope">
                  {{ scope.row.description }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="选择镜像"
          name="4"
        >
          <div class="selectImage-content">
            <div class="selectImage-public defaultFontLight">
              <el-radio
                class="common-radio"
                label="public"
                v-model="vmInfo.imageType"
                @change="changeImageType('public')"
              >
                公有镜像
              </el-radio>
              <el-select
                v-model="vmInfo.publicSystemName"
                placeholder="请选择"
                @change="changePublicType(vmInfo.publicSystemName)"
                :disabled="vmInfo.imageType === 'private'"
              >
                <el-option
                  v-for="(item,index) in vmInfo.publicSystemType"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-select
                v-model="vmInfo.publicId"
                placeholder="请选择"
                :disabled="vmInfo.imageType === 'private'|| vmInfo.publicSystemName ==''"
              >
                <el-option
                  v-for="(item,index) in vmInfo.publicImageOptions"
                  :key="index"
                  :label="item.systemImage"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="selectImage-public defaultFontLight">
              <el-radio
                class="common-radio"
                v-model="vmInfo.imageType"
                label="private"
                @change="changeImageType('private')"
              >
                私有镜像
              </el-radio>
              <el-select
                v-model="vmInfo.privateSystemName"
                @change="changePrivateType(vmInfo.privateSystemName)"
                placeholder="请选择"
                :disabled="vmInfo.imageType === 'public'"
              >
                <el-option
                  v-for="(item,index) in vmInfo.privateSystemType"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-select
                v-model="vmInfo.privateId"
                placeholder="请选择"
                :disabled="vmInfo.imageType === 'public'|| vmInfo.privateSystemName ==''"
              >
                <el-option
                  v-for="(item,index) in vmInfo.privateImageOptions"
                  :key="index"
                  :label="item.systemImage"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="主机组配置"
          name="5"
        >
          <div
            class="edit-btn clear"
          >
            <span class="title-info">填写主机组配置</span>
            <el-button
              class="rt"
              v-if="viewOrEditFlavor === 'preview'"
              @click="clickEdit('flavor')"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              class="rt"
              v-else
              @click="clickEdit('flavor')"
            >
              {{ $t('common.save') }}
            </el-button>
          </div>
          <div class="editor-wrapper">
            <mavon-editor
              class="editor"
              v-model="flavorExtraSpecs"
              :toolbars-flag="false"
              :subfield="false"
              :default-open="viewOrEditFlavor"
              :box-shadow="false"
              preview-background="transparent"
            />
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="脚本"
          name="6"
        >
          <div class="vm-size">
            <p class="title-info">
              是否使用注入脚本
            </p>
            <el-radio-group
              class="common-radio work-radio"
              v-model="isInjectScript"
              @change="handleSelectInjectScript"
            >
              <el-radio label="select">
                true
              </el-radio>
              <el-radio label="cancel">
                false
              </el-radio>
            </el-radio-group>
            <div
              class="script-div"
              v-if="changeResult"
            >
              <div class="script-content">
                <div
                  class="edit-btn clear"
                >
                  <span class="title-info">填写脚本内容</span>
                  <el-button
                    class="rt"
                    v-if="viewOrEditContent === 'preview'"
                    @click.stop="clickEdit('content')"
                  >
                    {{ $t('common.edit') }}
                  </el-button>
                  <el-button
                    class="rt"
                    v-else
                    @click.stop="clickEdit('content')"
                  >
                    {{ $t('common.save') }}
                  </el-button>
                </div>
                <mavon-editor
                  v-model="userData"
                  :toolbars-flag="false"
                  :subfield="false"
                  :default-open="viewOrEditContent"
                  :box-shadow="false"
                  preview-background="transparent"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="addVm-btn rt">
        <el-button
          class="common-btn"
          @click="addVmFinish('cancel')"
        >
          {{ $t('normal.cancel') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="addVmFinish('confirm')"
        >
          {{ $t('normal.confirm') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../api/developerApi.js'
import { filterArr } from '../../../tools/common.js'
export default {
  name: 'AddVm',
  props: {
    netWorkListProp: {
      type: Array,
      default: () => []
    },
    selectedNetworksProp: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      activeNames: ['1'],
      addvmImages: {
        name: '',
        flavorId: '',
        imageId: '',
        vmCertificate: {
          certificateType: 'PASSWORD',
          pwdCertificate: {
            password: '',
            username: ''
          },
          keyPairCertificate: null
        },
        areaZone: 'nova',
        userData: null,
        flavorExtraSpecs: null,
        portList: []
      },
      vmInfo: {
        archType: 'X86',
        publicSystemName: '',
        privateSystemName: '',
        publicSystemType: [],
        publicSystemImage: [],
        publicImageOptions: [],
        privateSystemType: [],
        privateSystemImage: [],
        privateImageOptions: [],
        vmRegulationList: [],
        osNameOptionList: [],
        publicId: '',
        privateId: '',
        imageType: 'public'
      },
      vmNetworkList: this.netWorkListProp,
      selectedNetworks: this.selectedNetworksProp,
      vmSpecs: [],
      queryImage: {
        name: '',
        visibleType: '',
        osType: '',
        status: 'PUBLISHED',
        uploadTimeBegin: '',
        queryCtrl: {
          offset: 0,
          limit: 10,
          sortBy: 'uploadTime',
          sortOrder: 'Desc'
        }
      },
      imageList: [],
      isInjectScript: 'cancel',
      changeResult: false,
      activeScriptEditPanel: '1',
      contentDefaultData: '',
      viewOrEditContent: 'preview',
      viewOrEditParams: 'preview',
      FlavorDefaultData: '',
      viewOrEditFlavor: 'preview',
      userData: '',
      flavorExtraSpecs: '',
      applicationId: sessionStorage.getItem('applicationId') || ''
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    getVmSpecs () {
      sandbox.getVmspec().then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.vmSpecs = res.data
        this.filterVmRegulation()
      }).catch(err => {
        console.log(err)
      })
    },
    getInternetType () {
      sandbox.getAllInternetType(this.applicationId).then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.vmNetworkList = res.data
        this.vmNetworkList.forEach((item) => {
          if (item.name !== '') {
            this.selectedNetworks.push(item.name)
          }
        })
        this.vmNetworkList.forEach(item => {
          this.selectedNetworks.forEach(items => {
            if (item.name === items) {
              this.addvmImages.portList.push({ name: item.name, description: item.description, networkName: item.name, id: item.id })
            }
          })
        })
      }).catch(err => {
        console.log(err)
      })
    },
    getVmImageLists () {
      sandbox.getVmImageList(this.queryImage).then(res => {
        if (res.data && res.data.length <= 0) {
          return
        }
        this.imageList = res.data.imageList
        this.imageList.forEach(item => {
          if (item.visibleType === 'public') {
            this.vmInfo.publicSystemType.push(item.osType)
            this.vmInfo.publicSystemImage.push({ systemType: item.osType, systemImage: item.name + '[' + item.osVersion + ' ' + item.osBitType + '(' + item.systemDiskSize + 'GB)]', id: item.id })
          } else {
            this.vmInfo.privateSystemType.push(item.osType)
            this.vmInfo.privateSystemImage.push({ systemType: item.osType, systemImage: item.name + '[' + item.osVersion + ' ' + item.osBitType + '(' + item.systemDiskSize + 'GB)]', id: item.id })
          }
        })
        this.vmInfo.publicSystemType = filterArr(this.vmInfo.publicSystemType)
        this.vmInfo.privateSystemType = filterArr(this.vmInfo.privateSystemType)
      }).catch(err => {
        console.log(err)
      })
    },
    addVmInfo () {
      this.validateInput()
    },
    changeImageType (data) {
      this.vmInfo.imageType = data
      data === 'public' ? this.vmInfo.privateSystemName = '' : this.vmInfo.publicSystemName = ''
      data === 'public' ? this.vmInfo.privateImageOptions = '' : this.vmInfo.publicImageOptions = ''
      data === 'public' ? this.vmInfo.privateId = '' : this.vmInfo.publicId = ''
    },
    validateInput () {

    },
    handleChangeArch () {
      this.filterVmRegulation()
      this.addvmImages.flavorId = -1
    },
    filterVmRegulation () {
      this.vmInfo.vmRegulationList = this.vmSpecs.filter(item => item.architecture === this.vmInfo.archType)
    },
    changePublicType (data) {
      this.vmInfo.publicId = ''
      this.vmInfo.publicImageOptions = []
      sandbox.getScriptByImageId(data).then(res => {
        this.contentDefaultData = '```shell\r\n' + res.data.replace(/\\r\\n/g, '\n') + '\r\n```'
        this.contentDefaultData = this.contentDefaultData.replace(/\n/g, '\\r\\n')
        this.contentDefaultData = this.contentDefaultData.substring(13, (this.contentDefaultData.length - 8))
        this.userData = '```shell\r\n' + res.data.replace(/\\r\\n/g, '\n') + '\r\n```'
        this.flavorDefaultData = '```shell\r\n' + '\r\n```'
        this.flavorDefaultData = this.flavorDefaultData.replace(/\n/g, '\\r\\n')
        this.flavorDefaultData = this.flavorDefaultData.substring(13, (this.flavorDefaultData.length - 8))
        this.flavorExtraSpecs = '```shell\r\n' + '\r\n```'
      })
      this.vmInfo.publicSystemImage.forEach(item => {
        if (item.systemType === data) {
          this.vmInfo.publicImageOptions.push(item)
        }
      })
    },
    changePrivateType (data) {
      this.vmInfo.privateId = ''
      this.vmInfo.privateImageOptions = []
      sandbox.getScriptByImageId(data).then(() => {

      })
      this.vmInfo.privateSystemImage.forEach(item => {
        if (item.systemType === data) {
          this.vmInfo.privateImageOptions.push(item)
        }
      })
    },
    appendCPUUnit (row) {
      return row.cpu + 'vCPU'
    },
    appendSizeUnit (row, column, cellValue) {
      return cellValue + 'GB'
    },
    handleSelectInjectScript (val) {
      if (val === 'select') {
        this.changeResult = true
      } else if (val === 'cancel') {
        this.changeResult = false
      }
    },
    clickEdit (name) {
      if (name === 'content') {
        if (this.viewOrEditContent === 'edit') {
          this.viewOrEditContent = 'preview'
        } else {
          this.viewOrEditContent = 'edit'
        }
      } else if (name === 'params') {
        if (this.viewOrEditParams === 'edit') {
          this.viewOrEditParams = 'preview'
        } else {
          this.viewOrEditParams = 'edit'
        }
      } else if (name === 'flavor') {
        if (this.viewOrEditFlavor === 'edit') {
          this.viewOrEditFlavor = 'preview'
        } else {
          this.viewOrEditFlavor = 'edit'
        }
      }
      this.setDivBackgroundColor('content-input-wrapper')
      this.setDivBackgroundColor('auto-textarea-wrapper')
      this.setDivBackgroundColor('auto-textarea-input')
    },
    changeInternet (data) {
      this.addvmImages.portList = []
      this.vmNetworkList.forEach(item => {
        data.forEach(items => {
          if (item.name === items) {
            this.addvmImages.portList.push({ name: item.name, description: item.description, networkName: item.name, id: item.id })
          }
        })
      })
    },
    addVmFinish (type) {
      let _data = []
      if (type === 'confirm') {
        if (this.changeResult) {
          this.addvmImages.userData = this.userData
          this.addvmImages.flavorExtraSpecs = this.flavorExtraSpecs
        } else {
          this.addvmImages.userData = ''
          this.addvmImages.flavorExtraSpecs = this.flavorExtraSpecs
        }
        this.addvmImages.userData = this.addvmImages.userData.replace(/\n/g, '\\r\\n')
        this.addvmImages.flavorExtraSpecs = this.addvmImages.flavorExtraSpecs.replace(/\n/g, '\\r\\n')
        let _flavorTemp = this.addvmImages.flavorExtraSpecs
        let _contentTemp = this.addvmImages.userData
        this.addvmImages.flavorExtraSpecs = _flavorTemp.substring(13, (_flavorTemp.length - 8))
        this.addvmImages.userData = _contentTemp.substring(13, (_contentTemp.length - 8))
        if (this.flavorDefaultData !== this.addvmImages.flavorExtraSpecs) {
          this.addvmImages.flavorExtraSpecs = _flavorTemp.substring(12, (_flavorTemp.length - 7))
        }
        if (this.contentDefaultData !== this.addvmImages.userData) {
          this.addvmImages.userData = _contentTemp.substring(12, (_contentTemp.length - 7))
        }
        this.vmInfo.publicId === '' ? this.addvmImages.imageId = this.vmInfo.privateId : this.addvmImages.imageId = this.vmInfo.publicId
        let _addVmImagesVal = this.addvmImages.name !== '' && this.addvmImages.imageId !== '' && this.addvmImages.vmCertificate.pwdCertificate.password !== '' && this.addvmImages.vmCertificate.pwdCertificate.username !== '' && this.addvmImages.portList !== ''
        if (_addVmImagesVal) {
          sandbox.addVmImage(this.applicationId, this.addvmImages).then(() => {
            this.$eg_messagebox('虚拟机添加成功！', 'success')
            _data = this.selectedNetworks
            this.$emit('addVmFinish', _data)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$eg_messagebox('请完善内容，再次点击提交！', 'warning')
        }
      } else {
        this.$emit('addVmFinish', _data)
      }
    },
    setDivBackgroundColor (className) {
      let _oDiv = document.getElementsByClassName(className)
      this.$nextTick(() => {
        _oDiv.forEach(item => {
          item.style.backgroundColor = '#4e3494'
        })
      })
    }
  },
  mounted () {
    this.getVmSpecs()
    this.vmNetworkList.forEach(item => {
      this.selectedNetworks.forEach(items => {
        if (item.name === items) {
          this.addvmImages.portList.push({ name: item.name, description: item.description, networkName: item.name, id: item.id })
        }
      })
    })
    if (this.netWorkListProp.length === 0) {
      this.getInternetType()
    }
    this.getVmImageLists()
    this.setDivBackgroundColor('content-input-wrapper')
    this.setDivBackgroundColor('auto-textarea-wrapper')
    this.setDivBackgroundColor('auto-textarea-input')
  }
}
</script>

<style lang="less">
.addVm{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position:relative;
  padding-top:10px ;
  font-size: 16px;
  animation: delay 0.5s  ease-in-out;
  animation-fill-mode: both;
  @keyframes delay {
    0%{
      transform:scale(0.25);
    }
    100%{
      transform:scale(1)
    }
  }
  .addVm-bg{
    position: absolute;
    width: 1000px;
    padding: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .el-collapse-item__header,.el-collapse-item__content{
      font-size: 16px;
      color: #fff;
    }
    .vm-info{
      margin: 0 0 30px 0px;
      .addVm-top-title{
        display: flex;
        margin: 20px 0px;
        p{
          width: 100px;
          line-height: 25px;
          text-align: right;
          margin-right: 10px;
          span{
            color: red;
            line-height: 25px;
          }
        }
        .el-input{
          width: calc(100% - 100px);
        }
        .el-input__inner{
          width: 100%;
          height: 25px;
          background-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          border: none;
        }
      }
    }
    .addVm-btn{
      margin-right: 30px;
    }
  }
  .el-collapse {
    border-top:none;
    border-bottom:none;
    .el-checkbox__label{
      padding-left: 12px;
    }
    .el-link--inner{
      p{
        color: #cfccdb;
      }
    }
    .el-collapse-item__header{
      height: 39px;
      background: none;
      border-bottom:none;
      padding-left: 20px;
      font-size: 16px;
    }
    .el-collapse-item__header:before{
      display: inline-block;
      content: '';
      width: 9px;
      height: 9px;
      background: #43F6AD;
      border-radius: 50%;
      position: relative;
      top: 1px;
      left: -10px;
    }
    .el-collapse-item__header:hover{
      background-color: #5f499d;
      border-radius: 19.5px;
      color: #fff;
    }
    .el-collapse-item__header:hover .el-icon-arrow-right:before{
      background: url('../../../assets/images/sandbox/addvm_icon_down.png');
    }
    .el-collapse-item__header.is-active{
      background-color: #5f499d;
      border-radius: 19.5px;
      color: #fff;
    }
    .el-collapse-item__header .el-icon-arrow-right:before{
      content: '';
      display: block;
      width: 8px;
      height: 8px;
    }
    .el-collapse-item__header.is-active .el-icon-arrow-right:before{
      background: url('../../../assets/images/sandbox/addvm_icon_up.png');
      transform: rotate(-90deg);
    }
    .el-collapse-item__arrow{
      margin: 0 16px 0 auto;
    }
    .el-collapse-item__wrap{
      padding: 0 8px;
      background: none;
      border-bottom:none;
      .internetInfos{
        margin-top: 30px;
      }
      .selectImage-content{
        margin-left: 40px;
        margin-top: 30px;
        .selectImage-public{
          display: flex;
          margin-bottom: 20px;
          .el-radio{
            height: 25px;
            line-height: 25px;
          }
          .el-radio__input.is-checked + .el-radio__label {
            color: #fff;
          }
          .el-select{
            width: 264px;
            margin-right: 80px;
            .el-input__inner{
              height: 25px !important;
              background-color: rgba(255, 255, 255, 0.3);
              border: none;
              color: #fff;
              font-family: defaultFontLight,
                Arial,
                Helvetica,
                sans-serif !important;
            }
            .el-icon-arrow-up {
              font-size: 16px;
              position: relative;
              line-height: 25px;
            }
          }
        }
      }
      .simulator-info-content{
        .el-radio-group{
          margin: 15px 0 20px 15px;
          .el-radio-button__inner {
            background: none;
            color: #fff;
            border: none;
            border-bottom:2px solid #4E3494;
          }
          .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            background-color: none;
            border-bottom:2px solid #43F6AD;
            box-shadow: none;
          }
          .el-radio-button:first-child .el-radio-button__inner,.el-radio-button:last-child .el-radio-button__inner{
            border-radius: 2px;
          }
        }
      }
      .vm-size{
        margin: 10px 0;
      }
      .vm-table thead tr{
        height: 50px;
      }
      .title-info{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-family: defaultFontLight,Arial, Helvetica, sans-serif;
        font-size: 14px;
        padding-left: 15px;
      }
      .work-radio{
        display: block;
        margin: 15px 0 0 15px;
      }
      .edit-btn{
        margin: 15px 0;
        .el-button{
          background: #4e3494;
          border: none;
          border-radius: 35px;
          padding: 8px 24px;
          color: #fff;
        }
      }
    }
    .v-note-wrapper{
      background-color: #4e3494;
    }
    .markdown-body,.auto-textarea-wrapper .auto-textarea-input{
      color: #fff;
      font-size: 14px;
    }
    .markdown-body pre,.hljs{
      background-color: #4e3494;
      color: #fff;
    }
  }

}
</style>
