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
      <div
        class="sandbox hoverHands"
        @click="toSelectSandbox"
        @mouseleave="breathStyle=false"
        @mouseenter="breathStyle=true"
      >
        <p
          class="sandbox-name-cn fontUltraLight"
          :class="{'breath':breathStyle===false}"
        >
          {{ selectSandbox }}
        </p>
        <p
          class="sandbox-name-en"
          :class="{'breath':breathStyle===false}"
        >
          SANDBOX
        </p>
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
import { sandbox } from '../../../api/developerApi.js'
export default {
  name: 'SandBox',
  components: {
    SandBoxList
  },
  data () {
    return {
      selectSandbox: this.$t('sandbox.selectSandbox'),
      isCheckSandboxList: false,
      breathStyle: false,
      applicationId: sessionStorage.getItem('applicationId') || ''
    }
  },
  methods: {
    isSelectSandbox () {
      sandbox.getUserSelectSandbox(this.applicationId).then(res => {
        if (res.data.mepHostId === null) {
          this.selectSandbox = this.$t('sandbox.selectSandbox')
        } else {
          sandbox.getSandboxByMepHostId(res.data.mepHostId).then(resSub => {
            this.selectSandbox = resSub.data.name
            sessionStorage.setItem('sandboxName', resSub.data.name)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toSelectSandbox () {
      let _isSelectSandbox = this.selectSandbox === this.$t('sandbox.selectSandbox')
      if (_isSelectSandbox) {
        this.isCheckSandboxList = true
      } else {
        this.isCheckSandboxList = false
        this.$router.push({ path: '/EG/developer/sandboxDetails' })
        sessionStorage.setItem('sandboxName', this.selectSandbox)
      }
    },
    returnSelectSandbox (data) {
      this.selectSandbox = data
      this.isCheckSandboxList = false
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.selectSandbox = this.$t('sandbox.selectSandbox')
    }
  },
  mounted () {
    this.isSelectSandbox()
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
    background: url('../../../assets/images/sandbox/index_sandbox_bg.png') no-repeat center;
    .sandbox-name-cn{
      font-size: 25px;
      letter-spacing: 8px;
      text-align: center;
      color: #fff;
    }
    .sandbox-name-en{
      line-height: 67px;
      font-size: 50px;
      text-align: center;
    }
  }
  .breath{
    animation:breathe 1.5s ease-in 0s infinite;
    @keyframes breathe  {
      0%{
        opacity: 1;
      }
      50%{
        opacity: 0.3;
      }
      100%{
        opacity: 1;
      }
    }
  }
}
</style>
