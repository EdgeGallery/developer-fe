
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
            5G边缘应用孵化流水线
          </div>
          <div class="main-part">
            <el-row class="main-part-container">
              <el-col :span="12">
                <div class="main-creation main-part-item">
                  <div class="main-part-item-container">
                    <IncubationComp
                      @showCapabilityCenterDlg="isShowCapabilityIndexDlg=true"
                      @showAppWarningDlg="isShowAppWarningDlg=true"
                    />
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="main-app-store main-part-item">
                  <div class="main-part-item-container">
                    <AppstoreComp />
                  </div>
                </div>
              </el-col>
              <el-col :span="9">
                <div class="main-deploy main-part-item">
                  <div class="main-part-item-container">
                    <DeploymentComp />
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="main-flow-direction">
            <div class="lt">
              <p>
                行动方向
              </p>
              <img
                src="../../assets/images/projects/pro_direction.png"
                alt=""
              >
            </div>
            <div class="rt label-content">
              <div class="current-app-label">
                当前应用位置
              </div>
              <div class="must-node-label">
                必经节点
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import IncubationComp from './application/workflow/Incubation.vue'
import AppstoreComp from './application/workflow/Appstore.vue'
import DeploymentComp from './application/workflow/Deployment.vue'
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
      isShowProjectDlg: false,
      isShowCapabilityIndexDlg: false,
      isShowCapabilityDlg: false,
      isShowAppWarningDlg: false
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .application{
    width: 100%;
    height: 100%;
    .left-pro-comp{
      width: 100%;
      height: 95%;
      position: relative;
      border: 2px solid #838ACB;
      border-left: none;
      border-radius: 0 17px 17px 0;
      z-index: 15;
      overflow: hidden;
    }
    .left-pro-comp-show{
      min-width: 150px!important;
    }
    .left-pro-comp::after {
      content: "";
      background: url("../../assets/images/index/index_mask.png") no-repeat center;
      background-size: cover;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
    .main-content{
      height: 840px;
      width: 1680px;
      margin: 0 auto;
      padding: 90px 50px 50px 50px;
      .main-title{
        font-size: 25px;
        font-weight: bold;
        opacity: 0.8;
      }
      .main-part{
        height: 85%;
        margin-top: 30px;
        .main-part-container{
          background: url("../../assets/images/application/app_workflow_bg.png") no-repeat;
          background-size: inherit;
        }
        .main-part-item{
          height: 100%;
          border-radius: 17px;
          margin-right: 30px;
          background-size: cover;
          text-align: right;
          padding: 25px 20px;
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
      .main-flow-direction{
        position: relative;
        top: -110px;
        p{
          font-size: 14px;
          padding-top: 20px;
          line-height: 30px;
        }
        .label-content{
          margin-right: 200px;
          font-size: 14px;
          .current-app-label{
            margin-top: 15px;
          }
          .current-app-label::before{
            content:"";
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url("../../assets/images/application/app_mark_box.png") no-repeat center;
            background-size: contain;
            position: relative;
            top: 5px;
          }
          .must-node-label{
            margin-top: 5px;
          }
          .must-node-label::before{
            content:"";
            display: inline-block;
            width: 20px;
            height: 15px;
            background: url("../../assets/images/application/app_corner_icon.png") no-repeat center;
            background-size: contain;
            position: relative;
            top: 3px;
          }
        }
      }
    }
  }
</style>
