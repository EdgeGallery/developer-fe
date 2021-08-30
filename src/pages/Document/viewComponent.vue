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
  <div class="doc_component_div">
    <div class="padding_default">
      <div class="title_top title_left defaultFontBlod">
        {{ $t('nav.component') }}
        <span class="line_bot1" />
      </div>
      <div
        class="docs_content clear"
        ref="listTree"
      >
        <iframe
          v-if="isRouterAlive"
          title="component"
          :src="srcUrl"
          width="100%"
          height="1200"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      language: localStorage.getItem('language'),
      srcUrl: '',
      isRouterAlive: true
    }
  },
  methods: {
    rebuileComponents () {
      // Destroy subtag
      this.isRouterAlive = false
      // Recreate the subtag
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    getUrl () {
      let currhostname = window.location.hostname
      if (this.language === 'cn') {
        this.srcUrl = 'https://' + currhostname + ':30089/#/zh-CN/component/OverviewInstru'
      } else {
        this.srcUrl = 'https://' + currhostname + ':30089/#/en-US/component/OverviewInstru'
      }
    }
  },
  mounted () {
    this.getUrl()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.rebuileComponents()
      this.getUrl()
    }
  }
}
</script>

<style lang="less">
.doc_component_div{
  background: url('../../assets/images/egView_bg.png') right top no-repeat;
  background-size: contain;
  .docs_content{
    background: #fbfbfb;
    border-radius: 20px;
    box-shadow: 0 0 32px 0 rgba(81, 27, 152, 0.12);
    iframe{
      border: none;
      border-radius: 20px;
    }
  }
}
</style>
