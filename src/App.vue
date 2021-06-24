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
    <EgFooter
      v-if="platformData[0].url!==''"
      :language="language"
      :platform-data="platformData"
      :home-page="homePage"
      :specific-bg="specificBg"
      specific-bg-color="#ffffff"
    />
  </div>
</template>

<script>
import Navcomp from './components/common/Nav.vue'
import EgFooter from 'eg-view/src/components/EgFooter.vue'
export default {
  name: 'App',
  components: {
    Navcomp,
    EgFooter
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      scrollTop: 0,
      appStoreUrl: '',
      atpUrl: '',
      mecmUrl: '',
      platformData: [
        {
          name: 'AppStore',
          url: ''
        },
        {
          name: 'ATP',
          url: ''
        },
        {
          name: 'MECM',
          url: ''
        }
      ],
      homePage: true,
      specificBg: true
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    $route (to, from) {
      if (to.path === '/mecDeveloper' || to.path === '/') {
        this.homePage = true
      } else {
        this.homePage = false
      }
      if (to.path === '/mecDeveloper' || to.path === '/' || to.path === '/mecDeveloper/api/mep') {
        this.specificBg = true
      } else {
        this.specificBg = false
      }
    }
  },
  methods: {
    getScrollTop () {
      this.scrollTop = this.$refs.app.getBoundingClientRect().top
    },
    getPlatformUrl () {
      let currUrl = window.location.origin
      if (currUrl.indexOf('30092') !== -1) {
        this.appStoreUrl = currUrl.replace('30092', '30091')
        this.atpUrl = currUrl.replace('30092', '30094')
        this.mecmUrl = currUrl.replace('30092', '30093')
      } else {
        this.appStoreUrl = currUrl.replace('developer', 'appstore')
        this.atpUrl = currUrl.replace('developer', 'atp')
        this.mecmUrl = currUrl.replace('developer', 'mecm')
      }
      this.platformData.forEach(item => {
        if (item.name === 'AppStore') {
          item.url = this.appStoreUrl
        } else if (item.name === 'ATP') {
          item.url = this.atpUrl
        } else if (item.name === 'MECM') {
          item.url = this.mecmUrl
        }
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.getScrollTop, true)
    window.onresize = () => {
      return (() => {
        this.getScrollTop()
      })()
    }
    this.getPlatformUrl()
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
  color: #2c3e50;
  width: 100%;
  background:#f1f2f6;
  padding-top: 80px;
}
</style>
