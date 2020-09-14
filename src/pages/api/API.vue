<template>
  <div id="swagger-ui" />
</template>

<script>
import { urlPrefix } from '../../tools/tool.js'
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
