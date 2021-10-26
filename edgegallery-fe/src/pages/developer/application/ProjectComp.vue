
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
  <div class="project-list">
    <div
      class="project-list-top"
      :class="zoom===2?'top-center':'top-right'"
    >
      <div
        class="zoom project-btn"
        title="缩小"
        @click.stop="changeZoom(1)"
      />
      <div
        class="search project-btn"
        title="搜索"
      />
      <div
        class="switch project-btn"
        title="更多"
        @click.stop="changeZoom(2)"
      />
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="searchValue"
        class="porject-search-input"
      />
    </div>
    <div
      class="project-main"
      :class="zoom===2?'':'project-flex-main'"
    >
      <div
        class="project-list-title"
        v-if="zoom!==2"
      >
        新建项目/最近创建
      </div>
      <div
        class="project-list-main"
        :class="zoom===2?'':'project-flex-items'"
      >
        <div
          v-for="(item,index) in projectList"
          :key="index"
          class="project-item"
        >
          <img
            :src="item.icon"
            :alt="item.name"
          >
          <div>
            {{ item.name }}
          </div>
          <div>
            {{ item.status }}
          </div>
        </div>
      </div>
      <div
        class="project-list-title"
        v-if="zoom!==2"
      >
        部署完成
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    zoom: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      projectList: [
        {
          id: 1,
          type: 'normal',
          icon: require('../../../assets/images/projects/pro_add_new.png'),
          name: '新增项目'
        },
        {
          id: 2,
          type: 'pro',
          icon: require('../../../assets/images/projects/pro_current_pro.png'),
          name: 'app1'
        }, {
          id: 3,
          type: 'pro',
          icon: require('../../../assets/images/projects/pro_history_pro.png'),
          name: 'app2'
        }, {
          id: 4,
          type: 'pro',
          icon: require('../../../assets/images/projects/pro_history_pro.png'),
          name: 'app3'
        }
      ],
      searchValue: ''
    }
  },
  methods: {
    changeZoom (val) {
      this.$emit('zoomChanged', val)
    }
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
.project-list {
  .project-list-top{
    display: flex;
    .project-btn{
      width: 20px;
      height: 20px;
      margin: 10px 15px;
      cursor: pointer;
    }
    .zoom{
      background: url("../../../assets/images/projects/pro_zoom_out.png") no-repeat center;
      background-size: cover;
    }
    .search{
      background: url("../../../assets/images/projects/pro_search.png") no-repeat center;
      background-size: cover;
    }
    .switch{
      background: url("../../../assets/images/projects/pro_switch_view.png") no-repeat center;
      background-size: cover;
    }
  }
  .top-center{
    justify-content: space-between;
  }
  .top-right{
    justify-content: right;
  }
  .project-list-main{
    margin: 0 auto;
    .project-item{
      text-align: center;
      cursor: pointer;
      padding: 10px 15px;
    }
  }
  .project-flex-items{
    display: flex;
    justify-content: left;
  }
  .project-flex-main{
    margin-left: 50px;
  }
  .project-list-title{
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 35px;
  }
  .porject-search-input{
    position: absolute;
    top: 46px;
    width: 180px;
    z-index: 988;
  }
}
.el-input__inner{
  height: 30px !important;
  line-height: 30px !important;
}
</style>
