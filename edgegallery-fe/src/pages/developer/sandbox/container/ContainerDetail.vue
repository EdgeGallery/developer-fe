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
          <span class="content-left lt">{{ $t('container.appName') }} :</span>
          <span class="content-right lt">{{ containerApp.name?containerApp.name:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('container.appClass') }} :</span>
          <span class="content-right lt">{{ containerApp.appClass?containerApp.appClass==='CONTAINER'?$t('container.container'):$t('sandbox.vm'):'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('container.createTime') }} :</span>
          <span class="content-right lt">{{ containerApp.createTime?containerApp.createTime:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('container.dependent') }} :</span>
          <span class="content-right lt">{{ appServiceRequired!==''?appServiceRequired.substr(0, appServiceRequired.length-2):'NA' }}</span>
        </p>
      </div>

      <div class="vm-content">
        <p class="clear">
          <span class="content-left lt">{{ $t('container.deploymentStatus') }} :</span>
          <span class="content-right lt">{{ deployStatus!==''?deployStatus:'NA' }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('container.deployAddress') }} :</span>
          <span
            class="content-right lt"
          >
            {{ deployAddress?deployAddress:'NA' }}
          </span>
        </p>
        <p
          class="clear"
          v-if="deployLog!==null"
        >
          <span class="content-left lt">{{ $t('container.deployLog') }} :</span>
          <span class="content-right deploy-log lt">{{ deployLog }}</span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('container.podInformation') }} :</span>
          <span
            class="content-right lt"
          >
            <div class="refresh-btn clear">
              <el-button
                id="btn_refreshPodInfo"
                class="common-btn inner-btn rt"
                @click="refreshDeployStatus"
              >
                {{ $t('nav.refresh') }}
              </el-button>
            </div>
            <el-table
              class="common-table pod-table"
              :data="appPodsData"
              :cell-style="{ textAlign: 'center'}"
              :header-cell-style="{textAlign: 'center'}"
              border
              v-loading="refreshPods"
              element-loading-background="rgba(0, 0, 0, 0.2)"
            >
              <el-table-column
                prop="name"
                :label="$t('container.podName')"
                min-width="22%"
              />
              <el-table-column
                prop="podStatus"
                :label="$t('container.podStatus')"
                min-width="14%"
              />
              <el-table-column
                :label="$t('container.containerName')"
                min-width="14%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.containerList"
                    :key="index"
                    class="container-div"
                  >
                    {{ item.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('container.cpuUsage')"
                min-width="11%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.containerList"
                    :key="index"
                    class="container-div"
                  >
                    {{ getPercentage(item.cpuUsage) }}%
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('container.diskUsage')"
                min-width="11%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.containerList"
                    :key="index"
                    class="container-div"
                  >
                    {{ getPercentage(item.diskUsage) }}%
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('container.memUsage')"
                min-width="14%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.containerList"
                    :key="index"
                    class="container-div"
                  >
                    {{ getPercentage(item.memUsage) }}%
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="eventsInfo"
                :label="$t('container.eventsInfo')"
                min-width="14%"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="seeDetails(scope.row.eventsInfo)"
                  >
                    {{ $t('container.eventsInfo') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </span>
        </p>
        <p class="clear">
          <span class="content-left lt">{{ $t('container.serviceInformation') }} :</span>
          <span
            class="content-right lt"
          >
            <el-table
              class="common-table pod-table"
              :data="appServiceData"
              :cell-style="{ textAlign: 'center'}"
              :header-cell-style="{textAlign: 'center'}"
              border
              v-loading="refreshPods"
              element-loading-background="rgba(0, 0, 0, 0.2)"
            >
              <el-table-column
                prop="name"
                :label="$t('container.serviceName')"
                min-width="16%"
              />
              <el-table-column
                prop="type"
                :label="$t('container.serviceType')"
                min-width="14%"
              />
              <el-table-column
                :label="$t('container.externalAccessPort')"
                min-width="14%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.servicePortList"
                    :key="index"
                    class="container-div"
                  >
                    {{ item.nodePort }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('container.serviceInternalPort')"
                min-width="14%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.servicePortList"
                    :key="index"
                    class="container-div"
                  >
                    {{ item.port }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('container.PodMappingPort')"
                min-width="14%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.servicePortList"
                    :key="index"
                    class="container-div"
                  >
                    {{ item.targetPort }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('container.servicePortName')"
                min-width="14%"
              >
                <template slot-scope="scope">
                  <div
                    v-for="(item,index) in scope.row.servicePortList"
                    :key="index"
                    class="container-div"
                  >
                    {{ item.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('container.servicePortProtocol')"
                min-width="14%"
              >
                TCP
              </el-table-column>
            </el-table>
          </span>
        </p>
      </div>

      <div class="btn-container network-btn">
        <el-button
          id="btn_loginToVNC"
          class="common-btn"
          @click="loginToVNC"
          :disabled="appPodsData.length===0"
        >
          VNC
        </el-button>
        <el-button
          id="btn_closeContainerDetail"
          class="common-btn"
          @click="closeContainerDetail"
        >
          {{ $t('common.close') }}
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
      containerApp: {
        appConfiguration: {
          appServiceRequiredList: []
        },
        instantiateInfo: null
      },
      language: localStorage.getItem('language') || 'cn',
      appPodsData: [],
      appServiceRequired: '',
      refreshPods: false,
      deployStatus: '',
      deployLog: '',
      deployAddress: '',
      appServiceData: []
    }
  },
  methods: {
    closeContainerDetail () {
      this.$emit('closeContainerDetail')
    },
    getContainerDetail () {
      let _this = this
      this.bus.$on('getContainerDetail', function (data, statusMsg) {
        _this.containerApp = data
        _this.getServiceRequiredLists()
        _this.deployLog = statusMsg.errorMsg ? statusMsg.errorMsg : null
        _this.deployStatus = statusMsg.status ? statusMsg.status : ''
        if (_this.deployStatus === 'SUCCESS') {
          _this.refreshDeployStatus()
        }
        if (_this.containerApp.instantiateInfo) {
          _this.deployAddress = _this.containerApp.instantiateInfo.distributedMecHost
          _this.appPodsData = _this.containerApp.instantiateInfo.pods
          _this.appServiceData = _this.containerApp.instantiateInfo.serviceList
        } else {
          _this.appPodsData = []
        }
      })
    },
    getServiceRequiredLists () {
      this.appServiceRequired = ''
      this.containerApp.appConfiguration.appServiceRequiredList.forEach(item => {
        if (this.language === 'cn') {
          this.appServiceRequired += item.twoLevelName + ', '
        } else {
          this.appServiceRequired += item.twoLevelNameEn + ', '
        }
      })
    },
    getPercentage (data) {
      var _devide = data.indexOf('/')
      var _s1 = data.substring(0, _devide)
      var _s2 = data.substring(_devide + 1, data.length)
      let _res = (Math.round(_s1 / _s2 * 10000) / 100.00)
      if (_res > 100) {
        _res = 100
      }
      return _res
    },
    loginToVNC () {
      sandbox.container.vncLogin(this.applicationId).then(res => {
        window.open(res.data.sshAddress + '?id=' + res.data.id + '&encoding=' + res.data.encoding, '_blank')
      })
    },
    refreshDeployStatus () {
      this.refreshPods = true
      let _timer = setTimeout(() => {
        clearTimeout(_timer)
        this.refreshPods = false
      }, 1000)
      sandbox.container.getApplicationDetail(this.applicationId).then(res => {
        if (!res.data || !res.data.containerApp) {
          return
        }
        this.containerApp = res.data.containerApp
        this.getServiceRequiredLists()
        if (!res.data.containerApp.instantiateInfo) {
          return
        }
        this.appPodsData = res.data.containerApp.instantiateInfo.pods
      })
    },
    seeDetails (info) {
      this.$eg_messagebox(info, 'info', '', this.$t('common.confirm'), '', '1100px')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getServiceRequiredLists()
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
    width: 74%;
    min-width: 800px;
    padding: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
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
          width: 125px;
          text-align: right;
          padding-right: 5px;
        }
        .content-right{
          position: relative;
          width: calc(100% - 125px);
        }
        .content-right.deploy-log{
          max-height: 90px;
          overflow: auto;
        }
        .node-span{
          display: block;
          line-height: 25px;
        }
        .el-link.el-link--default{
          color: #fff;
        }
        .refresh-btn{
          position: absolute;
          top: -40px;
          right: 0;
          .el-button{
            background-color: #6145b1 !important;
            color: #fff !important;
          }
          .el-button:hover{
            background-color: #694dc5 !important;
          }
        }
      }
      .pod-table{
        margin-bottom: 10px;
        td.el-table__cell{
          border-bottom: 1px solid #694ec0 !important;
          border-right: 1px solid #694ec0 !important;
        }
      }
      .pod-table.el-table{
        border: 1px solid #694ec0;
      }
      .el-table.pod-table thead tr{
        background-color: #7b62c0;
      }
      .el-table__header-wrapper{
        border-radius: 0;
      }
      .el-table--border::after, .el-table--group::after{
        width: 0;
      }
      .el-table--border .el-table__cell, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border-right: 1px solid #694ec0 !important;
      }
    }
  }
  .container-detail-dlg-en{
    .content-left{
      width: 185px !important;
    }
    .content-right{
      width: calc(100% - 185px) !important;
    }
  }
}
</style>
