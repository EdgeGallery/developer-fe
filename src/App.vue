<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
    ref="app"
  >
    <Navcomp
      :scroll-top-prop="scrollTop"
      class="clearfix"
    />
    <router-view />
  </div>
</template>

<script>
import Navcomp from './components/common/Nav.vue'
export default {
  name: 'App',
  components: {
    Navcomp
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      scrollTop: 0
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    getScrollTop () {
      this.scrollTop = this.$refs.app.getBoundingClientRect().top
    }
  },
  mounted () {
    window.addEventListener('scroll', this.getScrollTop, true)
    window.onresize = () => {
      return (() => {
        this.getScrollTop()
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
  // font-family: Huaweisans, Arial, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  background:#f1f2f6;
  padding-top: 80px;
}
</style>
