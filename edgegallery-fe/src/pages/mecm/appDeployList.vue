<template>
  <div class="appdeploy">
    <!-- 标题 -->
    <div class="deploylist-top-title">
      {{ detailTitle }}
    </div>
    <div class="cardShadow">
      <!-- 卡片视图区域 -->
      <el-card class="deploylist-card">
        <!-- 搜索框 -->
        <el-row>
          <el-col :span="4">
            <el-input
              placeholder="输入内容进行搜索"
              suffix-icon="el-icon-search"
            />
          </el-col>
        </el-row>
        <!-- 列表区 -->
        <el-table
          class="common-table"
          :data="deployListData"
        >
          <el-table-column
            prop="name"
            label="名称"
          />
          <el-table-column
            prop="version"
            label="版本"
          />
          <el-table-column
            prop="provider"
            label="厂商"
          />
          <el-table-column
            prop="type"
            label="类型"
          />
          <el-table-column
            prop="industry"
            label="行业"
          />
          <el-table-column
            prop="affinity"
            label="架构"
          />
          <el-table-column
            prop="appstoreName"
            label="应用市场"
          />
          <el-table-column
            prop="createTime"
            label="同步时间"
          />
          <el-table-column
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="checkDetail(scope.row)"
                type="text"
                size="small"
              >
                分发&部署
              </el-button>
            </template>
            />
          </el-table-column>
        </el-table>
        <!-- 页码区 -->
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

      <!-- <div class="deploylist-searchbox" /> -->
      <!-- <div class="deploylist-table" /> -->
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      detailTitle: '应用部署',
      deployListData: [
        {
          name: '张三',
          version: 'v2.0',
          provider: 'EdgeGallery',
          type: 'Video',
          industry: 'Smark Park',
          affinity: 'X86',
          appstoreName: 'appstore',
          createTime: '2021-10-21'
        },
        {
          name: '李四',
          version: 'v2.0',
          provider: 'EdgeGallery',
          type: 'Video',
          industry: 'Smark Park',
          affinity: 'X86',
          appstoreName: 'appstore',
          createTime: '2021-10-21'
        },
        {
          name: '王五',
          version: 'v3.0',
          provider: 'EdgeGallery',
          type: 'Video',
          industry: 'Smark Park',
          affinity: 'X86',
          appstoreName: 'appstore',
          createTime: '2021-10-21'
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
    }
  }
}
</script>

<style lang="less">
.appdeploy{
     width: 100%;
     height: 100%;
     padding:32px 13% 0 13%;
     .deploylist-top-title{
        width: 186px;
        height: 66px;
        margin: 2% 0 2% 3%;
        font-size: 30px;
        line-height: 50px;
        text-align: center;
        letter-spacing: 4px;
        background: url('../../assets/images/mecm/appDeploy/deploy_title.png') no-repeat center;
    }
    .cardShadow{
        padding: 0px 0 1px 2px;
        border-radius: 17px;
        border: 1px solid;
        border-color: rgba(182, 164, 236, 0.6);
        box-shadow: -1px -1px 3px rgba(255, 255, 255,0.3) ;
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
            // background-color: #91e2d4;
            // background:linear-gradient(to bottom right,#a0e9dd,#866ada)
            // background:rgba(255, 255, 255, 0.3)
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
          background: url('../../assets/images/mecm/appDeploy/deploy_bg.png') center;
          box-shadow:1px 1px 3px #ab97e5 inset;
           .el-table{
                      margin-top:30px;
                      margin-bottom:50px;
                  thead{
                      height:60px;
                      border:none;
                    }
                  tr{
                      height:64px;
                      border-bottom:1px solid rgba(255,255,255,0.3);
                    }
                  td{
                      border-bottom:1px solid rgba(255,255,255,0.3);
                    }

                  .el-table__cell > .cell{
                      font-size:16px;
                       padding-left:30px;
                  }
                  .el-button--small{
                      font-size:14px;
                       width:90px;
                      height:24px;
                      background: rgba(255,255,255,0.4);
                      border-radius:6px;

                  }
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

</style>
