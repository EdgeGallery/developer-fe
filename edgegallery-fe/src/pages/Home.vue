
<template>
  <div class="home">
    <Developing />
  </div>
</template>

<script>
import Developing from '../components/Developing.vue'

export default {
  components: {
    Developing
  },
  data () {
    return {
      language: localStorage.getItem('language')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>

<style lang='less'>
.home {
  width: 100%;
}
</style>
