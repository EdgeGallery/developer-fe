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
  <div class="api">
    <div
      v-loading="apiDataLoading"
      v-if="hasService"
      class="clear"
    >
      <div class="api_left">
        <el-tree
          ref="treeList"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
          highlight-current
          class="api_tree"
        />
      </div>
      <div class="api_right">
        <div class="service_div">
          <p class="api_top">
            {{ $t('workspace.apiTopText') }}
          </p>
          <p class="title">
            {{ $t('workspace.serviceDetails') }}
          </p>
          <el-row class="service_info">
            <el-col :span="24">
              <span>{{ $t('test.testApp.type') }} ：</span>{{ serviceDetail.capabilityType }}
            </el-col>
          </el-row>
          <el-row class="service_info">
            <el-col :span="12">
              <span>{{ $t('workspace.servicename') }} ：</span>{{ serviceDetail.serviceName }}
            </el-col>
            <el-col :span="12">
              <span>{{ $t('workspace.version') }} ：</span>{{ serviceDetail.version }}
            </el-col>
          </el-row>
          <el-row class="service_info">
            <el-col :span="12">
              <span>{{ $t('workspace.releaseTime') }} ：</span>{{ serviceDetail.uploadTime }}
            </el-col>
            <el-col :span="12">
              <span>SDK {{ $t('common.download') }} ：</span>
              <el-select
                v-model="codeLanguage"
                name="codeLanguage"
                class="list-select"
                size="mini"
              >
                <el-option
                  v-for="item in optionsLanguage"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                  :id="item.label"
                />
              </el-select>
              <el-link
                class="download_sdk"
                :href="downloadSDKApi()"
              />
              <el-link
                :href="guideUrl"
                target="_blank"
                type="primary"
                class="ml10"
              >
                {{ $t('api.installGuide') }}
              </el-link>
            </el-col>
          </el-row>
        </div>

        <div id="swagger-ui" />
      </div>
    </div>
    <div
      class="no_service"
      v-if="!hasService"
    >
      <p>{{ $t('workspace.appRelease.noService') }}</p>
      <img
        src="../../../assets/images/construct.png"
        alt="a"
      >
    </div>
  </div>
</template>

<script>
import { Workspace, Api } from '../../../tools/api.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  data () {
    return {
      apiDataLoading: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultExpandKeys: [],
      userId: sessionStorage.getItem('userId'),
      codeLanguage: 'JAVA',
      apiFileId: '',
      optionsLanguage: [
        {
          value: 0,
          label: 'JAVA'
        }, {
          value: 1,
          label: 'Python'
        }, {
          value: 2,
          label: 'Go'
        }
      ],
      serviceDetail: {
        capabilityType: '',
        serviceName: '',
        uploadTime: '',
        version: ''
      },
      language: localStorage.getItem('language'),
      downloadUrl: '',
      api_div: true,
      env_div: false,
      apiFileIdArr: [],
      guideUrl: 'https://gitee.com/edgegallery/docs/blob/master/Projects/Developer/SDK_Guide.md',
      hasService: true
    }
  },
  methods: {
    // 获取项目详情
    getProjectDetail () {
      this.treeData = []
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getProjectInfoApi(projectId, this.userId).then(res => {
        if (res.data.capabilityList.length > 0) {
          this.hasService = true
        } else {
          this.hasService = false
        }
        this.apiType = res.data.type
        let treeDataTemp = res.data.capabilityList
        let oneLevel = []
        treeDataTemp.forEach(item => {
          if (this.language === 'cn') {
            oneLevel.push(item.oneLevelName)
          } else {
            oneLevel.push(item.oneLevelNameEn)
          }
        })
        oneLevel = Array.from(new Set(oneLevel))
        // oneLevel
        oneLevel.forEach(item => {
          let obj = {
            label: '',
            children: []
          }
          obj.label = item
          this.treeData.push(obj)
        })
        // twoLevel
        this.handleTwoLevel(treeDataTemp)
        // threeLevel
        this.handleThreeLevel(treeDataTemp)
        if (this.treeData.length > 0) {
          this.$nextTick().then(() => {
            const firstNode = document.querySelector('.api_tree .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node')
            firstNode.click()
          })
        }
        this.apiDataLoading = false
      })
    },
    handleTwoLevel (treeDataTemp) {
      treeDataTemp.forEach(item => {
        let oneLevelName = this.language === 'en' ? item.oneLevelNameEn : item.oneLevelName
        this.treeData.forEach(itemTwo => {
          if (itemTwo.label === oneLevelName) {
            let twoLevelName = this.language === 'en' ? item.twoLevelNameEn : item.twoLevelName
            if (twoLevelName) {
              itemTwo.children.push({
                label: twoLevelName,
                children: []
              })
            }
          }
        })
      })
    },
    handleThreeLevel (treeDataTemp) {
      treeDataTemp.forEach(item => {
        let twoLevelName = this.language === 'en' ? item.twoLevelNameEn : item.twoLevelName
        item.capabilityDetailList.forEach(subItem => {
          this.treeData.forEach(itemThree => {
            itemThree.children.forEach(subTree => {
              if (twoLevelName === subTree.label) {
                subTree.children.push({
                  host: subItem.host,
                  label: this.language === 'en' ? subItem.serviceEn : subItem.service,
                  type: item.type,
                  apiFileId: subItem.apiFileId,
                  capabilityType: twoLevelName,
                  uploadTime: this.dateChange(subItem.uploadTime),
                  version: subItem.version
                })
              }
            })
          })
        })
      })
    },
    handleNodeClick (data) {
      if (!data.children) {
        this.apiFileId = data.apiFileId
        this.serviceDetail.capabilityType = data.capabilityType
        this.serviceDetail.serviceName = data.host
        this.serviceDetail.uploadTime = data.uploadTime
        this.serviceDetail.version = data.version
        let apiUrl = Workspace.getApiUrl(data.apiFileId, this.userId, data.type)
        SwaggerUIBundle({
          url: apiUrl,
          dom_id: '#swagger-ui',
          deepLinking: false,
          presets: [
            SwaggerUIBundle.presets.apis
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ]
        })
        let interval = setInterval(() => {
          let baseUrl = document.getElementsByClassName('base-url')
          try {
            if (baseUrl[0].innerHTML) {
              let childNodes = baseUrl[0].childNodes
              childNodes[4].nodeValue = '{host}'
              window.clearInterval(interval)
            }
          } catch (error) {
            window.clearInterval(interval)
          }
        }, 200)
      }
    },
    setApiHeight () {
      this.$nextTick(() => {
        const oApi = document.getElementById('swagger-ui')
        const deviceHeight = document.documentElement.clientHeight
        const oDiv = document.getElementsByClassName('service_div')[0]
        oApi.style.height = Number(deviceHeight) - 260 - oDiv.offsetHeight + 'px'
      })
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        return Y + '-' + (M > 9 ? M : ('0' + M)) + '-' + (D > 9 ? D : ('0' + D)) + ' '
      }
    },
    downloadSDKApi () {
      let lan = this.codeLanguage.toLowerCase()
      sessionStorage.setItem('lan', lan)
      sessionStorage.setItem('sdkFileId', this.apiFileId)
      return Api.downloadSDKApi(this.apiFileId, lan)
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getProjectDetail()
    }
  },
  mounted () {
    this.getProjectDetail()
    this.setApiHeight()
    let _this = this
    window.onresize = function () {
      _this.setApiHeight()
    }
  }
}

</script>
<style lang='less'>
.api{
  border: 1px solid #ddd;
  background: #f8f8f8;
  .api_left{
    float: left;
    width: 320px;
    padding: 20px 0;
  }
  .api_right{
    float: left;
    width: calc(100% - 320px);
    background: #fff;
    padding: 20px 20px 0 0;
  }
  .api_tree{
    background: #f8f8f8;
    .el-tree-node__label{
      font-size:15px;
    }
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #e1f0ff;
  }
  #swagger-ui{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    min-height: 600px;
    .swagger-ui .info{
      margin: 10px 0;
    }
  }
  .service_div{
    padding-left: 20px;
    .api_top{
      line-height: 30px;
      font-size: 18px;
    }
    .service_info{
      span{
        color: #adb0b8;
      }
    }
    .title{
      font-size: 18px;
      margin-top: 15px;
    }
    .el-row{
      font-size: 16px;
      .el-col{
        padding: 5px;
      }
      .el-select{
        width: 65px;
        .el-input__icon{
          width: 15px;
        }
        .el-input__inner{
          padding: 0 5px;
        }
        .el-input--suffix .el-input__inner{
          padding-right: 20px;
        }
      }
    }
    .download_sdk{
      width: 21px;
      height: 21px;
      display: inline-block;
      background: url('../../../assets/images/download.png');
      margin-left: 10px;
    }
  }
  .no_service{
    text-align: center;
    line-height: 25px;
    img{
      width: 50%;
      max-width: 445px;
    }
  }
  @media screen and (max-width: 1380px){
    .no_service{
      img{
        width: 80%;
        max-width: 445px;
      }
    }
  }
}
</style>
