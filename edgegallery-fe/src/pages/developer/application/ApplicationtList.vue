
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
        :title="$t('incubation.zoomOut')"
        @click.stop="changeSmall()"
      />
      <div
        class="app-btn"
        :class="isSearchActive?'search-active':'search-default'"
        :title="$t('incubation.search')"
        @click.stop="searchProject()"
      />
      <el-input
        class="search-input"
        v-model="searchContent"
        v-if="isSearchActive"
      >
        <em
          class="el-icon-search el-input__icon cp"
          slot="suffix"
          @click="searchApp"
        />
      </el-input>
      <div
        class="app-btn delete-default"
        :title="$t('incubation.delete')"
        v-if="zoom>2"
        @click.stop="deleteApp()"
      />
      <div
        class="app-btn"
        :class="isViewActive?'view-active':'view-default'"
        :title="isViewActive?$t('incubation.putAway'):$t('incubation.more')"
        @click.stop="changeView(isViewActive)"
      />
    </div>
    <div
      class="app-main"
      :class="zoom===2?'':'app-flex-main'"
    >
      <div
        v-if="userName && userName==='guest'"
        class="guest"
      >
        <span @click="logout">{{ $t('common.login') }}</span>
      </div>
      <div
        class="app-list-title"
        v-if="zoom!==2"
      >
        {{ $t('incubation.newAndRecent') }}
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
          :zoom="zoom"
        />
      </div>
      <div
        class="app-list-main"
        v-if="zoom!==2"
      >
        <div
          class="app-list-title"
        >
          {{ $t('incubation.others') }}
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
    <Pagination
      class="app-pagenation"
      :table-data="allAppList"
      :list-total="allAppList.length"
      v-if="zoom!==2"
    />
  </div>
</template>

<script>
import { logoutApi } from '../../../tools/tool.js'
import { PROXY_PREFIX_CURRENTSERVER } from '../../../tools/constant.js'
import { applicationApi } from '../../../api/developerApi.js'
import Pagination from '../../../components/Pagination.vue'
import ListComp from './ListComp.vue'
export default {
  name: 'ApplicationList',
  components: {
    ListComp,
    Pagination
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
      isDeleteActive: false,
      searchContent: '',
      userName: sessionStorage.getItem('userName'),
      loginPage: sessionStorage.getItem('loginPage') || '',
      appList: []
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
        this.isSearchActive = false
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
      if (!this.isViewActive) {
        this.isViewActive = true
        this.changeView(false)
      }
    },
    searchApp () {
      this.allAppList = this.appList
      if (this.searchContent) {
        this.allAppList = this.allAppList.filter(item => {
          return item.name.toLowerCase().indexOf(this.searchContent) > -1
        })
      } else {
        return this.appList
      }
    },
    deleteApp () {
      this.isDeleteActive = !this.isDeleteActive
    },
    refreshList () {
      this.initApplicationList()
    },
    initApplicationList () {
      let tempData = [
        {
          id: 0,
          type: 'normal',
          iconUrl: require('../../../assets/images/application/app_add_new.png'),
          name: ''
        }
      ]
      applicationApi.getApplicationList().then(res => {
        let data = res.data.results
        this.appList = data
        this.allAppList = data
        data.sort(function (a, b) {
          return b.createTime < a.createTime ? -1 : 1
        })
        data.length > 4 ? this.currentAppList = tempData.concat(data.slice(0, 4)) : this.currentAppList = tempData.concat(data)
      }).catch(err => {
        console.log(err)
      })
    },
    logout () {
      this.manualLoggout = true
      logoutApi().then(() => {
        this.enterLoginPage()
      }).catch(err => {
        console.log(err)
        this.enterLoginPage()
      })
    },
    enterLoginPage () {
      window.location.href = this.loginPage + '&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER
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
  height: 725px;
  .app-list-top{
    display: flex;
    .app-btn{
      width: 20px;
      height: 20px;
      margin: 10px 15px;
      cursor: pointer;
      background-size: cover;
      position: relative;
    }
    .search-input{
      width: 180px;
      position: absolute;
      top: 45px;
      left: 85%;
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
  .app-pagenation{
    position: relative;
    right: 25px;
  }
  .guest{
    width: 100%;
    text-align: center;
    margin-top: 350px;
    span{
      cursor: pointer;
    }
  }
}
.el-input__icon{
  line-height: 30px!important;
}
</style>
