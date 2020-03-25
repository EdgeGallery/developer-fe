<template>
  <div class="appapi">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">
        API
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.mepecoapi') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-main">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item,index) in openMepEcoName"
          :key="index"
          :label="item"
          :name="item"
          lazy
        />
      </el-tabs>
      <tableList
        :tab-label="activeName"
        ref="tablist"
      />
    </div>
  </div>
</template>

<script>
import { Get } from '../../tools/tool.js'
import tableList from './TableList.vue'
export default {
  name: 'Appapi',
  components: {
    tableList
  },
  data () {
    return {
      activeName: 'Video',
      openMepEcoName: [],
      openMepEco: []
    }
  },
  mounted () {
    this.getOpenMepEcoName()
  },
  created () {
    let tabSelect = sessionStorage.getItem('activeNameApi')
    tabSelect = tabSelect || 'Video'
    this.activeName = this.activeName === tabSelect ? this.activeName : tabSelect
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/api/detail') === -1) {
      sessionStorage.removeItem('currentPage')
      sessionStorage.removeItem('activeNameApi')
    }
    next()
  },
  methods: {
    handleClick (tab) {
      sessionStorage.setItem('activeNameApi', tab.name)
      sessionStorage.setItem('currentPage', 1)
    },
    getOpenMepEcoName () {
      Get('mec/developer/v1/capability-groups/get-openmepeco-api').then(res => {
        this.openMepEco = res.data.openMepEcos
        this.openMepEco.forEach(item => {
          this.openMepEcoName.push(item.name)
        })
        this.openMepEcoName = [...new Set(this.openMepEcoName)]
      })
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
