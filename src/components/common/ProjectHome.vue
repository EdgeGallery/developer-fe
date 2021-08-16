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
    @mouseleave="addAnimationLeft=addAnimationRight=false"
  >
    <div
      class="integration lt"
      :class="{'start':addAnimationLeft,'select':addAnimationRight}"
    >
      <div class="integration_con">
        <div
          class="project_info"
          :class="{'hide':addAnimationLeft}"
          @mouseenter="toRight"
          @mouseleave="addAnimationLeft=addAnimationRight=false"
        >
          <img
            src="../../assets/images/home_project_integration.png"
            alt=""
          >
          <p class="tit">
            {{ $t('workspace.appIntegration') }}
          </p>
          <span class="line_bot1" />
          <el-button
            @click="jumpToWorkSpace('Integrate')"
            class="project_btn"
          >
            {{ $t('home.start') }}
          </el-button>
        </div>
        <div
          class="project_step"
          :class="[{'integration_step':addAnimationRight,'integration_hide':!addAnimationRight}]"
        >
          <img
            :src="integrationBig"
            alt=""
            v-if="isIntegrationBig"
          >
          <img
            :src="integrationSmall"
            alt=""
            v-if="!isIntegrationBig"
          >
        </div>
        <span
          class="right"
          :class="[{'show':addAnimationRight}]"
        />
      </div>
    </div>
    <div
      class="development rt"
      :class="[{'select':addAnimationRight,'start':addAnimationLeft}]"
    >
      <div
        class="project_info"
        :class="[{'hide':addAnimationRight}]"
        @mouseenter="toLeft"
        @mouseleave="addAnimationLeft=addAnimationRight=false"
      >
        <img
          src="../../assets/images/home_project_development.png"
          alt=""
        >
        <p class="tit">
          {{ $t('workspace.appDevelopment') }}
        </p>
        <span class="line_bot2" />
        <el-button
          @click="jumpToWorkSpace('Development')"
          class="project_btn"
        >
          {{ $t('home.start') }}
        </el-button>
      </div>
      <div
        class="project_step dev"
        :class="[{'integration_step':addAnimationLeft,'integration_hide':!addAnimationLeft}]"
      >
        <img
          :src="developmentBig"
          alt=""
          v-if="isDevelopmentBig"
        >
        <img
          :src="developmentSmall"
          alt=""
          v-if="!isDevelopmentBig"
        >
      </div>
      <span
        class="left"
        :class="[{'show':addAnimationLeft}]"
      />
    </div>
    <div v-if="newprojectDialog">
      <newProject
        v-model="newprojectDialog"
        :new-project-titleprop="newProjectTitleprop"
        :getproject-typeprop="getprojectTypeprop"
        :active-projectprop="activeProjectprop"
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
      isIntegrationBig: true,
      isDevelopmentBig: true,
      integrationBig: require('../../assets/images/integrationBig.gif'),
      integrationSmall: require('../../assets/images/integrationSmall.gif'),
      developmentBig: require('../../assets/images/developmentBig.gif'),
      developmentSmall: require('../../assets/images/developmentSmall.gif'),
      newprojectDialog: false,
      activeProjectprop: 3
    }
  },
  methods: {
    setScreenHeight (screenHeight) {
      let oDiv1 = document.getElementsByClassName('home_project')
      if (oDiv1) {
        oDiv1[0].style.height = (Number(screenHeight) - 80) + 'px'
        oDiv1[0].style.minHeight = 500 + 'px'
      }
    },
    jumpToWorkSpace (type) {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('promptMessage.guestPrompt'))
      } else {
        if (type === 'Development') {
          this.addNewProject('CREATE_NEW')
        } else if (type === 'Integrate') {
          this.addNewProject('INTEGRATED')
        }
      }
    },
    toLeft () {
      this.addAnimationLeft = true
      this.addAnimationRight = false
      this.changezIndex('development', 'integration')
      this.developmentBig = this.developmentBig + '?' + new Date()
      this.developmentSmall = this.developmentSmall + '?' + new Date()
    },
    toRight () {
      this.addAnimationLeft = false
      this.addAnimationRight = true
      this.changezIndex('integration', 'development')
      this.integrationBig = this.integrationBig + '?' + new Date()
      this.integrationSmall = this.integrationSmall + '?' + new Date()
    },
    changezIndex (className1, className2) {
      let oDiv1 = document.getElementsByClassName(className1)
      oDiv1[0].style.zIndex = 9
      let oDiv2 = document.getElementsByClassName(className2)
      oDiv2[0].style.zIndex = 2
    },
    mouseEnter (screenWidth) {
      let oDiv = document.getElementsByClassName('project_info')
      oDiv[0].style.left = (Number(screenWidth) / 4 - 120) + 'px'
      oDiv[1].style.right = (Number(screenWidth) / 4 - 120) + 'px'

      let oDiv1 = document.getElementsByClassName('project_step')
      oDiv1[0].style.marginTop = -(oDiv1[0].offsetHeight / 2) + 'px'
      oDiv1[0].style.left = (Number(screenWidth) / 2 - 120) + 'px'
      oDiv1[1].style.marginTop = -(oDiv1[1].offsetHeight / 2) + 'px'
      oDiv1[1].style.right = (Number(screenWidth) / 2 - 120) + 'px'

      if (screenWidth <= 1380) {
        this.isIntegrationBig = false
        this.isDevelopmentBig = false
      } else {
        this.isIntegrationBig = true
        this.isDevelopmentBig = true
      }
    },
    // Create a new project
    addNewProject (projectType) {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('promptMessage.guestPrompt'))
      } else {
        if (projectType === 'CREATE_NEW') {
          this.newProjectTitleprop = this.$t('workspace.createProject')
        } else {
          this.newProjectTitleprop = this.$t('workspace.migrationProject')
        }
        this.getprojectTypeprop = projectType
        this.activeProjectprop = 3
        this.$router.push({
          name: 'appDetail',
          params: {
            isAddnewproject: true,
            projectType: projectType
          }
        })
      }
    }
  },
  mounted () {
    this.mouseEnter(this.screenWidth)
    this.setScreenHeight(this.screenHeight)
    // When window size changes, adjust the value of screenHeight
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
    z-index: 9;
  }
  .integration{
    background: #5e40c8;
    .integration_con{
      width: 100%;
      height: 100%;
      background: #f6f5f8;
      border-radius: 0 0 50px 0;
    }
    .el-button{
      background-image: linear-gradient(127deg, #4444d0, #6724cb);
      border: none;
      color: #fff;
      position: relative;
      span{
        position: relative;
        z-index: 2;
      }
    }
    .el-button:active{
      background-image: linear-gradient(127deg, #4a4aac, #6724cb);
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
    background: #5e40c8;
    border-radius: 50px 0 0 0;
    .el-button{
      background-image: linear-gradient(127deg, #54aaf3, #53dabd);
      border: none;
      color: #fff;
      position: relative;
      span{
        position: relative;
        z-index: 2;
      }
    }
    .el-button:active{
      background-image: linear-gradient(127deg, #60a9e7, #4cc1a8);
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
  .integration.select{
    width: 85%;
  }
  .development.select{
    width: 15%;
  }
  .development.start{
    width: 85%;
  }
  .project_info{
    width: 240px;
    position: absolute;
    height: 50%;
    top: 25%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 1;
    transition:opacity 0.3s;
    img{
      width: 90%;
      max-width: 237px;
    }
    .tit{
      font-size: 36px;
      margin: 110px 0 0;
    }
    .el-button{
      width: 210px;
      flex-shrink: 0;
      height: 64px;
      margin-top: 50px;
      border-radius: 12px;
      font-size: 26px;
    }
    .el-button::after {
      content: '';
      width: 90%;
      height: 100%;
      position: absolute;
      right: 5%;
      bottom: -20px;
      background: inherit;
      filter: blur(1.5rem);
      opacity: 0.4;
      z-index: 1;
    }
  }
  .project_info.hide{
    opacity: 0;
  }
  .project_step{
    position: absolute;
    width: 650px;
    height: 484px;
    top: 50%;
    opacity: 0;
    transition:opacity 2.5s;
    background: #fcfcfc;
    border-radius: 15px;
    padding: 50px 0 30px 55px;
    box-shadow: 0 0 20px 0 rgba(56, 8, 121, 0.14);
    color: #000;
  }
  @media screen and (max-width:1550px){
    .project_step{
      width: 468px;
      padding: 50px 0 30px 20px;
    }
  }
  .project_step.integration_step{
    opacity: 1;
  }
  .project_step.integration_hide{
    transition:display 0.5s;
    visibility: hidden;
  }
  .project_step.dev{
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.14);
  }
}
</style>
