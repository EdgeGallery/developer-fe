<template>
  <div id="app">
    <Navcomp class="clearfix"></Navcomp>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Navcomp from './components/common/Nav.vue'
import Footer from './components/common/Footer.vue'
export default {
  name: 'App',
  components: {
    Navcomp,
    Footer
  },
  data () {
    return {
    }
  },

  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less">
#app {
  font-family: Huaweisans, Arial, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  height: 100%;
  width: 100%;
  background:#F0F2F5;
}
</style>
