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
  <div
    class="eg-messagebox-outer"
    v-if="visible"
  >
    <div class="eg-messagebox-container common-div-bg">
      <div class="content">
        <div
          class="icon-wrapper"
        >
          <em
            class="icon"
            :class="'icon-'+type"
          />
        </div>
        <div class="desc">
          {{ desc }}
        </div>
        <div
          class="desc-sub"
          v-if="descSub!==''"
        >
          {{ descSub }}
        </div>
        <el-button
          v-if="cancelText !== ''"
          class="common-btn"
          @click="handleCancel"
        >
          {{ cancelText }}
        </el-button>
        <el-button
          class="common-btn"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EGMessageBox',
  data () {
    return {
      type: 'info',
      desc: '',
      descSub: '',
      visible: true,
      promise: null,
      cancelText: '',
      confirmText: ''
    }
  },
  methods: {
    init () {
      this.visible = true
      if (this.cancelText !== '') {
        return new Promise((resolve, reject) => {
          this.promise = { resolve, reject }
        })
      }
    },
    destroy () {
      this.visible = false
      setTimeout(() => {
        this.$destroy(true)
        if (this.$el) {
          this.$el.parentNode.removeChild(this.$el)
        }
      })
    },
    handleCancel () {
      if (this.cancelText !== '') {
        this.promise.reject()
      }
      this.destroy()
    },
    handleConfirm () {
      if (this.cancelText !== '') {
        this.promise.resolve()
      }
      this.destroy()
    }
  }
}
</script>

<style lang="less">
@keyframes innerIconAnimation {
  0% {
    transform: scale(0);
    opacity: .3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes outerIconAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

.eg-messagebox-outer {
  position: fixed;
  _position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  margin: 0 auto;
  z-index: 99999;
  width: 100%;
  height: 100%;
  background-color: rgba(74,34,218,.2);
  backdrop-filter: blur(10px);
  text-align: center;
  .eg-messagebox-container {
    width: 460px;
    padding: 40px;
    min-height: 275px;
    border-radius: 16px;
    font-family: defaultFontLight, Arial, Helvetica, sans-serif;
    color: #fff;
    .el-button + .el-button{
      margin-left: 70px;
    }
  }
  .content {
    text-align: center;
  }
  .desc {
    margin: 29px 0 15px;
    line-height: 25px;
  }
  .desc-sub{
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 22px;
  }
  .icon {
    width: 100%;
    height: 100%;
    z-index: 999;
    animation-name: innerIconAnimation;
    animation-duration: .1s;
    animation-timing-function: linear;
  }
  .icon-wrapper {
    margin: 0 auto;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    box-shadow: 5px 10px 15px -8px rgba(22, 21, 31, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    animation-name: outerIconAnimation;
    animation-duration: .1s;
  }
  .icon-info{
    background: url('../../assets/images/prompt_icon_info.png');
  }
  .icon-success{
    background: url('../../assets/images/prompt_icon_success.png');
  }
}

</style>
