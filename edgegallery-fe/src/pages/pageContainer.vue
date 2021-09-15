<template>
  <div class="">
    <iframe
      id="pageContainer"
      scrolling="yes"
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
  beforeDestroy () {
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
