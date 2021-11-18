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
  <div class="distribute">
    <div class="card-shadow">
      <el-card>
        <div class="common-dlg-title distribute-top-title">
          {{ $t("distribute.title") }}
        </div>
        <el-row>
          <el-col :span="4">
            <Search
              :placeholder="$t('deployCommon.tip')"
              @getSearchData="getSearchData"
            />
          </el-col>
        </el-row>
        <el-table
          class="common-table"
          ref="multipleEdgeNodeTable"
          :data="currPageEdgeNodeTableData"
          v-loading="dataLoading"
          @selection-change="handleEdgeNodeSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            prop="mechostName"
            :label="$t('deployCommon.name')"
          />
          <el-table-column
            prop="mechostIp"
            :label="$t('distribute.ip')"
          />
          <el-table-column
            width="300"
            prop="city"
            :label="$t('distribute.city')"
          />
          <el-table-column
            prop="affinity"
            :label="$t('deployCommon.affinity')"
          />
          <el-table-column
            prop="mepmIp"
            :label="$t('distribute.MEPM')"
          />
          <el-table-column :label="$t('distribute.hwCapability')">
            <template slot-scope="scope">
              <span
                v-for="(item, index) in scope.row.hwcapabilities"
                :key="index"
              >
                {{ item.hwType }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="distribute-pagination">
          <Pagination
            :size="5"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
        <div class="distribute-btn">
          <el-button @click="cancel()">
            {{ $t("common.cancel") }}
          </el-button>
          <el-button @click="distributeConfirm()">
            {{ $t("common.confirm") }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { inventory, apm } from '../../api/mecmApi'
import Search from '../../components/Search.vue'
import Pagination from '../../components/Pagination.vue'
export default {
  components: {
    Search,
    Pagination
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      edgeNodesData: [],
      currPageEdgeNodeTableData: [
        {
          mechostName: 'VMNode',
          mechostIp: '192.168.1.156',
          city: '陕西省/西安市/高新区',
          affinity: 'X86',
          mepmIp: '192.168.1.156',
          hwcapabilities: [
            {
              hwType: 'GPU'
            }
          ]
        }
      ],
      paginationData: [],
      serchData: null,
      dataLoading: false,
      nodeSelection: [],
      currentPage: 1
    }
  },
  methods: {
    distribute () {
      let row = JSON.parse(sessionStorage.getItem('appRow'))
      this.currentRowData = row
      this.getNodeList()
    },
    async getNodeList () {
      await inventory
        .getEdgeNodeList()
        .then((response) => {
          this.paginationData = []
          this.paginationData = response.data
          this.edgeNodesData = this.paginationData
          if (this.serchData) {
            this.getSearchData(this.serchData)
          }
          this.dataLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.dataLoading = false
          this.edgeNodesData = this.paginationData = []
        })
    },
    getCurrentPageData (data) {
      this.currPageEdgeNodeTableData = data
    },
    getSearchData (data) {
      this.serchData = data
      this.paginationData = this.edgeNodesData
      if (data) {
        this.filterTableData(data.toLowerCase())
      } else {
        this.getNodeList()
      }
    },
    filterTableData (val) {
      this.paginationData = this.edgeNodesData.filter(
        (data) => !val || data.mechostName.toLowerCase().includes(val)
      )
    },
    handleEdgeNodeSelectionChange (val) {
      this.nodeSelection = val
      this.selectedNodeNum = val.length
    },
    cancel () {
      this.$refs.multipleEdgeNodeTable.clearSelection()
      this.$router.push('/EG/mecm/appDeployDetail')
    },
    async distributeConfirm () {
      let selectedMecHost = []
      this.nodeSelection.forEach((data) => {
        let obj = {}
        obj.hostIp = data.mechostIp
        selectedMecHost.push(obj)
      })
      this.$refs.multipleEdgeNodeTable.clearSelection()
      this.isSecureBackend = sessionStorage.getItem('isSecureBackend')
      let address = 'http://'
      if (this.isSecureBackend === 'true') {
        address = 'https://'
      }
      if (this.currentRowData.version && selectedMecHost.length > 0) {
        let params = {
          appPkgId: this.currentRowData.packageId,
          appId: this.currentRowData.appId,
          appPkgName: this.currentRowData.name,
          appPkgVersion: this.currentRowData.version,
          appPkgDesc: this.currentRowData.shortDesc
            ? this.currentRowData.shortDesc
            : 'none',
          appPkgAffinity: this.currentRowData.affinity,
          appPkgPath:
          address +
          this.currentRowData.appstoreEndpoint +
          '/mec/appstore/v1/apps/' +
          this.currentRowData.appId +
          '/packages/' +
          this.currentRowData.packageId +
          '/action/download',
          appProvider: this.currentRowData.provider,
          mecHostInfo: selectedMecHost,
          createdTime: new Date().toString(),
          modifiedTime: new Date().toString()
        }
        apm
          .distributeApp(params, this.userId)
          .then((response) => {
            sessionStorage.setItem('appId', params.appId)
            this.$nextTick(this.$router.push('/EG/mecm/distributeDeploy'))
          })
          .catch(() => {
            this.$eg_messagebox(
              this.$t('distribute.failedToDistribute'),
              'warning'
            )
          })
      } else {
        if (selectedMecHost.length === 0) {
          this.$eg_messagebox(this.$t('distribute.selectMecHost'), 'warning')
        } else {
          this.$eg_messagebox(this.$t('distribute.selectVersion'), 'warning')
        }
      }
    }
  },
  mounted () {
    this.distribute()
  }
}
</script>

<style lang="less">
.distribute {
  width: 100%;
  height: 100%;
  padding: 80px 15% 0 10%;
  .card-shadow {
    padding: 0px 0 1px 2px;
    border-radius: 17px;
    .distribute-pagination {
      height: 30px;
    }
    .distribute-top-title {
      color: #fff;
      margin-left: -15px;
      margin-bottom: 30px;
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
      border: 1px solid transparent !important;
      border-radius: 16px;
      background: rgba(46,20,124,.7);
      backdrop-filter: blur(6px);
      .common-dlg-title:before {
        right: 5px;
      }
      .el-card__body {
        padding: 40px 90px 40px 100px;
      }
      .el-table {
        margin-top: 10px;
        margin-bottom: 50px;
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #3ac372;
          border-color: #3ac372;
        }
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
      .distribute-btn {
        margin-top: 80px;
        margin-bottom: 40px;
        float: right;
        .el-button--default {
          height: 30px;
          border-radius: 12px;
          color: #5944c0;
          height: 24px;
          line-height: 6px;
        }
        .el-button {
          padding: 8px 29px;
        }
      }
    }
  }
}
</style>
