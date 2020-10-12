<template>
  <div id="swagger-ui" />
</template>

<script>
import { Api } from '../../tools/api.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: '',
  props: {
    apiFileIdprop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      apiFileId: this.apiFileIdprop,
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    // 获取Api-swaggerUI路径
    getApiUrl () {
      let apiUrl = Api.getSwaggerUrlApi(this.apiFileId, this.userId)
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
      let interval = setInterval(() => {
        let baseUrl = document.getElementsByClassName('base-url')
        try {
          if (baseUrl[0].innerHTML) {
            let childNodes = baseUrl[0].childNodes
            childNodes[4].nodeValue = '{host}'
            window.clearInterval(interval)
          }
        } catch (error) {
          window.clearInterval(interval)
        }
      }, 200)
    }
  },
  watch: {
    apiFileIdprop (newVal, oldVal) {
      this.apiFileId = newVal
      this.getApiUrl()
    }
  },
  mounted () {
    this.getApiUrl()
  }
}
</script>
