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
  <div class="main-sidebar-small">
    <el-menu
      :default-active="indexName"
      :unique-opened="true"
      router
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      text-color="#fff"
      background-color="rgba(0,0,0,0.4)"
      active-text-color="#6c92fa"
      active-color="#6c92fa"
    >
      <!-- First layer menu -->
      <template v-for="item in jsonData">
        <el-submenu
          v-if="item.children && item.children.length"
          :disabled="!item.display"
          :index="item.path"
          :key="item.id"
        >
          <template slot="title">
            <em :class="item.icon" /><span class="first-menu">{{ item.name }}</span>
          </template>

          <!-- Second layer menu -->
          <template v-for="itemChild in item.children">
            <el-submenu
              v-if="itemChild.children && itemChild.children.length"
              :index="itemChild.path"
              :key="itemChild.id"
            >
              <template slot="title">
                <em :class="itemChild.icon" /><span class="second-menu">{{ itemChild.name }}</span>
              </template>

              <!-- Third layer menu-->
              <el-menu-item
                v-for="itemChild_Child in itemChild.children"
                :index="itemChild_Child.path"
                :key="itemChild_Child.id"
              >
                <em :class="itemChild_Child.icon" />
                <span slot="title">{{ itemChild_Child.name }}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item
              v-else
              :index="itemChild.path"
              :key="itemChild.id"
            >
              <em :class="itemChild.icon" />
              <span
                slot="title"
                class="second-menu"
                v-html="itemChild.href=='1'? itemChild.html:itemChild.name"
              >{{ itemChild.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item
          v-else
          :disabled="!item.display"
          :index="item.path"
          :key="item.id"
        >
          <em :class="item.icon" />
          <span
            slot="title"
            class="first-menu"
          >{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { common } from '../../tools/common.js'
import { PLATFORMNAME_LAB } from '../../tools/constant.js'

export default {
  name: 'MainSidebar',
  props: {
    jsonData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      inputVal: '',
      indexName: '',
      fromPath: '',
      routerPath: sessionStorage.getItem('routerPath')
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (index, indexPath, item) {
      if (index) {
        this.indexName = index
      } else if (item.$vnode.data.key === '3.17') {
        this.labUrl = common.getPlatformUrlPrefix(PLATFORMNAME_LAB)
        window.open(this.labUrl, '_blank')
      }
      this.$emit('closeMenu', false)
    }
  },
  watch: {
    $route (to, from) {
      this.indexName = to.path
      this.fromPath = from.name
      // Edge case of having not selected any status yet for first time user
      if (this.indexName === '/mecDeveloper/plugin/list') {
        this.indexName = '/mecDeveloper/plugin/list'
      } else if (this.indexName === '/mecDeveloper/plugin/upload') {
        this.indexName = '/mecDeveloper/plugin/upload'
      } else if (this.indexName === '/mecDeveloper/plugin/detail') {
        this.indexName = '/mecDeveloper/plugin/list'
      } else if (this.indexName === '/mecDeveloper/work/detail') {
        this.indexName = '/mecDeveloper/work'
      } else if ((this.indexName === '/mecDeveloper/api/mep' && this.fromPath === 'mep') ||
      this.indexName === '/mecDeveloper/api/mep/serviceDoc' ||
      this.indexName === '/mecDeveloper/api/mep/apiAmulator') {
        this.indexName = '/mecDeveloper/api/mep'
      } else if (this.indexName === '/mecDeveloper/plugin/toolreport') {
        this.indexName = '/mecDeveloper/plugin/toolchain'
      } else if (this.indexName === '/') {
        this.indexName = '/mecDeveloper'
      } else {
        this.indexName = to.path
      }
    }
  },
  mounted () {
    this.indexName = this.$route.fullPath
  }
}

</script>
<style lang='less'>
.main-sidebar-small{
  position: relative;
  overflow-y: auto;
  z-index: 9999;
  width: calc(100% + 112px);
  margin-left: -56px;
  .el-menu{
    background: rgba(0, 0, 0, 0.6);
    border-right: none;
    .el-submenu.is-active, .el-menu-item.is-active{
      background: rgba(0, 0, 0, 0.3);
      .first-menu{
        color: #6c92fa;
      }
    }
    .el-submenu__title{
      background-color: rgba(0, 0, 0, 0.4) !important;
    }
    .el-icon-arrow-down:before{
      color: #fff;
      font-size: 16px;
    }
  }
}

</style>
