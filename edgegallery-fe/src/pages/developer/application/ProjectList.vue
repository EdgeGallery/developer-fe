
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
    <div class="project-list-top">
      <div
        class="zoom"
        title="Zoom out"
      />
      <div
        class="search"
        title="Search"
      />
      <div
        class="switch"
        title="Switch view"
      />
    </div>
    <div class="project-list-main">
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
  </div>
</template>

<script>
export default {
  components: {

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
      ]
    }
  },
  methods: {

  },
  mounted () {}
}
</script>

<style lang='less' scoped>
.project-list {
  .project-list-top{
    display: flex;
    justify-content: center;
    div{
      width: 20px;
      height: 20px;
      margin: 10px 8%;
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
  .project-list-main{
    padding-top: 35px;
    margin: 0 auto;
    .project-item{
      height: 120px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
