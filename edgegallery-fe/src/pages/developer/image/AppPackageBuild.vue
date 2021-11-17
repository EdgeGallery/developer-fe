
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
  <div class="app-package-build">
    <div class="common-div-bg app-package-build-warraper">
      <div class="app-package-build-title">
        {{ $t('appPackage.appdTitle') }}
      </div>
      <div class="app-package-build-content">
        <div class="app-package-build-basicinfo">
          <div class="title-wrapper">
            <div class="circle-out">
              <div class="circle-in" />
            </div>
            <div class="basicinfo-title title">
              {{ $t('appPackage.basicInfo') }}
            </div>
          </div>
          <div class="content-wrapper">
            <el-row>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.appName') }}
                </p>
                <p>
                  {{ basicInfoData.name }}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.version') }}
                </p>
                <p>
                  {{ basicInfoData.version }}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.provider') }}
                </p>
                <p>
                  {{ basicInfoData.provider }}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.industry') }}
                </p>
                <p>
                  {{ basicInfoData.industry }}
                </p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.type') }}
                </p>
                <p>
                  {{ basicInfoData.type }}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.architecture') }}
                </p>
                <p>
                  {{ basicInfoData.architecture }}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.dependent') }}
                </p>
                <p>
                  {{ basicInfoData.dependent }}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.createTime') }}
                </p>
                <p>
                  {{ basicInfoData.createTime }}
                </p>
              </el-col>
            </el-row>
            <el-row class="thirdline">
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.description') }}
                </p>
                <p>
                  {{ basicInfoData.description }}
                </p>
              </el-col>
              <el-col :span="6">
                <p class="left">
                  {{ $t('appPackage.fileName') }}
                </p>
                <p>
                  {{ basicInfoData.fileName }}
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="app-package-build-resourceconfig">
          <div class="title-wrapper">
            <div class="circle-out">
              <div class="circle-in" />
            </div>
            <div class="resourceconfig-title title">
              {{ $t('appPackage.resourceConfig') }}
            </div>
          </div>
          <div class="content-wrapper appPackageBuild-content">
            <el-table
              class="common-table"
              :data="resourceConfigInfoList"
            >
              <el-table-column
                prop="vmName"
                :label="$t('appPackage.vmName')"
                min-width="14%"
              />
              <el-table-column
                prop="spec"
                :label="$t('appPackage.spec')"
                min-width="18%"
              />
              <el-table-column
                prop="network"
                :label="$t('appPackage.network')"
                min-width="18%"
              />
              <el-table-column
                prop="basicImage"
                :label="$t('appPackage.basicImage')"
                min-width="12%"
              />
              <el-table-column
                prop="vmImage"
                :label="$t('appPackage.vmImage')"
                min-width="15%"
              />
            </el-table>
          </div>
        </div>
        <div class="app-package-build-rule">
          <div class="title-wrapper">
            <div class="circle-out">
              <div class="circle-in" />
            </div>
            <div class="rule-title title">
              {{ $t('appPackage.rule') }}
            </div>
          </div>
          <div class="content-wrapper appPackageBuild-content">
            <el-tabs>
              <el-tab-pane :label="$t('appPackage.trafficRule')">
                <div class="ruleTable">
                  <el-table
                    class="common-table"
                    :data="trafficRulesInfoList"
                  >
                    <el-table-column
                      prop="trafficRuleId"
                      :label="$t('appPackage.trafficRuleId')"
                      min-width="25%"
                    />
                    <el-table-column
                      prop="action"
                      :label="$t('appPackage.filterType')"
                      min-width="25%"
                    />
                    <el-table-column
                      prop="priority"
                      :label="$t('appPackage.priority')"
                      min-width="25%"
                    />
                    <el-table-column
                      prop="filterType"
                      :label="$t('appPackage.action')"
                      min-width="25%"
                    />
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('appPackage.dnsRule')">
                <div class="ruleTable">
                  <el-table
                    class="common-table"
                    :data="dnsRulesInfoList"
                  >
                    <el-table-column
                      prop="dnsRuleId"
                      :label="$t('appPackage.dnsRuleId')"
                      min-width="25%"
                    />
                    <el-table-column
                      prop="domainName"
                      :label="$t('appPackage.domainName')"
                      min-width="25%"
                    />
                    <el-table-column
                      prop="ipAddressType"
                      :label="$t('appPackage.ipAddressType')"
                      min-width="25%"
                    />
                    <el-table-column
                      prop="ttl"
                      :label="$t('appPackage.ttl')"
                      min-width="25%"
                    />
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="app-package-build-capabalityconfig">
          <div class="title-wrapper">
            <div class="circle-out">
              <div class="circle-in" />
            </div>
            <div class="capabalityconfig-title title">
              {{ $t('appPackage.capabalityConfig') }}
            </div>
          </div>
          <div class="content-wrapper appPackageBuild-content">
            <div class="depend">
              <h3 class="rules-title title">
                {{ $t('appPackage.capabalityDepend') }}
              </h3>
              <div class="dependTable">
                <el-table
                  class="common-table"
                  :data="capabalityDependsList"
                >
                  <el-table-column
                    prop="serName"
                    :label="$t('appPackage.serviceName')"
                    min-width="60%"
                  />
                  <el-table-column
                    prop="version"
                    :label="$t('appPackage.version')"
                    min-width="40%"
                  />
                </el-table>
              </div>
            </div>
            <div class="release">
              <h3 class="rules-title title">
                {{ $t('appPackage.capabalityRelease') }}
              </h3>
              <div class="releaseTable">
                <el-table
                  class="common-table"
                  :data="capabalityReleaseDataList"
                >
                  <el-table-column
                    prop="serviceName"
                    :label="$t('appPackage.serviceName')"
                    min-width="26%"
                  />
                  <el-table-column
                    prop="internalPort"
                    :label="$t('appPackage.port')"
                    min-width="30%"
                  />
                  <el-table-column
                    prop="version"
                    :label="$t('appPackage.version')"
                    min-width="20%"
                  />
                  <el-table-column
                    prop="protocol"
                    :label="$t('appPackage.protocol')"
                    min-width="20%"
                  />
                  <el-table-column
                    prop="description"
                    :label="$t('appPackage.description')"
                    min-width="28%"
                  />
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-container appPackageBtn">
        <el-button
          class="common-btn"
          @click="packageApp"
        >
          {{ $t('appPackage.appdPreview') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { imageApi } from '../../../api/developerApi'
export default {
  name: 'AppPackageBuild',
  components: {
  },
  data () {
    return {
      basicInfoData: {},
      resourceConfigInfoList: [],
      trafficRulesInfoList: [],
      dnsRulesInfoList: [],
      capabalityDependsList: [],
      capabalityReleaseDataList: [],
      applicationId: sessionStorage.getItem('applicationId'),
      packageId: ''
    }
  },
  methods: {
    getAppBaseInfo () {
      imageApi.getAppInfo(this.applicationId).then(res => {
        if (res.data.vmApp) {
          this.basicInfoData = res.data.vmApp
        } else {
          this.basicInfoData = res.data.containerApp
        }
        this.getBaseInfoFileName()
        this.getResourceConfig()
        this.getRulesInfo()
        this.packageId = this.basicInfoData.appPackage.id
        if (this.basicInfoData.appConfiguration.appServiceRequiredList.length === 0) {
          this.basicInfoData.dependent = '无依赖'
        } else {
          let _dependents = []
          let _requireData = this.basicInfoData.appConfiguration.appServiceRequiredList
          _requireData.forEach(item => {
            _dependents.push(item.serName)
          })
          this.basicInfoData.dependent = _dependents.toString()
        }
      })
    },
    getBaseInfoFileName () {
      imageApi.getFileInfo(this.basicInfoData.guideFileId).then(res => {
        this.basicInfoData.fileName = res.data.fileName
      })
    },
    getResourceConfig () {
      let _configInfo = {
        vmId: '',
        vmName: '',
        spec: '',
        network: '',
        basicImage: '',
        vmImage: ''
      }
      this.basicInfoData.vmList.forEach(item => {
        _configInfo.vmId = item.id
        _configInfo.vmName = item.name
        this.handleResourceConfig(_configInfo, item)
        if (!item.imageExportInfo) {
          _configInfo.vmImage = '无'
        } else {
          _configInfo.vmImage = item.imageExportInfo.imageName
        }
        this.resourceConfigInfoList.push(_configInfo)
      })
    },
    handleResourceConfig (_configInfo, item) {
      let _networks = []
      item.portList.forEach(portItem => {
        _networks.push(portItem.networkName)
        _configInfo.network = _networks.toString()
      })
      imageApi.getVmFlavors(item.flavorId).then(res => {
        let _flavors = res.data
        _configInfo.spec = _flavors.architecture + ' | ' + _flavors.cpu + 'vCPUs' + ' | ' + _flavors.memory + 'GBRAM' + ' | ' + _flavors.dataDiskSize + 'GB+' + _flavors.systemDiskSize + 'GB' + ' Disk'
      })
      imageApi.getImage(item.imageId).then(res => {
        _configInfo.basicImage = res.data.name
      })
    },
    getRulesInfo () {
      this.trafficRulesInfoList = this.basicInfoData.appConfiguration.trafficRuleList
      this.dnsRulesInfoList = this.basicInfoData.appConfiguration.dnsRuleList
      this.capabalityDependsList = this.basicInfoData.appConfiguration.appServiceRequiredList
      this.capabalityReleaseDataList = this.basicInfoData.appConfiguration.appServiceProducedList
    },
    packageApp () {
      imageApi.generatePackage(this.applicationId).then(res => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: '打包成功',
          type: 'success'
        })
        this.$router.push({ path: '/EG/images/appdPreview', query: { packageId: this.packageId } })
      }).catch(() => {
        this.$eg_messagebox('打包失败', 'error')
      })
    }
  },
  mounted () {
    this.getAppBaseInfo()
  }
}
</script>

<style lang='less'>
.app-package-build {
  background: transparent;
  height: 90%;
  .app-package-build-warraper::-webkit-scrollbar, .app-package-build-content::-webkit-scrollbar {
    display: none;
  }
  .app-package-build-warraper {
    width: 85%;
    height: 85%;
    border-radius: 16px;
    margin: 51px auto;
    padding: 40px 40px 40px 40px;
    .app-package-build-title {
      height: 30px;
      line-height: 30px;
      font-size: 30px;
      text-align: center;
      font-weight: bold;
    }
    .title {
      padding-left: 8px;
    }
    .app-package-build-content {
      height: calc(100% - 130px);
      overflow: auto;
      margin-top: 20px;
    }
    .circle-out {
      width: 14px;
      height: 14px;
      border: 2px solid #76E1E9;
      border-radius: 50%;
      position: relative;
      float: left;
      .circle-in {
        width: 6px;
        height: 6px;
        border: 2px solid #76E1E9;
        border-radius: 50%;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
    .app-package-build-basicinfo, .app-package-build-resourceconfig, .app-package-build-rule, .app-package-build-capabalityconfig{
      padding: 40px 0 0 0px;
      font-size: 18px;
      text-align: left;
    }
    .title-wrapper {
        height: 18px;
        line-height: 18px;
        display:flex;
        align-items:center;
    }
    .content-wrapper {
      padding-left: 22px;
    }
    .app-package-build-basicinfo {
      .el-row {
        margin-top: 24px;
        p {
          display: inline-block;
          padding-right: 24px;
        }
        .left {
          font-weight: 600;
        }
        .app-build-upload {
          border-radius: 12px;
          height: 30px;
        }
      }
      .thirdline {
        display:flex;
        align-items:center;
        margin-top: 26px;
        .tip {
          padding-left: 20px;
        }
      }
    }
    .app-package-build-resourceconfig {
      .appPackageBuild-content {
        margin-top: 20px;
        .operation-btn {
          border-radius: 12px;
          color: #5944C0;
          padding: 3px 16px 2px;
        }
        .el-table__cell > .cell{
          padding-left:30px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #30E2E9;
        }
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #30E2E9;
          border-color: #30E2E9;
        }
        .el-table__row {
          height: 101px;
          .el-table__cell {
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          }
        }
        .progress-bar {
          margin-top: 13px;
          width: 90%;
          .el-progress-bar {
            padding-right: 0px;
            margin: 0;
          }
          .el-progress-bar__outer {
            height: 14px !important;
            background: rgba(255, 255, 255, 0.3);
          }
          .el-progress.is-success .el-progress-bar__inner {
            width: calc(100% - 6px) !important;
            color: #3AC372;
            height: 8px !important;
            margin: 3px 3px;
          }
          .el-progress__text {
            display: none;
          }
        }
      }
    }
    .app-package-build-rule {
      .appPackageBuild-content {
        margin-top: 10px;
        .el-tabs__item {
          color: #FFFFFF;
        }
        .ruleTable {
          margin-top: 20px;
          .el-table__cell {
            padding-left: 30px !important;
          }
          .el-table__row {
            height: 50px;
            .el-table__cell {
              border-bottom: 2px solid rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
    }
    .app-package-build-capabalityconfig {
      .appPackageBuild-content {
        display: flex;
        margin-top: 15px;
        .dependTable, .releaseTable {
          margin-top: 18px;
          .el-table__cell{
            padding-left: 30px !important;
          }
        }
        .title {
          font-size: 16px;
          padding-left: 0;
          margin-bottom: 18px;
        }
        .depend {
          width: 33%;
        }
        .release {
          width: 62%;
          margin-left: 5%;
        }
        .rules-title:before {
          background-color: #76E1E9;
        }
      }
    }
    .appPackageBtn {
      margin: 41px 0px 0 0;
      .el-button {
        font-size: 20px;
        border-radius: 16px;
        padding: 17px 45px;
      }
      .el-button + .el-button {
        margin-left: 60px;
      }
    }
  }
}
</style>
