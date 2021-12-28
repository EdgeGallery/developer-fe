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
  <div class="vm-detail">
    <div
      class="vm-detail-dlg"
      :class="{'vm-detail-dlg-en':language==='en'}"
    >
      <h3 class="common-dlg-title">
        {{ $t('sandbox.vmDetail') }}
      </h3>
      <div class="vm-content">
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.vmName') }} :</span>
          <span class="content-right lt">{{ vmBasicInformation.vmName?vmBasicInformation.vmName:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.network') }} :</span>
          <span class="content-right lt">{{ vmBasicInformation.netWork?vmBasicInformation.netWork:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.image') }} :</span>
          <span class="content-right lt">{{ vmBasicInformation.image?vmBasicInformation.image:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.flavor') }} :</span>
          <span class="content-right lt">{{ vmBasicInformation.flavor?vmBasicInformation.flavor:'NA' }}</span>
        </p>
      </div>

      <div class="vm-content">
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.instanceStatus') }} :</span>
          <span class="content-right lt">{{ vmTestInformation.status?vmTestInformation.status:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.instanceInformation') }} :</span>
          <span
            class="content-right lt"
            v-if="vmTestInformation.nodes.length>0"
          >
            <span
              v-for="(item,index) in vmTestInformation.nodes"
              :key="index"
              class="node-span"
            >
              {{ item.networkName }} : {{ item.ipAddress }}
            </span>
          </span>
          <span
            class="content-right lt"
            v-if="vmTestInformation.nodes.length===0"
          >NA</span>
        </p>
        <p
          class="clear"
          v-if="startErrMsg!==''"
        >
          <span class="content-left lt">{{ $t('sandbox.errMsg') }} :</span>
          <span class="content-right lt">{{ startErrMsg }}</span>
        </p>
      </div>

      <div class="vm-content">
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.imageName') }} :</span>
          <span class="content-right lt">{{ vmImageInformation.imageName?vmImageInformation.imageName:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.downloadUrl') }} :</span>
          <span class="content-right lt">
            <el-link
              :href="vmImageInformation.downloadUrl"
              :underline="false"
              rel="noopener noreferrer"
            >
              {{ vmImageInformation.downloadUrl?vmImageInformation.downloadUrl:'NA' }}
            </el-link>
          </span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('sandbox.stageStatus') }} :</span>
          <span class="content-right lt">{{ vmImageInformation.status?vmImageInformation.status:'NA' }}</span>
        </p>
        <p
          class="clear"
          v-if="exportErrMsg!==''"
        >
          <span class="content-left lt">{{ $t('sandbox.errMsg') }} :</span>
          <span class="content-right lt">{{ exportErrMsg }}</span>
        </p>
      </div>

      <div class="btn-container vmdetail-btn">
        <el-button
          id="btn_editVmDetail"
          class="common-btn"
          @click="editVmDetail"
        >
          {{ $t('common.edit') }}
        </el-button>
        <el-button
          id="btn_closeVmDetail"
          class="common-btn"
          @click="closeVmDetail"
        >
          {{ $t('common.finish') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../../api/developerApi.js'
export default {
  name: 'Vmdetail',
  data () {
    return {
      applicationId: sessionStorage.getItem('applicationId') || '',
      vmBasicInformation: {
        vmName: '',
        netWork: '',
        image: '',
        flavor: ''
      },
      vmTestInformation: {
        status: '',
        nodes: []
      },
      vmImageInformation: {},
      vmId: '',
      language: localStorage.getItem('language') || 'cn',
      vmDetail: {},
      startErrMsg: '',
      exportErrMsg: '',
      vmIndex: -1
    }
  },
  methods: {
    closeVmDetail () {
      this.$emit('closeVmDetail', this.vmDetail, this.vmIndex)
    },
    checkVmDetail () {
      let _this = this
      this.bus.$on('checkVmDetail', function (data, index) {
        _this.vmId = data
        _this.vmIndex = index
        _this.getVmDetail(_this.vmId)
      })
    },
    getVmExportImageInfo () {
      let _this = this
      this.bus.$on('getVmExportImageInfo', function (data) {
        _this.vmImageInformation = data
      })
      this.bus.$on('getVmStartErr', function (data) {
        _this.startErrMsg = data
      })
      this.bus.$on('getVmExportErr', function (data) {
        _this.exportErrMsg = data
      })
    },
    getVmDetail (vmId) {
      sandbox.getVmDetail(this.applicationId, vmId).then(res => {
        if (res.data) {
          this.vmDetail = res.data
          this.vmBasicInformation.vmName = res.data.name
          let _arr = []
          res.data.portList.forEach(item => {
            _arr.push(item.networkName)
          })
          this.vmBasicInformation.netWork = _arr.join(', ')
          this.getVmDetailImage(res.data.imageId)
          this.getVmDetailFlavor(res.data.flavorId)

          if (res.data.vmInstantiateInfo) {
            sandbox.getVmStatus(res.data.vmInstantiateInfo.operationId).then(res => {
              this.vmTestInformation.status = res.data.status
            })
            this.vmTestInformation.nodes = res.data.vmInstantiateInfo.portInstanceList
          }
        }
      })
    },
    getVmDetailImage (imageId) {
      sandbox.getVmDetailImage(imageId).then(res => {
        this.vmBasicInformation.image = res.data.name + ' ' + res.data.osVersion + ' ' + res.data.osBitType + ' (' + res.data.systemDiskSize + 'GB Disk)'
      })
    },
    getVmDetailFlavor (flavorId) {
      sandbox.getVmDetailFlavor(flavorId).then(res => {
        this.vmBasicInformation.flavor = res.data.architecture + ', ' + res.data.name + ', ' + res.data.cpu + 'vCPUs' + res.data.memory + 'GB RAM, ' + res.data.dataDiskSize + 'GB+' + res.data.systemDiskSize + 'GB Disk'
      })
    },
    editVmDetail () {
      setTimeout(() => {
        this.bus.$emit('editVmDetail', this.vmDetail)
      }, 0)
      this.$emit('editVmDetail')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.checkVmDetail()
    this.getVmExportImageInfo()
  }
}
</script>

<style lang="less">
.vm-detail{
  width: 100%;
  height: 100%;
  position: relative;
  font-family: defaultFontLight Arial, Helvetica, sans-serif;
  .vm-detail-dlg{
    .vm-content{
      padding: 16px 40px;
      border-radius: 8px;
      background: rgba(255,255,255,.1);
      font-size: 18px;
      line-height: 30px;
      margin-top: 15px;
      p{
        margin-bottom: 10px;
        .content-left{
          width: 110px;
          text-align: right;
          padding-right: 5px;
        }
        .content-right{
          width: calc(100% - 110px);
        }
        .node-span{
          display: block;
          line-height: 25px;
        }
        .el-link.el-link--default{
          color: #fff;
        }
      }
    }
  }
  .vm-detail-dlg-en{
    .content-left{
      width: 180px !important;
    }
    .content-right{
      width: calc(100% - 180px) !important;
    }
  }
}
</style>
