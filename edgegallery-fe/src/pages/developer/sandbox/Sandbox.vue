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
  <div class="select-sandbox">
    <img
      src="../../../assets/images/sandbox/question.png"
      alt=""
      class="question hoverHands"
    >
    <div class="all-sandbox">
      <div class="sandbox-top">
        <p class="sandbox-top-circle" />
        <p class="sandbox-top-title">
          选择沙箱
        </p>
      </div>
      <div class="sandboxs">
        <div
          class="one-sandbox"
          v-for=" (item,index) in sandbox"
          :key="index"
        >
          <div class="sandbox-content">
            <img
              class="select-img"
              src="../../../assets/images/sandbox/selected.png"
              alt=""
            >
            <img
              class="sandbox-img"
              :src="item.imgUrl"
              alt=""
            >
            <p class="sandbox-detail">
              详情
            </p>
          </div>
          <p class="sandbox-name">
            {{ item.name }}
          </p>
        </div>
      </div>
      <el-button class="makesure">
        完成
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      sandbox: [
        {
          name: '北京沙箱',
          imgUrl: require('../../../assets/images/sandbox/sandbox1.png')
        },
        {
          name: '广东沙箱',
          imgUrl: require('../../../assets/images/sandbox/sandbox2.png')
        },
        {
          name: '武汉沙箱',
          imgUrl: require('../../../assets/images/sandbox/sandbox3.png')
        },
        {
          name: '西安沙箱',
          imgUrl: require('../../../assets/images/sandbox/sandbox4.png')
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less">
.select-sandbox{
  width: 100%;
  height: 100%;
  font-size: 20px;
  background: url('../../../assets/images/sandbox/bg.png') no-repeat center;
  background-size: cover;
  position: relative;
    .question{
    width: 67px;
    height: 67px;
    position: absolute;
    right: 5%;
    top: 10%;
  }
  .all-sandbox{
    width: 36.35%;
    padding: 20px 2% ;
    min-height: 465px;
    position: absolute;
    left: 32%;
    top: 30%;
    background-image: url('../../../assets/images/sandbox/sandboxNameBg.png');
    background-size: 100% 100%;

    .sandbox-top{
      display: flex;
      .sandbox-top-circle{
        background-color: #76E1E9;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        margin:6px 6px 0 0;
      }
      .sandbox-top-title{
        font-size: 16px;
        color: #fff;
      }
    }
    .sandboxs{
      margin-top: 14px;
      width: 100%;
      position: relative;
      justify-content: flex-start;
      flex-wrap: wrap;
      display: flex;
      .one-sandbox{
        width: 14%;
        height: 160px;
        margin: 0 7% 40px 3%;
       .sandbox-content{
          height: 160px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: url('../../../assets/images/sandbox/sandboxBg.png') no-repeat center;
          background-size: cover;
        .select-img{
          width: 12px;
          height: 12px;
          margin-bottom: 6%;
        }
        .sandbox-img{
          width: 50%;
          height: 100px;
        }
        .sandbox-detail{
          font-size: 8px;
          color: #fff;
          background-color: #76E1E9;
          height: 16px;
          width: 30px;
          border-radius: 6px;
        }
      }
      .sandbox-name{
        margin-top: 12%;
        font-size: 14px;
        color: #fff;
        text-align: center;
      }
    }
    }
    .makesure{
      width: 88px;
      height: 30px;
      border-radius: 12px;
      position: relative;
      left: 78%;
      margin-top: 20px;
    }
  }
}
</style>
