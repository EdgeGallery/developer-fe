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
import { Api } from '../../tools/api.js'
import axios from 'axios'
export default {
  name: '',
  props: {
    guideFileIdprop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      markdownSource: '',
      guideFileId: this.guideFileIdprop,
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    getMarkDown (guideFileId) {
      console.log(guideFileId)
      let apiUrl = Api.getSwaggerUrlApi(guideFileId, this.userId)
      axios(apiUrl).then(res => {
        this.markdownSource = res.data
      })
    }
  },
  watch: {
    guideFileIdprop (newVal, oldVal) {
      this.getMarkDown(newVal)
    }
  },
  mounted () {
    this.getMarkDown(this.guideFileId)
  }
}
</script>
