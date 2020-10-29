<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="ideList">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/list' }">
        {{ $t('breadCrumb.devTools') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('devTools.pluginList') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="list-main clear"
      v-loading="dataLoading"
    >
      <div class="list-top">
        <el-select
          clearable
          v-model="selectCodeLanguage"
          :placeholder="$t('devTools.pluginFunction')"
          class="list-select"
          id="selectFunction"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
        <el-input
          clearable
          v-model="inputPluginName"
          :placeholder="$t('devTools.pluginName')"
          id="enterQuery"
          class="enterinput"
        />
        <el-button
          class="searchBtn"
          @click="searchPluginList"
        >
          {{ $t('test.testTask.inquire') }}
        </el-button>
        <el-button
          class="searchBtn"
          @click="clearSearchData"
        >
          {{ $t('test.testTask.reset') }}
        </el-button>
      </div>
      <div class="list-mian-content">
        <el-table
          :data="searchListData"
          style="width: 100%"
        >
          <el-table-column
            :label="$t('workspace.icon')"
            width="280"
          >
            <template slot-scope="scope">
              <img
                :src="getImageUrl(scope.row.pluginId)"
                class="image"
                :alt="scope.row.pluginName"
              >
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('devTools.description')"
          >
            <template slot-scope="scope">
              <p>
                <span class="span-left">{{ $t('devTools.pluginName') }}:</span>
                <span class="span-right">{{ scope.row.pluginName }}</span>
              </p>
              <p class="info-p clear">
                <span class="span-left">{{ $t('devTools.description') }}:</span>
                <span class="span-right">{{ scope.row.introduction }}</span>
              </p>
              <p>
                <span class="span-left">{{ $t('devTools.author') }}:</span>
                <span class="span-right">{{ scope.row.userName }}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('devTools.score')"
            width="300"
          >
            <template slot-scope="scope">
              <el-rate
                class="p-rate"
                :value="Number(scope.row.satisfaction.toFixed(2))"
                disabled
                show-score
                text-color="#ff9900"
                disabled-void-color="#cccccc"
                score-template="{value}"
              />
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('workspace.operatioin')"
            width="230"
          >
            <template slot-scope="scope">
              <el-link
                :href="getDownloadUrl(scope.row.pluginId)"
                :underline="false"
              >
                <el-button
                  id="downloadBtn"
                  class="btn el-icon-download"
                  type="text"
                  @click="rateConfirm(scope.row)"
                >
                  {{ $t('common.download') }}
                </el-button>
              </el-link>
              <el-button
                id="detailBtn"
                type="text"
                class="btn"
                @click="toDetail(scope.row)"
              >
                {{ $t('devTools.detail') }}
              </el-button>
              <el-button
                id="deleteBtn"
                :disabled="scope.row.userId===userId?false:true"
                type="text"
                class="btn"
                @click="deletePlug(scope.row)"
              >
                {{ $t('devTools.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :visible.sync="centerDialogVisible"
          :close-on-click-modal="false"
          width="30%"
          center
        >
          <span>{{ $t('devTools.deleteList') }}</span>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="centerDialogVisible = false">{{ $t('common.cancel') }}</el-button>
            <el-button
              type="primary"
              @click="deleteTrue(delId,pluginUserId)"
            >{{ $t('common.confirm') }}</el-button>
          </span>
        </el-dialog>
        <el-dialog
          :visible.sync="DialogVisible"
          :close-on-click-modal="false"
          width="30%"
          class="dialog_rate"
        >
          <span class="dialogPadding">{{ $t('devTools.submitRate') }}:</span>
          <el-rate
            v-model="valueRate"
            show-score
            text-color="#ff9900"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            class="rate_top dialogPadding"
            @change="rateChange"
          />
          <span
            slot="footer"
            class="dialog-footer dialogPadding"
          >
            <el-button @click="DialogVisible = false">{{ $t('common.cancel') }}</el-button>
            <el-button
              type="primary"
              @click="rateHandel(rateId)"
            >{{ $t('common.confirm') }}</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="pagebar">
        <pagination
          :table-data="searchListData"
          :list-total="listTotal"
          @getCurrentPageData="getCurrentPageData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Plugin } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'

export default {
  name: 'IdeList',
  components: {
    pagination
  },
  data () {
    return {
      options: [
        {
          value: 0,
          label: 'JAVA'
        }, {
          value: 1,
          label: 'Python'
        }, {
          value: 2,
          label: 'Go'
        }, {
          value: 3,
          label: '.Net'
        }, {
          value: 4,
          label: 'PHP'
        }
      ],
      searchListData: [],
      pluginListData: [],
      selectCodeLanguage: '',
      inputPluginName: '',
      centerDialogVisible: false,
      delId: '',
      pluginUserId: '',
      interval: '',
      DialogVisible: false,
      valueRate: 5,
      rateId: 0,
      dataLoading: true,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      limitSize: 10,
      offsetPage: 0,
      listTotal: 0
    }
  },
  mounted () {
    this.getPluginListData()
  },
  watch: {
    $route (to, from) {
      this.getPluginListData()
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getPluginListData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getPluginListData()
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/ide/detail') === -1) {
      sessionStorage.removeItem('currentPage')
    }
    next()
  },
  methods: {
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    },
    searchPluginList () {
      sessionStorage.setItem('currentPage', 1)
      this.getPluginListData()
    },
    // 获取插件列表
    getPluginListData () {
      Plugin.getPluginListApi(this.limitSize, this.offsetPage, this.inputPluginName, this.selectCodeLanguage).then(res => {
        this.pluginListData = this.searchListData = res.data.results
        this.listTotal = res.data.total
        this.dataLoading = false
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.dataLoading = false
        }, 2000)
      })
    },
    toDetail (item) {
      let mecDetailID = item.pluginId
      sessionStorage.setItem('mecDetailID', mecDetailID)
      this.$router.push({
        name: 'listDetail',
        params: {
          id: mecDetailID
        }
      })
    },
    // 获取插件图标
    getImageUrl (pluginId) {
      return Plugin.getImageUrlApi(pluginId)
    },
    // 获取插件下载路径
    getDownloadUrl (pluginId) {
      return Plugin.getDownloadUrlApi(pluginId)
    },
    // 删除插件
    deletePlug (item) {
      this.centerDialogVisible = true
      this.delId = item.pluginId
      this.pluginUserId = item.userId
    },
    deleteTrue (pluginId, pluginUserId) {
      Plugin.deletePluginApi(pluginId, this.userId).then(res => {
        if (this.userId === pluginUserId) {
          this.getPluginListData()
          this.$message({
            type: 'success',
            message: this.$t('devTools.deleteSucc')
          })
        } else {
          this.$message.error({
            message: this.$t('devTools.deleteFail')
          })
        }
      })
      this.centerDialogVisible = false
    },
    rateConfirm (item) {
      this.rateId = item.pluginId
      this.interval = setInterval(() => {
        this.DialogVisible = true
        this.valueRate = 5
      }, 2000)
      setTimeout(() => {
        this.clearRateDialog()
      }, 2500)
    },
    clearRateDialog () {
      clearTimeout(this.interval)
      this.interval = ''
    },
    rateChange (val) {
      this.valueRate = val
    },
    // 给插件评分
    rateHandel (rateId) {
      Plugin.ratePluginApi(rateId, this.valueRate, this.userId, this.userName).then(res => {
        this.getPluginListData()
      })
      this.DialogVisible = false
    },
    clearSearchData () {
      this.selectCodeLanguage = ''
      this.inputPluginName = ''
      this.getPluginListData()
      sessionStorage.setItem('currentPage', 1)
    }
  }
}
</script>

<style lang='less'>
.clear:after{
  content: '';
  display: block;
  clear: both;
}
.ideList{
  .list-top{
    margin-bottom: 20px;
    height:40px;
    .list-select{
      margin-right:10px;
    }
    .enterinput{
      display: inline-block;
      width: 200px;
    }
    .searchBtn{
      height: 30px;
      line-height: 30px;
      margin-left: 10px;
      padding: 0 10px;
    }
    .el-input__inner{
      height: 30px;
      line-height: 30px;
    }
    .el-input__icon{
      line-height: 30px;
    }
  }
  .list-main{
    background-color: #fff;
    padding: 40px;
    .el-table thead{
      th,tr{
        background-color:#f0f3fa;
        padding: 6px 0;
      }
    }
    .el-table td{
      padding: 30px 0;
      .cell p{
        line-height: 25px;
        .span-left{
          color: #aaa;
          float: left;
          width: 90px;
          text-align: left;
          margin-right: 5px;
        }
        .span-right{
          float: left;
          width: 78%;
          max-width: calc(100% - 95px);
        }
      }
      .el-button--text{
        color: #688EF3;
      }
      .el-button.is-disabled.el-button--text{
        color: #c0c4cc;
      }
      .el-button{
        margin-right: 15px;
        margin-left: 0;
      }
    }
    .list-mian-content{
      .image{
        width:80px;
        height: 80px;
        border-radius: 50%;
      }
      .el-dialog__headerbtn{
        top: 8px;
      }
    }
  }
  .el-pagination{ text-align: right; margin-top: 30px;}
  .rate_top{
    margin-top: 20px;
  }
  .dialogPadding{
    padding: 0 10%;
  }
}

</style>
