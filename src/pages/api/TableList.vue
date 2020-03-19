<template>
  <div class="tablelist">
    <el-table
      v-loading="dataLoading"
      :data="currentData"
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
            type="text"
            class="btn"
            @click="toDetail(scope.row)"
          >
            {{ $t('api.apiDetail') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagebar">
      <pagination
        :table-data="listData"
        @getCurrentPageData="getCurrentPageData"
      />
    </div>
  </div>
</template>

<script>
// import { Get } from './../../tools/tool.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  name: 'Tablelist',
  props: ['tabLabel'],
  components: { pagination },
  data () {
    return {
      listData: [
        {
          pluginName: 'Face Recognition Plugin',
          introduction: 'Face Recognition Demo'
        }
      ],
      dataLoading: false,
      currentData: [
        {
          pluginName: 'Face Recognition Plugin',
          introduction: 'Face Recognition Demo'
        }
      ]
    }
  },
  watch: {
    $route (to, from) {
      this.getListData()
    },
    tabLabel () {
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
  },
  created () {
  },
  methods: {
    getCurrentPageData (val) {
      this.currentData = val
    },
    toDetail (item) {
      // let mecDetailID = JSON.stringify(item.pluginId)
      // sessionStorage.setItem('mecDetailID', mecDetailID)
      this.$router.push({
        name: 'apidetail'
        // params: {
        //   id: mecDetailID
        // }
      })
    },
    getListData () {
      if (this.tabLabel === 'Face') {
        // Get('mecapi/developer/v1/plugins/?pluginType=1').then(res => {
        //   this.listData = res.data.plugins
        //   this.dataLoading = false
        //   console.log(this.listData)
        // })
        this.currentData = this.listData
      } else if (this.tabLabel === 'VR') {
        this.currentData = []
      } else if (this.tabLabel === 'AR') {
        this.currentData = []
      }
    }
  }
}
</script>
