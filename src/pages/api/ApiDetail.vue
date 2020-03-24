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
      <el-breadcrumb-item
        v-if="path==='mep'"
        :to="{ path: '/mecDeveloper/api/mep' }"
      >
        {{ $t('breadCrumb.mepapi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-else
        :to="{ path: '/mecDeveloper/api/mep-eco' }"
      >
        {{ $t('breadCrumb.mepecoapi') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.apiDetail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="swagger-ui" />
  </div>
</template>

<script>
import { urlPrefix } from '../../tools/tool.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: 'Apidetail',
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      apiFileId: this.$route.params.apiId,
      path: this.$route.params.path
    }
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
    getApiUrl () {
      let apiUrl = urlPrefix + 'mec/developer/v1/files/' + this.apiFileId + '?userId=' + this.userId + '&type=OPENMEP'
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
