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
  <div class="appdeploy">
    <div class="deploylist-top-title">
      {{ $t('deployList.deployListTitle') }}
    </div>
    <div class="card-shadow">
      <el-card>
        <el-row>
          <el-col :span="4">
            <Search
              :placeholder="$t('deployList.tip')"
              @getSearchData="getSearchData"
            />
          </el-col>
        </el-row>
        <el-table
          v-loading="dataLoading"
          class="common-table"
          :data="currPageTableData"
          :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <el-table-column
            prop="name"
            width="150"
            sortable
            :label="$t('deployCommon.name')"
          />
          <el-table-column
            prop="version"
            width="120"
            :label="$t('deployCommon.version')"
          />
          <el-table-column
            prop="provider"
            width="160"
            :label="$t('deployCommon.provider')"
          />
          <el-table-column
            prop="type"
            width="140"
            :label="$t('deployList.type')"
          />
          <el-table-column
            prop="industry"
            :label="$t('deployList.industry')"
          />
          <el-table-column
            prop="affinity"
            :label="$t('deployCommon.affinity')"
          />
          <el-table-column
            prop="appstoreName"
            :label="$t('deployList.appstoreName')"
          />
          <el-table-column
            prop="createTime"
            width="120"
            :label="$t('deployList.createTime')"
          />
          <el-table-column
            width="220"
            :label="$t('deployCommon.operation')"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="checkDetail(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('deployList.operationBtn') }}
              </el-button>
            </template>
            />
          </el-table-column>
        </el-table>
        <pagination
          :table-data="paginationData"
          @getCurrentPageData="getCurrentPageData"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import { apm } from '../../api/mecmApi.js'
import { TYPESFORAPP, INDUSTRY } from '../../tools/mecm/constants.js'
import Pagination from '../../components/Pagination.vue'
import Search from '../../components/Search.vue'
export default {
  components: {
    Pagination,
    Search
  },
  data () {
    return {
      dataLoading: false,
      appType: '',
      language: localStorage.getItem('language'),
      tableData: [],
      paginationData: [],
      currPageTableData: [
        {
          name: '位置服务',
          version: 'v1.0',
          provider: 'EdgeGallery',
          type: 'Video',
          industry: 'Smark Park',
          affinity: 'X86',
          appstoreName: 'appstore',
          syncTime: '2021-10-21'
        }
      ],
      serchData: null
    }
  },
  mounted () {
    this.appType = this.$route.query.type ? this.$route.query.type : ''
    this.getDeployListData()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getDeployListData()
    }
  },
  methods: {
    filterTableData (val) {
      this.paginationData = this.paginationData.filter((item) => {
        return Object.keys(item).some((key) => {
          return (
            String(item[key])
              .toLowerCase()
              .indexOf(val) > -1
          )
        })
      })
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    getSearchData (data) {
      this.paginationData = this.tableData
      if (data) {
        this.filterTableData(data.toLowerCase())
      } else {
        this.getDeployListData()
      }
    },
    checkDetail (row) {
      sessionStorage.setItem('appRow', JSON.stringify(row))
      sessionStorage.setItem('appId', row.appId)
      this.$nextTick(
        this.$router.push('/EG/mecm/distribute')
      )
    },
    getDeployListData () {
      apm
        .initApmPackages()
        .then((response) => {
          this.tableData = response.data
          this.tableData.forEach((item) => {
            item.createTime = item.createTime.split('T')[0]
          })
          this.paginationData = this.tableData
          this.checkProjectData()
          if (this.appType) {
            this.filterTableData(this.appType, 'type')
          }
          if (this.serchData) {
            this.getSearchData(this.serchData)
          }
          this.dataLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.dataLoading = false
        })
    },
    checkProjectData () {
      this.tableData.forEach((itemBe) => {
        INDUSTRY.forEach((itemFe) => {
          if (itemBe.industry.match(itemFe.label[1])) {
            let _first = this.language === 'cn' ? itemFe.label[1] : itemFe.label[0]
            let _second = this.language === 'cn' ? itemFe.label[0] : itemFe.label[1]
            itemBe.industry = itemBe.industry.replace(_first, _second)
          }
        })
        this.handleAppstoreType()
      })
    },
    handleAppstoreType (itemBe) {
      TYPESFORAPP.forEach((itemFe) => {
        if (itemBe.type.match(itemFe.label[1])) {
          let _first = this.language === 'cn' ? itemFe.label[1] : itemFe.label[0]
          let _second = this.language === 'cn' ? itemFe.label[0] : itemFe.label[1]
          itemBe.type = itemBe.type.replace(_first, _second)
        }
      })
    }
  }
}
</script>

<style lang="less">
.appdeploy {
  width: 100%;
  height: 100%;
  padding: 32px 15% 0 10%;
  .deploylist-top-title {
    width: 186px;
    height: 66px;
    margin: 2% 0 2% 3%;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 4px;
    background: url("../../assets/images/mecm/appDeployDetailList/deploy_title.png")
      no-repeat center;
  }
  .card-shadow {
    padding: 0px 0 1px 2px;
    border-radius: 17px;
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
        right: 25px;
        top: -3px;
      }
    }
    .el-card {
      border: 1px solid transparent !important;
      border-radius: 16px;
      background: rgba(46,20,124,.7);
      backdrop-filter: blur(6px);
      padding: 35px 16px 7px 24px;
      .el-loading-mask {
        background-color: transparent;
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
      .el-table {
        margin-top: 30px;
        margin-bottom: 50px;
        thead {
          height: 60px;
          border: none;
          font-size: 16px;
        }
        tr {
          height: 64px;
        }
        td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          font-size: 14px;
        }
        .el-table__cell > .cell {
          padding-left: 30px;
        }
        .el-button {
          padding: 0px 11px;
        }
        .el-button--small {
          font-size: 14px;
          width: auto;
          height: 24px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
