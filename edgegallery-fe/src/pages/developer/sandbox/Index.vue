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
    <div v-if="!isCheckSandboxList">
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
          class="sandbox-name-cn fontUltraLight"
        >
          {{ selectSandbox }}
        </p>
        <p class="sandbox-name-en" />
      </div>
    </div>
    <SandBoxList
      v-else
      @returnSelectSandbox="returnSelectSandbox"
    />
  </div>
</template>

<script>
import SandBoxList from './Sandbox.vue'
export default {
  name: 'SandBox',
  components: {
    SandBoxList
  },
  data () {
    return {
      selectSandbox: '选择沙箱',
      isCheckSandboxList: false
    }
  },
  methods: {
    toSelectSandbox () {
      if (this.selectSandbox === '选择沙箱') {
        this.isCheckSandboxList = true
      } else {
        this.isCheckSandboxList = false
        this.$router.push({ path: '/sandbox-detail' })
      }
    },
    returnSelectSandbox (data) {
      this.selectSandbox = data
      this.isCheckSandboxList = false
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.incubation{
  width: 100%;
  font-size: 20px;
  .sandbox{
    width: 344px;
    height: 420px;
    margin: 10% auto;
    padding:170px 0;
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
    }
    .sandbox-name-en{
      background: url('../../../assets/images/sandbox/sandbox_en.png') no-repeat center;
      width: 248px;
      height: 67px;
      margin: 0 auto;
    }
  }
}
</style>
