
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
          <div>
            <div class="basicinfo-title common-dlg-title">
              {{ $t('appPackage.basicInfo') }}
            </div>
          </div>
          <div class="content-wrapper">
            <el-form :model="basicInfoData">
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.appName')">
                    {{ basicInfoData.name }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.baseVersion')">
                    {{ basicInfoData.version }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.provider')">
                    {{ basicInfoData.provider }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.industry')">
                    {{ basicInfoData.industry }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.createTime')">
                    {{ basicInfoData.createTime }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.architecture')">
                    {{ basicInfoData.architecture }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.dependent')">
                    {{ basicInfoData.dependent }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.type')">
                    {{ basicInfoData.type }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="thirdline">
                <el-col :span="6">
                  <el-form-item :label="$t('appPackage.baseDesc')">
                    {{ basicInfoData.description }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div
          class="app-package-build-resourceconfig"
          v-if="appClass==='VM'"
        >
          <div>
            <div class="resourceconfig-title common-dlg-title">
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
          <div>
            <div class="rule-title common-dlg-title">
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
        <div class="app-package-build-capabilityconfig">
          <div>
            <div class="common-dlg-title">
              {{ $t('appPackage.capabilityConfig') }}
            </div>
          </div>
          <div class="content-wrapper appPackageBuild-content">
            <div class="depend">
              <h3 class="rules-title common-dlg-title">
                {{ $t('appPackage.capabilityDepend') }}
              </h3>
              <div class="dependTable">
                <el-table
                  class="common-table"
                  :data="capabilityDependsList"
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
              <h3 class="rules-title common-dlg-title">
                {{ $t('appPackage.capabilityRelease') }}
              </h3>
              <div class="releaseTable">
                <el-table
                  class="common-table"
                  :data="capabilityReleaseDataList"
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
import { Industry, Type } from '../../../tools/commondata.js'
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
      capabilityDependsList: [],
      capabilityReleaseDataList: [],
      applicationId: sessionStorage.getItem('applicationId'),
      language: localStorage.getItem('language'),
      appClass: 'VM'
    }
  },
  methods: {
    getAppBaseInfo () {
      imageApi.getAppInfo(this.applicationId).then(res => {
        if (res.data.vmApp) {
          this.basicInfoData = res.data.vmApp
          this.getResourceConfig()
          this.appClass = res.data.vmApp.appClass
        } else {
          this.basicInfoData = res.data.containerApp
          this.appClass = res.data.containerApp.appClass
        }
        Industry.forEach(item => {
          if (this.basicInfoData.industry === item.value) {
            this.basicInfoData.industry = this.language === 'cn' ? item.label[0] : item.label[1]
          }
        })
        Type.forEach(item => {
          if (this.basicInfoData.type === item.value) {
            this.basicInfoData.type = this.language === 'cn' ? item.label[0] : item.label[1]
          }
        })
        this.getRulesInfo()
        this.handleDependents()
      })
    },
    handleDependents () {
      if (this.basicInfoData.appConfiguration.appServiceRequiredList.length === 0) {
        this.basicInfoData.dependent = this.$t('appPackage.noDependences')
      } else {
        let _dependents = []
        let _requireData = this.basicInfoData.appConfiguration.appServiceRequiredList
        if (this.language === 'cn') {
          _requireData.forEach(item => {
            _dependents.push(item.twoLevelName)
          })
        } else {
          _requireData.forEach(item => {
            _dependents.push(item.twoLevelNameEn)
          })
        }
        this.basicInfoData.dependent = _dependents.toString()
      }
    },
    getResourceConfig () {
      this.resourceConfigInfoList = []
      this.basicInfoData.vmList.forEach(item => {
        let _configInfo = {
          vmId: '',
          vmName: '',
          spec: '',
          network: '',
          basicImage: '',
          vmImage: ''
        }
        _configInfo.vmId = item.id
        _configInfo.vmName = item.name
        this.handleResourceConfig(_configInfo, item)
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
        _configInfo.basicImage = res.data.name + ' | ' + res.data.osVersion
      })
      if (!item.targetImageId) {
        _configInfo.vmImage = 'NA'
      } else {
        imageApi.getImage(item.targetImageId).then(res => {
          _configInfo.vmImage = res.data.name
        })
      }
    },
    getRulesInfo () {
      this.trafficRulesInfoList = this.basicInfoData.appConfiguration.trafficRuleList
      this.dnsRulesInfoList = this.basicInfoData.appConfiguration.dnsRuleList
      this.capabilityDependsList = this.basicInfoData.appConfiguration.appServiceRequiredList
      this.capabilityReleaseDataList = this.basicInfoData.appConfiguration.appServiceProducedList
    },
    packageApp () {
      imageApi.generatePackage(this.applicationId).then(res => {
        this.$message({
          showClose: true,
          duration: 2000,
          message: this.$t('appPackage.packageSuc'),
          type: 'success'
        })
        this.$router.push({ path: '/EG/images/appdPreview', query: { packageId: res.data.id } })
      }).catch(error => {
        if (error.response.data.message === 'container application does not upload any yaml.') {
          this.$eg_messagebox(this.$t('appPackage.packageBuildInfo'), 'warning')
        } else {
          this.$eg_messagebox(this.$t('appPackage.packageFail'), 'error')
        }
      })
    }
  },
  mounted () {
    this.getAppBaseInfo()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getAppBaseInfo()
    }
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
    max-height: 95%;
    height: 95%;
    border-radius: 16px;
    margin: 51px auto;
    padding: 20px 40px;
    .app-package-build-title {
      height: 30px;
      line-height: 30px;
      font-size: 30px;
      text-align: center;
    }
    .app-package-build-content {
      height: calc(100% - 110px);
      overflow: auto;
      margin-top: 20px;
    }
    .app-package-build-basicinfo, .app-package-build-resourceconfig, .app-package-build-rule, .app-package-build-capabilityconfig{
      padding: 25px 0 0 0px;
      font-size: 16px;
      text-align: left;
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    }
    .content-wrapper {
      padding-left: 22px;
      .el-form{
        .el-form-item {
          margin-bottom: 0;
        }
        .el-form-item__label {
          font-size: 20px;
          display: inline-block;
          width: 145px;
          text-align: right;
        }
        .el-form-item__content{
          font-size: 18px;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .app-package-build-basicinfo {
      .el-row {
        margin-top: 8px;
        .app-build-upload {
          border-radius: 12px;
          height: 30px;
        }
      }
      .thirdline {
        display:flex;
        align-items:center;
        margin-top: 8px;
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
          height: 75px;
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
          font-size: 18px;
        }
        .ruleTable {
          margin-top: 20px;
          .el-table__cell {
            padding-left: 30px !important;
          }
          .el-table__row {
            height: 50px;
          }
        }
      }
    }
    .app-package-build-capabilityconfig {
      .appPackageBuild-content {
        display: flex;
        margin-top: 15px;
        .dependTable, .releaseTable {
          margin-top: 18px;
          .el-table__cell{
            padding-left: 30px !important;
          }
        }
        .depend {
          width: 33%;
        }
        .rules-title{
          font-size: 18px;
        }
        .release {
          width: 62%;
          margin-left: 5%;
        }
      }
    }
    .appPackageBtn {
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
  .el-table.common-table thead tr{
    height: 35px;
  }
}
</style>
