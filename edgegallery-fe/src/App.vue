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
    id="app"
    class="defaultFont"
    :class="{'app-new':pageModel==='newVersion'}"
    ref="app"
  >
    <div v-if="pageModel==='newVersion'">
      <div class="common-bg-center-div">
        <div
          :class="{'common-bg-center-home':isIndex,'common-bg-center':!isIndex}"
        >
          <img
            src="./assets/images/common_bg_center_home.png"
            alt=""
            v-show="isIndex"
          >
          <img
            src="./assets/images/common_bg_center.png"
            alt=""
            v-show="!isIndex"
          >
        </div>
      </div>
      <div class="common-bg-left" />
      <div class="common-bg-green-left" />
      <div class="common-bg-green-right" />
    </div>

    <Navcomp
      :scroll-top-prop="scrollTop"
      :is-home-prop="isHome"
      :to-path-prop="toPath"
      class="clearfix"
      v-if="pageModel!=='newVersion'"
    />
    <NavcompNew
      :scroll-top-prop="scrollTop"
      :to-path-prop="toPath"
      class="clearfix"
      v-if="pageModel==='newVersion'"
    />
    <el-row>
      <el-col
        :span="zoom"
        v-if="!isIndex"
        class="app-list-comp"
      >
        <div
          class="left-pro-comp"
          :class="zoom>1?'left-pro-comp-show':''"
          ref="leftProComp"
        >
          <ProjectSideComp
            @zoomChanged="zoomChanged"
            @createNewProject="createNewProject"
            :zoom="zoom"
            v-if="zoom>1"
          />
        </div>
        <em
          class="el-icon-arrow-right"
          v-if="zoom ===1"
          @click.stop="enlarge()"
        />
      </el-col>
      <el-col
        :span="24-zoom"
        v-if="zoom<20"
      >
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navcomp from '../src/classic/components/Nav.vue'
import NavcompNew from '../src/components/Nav.vue'
import navDataClassic from '../src/classic/navdata/navDataCn.js'
import ProjectSideComp from './pages/developer/application/ApplicationtList.vue'
export default {
  name: 'App',
  components: {
    Navcomp,
    NavcompNew,
    ProjectSideComp
  },
  data () {
    return {
      scrollTop: 0,
      pageModel: sessionStorage.getItem('pageModel') || 'newVersion',
      isHome: true,
      toPath: '/index',
      navDataClassic: navDataClassic,
      screenHeight: document.body.clientHeight,
      timer: false,
      zoom: 2,
      isIndex: true
    }
  },
  watch: {
    pageModel (val) {
      this.pageModel = val
      if (this.pageModel === 'newVersion') {
        this.zoom = 2
      } else {
        this.zoom = 0
      }
    },
    $route (to, from) {
      this.isIndex = window.location.hash.indexOf('/EG') < 0
      this.toPath = to.path
      this.pageModel = sessionStorage.getItem('pageModel') || 'newVersion'
      let toJumpClassic = this.pageModel === 'Classic'
      let isHome = to.path === '/home'
      if (!toJumpClassic && isHome) {
        this.isHome = true
      } else {
        this.isHome = false
      }
      this.ifToJumpClassic(this.toPath)
    },
    scrollTop (val) {
      this.scrollTop = val
    },
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        setTimeout(function () {
          this.timer = false
        }, 400)
        this.setDivHeight(this.screenHeight)
      }
    }
  },
  methods: {
    zoomChanged (val) {
      if (val === 1) {
        this.zoom = 1
        this.$refs.leftProComp.style.width = '15%'
      } else {
        this.zoom = 20
        this.$refs.leftProComp.style.width = '100%'
      }
    },
    enlarge () {
      this.zoom = 2
      this.$refs.leftProComp.style.width = '100%'
    },
    createNewProject (val) {
      if (val) {
        this.zoomChanged(1)
        sessionStorage.setItem('isCreate', true)
        this.$router.push('/EG/developer/createApplication')
      }
    },
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let _oDiv = document.getElementsByClassName('app-new')[0]
        if (_oDiv) {
          _oDiv.style.minHeight = Number(screenHeight) + 'px'
        }
      })
    },
    getScrollTop () {
      this.scrollTop = this.$refs.app.getBoundingClientRect().top
    },
    ifToJumpClassic (toPath) {
      let numTemp = 0
      this.navDataClassic.forEach(item => {
        if (item.path === toPath) {
          numTemp++
        }
        if (!item.children) {
          return
        }
        item.children.forEach(itemChild => {
          if (itemChild.path === toPath) {
            numTemp++
          }
        })
        if (numTemp > 0) {
          this.pageModel = 'Classic'
        } else {
          this.pageModel = 'newVersion'
        }
      })
    }
  },
  mounted () {
    this.ifToJumpClassic(this.toPath)
    this.setDivHeight(this.screenHeight)
    window.addEventListener('scroll', this.getScrollTop, true)
    window.onresize = () => {
      return (() => {
        this.getScrollTop()
        this.screenHeight = document.body.clientHeight
        this.setDivHeight(this.screenHeight)
      })()
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getScrollTop, true)
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  width: 100%;
  height: 100%;
  padding-top: 80px;
  position: relative;
}
.app-new{
  background:url('./assets/images/common_bg.png');
  background-size:cover;
  .common-bg-center-div{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .common-bg-center-home{
    position: absolute;
    top: 0;
    left: 150px;
    animation: animationCenterHome 10s linear infinite;
  }
  .common-bg-center{
    position: absolute;
    top: 0;
    left: -170px;
    animation: animationCenter 10s linear infinite;
  }
  .common-bg-left{
    position: absolute;
    top: 100px;
    left: 70px;
    width: 170px;
    height: 296px;
    background: url('./assets/images/common_bg_left.png') no-repeat;
    animation: animationLeft 5s linear infinite;
  }
  .common-bg-green-left{
    position: absolute;
    bottom: 140px;
    left: 110px;
    width: 297px;
    height: 363px;
    background: url('./assets/images/common_bg_green_left.png') no-repeat;
    animation: animationGreenLeft 6s linear infinite;
  }
  .common-bg-green-right{
    position: absolute;
    bottom: 300px;
    left: 50%;
    width: 244px;
    height: 300px;
    background: url('./assets/images/common_bg_green_right.png') no-repeat;
    animation: animationGreenRight 5s linear infinite;
  }
}
.left-pro-comp{
  width: 100%;
  height: 805px;
  position: relative;
  border: 2px solid #838ACB;
  border-left: none;
  border-radius: 0 17px 17px 0;
  z-index: 15;
  overflow: hidden;
}
.app-list-comp .el-icon-arrow-right{
  position: absolute;
  top: 50%;
  left: 0.5%;
  cursor: pointer;
}
.left-pro-comp-show{
  min-width: 150px!important;
}
.left-pro-comp::after {
  content: "";
  background: url("./assets/images/div_bg.png") no-repeat center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.el-row, .el-col{
  height: 100%;
}
@keyframes animationCenterHome {
  0% {
    bottom: 0px;
  }
  50% {
    top: 80px;
  }
  100% {
    top: 0px;
  }
}
@keyframes animationCenter {
  0% {
    bottom: 0px;
  }
  50% {
    top: 60px;
  }
  100% {
    top: 0px;
  }
}
@keyframes animationLeft {
  0% {
    top: 100px;
  }
  50% {
    top: 130px;
  }
  100% {
    top: 100px;
  }
}
@keyframes animationGreenLeft {
  0% {
    bottom: 110px;
  }
  50% {
    bottom: 140px;
  }
  100% {
    bottom: 110px;
  }
}
@keyframes animationGreenRight {
  0% {
    bottom: 300px;
  }
  50% {
    bottom: 260px;
  }
  100% {
    bottom: 300px;
  }
}
</style>
