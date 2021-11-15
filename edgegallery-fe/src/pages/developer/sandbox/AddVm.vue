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
      <div class="vm-info">
        <div class="addVm-top-title">
          <p class="defaultFontLight">
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
      <div class="simulator-info">
        <div class="simulator-info-title">
          <p>
            <span />
            选择虚拟机规格
          </p>
        </div>
        <div class="simulator-info-content">
          <div class="defaultFontLight">
            <el-radio-group
              v-model="vmInfo.archType"
              @change="handleChangeArch"
            >
              <el-radio-button label="X86" />
              <el-radio-button label="ARM" />
            </el-radio-group>
            <p class="vm-size defaultFontLight">
              虚拟机规格
            </p>
            <el-table
              :data="vmInfo.vmRegulationList"
              class="common-table vm-table"
            >
              <el-table-column width="35px">
                <template slot-scope="scope">
                  <el-radio
                    :label="scope.row.id"
                    v-model="addvmImages.flavorId"
                    class="work-radio"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="140"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column
                prop="sence"
                label="使用场景"
                width="110"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  {{ scope.row.description }}
                </template>
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="CPU"
                width="110"
                show-overflow-tooltip
                :formatter="appendCPUUnit"
              />
              <el-table-column
                prop="memory"
                label="内存"
                width="110"
                show-overflow-tooltip
                :formatter="appendSizeUnit"
              />
              <el-table-column
                prop="systemDiskSize"
                label="系统盘"
                width="110"
                show-overflow-tooltip
                :formatter="appendSizeUnit"
              />
              <el-table-column
                prop="dataDiskSize"
                label="数据盘"
                width="100"
                show-overflow-tooltip
                :formatter="appendSizeUnit"
              />
              <el-table-column
                prop="otherExtraInfo"
                label="其他能力"
                width="100"
                show-overflow-tooltip
              />
            </el-table>
          </div>
        </div>
      </div>
      <div class="simulator-info config-port">
        <div class="simulator-info-title">
          <p>
            <span />
            配置网络端口
          </p>
        </div>
        <div class="simulator-info-content">
          <el-table
            class="common-table network-table vm-table"
            :data="vmNetworkList"
          >
            <el-table-column width="35">
              <template slot-scope="scope">
                <el-checkbox
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
      </div>
      <div class="simulator-info selectImage-info">
        <div class="simulator-info-title">
          <p>
            <span />
            选择镜像
          </p>
        </div>
        <div class="selectImage-content">
          <div class="selectImage-public defaultFontLight">
            <el-radio
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
      </div>
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
        userDate: null,
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
      this.vmInfo.publicSystemImage.forEach(item => {
        if (item.systemType === data) {
          this.vmInfo.publicImageOptions.push(item)
        }
      })
    },
    changePrivateType (data) {
      this.vmInfo.privateId = ''
      this.vmInfo.privateImageOptions = []
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
    changeInternet (data) {
      console.log(data)
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
        let _addVmImagesVal = this.addvmImages.name !== '' && this.addvmImages.imageId !== '' && this.addvmImages.vmCertificate.pwdCertificate.password !== '' && this.addvmImages.vmCertificate.pwdCertificate.username !== '' && this.addvmImages.portList !== ''
        if (_addVmImagesVal) {
          sandbox.addVmImage(this.applicationId, this.addvmImages).then(() => {
            this.$message({
              message: '虚拟机添加成功！',
              type: 'success'
            })
            _data=this.selectedNetworks
            this.$emit('addVmFinish', _data)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$message({
            message: '请完善内容，再次点击提交！',
            type: 'warning'
          })
        }
      } else {
        this.$emit('addVmFinish', _data)
      }
    }
  },
  mounted () {
    this.getVmSpecs()
    this.getInternetType()
    this.getVmImageLists()
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
    width:1184px;
    max-height: 805px;
    margin: 0px auto;
    padding: 40px;
    .vm-info{
      margin: 0 0 30px 20px;
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
        .el-input__inner{
          width: 816px ;
          height: 25px;
          background-color: rgba(255, 255, 255, 0.3);
          color: #fff;
          border: none;
        }
      }
    }
    .simulator-info{
      margin-bottom: 30px;
      .simulator-info-title{
        p{
          font-size: 20px;
          display: flex;
          span{
            display: block;
            background-color: #5944C0;
            width: 9px;
            height: 9px;
            border-radius:50%;
            margin: 10px 20px 0 0 ;
          }
        }
      }
      .simulator-info-content{
        .el-radio-group{
          margin: 10px 0 0 130px;
          .el-radio-button__inner {
            background: none;
            color: #fff;
            border: none;
            border-bottom:4px solid #8f86cc ;
          }
          .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            background-color: none;
            border-bottom:4px solid #5944C0 ;
            box-shadow: none;
          }
        }
        .vm-size{
          margin: 20px 0 20px 144px;
        }
        .vm-table{
          margin-left: 130px;
          width: 816px;
          .el-table__row{
            border: 2px solid red !important;
            height: 59px;
          }
        }
        .network-table{
          margin-top: 20px;
        }
        .el-table td,.el-table tr.is-leaf {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
      }
    }
    .selectImage-info{
      .selectImage-content{
        margin-left: 140px;
        .selectImage-public{
          display: flex;
          margin-bottom: 20px;
          .el-radio{
            height: 25px;
            line-height: 25px;
            color: #fff;
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
    }
    .addVm-btn{
      margin-right: 30px;
    }
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    background: #7ED4A9;
    width: 8px;
    height: 8px;
  }
 .el-radio__inner {
      border:1px solid #fff;
      background-color: #C4C4C4;
  }
  .el-radio__input.is-checked .el-radio__inner {
      background: #6d5dc1;
  }
}
</style>
