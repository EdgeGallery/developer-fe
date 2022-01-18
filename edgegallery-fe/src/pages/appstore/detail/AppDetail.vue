<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="app_detail padding_default">
    <div class="title_top">
      {{ $t('store.introduction') }}
      <el-button
        class="common-btn rt"
        @click="backApp"
      >
        {{ $t('common.back') }}
      </el-button>
    </div>

    <div class="app_info_div common-div-bg">
      <div class="app_icon">
        <img
          :src="appIconPath"
          alt=""
        >
      </div>
      <div class="app_info">
        <p class="app_title defaultFontBold">
          {{ currentData.name }}
          <span class="createTime defaultFontLight">{{ currentData.createTime }}</span>
        </p>
        <div class="app_version">
          <select
            class="drop-down"
            v-model="currentData"
            v-show="pathSource==='index'"
            @change="updateData"
          >
            <option
              v-for="(data, index) in tableData"
              :value="data"
              :key="index"
            >
              {{ data.version }}
            </option>
          </select>
          <span v-show="pathSource==='myapp'">{{ currentData.version }}</span>
          <span class="fg defaultFontLight" />
          {{ currentData.provider }}
          <span class="fg defaultFontLight" />
          {{ currentData.size }}
        </div>
        <p class="app_desc defaultFontLight">
          {{ currentData.shortDesc }}
        </p>
        <p class="app_tag clearfix">
          <span class="industry">
            {{ currentData.industry }}
          </span>
          <span class="architecture">
            {{ currentData.affinity }}
          </span>
          <span class="type">
            {{ currentData.type }}
          </span>
          <span class="deployMode">
            {{ currentData.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
          </span>
        </p>
      </div>
      <div class="app_score">
        <p class="score_num defaultFontLight">
          {{ score }}
        </p>
        <el-rate
          v-model="score"
          disabled
          text-color="#ff9900"
          score-template="{value}"
        />
        <p class="download_num">
          {{ downloadNum }}{{ this.$t('store.downloadNum') }}
        </p>

        <el-button
          class="common-btn"
          :disabled="!canDownload || currentData.userId===userId ? false : true"
          @click="download(currentData)"
        >
          {{ $t('store.download') }}
        </el-button>
      </div>
    </div>

    <div
      class="app_content"
    >
      <div>
        <ul class="list_top clear">
          <li
            @click="activeName='appDetail'"
            :class="{'appDetail_active':activeName==='appDetail','appDetail_comment':activeName==='comment',
                     'appDetail_vedio':activeName==='vedio' || activeName==='appShow' || activeName==='meao',
                     'appDetail_comment_meao_no_appShow':!ifExperience && activeName==='meao'}"
          >
            <span>
              {{ $t('store.introduction') }}
            </span>
          </li>
          <div
            v-if="activeName !=='appDetail' && activeName !== 'comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            @click="activeName='comment'"
            :class="{'comment_active':activeName==='comment','comment_default':activeName==='appDetail',
                     'comment_default_appShow_meao':ifSynchronize && ifExperience && activeName==='appShow',
                     'comment_default_appShow_nomeao':!ifSynchronize && activeName==='appShow',
                     'comment_default_no_appShow_meao':!ifSynchronize && !ifExperience && activeName==='vedio',
                     'comment_default_meao_noAppShow':!ifExperience && activeName==='meao',
                     'comment_default_vedio_noAppShow':!ifExperience && ifSynchronize && activeName ==='vedio'}"
          >
            <span>
              {{ $t('store.comments') }}
            </span>
          </li>

          <div
            v-if="activeName!=='appShow'&& !ifSynchronize && ifExperience && activeName !=='comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName!=='appShow'&& !ifSynchronize && !ifExperience && activeName ==='appDetail'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName!=='appShow'&& ifExperience && ifSynchronize && activeName !=='comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            v-if="ifExperience"
            @click="activeName='appShow'"
            :class="{'appShow_active':activeName==='appShow',
                     'appShow_no_active':activeName !=='appShow',
                     'appShow_default_meao':activeName ==='vedio',
                     'appShow_default':activeName==='comment',
                     'appShow_default3':activeName==='meao',
                     'appShow_default3':!ifSynchronize && activeName==='vedio',
                     'appShow_default_vedio':ifSynchronize && activeName==='vedio'}"
          >
            <span>
              {{ $t('store.showOnline') }}
            </span>
          </li>
          <div
            v-if="activeName!=='meao'&& ifExperience && ifSynchronize && activeName !=='appShow'&& activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName ==='meao'&& ifExperience && ifSynchronize && activeName !=='appShow'&& activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName ==='appDetail'&& ifExperience && !ifSynchronize"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName ==='comment'&& ifExperience && !ifSynchronize"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize && !ifExperience && activeName !=='comment' && activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <li
            @click="activeName='vedio'"
            :class="{'vedio_active': ifSynchronize &&activeName==='vedio',
                     'vedio_active_no_Meao': !ifSynchronize && activeName==='vedio',
                     'vedio_default_appshow':!ifSynchronize && ifExperience && activeName ==='appShow',
                     'vedio_default_appshow_meao':ifSynchronize && ifExperience && activeName ==='appShow',
                     'vedio_default':ifExperience && ifSynchronize && activeName ==='appDetail' || activeName ==='meao' ,
                     'vedio_default_noMeao': ifExperience && !ifSynchronize &&activeName ==='appDetail',
                     'vedio_default_no_AppshowMeao':!ifSynchronize && !ifExperience && activeName==='appDetail',
                     'vedio_default2_appShow_meao': ifExperience && ifSynchronize &&activeName==='meao',
                     'vedio_default2_no_AppshowMeao':!ifSynchronize && !ifExperience && activeName==='comment',
                     'vedio_default2_comment_no_Meao':!ifSynchronize && ifExperience && activeName==='comment',
                     'vedio_default2_meao_no_Appshow':!ifExperience && activeName==='meao',
                     'vedio_default2_comment_no_Appshow':!ifExperience&& ifSynchronize && activeName==='comment'}"
          >
            <span>
              {{ $t('store.demo') }}
            </span>
          </li>
          <div
            v-if="ifSynchronize && ifExperience && activeName !=='vedio' && activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize && !ifExperience && activeName !=='vedio'&& activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            v-if="ifSynchronize"
            @click="activeName='meao'"
            :class="{'meao_active':activeName==='meao','meao_default':activeName ==='appShow',
                     'meao_default_comment_noappShow':!ifExperience && activeName ==='comment',
                     'meao_default_vedio_appShow':activeName ==='vedio',
                     'meao_default_vedio_appDetail':activeName ==='appDetail',
                     'meao_default_comment':activeName ==='comment'}"
          >
            <span>
              {{ $t('store.synchronizeToMeao') }}
            </span>
          </li>
          <li
            class="last_li"
            :class="{'appShow_active':ifSynchronize && activeName==='meao',
                     'last_default':ifSynchronize && activeName!=='meao',
                     'last_default2':ifSynchronize && activeName==='meao',
                     'appShow_active':!ifSynchronize && activeName==='vedio',
                     'last_default_vedio':!ifSynchronize && activeName!=='vedio',
                     'last_default2_vedio':!ifSynchronize && activeName==='vedio'}"
          >
            <span />
          </li>
        </ul>
      </div>
      <p :class="{'left-corner':activeName!=='appDetail'}">
        <span />
      </p>
      <div
        class="container_div common-div-bg"
        :class="{'container_div_active common-div-bg':activeName!=='appDetail'}"
        style="padding:0;"
      >
        <appIntroduction
          v-if="activeName==='appDetail'"
          :source="this.source"
          :show-details="this.isShowDetails"
          ref="appIntroduction"
        />
        <appComments
          v-if="activeName==='comment'"
          :app-id="this.appId"
          :user-id="this.currentData.userId"
          ref="appComments"
        />
        <appShowOnline
          v-show="activeName==='appShow'"
          :package-id="this.packageId"
          :app-id="this.appId"
          :if-experience="this.ifExperience"
          ref="appShowOnline"
        />
        <synchronizeMeao
          v-if="activeName==='meao'"
          :package-id="this.packageId"
          :current-data="this.currentData"
          ref="synchronizeMeao"
        />
        <appVideo
          v-if="activeName==='vedio'"
          :player-options="this.playerOptions"
          ref="appVideo"
        />
      </div>
    </div>
    <el-dialog
      :title="$t('store.downloadImage')"
      :visible.sync="isShowDownload"
      :show-close="false"
      center
    >
      <el-radio-group
        v-model="isDownloadImage"
        @change="handleSlect()"
        class="down_radio"
      >
        <el-radio :label="false">
          {{ $t('store.noNeed') }}
        </el-radio>
        <p class="p_bot">
          <em class="el-icon-warning" />
          {{ $t('store.downloadImageTip') }}
        </p>
        <el-radio :label="true">
          {{ $t('store.need') }}
        </el-radio>
        <p class="p_bot">
          <em class="el-icon-warning" />
          {{ $t('store.downloadImageTip2') }}
        </p>
      </el-radio-group>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancelImage(currentData)"
          class="cancle_btn"
        >{{ $t('atp.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="confirmImage(currentData)"
        >{{ $t('atp.confirm') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="30%"
      :visible.sync="showSubDialog"
      :show-close="false"
      class="dialog_host default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        {{ $t('order.subscribe') }}
      </div>
      <div class="buy_content">
        <el-form>
          <el-form-item
            :label="$t('order.appNameLabel')"
          >
            <span class="val_span">{{ currentData.name }}</span>
          </el-form-item>
          <el-form-item
            :label="$t('order.subPrice')"
          >
            <span class="val_span">{{ price }}{{ $t('order.price') }}</span>
          </el-form-item>
          <el-form-item
            :label="$t('appstoreSystem.address')"
          >
            <el-select
              v-model="mechostIp"
              :placeholder="$t('appstoreCommon.choose')"
              style="width: 260px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer dialogPadding"
      >
        <el-button
          @click="showSubDialog = false,btnLoading = false"
          class="bgBtn"
        >{{ $t('appstoreCommon.cancel') }}</el-button>
        <el-button
          @click="confirmToBuy"
          class="bgBtn"
          :loading="btnLoading"
        >{{ $t('appstoreCommon.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appIntroduction from './AppIntroduction.vue'
import appComments from './AppComments.vue'
import appVideo from './AppVideo.vue'
import appShowOnline from './AppShowOnline.vue'
import synchronizeMeao from './SynchronizeMeao.vue'
import { appstoreApi, URL_PREFIX_APPSTORE } from '../../../api/appstoreApi'
import { INDUSTRY, TYPES, MEAO } from '../tools/constant.js'
import { formatDateTime } from '../../../tools/common.js'
export default {
  name: '',
  components: {
    appIntroduction,
    appComments,
    appVideo,
    appShowOnline,
    synchronizeMeao
  },
  data () {
    return {
      MEAO: MEAO,
      activeName: 'appDetail',
      ifSubscribe: true,
      ifExperience: false,
      ifSynchronize: false,
      canDownload: false,
      userId: sessionStorage.getItem('userId'),
      details: '',
      appId: '',
      tableData: [],
      isDownloadImage: false,
      isShowDownload: false,
      currentData: {},
      comments: {
        score: 0,
        message: ''
      },
      source: '',
      appIconPath: '',
      playerOptions: {
        muted: false,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        language: 'en',
        aspectRatio: '16:9',
        sources: []
      },
      language: localStorage.getItem('language'),
      pathSource: sessionStorage.getItem('pathSource'),
      packageId: '',
      downloadNum: 0,
      limit: 100,
      offset: 0,
      name: '',
      ip: '',
      nodePort: '',
      experienceData: [
        {
          serviceName: '',
          nodePort: '',
          mecHost: ''
        }
      ],
      btnInstantiate: false,
      btnClean: true,
      deployStatus: 'NOTDEPLOY',
      displayDom: false,
      version: '',
      showSubDialog: false,
      options: [],
      mechostIp: '',
      role: sessionStorage.getItem('userNameRole'),
      price: 0,
      btnLoading: false,
      score: '',
      isShowDetails: false
    }
  },
  watch: {
    tableData: function (val) {
      if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
        this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
        this.ifExperience = this.currentData.experienceAble
        this.source = this.currentData.details
        this.checkProjectData()
      }
      return ''
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.checkProjectData()
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('fromPath', from.path)
    next(true)
  },
  methods: {
    backApp () {
      this.$router.push('/EG/appstore/appWarehouse')
    },
    beforeBuyIt () {
      if (sessionStorage.getItem('userNameRole') === 'tenant' || sessionStorage.getItem('userNameRole') === 'admin') {
        this.showSubDialog = true
        appstoreApi.getMechosts().then(res => {
          this.options = []
          if (res.data && res.data.data.length > 0) {
            res.data.data.forEach(item => {
              let obj = {}
              obj.value = item.mechostIp
              obj.label = item.mechostCity
              this.options.push(obj)
            })
          } else {
            this.$message.warning(this.$t('order.noNodes'))
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$message.warning(this.$t('appstoreSystem.guestPrompt'))
      }
    },
    confirmToBuy () {
      let param = {
        'appId': this.appId,
        'mecHostIp': this.mechostIp,
        'appPackageId': this.packageId
      }
      if (this.mechostIp !== '') {
        this.btnLoading = true
        appstoreApi.createOrder(param).then(res => {
          this.$message.success(this.$t('order.subSuccess'))
          this.$router.push('/orders')
        })
      } else {
        this.$message.warning(this.$t('order.chooseArea'))
      }
    },
    getTableData () {
      let userId = null
      if (this.pathSource === 'myapp') {
        userId = sessionStorage.getItem('userId')
      }
      appstoreApi.getAppDetailTable(this.appId, userId, this.limit, this.offset).then(res => {
        let data = res.data
        data.forEach(item => {
          if (this.pathSource !== 'myapp' && item.status === 'Published') {
            this.ifExperience = item.experienceAble
            this.packageId = item.packageId
          }
        })
        this.handleTableTada(data)
        if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
          this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
          this.source = this.currentData.details
          this.isShowDetails = this.source !== '' ? 'show' : ''
          this.appIconPath = URL_PREFIX_APPSTORE + 'apps/' + this.currentData.appId + '/packages/' + this.currentData.packageId + '/icon'
          this.ifExperience = this.currentData.experienceAble
          if (sessionStorage.getItem('userNameRole') === 'tenant' && this.userId !== this.currentData.userId) {
            this.ifSynchronize = false
          }
          this.checkProjectData()
        }
      })
    },
    handleTableTada (data) {
      data.forEach(item => {
        let newDateBegin = formatDateTime(item.createTime)
        item.createTime = newDateBegin
        let size = (Number(item.size) / 1024).toFixed(2)
        if (size >= 1024) {
          item.size = (size / 1024).toFixed(2) + ' MB'
        } else {
          item.size = size + ' KB'
        }
        this.tableData.push(item)
        if (item.demoVideoName) {
          let val = {
            type: 'video/mp4',
            src: URL_PREFIX_APPSTORE + 'apps/' + this.appId + '/demoVideo'
          }
          this.playerOptions.sources.push(val)
        }
      })
    },
    updateData () {
      this.ifExperience = this.currentData.experienceAble
      this.source = this.currentData.details
      this.appIconPath = URL_PREFIX_APPSTORE + 'apps/' + this.currentData.appId + '/packages/' + this.currentData.packageId + '/icon'
      this.checkProjectData()
    },
    cancelImage (row) {
      this.isDownloadImage = false
      this.isShowDownload = false
    },
    confirmImage (row) {
      appstoreApi.downloadAppPakageApi(this.appId, row, this.isDownloadImage)
      this.isShowDownload = false
      this.isDownloadImage = false
    },
    ifDownloadImage (currentData, row) {
      if (this.currentData.deployMode === 'vm') {
        this.isShowDownload = true
      } else {
        this.isDownloadImage = false
        appstoreApi.downloadAppPakageApi(this.appId, row, this.isDownloadImage)
      }
    },
    download (row) {
      this.ifDownloadImage(this.currentData, row)
      this.getAppData()
    },
    checkProjectData () {
      INDUSTRY.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.currentData.industry === itemFe.labelen) {
            this.currentData.industry = itemFe.labelcn
          }
        } else {
          if (this.currentData.industry === itemFe.labelcn) {
            this.currentData.industry = itemFe.labelen
          }
        }
      })
      TYPES.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.currentData.type === itemFe.labelen) {
            this.currentData.type = itemFe.labelcn
          }
        } else {
          if (this.currentData.type === itemFe.labelcn) {
            this.currentData.type = itemFe.labelen
          }
        }
      })
    },
    getAppData () {
      appstoreApi.getAppList(this.appId).then(
        (res) => {
          this.score = res.data.score
          this.downloadNum = res.data.downloadCount
          if (!res.data.free) {
            this.price = res.data.price
          }
        },
        () => {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.getAppFail')
          })
        }
      )
    },
    getMyAppData () {
      appstoreApi.getPackageDetail(this.appId, this.packageId).then(res => {
        let data = res.data
        let newDateBegin = formatDateTime(data.createTime)
        data.createTime = newDateBegin
        this.tableData.push(data)
        if (data) {
          this.source = data.details
        }
      })
    }
  },
  mounted () {
    let _userNameRole = sessionStorage.getItem('userNameRole')
    this.canDownload = _userNameRole !== 'guest' && _userNameRole !== 'tenant'
    let params = this.$route.params.item
      ? this.$route.params.item
      : JSON.parse(sessionStorage.getItem('appstordetail'))
    this.details = params
    this.appId = this.details.appId
    this.packageId = this.details.packageId
    this.ifExperience = this.details.experienceAble
    if (this.details.score) {
      this.score = this.details.score
      this.downloadNum = this.details.downloadCount
    }
    if (this.details.packageId) {
      this.packageId = this.details.packageId
      if (this.pathSource === 'myapp') {
        this.source = this.details.details
        this.getMyAppData()
      }
    }
    this.appIconPath = URL_PREFIX_APPSTORE + 'apps/' + this.appId + '/packages/' + this.packageId + '/icon'
    this.getAppData()
    this.getTableData()
    this.checkProjectData()
    this.ifSynchronize = _userNameRole !== 'guest'
  }
}
</script>

<style lang="less">
.app_detail{
  .title_top{
    padding: 60px 0 20px !important;
    position: relative;
    font-size: 24px;
    font-family: defaultFont, sans-serif;
    font-weight: bold;
    color: #FFFFFF;
  }
  .el-dialog{
    text-align: left;
    box-shadow: 2px 5px 23px 10px rgba(104, 142, 243, 0.2) inset;
    width: 535px;
  }
  .el-dialog__header{
    border-bottom: 2px solid #e0e0e0;
    background: transparent !important;
  }
  .down_radio{
    padding: 18px 25px;
    width: 400px;
    text-align: left;
    .el-radio{
      width: 350px;
      .el-radio__label{
        font-size: 20px;
      }
      .el-radio__input.is-checked + .el-radio__label{
        color: #606266;
      }
    }
    .p_bot{
      width: 360px;
      margin:0 0 30px 0px;
      color: #aaa;
      font-size: 14px;
    }
  }
  .dialog-footer {
    text-align: right;
    .cancle_btn{
      color: #587fe7;
      margin-right: 30px !important;
    }
  }
  p{
    margin-bottom: 0;
    font-size: 14px;
    width: 100%;
  }
  .app_info_div{
    border-radius: 16px;
    padding: 20px 0 20px 70px;
    display: flex;
    align-items: center;
    .app_icon{
      width: 120px;
      height: 120px;
      border-radius: 12px;
      margin-right: 40px;
      img{
        width: 100%;
      }
    }
    .app_info{
      width: calc(100% - 610px);
      padding: 0 20px;
      word-wrap: break-word;
      .app_title{
        font-size: 26px;
        color: #FFFFFF;
        .createTime{
          font-size: 16px;
          color: #FFFFFF;
          margin-left: 10px;
        }
      }
      .app_version{
        margin-top: 8px;
        height: 24px;
        line-height: 24px;
        .drop-down{
          top:-2px;
          margin-right: 5px;
          color: #FFFFFF;
          border-radius: 4px;
          border: none;
          background: rgba(250,250,250,0.3);
          option{
             color: #4E3494;
          }
          option:hover{
            background: rgba(250,250,250,0.3);
            color: #FFFFFF;
            cursor: pointer;
          }
        }
        .drop-down:hover{
          cursor: pointer;
        }
        .drop-down.is-selected{
          border: none;
        }
        .fg{
          display: inline-block;
          width: 2px;
          height: 14px;
          background: #FFFFFF;
          opacity: 0.5;
          margin: 0 10px;
          position: relative;
          top: 1px;
        }
      }
      .app_desc{
        margin: 10px 0;
        line-height: 23px;
      }
      .app_tag{
        span{
          float: left;
          font-size: 12pt;
          border-radius: 4px;
          padding: 5px 20px 5px 10px;
          margin-right: 20px;
          background: #3E2680;
          margin-bottom: 10px;
        }
        .industry{
          color: #FFB800;
        }
        .architecture{
          color: #16E9EF;
        }
        .type{
          color: #9374FF;
        }
        .deployMode{
          color: #FF7C50;
        }
      }
    }
    .app_score{
      width: 240px;
      text-align: center;
      float: right;
      .download_num{
        float: left;
        height: 26px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 5px;
        color: #FFFFFF;
        font-size: 14px;
      }
      .score_num{
        color: #FFFFFF;
        float: left;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 24px;
        margin: 5px 0;
      }
      .el-rate{
        float: left;
        width: 100%;
        text-align: center;
        .el-rate__icon{
          font-size: 22px;
          margin: 0 0 0 6px;
          color: #cb7234;
        }
      }
      .batchProButton{
        margin-top: 10px;
        text-align: center;
        height: 40px !important;
        width: 160px !important;
        border-radius: 25px !important;
        color: #0F0D87 !important;
        background: #DDE6FF;
        font-family: HarmonyHeiTi, sans-serif;
        font-weight: 300;
        font-size: 24px;
      }
    }
  }
  .app_content{
    border-radius: 0 16px 16px 16px;
    margin-top: 20px;
    position: relative;
    .left-corner{
      position: absolute;
      width: 16px;
      height: 16px;
      background: #4E3494;
      z-index: 100;
      span{
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 16px  0px 0px 0px;
        background: #331A85;
      }
    }
    .horizontal-cell{
      padding: 15px 0;
      float: left;
      width: 2px;
      height: 50px;
      background: #4E3494;
      .link-right {
        width: 3px;
        height: 21px;
        border-right: 2px solid #331A85 ;
      }
    }
    .separator{
        position: relative;
        height: 100%;
    }
    .separator:after{
      position: absolute;
      top:10px;
      height: calc(100% - 2px);
      left:0;
      content: '';
      width:0;
    }
    .list_top{
      li{
        float: left;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        background: #4E3494;
        span{
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 26px;
          font-size: 16px;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .last_li{
        cursor: default;
      }
      em{
        display: inline-block;
        width: 19px;
        height: 22px;
        position: relative;
        top: 4px;
        margin-right: 10px;
      }
      .appDetail_active{
        background: #4E3494;
        border-radius: 16px 0 0 0;
        transition: all 0.1s;
        span{
          background: #331A85;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .appDetail_comment{
        background: #331A85;
        border-radius: 16px 0 0 0;
        span{
          background: #4E3494;
          border-radius: 16px 0 16px 0;
          transition: all 0.1s;
        }
      }
      .appDetail_comment_meao_no_appShow{
        background: #fff;
        border-radius: 16px 0 0 0;
        span{
          background: #d4d1ec;
          border-radius: 16px 0 0 0;
          transition: all 0.1s;
        }
      }
      .appDetail_vedio{
        background: #331A85;
        border-radius: 16px 0 0 0;
        span{
          border-radius: 16px 0 0 0;
          transition: all 0.1s;
          background: #4E3494;
        }
      }
      .comment_active{
        background: #4E3494;
        transition: all 0.1s;
        span{
          background: #331A85;
          border-radius: 16px 16px 0 0;
          color:#fff;
          transition: all 0.1s;
        }
      }
      .comment_default{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 16px;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .comment_default_appShow_meao{
        background: #331A85;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_appShow_nomeao{
        background: #331A85;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_meao_noAppShow{
        background: #331A85;
        span{
          background: #4E3494;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }
      }
      .comment_default_no_appShow_meao{
        background: #331A85;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
        }
      }
      .comment_default_vedio_noAppShow{
        background: #331A85;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
        }
      }
      .appShow_default_vedio{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
        }
      }
      .comment_default_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
        }
      }
      .last_li.last_active{
        background: #fff;
        span{
          background: #f5f6f8;
          border-radius: 0 0 0 0;
        }
      }
      .last_li.last_default{
        background: #4E3494;
        span{
          background: #3e269b;
          border-radius: 0 0 0 16px;
        }
      }
      .last_li.last_default_vedio{
        background: #4E3494;
        span{
          background: #3e269b;
          border-radius: 0 0 0 16px;
        }
      }
      .last_li.last_default2_vedio{
        background: #331A85;
        span{
          background: #3e269b;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .last_li.last_default2{
        background: #331A85;
        span{
          background: #3e269b;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_active{
        background: #4E3494;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #331A85;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .appShow_no_active{
        background: #4E3494;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 0;
          color:#fff;
          transition: all 0.1s;
        }
      }
      .appShow_default{
        background: #331A85;
        span{
          background: #4E3494;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_default_meao{
        background: #331A85;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_default_comment{
        background: #331A85;
        border-radius: 0 16px 0 0;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .appShow_default3{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_active{
        background: #4E3494;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #331A85;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .meao_default{
        background: #331A85;
        border-radius: 0 16px 0 16px;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default_appshow{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default_appshow_meao{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }

      }
      .meao_default_comment_noappShow{
        background: #331A85;
        border-radius: 0 16px 0 16px;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
        }
      }
      .meao_default_vedio_noappShow{
        background: #331A85;
        border-radius: 0 0 0 16px;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .meao_default_vedio_appShow{
        background: #331A85;
        border-radius: 0 16px 0 0;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .meao_default_vedio_appDetail{
        background: #331A85;
        border-radius: 0 16px 0 0;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
           transition: all 0.1s;
         }
       }

      .vedio_active{
        background: #4E3494;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #331A85;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .vedio_default_noMeao{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_active_no_Meao{
        background: #4E3494;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #331A85;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .vedio_default{
        background: rgba(250,250,250,0.0001);
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default_no_AppshowMeao{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2{
        background: #fff;
        border-radius: 0 16px 0 16px;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_appShow_meao{
        background: #331A85;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2_no_AppshowMeao{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_comment_no_Meao{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2_meao_no_Appshow{
       background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2_comment_no_Appshow{
        background: #331A85;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
    }
  }
  .container_div{
    height: 410px;
    overflow: auto;
    border-radius: 0 16px 16px 16px;
    transition: all 0.1s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
  }
  .container_div_active{
    border-radius: 0 16px 16px 16px;
  }
}
</style>
