
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
  <div class="app-list">
    <div
      class="app-list-top"
      :class="zoom===2?'top-center':'top-right'"
    >
      <div
        class="zoom app-btn"
        title="缩小"
        @click.stop="changeView(1)"
      />
      <div
        class="app-btn"
        :class="isSearchActive?'search-active':'search-default'"
        title="搜索"
        @click.stop="searchProject()"
      />
      <div
        class="app-btn"
        :class="isViewActive?'view-active':'view-default'"
        title="更多"
        @click.stop="changeView(2)"
      />
    </div>
    <div
      class="app-main"
      :class="zoom===2?'':'app-flex-main'"
    >
      <div
        class="app-list-title"
        v-if="zoom!==2"
      >
        新建项目/最近创建
      </div>
      <div
        class="app-list-main"
        :class="zoom===2?'':'app-flex-items'"
      >
        <ListComp
          :data-list="currentAppList"
          :class="zoom===2?'':'app-flex-items'"
        />
      </div>
      <div
        class="app-list-title"
        v-if="zoom!==2"
      >
        创建完成
      </div>
      <div
        class="app-list-main"
      >
        <ListComp
          :data-list="filterStatus('CREATED')"
          :class="zoom===2?'':'app-flex-items'"
        />
      </div>
      <div
        class="app-list-title"
        v-if="zoom!==2"
      >
        部署完成
      </div>
      <div
        class="app-list-main"
      >
        <ListComp
          :data-list="filterStatus('CONFIGURED')"
          :class="zoom===2?'':'app-flex-items'"
        />
      </div>
      <div
        class="app-list-title"
        v-if="zoom!==2"
      >
        部署失败
      </div>
      <div
        class="app-list-main"
      >
        <ListComp
          :data-list="filterStatus('DEPLOYED')"
          :class="zoom===2?'':'app-flex-items'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { applicationApi } from '../../../api/developerApi.js'
import ListComp from './ListComp.vue'
export default {
  name: 'ApplicationList',
  components: {
    ListComp
  },
  props: {
    zoom: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allAppList: [],
      currentAppList: [
        {
          id: 0,
          type: 'normal',
          iconUrl: require('../../../assets/images/projects/pro_add_new.png'),
          name: '新增项目'
        }
      ],
      searchValue: '',
      isSearchActive: false,
      isViewActive: false
    }
  },
  methods: {
    changeView (val) {
      this.$emit('zoomChanged', val)
    },
    searchProject () {
      this.isSearchActive = true
    },
    initApplicationList () {
      applicationApi.getApplicationList().then(res => {
        if (res.data && res.data.results.length > 0) {
          let data = res.data.results
          this.allAppList = data
          data.sort(function (a, b) {
            return b.createTime < a.createTime ? -1 : 1
          })
          data.length > 4 ? this.currentAppList.concat(data.slice(0, 4)) : this.currentAppList.concat(data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    filterStatus (status) {
      return this.allAppList.filter(item => {
        return item.status === status
      })
    }
  },
  mounted () {
    this.initApplicationList()
  }
}
</script>

<style lang='less' scoped>
.app-list {
  .app-list-top{
    display: flex;
    .app-btn{
      width: 20px;
      height: 20px;
      margin: 10px 15px;
      cursor: pointer;
      background-size: cover;
    }
    .zoom{
      background: url("../../../assets/images/projects/pro_zoom_default.png") no-repeat center;
    }
    .search-default{
      background: url("../../../assets/images/projects/pro_search_default.png") no-repeat center;
    }
    .search-active{
      background: url("../../../assets/images/projects/pro_search_after.png") no-repeat center;
    }
    .view-default{
      background: url("../../../assets/images/projects/pro_view_default.png") no-repeat center;
    }
    .view-active{
      background: url("../../../assets/images/projects/pro_view_click.png") no-repeat center;
    }
  }
  .app-list-main{
    margin: 0 auto;
  }
  .top-center{
    justify-content: space-between;
  }
  .top-right{
    justify-content: right;
  }
  .app-flex-items{
    display: flex;
    justify-content: left;
  }
  .app-flex-main{
    margin-left: 50px;
  }
  .app-list-title{
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 35px;
  }
}
</style>
