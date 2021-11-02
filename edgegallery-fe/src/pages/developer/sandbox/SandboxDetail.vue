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
  <div class="detail">
    <div v-if="showContent==='showDetail'">
      <div class="detail-top clear">
        <div class="detail-top-title lt">
          {{ detailTitle }}
        </div>
        <img
          src="../../../assets/images/sandbox/question.png"
          alt=""
          class="question hoverHands"
        >
      </div>
      <div
        class="detail-center"
        :class="{'deploy-detail-center':isChangeStyle===false}"
      >
        <div
          class="detail-center-bg flex-center"
          v-if="isChangeStyle"
        >
          <img
            src="../../../assets/images/sandbox/mec_img.png"
            alt=""
            class="detail-center-img"
          >
          <p
            class="detail-center-title  hoverHands"
            @click="deployInternet"
          >
            边缘应用
          </p>
        </div>
        <div
          v-else
          class="deploy-detail-bg"
        >
          <div class="details-top">
            <p class="deploy-detail-circle" />
            <p class="deploy-detail-title">
              大亚湾项目
            </p>
          </div>
          <div class="details-center">
            <div class="details-center-deploy">
              <div class="details-center-deploy-img">
                <div
                  class="lt deploy-img flex-center"
                >
                  <img
                    class="deploy-img-center"
                    :class="{'deploy-img-center-finish':configNetworkFinish===true}"
                    src="../../../assets/images/sandbox/deploy_img.png"
                    alt=""
                  >
                  <el-tooltip
                    class="item edit-tooltip"
                    effect="light"
                    content="编辑"
                    placement="bottom-start"
                  >
                    <img
                      src="../../../assets/images/sandbox/edit.png"
                      alt=""
                      class="hoverHands deploy-edit"
                      @click="selectNet"
                    >
                  </el-tooltip>
                </div>
              </div>
              <div class="deploy-title">
                配置网络
              </div>
            </div>
            <ul
              class="netLine"
              v-if="!isAddVmFinish"
            >
              <li
                class="oneNet"
                v-for="(item,index) in netNum"
                :key="index"
              />
            </ul>
            <NetScroll
              v-else
              class="netLine-list"
            />
            <div class="details-center-vm">
              <div
                class="flex-center details-center-vm-img"
              >
                <img
                  class="vm-center-img"
                  :class="{'vm-center-img-finish':isAddVmFinish === true}"
                  src="../../../assets/images/sandbox/vm_img.png"
                  alt=""
                >
                <div class="vm-bg">
                  <div class="vm-btn flex-center vm-btn-add">
                    <el-tooltip
                      class="item edit-tooltip"
                      effect="light"
                      content="添加"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/vm-add.png"
                        alt=""
                        class=" hoverHands"
                        @click="addVm"
                      >
                    </el-tooltip>
                  </div>
                  <div
                    class="vm-btn flex-center vm-btn-detail"
                  >
                    <el-tooltip
                      class="item edit-tooltip"
                      effect="light"
                      content="详情"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/vm-detail.png"
                        alt=""
                        class=" hoverHands"
                        :class="isAddVmFinish === false ? 'img-onlyRead':''"
                        @click="checkVmDetail"
                      >
                    </el-tooltip>
                  </div>
                  <div class="vm-btn flex-center">
                    <el-tooltip
                      class="item edit-tooltip"
                      effect="light"
                      content="登录"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/vm-login.png"
                        alt=""
                        class=" hoverHands"
                        :class="isStartupVmFinish === false ? 'img-onlyRead':''"
                      >
                    </el-tooltip>
                  </div>
                  <div class="vm-btn flex-center">
                    <el-tooltip
                      class="item edit-tooltip"
                      effect="light"
                      content="上传"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/vm-upload.png"
                        alt=""
                        class=" hoverHands"
                        :class="isStartupVmFinish === false ? 'img-onlyRead':''"
                      >
                    </el-tooltip>
                  </div>
                  <div class="vm-btn-start vm-btn flex-center">
                    <el-tooltip
                      class="item edit-tooltip"
                      effect="light"
                      content="启动"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/vm-start.png"
                        alt=""
                        class=" hoverHands"
                        :class="isBtnStart === false ? 'img-onlyRead':''"
                        @click="startUpVm"
                      >
                    </el-tooltip>
                  </div>
                </div>
                <div
                  class="vmStatus"
                  v-if="isStartupVm"
                  :class="{'vmStatus':isAddVmFinish === false}"
                >
                  <div class="bounce1" />
                  <div class="bounce2" />
                  <div class="bounce3" />
                  <div class="bounce4" />
                </div>
              </div>
              <p class="deploy-title">
                虚拟机
              </p>
            </div>
          </div>
          <div class="details-bottom">
            <p class="details-bottom-title lt">
              5G MEC
            </p>
            <el-button
              class="common-btn rt"
              :disabled="!this.isStartupVmFinish"
            >
              {{ $t('common.finish') }}
            </el-button>
          </div>
        </div>
        <div
          class="detail-center-name"
          :class="{'hide-div':isChangeStyle===false}"
        >
          5G MEC
        </div>
        <img
          src="../../../assets/images/sandbox/failed_line.png"
          alt=""
          class="detail-center-line"
          :class="{'scale-small-line':isChangeStyle===false}"
        >
      </div>
      <div
        class="detail-bottom"
        :class="{'scale-small':isChangeStyle===false}"
      >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/terminal.png"
            alt=""
          >
          <p>
            5G终端
          </p>
        </div>
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/base-station.png"
            alt=""
          >
          <p>
            5G基站
          </p>
        </div>
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <div
          class="detail-bottom-one"
          v-if="isChangeStyle"
        >
          <img
            src="../../../assets/images/sandbox/edge.png"
            alt=""
          >
          <p>
            边缘UPF
          </p>
        </div>
        <div
          v-else
          class="edgePuf"
          @click="addApplicationRules"
        >
          <p>边缘UPF</p>
        </div>
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/core.png"
            alt=""
          >
          <p>
            5G核心网
          </p>
        </div>
        <img
          src="../../../assets/images/sandbox/sucess_line.png"
          alt=""
          class="detail-bottom-line"
        >
        <div class="detail-bottom-one">
          <img
            src="../../../assets/images/sandbox/internet.png"
            alt=""
          >
          <p>
            INTERNET
          </p>
        </div>
      </div>
    </div>
    <AddVm
      v-if="showContent==='showAddVm'"
      @addVmFinish="addVmFinish"
    />
    <ConfigNetwork
      v-if="showContent==='showConfigNetwork'"
      @editNetwork="editNetwork"
    />
    <VmDetail
      v-if="showContent==='showVmDetail'"
      @closeVmDetail="closeVmDetail"
    />
  </div>
</template>

<script>
import ConfigNetwork from './ConfigNetwork.vue'
import AddVm from './AddVm.vue'
import NetScroll from './NetScroll.vue'
import VmDetail from './VmDetail.vue'
export default {
  name: 'SandboxDetail',
  components: {
    ConfigNetwork,
    AddVm,
    NetScroll,
    VmDetail
  },
  data () {
    return {
      detailTitle: JSON.parse(sessionStorage.getItem('sandboxName')),
      isChangeStyle: true,
      showContent: 'showDetail',
      isBtnDetail: false,
      isBtnStart: false,
      isAddVmFinish: false,
      configNetworkFinish: false,
      isStartupVm: false,
      isStartupVmFinish: false,
      netNum: 3
    }
  },
  methods: {
    deployInternet () {
      this.isChangeStyle = false
    },
    selectNet () {
      this.showContent = 'showConfigNetwork'
    },
    addVm () {
      this.showContent = 'showAddVm'
    },
    addVmFinish (data) {
      if (data === 'confirm') {
        this.isBtnStart = true
        this.isAddVmFinish = true
        this.configNetworkFinish = true
      }
      this.showContent = 'showDetail'
    },
    editNetwork (data) {
      this.showContent = 'showDetail'
      if (data && data.length > 0) {
        this.configNetworkFinish = true
        this.netNum = data.length
      }
    },
    checkVmDetail () {
      this.showContent = 'showVmDetail'
    },
    closeVmDetail () {
      this.showContent = 'showDetail'
    },
    startUpVm () {
      this.isStartupVm = true
      let _timer = setTimeout(() => {
        this.isStartupVmFinish = true
        this.isStartupVm = false
        clearTimeout(_timer)
      }, 3000)
    },
    addApplicationRules () {
      this.$router.push('/application-rules')
    }
  },
  computed: {
  },
  mounted () {

  }
}
</script>

<style lang="less">
.detail{
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #fff;
  .detail-top{
    .detail-top-title{
      width: 160px;
      height: 63px;
      margin: 1% 0 0 13%;
      font-size: 30px;
      line-height: 50px;
      text-align: center;
      letter-spacing: 4px;
      background: url('../../../assets/images/sandbox/detail-title.png') no-repeat center;
    }
  }
  .detail-center{
    margin: 10px auto 0;
    width: 259px;
    height: 350px;
    .detail-center-bg{
      position: relative;
      width: 259px;
      height: 200px;
      background: url('../../../assets/images/sandbox/mec_bg.png') no-repeat center;
      .detail-center-img{
        width: 126px;
        height: 126px;
      }
      .detail-center-title{
        width: 166px;
        height: 38px;
        margin-top: -10px;
        line-height: 38px;
        position: absolute;
        text-align: center;
        background-image: url('../../../assets/images/sandbox/mec_name.png');
      }
    }
    .detail-center-name{
      text-align: center;
      line-height: 34px;
    }
    .detail-center-line{
      display: block;
      margin: 10px auto;
      width: 16px;
      height: 96px;
    }
  }
  .detail-bottom{
    display: flex;
    align-items: center;
    margin: 10px auto 0;
    width: 1140px;
    .detail-bottom-one{
      p{
        text-align: center;
        line-height: 30px;
      }
    }
    .detail-bottom-line{
      width: 76px;
      height: 16px;
      margin: 0 10px;
    }
  }
  .deploy-detail-center{
    width: 694px;
    height: 464px;
    transition: all  0.4s;
    .deploy-detail-bg{
      width: 694px;
      height: 464px;
      max-height: 100%;
      padding: 40px 40px;
      background: url('../../../assets/images/sandbox/detail_center_bg.png') no-repeat;
      .details-top{
        display: flex;
        .deploy-detail-circle{
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: #76E1E9;
          margin: 6px 10px 0 0;
        }
        .deploy-detail-title{
          font-size: 16px;
          color: #fff;
        }
      }
      .details-center{
        display: flex;
        padding-top: 60px;
        margin: 0 60px;
        .details-center-deploy{
          display: flex;
          flex-direction: column;
          .details-center-deploy-img{
            .deploy-img{
              width: 150px;
              height: 150px;
              background-image: url('../../../assets/images/sandbox/deploy_internet.png');
              .deploy-img-center{
                width: 96px;
                height: 96px;
                opacity: 0.1;
                position:absolute;
              }
              .deploy-img-center-finish{
                opacity: 1;
              }
              .deploy-edit{
                position: relative;
                display: none;
              }
            }
            .deploy-img:hover{
              border-radius:20px ;
              background-color: rgba(10, 9, 54, 0.5);
              .deploy-img-center{
                opacity: 0.02;
              }
              .deploy-edit{
                display: block;
              }
            }
            .internet-num{
              margin: 30px 0 0 10px;
            }
          }
        }
        .netLine{
          width: 154px;
          height: 100px;
          margin: 32px 16px 0 16px;
          overflow: hidden;
          li{
            width: 8px;
            height:8px;
            border-radius:50%;
            background-color: #fff;
            margin-bottom: 18px;
          }
        }
        .netLine-list{
          margin: 30px 16px 0 16px;
        }
        .details-center-vm{
          position: relative;
          .vm-center-img{
            position:absolute;
            width: 96px;
            height: 96px;
            opacity: 0.1;
          }
          .vm-center-img-finish{
            opacity: 1;
          }
          .vm-bg{
            width: 150px;
            height: 150px;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            .vm-btn{
              display: none;
              width: 75px;
              height: 50px;
              background-size: 100% 100%;
              background-color: #3D3B94;
              opacity: 0.6;
              img{
                opacity: 0.7;
              }
              .img-onlyRead{
                pointer-events: none;
                opacity: 0.2;
              }
            }
            .vm-btn-add{
              border-radius: 20px 0 0 0;
            }
            .vm-btn-detail{
              border-radius: 0 20px 0 0;
            }
            .vm-btn-start{
              width: 150px;
              border-radius: 0 0 20px 20px;
            }
          }
          .vm-bg:hover{
            .vm-btn{
              display: block;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 0.7;
            }
            .vm-btn:hover{
              opacity: 1;
            }
          }
          .vmStatus{
            position: absolute;
            top: 124px;
            .bounce1 {
              animation-delay: -0.48s;
            }
            .bounce2 {
              animation-delay: -0.32s;
            }
            .bounce3 {
              animation-delay: -0.16s;
            }
          }
          .vmStatus > div {
            width: 6px;
            height: 6px;
            margin-right: 4px;
            background-color: #42F6AC;
            border-radius: 100%;
            display: inline-block;
            animation: bouncedelay 1.4s infinite ease-in-out;
            animation-fill-mode: both;
          }
          @keyframes bouncedelay {
            0%, 80%, 100% {
              transform: scale(0.0);
            }
            40% {
              transform: scale(1.0);
            }
          }
        }
        .details-center-vm-img{
          background-image: url('../../../assets/images/sandbox/deploy_internet.png');
        }
        .details-center-vm-img:hover{
          .vmStatus{
            display: none;
          }
        }
        .details-center-vm:hover{
          .vm-center-img{
            opacity: 0.1;
          }
        }
        .deploy-title{
          text-align: center;
          line-height: 50px;
        }
      }
      .details-bottom{
        margin-top: 60px;
        .details-bottom-title{
          font-size: 40px;
          color: #0A0936;
          font-weight:bold;
          opacity: 0.5;
        }
      }
    }
  }
  .hide-div{
    display: none;
  }
  .scale-small{
    transform: translate(-64px,50px);
    transition: all 0.4s ;
    height: 130px;
    .detail-bottom-one{
      width: 120px;
      img{
        transform: scale(0.42);
      }
      p{
        margin-left: 30px;
        margin-top: -40px;
      }
    }
    .detail-bottom-line{
      margin: 10px -36px 0 0 ;
      width: 60px;
    }
    .edgePuf{
      width: 109px;
      height: 109px;
      margin: 40px 10px 0 40px;
      cursor: pointer;
      background-image: url('../../../assets/images/sandbox/edgePuf.png');
      p{
        text-align: center;
        margin-top: 80px;
      }
   }
  }
  .scale-small-line{
    transform: translate(-250px,-10px) scale(0.7);
    transition: all  0.4s;
  }
}
</style>
