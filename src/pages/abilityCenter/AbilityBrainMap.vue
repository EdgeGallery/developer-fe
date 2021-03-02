<template>
  <div class="instru-container">
    <div class="instru-arrows-wrap">
      <em
        class="instru-arrows"
        :class="uperArrowStyle"
      />
    </div>
    <div class="instru-container-inner">
      <div
        style="height:400px"
        id="minder-container"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
require('kity')
require('kityminder-core')
export default {
  components: {
  },
  props: {
    parentTabIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      km: null,
      data: null
    }
  },
  computed: {
    uperArrowStyle: function () {
      return {
        first: this.parentTabIndex <= 0,
        second: this.parentTabIndex === 1,
        isShow: this.parentTabIndex <= 4,
        noShow: this.parentTabIndex > 4
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.refreshMap()
    },
    'parentTabIndex': function () {
      this.refreshMap()
    }
  },
  methods: {
    refreshMap () {
      if (this.parentTabIndex !== 1) {
        if (this.$i18n.locale === 'en') {
          axios('./data/ETSI_en.json').then(res => {
            this.km.importJson(res.data)
          })
        } else {
          axios('./data/ETSI_cn.json').then(res => {
            this.km.importJson(res.data)
          })
        }
      } else {
        if (this.$i18n.locale === 'en') {
          axios('./data/3GPP_en.json').then(res => {
            this.km.importJson(res.data)
          })
        } else {
          axios('./data/3GPP_cn.json').then(res => {
            this.km.importJson(res.data)
          })
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.km = new window.kityminder.Minder({
      renderTo: '#minder-container'
    })
    this.refreshMap()
  },
  beforeCreate () {},
  beforeMount () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  activated () {}
}
</script>
<style lang='less' scoped>
.instru-container {
  margin-top: 20px;
  background: #f5f7fa;
  border: 1px solid #e5e8ed;
  box-shadow: 0 2px 4px 0 rgba(3, 27, 78, 0.06);
  box-sizing: border-box;
}
.instru-arrows-wrap {
  position: relative;
  z-index: 5;
}
.instru-container-inner {
  margin: -1px -2px -1px -1px;
  font-size: 0;
}
.first {
  left: calc(25%)!important;
}
.second {
  left: calc(75%)!important;
}
.isShow{
  display: block;
}
.noShow{
  display:none;
}
@media screen and (min-width: 769px) {
  .instru-arrows {
    position: absolute;
    width: 24px;
    height: 16px;
    left: 100px;
    top: -16px;
    background-image: url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/platform/special/ai-platform/css/sprite/ai-platform-media29-20209221151.png);
    background-size: cover;
    background-position: 0px 0px;
  }
  .down {
    transform: rotateX(180deg);
    top: 0px;
  }
}
</style>
