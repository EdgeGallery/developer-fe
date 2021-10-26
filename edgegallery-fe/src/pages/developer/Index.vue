<template>
  <div class="application">
    <el-row>
      <el-col :span="2">
        <div class="left-menu">
          <ProjectList />
        </div>
      </el-col>
      <el-col :span="22">
        <div class="main-content">
          <div class="main-title">
            5G边缘应用孵化流水线
          </div>
          <div class="main-part">
            <el-row>
              <el-col :span="12">
                <div class="main-creation main-part-item">
                  <div class="rt">
                    <p class="label-en">
                      APPLICATION INBUCATION
                    </p>
                    <p class="label-cn">
                      应用孵化
                    </p>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="main-app-store main-part-item">
                  <div class="rt">
                    <p class="label-en">
                      APP STORE
                    </p>
                    <p class="label-cn">
                      应用商店
                    </p>
                  </div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="main-deploy main-part-item">
                  <div class="rt">
                    <p class="label-en">
                      APPLICATION DEPLOYMENT
                    </p>
                    <p class="label-cn">
                      应用部署
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="main-flow-direction">
            <p>
              行动方向
            </p>
            <img
              src="../../assets/images/projects/pro_direction.png"
              alt=""
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectList from './application/ProjectList.vue'
export default {
  components: {
    ProjectList
  }
}
</script>

<style lang="less" scoped>
  .application{
    width: 100%;
    height: 100%;
    .left-menu{
      width: 100%;
      height: 95%;
      position: relative;
      border: 2px solid #838ACB;
      border-left: none;
      border-radius: 0 17px 17px 0;
      z-index: 15;
    }
    .left-menu::after {
      content: "";
      background: url("../../assets/images/index/index_mask.png") no-repeat center;
      background-size: cover;
      opacity: 0.5;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
    .main-content{
      height: 100%;
      margin: 0 auto;
      padding: 6% 10%;
      .main-title{
        font-size: 25px;
        font-weight: bold;
        opacity: 0.8;
      }
      .main-part{
        height: 80%;
        margin-top: 30px;
        .main-part-item{
          height: 100%;
          border-radius: 17px;
          margin-right: 30px;
          background: url("../../assets/images/default_mask.png") no-repeat center;
          background-size: cover;
          text-align: right;
          padding: 25px 20px;
          .label-cn{
            font-size: 20px;
          }
          .label-en{
            font-size: 20px;
            font-weight: bold;
            opacity: 0.7;
          }
        }
      }
      .main-flow-direction{
        p{
          font-size: 14px;
          padding-top: 20px;
          line-height: 30px;
        }
      }
    }
    .el-row, .el-col{
      height: 100%;
    }
  }
</style>
