<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

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
        style="height:480px"
        id="minder-container"
      />
    </div>
  </div>
</template>

<script>
import ability from './ability'
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
        second: this.parentTabIndex === 1
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
      let subAbilitys = []
      let abilitys = []
      if (this.parentTabIndex === 1) {
        abilitys = ability.getAbilitysByFirstLevelName('3GPP')
      } else {
        abilitys = ability.getAbilitysByFirstLevelName('ETSI')
      }
      if (abilitys.length > 0) {
        subAbilitys = abilitys[0].children
      }
      let subAbilitysShown = []
      for (let i = 0; i < subAbilitys.length; i++) {
        let thirdGpp = (i < 5) ? '#00b050' : ''
        let etsiNodeBackground = (i < 6) ? '#00b050' : ''
        subAbilitysShown.push({
          data: {
            id: subAbilitys[i].groupId,
            text: this.$i18n.locale === 'en' ? subAbilitys[i].labelEn : subAbilitys[i].label,
            expandState: 'expand',
            hyperlink: window.location.href + '/apiAmulator?groupId=' + subAbilitys[i].groupId + '&language=' + this.$i18n.locale,
            hyperlinkTitle: this.$i18n.t('api.swithToAPI'),
            background: this.parentTabIndex === 1 ? thirdGpp : etsiNodeBackground
          },
          children: []
        })
      }
      this.km.importJson({
        root: {
          data: {
            id: '0',
            text: this.parentTabIndex === 1 ? '3GPP CAPIF' : 'ETSI MEC',
            expandState: 'expand',
            hyperlink: '',
            hyperlinkTitle: ''
          },
          children: subAbilitysShown
        },
        template: 'default',
        theme: 'fresh-purple-compat',
        version: '1.0.0'
      })
    }
  },
  mounted () {
    this.km = new window.kityminder.Minder({
      renderTo: '#minder-container'
    })
    this.refreshMap()
  }
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
