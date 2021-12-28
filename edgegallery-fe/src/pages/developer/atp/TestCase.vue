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
  <div
    class="common-div-bg test-case"
  >
    <div
      class="case-detail-title"
    >
      <p class="title-icon">
        {{ $t('testCase.caseDetail') }}
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
            :label="$t('testCase.caseName')"
            min-width="30%"
          >
            <template slot-scope="scope">
              {{ language==='cn'?scope.row.nameCh:scope.row.nameEn }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('testCase.caseType')"
            min-width="20%"
          >
            <template slot-scope="scope">
              {{ language==='en'?scope.row.type:scope.row.type==='automatic'?'自动化类型':'手动类型' }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('testCase.description')"
            min-width="45%"
          >
            <template slot-scope="scope">
              {{ language==='cn'?scope.row.descriptionCh:scope.row.descriptionEn }}
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <span
      class="no-use-case"
      v-else
    > {{ $t('testCase.noCase') }}</span>
    <div
      class="footer-btn"
    >
      <el-button
        class="common-btn"
        @click="closeCaseDetail()"
      >
        {{ $t('common.close') }}
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
      language: localStorage.getItem('language') || 'cn'
    }
  },
  methods: {
    closeCaseDetail () {
      this.$emit('setCaseTop', 'close')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
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
  .test-case{
    padding: 30px 50px;
    .case-detail-title{
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
            font-size: 19px;
            color: #fff;
            border: none;
            background-color: #5F499D;
            border-radius: 19.5px;
          }
          .el-collapse-item__wrap{
            padding-left: 15px;
            background-color: transparent;
            border: none;
          }
          .caseHearder{
            background-color: transparent;
            color: #fff;
            padding: 0 10px;
            height: 35px;
            line-height: 35px;
            font-family: defaultFontLight, Arial, Helvetica, sans-serif;
            font-size: 16px;
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
              font-family: defaultFontLight, Arial, Helvetica, sans-serif;
              font-size: 14px;
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
    .no-use-case{
      font-size: 20px;
    }
    .footer-btn{
      text-align: right;
  }
  }
</style>
