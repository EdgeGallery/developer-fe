<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="detail padding_default">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/list' }">
        {{ $t('breadCrumb.devTools') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('devTools.pluginList') }}{{ $t('breadCrumb.detail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
      class="plugin-mian-content"
      v-for="item in detailContent"
      :key="item.pluginId"
      v-loading="dataLoading"
    >
      <el-col :span="3">
        <div class="mian-content-img">
          <img
            :src="getImageUrl(item.pluginId)"
            class="image"
            :alt="item.pluginName"
          >
        </div>
      </el-col>
      <el-col :span="15">
        <div class="mian-content-feature">
          <p>
            <span class="name">{{ $t('devTools.applicationName') }}:</span>
            <span class="name-value">{{ item.pluginName }}</span>
            <span class="name">{{ $t('devTools.applicationVersion') }}:</span>
            <span class="name-value">{{ item.version }}</span>
            <el-link
              :href="getDownloadUrl(item.pluginId)"
              :underline="false"
              rel="noopener noreferrer"
            >
              <el-button
                id="downloadBtn"
                type="primary"
                size="mini"
                class="download-btn"
                @click="rateConfirm(item)"
              >
                {{ $t('common.download') }}
              </el-button>
            </el-link>
          </p>
          <p>
            <span class="name">{{ $t('devTools.downloads') }}:</span>
            <span class="name-value"> {{ item.downloadCount }}</span>
            <span class="name">{{ $t('devTools.satisfaction') }}:</span>
            <span class="name-value">
              <el-rate
                class="p-rate"
                :value="Number(item.satisfaction.toFixed(2))"
                disabled
                show-score
                text-color="#ff9900"
                disabled-void-color="#cccccc"
                score-template="{value}"
              />
            </span>
          </p>
          <p>
            <span class="name">{{ $t('devTools.pluginDescription') }}:</span>
          </p>
          <p>
            <span
              class="plug-desc"
              v-html="item.introduction"
            />
          </p>
          <el-dialog
            :visible.sync="DialogVisible"
            :close-on-click-modal="false"
            width="30%"
            class="dialog_rate"
          >
            <span class="dialogPadding">{{ $t('devTools.submitRate') }}:</span>
            <el-rate
              v-model="valueRate"
              show-score
              text-color="#ff9900"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              class="rate_top dialogPadding"
              @change="rateChange"
            />
            <span
              slot="footer"
              class="dialog-footer dialogPadding"
            >
              <el-button @click="DialogVisible = false">{{ $t('common.cancel') }}</el-button>
              <el-button
                type="primary"
                @click="rateHandel(rateId)"
              >{{ $t('common.confirm') }}</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <div id="test-editor">
      <mavon-editor
        v-model="markdownSource"
        :toolbars-flag="false"
        :editable="false"
        :subfield="false"
        default-open="preview"
        :box-shadow="false"
        preview-background="#ffffff"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Plugin } from '../../tools/api.js'
import { common } from '../../tools/common.js'
export default {
  name: 'ListDetail',
  computed: {
    ...mapState(['language'])
  },
  watch: {
    language (val) {
      this.getDetailMarkDown(val)
      if (val === 'en') {
        this.markdownSource = './MECPLUGIN_EN.md'
      } else {
        this.markdownSource = './MECPLUGIN_CN.md'
      }
    },
    $route (to, from) {
      this.getPluginListData()
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getPluginListData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getPluginListData()
    }
  },
  data () {
    return {
      pluginListData: [],
      detailContent: [],
      interval: null,
      DialogVisible: false,
      valueRate: 5,
      rateId: 0,
      dataLoading: true,
      markdownSource: '',
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName'),
      pluginId: sessionStorage.getItem('mecDetailID'),
      limitSize: 10,
      offsetPage: 0,
      selectCodeLanguage: '',
      inputPluginName: '',
      screenHeight: document.body.clientHeight
    }
  },
  mounted () {
    this.getPluginListData()
    this.getDetailMarkDown()
    this.setDivHeight()
  },
  methods: {
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'detail', 261)
    },
    getDetailMarkDown () {
      Plugin.getDetailDocsApi(this.pluginId).then(res => {
        this.markdownSource = res.data
      })
    },
    // Fetch plugin list
    getPluginListData () {
      Plugin.getPluginListApi(this.limitSize, this.offsetPage, this.inputPluginName, this.selectCodeLanguage).then(res => {
        this.pluginListData = res.data.results
        this.getListDetail()
      })
    },
    // Get plugin detail
    getListDetail () {
      this.detailContent = []
      this.pluginListData.forEach(item => {
        if (item.pluginId === this.pluginId) {
          this.detailContent.push(item)
          this.dataLoading = false
        }
      })
    },
    // Get plugin icon
    getImageUrl (pluginId) {
      return Plugin.getImageUrlApi(pluginId)
    },
    // Get plugin dowload link
    getDownloadUrl (pluginId) {
      return Plugin.getDownloadUrlApi(pluginId)
    },
    rateConfirm (item) {
      this.rateId = item.pluginId
      this.interval = setInterval(() => {
        this.DialogVisible = true
        this.valueRate = 5
        this.getPluginListData()
      }, 2000)
      setTimeout(() => {
        this.clearRateDialog()
      }, 2500)
    },
    clearRateDialog () {
      clearTimeout(this.interval)
      this.interval = null
    },
    rateChange (val) {
      this.valueRate = val
    },
    // Rate plugin
    rateHandel (rateId) {
      Plugin.ratePluginApi(rateId, this.valueRate, this.userId, this.userName).then(res => {
        this.getPluginListData()
      })
      this.DialogVisible = false
    }
  }
}
</script>

<style lang='less'>
.detail{
  .plugin-mian-content{
    background-color: #fff;
    padding:40px 25px 0;
    .mian-content-img{
      img{
        max-width: 120px;
        max-height: 120px;
      }
    }
    .mian-content-feature{
      p{
        font-size: 14px;
        margin-bottom: 25px;
        span.name{
          margin-left:25px;
        }
        .download-btn{
          margin-left:25px;
          background-color: #688ef3;
          span{
            margin-left: 0;
          }
        }
        .plug-desc{
          margin-left:25px;
          display: inline-block;
          line-height: 25px;
        }
      }
    }
  }
  .develope{
    padding:25px;
    border:1px solid #ddd;
    border-top:0;
    line-height: 30px;
    a{
      color: #409EFF;
    }

  }
  #test-editor{
    position: relative;
  }
  #edit_detail{
    position: absolute;
    top: 50px;
    right: 5%;
    z-index: 9999;
    a{
      color: #0366d6;
    }
  }
  .editormd-html-preview, .editormd-preview-container{ margin-top: 0;}
  .name-value .el-rate{
    display: inline;
    margin-left: 5px;
    position: relative;
    top: -2px;
  }
  .rate_top{
    margin-top: 20px;
  }
  .dialogPadding{
    padding: 0 10%;
  }
  .el-dialog__headerbtn{
    top:8px;
  }
}

</style>
