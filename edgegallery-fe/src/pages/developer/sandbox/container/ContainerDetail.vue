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
  <div class="container-detail">
    <div
      class="common-div-bg container-detail-dlg"
      :class="{'container-detail-dlg-en':language==='en'}"
    >
      <h3 class="common-dlg-title">
        {{ $t('container.containerDetail') }}
      </h3>
      <div class="vm-content">
        <p class="clear">
          <span class="content-left lt">应用名称 :</span>
          <span class="content-right lt">{{ containerApp.name?containerApp.name:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">负载类型 :</span>
          <span class="content-right lt">{{ containerApp.appClass?containerApp.appClass==='CONTAINER'?$t('container.container'):$t('sandbox.vm'):'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">创建时间 :</span>
          <span class="content-right lt">{{ containerApp.createTime?containerApp.createTime:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">依赖应用 :</span>
          <!-- <span class="content-right lt">{{ vmBasicInformation.flavor?vmBasicInformation.flavor:'NA' }}</span> -->
        </p>
      </div>

      <div class="vm-content">
        <p class="clear">
          <span class="content-left lt">部署状态 :</span>
          <span class="content-right lt">{{ containerApp.instantiateInfo.status?containerApp.instantiateInfo.status:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">pod信息 :</span>
          <span
            class="content-right lt"
          />
          <span
            class="content-right lt"
          >NA</span>
        </p>
      </div>

      <div class="btn-container network-btn">
        <el-button
          class="common-btn"
          @click="closeContainerDetail"
        >
          {{ $t('common.finish') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vmdetail',
  data () {
    return {
      applicationId: sessionStorage.getItem('applicationId') || '',
      containerApp: {},
      vmBasicInformation: {
        vmName: '',
        netWork: '',
        image: '',
        flavor: ''
      },
      vmId: '',
      language: localStorage.getItem('language') || 'cn'
    }
  },
  methods: {
    closeContainerDetail () {
      this.$emit('closeContainerDetail')
    },
    getContainerDetail () {
      let _this = this
      this.bus.$on('getContainerDetail', function (data) {
        _this.containerApp = data
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getContainerDetail()
  }
}
</script>

<style lang="less">
.container-detail{
  width: 100%;
  height: 100%;
  position: relative;
  font-family: defaultFontLight Arial, Helvetica, sans-serif;
  .container-detail-dlg{
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
      margin-top: 15px;
      p{
        margin-bottom: 10px;
        .content-left{
          width: 100px;
          text-align: right;
          padding-right: 5px;
        }
        .content-right{
          width: calc(100% - 100px);
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
  .container-detail-dlg-en{
    .content-left{
      width: 140px !important;
    }
    .content-right{
      width: calc(100% - 140px) !important;
    }
  }
}
</style>
