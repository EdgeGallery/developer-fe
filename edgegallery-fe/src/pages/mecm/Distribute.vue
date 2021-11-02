<template>
  <div class="distribute">
    <div class="card-shadow">
      <el-card>
        <div class="common-dlg-title distribute-top-title">
          {{ $t('distribute.title') }}
        </div>
        <el-row>
          <el-col :span="4">
            <el-input
              :placeholder="$t('deployCommon.tip')"
              suffix-icon="el-icon-search"
            />
          </el-col>
        </el-row>
        <el-table
          class="common-table"
          :data="distributeData"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            prop="name"
            :label="$t('deployCommon.name')"
          />
          <el-table-column
            prop="ip"
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
            prop="MEPM"
            :label="$t('distribute.MEPM')"
          />
          <el-table-column
            prop="hwCapability"
            :label="$t('distribute.hwCapability')"
          />
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
        <div class="distribute-btn">
          <el-button>取消</el-button>
          <el-button>确认</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      distributeData: [
        {
          name: 'zhangsan',
          ip: '121.121.121.111',
          city: '陕西省/西安市/高新区',
          affinity: 'X86',
          MEPM: '121.121.121.111',
          hwCapability: 'GPU'

        },
        {
          name: 'zhangsan',
          ip: '121.121.121.111',
          city: '陕西省/西安市/高新区高新区高新区',
          affinity: 'X86',
          MEPM: '121.121.121.111',
          hwCapability: 'GPU/GPU'
        },
        {
          name: 'zhangsan',
          ip: '121.121.121.111',
          city: '陕西省/西安市/高新区',
          affinity: 'X86',
          MEPM: '121.121.121.111',
          hwCapability: 'GPU'
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
    changeIcon (val) {
      console.log(val)
      if (val === 'Processing') {
        return 'processing'
      } else if (val === 'Failed') {
        return 'failed'
      } else {
        return 'success'
      }
    }
  }
}
</script>

<style lang="less">
.distribute{
  width: 100%;
  height: 100%;
  padding:80px 15% 0 10%;
  .card-shadow{
    padding: 0px 0 1px 2px;
    border-radius: 17px;
    border: 1px solid;
    border-color: rgba(182, 164, 236, 0.6);
    box-shadow: -1px -1px 3px rgba(255, 255, 255,0.3);
    .distribute-top-title{
      color:#fff;
      margin-left:-15px;
    }
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
        top:-3px;
      }
    }
    .el-card{
      border:1px solid rgba(171,151,229,1);
      border-radius: 17px;
      background: url('../../assets/images/mecm/deployCommon/deploy_bg.png') center;
      box-shadow:1px 1px 3px #ab97e5 inset;
      .common-dlg-title:before{
        right:5px;
      }
      .el-card__body{
        padding: 52px 109px 65px 112px;
      }
      .el-table{
        margin-top:30px;
        margin-bottom:50px;
        thead{
          height:30px;
          border:none;
          font-size:16px;
        }
        tr{
          height:30px;
        }
        td{
          border-bottom:1px solid rgba(255,255,255,0.3);
          font-size:14px;
        }
        .el-table__cell > .cell{
          padding-left:30px;
        }
        .el-button{
          padding:0px 5px;
        }
        .el-button--small{
          font-size:14px;
          width:auto;
          height:24px;
          background: rgba(255,255,255,0.4);
          border-radius:6px;
        }
        .processing{
          padding:10px 14px;
          background: url('../../assets/images/mecm/distributeDeploy/processing.png') no-repeat center;
        }
        .failed{
          padding:10px 14px;
          background: url('../../assets/images/mecm/distributeDeploy/failed.png') no-repeat center;
        }
        .success{
          padding:10px 14px;
          background: url('../../assets/images/mecm/distributeDeploy/success.png')  no-repeat center;
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
      .distribute-btn{
        margin-top:80px;
        margin-bottom:40px;
        float:right;
        .el-button--default{
          height:30px;
          border-radius:12px;
          color:#5944c0;
          height: 24px;
          line-height: 6px;
        }
        .el-button{
          padding:8px 29px;
        }

      }
    }
  }
}
</style>
