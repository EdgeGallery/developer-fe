
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
    <div class="common-div-bg deploy-config-warraper">
      <h3 class="rules-title">
        部署配置
      </h3>
      <div class="deploy-config-content">
        <el-form
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="MEC Host">
            <el-row class="host">
              <el-col :span="8">
                <p class="left">
                  IP地址：
                </p>
                <p>
                  192.168
                </p>
              </el-col>
              <el-col :span="12">
                <p class="left">
                  状态：
                </p>
                <p>
                  <em
                    class="el-icon-success"
                  />
                  Distributed
                </p>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="应用名称"
            prop="name"
            class="app-name"
          >
            <el-input
              placeholder="名称"
              v-model="deployConfigData.appName"
            />
          </el-form-item>
          <el-form-item
            label="应用描述"
            class="app-description"
            prop="description"
          >
            <el-input
              type="textarea"
              placeholder="描述"
              v-model="deployConfigData.appDescription"
            />
          </el-form-item>
          <el-form-item label="硬件能力">
            <div class="deploy-config-radio">
              <el-radio
                label="GPU"
                v-model="deployConfigData.hardware"
              >
                GPU
              </el-radio>
              <el-radio
                label="CPU"
                v-model="deployConfigData.hardware"
              >
                CPU
              </el-radio>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-container btn_deployConfig">
        <el-button class="common-btn">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          class="common-btn"
          @click="returnHome"
        >
          {{ $t('common.confirm') }}
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
        ip: '',
        status: '',
        appName: '',
        appDescription: '',
        hardware: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入服务名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
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
      sessionStorage.setItem('currentFlow', 7)
      this.$router.push('/EG/developer/home')
    }
  },
  mounted () {}
}
</script>

<style lang='less'>
.deploy-config {
  background: transparent;
  height: 85%;
  .deploy-config-warraper {
    width: 41%;
    background-size: cover;
    border-radius: 16px;
    margin: 120px auto;
    padding: 40px 40px 40px 40px;
    background: url('../../assets/images/mecm/deploy_config/deploy_config_bg.png') center;
    .btn_deployConfig {
      margin: 60px 0px 0 0;
      .el-button {
        color: #5944C0;
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
    }
    .rules-title:before {
      margin-right: 7px;
      background-color: #76E1E9;
    }
    .deploy-config-content {
      margin-left: 23px;
      .host {
        margin:45px 0 0 40px;
        font-size: 16px;
        p {
          display: inline-block;
        }
        .el-icon-success {
          color: #3AC372;
          font-size: 14px;
        }
      }
      .el-input {
        width: 80%;
        background-color: transparent;
        margin-left: 23px;
        border-radius: 4px;
        height: 25px;
        vertical-align: middle;
        .el-input__inner {
          height: 25px;
          background-color: rgba(255, 255, 255, 0.3);
          border: 0px;
          color: #E2E2E2;
        }
      }
      .app-name {
        margin-bottom: 25px;
        .el-form-item__label {
          height: 30px;
        }
        .el-form-item__error {
          margin: 0 0 0 115px;
          padding-top: 5px;
        }
      }
      .app-description {
        margin-bottom: 40px;
        .el-form-item__error {
          margin: 10px 0 0 115px;
          padding-top: 0px;
        }
      }
      .el-textarea {
        width: 80%;
        background-color: transparent;
        margin-left: 23px;
        border-radius: 4px;
        height: 76px;
        .el-textarea__inner {
          height: 76px;
          background-color: rgba(255, 255, 255, 0.3);
          border: 0px;
          color: #E2E2E2;
        }
      }
      .deploy-config-radio {
        margin-left: 10px;
        .el-radio__input.is-checked + .el-radio__label {
          color: #FFFFFF;
        }
        .el-radio {
          color: #FFFFFF;
          margin-left: 35px;
          vertical-align: bottom;
          .el-radio__inner {
            height: 14px;
            width: 14px;
            border-color: rgba(255, 255, 255, 0.3);
            background: transparent;
          }
          .el-radio__inner:before {
            content: "";
            display: block;
            position: relative;
            width: 8px;
            height: 8px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: 2px;
            top: 2px;
            z-index: 10;
          }
          .el-radio__inner:after {
            content: "";
            display: block;
            position: relative;
            width: 8px;
            height: 8px;
            background-color: #7ED4A9;
            border-radius: 50%;
            left: 6px;
            top: -2px;
            z-index: 10;
          }
        }
      }
    }
  }
}
</style>
