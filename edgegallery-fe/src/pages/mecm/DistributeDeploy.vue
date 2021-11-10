<template>
  <div class="distribute-deploy">
    <div class="card-shadow">
      <el-card>
        <div class="common-dlg-title distribute-deploy-top-title">
          {{ $t("distributeDeploy.title") }}
        </div>
        <el-row>
          <el-col :span="4">
            <Search
              :placeholder="$t('distributeDeploy.tip')"
              @getSearchData="getSearchData"
            />
          </el-col>
        </el-row>
        <el-table
          class="common-table"
          :data="currPageTableData"
          v-loading="dataLoading"
        >
          <el-table-column
            prop="appPackageName"
            :label="$t('deployCommon.name')"
          >
            <template>
              <div>
                {{ this.appPackageName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="appVersion"
            :label="$t('deployCommon.version')"
          >
            <template>
              <div>
                {{ this.appVersion }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="provider"
            :label="$t('deployCommon.provider')"
          >
            <template>
              <div>
                {{ this.provider }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="appAffinity"
            :label="$t('deployCommon.affinity')"
          >
            <template>
              <div>
                {{ this.appAffinity }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="hostIp"
            :label="$t('distributeDeploy.hostIp')"
          />
          <el-table-column
            prop="status"
            :label="$t('distributeDeploy.status')"
          >
            <template slot-scope="scope">
              <span :class="changeIcon(scope.row.status)" />
              <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="250"
            :label="$t('deployCommon.operation')"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="beforeDelete(scope.row)"
                type="text"
                size="small"
              >
                {{ $t("distributeDeploy.delete") }}
              </el-button>
              <el-button
                @click="checkDetail(scope.row)"
                type="text"
                size="small"
              >
                {{ $t("distributeDeploy.deploy") }}
              </el-button>
            </template>
            />
          </el-table-column>
        </el-table>
        <Pagination
          :page-sizes="[10,15,20,25]"
          :table-data="paginationData"
          @getCurrentPageData="getCurrentPageData"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import { appDeploy } from '../../api/mecmApi'
import Search from '../../components/Search.vue'
import Pagination from '../../components/Pagination.vue'
export default {
  components: {
    Search, Pagination
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      appId: window.location.href.split('=')[1] || sessionStorage.getItem('appId'),
      loading: false,
      currPageTableData: [],
      paginationData: [],
      searchVal: '',
      selectData: null,
      selectedData: [],
      appPackageId: '',
      appVersion: '',
      appPackageName: '',
      appAffinity: '',
      provider: '',
      dialogVisible: false,
      dataLoading: true,
      tableData: [],
      packageData: [],
      interval: null,
      instanceId: '',
      timer: null,
      distributionStatus: ['Distributed', 'Error'],
      serchData: null,
      hostList: [],
      templateInputs: [],
      capabilities: ['GPU', 'NPU'],
      currentPage: 1
    }
  },
  methods: {
    getDistributeDeployList () {
      appDeploy.getDistributeDeployList(this.userId).then((res) => {
        this.paginationData = []
        res.data.forEach((item) => {
          if (item.appId === this.appId) {
            this.appPackageId = item.appPkgId
            this.appPackageName = item.appPkgName
            this.appVersion = item.appPkgVersion
            this.appAffinity = item.appPkgAffinity
            this.provider = item.appProvider
            this.paginationData = item.mecHostInfo
          }
        })
        this.tableData = this.paginationData
        if (this.serchData) {
          this.getSearchData(this.serchData)
        }
        this.dataLoading = false
      })
        .catch((error) => {
          console.log(error)
          this.dataLoading = false
          this.tableData = this.paginationData = []
        })
    },
    // Filter Table Data
    filterTableData (val) {
      this.paginationData = this.paginationData.filter((item) => {
        return Object.keys(item).some((key) => {
          return String(item[key]).toLowerCase().indexOf(val) > -1
        })
      })
    },
    getSearchData (data) {
      this.serchData = data
      this.paginationData = this.tableData
      if (data) {
        this.filterTableData(data.toLowerCase())
      } else {
        this.initList()
      }
    },
    beforeDelete (rows) {
      this.$eg_messagebox(this.$t('distributeDeploy.beforeDeleteFromMechost'), 'warning')
        .then(() => {
          let hostIp = rows.hostIp
          let type = 1
          appDeploy.deleteDistributionApp(type, hostIp, this.appPackageId, this.userId).then(res => {
            this.getDistributeDeployList()
          })
        })
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    changeIcon (val) {
      if (val === 'Processing') {
        return 'processing'
      } else if (val === 'Distributed' || val === 'uploaded') {
        return 'success'
      } else {
        return 'failed'
      }
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
      clearTimeout(this.timer)
      this.timer = null
    },
    checkDetail (item) {
      this.$router.push('/EG/mecm/deployConfig')
    }
  },
  mounted () {
    this.getDistributeDeployList()
    this.interval = setInterval(() => {
      this.getDistributeDeployList()
    }, 15000)
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>

<style lang="less">
.distribute-deploy {
  width: 100%;
  height: 100%;
  padding: 80px 15% 0 10%;
  .card-shadow {
    padding: 0px 0 1px 2px;
    border-radius: 17px;
    border: 1px solid;
    border-color: rgba(182, 164, 236, 0.6);
    box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.3);
    .distribute-deploy-top-title {
      color: #fff;
      margin-left: -15px;
    }
    .el-row {
      input {
        color: #fff;
      }
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        width: 200px;
        border-radius: 6px;
        border-color: rgba(171, 151, 229, 1);
        background-color: rgba(182, 164, 236, 0.3);
        box-shadow: -1px -1px 3px rgba(175, 163, 212, 0.6);
      }
      .el-input__suffix {
        top: -3px;
      }
    }
    .el-card {
      border: 1px solid rgba(171, 151, 229, 1);
      border-radius: 17px;
      background: url("../../assets/images/mecm/deployCommon/deploy_bg.png")
        center;
      box-shadow: 1px 1px 3px #ab97e5 inset;
      .common-dlg-title:before {
        right: 5px;
      }
      .el-card__body {
        padding: 52px 109px 65px 112px;
      }
      .el-table {
        margin-top: 30px;
        margin-bottom: 50px;
        thead {
          height: 30px;
          border: none;
          font-size: 16px;
        }
        tr {
          height: 30px;
        }
        td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          font-size: 14px;
        }
        .el-table__cell > .cell {
          padding-left: 30px;
        }
        .el-button {
          padding: 0px 5px;
        }
        .el-button--small {
          font-size: 14px;
          width: auto;
          height: 24px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 6px;
        }
        .processing {
          padding: 10px 14px;
          background: url("../../assets/images/mecm/distributeDeploy/processing.png")
            no-repeat center;
        }
        .failed {
          padding: 10px 14px;
          background: url("../../assets/images/mecm/distributeDeploy/failed.png")
            no-repeat center;
        }
        .success {
          padding: 10px 14px;
          background: url("../../assets/images/mecm/distributeDeploy/success.png")
            no-repeat center;
        }
      }
      .el-pagination {
        text-align: right;
        font-weight: normal;
        .el-pagination__total {
          float: none;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          color: #fff;
        }
        .el-pagination__jump {
          display: inline-block !important;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          color: #fff;
        }
        .el-pagination__sizes {
          height: 24px;
          line-height: 24px;
        }
        .el-select .el-input {
          height: 24px;
          line-height: 24px;
        }
        .el-pagination__editor {
          height: 24px;
        }
        .el-input--mini {
          height: 24px;
          line-height: 22px;
          font-size: 14px;
        }
        .el-input__inner {
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.3);
          color: #fff;
        }
        .el-input__icon {
          line-height: 22px;
        }
        .btn-prev .el-icon,
        .btn-next .el-icon {
          font-size: 14px;
          height: 24px;
          line-height: 26px;
        }
        .el-pager li {
          font-size: 14px;
          font-weight: 200;
          height: 24px;
          line-height: 24px;
          background: none;
          color: #fff;
        }
        button {
          height: 24px;
          line-height: 24px;
          background: none;
          color: #fff;
        }
        .active {
          background-color: rgba(66, 35, 165, 0.5) !important;
        }
      }
    }
  }
}
</style>
