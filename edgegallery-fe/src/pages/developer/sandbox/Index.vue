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
  <div class="incubation">
    <img
      src="../../../assets/images/sandbox/question.png"
      alt=""
      class="question hoverHands"
    >
    <div
      class="sandbox hoverHands"
      @click="toSelectSandbox"
    >
      <p
        class="sandbox-name-cn"
      >
        {{ selectSandbox }}
      </p>
      <p class="sandbox-name-en">
        SANDBOX
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      selectSandbox: JSON.parse(sessionStorage.getItem('sandboxName')) || 'selectSandbox'
    }
  },
  methods: {
    toSelectSandbox () {
      if (this.selectSandbox === 'selectSandbox') {
        this.$router.push({ path: '/sandbox' })
      } else {
        this.$router.push({ path: '/sandboxDetail' })
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.incubation{
  width: 100%;
  height: 100%;
  font-size: 20px;
  .question{
    width: 67px;
    height: 67px;
    margin: 2% 0 0 90%;
  }
  .sandbox{
    width: 344px;
    height: 420px;
    margin: 6% auto;
    padding:170px   0;
    background: url('../../../assets/images/sandbox/index-sandbox-bg.png') no-repeat center;
    animation: scaleBox 4s  ease-in 0s infinite ;
    @keyframes scaleBox {
      0%{
         transform: scale(1);
      }
      20%{
        transform: scale(1.05);
      }
      40%{
        transform: scale(1);
      }
      60%{
        transform: scale(0.93);
      }
      80%{
        transform: scale(0.95);
      }
      100%{
        transform: scale(1);
      }
    }
    .sandbox-name-cn{
      font-size: 25px;
      letter-spacing: 10px;
      text-align: center;
      color: #fff;
      font-weight: lighter;
    }
    .sandbox-name-en{
      font-weight: bold;
      font-size: 50px;
      text-align: center;
      color:#D6CFFB;
    }
  }
}
</style>
