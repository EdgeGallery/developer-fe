
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
    <div class="common-div-bg deploy-config-wrapper">
      <h3 class="rules-title">{{ $t("deployConfig.title") }}</h3>
      <div class="deploy-config-content">
        <el-form
          :model="deployConfigData"
          :rules="rules"
          :class="language"
          label-position="left"
          ref="deployConfigData"
        >
          <div class="deploy-config__title">MEC Host</div>
          <div class="deploy-config__basic-info">
            <div class="deploy-config__item">
              <p class="deploy-config__label">
                {{ $t("deployConfig.IPAddress") }}
              </p>
              <p class="deploy-config__value">
                {{ deployConfigData.ipAddress }}
              </p>
            </div>
            <div class="deploy-config__item">
              <p class="deploy-config__label">
                {{ $t("deployConfig.status") }}
              </p>
              <p class="deploy-config__value">
                <em class="el-icon-success" />
                {{ deployConfigData.status }}
              </p>
            </div>
          </div>
          <el-form-item :label="$t('deployConfig.appName')" prop="appName">
            <el-input
              :placeholder="$t('deployConfig.placeholderName')"
              v-model="deployConfigData.appName"
            />
          </el-form-item>
          <el-form-item :label="$t('deployConfig.appDesc')" prop="appDesc">
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
        </el-form>
      </div>
      <div class="btn-container btn_deployConfig">
        <el-button class="common-btn">
          {{ $t("common.cancel") }}
        </el-button>
        <el-button class="common-btn" @click="returnHome">
          {{ $t("common.confirm") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeployConfig',
  components: {
  },
  data () {
    return {
      deployConfigData: {
        ipAddress: '192.168.0.1',
        status: 'TEST',
        appPackageID: '',
        appName: '',
        appDesc: '',
        hardwareAbilities: []
      },
      capabilities: ['GPU', 'CPU'],
      language: localStorage.getItem('language')
    }
  },
  methods: {
    returnHome () {
      this.$message({
        showClose: true,
        duration: 2000,
        message: '部署成功',
        type: 'success'
      })
      this.$store.commit('changeFlow', 9)
      this.$router.push('/EG/developer/home')
    }
  },
  computed: {
    rules () {
      return {
        appName: [
          { required: true, message: this.$t('deployConfig.appNameVerifyRequired'), trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{4,16}$/, message: this.$t('deployConfig.appNameVerifyValid') }
        ],
        appDesc: [
          { required: true, message: this.$t('deployConfig.appDescVerifyRequired'), trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () { }
}
</script>

<style lang='less'>
.deploy-config {
  background: transparent;
  min-height: 85%;
  .deploy-config-wrapper {
    width: 41%;
    background-size: cover;
    border-radius: 16px;
    margin: 120px auto;
    padding: 40px 40px 40px 40px;
    background: url("../../assets/images/mecm/deploy_config/deploy_config_bg.png")
      center;
    .btn_deployConfig {
      margin: 60px 0px 0 0;
      .el-button {
        color: #5944c0;
        font-size: 14px;
        border-radius: 12px;
        padding: 4px 28px;
      }
      .el-button + .el-button {
        margin-left: 20px;
      }
    }
    .rules-title {
      margin-bottom: 15px;
      font-family: defaultFont, Arial, Helvetica, sans-serif;
    }
    .rules-title:before {
      margin-right: 7px;
      background-color: #5944c0;
    }
    .deploy-config-content {
      margin-left: 17px;
      .deploy-config__title {
        font-size: 16px;
        font-family: defaultFont, Arial, Helvetica, sans-serif;
      }
      .deploy-config__item {
        display: inline-block;
        padding: 20px 0 20px 40px;
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
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        width: 89px;
      }
      .en .el-form-item__label {
        font-family: defaultFontLight, Arial, Helvetica, sans-serif;
        width: 149px;
      }
      .el-input {
        background-color: transparent;
        margin-left: 23px;
        border-radius: 4px;
        height: 25px;
        vertical-align: middle;
        .el-input__inner {
          height: 25px;
          background-color: rgba(255, 255, 255, 0.3);
          border: 0px;
          color: #e2e2e2;
        }
      }
      .cn .el-input {
        width: calc(100% - 150px);
      }
      .en .el-input {
        width: calc(100% - 220px);
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
          color: #e2e2e2;
        }
      }
      .cn .el-textarea {
        width: calc(100% - 150px);
      }
      .en .el-textarea {
        width: calc(100% - 220px);
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
        }
        .is-checked .el-checkbox__inner {
          width: 14px;
          height: 14px;
          border: solid 1px #ffffff;
          border-radius: 50%;
        }
        .el-checkbox__inner {
          background-color: transparent;
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
</style>
