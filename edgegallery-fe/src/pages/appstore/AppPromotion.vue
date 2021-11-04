<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="padding_default">
    <div
      class="promotion-content"
      :class="isUploadDig?'blur-bg':''"
    >
      <div class="title-btn">
        <span class="pushTitle">
          应用推送
        </span>
        <el-button
          class="test-btn"
          @click="jumpToIncubation"
        >
          返回
        </el-button>
      </div>
      <div class="app-list common-div-bg">
        <div class="batchProm">
          <el-button
            type="primary"
            class="appPull"
            :disabled="isBtnEnable"
            @click="showPushAppDialog"
          >
            批量推送
          </el-button>
        </div>
        <template>
          <el-select
            multiple
            size="small"
            @remove-tag="removeTag($event)"
            v-model="promAppstoreList"
            :placeholder="$t('apppromotion.targetPaltform')"
            class="selectStyle"
          >
            <el-option
              label="All"
              value="All"
              @click.native="getSelectAppstoreData('All')"
            />
            <el-option
              v-for="item in appStoreList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="getSelectAppstoreData(item.value)"
            />
          </el-select>
        </template>
        <div class="search-input">
          <el-input
            size="small"
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="queryApp"
            placeholder="应用名称"
          />
        </div>
        <div class="appPromPackageTable">
          <el-table
            :data="currentPageData"
            :default-sort="{prop: 'latestPushTime', order: 'descending'}"
            @sort-change="sortChanged"
            @selection-change="selectionLineChangeHandle"
            ref="multipleTable"
            :row-key="getRowKeys"
            style="width: 100%"
            class="common-table"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="70"
            />
            <el-table-column
              prop="name"
              label="应用名称"
              sortable="custom"
              width="200"
              :cell-class-name="hiddenClass"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="hover"
                  v-if="scope.row.name.length>20"
                >
                  <div>{{ scope.row.name }}</div>
                  <div slot="reference">
                    {{ scope.row.name }}
                  </div>
                </el-popover>
                <div v-else>
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="provider"
              label="厂商"
            />
            <el-table-column
              prop="version"
              label="版本"
            />
            <el-table-column
              prop="deployMode"
              label="负载类型"
              width="125"
            >
              <template slot-scope="scope">
                {{ scope.row.deployMode==='container'?'容器':'虚拟机' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="latestPushTime"
              label="最后推广时间"
              sortable="custom"
            />
            <el-table-column
              prop="pushTimes"
              label="推广次数"
              sortable="custom"
            />
            <template slot="empty">
              <div>
                <!-- <img
                  src="../../assets/images/empty.png"
                  alt=""
                  style="padding: 10px;"
                > -->
                <p>暂无数据</p>
              </div>
            </template>
            <el-table-column
              label="认证测试报告"
            >
              <template slot-scope="scope">
                <a
                  :href="scope.row.atpTestReportUrl + (language === 'cn' ? '&language=cn' : '&language=en')"
                  target="_blank"
                  class="lookReport"
                >查看报告</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div
          style="margin-top: 20px"
        >
          <Pagination
            :table-data="pageData"
            @getCurrentPageData="getCurrentPageData"
            :list-total="listTotal"
          />
        </div>
      </div>
    </div>
    <div v-if="isUploadDig">
      <PromoteTaskDlg
        ref="promItem"
        v-model="isUploadDig"
        @refreshAppPromInfo="refreshPromData"
        :prom-store-list="promStoreList"
      />
    </div>
  </div>
</template>

<script>
import { appstoreApi } from '../../api/appstoreApi.js'
import PromoteTaskDlg from './PromoteTaskDlg.vue'
import Pagination from '../../components/Pagination.vue'

export default {
  name: 'AppPromotion',
  components: {
    PromoteTaskDlg,
    Pagination
  },
  data () {
    return {
      dataonLineListSelections: [],
      isUploadDig: false,
      appData: [],
      pageData: [],
      appPackageData: [],
      currentPageData: [
        {
          affinity: 'X86',
          appId: '052b038687f8426ea2d0062b80bb8c3a',
          atpTestReportUrl: 'https://192.168.1.38:30094/#/atpreport?taskid=1174e117-57bd-4c51-a7dd-d51da374c4d6',
          atpTestStatus: 'success',
          atpTestTaskId: '1174e117-57bd-4c51-a7dd-d51da374c4d6',
          createTime: '2021-10-13 09:18:18',
          deployMode: 'container',
          industry: 'Smart Park',
          latestPushTime: '2021-11-01 20:30:51',
          name: 'WordPress',
          packageId: 'eaa319cc17a64978ae26a55fe02a4f7d',
          provider: 'OpenSource',
          pushTimes: 3,
          shortDesc: 'zheshi一个验证名称的问题都是上帝发誓',
          sourcePlatform: 'EdgeGallery AppStore',
          targetPlatform: null,
          type: 'Video Application',
          version: 'v1.0'
        }, {
          affinity: 'X86',
          appId: '052b038687f8426ea2d0062b80bb8c3a',
          atpTestReportUrl: 'https://192.168.1.38:30094/#/atpreport?taskid=1174e117-57bd-4c51-a7dd-d51da374c4d6',
          atpTestStatus: 'success',
          atpTestTaskId: '1174e117-57bd-4c51-a7dd-d51da374c4d6',
          createTime: '2021-10-13 09:18:18',
          deployMode: 'container',
          industry: 'Smart Park',
          latestPushTime: '2021-11-01 20:30:51',
          name: 'WordPress',
          packageId: 'eaa319cc17a64978ae26a55fe02a4f7d',
          provider: 'OpenSource',
          pushTimes: 3,
          shortDesc: 'zheshi一个验证名称的问题都是上帝发誓',
          sourcePlatform: 'EdgeGallery AppStore',
          targetPlatform: null,
          type: 'Video Application',
          version: 'v1.0'
        }
      ],
      appStoreList: [],
      promAppstoreList: ['All'],
      isBtnEnable: true,
      nameQuery: '',
      findAppData: [],
      selectedArray: ['All'],
      pageNum: 1,
      pageSize: 10,
      appStoreName: '',
      total: 0,
      curPageSize: 10,
      appName: '',
      language: localStorage.getItem('language'),
      promStoreList: [],
      order: 'desc',
      prop: 'latestPushTime',
      limitSize: 5,
      offsetPage: 0,
      listTotal: 0,
      currentPage: 1
    }
  },
  methods: {
    jumpToIncubation () {
      this.$router.push('/EG/developer/home')
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      sessionStorage.setItem('offsetAppPush', this.offsetPage)
      this.getTableData()
    },
    hiddenClass (row) {
      if (row.columnIndex === 0) {
        return 'hiddenClass'
      }
    },
    getRowKeys (row) {
      return row.packageId
    },
    selectionLineChangeHandle (val) {
      this.dataonLineListSelections = val
      if (this.dataonLineListSelections.length === 0) {
        this.isBtnEnable = true
      } else {
        this.isBtnEnable = false
      }
    },
    getProviders () {
      appstoreApi.promProviderInfo(this.curPageSize, this.offsetPage, this.appStoreName).then((res) => {
        let data = res.data.results
        let index = 1
        data.forEach(item => {
          let _providerItem = {
            number: index,
            value: '',
            label: ''
          }
          _providerItem.value = item.appStoreId
          _providerItem.label = item.appStoreName
          this.appStoreList.push(_providerItem)
          index++
        })
      }).catch(() => {
      })
    },
    showPushAppDialog (row) {
      this.isUploadDig = true
    },
    setPromAppstoreList () {
      for (let idItem of this.promAppstoreList) {
        for (let item of this.appStoreList) {
          if (item.value === idItem) {
            this.promStoreList.push(item)
            break
          }
        }
      }
    },
    savePromData (row) {
      if (!(row instanceof MouseEvent)) {
        sessionStorage.setItem(
          'appstordetail',
          JSON.stringify(row)
        )
      } else {
        sessionStorage.setItem(
          'appstordetail',
          JSON.stringify(this.dataonLineListSelections)
        )
      }
    },
    queryApp () {
      if (this.nameQuery.toLowerCase()) {
        this.pageNum = 1
      }
      this.getTableData()
    },
    getTableData () {
      this.appPackageData = []
      this.findAppData = []
      this.appName = this.nameQuery.toLowerCase()
      if (this.prop === 'name') {
        this.prop = 'appName'
      }
      appstoreApi.getAppPromTable(this.curPageSize, this.offsetPage, this.appName, this.order, this.prop).then((res) => {
        this.total = res.data.total
        this.appPackageData = res.data.results
        this.appPackageData.forEach(item => {
          if (item.latestPushTime) {
            item.latestPushTime = item.latestPushTime.split('.')[0]
          }
          item.targetPlatform = ['All']
        })
        this.currentPageData = this.findAppData = this.appPackageData
      }).catch(() => {
      })
    },
    refreshCurrentData () {
      this.$nextTick(function () {
        this.offsetPage = this.curPageSize * (this.pageNum - 1)
        this.currentPageData = []
        this.currentPageData = this.findAppData
      })
    },
    getSelectAppstoreData (item) {
      if (this.promAppstoreList.indexOf(item) === -1) {
        if (item === 'All') {
          this.promAppstoreList = []
        }
      } else {
        if (item === 'All') {
          this.promAppstoreList = ['All']
        } else {
          let _pos = this.promAppstoreList.indexOf('All')
          if (_pos !== -1) {
            this.promAppstoreList.splice(_pos, 1)
          }
        }
      }
    },
    removeTag (val) {
      if (val === 'All') {
        this.selectedArray = []
      }
    },
    sortChanged (column) {
      if (column.prop == null || column.order == null) {
        this.prop = 'latestPushTime'
        this.order = 'desc'
      } else {
        this.prop = column.prop
        if (column.order === 'ascending') {
          this.order = 'asc'
        } else {
          this.order = 'desc'
        }
      }
      this.getTableData()
    },
    filterItem (fieldArr, typePa, appSort) {
      fieldArr.forEach((fieldItem) => {
        this.findAppData.forEach((item) => {
          if (typePa === 'name' || typePa === 'provider' || typePa === 'version' || typePa === 'messageType') {
            if (item[typePa].toLowerCase() === fieldItem) {
              appSort.push(item)
            }
          } else {
            if (item[typePa] === fieldItem) {
              appSort.push(item)
            }
          }
        })
      })
    },
    refreshPromData (value) {
      if (value) {
        this.getTableData()
        this.nameQuery = ''
      }
    },
    defaultSort () {
      setTimeout(() => {
        this.$refs.multipleTable.sort('latestPushTime', 'descending')
      }, 500)
    }
  },
  destroyed () {
    sessionStorage.removeItem('offsetAppPush')
  },
  mounted () {
    // this.setDivHeight()
    // this.getTableData()
    // this.getProviders()
    // this.defaultSort()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    curPageSize: function () {
      this.getTableData()
    },
    offsetPage: function () {
      this.getTableData()
    },
    findAppData: function () {
      this.refreshCurrentData()
    }
  }
}
</script>

<style lang="less">
  .promotion-content {
    min-height: 500px;
    min-width: 1200px;
    .title-btn{
      padding: 35px 0 20px;
      display: flex;
      justify-content: space-between;
      .pushTitle{
        font-size: 24px;
        font-family: defaultFontBlod, sans-serif;
        font-weight: bold;
        color: #fff;
      }
    }
    .app-list {
      padding: 31px;
      position: relative;
      border-radius:16px ;
      border: 2px solid;
      border-color: rgba(182, 164, 236, 0.6);
      .batchProm {
        margin-left: 10px;
        float: right;
        .appPull{
          box-shadow: 0px 12px 12px -8px rgba(76,85,170,.8);
          font-size: 16px !important;
          font-weight: 300 !important;
          color: #0F0D87;
          background-color: #fff;
          border: none;
        }
      }
      .search-input{
        width: 200px;
        color: #fff;
      }
      .search-input .el-input__inner,.selectStyle .el-input__inner{
        border-radius: 16px;
        background-color: transparent;
      }
      .selectStyle{
        width: 260px;
        color: #fff;
        float: right;
      }
      .appPromPackageTable{
        margin: 20px 0 40px 0;
        .buttonText{
          color:#409eff;
        }
        .lookReport{
          text-decoration: none;
          color: #fff;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 12px;
        }
        .el-table th > .cell {
          font-size: 18px;
          height: 60px;
          line-height: 60px;
          font-weight: lighter;
        }
      .el-table td > .cell {
          height: 80px;
          line-height: 80px;
          font-size: 16px;
        }
      }
    }
  }
  .blur-bg{
    filter: blur(5px);
  }
</style>
