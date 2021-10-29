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
    <router-view />
  </div>
</template>

<script>
import Navcomp from '../src/classic/components/Nav.vue'
import NavcompNew from '../src/components/Nav.vue'
import navDataClassic from '../src/classic/navdata/navDataCn.js'
export default {
  name: 'App',
  components: {
    Navcomp,
    NavcompNew
  },
  data () {
    return {
      scrollTop: 0,
      pageModel: sessionStorage.getItem('pageModel') || 'newVersion',
      isHome: true,
      toPath: '/index',
      navDataClassic: navDataClassic,
      screenHeight: document.body.clientHeight,
      timer: false
    }
  },
  watch: {
    pageModel (val) {
      this.pageModel = val
    },
    $route (to, from) {
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
  background:url('../src/assets/images/common_bg.png');
  background-size:cover;
}
</style>
