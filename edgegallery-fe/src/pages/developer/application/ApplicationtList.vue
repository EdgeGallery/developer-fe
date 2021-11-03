
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
        <div
          v-for="(item,index) in projectList"
          :key="index"
          class="app-item"
          @click.stop="index===0?createNewProject():checkProjectDetail(item)"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            :class="item.status==='creating'?'current':''"
          >
          <div>
            {{ item.name }}
          </div>
          <div
            class="app-common-status"
            v-if="item.id!==1"
            :class="item.status==='creating'?'app-creating':(item.status==='success'?'app-success':(item.status==='failed'?'app-failed':'app-published'))"
          >
            {{ switchStatus(item.status) }}
          </div>
        </div>
      </div>
      <div
        class="app-list-title"
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
          name: '云讯智能',
          status: 'creating'
        }, {
          id: 3,
          type: 'pro',
          icon: require('../../../assets/images/projects/pro_history_pro.png'),
          name: 'PBC检测',
          status: 'failed'
        }, {
          id: 4,
          type: 'pro',
          icon: require('../../../assets/images/projects/pro_history_pro.png'),
          name: '安恒WAF',
          status: 'published'
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
    createNewProject () {
      this.$emit('createNewProject', true)
    },
    searchProject () {
      this.isSearchActive = true
    },
    checkProjectDetail (item) {
      console.log(item)
    },
    switchStatus (status) {
      return status === 'creating' ? '创建中' : (status === 'success' ? '创建成功' : (status === 'failed' ? '创建失败' : '已发布'))
    }
  },
  mounted () {}
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
  .top-center{
    justify-content: space-between;
  }
  .top-right{
    justify-content: right;
  }
  .app-list-main{
    margin: 0 auto;
    .app-item{
      text-align: center;
      cursor: pointer;
      padding: 20px 15px;
      img{
        width: 66px;
        height: 66px;
      }
      img.current{
        border: 3px solid #42F6AC;
        border-radius: 66px;
      }
    }
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
  .porject-search-input{
    position: absolute;
    top: 46px;
    width: 180px;
    z-index: 988;
  }
  .app-common-status{
    font-size: 10px;
  }
  .app-common-status::before{
    content:"";
    display: inline-block;
    width: 18px;
    height: 18px;
    position: relative;
    top: 5px;
    left: 3px;
  }
  .app-creating::before{
    background: url('../../../assets/images/projects/pro_creating.png') no-repeat center;
  }
  .app-success::before{
    background: url('../../../assets/images/projects/pro_success.png') no-repeat center;
  }
  .app-failed::before{
    background: url('../../../assets/images/projects/pro_failed.png') no-repeat center;
  }
  .app-published::before{
    background: url('../../../assets/images/projects/pro_published.png') no-repeat center;
  }
}
</style>
