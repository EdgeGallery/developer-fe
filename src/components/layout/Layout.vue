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
    <el-container>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout'
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
