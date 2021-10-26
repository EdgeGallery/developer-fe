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
    <div class="detail-center">
      <div class="detail-center-bg flex-center">
        <img
          src="../../../assets/images/sandbox/mec_img.png"
          alt=""
          class="detail-center-img"
        >
        <p class="detail-center-title">
          边缘应用
        </p>
      </div>
      <div class="detail-center-name">
        5G MEC
      </div>
      <img
        src="../../../assets/images/sandbox/failed_line.png"
        alt=""
        class="detail-center-line"
      >
    </div>
    <div class="detail-bottom">
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
      <div class="detail-bottom-one">
        <img
          src="../../../assets/images/sandbox/edge.png"
          alt=""
        >
        <p>
          边缘UPF
        </p>
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
</template>

<script>
export default {
  name: '',
  data () {
    return {
      detailTitle: JSON.parse(sessionStorage.getItem('sandboxName'))
    }
  },
  methods: {

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
    .question{
      width: 67px;
      height: 67px;
      margin: 2% 10% 0 0;
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
}
</style>
