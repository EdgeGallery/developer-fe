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
          :default-sort="{prop:'name',order:'descending'}"
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
import { appDeploy } from '../../api/mecmApi.js'
import { TYPESFORAPP, INDUSTRY } from '../../tools/mecm/constants.js'
import Pagination from '../../components/Pagination.vue'
import Search from '../../components/Search.vue'
export default {
  components: {
    Pagination, Search
  },
  data () {
    return {
      dataLoading: true,
      appType: '',
      language: localStorage.getItem('language'),
      tableData: [],
      paginationData: [],
      currPageTableData: [],
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
      this.paginationData = this.paginationData.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().indexOf(val) > -1
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
        this.initList()
      }
    },
    checkDetail (row) {
      sessionStorage.setItem('appRow', JSON.stringify(row))
      sessionStorage.setItem('appId', row.appId)
      this.$nextTick(
        this.$router.push('/EG/mecm/distribute?appId=' + row.appId)
      )
    },
    getDeployListData () {
      appDeploy.initApmPackages().then(response => {
        this.tableData = response.data
        this.tableData.forEach(item => {
          item.createTime = item.createTime.split('T')[0]
        })
        this.paginationData = this.tableData
        console.log(this.tableData)
        this.checkProjectData()
        if (this.appType) this.filterTableData(this.appType, 'type')
        if (this.serchData) {
          this.getSearchData(this.serchData)
        }
        this.dataLoading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    checkProjectData () {
      this.tableData.forEach(itemBe => {
        INDUSTRY.forEach(itemFe => {
          if (itemBe.industry.match(itemFe.label[1]) && this.language === 'cn') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.industry.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[0], itemFe.label[1])
          }
        })

        TYPESFORAPP.forEach(itemFe => {
          if (itemBe.type.match(itemFe.label[1]) && this.language === 'cn') {
            itemBe.type = itemBe.type.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.type.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.type = itemBe.type.replace(itemFe.label[0], itemFe.label[1])
          }
        })
      })
    }

  }
}
</script>

<style lang="less">
.appdeploy{
  width: 100%;
  height: 100%;
  padding:32px 15% 0 10%;
  .deploylist-top-title{
    width: 186px;
    height: 66px;
    margin: 2% 0 2% 3%;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 4px;
    background: url('../../assets/images/mecm/appDeployDetailList/deploy_title.png') no-repeat center;
  }
  .card-shadow{
    padding: 0px 0 1px 2px;
    border-radius: 17px;
    border: 1px solid;
    border-color: rgba(182, 164, 236, 0.6);
    box-shadow: -1px -1px 3px rgba(255, 255, 255,0.3);
    .el-row{
      input{
        color:#fff;
      }
      .el-input__inner{
        height:30px;
        line-height:30px;
        width:200px;
        border-radius:6px;
        border-color:rgba(171,151,229,1);
        background-color: rgba(182, 164, 236,0.3);
        box-shadow:-1px -1px 3px rgba(175, 163, 212, 0.6)
      }
      .el-input__suffix{
        right:25px;
        top:-3px;
      }
    }
    .el-card{
      border:1px solid rgba(171,151,229,1);
      border-radius: 17px;
      padding:35px 16px 7px 24px;
      background: url('../../assets/images/mecm/deployCommon/deploy_bg.png') center;
      box-shadow:1px 1px 3px #ab97e5 inset;
      .el-table{
        margin-top:30px;
        margin-bottom:50px;
        thead{
          height:60px;
          border:none;
          font-size:16px;
        }
        tr{
          height:64px;
        }
        td{
          border-bottom:1px solid rgba(255,255,255,0.3);
          font-size:14px;
        }
        .el-table__cell > .cell{
          padding-left:30px;
        }
        .el-button{
          padding:0px 11px;
        }
        .el-button--small{
          font-size:14px;
          width:auto;
          height:24px;
          background: rgba(255,255,255,0.4);
          border-radius:6px;
        }
        }
    }
  }
}
</style>
