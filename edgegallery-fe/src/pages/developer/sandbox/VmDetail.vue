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
    <img
      src="../../../assets/images/sandbox/question.png"
      alt=""
      class="question hoverHands"
    >

    <div class="common-div-bg vm-detail-dlg">
      <h3 class="rules-title-green">
        虚拟机详情
      </h3>
      <div class="vm-content">
        <p class="clear">
          <span class="content-left lt">虚拟机名称：</span>
          <span class="content-right lt">{{ vmBasicInformation.vmName }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">网络：</span>
          <span class="content-right lt">{{ vmBasicInformation.netWork }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">镜像：</span>
          <span class="content-right lt">{{ vmBasicInformation.image }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">规格：</span>
          <span class="content-right lt">{{ vmBasicInformation.format }}</span>
        </p>
      </div>

      <div class="btn-container network-btn">
        <el-button
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
import { sandbox } from '../../../api/developerApi'
export default {
  name: 'Vmdetail',
  data () {
    return {
      applicationId: sessionStorage.getItem('applicationId') || '',
      testNodes: 'https://192.168.1.38:30091,https://192.168.1.38:30092,https://192.168.1.38:30093',
      vmBasicInformation: {
        vmName: 'vm-name',
        netWork: 'newWork-n6，network-mep，network-internet',
        image: 'ubuntu 1804 64(40GB Disk)',
        format: 'X86，通用计算机-4，4vCPUs，16GB RAM，50GB+100GB Disk'
      },
      vmId: ''
    }
  },
  methods: {
    closeVmDetail () {
      this.$emit('closeVmDetail')
    },
    checkVmDetail () {
      let _this = this
      this.bus.$on('checkVmDetail', function (data) {
        _this.vmId = data
        _this.getVmDetail(_this.vmId)
      })
    },
    getVmDetail (vmId) {
      sandbox.getVmDetail(this.applicationId, vmId).then(res => {
        if (res.data) {
          this.vmBasicInformation.vmName = res.data.name
        }
      })
    }
  },
  mounted () {
    // this.checkVmDetail()
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
    position: absolute;
    width: 700px;
    padding: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .vm-content{
      padding: 16px 40px;
      border-radius: 8px;
      background: rgba(255,255,255,.1);
      font-size: 14px;
      line-height: 22px;
      p{
        margin-bottom: 10px;
        .content-left{
          width: 100px;
          text-align: right;
        }
        .content-right{
          width: calc(100% - 100px);
        }
      }
    }
  }
}
</style>
