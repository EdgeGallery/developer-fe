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
  <div class="workspace padding_default">
    <div class="title_bg" />
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('nav.workSpace') }}
      <span class="line_bot1" />
      <el-button
        class="newproject_btn"
        id="newproject_btn"
        @click="jumpTo"
      >
        <em class="new_icon" />
        {{ $t('workspace.addNewProject') }}
      </el-button>
    </div>
    <div class="project_list">
      <projectList ref="projectList" />
    </div>
  </div>
</template>

<script>
import projectList from './ProjectList.vue'

export default {
  name: 'Workspace',
  components: {
    projectList
  },
  data () {
    return {}
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/work/detail') === -1) {
      sessionStorage.removeItem('currentPage')
    }
    next()
  },
  methods: {
    jumpTo () {
      this.$router.push('/mecDeveloper/projectType')
    }
  }
}
</script>

<style lang="less">
.workspace{
  position: relative;
  .newproject_btn{
    position: absolute;
    right: 0;
    bottom: -80px;
    height: 64px;
    background: #5844be;
    color: #fff;
    font-size: 20px;
    border-radius: 10px;
    min-width: 210px;
    .new_icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url('../../assets/images/work_new_project.png');
      margin-right: 10px;
      position: relative;
      top: 2px;
    }
  }
  .newproject_btn:hover{
    background: #3a2898;
  }
}
</style>
