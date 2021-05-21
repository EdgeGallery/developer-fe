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
    class="home_project"
    id="homeProject"
    @mouseleave="addAnimationLeft=addAnimationRight=false"
  >
    <div
      class="integration lt"
      @mouseenter="toRight"
      :class="[{'start':addAnimationLeft}]"
    >
      <div
        class="project_info"
        :class="[{'hide':addAnimationLeft}]"
      >
        <img
          src="../../assets/images/home_project_integration.png"
          alt=""
        >
        <p class="tit">
          应用集成
        </p>
        <p class="tit_sub">
          Integrate
        </p>
        <el-button @click="jumpToWorkSpace('Integrate')">
          {{ $t('home.select') }}
        </el-button>
      </div>
      <div
        class="project_step"
        :class="[{'integration_step':addAnimationRight}]"
      >
        <p class="step_tit">
          操作步骤
        </p>
        <p class="tit_sub">
          Operation guide
        </p>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in integrationStep"
            :key="index"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <span
        class="right"
        :class="[{'show':addAnimationRight}]"
      />
    </div>
    <div
      class="development rt"
      @mouseenter="toLeft"
      :class="[{'select':addAnimationRight}]"
    >
      <div
        class="project_info"
        :class="[{'hide':addAnimationRight}]"
      >
        <img
          src="../../assets/images/home_project_development.png"
          alt=""
        >
        <p class="tit">
          应用开发
        </p>
        <p class="tit_sub">
          Development
        </p>
        <el-button @click="jumpToWorkSpace('Development')">
          {{ $t('home.start') }}
        </el-button>
      </div>
      <div
        class="project_step dev"
        :class="[{'integration_step':addAnimationLeft}]"
      >
        <p class="step_tit">
          操作步骤
        </p>
        <p class="tit_sub">
          Operation guide
        </p>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in developmentStep"
            :key="index"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <span
        class="left"
        :class="[{'show':addAnimationLeft}]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    screenWidthProp: {
      type: Number,
      default: 0
    },
    screenHeightProp: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      userName: sessionStorage.getItem('userName'),
      screenHeight: document.body.clientHeight,
      screenWidth: document.body.clientWidth,
      timer: false,
      addAnimationLeft: false,
      addAnimationRight: false,
      integrationStep: [{
        content: '新建项目'
      }, {
        content: '上传镜像'
      }, {
        content: '部署调测'
      }, {
        content: '应用认证'
      }, {
        content: '应用发布'
      }],
      developmentStep: [{
        content: '新建项目'
      }, {
        content: '选择能力'
      }, {
        content: '开发应用'
      }, {
        content: '部署调测'
      }, {
        content: '应用认证'
      }, {
        content: '应用发布'
      }]
    }
  },
  methods: {
    setScreenHeight (screenHeight) {
      let oDiv1 = document.getElementsByClassName('home_project')
      oDiv1[0].style.height = (Number(screenHeight) - 80) + 'px'
    },
    jumpToWorkSpace (type) {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('promptMessage.guestPrompt'))
      } else {
        this.$router.push({ name: 'workspace', params: { from: type } })
      }
    },
    toLeft () {
      this.addAnimationLeft = true
      this.addAnimationRight = false
      this.changezIndex('development', 'integration')
    },
    toRight () {
      this.addAnimationLeft = false
      this.addAnimationRight = true
      this.changezIndex('integration', 'development')
    },
    changezIndex (className1, className2) {
      let oDiv1 = document.getElementsByClassName(className1)
      oDiv1[0].style.zIndex = 9
      let oDiv2 = document.getElementsByClassName(className2)
      oDiv2[0].style.zIndex = 1
    },
    mouseEnter (screenWidth) {
      let oDiv = document.getElementsByClassName('project_info')
      oDiv[0].style.left = (Number(screenWidth) / 4 - 120) + 'px'
      oDiv[1].style.right = (Number(screenWidth) / 4 - 120) + 'px'

      let oDiv1 = document.getElementsByClassName('project_step')
      oDiv1[0].style.marginTop = -(oDiv1[0].offsetHeight / 2) + 'px'
      oDiv1[0].style.left = (Number(screenWidth) / 2 - 100) + 'px'
      oDiv1[1].style.marginTop = -(oDiv1[1].offsetHeight / 2) + 'px'
      oDiv1[1].style.right = (Number(screenWidth) / 2 - 100) + 'px'
    }
  },
  mounted () {
    this.mouseEnter(this.screenWidth)
    this.setScreenHeight(this.screenHeight)
    // 监听到窗口大小变化时，重新给screenHeight变量赋值
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight
        this.screenWidth = document.body.clientWidth
        this.setScreenHeight(this.screenHeight)
        this.mouseEnter(this.screenWidth)
      })()
    }
  },
  watch: {
    screenHeightProp (newValue) {
      this.screenHeight = newValue
      if (!this.timer) {
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
      }
      this.setScreenHeight(this.screenHeight)
    },
    screenWidthProp (newValue) {
      this.screenWidth = newValue
      if (!this.timer) {
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
      }
      this.mouseEnter(this.screenWidth)
    }
  }
}
</script>

<style lang="less">
.home_project{
  .integration,.development{
    width: 50%;
    height: 100%;
    color: #000;
    transition:width 0.3s;
    position: relative;
  }
  .integration{
    .el-button{
      background: #380879;
      color: #fff;
    }
    .right{
      display: inline-block;
      width: 26px;
      height: 42px;
      background: url('../../assets/images/home_project_right.png');
      position: absolute;
      top: 50%;
      margin-top: -21px;
      right: -56px;
      opacity: 0;
      transition:opacity 0.2s;
    }
    .right.show{
      opacity: 1;
    }
  }
  .development{
    color: #fff;
    background: #380879;
    .el-button{
      background: #fff;
      color: #380879;
    }
    .left{
      display: inline-block;
      width: 26px;
      height: 42px;
      background: url('../../assets/images/home_project_left.png');
      position: absolute;
      top: 50%;
      margin-top: -21px;
      left: -56px;
      opacity: 0;
      transition:opacity 0.2s;
    }
    .left.show{
      opacity: 1;
    }
  }
  .integration.start{
    width: 15%;
  }
  .integration:hover{
    width: 85%;
  }
  .development.select{
    width: 15%;
  }
  .development:hover{
    width: 85%;
  }
  .project_info{
    width: 240px;
    height: 100%;
    position: absolute;
    height: 50%;
    top: 25%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 1;
    transition:opacity 0.5s;
    img{
      width: 75%;
      max-width: 237px;
    }
    .tit{
      font-size: 36px;
      margin: 110px 0 25px;
    }
    .tit_sub{
      font-size: 20px;
    }
    .el-button{
      width: 210px;
      margin-top: 50px;
      border-radius: 12px;
      font-size: 26px;
      padding: 0;
      span{
        display: inline-block;
        height: 62px;
        line-height: 62px;
      }
    }
  }
  .project_info.hide{
    opacity: 0;
  }
  .project_step{
    position: absolute;
    width: 550px;
    top: 50%;
    opacity: 0;
    transition:opacity 0.7s;
    background: #fcfcfc;
    border-radius: 15px;
    padding: 50px 0 30px 100px;
    box-shadow: 0 0 20px 0 rgba(56, 8, 121, 0.14);
    color: #000;
    .step_tit{
      font-size: 34px;
    }
    .tit_sub{
      font-size: 20px;
      margin: 20px 0 70px;
    }
    .el-timeline-item__content{
      font-size: 22px;
      color: #000;
      position: relative;
      top: -4px;
    }
    .el-timeline-item__node--normal{
      width: 16px;
      height: 16px;
      background: #d5b4fd;
      left: -3px;
    }
    .el-timeline-item__tail{
      border-left: 2px dotted #d5b4fd;
    }
    .el-timeline-item{
      padding-bottom: 10px;
    }
  }
  @media screen and (max-width:1380px){
    .project_step{
      width: 450px;
    }
  }
  .project_step.integration_step{
    opacity: 1;
  }
  .project_step.dev{
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.14);
  }
}
</style>
