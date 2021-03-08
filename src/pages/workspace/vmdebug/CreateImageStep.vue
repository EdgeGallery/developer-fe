<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="create_image">
    <p>
      应用调测完成，生成镜像
      <el-button
        type="primary"
        plain
        class="create_image_btn"
      >
        生成
      </el-button>
    </p>
    <el-card class="image_list">
      <div
        slot="header"
      >
        <span class="span_vm">虚机名称</span>
        <span class="span_image">镜像名称</span>
        <span class="span_progress">进度</span>
        <span class="span_status">状态</span>
        <span class="span_operation">操作</span>
      </div>
      <div
        class="list_div clear"
        v-for="(item,index) in imageList"
        :key="index"
      >
        <span class="span_vm lt">{{ item.vmName }}</span>
        <span
          class="span_image lt"
          :title="item.imageName"
        >{{ item.imageName }}</span>
        <span class="span_progress lt">
          <el-progress
            :percentage="item.progress"
            :color="customColorMethod"
          />
        </span>
        <span class="span_status lt">{{ item.status }}</span>
        <span class="span_operation lt">
          <el-button type="text">下载</el-button>
          <el-button type="text">删除</el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { vmService } from '../../../tools/api.js'
export default {
  name: 'CreateVMImageStep',

  data () {
    return {
      imageList: []
    }
  },
  methods: {
    getCreateImageList () {
      vmService.getCreateImageListApi().then(res => {
        console.log(res.data)
        this.imageList = res.data
      })
    },
    customColorMethod (percentage) {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    }
  },
  created () { },
  mounted () {
    console.log(1)
    this.getCreateImageList()
  },
  beforeDestroy () {
  },
  watch: {
  }
}
</script>

<style lang="less">
.create_image{
  .create_image_btn{
    margin-left: 10px;
  }
  .image_list{
    overflow: auto;
    margin-top: 20px;
    .el-card__header{
      padding: 10px 20px;
      min-width: 715px;
    }
    .el-card__body{
      min-width: 715px;
    }
    .list_div{
      margin-bottom: 30px;
    }
    span{
      display: inline-block;
      cursor: default;
      .el-button span{
        cursor: pointer;
      }
    }
    .span_vm{
      width: 20%;
      min-width: 120px;
    }
    .span_image{
      width: 25%;
      min-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .span_progress{
      width: 25%;
      min-width: 150px;
      .el-progress{
        width: 80%;
      }
    }
    .span_status{
      width: 15%;
      min-width: 100px;
    }
    .span_operation{
      width: 15%;
      min-width: 100px;
    }
  }
}
</style>
