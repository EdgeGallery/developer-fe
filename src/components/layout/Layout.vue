<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="layout">
    <el-main>
      <router-view />
      <EgFooter
        v-if="platformData[0].url!==''"
        :platform-data="platformData"
        :show-full-footer-page="showFullFooterPage"
        :specific-bg="specificBg"
        specific-bg-color="#ffffff"
        :footer-bgcolor-prop="footerBgcolor"
      />
    </el-main>
  </div>
</template>

<script>
import EgFooter from 'eg-view/src/components/EgFooter.vue'
import { common } from '../../tools/common.js'
import { PLATFORMNAME_APPSTORE, PLATFORMNAME_ATP, PLATFORMNAME_MECM } from '../../tools/constant.js'
export default {
  name: 'Layout',
  components: {
    EgFooter
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      appStoreUrl: '',
      atpUrl: '',
      mecmUrl: '',
      platformData: [
        {
          name: 'AppStore',
          url: ''
        },
        {
          name: 'ATP',
          url: ''
        },
        {
          name: 'MECM',
          url: ''
        }
      ],
      showFullFooterPage: true,
      specificBg: true,
      footerBgcolor: '#3e279b'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    $route (to) {
      this.getPagePath(to.path)
    }
  },
  methods: {
    getPagePath (path) {
      if (path === '/mecDeveloper') {
        this.showFullFooterPage = true
      } else {
        this.showFullFooterPage = false
      }
      if (path === '/mecDeveloper/api/mep') {
        this.specificBg = true
      } else {
        this.specificBg = false
      }
    },
    getScrollTop () {
      this.scrollTop = this.$refs.app.getBoundingClientRect().top
    },
    getPlatformUrl () {
      this.appStoreUrl = common.getPlatformUrlPrefix(PLATFORMNAME_APPSTORE)
      this.atpUrl = common.getPlatformUrlPrefix(PLATFORMNAME_ATP)
      this.mecmUrl = common.getPlatformUrlPrefix(PLATFORMNAME_MECM)
      this.platformData.forEach(item => {
        if (item.name === 'AppStore') {
          item.url = this.appStoreUrl
        } else if (item.name === 'ATP') {
          item.url = this.atpUrl
        } else if (item.name === 'MECM') {
          item.url = this.mecmUrl
        }
      })
    }
  },
  mounted () {
    this.getPagePath(this.$route.path)
    this.getPlatformUrl()
  }
}
</script>

<style lang='less'>
  .layout{
    width: 100%;
    .pagebar{
      margin-top:25px;
      float:right;
    }

    /* Edit md file scroll bar */
    .editormd-preview-container, .editormd-html-preview{
      margin:0;
      padding:0;
    }
    .el-tabs__header{
      margin-bottom: 0!important;
    }
    .el-dialog--center .el-dialog__body{
      text-align: center;
    }
    /* Color */
    .success{
      color:#67C23A;
    }
    .failed{
      color:#F56C6C;
    }
    .primary{
      color:#409EFF;
    }

    .el-aside {
      display: block;
      position: absolute;
      left: 0;
      top: 48px;
      bottom: 0;
      background:#f5f5f5;
      z-index:50;
    }
    .el-main{
      padding: 0;
      min-height: 620px;
      overflow: hidden;
    }
    .el-footer{
      padding:0;
      height: 40px!important;
      width: 100%;
      position: fixed;
      text-align: center;
      line-height: 40px;
      bottom: 0;
      background: #f5f5f5;
    }
    .el-menu--horizontal>.el-submenu .el-submenu__title{
      height: 50px;
      line-height: 50px;
    }
    .el-menu.el-menu--horizontal{
      border-bottom: none;
    }
}
.el-icon-close{
  color: #333;
}
</style>
