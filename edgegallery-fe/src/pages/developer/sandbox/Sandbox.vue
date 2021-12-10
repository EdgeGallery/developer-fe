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
  <div class="select-sandbox">
    <div
      class="all-sandbox common-div-bg"
      v-if="isSandbox"
    >
      <div class="sandbox-top">
        <p class="sandbox-top-circle" />
        <p class="sandbox-top-title defaultFontLight">
          {{ $t('sandbox.selectSandbox') }}
        </p>
      </div>
      <div class="sandboxs">
        <div
          class="one-sandbox hoverHands"
          v-for=" (item,index) in sandbox"
          :key="index"
          @click="selectSandbox(index)"
        >
          <div class="sandbox-content">
            <img
              class="select-img"
              :src="activeItem === index ? require('@/assets/images/sandbox/selected.png'): require('@/assets/images/sandbox/unselected.png')"
              alt=""
            >
            <img
              class="sandbox-img"
              :src="sandboxImgs[index%4]"
              alt=""
            >
            <p
              class="sandbox-detail hoverHands defaultFontLight"
              @click.stop="goDetail(item);getIndex(index)"
            >
              {{ $t('common.detail') }}
            </p>
          </div>
          <p class="sandbox-name defaultFontLight">
            {{ item.name }}
          </p>
        </div>
      </div>
      <el-button
        id="btn_selectSandbox"
        class="makesure common-btn"
        @click="selectFinish"
      >
        {{ $t('common.finish') }}
      </el-button>
    </div>
    <div
      v-else
      class="all-sandbox common-div-bg"
    >
      <div class="sandbox-top">
        <p class="sandbox-top-circle" />
        <p class="sandbox-top-title defaultFontLight">
          {{ $t('sandbox.sandboxDetail') }}
        </p>
      </div>
      <div
        class="details"
      >
        <div class="detail-left">
          <div class="detail-left-img flex-center">
            <img
              :src="sandboxImg"
              alt=""
            >
          </div>
          <p class="defaultFontLight">
            {{ this.sandboxDetailsName }}
          </p>
        </div>
        <div class="detail-right">
          <div class="detail-name">
            <p
              v-for="(item,i) in sandboxDetailsNames"
              :key="i"
            >
              {{ item +':' }}
            </p>
          </div>
          <div class="detail-val">
            <p
              v-for="(item,i) in sandboxDetailsVals"
              :key="i"
            >
              {{ item }}
            </p>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <el-button
          id="btn_backSandbox"
          class="common-btn btn_margin_right"
          @click="backSandbox"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="btn_checkSandbox"
          class="common-btn"
          @click="checkSandbox"
        >
          {{ $t('common.select') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { sandbox } from '../../../api/developerApi.js'
export default {
  name: 'SandboxFrame',
  data () {
    return {
      sandbox: [],
      activeItem: '',
      isSelected: false,
      isSandbox: true,
      sandboxImgs: [
        require('../../../assets/images/sandbox/sandbox1.png'),
        require('../../../assets/images/sandbox/sandbox2.png'),
        require('../../../assets/images/sandbox/sandbox3.png'),
        require('../../../assets/images/sandbox/sandbox4.png')
      ],
      sandboxImg: '',
      sandboxName: '',
      vimType: sessionStorage.getItem('vimType'),
      architecture: sessionStorage.getItem('architecture'),
      mechostid: '',
      applicationId: sessionStorage.getItem('applicationId') || '',
      sandboxDetailsNames: [],
      sandboxDetailsVals: [],
      sandboxDetailName: ''
    }
  },
  methods: {
    selectSandbox (value) {
      this.activeItem = value === this.activeItem ? '' : value
    },
    goDetail (item) {
      this.sandboxDetailsNames = []
      this.sandboxDetailsVals = []
      this.isSandbox = false
      this.sandboxDetailsName = item.name
      let sandboxDetails = JSON.parse(item.resource)
      for (let i in sandboxDetails) {
        this.sandboxDetailsNames.push(i)
        this.sandboxDetailsVals.push(sandboxDetails[i])
      }
    },
    getIndex (index) {
      this.activeItem = index
      this.sandboxImg = this.sandboxImgs[this.activeItem % 4]
    },
    backSandbox () {
      this.isSandbox = true
    },
    checkSandbox () {
      this.isSandbox = true
    },
    selectFinish () {
      this.mephostid = this.sandbox[this.activeItem].id
      let mepHostId = { mepHostId: this.mephostid }
      sandbox.selectSandbox(this.applicationId, mepHostId).then(() => {
        this.sandboxName = this.sandbox[this.activeItem].name
        this.$emit('returnSelectSandbox', this.sandboxName)
        this.$store.commit('changeFlow', '3')
        sessionStorage.setItem('sandboxName', this.sandboxName)
      }).catch(err => {
        console.log(err)
      })
    },
    getSandboxLists () {
      sandbox.getSandboxList(this.vimType, this.architecture).then(res => {
        if (res.data && res.data.results.length <= 0) {
          return
        }
        this.sandbox = res.data.results
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getSandboxLists()
  }
}
</script>

<style lang="less">
.select-sandbox{
  width: 100%;
  font-size: 20px;
  .all-sandbox{
    width: 695px;
    padding: 20px 2%;
    min-height: 405px;
    margin: 245px auto;
    background-size: 100% 100%;
    .sandbox-top{
      display: flex;
      .sandbox-top-circle{
        background-color: #76E1E9;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        margin:6px 6px 0 0;
      }
      .sandbox-top-title{
        font-size: 16px;
        color: #fff;
      }
    }
    .sandboxs{
      margin-top: 40px;
      width: 100%;
      position: relative;
      justify-content: flex-start;
      flex-wrap: wrap;
      display: flex;
      .one-sandbox{
        width: 98px;
        height: 168px;
        margin: 0 24px 40px 32px;
        .sandbox-content{
          height: 168px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: url('../../../assets/images/sandbox/sandboxBg.png') no-repeat center;
          background-size: cover;
          .select-img{
            width: 16px;
            height: 16px;
            margin: 14% 0 6% 0;
          }
          .sandbox-img{
            margin-top: 12px;
            width: 50px;
            height: 100px;
            width: 46.36px;
          }
          .sandbox-detail{
            font-size: 12px;
            color: #5944c0;
            padding: 4px 10px;
            background-color: #fff;
            border-radius: 12px;
            display: none;
            margin-top: -40px;
          }
        }
        .sandbox-name{
          margin-top: 12%;
          font-size: 14px;
          color: #fff;
          text-align: center;
        }
      }
      .one-sandbox:hover{
        .sandbox-detail{
          display: block;
        }
      }
    }
    .makesure{
      position: relative;
      left: 527px;
      margin-top: 40px;
    }
    .details{
      display: flex;
      font-size: 14px;
      color: #fff;
      padding-top: 60px;
      .detail-left{
        margin: 0px 86px 0px 90px;
        .detail-left-img{
          width: 100px;
          height: 168px;
          background: url('../../../assets/images/sandbox/sandboxBg.png') no-repeat center;
          img{
            width: 57px;
            height: 94px;
          }
        }
        p{
          text-align: center;
          margin-top: 40px;
        }
      }
      .detail-right{
        display: flex;
        max-width: 400px;
        p{
          line-height:24px;
          color: #fff;
          font-size: 14px;
          letter-spacing: 1px;
          font-family: defaultFontLight,
            Arial,
            Helvetica,
            sans-serif !important;
        }
        .detail-name{
          p{
             text-align: right;
             margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
