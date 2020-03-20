<template>
  <div class="apidetail">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">
        API
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/mep-eco' }">
        {{ $t('breadCrumb.mepecoapi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.apiDetail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="swagger-ui" />
  </div>
</template>

<script>
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: 'Apidetail',
  data () {
    return {}
  },
  mounted () {
    function iframeHeight () {
      const oIframe = document.getElementById('swagger-ui')
      const deviceHeight = document.documentElement.clientHeight
      oIframe.style.height = (Number(deviceHeight) - 200) + 'px'
    }
    iframeHeight()
    window.onresize = function () {
      iframeHeight()
    }
    this.getApiUrl()
  },
  methods: {
    getApiUrl (data) {
      let apiUrl = './face_recognition.json'
      SwaggerUIBundle({
        url: apiUrl,
        dom_id: '#swagger-ui',
        deepLinking: false,
        presets: [
          SwaggerUIBundle.presets.apis
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ]
      })
    }
  }
}
</script>

<style lang="less">
.apidetail{
  .iframe iframe{
      width: 100%;
  }
}
</style>
