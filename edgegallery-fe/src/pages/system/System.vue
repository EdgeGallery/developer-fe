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
  <div class="system">
    <div
      class="thirdSystem"
    >
      <div class="thirdSystemTop">
        <p class="topName">
          {{ $t('thirdSystem.threeSystem') }}
        </p>
        <p class="topLines" />
      </div>
      <div class="systemContent">
        <div class="systems common-div-bg">
          <div class="systemsContent">
            <div
              class="oneSystem bigBox"
              v-for="(val,i) in numList"
              :key="i"
            >
              <div
                v-for="(item,key,index) in numList[i]"
                :key="index"
                class="oneSystemStyle"
              >
                <div
                  class="bg"
                  @click="goDetail(key)"
                />

                <p class="oneName">
                  {{ language==='cn'?systemName[i].labelcn:systemName[i].labelen }}
                </p>
                <div class="oneNum">
                  <div class="oneNum1">
                    <p class="allnum" />
                    <p>{{ $t('thirdSystem.allNum') }}:</p>
                    <p>{{ item.totalNum }}</p>
                  </div>
                  <div class="oneNum1">
                    <p class="active" />
                    <p>{{ $t('thirdSystem.active') }}:</p>
                    <p>{{ item.activeNum }}</p>
                  </div>
                  <div class="oneNum1">
                    <p class="invalid" />
                    <p>{{ $t('thirdSystem.invalid') }}:</p>
                    <p>{{ item.inactiveNum }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { system } from '../../api/thirdSystem'
import { systemName } from '../../constants'
export default {
  components: {
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      systemName: systemName,
      systemType: '',
      numList: []
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    getNum () {
      let typeList = ['BIG_DATA', 'PUBLIC_CLOUD', 'MEC', 'Application', '5G', 'laaS', 'MEAO']
      system.systemNum(typeList).then(res => {
        if (res.data.length !== 0) {
          this.numList = res.data
        }
      })
    },
    goDetail (data) {
      this.systemType = data
      this.$router.push({ path: '/detail', query: { systemType: this.systemType } })
    }
  },
  mounted () {
    this.getNum()
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
        font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: #fff;
      }
      .topLines{
        margin: 20px 0 59px 0;
        width: 88px;
        height: 7px;
        background: #fff;
        opacity: 0.2;
        border-radius: 4px;
      }
    }
    .systemContent{
      box-shadow: 5px 9px 63px 5px rgba(94, 64, 200, 0.06);
      border-radius: 12px;
      width: 73.64%;
      height: 650px;
      margin: 0 auto;
      min-width: 1200px;
      .systems{
        overflow: hidden;
        .systemsContent{
         padding-top: 10px;
         display: flex;
         justify-content: flex-start;
         align-items: center;
         flex-wrap: wrap;
        .oneSystem:first-child{
          box-shadow: inset 0px 5px 36px 7px rgba(30, 30, 202, 0.19);
          .oneSystemStyle{
            .bg{
              background: url(../../assets/images/bigData.png)  no-repeat 100% 100%;
            }
          }
        }
        .oneSystem:nth-child(2){
          box-shadow: inset  0px 3px 51px 0px rgba(213, 169, 147, 0.35);
          .oneSystemStyle{
            .bg{
              background: url(../../assets/images/publicCloud.png)  no-repeat 100% 100%;
            }
          }
        }
        .oneSystem:nth-child(3){
          box-shadow: inset 0px 3px 51px 0px rgba(135, 200, 204, 0.35);
          .oneSystemStyle{
            .bg{
              background: url(../../assets/images/3dr.png)  no-repeat 100% 100%;
            }
          }
        }
        .oneSystem:nth-child(4){
          box-shadow: inset 0px 3px 51px 0px rgba(224, 163, 182, 0.35);
          .oneSystemStyle{
            .bg{
              background: url(../../assets/images/app.png)  no-repeat 100% 100%;
            }
          }
        }
        .oneSystem:nth-child(5){
          box-shadow: inset 0px 3px 51px 0px rgba(124, 177, 202, 0.35);
          .oneSystemStyle{
              .bg{
                background: url(../../assets/images/5G.png)  no-repeat 100% 100%;
              }
          }
        }
        .oneSystem:nth-child(6){
          box-shadow: inset 0px 3px 51px 0px rgba(168, 154, 216, 0.35);
          .oneSystemStyle{
            .bg{
              background: url(../../assets/images/iaas.png)  no-repeat 100% 100%;
            }
          }
        }
        .oneSystem:nth-child(7){
          box-shadow: inset 0px 5px 36px 7px rgba(94, 61, 212, 0.35);
          .oneSystemStyle{
            .bg{
              background: url(../../assets/images/meao.png)  no-repeat 100% 100%;
            }
          }
        }
        .oneSystem{
          background: #FFFFFF;
          width: 22.9%;
          margin-right: 2.07%;
          height: 231px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 60px;
          .oneSystemStyle{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .bg{
            width: 108px;
            border-radius: 12px;
              margin: 27px 0 16px 0;
            height: 97px;
          }
          .bg:hover{
            cursor: pointer;
          }
          .oneName{
            font-size: 20px;
            font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
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
              font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
              font-weight: 300;
              color: #62517A;
              margin-right: 2px;
            }
            .oneNum1 p:nth-child(3){
              margin-top: 1px;
              font-size: 14px;
              font-family: HarmonyHeiTi, Arial, Helvetica, sans-serif;
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
