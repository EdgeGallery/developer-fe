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
    :class="{'app-new':pageModel==='newVersion','app-new-inner':!isIndex,'app-incubation':isIncubationPage}"
    ref="app"
  >
    <Navcomp
      :scroll-top-prop="scrollTop"
      :is-home-prop="isHome"
      :to-path-prop="toPath"
      class="clearfix"
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
            v-if="zoom>1"
          />
        </div>
        <em
          class="icon-arrow-right"
          v-if="zoom ===1"
          @click.stop="enlarge()"
        />
      </el-col>
      <el-col
        :span="23-zoom"
        v-if="zoom<20"
      >
        <router-view />
      </el-col>
      <el-col
        :span="1"
        v-if="isShowTips"
      >
        <div class="tips-container">
          <div
            class="tips-box"
            @click="$router.push('/EG/developer/home')"
          >
            <el-tooltip
              :content="$t('home.returnHome')"
              effect="light"
              placement="left"
            >
              <img
                src="./assets/images/index/index_return.png"
                alt="return"
              >
            </el-tooltip>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navcomp from './components/Nav.vue'
import navDataClassic from './navdata/navDataCn.js'
import ProjectSideComp from './pages/developer/application/ApplicationtList.vue'
export default {
  name: 'App',
  components: {
    Navcomp,
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
      isIndex: true,
      isIncubationPage: false,
      isShowTips: false
    }
  },
  computed: {
    zoom (val) {
      return Number(this.$store.state.zoom)
    }
  },
  watch: {
    $route (to, from) {
      this.isIndex = window.location.hash.indexOf('/EG') < 0
      this.isIncubationPage = window.location.hash.indexOf('/EG/developer/home') > -1
      this.toPath = to.path
      if (to.path.indexOf('EG') > -1 && to.path !== '/EG/developer/home') {
        this.isShowTips = true
      } else {
        this.isShowTips = false
      }
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
        this.$store.commit('changeZoom', '1')
        this.$refs.leftProComp.style.width = '15%'
      } else if (val === 2) {
        this.$store.commit('changeZoom', '20')
        this.$refs.leftProComp.style.width = '100%'
      } else {
        this.$store.commit('changeZoom', '2')
      }
    },
    enlarge () {
      this.$store.commit('changeZoom', '2')
      this.$refs.leftProComp.style.width = '100%'
    },
    setDivHeight (screenHeight) {
      this.$nextTick(() => {
        let _oDiv = document.getElementsByClassName('app-new')[0]
        if (_oDiv) {
          _oDiv.style.height = Number(screenHeight) + 'px'
        }
      })
    },
    getScrollTop () {
      this.scrollTop = this.$refs.app.getBoundingClientRect().top
    }
  },
  mounted () {
    let language = localStorage.getItem('language') || 'cn'
    this.$i18n.locale = language
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
  updated () {
    if (this.zoom === 1) {
      this.$refs.leftProComp.style.width = '15%'
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
  background: url('./assets/images/common_bg_index.png') #3E279B -10px 92% no-repeat;
  background-size: contain;
  min-height: 805px;
  overflow: hidden;
}
.app-new-inner{
  background: url('./assets/images/common_bg_inner1.png') #3E279B -10px 92% no-repeat;
  background-size: cover;
}
.app-incubation{
  min-width: 1600px;
}
.left-pro-comp{
  width: 100%;
  height: 95%;
  position: relative;
  border: 2px solid #838ACB;
  border-left: none;
  border-radius: 0 17px 17px 0;
  z-index: 15;
  overflow: hidden;
}
.app-list-comp .icon-arrow-right{
  width: 30px;
  height: 35px;
  background: url('./assets/images/application/app_arrow_icon.png') no-repeat center;
  background-size: cover;
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
  background: rgba(46,20,124,.7);
  backdrop-filter: blur(6px);
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
.tips-box{
  width: 45px;
  height: 45px;
  background: #321985;
  text-align: center;
  line-height: 45px;
  border-radius: 6px;
  padding-top: 7px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
