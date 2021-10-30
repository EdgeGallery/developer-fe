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
      <div class="detail-top">
        <div class="detail-top-title lt">
          {{ detailTitle }}
        </div>
        <img
          src="../../../assets/images/sandbox/question.png"
          alt=""
          class="question hoverHands rt"
        >
      </div>
      <div
        class="detail-center"
        :class="{'deploy-detail-center':changeStyle===false}"
      >
        <div
          class="detail-center-bg flex-center"
          v-if="changeStyle"
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
                <div class="lt deploy-img ">
                  <div class="edit-bg">
                    <el-tooltip
                      class="item edit-tooltip"
                      effect="light"
                      content="编辑"
                      placement="bottom-start"
                    >
                      <img
                        src="../../../assets/images/sandbox/edit.png"
                        alt=""
                        class=" hoverHands"
                        @click="selectNet"
                      >
                    </el-tooltip>
                  </div>
                </div>
                <img
                  src="../../../assets/images/sandbox/internet_num3.png"
                  alt=""
                  class="lt internet-num"
                >
              </div>
              <div class="deploy-title title-margin">
                配置网络
              </div>
            </div>
            <div class="details-center-vm">
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
                      :class="btnDetail === false ? 'img-onlyRead':''"
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
                      :class="btnLogin === false ? 'img-onlyRead':''"
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
                      :class="btnUpload === false ? 'img-onlyRead':''"
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
                      :class="btnStart === false ? 'img-onlyRead':''"
                    >
                  </el-tooltip>
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
            <el-button class="details-bottom-btn rt">
              完成
            </el-button>
          </div>
        </div>
        <div
          class="detail-center-name"
          :class="{'hide-div':changeStyle===false}"
        >
          5G MEC
        </div>
        <img
          src="../../../assets/images/sandbox/failed_line.png"
          alt=""
          class="detail-center-line"
          :class="{'scale-small-line':changeStyle===false}"
        >
      </div>
      <div
        class="detail-bottom"
        :class="{'scale-small':changeStyle===false}"
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
          v-if="changeStyle"
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
    <ConfigNetwork
      v-if="showContent==='showConfigNetwork'"
      @editNetwork="editNetwork"
    />
    <AddVm v-if="showContent==='showAddVm'" />
    <VmDetail
      v-if="showContent==='showVmDetail'"
      @closeVmDetail="closeVmDetail"
    />
  </div>
</template>

<script>
import ConfigNetwork from './ConfigNetwork.vue'
import AddVm from './AddVm.vue'
import VmDetail from './VmDetail.vue'
export default {
  name: '',
  components: {
    ConfigNetwork,
    AddVm,
    VmDetail
  },
  data () {
    return {
      detailTitle: JSON.parse(sessionStorage.getItem('sandboxName')),
      changeStyle: true,
      showContent: 'showDetail',
      addvm: true,
      btnDetail: false,
      btnUpload: false,
      btnLogin: false,
      btnStart: false
    }
  },
  methods: {
    deployInternet () {
      this.changeStyle = false
    },
    selectNet () {
      this.showContent = 'showConfigNetwork'
    },
    addVm () {
      this.showContent = 'showAddVm'
    },
    editNetwork (data) {
      this.showContent = 'showDetail'
    },
    checkVmDetail () {
      this.showContent = 'showVmDetail'
    },
    closeVmDetail () {
      this.showContent = 'showDetail'
    }
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
      margin: 2% 0 0 13%;
      font-size: 30px;
      line-height: 50px;
      text-align: center;
      letter-spacing: 4px;
      background: url('../../../assets/images/sandbox/detail-title.png') no-repeat center;
    }
  }
  .detail-center{
    padding-top:140px ;
    margin: 0px auto;
    width: 259px;
    height: 234px;
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
      margin: 260px auto;
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
    width: 688px;
    height: 460px;
    transition: all  1s;
    .deploy-detail-bg{
      width: 688px;
      height: 460px;
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
        justify-content: space-around;
        padding-top: 60px;
        .details-center-deploy{
          display: flex;
          flex-direction: column;
          margin-right: 100px;
          .details-center-deploy-img{
            .deploy-img{
              width: 150px;
              height: 150px;
              border-radius:50% ;
              background-image: url('../../../assets/images/sandbox/deploy_internet.png');
             .edit-bg{
               width: 150px;
               height: 150px;
               display: none;
               background-image: url('../../../assets/images/sandbox/edit_bg.png');
              }
            }
            .deploy-img:hover{
              .edit-bg{
                display: block;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            .internet-num{
              margin: 30px 0 0 10px;
            }
          }
          .title-margin{
            margin-left: -26px;
          }
        }
        .details-center-vm{
          .vm-bg{
            width: 150px;
            height: 150px;
            background-image: url('../../../assets/images/sandbox/vm-bg.png');
            display: flex;
            flex-wrap: wrap;
            .vm-btn{
              display: none;
              width: 75px;
              height: 50px;
              background-size: 100% 100%;
              background-color: #3D3B94;
              opacity: 0.6;
              img{
                opacity: 0.2;
              }
              .img-onlyRead{
                pointer-events: none;
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
            }
            .vm-btn:hover{
              opacity: 0.9;
              img{
                opacity: 1;
              }
            }
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
        .details-bottom-btn{
          width: 88px;
          height: 30px;
          margin-top: 20px;
          border-radius:12px ;
          background-color: #BCB6D7;
        }
      }
    }
  }
  .hide-div{
    display: none;
  }
  .scale-small{
    transform: translate(-64px,-65px);
    transition: all 1s ;
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
      background-image: url('../../../assets/images/sandbox/edgePuf.png');
      p{
        text-align: center;
        margin-top: 80px;
      }
   }
  }
  .scale-small-line{
    transform: translate(-250px,-10px) scale(0.7);
    transition: all  1s;
  }
}
</style>
