
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
        应用打包预览
      </div>
      <div class="app-package-build-basicinfo">
        <div class="title-wrapper">
          <div class="circle-out">
            <div class="circle-in" />
          </div>
          <div class="basicinfo-title title">
            基本信息
          </div>
        </div>
        <div class="content-wrapper">
          <el-row>
            <el-col :span="6">
              <p class="left">
                项目名称
              </p>
              <p>
                {{ basicInfoData.name }}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="left">
                版本
              </p>
              <p>
                {{ basicInfoData.version }}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="left">
                提供者
              </p>
              <p>
                {{ basicInfoData.provider }}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="left">
                行业
              </p>
              <p>
                {{ basicInfoData.industry }}
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <p class="left">
                类型
              </p>
              <p>
                {{ basicInfoData.type }}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="left">
                架构
              </p>
              <p>
                {{ basicInfoData.architecture }}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="left">
                依赖应用
              </p>
              <p>
                {{ basicInfoData.dependent }}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="left">
                创建时间
              </p>
              <p>
                {{ basicInfoData.createTime }}
              </p>
            </el-col>
          </el-row>
          <el-row class="thirdline">
            <el-col :span="6">
              <p class="left">
                描述
              </p>
              <p>
                {{ basicInfoData.description }}
              </p>
            </el-col>
            <el-col :span="6">
              <p class="left">
                应用详情介绍
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
            资源配置
          </div>
        </div>
        <div class="content-wrapper appPackageBuild-content">
          <el-table
            class="common-table"
            :data="resourceConfigInfoList"
          >
            <el-table-column
              prop="vmName"
              label="虚拟机名称"
              min-width="14%"
            />
            <el-table-column
              prop="spec"
              label="规格"
              min-width="18%"
            />
            <el-table-column
              prop="network"
              label="连接网络"
              min-width="18%"
            />
            <el-table-column
              prop="basicImage"
              label="基础镜像"
              min-width="12%"
            />
            <el-table-column
              prop="vmImage"
              label="虚机镜像"
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
            分流规则
          </div>
        </div>
        <div class="content-wrapper appPackageBuild-content">
          <el-tabs>
            <el-tab-pane label="流量规则">
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
            <el-tab-pane label="DNS规则">
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
            能力配置
          </div>
        </div>
        <div class="content-wrapper appPackageBuild-content">
          <div class="depend">
            <h3 class="rules-title title">
              能力依赖
            </h3>
            <div class="dependTable">
              <el-table
                class="common-table"
                :data="capabalityDependsList"
              >
                <el-table-column
                  prop="serName"
                  :label="$t('appPackage.serviceName')"
                  min-width="40%"
                />
                <el-table-column
                  prop="version"
                  :label="$t('appPackage.version')"
                  min-width="60%"
                />
              </el-table>
            </div>
          </div>
          <div class="release">
            <h3 class="rules-title title">
              能力发布
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
      <div class="btn-container appPackageBtn">
        <el-button
          class="common-btn"
          @click="jumpToPreview"
        >
          {{ $t('appPackage.appdPreview') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="packageApp()"
        >
          {{ $t('appPackage.build') }}
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
      basicInfoData: {
        name: 'applicationVM',
        version: 'V1.0',
        provider: 'huawei',
        industry: 'game',
        type: '游戏',
        architecture: 'x86',
        dependent: '无依赖',
        createTime: '2021-11-04:19.46',
        description: '2048游戏',
        fileName: 'gameIntru.docs'
      },
      resourceConfigInfoList: [
        {
          vmId: '',
          vmName: 'VmTest1',
          spec: 'x86 | 1vCPUs | 1GBRAM | 40GB+50GB Disk',
          network: 'MEC_APP_N6, MEC_app_Private,',
          basicImage: 'ubuntu',
          vmImage: '暂无'
        }, {
          vmId: '',
          vmName: 'VmTest1',
          spec: 'x86 | 1vCPUs | 1GBRAM | 40GB+50GB Disk',
          network: 'MEC_APP_Public',
          basicImage: 'ubuntu',
          vmImage: '暂无'
        }
      ],
      trafficRulesInfoList: [
        {
          trafficRuleId: 'rules',
          action: 'FLOW',
          priority: '1',
          filterType: 'DROP'
        }
      ],
      dnsRulesInfoList: [
        {
          dnsRuleId: 'rules',
          domainName: 'domainName',
          ipAddressType: '0.0.0.0',
          ttl: '85000'
        }
      ],
      capabalityDependsList: [
        {
          serName: 'VmServe',
          version: 'V1.0'
        }
      ],
      capabalityReleaseDataList: [
        {
          serviceName: 'oneTest',
          internalPort: '8000',
          version: 'V1.0',
          protocol: 'https',
          description: 'test'
        }
      ],
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
    jumpToPreview () {
      this.$router.push({ path: '/EG/images/appdPreview', query: { packageId: this.packageId } })
    },
    packageApp () {
      this.$eg_messagebox('打包完成', 'success', '', '确认', '认证前系统会默认释放虚拟机资源,释放后再不可再返回修改').then(() => {
        this.$router.push('/EG/developer/home')
      })
      // imageApi.generatePackage(this.applicationId).then(res => {
      //   this.$eg_messagebox('打包完成', 'success', '', '确认', '认证前系统会默认释放虚拟机资源,释放后再不可再返回修改').then(() => {
      //     this.$router.push('/EG/developer/home')
      //   })
      // }).catch(() => {
      //   this.$eg_messagebox('打包失败', 'error')
      // })
    },
    returnHome () {
      sessionStorage.setItem('currentFlow', 4)
      this.$router.push('/EG/developer/home')
    }
  },
  mounted () {
    // this.getAppBaseInfo()
  }
}
</script>

<style lang='less'>
.app-package-build {
  background: transparent;
  height: 90%;
  .app-package-build-warraper::-webkit-scrollbar {
    display: none;
  }
  .app-package-build-warraper {
    width: 85%;
    background: url('../../../assets/images/app_pacakage_build_bg.png') no-repeat center;
    background-size: cover;
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
          display: inline-block;
        }
        .release {
          width: 62%;
          display: inline-block;
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
        // font-size: 20px;
        border-radius: 16px;
        // padding: 17px 45px;
      }
      .el-button + .el-button {
        margin-left: 60px;
      }
    }
  }
}
</style>
