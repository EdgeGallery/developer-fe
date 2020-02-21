<template>
  <div class="appapi">
    <el-breadcrumb separator="/" class="bread-crumb">
        <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">{{$t('breadCrumb.mecDeveloper')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">API</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('breadCrumb.mepecoapi')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('api.faceRecognition')"  name="Face" lazy>
        </el-tab-pane>
        <el-tab-pane label="VR" name="VR" lazy>
        </el-tab-pane>
        <el-tab-pane label="AR" name="AR" lazy>
        </el-tab-pane>
      </el-tabs>
      <tableList :tabLabel="activeName" ref="tablist"/>
    </div>
  </div>
</template>

<script>
import tableList from './TableList'
export default {
  name: 'appapi',
  components: {
    tableList
  },
  data () {
    return {
      activeName: 'Face'
    }
  },
  mounted () {},
  created () {
    let tabSelect = sessionStorage.getItem('activeNameapp')
    tabSelect = tabSelect || 'Face'
    this.activeName = this.activeName === tabSelect ? this.activeName : tabSelect
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/api/detail') === -1) {
      sessionStorage.removeItem('currentPage')
      sessionStorage.removeItem('activeNameapp')
    }
    next()
  },
  methods: {
    handleClick (tab) {
      sessionStorage.setItem('activeNameapp', tab.name)
      sessionStorage.setItem('currentPage', 1)
    }
  }
}
</script>

<style lang="less">
.appapi{
  .app-main{
    background-color: #fff;
    padding: 40px;
    .el-tabs__item.is-active{
      color: #6c92fa;
    }
    .el-tabs__item:hover{
      color: #6c92fa;
    }
    .el-tabs__active-bar{
      background-color: #6c92fa;
    }
    .tablelist{
      .el-table thead{
        th,tr{
          background-color:#f0f3fa;
          padding: 6px 0;
        }
      }
      .el-table{
        .el-button--text{
          color: #6c92fa;
        }
      }
    }
    .tablelist:after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .el-tab-pane{
    padding-top: 20px;
  }
}

</style>
