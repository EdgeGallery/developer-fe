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
  <div class="appComments">
    <div class="submit_comment clearfix defaultFontLight">
      <span class="score_span defaultFontLight">{{ $t('store.score') }}</span>
      <el-rate
        v-model="comments.score"
        colors="colors"
        allow-half
        show-score
        text-color="#ff9900"
      />
      <div class="comment_input">
        <img
          :src="userIconUrl"
          alt=""
          class="user_icon"
        >
        <el-input
          type="textarea"
          v-model="comments.message"
          rows="5"
          maxlength="200"
          show-word-limit
          :placeholder="$t('store.commentInfo')"
        />
      </div>
      <div class="submit_btn">
        <el-button
          class="common-btn button-font"
          @click="submitComment"
        >
          {{ $t('myApp.publish') }}
        </el-button>
      </div>
    </div>
    <div
      class="no_comment"
      v-if="historyComentsList.length===0"
    >
      <img
        :src="noCommentIcon"
        alt=""
      >
      <p class="defaultFontLight">
        {{ $t('store.noComment') }}
      </p>
    </div>
    <div
      class="show_comment"
      v-if="historyComentsList.length!==0"
    >
      <div class="div_comment_total">
        <p class="p_count_Title defaultFontLight">
          {{ $t('store.allComments') }}
        </p>
        <p
          class="p_total defaultFontLight"
          :class="language==='cn'?'':'p_total_en'"
        >
          {{ total }}
        </p>
      </div>
      <ul>
        <li
          class="one-commont"
          v-for="(item,index) in historyComentsList"
          :key="index"
        >
          <div class="user_icon">
            <img
              :src="userIconUrl"
              alt=""
              v-if="!item.userIconUrl"
            >
            <img
              :src="item.userIconUrl"
              alt=""
              v-if="item.userIconUrl"
            >
          </div>
          <div class="user_info">
            <p class="userName defaultFontLight">
              {{ item.user.userName }}
            </p>
            <p class="commentTime defaultFontLight">
              {{ item.commentTime }}
            </p>
          </div>
          <div class="comment_content defaultFontLight">
            <el-rate
              v-model="item.score"
              disabled
              colors="colors"
              score-template="{value}"
              show-score
              text-color="#ff9900"
            />
            {{ item.body }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { appstoreApi } from '../../../api/appstoreApi'
import commonUtil from '../tools/commonUtil.js'
export default {
  name: 'AppComments',
  props: {
    userId: {
      required: true,
      type: String
    },
    appId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      appName: '',
      limit: 100,
      offset: 0,
      userIconUrl: require('../../../assets/images/appstore/app_detail_user.png'),
      noCommentIcon: require('../../../assets/images/appstore/app_detail_info_icon.png'),
      comments: {
        score: 0,
        message: ''
      },
      historyComentsList: [],
      language: localStorage.getItem('language'),
      colors: ['rgba(255, 255, 255, 0.01)'],
      total: 0
    }
  },
  methods: {
    submitComment () {
      if (sessionStorage.getItem('userNameRole') === 'guest') {
        this.$message.warning(this.$t('appstoreSystem.guestPrompt'))
      } else if (sessionStorage.getItem('userId') === this.userId) {
        this.$message.warning(this.$t('promptMessage.cannotComment'))
      } else {
        if (this.comments.score && this.comments.message) {
          let params = {
            score: this.comments.score,
            body: this.comments.message
          }
          params = JSON.stringify(params)
          let userId = sessionStorage.getItem('userId')
          let userName = sessionStorage.getItem('userName')
          appstoreApi.submitAppComment(this.appId, params, userId, userName).then(res => {
            this.getComments()
            this.comments.score = 0
            this.comments.message = ''
            this.getAppData()
          }).catch(error => {
            commonUtil.showTipMsg(this.language, error, error.response.data.message)
          })
        } else {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.subCommentFailReason')
          })
        }
      }
    },
    getComments () {
      appstoreApi.getComments(this.appId, this.limit, this.offset).then(res => {
        this.historyComentsList = res.data.results
        this.total = this.historyComentsList.length
        this.handleDate()
      }, () => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.getCommentFail')
        })
      })
    },
    handleDate () {
      this.historyComentsList.sort(function (a, b) {
        return b.commentTime < a.commentTime ? -1 : 1
      })
      let year = new Date().getFullYear()
      this.historyComentsList.forEach(item => {
        if (item.commentTime.indexOf(year) !== -1) {
          item.commentTime = item.commentTime.replace((year + '-'), '')
        }
      })
    }

  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getComments()
  }
}
</script>
<style lang="less">
.appComments {
  margin: auto;
  border-radius: 16px;
  padding: 20px 80px 20px 40px ;
  .submit_comment{
    padding: 20px;
    .score_span{
      float: left;
      font-size: 16px;
      margin-right: 20px;
    }
    .el-rate{
      float: left;
      margin: 3px 0 0 10px;
      .el-rate__icon{
        font-size: 12.5px;
        color: #cb7234;
      }
      .el-rate__text {
        margin-left: 6px;
      }
    }
    .comment_input{
      float: left;
      width: 100%;
      margin: 40px 0 20px;
      display: flex;
      .user_icon{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .el-textarea__inner{
        height: 80px;
        background: #4E3494;
        color: #fff;
        border: 1px solid rgba(225,225,225,0.5);
        border-radius: 12px;
        padding: 10px 30px 15px !important;
      }
    }
    .submit_btn{
      float: left;
      width: 100%;
      text-align: right;
      .button-font{
        font-family: defaultFont, Arial, Helvetica, sans-serif;
      }
    }
  }
  .show_comment{
    width: 100%;
    padding: 20px;
    .div_comment_total{
      position: relative;
      top: -11px;
      left: 20px;
      .p_count_Title {
        float: left;
        margin-right: 20px;
        font-size: 16px;
        color: #fff;
      }
      .p_total {
        position: relative;
        top: -20px;
        left: 80px;
        float: left;
        font-size: 16px;
        color: #fff;
      }
      .p_total_en{
        position: relative;
        top: -20px;
        left: 120px;
      }
    }
    .one-commont{
      margin: 20px;
      .user_info{
        position: relative;
        left: 60px;
        top: -50px;
        display: flex;
        .userName{
          width: 120px;
        }
      }
      .comment_content{
        position: relative;
        left: 60px;
        top: -40px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 40px;
        .el-rate {
          margin-bottom: 12px;
        }
      }
    }
  }
  .no_comment{
    color: #bbb;
    text-align: center;
    p{
      margin: 10px 0 30px;
    }
  }
}
</style>
