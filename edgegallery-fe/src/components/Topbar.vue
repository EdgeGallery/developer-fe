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
  <div class="main-sidebar">
    <el-menu
      :default-active="indexName"
      :unique-opened="true"
      router
      @select="handleSelect"
      text-color="rgba(255,255,255,.8)"
      active-text-color="#fff"
      mode="horizontal"
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

              <!-- Third layer menu -->
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

export default {
  name: 'MainSidebar',
  props: {
    jsonData: {
      type: Array,
      default: () => []
    },
    indexNameProp: {
      type: String,
      default: () => '/'
    }
  },
  data () {
    return {
      inputVal: '',
      toPath: '',
      indexName: this.indexNameProp
    }
  },
  methods: {
    handleSelect (index, indexPath, item) {
      if (index) {
        this.indexName = index
      }
    }
  },
  watch: {
    $route (to, from) {
      this.toPath = to.path
      this.handleSelect(this.toPath)
    }
  }
}

</script>
<style lang='less'>
.main-sidebar{
  position: relative;
  z-index: 99;
  float: left;
  .el-menu{
    background-color: transparent;
  }
  .el-menu.el-menu--horizontal{
    height: 80px;
    border-bottom: none;
    .el-menu-item{
      height: 80px;
      line-height: 80px;
      margin-right: 30px;
    }
    .el-menu-item:not(.is-disabled):hover{
      background: transparent!important;
    }
    .el-submenu{
      margin-right: 30px;
    }
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 80px !important;
    line-height: 80px !important;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
    background: transparent !important;
    border-bottom: 2px solid #fff !important;
  }
  .el-menu{
    display: flex;
    .first-menu{
      font-size: 14px;
    }
    .second-menu{
      font-size: 15px;
    }
    .third-menu{
      font-size: 12px;
    }
  }
}

</style>
