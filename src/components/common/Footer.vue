<template>
  <div class="footerBar">
    <img
      src="../../assets/images/footer_logo.png"
      alt=""
    >
    Copyright © Huawei Technologies Co., Ltd. 2019. All rights reserved
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.footerBar{
  height:40px;
  line-height: 40px;
  text-align: center;
  background:#f5f5f5;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  img{
    height: 25px;
    position: relative;
    top: 6px;
    left: -5px;
  }
}
</style>
