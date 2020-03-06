<template>
  <div class="detail">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">{{$t('breadCrumb.mecDeveloper')}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/plugin/list#1' }">{{$t('breadCrumb.devTools')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{breadcrumbTitle}} {{$t('breadCrumb.detail')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="plugin-mian-content" v-for="item in detailContent" :key="item.pluginId" v-loading='dataLoading'>
      <el-col :span="3">
        <div class="mian-content-img">
        <img :src="getImageUrl(item.pluginId)" class="image">
        </div>
      </el-col>
      <el-col :span="15">
        <div class="mian-content-feature">
          <p>
            <span class="name">{{$t('devTools.applicationName')}}:</span>
            <span class="name-value">{{item.pluginName}}</span>
            <span class="name">{{$t('devTools.applicationVersion')}}: </span>
            <span class="name-value">{{item.version}}</span>
            <el-link :href="getDownloadUrl(item.pluginId)" :underline="false">
              <el-button id="downloadBtn" type="primary" size="mini" class="download-btn"  @click="rateConfirm(item)">{{$t('common.download')}}</el-button>
            </el-link>
          </p>
          <p>
            <span class="name">{{$t('devTools.downloads')}}:</span>
            <span class="name-value"> {{item.downloadCount}}</span>
            <span class="name">{{$t('devTools.satisfaction')}}:</span>
            <span class="name-value">
              <el-rate
                class="p-rate"
                :value="Number(item.satisfaction)"
                disabled
                show-score
                text-color="#ff9900"
                disabled-void-color="#cccccc"
                score-template="{value}">
              </el-rate>
            </span>
          </p>
          <p>
            <span class="name">{{$t('devTools.pluginDescription')}}:</span>
          </p>
          <p>
            <el-input
              class="plug-desc"
              type="textarea"
              :rows="4" :value="item.introduction"
              id="detailDescription">
            </el-input>
          </p>
          <el-dialog
            :visible.sync="DialogVisible"
            width="30%" class="dialog_rate">
            <span class="dialogPadding">{{$t('devTools.submitRate')}}:</span>
            <el-rate
              v-model="valueRate"
              show-score
              text-color="#ff9900"
              allow-half
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              class="rate_top dialogPadding"
              @change="rateChange">
            </el-rate>
            <span slot="footer" class="dialog-footer dialogPadding">
              <el-button @click="DialogVisible = false">{{$t('common.cancel')}}</el-button>
              <el-button type="primary" @click="rateHandel(rateId)">{{$t('common.confirm')}}</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
    <div id="test-editor">
      <span class="el-icon-edit" id="edit_detail"><a target="_blank" href="http://139.9.0.160/houp/houp_portal/blob/master/public/mecplugin.md">Modify</a></span>
      <mavon-editor v-model="markdownSource"
     :toolbarsFlag='false'
     :editable='false'
     :subfield='false'
     defaultOpen='preview'
     :boxShadow='false'
     previewBackground='#ffffff'
     />
    </div>
  </div>
</template>

<script>
import { Get, Put, urlPrefix } from './../../tools/tool.js'
import axios from 'axios'
export default {
  name: 'listDetail',
  data () {
    return {
      breadcrumbTitle: '',
      pluginListData: [],
      detailContent: [],
      plutype: 1,
      interval: '',
      DialogVisible: false,
      valueRate: 5,
      rateId: 0,
      dataLoading: true,
      markdownSource: ''
    }
  },
  mounted () {
    let mecDetailType = JSON.parse(sessionStorage.getItem('mecDetailType'))
    if (mecDetailType === 1) {
      this.breadcrumbTitle = this.$t('devTools.pluginList')
    }
    let url = './mecplugin.md'
    axios(url).then(res => {
      this.markdownSource = res.data
    })
    this.getPluginListData()
  },
  methods: {
    getPluginListData () {
      let url = ''
      let mecDetailType = JSON.parse(sessionStorage.getItem('mecDetailType'))
      if (mecDetailType === 1) {
        url = 'mec/developer/v1/plugins/?pluginType=1'
      }
      Get(url).then(res => {
        let data = res.data.plugins
        this.pluginListData = data
        this.getListDetail()
      })
    },
    getListDetail () {
      this.detailContent = []
      this.pluginListData.forEach(item => {
        let mecDetailID = sessionStorage.getItem('mecDetailID')
        if (item.pluginId === mecDetailID) {
          this.detailContent.push(item)
          this.dataLoading = false
        }
      })
    },
    getImageUrl (pluginId) {
      let url = urlPrefix + 'mec/developer/v1/plugins/' + pluginId + '/action/get-logofile'
      return url
    },
    getDownloadUrl (pluginId) {
      let url = urlPrefix + 'mec/developer/v1/plugins/' + pluginId + '/action/download'
      return url
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
      this.interval = ''
    },
    rateChange (val) {
      this.valueRate = val
    },
    rateHandel (rateId) {
      Put('mec/developer/v1/plugins/' + rateId + '/action/score?score=' + this.valueRate).then(res => {
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
        height:120px;
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
    .v-note-wrapper{
      border: none;
    }
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
