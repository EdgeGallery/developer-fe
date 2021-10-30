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
  <div class="vm-detail">
    <img
      src="../../../assets/images/sandbox/question.png"
      alt=""
      class="question hoverHands"
    >

    <div class="common-div-bg vm-detail-dlg">
      <h3 class="rules-title-green">
        虚拟机详情
      </h3>
      <div class="vm-content">
        <img
          src="../../../assets/images/sandbox/vm_icon.png"
          alt=""
        >
        <div class="test-node">
          <p>测试节点IP</p>
          <p>{{ testNodes }}</p>
        </div>
      </div>

      <div class="btn-container network-btn">
        <el-button
          class="common-btn"
          @click="closeVmDetail"
        >
          {{ $t('common.finish') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vmdetail',
  data () {
    return {
      testNodes: 'https://192.168.1.38:30091,https://192.168.1.38:30092,https://192.168.1.38:30093'
    }
  },
  methods: {
    closeVmDetail () {
      this.$emit('closeVmDetail')
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.vm-detail{
  width: 100%;
  height: 100%;
  position: relative;
  .vm-detail-dlg{
    position: absolute;
    width: 700px;
    padding: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .vm-content{
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding-top: 35px;
      font-family: defaultFontLight Arial, Helvetica, sans-serif;
      font-size: 12px;
      .test-node{
        width: calc(100% - 230px);
        word-wrap: break-word;
        p{
          line-height: 25px;
        }
      }
    }
  }
}
</style>
