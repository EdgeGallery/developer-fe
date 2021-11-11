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
    </div>
    <div class="app_info_div common-div-bg">
      <div class="app_icon">
        <!-- <img
          :src="appIconPath"
          alt=""
        > -->
        <img
          src="../../../assets/images/appstore/app_bg_yanshi.png"
          alt=""
        >
      </div>
      <div class="app_info">
        <p class="app_title">
          {{ currentData.name }}
          <span class="createTime">{{ currentData.createTime }}</span>
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
          <span class="fg" />
          {{ currentData.provider }}
          <span class="fg" />
          {{ currentData.size }}
        </div>
        <p class="app_desc">
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
        <p class="score_num">
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
          class="batchProButton"
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
                     'appDetail_comment_meao_no_appShow':ifExperience===false && activeName==='meao'}"
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
                     'comment_default_appShow_meao':ifSynchronize === true && ifExperience===true && activeName==='appShow',
                     'comment_default_appShow_nomeao':ifSynchronize === false && activeName==='appShow',
                     'comment_default_no_appShow_meao':ifSynchronize === false && ifExperience===false && activeName==='vedio',
                     'comment_default_meao_noAppShow':ifExperience === false && activeName==='meao',
                     'comment_default_vedio_noAppShow':ifExperience === false && ifSynchronize === true && activeName ==='vedio'}"
          >
            <span>
              {{ $t('store.comments') }}
            </span>
          </li>

          <div
            v-if="activeName!=='appShow'&& ifSynchronize===false && ifExperience===true && activeName !=='comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName!=='appShow'&& ifExperience === true && ifSynchronize===true && activeName !=='comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            v-if="ifExperience"
            @click="activeName='appShow'"
            :class="{'appShow_active':activeName==='appShow','appShow_no_active':activeName !=='appShow','appShow_default_meao':activeName ==='meao',
                     'appShow_default':activeName==='comment','appShow_default3':activeName==='meao','appShow_default3':ifSynchronize===false && activeName==='vedio',
                     'appShow_default_vedio':ifSynchronize===true && activeName==='vedio'}"
          >
            <span>
              {{ $t('store.showOnline') }}
            </span>
          </li>
          <div
            v-if="activeName!=='meao'&& ifExperience === true && ifSynchronize===true && activeName !=='appShow'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===true && ifExperience===false && activeName !=='comment' && activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <li
            v-if="ifSynchronize"
            @click="activeName='meao'"
            :class="{'meao_active':activeName==='meao','meao_default':activeName ==='appShow','meao_default_comment_noappShow':ifExperience === false && activeName ==='comment',
                     'meao_default_vedio_noappShow':ifExperience === false && activeName ==='vedio',
                     'meao_default_vedio_appShow':ifExperience === true && activeName ==='vedio',
                     'meao_default_comment':activeName ==='comment'}"
          >
            <span>
              {{ $t('store.synchronizeToMeao') }}
            </span>
          </li>
          <div
            v-if="ifSynchronize===false && ifExperience === true && activeName !== 'appShow' && activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===false && ifExperience === false && activeName ==='appDetail'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===true && ifExperience === true && activeName !=='vedio' && activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===true && ifExperience===false && activeName !=='vedio'&& activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            @click="activeName='vedio'"
            :class="{'vedio_active':activeName==='vedio','vedio_default_appshow':activeName ==='appShow','vedio_default':activeName !=='vedio',
                     'vedio_default2_appShow_meao': ifExperience===true && ifSynchronize == true &&activeName==='meao',
                     'vedio_default2':ifSynchronize===false && activeName==='appShow',
                     'vedio_default2_no_AppshowMeao':ifSynchronize===false && ifExperience===false && activeName==='comment',
                     'vedio_default2_meao_no_Appshow':ifExperience===false && activeName==='meao',
                     'vedio_default2_comment_no_Appshow':ifExperience===false && ifSynchronize ===true && activeName==='comment'}"
          >
            <span>
              {{ $t('store.demo') }}
            </span>
          </li>
        </ul>
      </div>
      <div
        class="container_div common-div-bg"
        :class="{'container_div_active common-div-bg':activeName!=='appDetail'}"
      >
        <appIntroduction
          v-show="activeName==='appDetail'"
          :source="this.source"
          ref="appIntroduction"
        />
        <appComments
          v-show="activeName==='comment'"
          :app-id="this.appId"
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
          v-show="activeName==='meao'"
          :package-id="this.packageId"
          :current-data="this.currentData"
          ref="synchronizeMeao"
        />
        <appVideo
          v-show="activeName==='vedio'"
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
            :label="$t('system.address')"
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
import { appstoreApi, URL_PREFIX } from '../../../api/appstoreApi'
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
      ifExperience: false,
      ifSynchronize: false,
      canDownload: false,
      userId: sessionStorage.getItem('userId'),
      details: '',
      appId: '',
      tableData: [],
      isDownloadImage: false,
      isShowDownload: false,
      currentData: {
        name: '位置服务',
        createTime: '2021-11-5',
        version: '1.0',
        provider: 'test',
        size: '15M',
        shortDesc: 'AI_paint测试应用',
        industry: '智慧生活',
        affinity: 'AI',
        type: 'x86'
      },
      comments: {
        score: 0,
        message: ''
      },
      // source: 'this is test',
      source: "# WordPress Documentation Style Guide\r\n\r\nThe WordPress Documentation Style Guide is one of [Google Season of Docs' projects](https://developers.google.com/season-of-docs/docs/participants/project-wordpress-tacitonic) for 2020.  \r\n**⚠️ The Style Guide is currently under development.**\r\n\r\n- Technical writer: Atharva Dhekne ([@tacitonic](https://github.com/tacitonic))\r\n- Mentors: Felipe Elia ([@felipeelia](https://github.com/felipeelia)) and Milana Cap ([@zzap](https://github.com/zzap))\r\n\r\n## Proposed elements/components in the style guide\r\n\r\n| Status | Description |\r\n|---------|-------------|\r\n| 🔄      | In progress |\r\n| ✔️      | Completed   |\r\n| ❌      | Discarded   |\r\n| ⚠️      | Needs changes |\r\n\r\n### Style guide introduction (New section) 🔄\r\n\r\n| Component                          | Status  |\r\n|------------------------------------|---------|\r\n| WordPress style guide              |   🔄 (⚠️ while publishing)   |\r\n| Style guide highlights             |   🔄 (⚠️ while publishing)   |\r\n| Other resources                    |   ✔️   |\r\n| Changelog                          |   ✔️   |\r\n\r\n### Document guidelines 🔄\r\n\r\n| Component                          | Status  |\r\n|------------------------------------|---------|\r\n| Accessibility                      |   ✔️ (⚠️ while publishing)   |\r\n| Document structure                 |   ✔️ (⚠️ while publishing)   |\r\n| Changes to the guide (New component)|  ✔️ (⚠️ while publishing)   |\r\n| Encoding                           |   ✔️   |\r\n| External sources                   |   ✔️ (⚠️ while publishing)   |\r\n| Facts                              |   ✔️   |\r\n| Fonts                              |   ✔️ (Moved to Formatting)   |\r\n| Global audience                    |   ✔️   |\r\n| Inclusivity                        |   ✔️ (⚠️ while publishing)   |\r\n| Legality, licensing, trademarks    |   ✔️ (Moved to Formatting)   |\r\n| Multi-platform accessibility       |   ✔️   |\r\n| Non-ambiguous, no excessive claims |   ✔️   |\r\n| Page layout                        |   ✔️   |\r\n| Political correctness              |   ✔️   |\r\n| Protocols                          |   ✔️   |\r\n| Security                           |   ✔️   |\r\n| Sentence structure                 |   ✔️   |\r\n| Succinct writing                  ",
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
      btnLoading: false
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
        this.$message.warning(this.$t('system.guestPrompt'))
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
          this.appIconPath = URL_PREFIX + 'apps/' + this.currentData.appId + '/packages/' + this.currentData.packageId + '/icon'
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
            src: URL_PREFIX + 'apps/' + this.appId + '/demoVideo'
          }
          this.playerOptions.sources.push(val)
        }
      })
    },
    updateData () {
      this.ifExperience = this.currentData.experienceAble
      this.source = this.currentData.details
      this.appIconPath = URL_PREFIX + 'apps/' + this.currentData.appId + '/packages/' + this.currentData.packageId + '/icon'
      this.checkProjectData()
    },
    cancelImage (row) {
      this.isDownloadImage = false
      this.isShowDownload = false
    },
    confirmImage (row) {
      this.isShowDownload = false
      this.isDownloadImage = false
    },
    ifDownloadImage (currentData, row) {
      if (this.currentData.deployMode === 'vm') {
        this.isShowDownload = true
      } else {
        this.isDownloadImage = false
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
    this.appIconPath = URL_PREFIX + 'apps/' + this.appId + '/packages/' + this.packageId + '/icon'
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
    font-size: 26px;
    font-family: HarmonyOS Sans SC, sans-serif;
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
      width: 130px;
      img{
        width: 100%;
      }
    }
    .app_info{
      width: calc(100% - 610px);
      padding: 0 20px;
      word-wrap: break-word;
      .app_title{
        font-size: 36px;
        color: #FFFFFF;
        font-weight: bold;
        .createTime{
          font-size: 16px;
          font-weight: normal;
          color: #FFFFFF;
          margin-left: 10px;
        }
      }
      .app_version{
        height: 24px;
        line-height: 24px;
        .drop-down{
          top:-2px;
          margin-right: 5px;
          background: rgba(255,255,255,0.4);
          color: #FFFFFF;
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
        margin: 15px 0;
        line-height: 23px;
      }
      .app_tag{
        span{
          float: left;
          font-size: 12pt;
          font-weight: Light;
          padding: 5px 20px 5px 10px;
          margin-right: 20px;
          border-radius: 12pt  12pt   12pt  0pt;
        }
        .industry{
          background: #FFFFFF;
          opacity: 0.5;
          color: #FFB800;
        }
        .architecture{
          background: #FFFFFF;
          opacity: 0.5;
          color: #16E9EF;
        }
        .type{
          background: #FFFFFF;
          opacity: 0.5;
          color: #3800FF;
        }
        .deployMode{
          background: #FFFFFF;
          opacity: 0.5;
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
        font-weight: bold;
        margin: 5px 0;
      }
      .el-rate{
        float: left;
        width: 100%;
        text-align: center;
        .el-rate__icon{
          font-size: 22px;
          margin: 0 0 0 6px;
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
    margin-top: 38px;
    .horizontal-cell{
      padding: 12px 0;
      float: left;
      width: 2px;
      height: 50px;
      background: #FFFFFF;
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
      margin-top: 58px;
      li{
        float: left;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        background: #d4d1ec;
        span{
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 26px;
          font-size: 20px;
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
        background: #d4d1ec;
        border-radius: 16px 0 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .appDetail_comment{
        background: #fff;
        border-radius: 16px 0 0 0;
        span{
          background: #d4d1ec;
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
        background: #d4d1ec;
        border-radius: 16px 0 0 0;
        span{
          border-radius: 16px 0 0 0;
          transition: all 0.1s;
        }
      }
      .comment_active{
        background: #d4d1ec;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .comment_default{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .comment_default_appShow_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_appShow_nomeao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_meao_noAppShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_no_appShow_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
        }
      }
      .comment_default_vedio_noAppShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
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
        background: #d4d1ec;
        span{
          background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_active{
        background: #d4d1ec;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .appShow_no_active{
        background: #f4f3f7;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }
      }
      .appShow_default{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_default_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_default_comment{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }
      }
      .appShow_default3{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_active{
        background: #d4d1ec;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .meao_default{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default_appshow{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .meao_default_comment_noappShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
        }

      }
      .meao_default_vedio_noappShow{
        background: #f4f3f7;
        border-radius: 0 0 0 16px;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_default_vedio_appShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .vedio_active{
        background: #d4d1ec;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .vedio_default{
        background: rgba(250,250,250,0.0001);
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_appShow_meao{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_no_AppshowMeao{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_meao_no_Appshow{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_comment_no_Appshow{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
    }
  }
  .container_div{
    height: 300px;
    overflow: auto;
    border-radius: 0 16px 16px 16px;
    transition: all 0.1s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
    height: 400px;
  }
  .container_div_active{
    border-radius: 0 16px 16px 16px;
    height: 400px;
  }
}
</style>
