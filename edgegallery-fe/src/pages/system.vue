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
          {{ $t('system.threeSystem') }}
        </p>
        <p class="topLines" />
      </div>
      <div class="systemContent">
        <div class="systems">
          <div class="systemsContent">
            <div
              class="oneSystem bigBox"
            >
              <img
                src="../assets/images/bigData.png"
                alt=""
                @click="goDetail('BIG_DATA')"
              >
              <p class="oneName">
                {{ $t('system.bigSystem') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>{{ bigdataNum.totalNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>{{ bigdataNum.activeNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>{{ bigdataNum.inactiveNum }}</p>
                </div>
              </div>
            </div>
            <div
              class="oneSystem cloudBox"
            >
              <img
                src="../assets/images/publicCloud.png"
                alt=""
                @click="goDetail('PUBLIC_CLOUD')"
              >
              <p class="oneName">
                {{ $t('system.publicCloud') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>{{ cloudNum.totalNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>{{ cloudNum.activeNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>{{ cloudNum.inactiveNum }}</p>
                </div>
              </div>
            </div>
            <div
              class="oneSystem drBox"
            >
              <img
                src="../assets/images/3dr.png"
                alt=""
                @click="goDetail('MEC')"
              >
              <p class="oneName">
                {{ $t('system.marginalSystem') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>{{ mecNum.totalNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>{{ mecNum.activeNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>{{ mecNum.inactiveNum }}</p>
                </div>
              </div>
            </div>
            <div
              class="oneSystem appBox"
            >
              <img
                src="../assets/images/app.png"
                alt=""
                @click="goDetail('Application')"
              >
              <p class="oneName">
                {{ $t('system.app') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>{{ applicationNum.totalNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>{{ applicationNum.activeNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>{{ applicationNum.inactiveNum }}</p>
                </div>
              </div>
            </div>
            <div
              class="oneSystem gBox"
            >
              <img
                src="../assets/images/5G.png"
                alt=""
                @click="goDetail('network')"
              >
              <p class="oneName">
                {{ $t('system.NetworkElement') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>{{ networkNum.totalNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>{{ networkNum.activeNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>{{ networkNum.inactiveNum }}</p>
                </div>
              </div>
            </div>
            <div
              class="oneSystem laasBox"
            >
              <img
                src="../assets/images/iaas.png"
                alt=""
                @click="goDetail('laaS')"
              >
              <p class="oneName">
                {{ $t('system.laas') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>{{ laasNum.totalNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>{{ laasNum.activeNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>{{ laasNum.inactiveNum }}</p>
                </div>
              </div>
            </div>
            <div
              class="oneSystem meaoBox"
            >
              <img
                src="../assets/images/meao.png"
                alt=""
                @click="goDetail('MEAO')"
              >
              <p class="oneName">
                {{ $t('system.meao') }}
              </p>
              <div class="oneNum">
                <div class="oneNum1">
                  <p class="allnum" />
                  <p>{{ $t('system.allNum') }}:</p>
                  <p>{{ meaoNum.totalNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="active" />
                  <p>{{ $t('system.active') }}:</p>
                  <p>{{ meaoNum.activeNum }}</p>
                </div>
                <div class="oneNum1">
                  <p class="invalid" />
                  <p>{{ $t('system.invalid') }}:</p>
                  <p>{{ meaoNum.inactiveNum }}</p>
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
import { system } from '@/tools/api.js'
export default {
  components: {
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      systems: [
        {
          namecn: '大数据系统',
          nameen: 'Big data system',
          systemType: '',
          imgUrl: '../assets/images/bigData.png'
        },
        {
          namecn: '公有云',
          nameen: 'Public Cloud',
          systemType: '',
          imgUrl: '../assets/images/publicCloud.png'
        },
        {
          namecn: '3dr 边缘系统',
          nameen: '3dr Limbic system',
          systemType: '',
          imgUrl: '../assets/images/3dr.png'
        },
        {
          namecn: '应用',
          nameen: 'Application',
          systemType: '',
          imgUrl: '../assets/images/add.png'
        },
        {
          namecn: '5G 网元',
          nameen: '5G Network element',
          systemType: '',
          imgUrl: '../assets/images/5G.png'
        },
        {
          namecn: 'laas',
          nameen: 'laas',
          systemType: '',
          imgUrl: '../assets/images/iaas.png'
        }
      ],
      systemType: '',
      bigdataNum: 0,
      cloudNum: 0,
      mecTotalNum: 0,
      applicationNum: 0,
      networkNum: 0,
      laasNum: 0,
      meaoNum: 0
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    getNum () {
      let typeList = ['BIG_DATA', 'PUBLIC_CLOUD', 'MEC', 'Application', 'network', 'laaS', 'MEAO']
      system.systemNum(typeList).then(res => {
        if (res.data.length !== 0) {
          this.bigdataNum = res.data[0].BIG_DATA
          this.cloudNum = res.data[1].PUBLIC_CLOUD
          this.mecNum = res.data[2].MEC
          this.applicationNum = res.data[3].Application
          this.networkNum = res.data[4].network
          this.laasNum = res.data[5].laaS
          this.meaoNum = res.data[6].MEAO
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
      height: 650px;
      margin: 0 auto;
      min-width: 1200px;
      background-color: #fff;
      padding-bottom: 70px;
      .systems{
       margin:29px 1% 0px 3.6% ;
       width: 95.4%;
       height: 552px;
       .systemsContent{
         padding-top: 60px;
         width: 100%;
         display: flex;
         justify-content: flex-start;
         align-items: center;
         flex-wrap: wrap;
         .bigBox{
            box-shadow: inset 0px 5px 36px 7px rgba(30, 30, 202, 0.19);
         }
         .cloudBox{
           box-shadow: inset  0px 3px 51px 0px rgba(213, 169, 147, 0.35);
         }
         .drBox{
           box-shadow: inset 0px 3px 51px 0px rgba(135, 200, 204, 0.35);
         }
         .appBox{
           box-shadow: inset 0px 3px 51px 0px rgba(224, 163, 182, 0.35);
         }
         .gBox{
           box-shadow: inset 0px 3px 51px 0px rgba(124, 177, 202, 0.35);
         }
         .laasBox{
           box-shadow: inset 0px 3px 51px 0px rgba(168, 154, 216, 0.35);
         }
         .meaoBox{
           box-shadow: inset 0px 5px 36px 7px rgba(94, 61, 212, 0.35);
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
            img{
              width: 37.01%;
              border-radius: 12px;
               margin: 27px 0 16px 0;
              height: 97px;
            }
            img:hover{
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
