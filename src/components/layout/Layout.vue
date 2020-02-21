<template>
  <div class="layout">
    <el-container>
      <el-container style="position:absolute;height:100%;width:100%;">
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'layout',
  components: {
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less'>
  .layout{
    position: absolute;
    // height: 100%;
    height: calc(100% - 80px);
    width: 100%;
    padding-bottom: 40px;
    .el-footer{
      padding:0;
    }
    .pagebar{
      margin-top:25px;
      float:right;
    }

    /* 修改md文件显示区域滚动条 */
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
    /* 颜色 */
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
      padding: 0 4% 20px;
      margin-top: 65px;
      height: calc(100% - 65px);
    }
    .el-footer{
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
