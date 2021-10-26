
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
  <div class="new-home">
    <div class="main-content">
      <div class="main-content-left">
        <img
          src="../../assets/images/index/index_EG_icon.png"
          alt="icon"
        >
        <div class="main-title">
          开发者大集结
        </div>
        <p class="mian-sub-title">
          每一个开发者都了不起
        </p>
      </div>
      <div class="main-content-right">
        <div
          v-for="(item,index) in rightBtnList"
          :key="index"
          class="main-content-right-item"
        >
          <img
            :src="item.src"
            :alt="index"
          >
          <div class="main-content-right-item-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      rightBtnList: [
        {
          name: '应用孵化',
          src: require('../../assets/images/index/index_app_create.png')
        },
        {
          name: '应用商店',
          src: require('../../assets/images/index/index_app_store.png')
        },
        {
          name: '应用部署',
          src: require('../../assets/images/index/index_app_deploy.png')
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
.new-home {
  width: 100%;
  height: 100%;
  font-size: 20px;
  text-align: center;
  .main-content{
    width: 100%;
    height: 100%;
    background: url('../../assets/images/index/index_bg.png') no-repeat center;
    background-size: cover;
    position: relative;
    z-index: 10;
    .main-content-left{
      height: 160px;
      width: 35%;
      text-align: left;
      color: #fff;
      position: relative;
      top: 35%;
      left: 12%;
      .main-title{
        font-size: 80px;
        font-weight: bold;
      }
      .mian-sub-title{
        font-size: 20px;
        margin-top: 40px;
        letter-spacing: 20px;
      }
    }
    .main-content-right{
      height: 400px;
      width: 35%;
      text-align: center;
      color: #fff;
      position: relative;
      top: 15%;
      left: 55%;
      display: flex;
      justify-content: center;
      .main-content-right-item{
        width: 30%;
        height: 100%;
        margin-right: 3%;
        overflow: hidden;
        background: url('../../assets/images/index/index_mask.png') no-repeat center;
        background-size: cover;
        border: 2px solid #B6A4EC;
        border-radius: 8px;
        transition: transform 0.3s ease-in;
        cursor: pointer;
        img{
          position: relative;
          top: 20%;
          left: 10%;
        }
        .main-content-right-item-name{
          position: relative;
          top: 30%;
        }
      }
      .main-content-right-item:hover{
        transform: translate3d(0,-20px,0);
        border: none;
      }
    }

  }
}
</style>
