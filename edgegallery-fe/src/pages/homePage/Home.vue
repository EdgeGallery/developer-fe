
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
  <div class="developer-home">
    <div class="main-content">
      <div class="main-content-left">
        <div class="main-title">
          {{ $t('home.gathering') }}
        </div>
        <p class="mian-sub-title">
          {{ $t('home.mainTitle') }}
        </p>
        <img
          class="main-title-dot"
          src="../../assets/images/index/index_dot.png"
          alt="icon"
        >
      </div>
      <div class="main-content-right">
        <div
          v-for="(item,index) in rightBtnList"
          :key="index"
          class="main-content-right-item"
          @click="jumpTo(item.path)"
        >
          <img
            :src="item.src"
            :alt="index"
          >
          <div class="main-content-right-item-name">
            {{ index===0?$t('home.appIncubation'):(index===1?$t('home.appStore'):$t('home.appDeploy')) }}
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
          src: require('../../assets/images/index/index_app_create.png'),
          path: '/EG/developer/home'
        },
        {
          src: require('../../assets/images/index/index_app_store.png'),
          path: '/appStore/home/home'
        },
        {
          src: require('../../assets/images/index/index_app_deploy.png'),
          path: '/mecm'
        }
      ]
    }
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    sessionStorage.removeItem('applicationId')
    this.$store.commit('changeFlow', '0')
    this.$store.commit('changeApp', '5G')
  }
}
</script>

<style lang='less'>
.developer-home {
  width: 100%;
  height: 100%;
  font-size: 20px;
  text-align: center;
  .main-content{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;
    .main-content-left{
      height: 160px;
      width: 35%;
      text-align: left;
      color: #fff;
      position: relative;
      top: 25%;
      left: 12%;
      .main-title{
        font-size: 80px;
        font-weight: bold;
        text-shadow: 0 0 10px #fff;
      }
      .main-title-dot{
        position: relative;
        top: 50px;
        left: 3px;
      }
      .mian-sub-title{
        font-size: 30px;
        margin-top: 40px;
        letter-spacing: 5px;
      }
    }
    .main-content-right{
      height: 400px;
      width: 37%;
      text-align: center;
      color: #fff;
      position: relative;
      top: 11%;
      left: 60%;
      display: flex;
      justify-content: center;
      .main-content-right-item{
        width: 31%;
        height: 100%;
        margin-right: 3%;
        overflow: hidden;
        background: rgb(46,20,124,0.7);
        opacity: 0.5;
        border-radius: 17px;
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
          font-size: 26px;
          font-weight: bold;
        }
      }
      .main-content-right-item:hover{
        transform: translate3d(0,-20px,0);
        border: 3px solid #42F6AC;
        opacity: 1;
      }
    }

  }
}
</style>
