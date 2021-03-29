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
      <div class="list-mian-content clear">
        <el-table
          :data="searchListData"
          style="width: 100%"
          header-cell-class-name="headerStyle"
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
            :label="$t('workspace.operation')"
            width="230"
          >
            <template slot-scope="scope">
              <el-link
                :href="getDownloadUrl(scope.row.pluginId)"
                :underline="false"
              >
                <el-button
                  id="downloadBtn"
                  class="el-icon-download"
                  type="text"
                  @click="rateConfirm(scope.row)"
                >
                  {{ $t('common.download') }}
                </el-button>
              </el-link>
              <el-button
                id="detailBtn"
                type="text"
                @click="toDetail(scope.row)"
              >
                {{ $t('devTools.detail') }}
              </el-button>
              <el-button
                id="deleteBtn"
                :disabled="scope.row.userId===userId?false:true"
                type="text"
                @click="deletePlug(scope.row)"
              >
                {{ $t('devTools.delete') }}
              </el-button>
            </template>
          </el-table-column>
          <template slot="empty">
            <div>
              <img
                src="../../assets/images/empty.png"
                alt=""
                style="padding: 10px;"
              >
              <p>{{ $t('api.noDataNotice') }}</p>
            </div>
          </template>
        </el-table>

        <div
          class="small-div"
        >
          <div
            class="list_small"
            v-for="(item,index) in searchListData"
            :key="index"
          >
            <img
              :src="getImageUrl(item.pluginId)"
              class="image"
              :alt="item.pluginName"
            >
            <h4>{{ $t('devTools.pluginName') }} : {{ item.pluginName }}</h4>
            <span class="list-fg" />
            <p class="list-author">
              {{ $t('devTools.author') }} : {{ item.userName }}
            </p>
            <p class="list-des">
              {{ $t('devTools.description') }} : {{ item.introduction }}
            </p>
            <p>
              <el-rate
                class="p-rate"
                :value="Number(item.satisfaction.toFixed(2))"
                disabled
                show-score
                text-color="#ff9900"
                disabled-void-color="#cccccc"
                score-template="{value}"
              />
            </p>
            <p class="list-btn">
              <el-link
                :href="getDownloadUrl(item.pluginId)"
                :underline="false"
              >
                <el-button
                  id="downloadBtn"
                  class="btn el-icon-download"
                  type="text"
                  @click="rateConfirm(item)"
                >
                  {{ $t('common.download') }}
                </el-button>
              </el-link>
              <el-button
                id="detailBtn"
                type="text"
                class="btn"
                @click="toDetail(item)"
              >
                {{ $t('devTools.detail') }}
              </el-button>
              <el-button
                id="deleteBtn"
                :disabled="item.userId===userId?false:true"
                type="text"
                class="btn"
                @click="deletePlug(item)"
              >
                {{ $t('devTools.delete') }}
              </el-button>
            </p>
          </div>
        </div>

        <el-dialog
          :visible.sync="centerDialogVisible"
          :close-on-click-modal="false"
          width="30%"
          center
        >
          <span>{{ $t('devTools.deletePlugin') }}</span>
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
      selectCodeLanguage: '',
      inputPluginName: '',
      centerDialogVisible: false,
      delId: '',
      pluginUserId: '',
      interval: null,
      DialogVisible: false,
      valueRate: 5,
      rateId: 0,
      dataLoading: true,
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      limitSize: 2,
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
        this.searchListData = res.data.results
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
      this.interval = null
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
    .list-select{
      margin-right:10px;
    }
    .el-select {
      width: auto!important;
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
      padding: 30px 0!important;
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
        margin-right: 15px!important;
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
      .small-div{
        display: none;
        .list_small{
          float: left;
          width: 100%;
          border: 1px solid #ddd;
          background: #f9f9f9;
          margin: -1px 0 0 -1px;
          text-align: center;
          padding: 15px;
          img{
            width: 100px;
            height: 100px;
          }
          h4{
            margin-top: 15px;
            color: #666;
            height: 25px;
            line-height: 25px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .list-fg{
            display: inline-block;
            width: 90%;
            margin: 10px 0;
            border-bottom: 1px dashed #cce2fa;
          }
          .list-author{
            color: #9ccdff;
            margin-bottom: 10px;
            font-size: 12px;
          }
          .list-des{
            height: 40px;
            line-height: 20px;
            font-size: 14px;
            overflow: hidden;
            color: #888;
            margin-bottom: 10px;
            text-overflow: ellipsis;
            text-overflow: -o-ellipsis-lastline;
            display: -webkit-box;
            line-clamp:2;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
          }
          .list-btn{
            margin-top: 10px;
            .el-button--text{
              margin: 0 10px;
              font-size: 13px;
            }
          }
        }
      }
      @media screen and (max-width: 1200px){
        .el-table{
          display: none;
        }
        .small-div{
          display: block;
          .list_small{
            width: 33.3%;
            box-sizing: border-box;
          }
        }
      }
      @media screen and (max-width: 1024px){
        .small-div{
          .list_small{
            width: 50%;
          }
        }
      }
      @media screen and (max-width: 560px){
        .small-div{
          .list_small{
            width: 100%;
          }
        }
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
@media screen and (max-width:700px){
  .ideList .list-top{
    .list-select{
      width: 46%;
      margin-right: 4%;
    }
    .enterinput{
      width: 50%;
    }
    .searchBtn{
      margin: 10px 10px 0 0;
    }
  }
}
@media screen and (max-width:375px){
  .ideList .list-main{
    padding: 20px;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    margin: 0 3px;
    min-width: 25px;
  }
}

</style>
