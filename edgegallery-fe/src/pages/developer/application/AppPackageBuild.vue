
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
                {{ basicInfoData.platform }}
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
                {{ basicInfoData.createDate }}
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
            <el-col :span="18">
              <p class="left">
                应用详情介绍
              </p>
              <el-button class="app-build-upload">
                上传文件
              </el-button>
              <p class="tip">
                （请上传md文件按格式的文件）
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
        <div class="content-wrapper content">
          <el-table
            class="common-table"
            :data="resourceConfigInfoList"
          >
            <el-table-column
              prop="vimName"
              label="虚拟机名称"
              min-width="14%"
            />
            <el-table-column
              prop="spec"
              label="规格"
              min-width="14%"
            />
            <el-table-column
              prop="net"
              label="连接网络"
              min-width="14%"
            />
            <el-table-column
              prop="basicImage"
              label="基础镜像"
              min-width="14%"
            />
            <el-table-column
              prop="status"
              label="状态"
              min-width="11%"
            />
            <el-table-column
              prop="vimImage"
              label="虚机镜像"
              min-width="35%"
            >
              <template>
                <div>vimImage</div>
                <div class="progress-bar">
                  <el-progress
                    :percentage="100"
                    stroke-width="5"
                    status="success"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operation')"
              min-width="18%"
            >
              <template>
                <el-button
                  class="operation-btn"
                >
                  导出镜像
                </el-button>
              </template>
            </el-table-column>
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
        <div class="content-wrapper content">
          <el-tabs>
            <el-tab-pane label="流量规则">
              <el-button
                class="ruleBtn"
                @click="openDialog('trafficRule')"
              >
                {{ $t('appPackage.addTrafficRule') }}
              </el-button>
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
                  <el-table-column
                    :label="$t('common.operation')"
                    min-width="20%"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="medium"
                        class="editBtn"
                        @click="checkFilter(scope.row)"
                      >
                        查看详情
                      </el-button>
                      <el-button
                        size="medium"
                        type="text"
                        class="editBtn"
                        @click="editTrafficRule(scope.$index, scope.row)"
                      >
                        {{ $t('common.edit') }}
                      </el-button>
                      <el-button
                        size="medium"
                        type="text"
                        class="deleteBtn"
                        @click="deleteTrafficData(scope.$index)"
                      >
                        {{ $t('common.delete') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="DNS规则">
              <el-button
                class="ruleBtn"
                @click="openDialog('dnsRule')"
              >
                {{ $t('appPackage.addDnsRule') }}
              </el-button>
              <div class="ruleTable">
                <el-table
                  class="common-table"
                  :data="dnsRulesInfoList"
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
                  <el-table-column
                    :label="$t('common.operation')"
                    min-width="20%"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="medium"
                        class="editBtn"
                        @click="checkFilter(scope.row)"
                      >
                        查看详情
                      </el-button>
                      <el-button
                        size="medium"
                        type="text"
                        class="editBtn"
                        @click="editTrafficRule(scope.$index, scope.row)"
                      >
                        {{ $t('common.edit') }}
                      </el-button>
                      <el-button
                        size="medium"
                        type="text"
                        class="deleteBtn"
                        @click="deleteTrafficData(scope.$index)"
                      >
                        {{ $t('common.delete') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="黑白名单">
              黑白名单
            </el-tab-pane>
            <el-tab-pane label="UE标识">
              UE标识
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
        <div class="content-wrapper content">
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
                  prop="serviceName"
                  :label="$t('appPackage.serviceName')"
                  min-width="40%"
                />
                <el-table-column
                  prop="description"
                  :label="$t('appPackage.description')"
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
                  prop="port"
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
                  prop="dnaRule"
                  :label="$t('appPackage.dnaRule')"
                  min-width="28%"
                />
                <el-table-column
                  prop="trafficRule"
                  :label="$t('appPackage.trafficRule')"
                  min-width="28%"
                />
                <el-table-column
                  :label="$t('common.operation')"
                  min-width="28%"
                />
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-container appPackageBtn">
        <el-button class="common-btn">
          {{ $t('appPackage.appdPreview') }}
        </el-button>
        <el-button class="common-btn">
          {{ $t('appPackage.build') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPackageBuild',
  components: {
  },
  data () {
    return {
      basicInfoData: {
        name: 'test',
        version: 'v1',
        provider: 'Huawei',
        industry: '智慧园区',
        type: '视频应用',
        platform: 'x86',
        createDate: '2021-10-29 12:34',
        dependent: '无依赖',
        description: 'test'
      },
      resourceConfigInfoList: [
        {
          vimName: 'Unicom_ar',
          spec: '4C',
          net: 'networkn6',
          basicImage: 'ubuntu1804',
          status: '已部署',
          vimImage: 'Unicom_ar_ubuntu'
        },
        {
          vimName: 'Unicom_ar',
          spec: '4C',
          net: 'networkn6',
          basicImage: 'ubuntu1804',
          status: '已部署',
          vimImage: 'Unicom_ar_ubuntu'
        }
      ],
      trafficRulesInfoList: [
        {
          action: 'PASSTHROUGH',
          filterType: 'FLOW',
          priority: '1',
          trafficRuleId: 'tr1'
        }
      ],
      dnsRulesInfoList: [
        {
          action: 'PASSTHROUGH',
          filterType: 'FLOW',
          priority: '1',
          trafficRuleId: 'tr1'
        }
      ],
      capabalityDependsList: [
        {
          serviceName: '5g位置服务',
          description: '5g位置服务'
        }
      ],
      capabalityReleaseDataList: [
        {
          serviceName: '服务名称',
          port: '内部端口号',
          version: '版本',
          protocol: '协议',
          dnaRule: 'DNA规则'
        }
      ]
    }
  },
  methods: {
  },
  mounted () {}
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
    width: 75%;
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
      .content {
        margin-top: 20px;
        .operation-btn {
          border-radius: 12px;
          color: #5944C0;
          padding: 3px 16px 2px;
        }
        .el-table__cell {
          text-align: left;
          padding-left: 30px !important;
        }
        .el-table__row {
          height: 101px;
          .el-table__cell {
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          }
        }
        .progress-bar {
          margin-top: 13px;
          width: 100%;
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
      .content {
        margin-top: 10px;
        .el-tabs__item {
          color: #FFFFFF;
        }
        .ruleBtn {
          border-radius: 12px;
          color: #5944C0;
          padding: 3px 18px 2px;
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
      .content {
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
