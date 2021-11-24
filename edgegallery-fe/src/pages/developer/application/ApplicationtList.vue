
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
        @click.stop="changeSmall()"
      />
      <div
        class="app-btn"
        :class="isSearchActive?'search-active':'search-default'"
        title="搜索"
        @click.stop="searchProject()"
      />
      <div
        class="app-btn delete-default"
        title="删除"
        v-if="zoom>2"
        @click.stop="deleteApp()"
      />
      <div
        class="app-btn"
        :class="isViewActive?'view-active':'view-default'"
        title="更多"
        @click.stop="changeView(isViewActive)"
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
        新建应用/最近操作
      </div>
      <div
        class="app-list-main"
        :class="zoom===2?'':'app-flex-items'"
      >
        <ListComp
          :data-list="currentAppList"
          @putAway="putAway"
          @refreshList="refreshList"
          :show-delete-btn="isDeleteActive"
          :class="zoom===2?'':'app-flex-items'"
        />
      </div>
      <div
        class="app-list-main"
        v-if="zoom!==2"
      >
        <div
          class="app-list-title"
        >
          其他分类
        </div>
        <ListComp
          :data-list="allAppList"
          @putAway="putAway"
          @refreshList="refreshList"
          :show-delete-btn="isDeleteActive"
          class="app-flex-items"
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
  computed: {
    zoom (val) {
      return Number(this.$store.state.zoom)
    },
    currentFlow (val) {
      return Number(this.$store.state.currentFlow)
    }
  },
  data () {
    return {
      allAppList: [],
      currentAppList: [],
      searchValue: '',
      isSearchActive: false,
      isViewActive: false,
      isDeleteActive: false
    }
  },
  watch: {
    currentFlow (val) {
      this.initApplicationList()
    }
  },
  methods: {
    changeView (val) {
      this.isViewActive = !val
      val ? this.$emit('zoomChanged', 3) : this.$emit('zoomChanged', 2)
      if (!this.isViewActive) {
        this.isDeleteActive = false
      }
    },
    putAway (val) {
      if (this.isViewActive) {
        this.isViewActive = val
      }
      this.$emit('zoomChanged', 3)
      this.isDeleteActive = false
    },
    changeSmall () {
      this.$emit('zoomChanged', 1)
      this.isDeleteActive = false
    },
    searchProject () {
      this.isSearchActive = true
    },
    deleteApp () {
      this.isDeleteActive = !this.isDeleteActive
    },
    refreshList () {
      this.initApplicationList()
    },
    initApplicationList () {
      applicationApi.getApplicationList().then(res => {
        if (res.data && res.data.results.length > 0) {
          let data = res.data.results
          this.allAppList = data
          data.sort(function (a, b) {
            return b.createTime < a.createTime ? -1 : 1
          })
          let tempData = [
            {
              id: 0,
              type: 'normal',
              iconUrl: require('../../../assets/images/application/app_add_new.png'),
              name: '新增应用'
            }
          ]
          data.length > 4 ? this.currentAppList = tempData.concat(data.slice(0, 4)) : this.currentAppList = tempData.concat(data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.initApplicationList()
    if (this.zoom > 2) {
      this.isViewActive = true
    }
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
      background: url("../../../assets/images/application/app_zoom_default.png") no-repeat center;
    }
    .search-default{
      background: url("../../../assets/images/application/app_search_default.png") no-repeat center;
    }
    .search-active{
      background: url("../../../assets/images/application/app_search_after.png") no-repeat center;
    }
    .delete-default{
      background: url("../../../assets/images/application/app_delete_default.png") no-repeat center;
    }
    .delete-active{
      background: url("../../../assets/images/application/app_delete_click.png") no-repeat center;
    }
    .view-default{
      background: url("../../../assets/images/application/app_view_default.png") no-repeat center;
      background-size: cover;
    }
    .view-active{
      background: url("../../../assets/images/application/app_put_away.png") no-repeat center;
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
    flex-wrap: wrap;
  }
  .app-flex-main{
    margin-left: 50px;
    overflow-y: auto;
  }
  .app-list-title{
    font-size: 20px;
    font-weight: 400;
    margin: 15px 0;
  }
}
</style>
