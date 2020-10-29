<template>
  <div id="test-editor">
    <el-backtop target=".el-main" />
    <mavon-editor
      v-model="markdownSource"
      :toolbars-flag="false"
      :editable="false"
      :subfield="false"
      default-open="preview"
      :box-shadow="false"
      preview-background="#ffffff"
    />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  props: {
    servicePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      markdownSource: '',
      serviceUrl: this.servicePath
    }
  },
  methods: {
    getMarkDown (serviceUrl) {
      axios(serviceUrl).then(res => {
        this.markdownSource = res.data
      })
    }
  },
  watch: {
    servicePath (newVal, oldVal) {
      this.getMarkDown(newVal)
    }
  },
  mounted () {
    this.getMarkDown(this.serviceUrl)
  }
}
</script>
