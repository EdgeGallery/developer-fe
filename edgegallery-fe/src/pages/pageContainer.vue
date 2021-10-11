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
  <div class="">
    <iframe
      id="pageContainer"
      :src="iframeUrl"
      title="首页"
      class="pageIframe"
      ref="iframe"
    />
  </div>
</template>

<script>
import { NAV_PRE, MODULES } from '../constants'

export default {
  components: {},
  data () {
    return {
      iframeUrl: this.getIFrameUrl(),
      iframeWin: {}
    }
  },
  methods: {
    getIFrameUrl () {
      let originArray = window.location.origin.split(':')
      let url = ''
      let urlPre = originArray[0] + ':' + originArray[1] + ':'
      if (this.$route.path.startsWith(NAV_PRE.APPSTORE)) {
        url = urlPre + MODULES.APPSTORE.port + '/#' + this.$route.path.slice(NAV_PRE.APPSTORE.length)
      } else if (this.$route.path.startsWith(NAV_PRE.DEVELOPER)) {
        url = urlPre + MODULES.DEVELOPER.port + '/#' + this.$route.path.slice(NAV_PRE.DEVELOPER.length)
      } else if (this.$route.path.startsWith(NAV_PRE.MECM)) {
        url = urlPre + MODULES.MECM.port + '/#' + this.$route.path.slice(NAV_PRE.MECM.length)
      } else if (this.$route.path.startsWith(NAV_PRE.ATP)) {
        url = urlPre + MODULES.ATP.port + '/#' + this.$route.path.slice(NAV_PRE.ATP.length)
      }
      url = url + '?language=' + localStorage.getItem('language')
      return url
    },
    sendLanguageMessage () {
      this.iframeWin.postMessage({
        cmd: 'iframeLanguageChange',
        params: { lang: localStorage.getItem('language') }
      }, '*')
    }
  },
  mounted () {
    const oIframe = document.getElementById('pageContainer')
    const deviceWidth = document.documentElement.clientWidth
    const deviceHeight = document.documentElement.clientHeight
    oIframe.style.width = (Number(deviceWidth)) + 'px'
    oIframe.style.height = (Number(deviceHeight) - 2) + 'px'
    this.iframeUrl = this.getIFrameUrl()
    this.iframeWin = this.$refs.iframe.contentWindow
  },
  watch: {
    $route (to, from) {
      this.iframeUrl = this.getIFrameUrl()
    },
    '$i18n.locale': function () {
      this.sendLanguageMessage()
    }
  }
}
</script>
<style lang='less' scoped>
  .pageIframe {
    width: 100%;
    height: 100%;
    min-height: 600px;
    margin-top: -82px;
    display: 'block';
  }
</style>
