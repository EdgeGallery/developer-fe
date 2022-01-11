
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
  <div class="application">
    <el-row>
      <el-col
        :span="24"
      >
        <div class="main-content">
          <div class="main-title">
            {{ appName==='5G'?$t('incubation.appWorkflow') : appName }}
          </div>
          <div class="main-part">
            <el-row class="main-part-container">
              <el-col :span="18">
                <div class="main-creation main-part-item">
                  <div class="main-part-item-container">
                    <IncubationComp
                      @showCapabilityCenterDlg="isShowCapabilityIndexDlg=true"
                      @showAppWarningDlg="isShowAppWarningDlg=true"
                      :current-flow="currentFlow"
                    />
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="main-app-store main-part-item">
                  <div class="main-part-item-container">
                    <AppstoreComp
                      :current-flow="currentFlow"
                    />
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="main-deploy main-part-item">
                  <div class="main-part-item-container">
                    <DeploymentComp
                      :current-flow="currentFlow"
                    />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="direct-mark">
            <div class="done mark-item">
              {{ $t('incubation.done') }}
            </div>
            <div class="current mark-item">
              {{ $t('incubation.current') }}
            </div>
            <div class="not-operated mark-item">
              {{ $t('incubation.notOperated') }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import IncubationComp from './workflow/Incubation.vue'
import AppstoreComp from './workflow/Appstore.vue'
import DeploymentComp from './workflow/Deployment.vue'
export default {
  name: 'Application',
  components: {
    IncubationComp,
    AppstoreComp,
    DeploymentComp
  },
  data () {
    return {
      zoom: 2,
      isShowCapabilityIndexDlg: false,
      isShowAppWarningDlg: false,
      language: localStorage.getItem('language')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  computed: {
    currentFlow () {
      return Number(this.$store.state.currentFlow)
    },
    appName (val) {
      return this.$store.state.appName
    }
  },
  mounted () {
    this.$store.commit('changeZoom', '2')
  }
}
</script>

<style lang="less" scoped>
  .application{
    min-width: 1480px;
    overflow: auto;
    height: 100%;
    .main-content{
      width: 1680px;
      margin: 0 auto;
      padding: 45px 50px 0 50px;
      .main-title{
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      .main-part{
        .main-part-container{
          background: url("../../assets/images/application/app_workflow_bg.png") no-repeat;
          background-size: contain;
        }
        .main-part-item{
          border-radius: 17px;
          margin-right: 30px;
          background-size: cover;
          text-align: right;
          .main-part-item-container{
            height: 100%;
            clear: both;
          }
          .label-cn{
            font-size: 20px;
          }
          .label-en{
            font-size: 20px;
            font-weight: bold;
            opacity: 0.7;
          }
        }
      }
    }
    .direct-mark{
      height: 45px;
      line-height: 45px;
      float: right;
      display: flex;
      justify-content: right;
      position: relative;
      top: -65px;
      .mark-item{
        margin-left: 10px;
      }
      .done::before{
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        background: #4A9893;
        position: relative;
        top: 2px;
      }
      .current::before{
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        background: #f2b720;
        position: relative;
        top: 2px;
      }
      .not-operated::before{
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        background: #331A86;
        position: relative;
        top: 2px;
      }
    }
  }
</style>
