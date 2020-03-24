<template>
  <div class="tablelist">
    <el-table
      v-loading="dataLoading"
      :data="currentData"
      style="width: 100%"
    >
      <el-table-column
        prop="service"
        :label="$t('api.name')"
        width="260"
      />
      <el-table-column
        prop="description"
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
import { Get } from './../../tools/tool.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  name: 'Tablelist',
  props: {
    tabLabel: {
      type: String,
      default: ''
    }
  },
  components: { pagination },
  data () {
    return {
      listData: [],
      dataLoading: false,
      currentData: [],
      openMeps: []
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
      this.$router.push({
        name: 'apidetail',
        params: {
          apiId: item.apiFileId,
          path: this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1)
        }
      })
    },
    getListData () {
      this.listData = []
      if (this.tabLabel === 'Face Recognition') {
        Get('mec/developer/v1/capability-groups/get-openmep-api').then(res => {
          this.openMeps = res.data.openMeps
          this.listData = []
          this.openMeps.forEach(item => {
            if (item.name === 'Face Recognition') {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        })
      } else if (this.tabLabel === 'Service Discovery') {
        Get('mec/developer/v1/capability-groups/get-openmep-api').then(res => {
          this.openMeps = res.data.openMeps
          this.listData = []
          this.openMeps.forEach(item => {
            if (item.name === 'Service Discovery') {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        })
      } else if (this.tabLabel === 'Bandwidth') {
        Get('mec/developer/v1/capability-groups/get-openmep-api').then(res => {
          this.openMeps = res.data.openMeps
          this.listData = []
          this.openMeps.forEach(item => {
            if (item.name === 'Bandwidth') {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        })
      } else if (this.tabLabel === 'Location') {
        Get('mec/developer/v1/capability-groups/get-openmep-api').then(res => {
          this.openMeps = res.data.openMeps
          this.listData = []
          this.openMeps.forEach(item => {
            if (item.name === 'Location') {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        })
      } else if (this.tabLabel === 'Traffic') {
        Get('mec/developer/v1/capability-groups/get-openmep-api').then(res => {
          this.openMeps = res.data.openMeps
          this.listData = []
          this.openMeps.forEach(item => {
            if (item.name === 'Traffic') {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        })
      } else if (this.tabLabel === 'Video') {
        Get('mec/developer/v1/capability-groups/get-openmepeco-api').then(res => {
          this.openMeps = res.data.openMepEcos
          this.listData = []
          this.openMeps.forEach(item => {
            if (item.name === 'Video') {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        })
      } else {
        this.listData = []
      }
    }
  }
}
</script>
