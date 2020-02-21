<template>
  <div class="main-sidebar">
     <el-menu
      :default-active="indexName"
      :unique-opened="true"
      router
      @select="handleSelect"
      text-color="#fff"
      background-color="#282b33"
      active-text-color="#6c92fa"
      mode="horizontal"
    >
      <!-- 一级菜单 -->
      <template v-for='item in jsonData'>
        <el-submenu v-if='item.children && item.children.length' v-bind:disabled='!item.display' :index='item.path' :key='item.id'>
          <template slot='title'><i :class='item.icon'></i><span class='first-menu'>{{item.name}}</span></template>

          <!-- 二级菜单 -->
          <template v-for='itemChild in item.children'>
            <el-submenu v-if='itemChild.children && itemChild.children.length' :index='itemChild.path' :key='itemChild.id'>
              <template slot='title'><i :class='itemChild.icon'></i><span class='second-menu'>{{itemChild.name}}</span></template>

              <!-- 三级菜单 -->
              <el-menu-item v-for='itemChild_Child in itemChild.children' :index='itemChild_Child.path' :key='itemChild_Child.id'>
                <i :class='itemChild_Child.icon'></i>
                <span slot='title'>{{itemChild_Child.name}}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else :index='itemChild.path' :key='itemChild.id' >
              <i :class='itemChild.icon'></i>
              <span slot='title' class='second-menu' v-html="itemChild.href=='1'? itemChild.html:itemChild.name">{{itemChild.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else v-bind:disabled='!item.display' :index='item.path' :key='item.id'>
          <i :class='item.icon'></i>
          <span slot='title' class='first-menu'>{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'mainSidebar',
  props: {
    jsonData: Array
  },
  data () {
    return {
      indexName: ''
    }
  },
  methods: {
    handleSelect (path) {
      // console.log(path)
      this.indexName = path
      this.$root.$emit('refreshDnd')
      this.$root.$emit('refreshProvision')
      this.$root.$emit('refreshassurence')
    }

  },
  watch: {
    $route (to, from) {
      this.indexName = to.path
      // 解决MECDeveloper下DevTools导航子菜单首次点击没有选中状态问题
      if (this.indexName === '/mecDeveloper/plugin/list') {
        this.indexName = '/mecDeveloper/plugin/list#1'
      } else if (this.indexName === '/mecDeveloper/plugin/upload') {
        this.indexName = '/mecDeveloper/plugin/upload#1'
      } else if (this.indexName === '/mecm/mep/detail') {
        this.indexName = '/mecm/mep/list'
      } else if (this.indexName === '/mecm/apac/detail') {
        this.indexName = '/mecm/apac/list'
      } else if (this.indexName === '/mecm/apac/list/?type=mep') {
        this.indexName = '/mecm/apac/list'
      }
    }
  },
  beforeMount () {
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
    }
  },
  mounted () {
    this.indexName = this.$route.fullPath
  }
}

</script>
<style lang='less'>
.main-sidebar{
  position: relative;
  z-index: 99;
  float: left;
  .el-menu.el-menu--horizontal{
  height: 65px;
  border-bottom: none;
  .el-menu-item{
    height: 65px;
    line-height: 65px;
  }
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 65px !important;
  line-height: 65px !important;
}
.el-menu{
  display: flex;
  .first-menu{
    font-size: 18px;
    font-weight: bold;
  }
  .second-menu{
    font-size: 15px;
  }
  .third-menu{
    font-size: 12px;
  }
}
.el-menu.el-menu--horizontal{
  border:none!important;
}
}

</style>
