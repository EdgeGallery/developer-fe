
/*
 *  Copyright 2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

<template>
  <div class="system">
    <div class="thirdSystem">
      <div class="thirdSystemTop">
        <p class="topName">
          {{ $t('system.threeSystem') }}
        </p>
        <p class="topLines" />
      </div>
      <div class="systemContent">
        <el-input
          class="systemSearch"
          v-model="systemSearch"
          :placeholder="$t('system.search') "
        />
        <div class="systems">
          <div class="systemsContent">
            <div
              class="oneSystem"
            >
              <img
                src="../assets/images/construct.png"
                alt=""
                @click="goDetail"
              >
              <p class="oneName">
                {{ $t('system.bigSystem') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>20</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>10</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>20</p>
                </div>
              </div>
            </div>
          </div>
          <el-pagination
            style="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[8,16,24,32]"
            :page-size="8"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      systemSearch: '',
      currentPage: 1
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    goDetail () {
      this.$router.push({ name: 'detail', params: { name: '123' } })
    }
  }
}
</script>

<style lang='less'>
.system{
  width: 100%;
  height: 100%;
  .thirdSystem{
    width: 100%;
    padding-bottom: 100px;
    .thirdSystemTop{
      margin: 64px 0 0 20.6%;
      .topName{
        font-size: 36px;
        font-family: HarmonyHeiTi;
        font-weight: bold;
        color: #5D3DA0;
      }
      .topLines{
        margin: 20px 0 59px 0;
        width: 88px;
        height: 7px;
        background: #9E7BCD;
        opacity: 0.2;
        border-radius: 4px;
      }
    }
    .systemContent{
      box-shadow: 5px 9px 63px 5px rgba(94, 64, 200, 0.06);
      border-radius: 12px;
      width: 73.64%;
      min-height: 650px;
      margin: 0 auto;
      min-width: 1200px;
      background-color: #fff;
      padding-bottom: 70px;
      .systemSearch{
        width: 217px;
        margin: 39px 0 0 4.2%;
      }
      .systems{
       margin:29px 1% 0px 3.6% ;
       width: 95.4%;
       min-height: 552px;
       position: relative;
       .systemsContent{
         width: 100%;
         display: flex;
         justify-content: flex-start;
         align-items: center;
         flex-wrap: wrap;
         .oneSystem{
            background: #FFFFFF;
            width: 22.9%;
            margin-right: 2.07%;
            height: 231px;
            box-shadow: inset 0px 5px 36px 7px rgba(30, 30, 202, 0.19);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
            img{
              width: 37.01%;
              border-radius: 12px;
               margin: 27px 0 16px 0;
              height: 97px;
              border: 1px solid red;
            }
            img:hover{
              cursor: pointer;
            }
            .oneName{
              font-size: 20px;
              font-family: HarmonyHeiTi;
              font-weight: 400;
              color: #62517A;
              text-align: center;
              margin-bottom: 26px;
            }
            .oneNum{
              width: 82%;
              height: 16px;
              display: flex;
              justify-content: space-between;
              .oneNum1{
                display: flex;
                  .allnum{
                    background: #5E40C8;
                  }
                  .active{
                    background: #21CCCA;
                  }
                  .invalid{
                    background: #CC2121;
                  }
              }
              .oneNum1 p:first-child{
                width: 11px;
                height: 11px;
                border-radius: 50%;
                line-height: 16px;
                margin-right: 4px;
                margin-top: 4px;
              }
              .oneNum1 p:nth-child(2){
                font-size: 14px;
                font-family: HarmonyHeiTi;
                font-weight: 300;
                color: #62517A;
                margin-right: 2px;
              }
              .oneNum1 p:nth-child(3){
                margin-top: 1px;
                font-size: 14px;
                font-family: HarmonyHeiTi;
                font-weight: 300;
                color: #62517A;
              }
            }
         }
       }
      .el-pagination{
        width: 500px !important;
        position: absolute;
        bottom: -40px;
        right:20px
      }
      }

    }
  }
}
</style>
