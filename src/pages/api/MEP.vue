<template>
  <div class="mepapi">
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
      <el-breadcrumb-item>{{ $t('nav.mepApi') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mep-main">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="$t('api.network')"
          name="Network"
          lazy
        />
        <el-tab-pane
          :label="$t('api.computing')"
          name="Computing"
          lazy
        />
        <el-tab-pane
          :label="$t('api.ai')"
          name="AI"
          lazy
        />
        <el-tab-pane
          :label="$t('api.video')"
          name="Video"
          lazy
        />
      </el-tabs>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="pluginName"
          :label="$t('api.name')"
          width="260"
        />
        <el-table-column
          prop="introduction"
          :label="$t('api.description')"
        />
        <el-table-column
          label=""
          width="160"
        >
          <template slot-scope="scope">
            <el-button
              id="detailBtn"
              type="primary"
              size="mini"
              class="btn"
              @click="toDetail(scope.row)"
            >
              {{ $t('api.apiDetail') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mepapi',
  data () {
    return {
      activeName: 'Network',
      tableData: []
    }
  },
  mounted () {},
  created () {},
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/api/detail') === -1) {
      sessionStorage.removeItem('currentPage')
      sessionStorage.removeItem('activeNameapp')
    }
    next()
  },
  methods: {
    handleClick (tab) {
    }
  }
}
</script>

<style lang="less">
.mepapi{
  .mep-main{
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
  }
  .el-tab-pane{
    padding-top: 20px;
  }
}

</style>
