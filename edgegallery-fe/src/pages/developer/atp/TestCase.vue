<template>
  <div
    class="common-div-bg"
    style="padding: 30px 50px"
  >
    <div
      class="case-detail"
    >
      <p class="title-icon">
        用例详情
      </p>
    </div>
    <el-collapse
      :value="opened"
      v-if="!isTestCase"
    >
      <el-collapse-item
        v-for="(item,index) in testSuiteData"
        :key="index"
        :title="language==='cn'?item.nameCh:item.nameEn"
        :name="item.nameEn"
      >
        <el-table
          :data="item.testCases"
          header-cell-class-name="caseHearder"
        >
          <el-table-column
            label="用例名称"
            width="210"
          >
            <template slot-scope="scope">
              {{ language==='cn'?scope.row.nameCh:scope.row.nameEn }}
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            width="120"
          >
            <template slot-scope="scope">
              {{ language==='en'?scope.row.type:scope.row.type==='automatic'?'自动化类型':'手动类型' }}
            </template>
          </el-table-column>
          <el-table-column
            label="描述"
          >
            <template slot-scope="scope">
              {{ language==='cn'?scope.row.descriptionCh:scope.row.descriptionEn }}
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <span
      v-else
      style="font-size:20px;"
    >此场景没有用例</span>
    <div style="margin-top:20px;">
      <el-button
        class="common-btn"
        @click="closeCaseDetail()"
      >
        关闭
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestCase',
  props: {
    testSuiteData: {
      type: Array,
      default: function () {
        return []
      }
    },
    isTestCase: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      language: 'cn'
    }
  },
  methods: {
    closeCaseDetail () {
      this.$emit('setCaseTop', 'close')
    }
  },
  computed: {
    opened () {
      return this.testSuiteData.map((testSuite) => {
        return testSuite.nameEn
      })
    }
  }
}
</script>

<style lang="less">
  .case-detail{
    position: relative;
    padding-bottom: 20px;
  }
      .el-collapse {
        border: none;
        padding: 0;
        .el-collapse-item {
          margin-bottom: 15px;
          .el-collapse-item__content{
            padding: 0;
          }
          .el-collapse-item__header{
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            height: 40px;
            padding-left: 15px;
            font-size: 18px;
            color: #fff;
            background-color: rgba(255, 255, 255,0.3);
            border: none;
          }
          .el-collapse-item__wrap{
             background-color: transparent;
             border: none;
          }
          .caseHearder{
            background-color: transparent;
            color: #fff;
            padding: 0 10px;
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            font-weight: normal;
          }
          .el-table tr {
            height: 37px;
            background-color: transparent;
          }
          .el-table td{
            font-size: 16px;
            padding: 0 10px;
            color: #fff;
            vertical-align: top;
            height: 37px;
            line-height: 37px;
          }
          .el-table__body{
            .cell{
              padding-top: 5px;
            }
          }
         .el-table::before {
          width: 0;
        }
        .el-table{
          background-color: transparent;
        }
        }
      }
</style>
