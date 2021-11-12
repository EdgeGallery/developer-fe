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
    <img
      src="../../../assets/images/sandbox/question.png"
      alt=""
      class="question hoverHands"
    >
    <div
      class="all-sandbox"
      v-if="isSandbox"
    >
      <div class="sandbox-top">
        <p class="sandbox-top-circle" />
        <p class="sandbox-top-title defaultFontLight">
          选择沙箱
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
              详情
            </p>
          </div>
          <p class="sandbox-name defaultFontLight">
            {{ item.name }}
          </p>
        </div>
      </div>
      <el-button
        class="makesure common-btn"
        @click="selectFinish"
      >
        完成
      </el-button>
    </div>
    <div
      v-else
      class="all-sandbox"
    >
      <div class="sandbox-top">
        <p class="sandbox-top-circle" />
        <p class="sandbox-top-title defaultFontLight">
          沙箱详情
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
            {{ form.name }}
          </p>
        </div>
        <div class="detail-right">
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
          >
            <el-form-item label="网络:">
              <p>{{ form.net }}</p>
            </el-form-item>
            <el-form-item label="X86计算资源:">
              <p>{{ form.xIntentnet }}</p>
            </el-form-item>
            <el-form-item label="ARM计算资源:">
              <p>{{ form.armIntentnet }}</p>
            </el-form-item>
            <el-form-item label="GPU算力:">
              <p>{{ form.gpu }}</p>
            </el-form-item>
            <el-form-item label="AI加速:">
              <p>{{ form.ai }}</p>
            </el-form-item>
            <el-form-item label="终端:">
              <p>{{ form.final }}</p>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="btns">
        <el-button
          class="common-btn btn_margin_right"
          @click="backSandbox"
        >
          返回
        </el-button>
        <el-button
          class="common-btn"
          @click="checkSandbox"
        >
          选择
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
      form: [],
      sandboxImgs: [
        require('../../../assets/images/sandbox/sandbox1.png'),
        require('../../../assets/images/sandbox/sandbox2.png'),
        require('../../../assets/images/sandbox/sandbox3.png'),
        require('../../../assets/images/sandbox/sandbox4.png')
      ],
      sandboxImg: '',
      sandboxName: '',
      vimType: 'OpenStack',
      architecture: 'X86',
      mechostid: '',
      applicationId: sessionStorage.getItem('applicationId') || ''
    }
  },
  methods: {
    selectSandbox (value) {
      this.activeItem = value === this.activeItem ? '' : value
    },
    goDetail (item) {
      this.isSandbox = false
      this.form = item
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
        sessionStorage.setItem('sandboxName', JSON.stringify(this.sandboxName))
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
    background-image: url('../../../assets/images/sandbox/sandboxNameBg.png');
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
            width: 12px;
            height: 12px;
            margin: 14% 0 6% 0;
          }
          .sandbox-img{
            width: 50px;
            height: 100px;
          }
          .sandbox-detail{
            font-size: 8px;
            color: #fff;
            background-color: #76E1E9;
            border-radius: 6px;
            margin-top: 10px;
            padding: 2px 4px;
            transform: scale(0.8);
            display: none;
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
        margin: 0px 60px 0px 90px;
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
        .el-form-item__label {
          line-height:30px;
          color: #fff;
          font-family: defaultFontLight,
            Arial,
            Helvetica,
            sans-serif !important;
        }
        .el-form-item {
            margin-bottom: 0;
            max-width: 259px;
            font-family: defaultFontLight,
              Arial,
              Helvetica,
              sans-serif !important;
        }
      }
    }
    .btns{
        position: relative;
        left:420px;
        .btn_margin_right{
          margin-right: 14px !important;
        }
    }
  }
}
</style>
