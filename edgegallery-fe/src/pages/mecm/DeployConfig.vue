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
  <div class="deploy-config">
    <div class="card-shadow">
      <el-card>
        <h3 class="rules-title">
          {{ $t("deployConfig.title") }}
        </h3>
        <div class="deploy-config-content">
          <el-form
            :model="deployConfigData"
            :rules="rules"
            :class="language"
            label-position="left"
            ref="deployConfigData"
          >
            <div class="deploy-config__title">
              MEC Host
            </div>
            <div class="deploy-config__basic-info">
              <div class="deploy-config__item">
                <div
                  v-for="(item, index) in hostList"
                  :key="index"
                >
                  <p class="deploy-config__label">
                    {{ $t("deployConfig.IPAddress") }}
                  </p>
                  <p class="deploy-config__value">
                    {{ item.hostIp }}
                  </p>
                  <div class="deploy-config__item">
                    <p class="deploy-config__label">
                      {{ $t("deployConfig.status") }}
                    </p>
                    <p
                      class="deploy-config__value"
                      v-if="
                        item.status === 'Distributed' ||
                          item.status === 'uploaded'
                      "
                    >
                      <em class="el-icon-success" />
                      {{ item.status }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <el-form-item
              :label="$t('deployConfig.appName')"
              prop="appName"
            >
              <el-input
                :placeholder="$t('deployConfig.placeholderName')"
                v-model="deployConfigData.appName"
              />
            </el-form-item>
            <el-form-item
              :label="$t('deployConfig.appDesc')"
              prop="appDesc"
            >
              <el-input
                type="textarea"
                :placeholder="$t('deployConfig.placeholderDesc')"
                v-model="deployConfigData.appDesc"
              />
            </el-form-item>
            <el-form-item
              :label="$t('deployConfig.hardwareAbilities')"
              prop="hardwareAbilities"
            >
              <el-checkbox-group v-model="deployConfigData.hardwareAbilities">
                <el-checkbox
                  class="deploy-config-checkbox"
                  v-for="item in capabilities"
                  :label="item"
                  :key="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div
              class="deploy-config__title"
              v-if="templateInputs.length > 0"
            >
              Apptemplate Information
            </div>
            <el-row>
              <el-col
                :span="12"
                v-for="(item, index) in templateInputs"
                :key="index"
              >
                <el-form-item
                  :label="item.label"
                  class="apptemplate-information"
                >
                  <el-input
                    id="podsel"
                    maxlength="30"
                    v-model="item.value"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div
          class="btn-container btn_deployConfig"
          element-loading-background="rgba(255, 255, 255, 0.7)"
        >
          <el-button
            class="common-btn"
            @click="cancel()"
          >
            {{ $t("common.cancel") }}
          </el-button>
          <el-button
            class="common-btn"
            @click="configButtonHandler('deployConfigData')"
          >
            {{ $t("common.confirm") }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { apm, appo } from '../../api/mecmApi'

export default {
  name: 'DeployConfig',
  components: {},
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      appId: sessionStorage.getItem('appId'),
      appPackageId: sessionStorage.getItem('appPackageId'),
      deployConfigData: {
        status: '',
        appId: '',
        appPackageId: '',
        appName: '',
        appDesc: '',
        hardwareAbilities: []
      },
      templateInputs: [],
      capabilities: ['GPU', 'CPU'],
      language: localStorage.getItem('language'),
      AppDeployInfo: {},
      hostList: []
    }
  },
  methods: {
    getAppTemplate (selectData, deployType) {
      apm
        .getAppTemplateApi(this.userId, this.appPackageId)
        .then((res) => {
          this.templateInputs = []
          if (res.data.deployType !== 'container') {
            this.templateInputs = this.parseTemplateData(res.data.inputs)
          }
          this.resetDeployConfigData()
          this.deployConfigData.appId = this.appId
          this.deployConfigData.appPackageId = this.appPackageId
          this.hostList = []
          if (deployType === '2') {
            let _array = []
            selectData.forEach((item) => {
              _array.push(item.hostIp)
            })
            this.deployConfigData.mecHost = _array
            this.hostList = selectData
          } else {
            this.deployConfigData.mecHost = selectData.hostIp
            this.hostList.push(selectData)
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('deployConfig.getTemplateListFail'),
            duration: 2000
          })
        })
    },
    parseTemplateData (inputs) {
      let _templateDataList = []
      inputs.forEach((item) => {
        let _templateDataItem = {
          label: '',
          value: ''
        }
        _templateDataItem.label = item.name
        _templateDataItem.value = item.defaultValue
        _templateDataList.push(_templateDataItem)
      })
      return _templateDataList
    },
    resetDeployConfigData () {
      this.deployConfigData = {
        status: '',
        appId: '',
        appPackageId: '',
        appName: '',
        appDesc: '',
        hardwareAbilities: []
      }
    },
    cancel () {
      this.$router.push('/EG/mecm/distributeDeploy')
    },
    configButtonHandler (deployConfigData) {
      this.$refs[deployConfigData].validate((valid) => {
        if (valid) {
          let _params = {
            appId: this.appId,
            appPackageId: this.appPackageId,
            appName: this.deployConfigData.appName,
            appInstanceDescription: this.deployConfigData.appDesc,
            mecHost: this.deployConfigData.mecHost,
            hwCapabilities: this.deployConfigData.hardwareAbilities
          }
          if (typeof _params.mecHost === 'string') {
            appo
              .toDeploy(this.userId, _params)
              .then((res) => {
                let _instanceId = res.data.response.app_instance_id
                let _timer = setTimeout(() => {
                  clearTimeout(_timer)
                  this.queryInstanceStatus(_instanceId)
                }, 1000)
              })
              .catch(() => {
                this.$eg_messagebox(this.$t('deployConfig.deployFailed'), 'info')
              })
          } else {
            appo
              .toBatchDeploy(_params)
              .then((res) => {
                let instanceIds = res.data.response
                let len = instanceIds.length
                this.timer = setTimeout(() => {
                  this.batchInstaniateApp(instanceIds)
                }, 6000 * len)
              })
              .catch(() => {
                this.$eg_messagebox(this.$t('deployConfig.deployFailed'), 'info')
              })
          }
        }
      })
    },
    instaniateApp (instanceId) {
      if (this.templateInputs.length > 0) {
        let _params = {
          parameters: {}
        }
        this.templateInputs.forEach((item) => {
          let _key = item.label
          _params.parameters[_key] = item.value
        })
        appo
          .instantiateApp(this.userId, instanceId, _params)
          .then((response) => {
            this.afterInstantiateApp()
          })
          .catch(() => {
            this.$eg_messagebox(this.$t('deployConfig.deployFailed'), 'info')
          })
      } else {
        appo
          .instantiateApp(this.userId, instanceId)
          .then((response) => {
            this.afterInstantiateApp()
          })
          .catch(() => {
            this.$eg_messagebox(this.$t('deployConfig.deployFailed'), 'info')
          })
      }
    },
    batchInstaniateApp (instanceIds) {
      let _obj = {
        instantiationParameters: []
      }
      instanceIds.forEach((item) => {
        let _paramObj = {
          parameters: {}
        }
        _paramObj.appInstanceId = item.appInstanceId
        this.templateInputs.forEach((val) => {
          let _key = val.label
          _paramObj.parameters[_key] = val.value
        })
        _obj.instantiationParameters.push(_paramObj)
      })
      appo
        .batchInstantiateApp(this.userId, _obj)
        .then((response) => {
          this.afterInstantiateApp()
        })
        .catch(() => {
          this.$eg_messagebox(this.$t('deployConfig.deployFailed'), 'info')
        })
    },
    afterInstantiateApp () {
      this.$nextTick(() => {
        this.$router.push('/EG/mecm/distributeFinish')
      })
    },
    queryInstanceStatus (instanceIds) {
      appo
        .getInstanceInfo(this.userId, instanceIds)
        .then((res) => {
          let _status = res.data.response.operationalStatus
          if (_status === 'Created') {
            this.instaniateApp(instanceIds)
            this.$router.push('/EG/developer/home')
          } else if (_status === 'Create failed') {
            this.$message.error(res.data.response.operationInfo)
            this.loading = false
          } else {
            let _timer = setTimeout(() => {
              clearTimeout(_timer)
              this.queryInstanceStatus(instanceIds)
            }, 1000)
          }
        })
        .catch((err) => {
          if (
            err.name === 'Error' &&
            err.message === 'Request failed with status code 404'
          ) {
            let _timer = setTimeout(() => {
              clearTimeout(_timer)
              this.queryInstanceStatus(instanceIds)
            }, 1000)
          } else {
            throw err
          }
        })
    }
  },
  computed: {
    rules () {
      return {
        appName: [
          {
            required: true,
            message: this.$t('deployConfig.appNameVerifyRequired'),
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9]{4,16}$/,
            message: this.$t('deployConfig.appNameVerifyValid')
          }
        ],
        appDesc: [
          {
            required: true,
            message: this.$t('deployConfig.appDescVerifyRequired'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.AppDeployInfo = JSON.parse(sessionStorage.getItem('appDeployInfo'))
    this.getAppTemplate(
      this.AppDeployInfo.selectData,
      this.AppDeployInfo.deployType
    )
  }
}
</script>

<style lang="less">
.deploy-config {
  background: transparent;
  width: 65%;
  min-height: 85%;
  max-height: 720px;
  margin: 2% auto;
  .card-shadow {
    padding: 0px 0 1px 2px;
    border-radius: 17px;
    .el-card {
      border: 1px solid transparent !important;
      border-radius: 16px;
      background: rgba(46,20,124,.7);
      backdrop-filter: blur(6px);
      max-height: 710px;
      overflow-y: auto;
      .common-dlg-title:before {
        right: 5px;
      }
      .el-card__body {
        padding: 40px 40px 40px 40px;
        color: #ffffff;
      }
      .btn_deployConfig {
        padding: 20px;
        .el-button {
          color: #5944c0;
          font-size: 14px;
          border-radius: 12px;
          padding: 4px 28px;
        }
        .el-button:hover {
          color: #ffffff;
        }
        .el-button + .el-button {
          margin-left: 20px;
        }
      }
      .rules-title {
        font-size: 18px;
        margin-bottom: 15px;
      }
      .rules-title:before {
        margin-right: 7px;
        background-color: #76e1e9;
      }
      .deploy-config-content {
        margin-left: 25px;
        .deploy-config__title {
          font-size: 16px;
          font-family: defaultFont, Arial, Helvetica, sans-serif;
          margin-bottom: 20px;
        }
        .deploy-config__item {
          display: inline-block;
          padding-left: 40px;
          padding-bottom: 20px;
          font-size: 16px;
          font-family: defaultFont, Arial, Helvetica, sans-serif;
        }
        .deploy-config__item:first-child {
          padding-left: 38px;
        }
        .deploy-config__label {
          display: inline-block;
        }
        .deploy-config__value {
          display: inline-block;
          padding-left: 5px;
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          .el-icon-success {
            color: #3ac372;
            font-size: 16px;
          }
        }
        .cn .el-form-item__label {
          width: 89px;
        }
        .en .el-form-item__label {
          width: 149px;
        }
        .apptemplate-information .el-form-item__label {
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          width: 170px;
        }
        .cn .apptemplate-information .el-input {
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          width: calc(100% - 210px);
        }
        .en .apptemplate-information .el-input {
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          width: calc(100% - 210px);
        }
        .el-input {
          background-color: transparent;
          margin-left: 23px;
          border-radius: 4px;
          height: 25px;
          vertical-align: middle;
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          .el-input__inner {
            height: 25px;
            background-color: rgba(255, 255, 255, 0.3);
            border: 0px;
            color: #C9BDF3;
          }
        }
        .is-error .el-input__inner {
          border: solid 1px #f56c6c;
        }
        .cn .el-input {
          width: calc(100% - 140px);
        }
        .en .el-input {
          width: calc(100% - 210px);
        }
        .el-textarea {
          background-color: transparent;
          margin-left: 23px;
          margin-bottom: 8px;
          border-radius: 4px;
          min-height: 76px;
          .el-textarea__inner {
            height: 76px;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            background-color: rgba(255, 255, 255, 0.3);
            border: 0px;
            color: #C9BDF3;
          }
        }
        .is-error .el-textarea__inner {
          border: solid 1px #f56c6c;
        }
        .cn .el-textarea {
          width: calc(100% - 140px);
        }
        .en .el-textarea {
          width: calc(100% - 210px);
        }
        .cn .el-form-item__error {
          padding-left: 110px;
          padding-top: 0;
        }
        .en .el-form-item__error {
          padding-left: 172px;
          padding-top: 0;
        }
        .deploy-config-checkbox {
          margin-left: 23px;
          line-height: 40px;
          color: #ffffff;
          font-family: defaultFontLight, Arial, Helvetica, sans-serif;
          font-size: 14px;
          .el-checkbox__inner {
            width: 14px;
            height: 14px;
            border: solid 1px rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            background-color: transparent;
          }
          .is-checked .el-checkbox__inner {
            width: 14px;
            height: 14px;
            border: solid 1px #ffffff;
            border-radius: 50%;
          }
          .el-checkbox__inner::after {
            content: "";
            display: block;
            position: relative;
            left: 2px;
            top: 2px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background-color: rgba(255, 255, 255, 0.3);
            transform: none;
          }
          .is-checked .el-checkbox__inner::after {
            content: "";
            display: block;
            position: relative;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background-color: #7ed4a9;
            transform: none;
          }
          .el-checkbox__label {
            color: #ffffff;
          }
        }
      }
    }
  }
}
.el-col-12{
  padding-right: 15px;
}
</style>
