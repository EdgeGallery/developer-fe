<template>
  <div class="appdeploy">
    <div class="deploylist-top-title">
      {{ $t('deployList.deployListTitle') }}
    </div>
    <div class="card-shadow">
      <el-card>
        <el-row>
          <el-col :span="4">
            <el-input
              :placeholder="$t('deployList.tip')"
              suffix-icon="el-icon-search"
            />
          </el-col>
        </el-row>
        <el-table
          class="common-table"
          :data="deployListData"
          :default-sort="{prop:'name',order:'descending'}"
        >
          <el-table-column
            prop="name"
            sortable
            :label="$t('deployCommon.name')"
          />
          <el-table-column
            prop="version"
            :label="$t('deployCommon.version')"
          />
          <el-table-column
            prop="provider"
            :label="$t('deployCommon.provider')"
          />
          <el-table-column
            prop="type"
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
            prop="syncTime"
            :label="$t('deployList.syncTime')"
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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :pager-count="5"
          :page-sizes="[1,5,10,20]"
          :page-size="1"
          layout="total,sizes,prev,pager,next,jumper"
          :total="3"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      deployListData: [
        {
          name: 'zhangsan',
          version: 'v1.0',
          provider: 'EdgeGallery',
          type: 'Video',
          industry: 'Smark Park',
          affinity: 'X86',
          appstoreName: 'appstore',
          syncTime: '2021-10-21'
        },
        {
          name: 'lisi',
          version: 'v2.0',
          provider: 'EdgeGallery',
          type: 'Video',
          industry: 'Smark Park',
          affinity: 'X86',
          appstoreName: 'appstore',
          syncTime: '2021-10-21'
        },
        {
          name: 'wangwu',
          version: 'v3.0',
          provider: 'EdgeGallery',
          type: 'Video',
          industry: 'Smark Park',
          affinity: 'X86',
          appstoreName: 'appstore',
          syncTime: '2021-10-21'
        }
      ],
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页${val}条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页：${val}`)
    },
    checkDetail (item) {
      this.$router.push('/EG/mecm/distributeDeploy')
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
        color:red;
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
      .el-pagination{
        text-align:right;
        font-weight:normal;
        .el-pagination__total{
          float:none;
          height:24px;
          line-height:24px;
          font-size:14px;
          color:#fff;
        }
        .el-pagination__jump{
          display:inline-block !important;
          height:24px;
          line-height:24px;
          font-size:14px;
          color:#fff;
        }
        .el-pagination__sizes{
          height:24px;
          line-height:24px;
        }
        .el-select .el-input{
          height:24px;
          line-height:24px;
        }
        .el-pagination__editor{
          height:24px;
        }
        .el-input--mini{
          height:24px;
          line-height:22px;
          font-size:14px;
        }
        .el-input__inner{
          height:24px;
          line-height:24px;
          font-size:14px;
          background: rgba(255,255,255,0.3);
          color:#fff;
        }
        .el-input__icon{
          line-height:22px;
        }
        .btn-prev .el-icon, .btn-next .el-icon{
          font-size:14px;
          height:24px;
          line-height:26px;
        }
        .el-pager li{
          font-size:14px;
          font-weight:200;
          height:24px;
          line-height:24px;
          background: none;
          color:#fff;
        }
        button{
          height:24px;
          line-height:24px;
          background: none;
          color:#fff;
        }
        .active{
          background-color: rgba(66,35,165,0.5) !important;
        }
      }
    }
  }
}
</style>
