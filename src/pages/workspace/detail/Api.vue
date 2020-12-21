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
  <div class="api">
    <el-row
      :gutter="20"
      v-loading="apiDataLoading"
      v-if="hasService"
    >
      <el-col :span="6">
        <el-tree
          ref="treeList"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
          highlight-current
          class="api_tree"
        />
      </el-col>
      <el-col :span="18">
        <div class="service_div">
          <p class="api_top">
            {{ $t('workspace.apiTopText') }} ：
          </p>
          <p class="title">
            {{ $t('workspace.serviceDetails') }}
          </p>
          <el-row class="service_info">
            <el-col :span="24">
              {{ $t('test.testApp.type') }} ：{{ serviceDetail.capabilityType }}
            </el-col>
          </el-row>
          <el-row class="service_info">
            <el-col :span="12">
              {{ $t('workspace.servicename') }} ：{{ serviceDetail.serviceName }}
            </el-col>
            <el-col :span="12">
              {{ $t('workspace.version') }} ：{{ serviceDetail.version }}
            </el-col>
          </el-row>
          <el-row class="service_info">
            <el-col :span="12">
              {{ $t('workspace.releaseTime') }} ：{{ serviceDetail.uploadTime }}
            </el-col>
            <el-col :span="12">
              SDK {{ $t('common.download') }} ：
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
      </el-col>
    </el-row>
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
import { Capability } from '../../../tools/project_data.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  data () {
    return {
      apiDataLoading: true,
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
        let treeDataTemp = []
        let serviceCount = 0
        treeDataTemp = res.data.capabilityList
        let oneLevel = []
        treeDataTemp.forEach(item => {
          item.oneLevelName = this.checkProjectData(item.oneLevelName)
          oneLevel.push(item.oneLevelName)
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
        treeDataTemp.forEach(item => {
          this.treeData.forEach(itemTwo => {
            if (itemTwo.label === item.oneLevelName) {
              let objTwo = {
                label: '',
                children: []
              }
              if (item.twoLevelName) {
                item.twoLevelName = this.checkProjectData(item.twoLevelName)
                objTwo.label = item.twoLevelName
                itemTwo.children.push(objTwo)
              }
            }
          })
        })
        // threeLevel
        treeDataTemp.forEach(item => {
          item.capabilityDetailList.forEach(subItem => {
            serviceCount++
            sessionStorage.setItem('serviceCount', serviceCount)
            this.treeData.forEach(itemThree => {
              itemThree.children.forEach(subTree => {
                let objThree = {
                  label: '',
                  type: '',
                  apiFileId: '',
                  capabilityType: '',
                  uploadTime: '',
                  version: ''
                }
                objThree.label = subItem.service
                objThree.type = item.type
                objThree.apiFileId = subItem.apiFileId
                objThree.capabilityType = item.twoLevelName
                let timeStr = this.dateChange(subItem.uploadTime)
                objThree.uploadTime = timeStr
                objThree.version = subItem.version
                if (item.twoLevelName === subTree.label) {
                  subTree.children.push(objThree)
                }
              })
            })
          })
        })
        if (this.treeData.length > 0) {
          this.$nextTick().then(() => {
            const firstNode = document.querySelector('.api_tree .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node')
            firstNode.click()
          })
        }
        this.apiDataLoading = false
      })
    },
    handleNodeClick (data) {
      if (!data.children) {
        this.apiFileId = data.apiFileId
        this.serviceDetail.capabilityType = data.capabilityType
        this.serviceDetail.serviceName = data.label
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
        const oDivHeight = document.getElementsByClassName('service_div')[0].offsetHeight
        oApi.style.height = Number(deviceHeight) - 260 - oDivHeight + 'px'
      })
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let changeDate = Y + '-' + (M > 9 ? M : ('0' + M)) + '-' + (D > 9 ? D : ('0' + D)) + ' '
        return changeDate
      }
    },
    // 中英文切换
    checkProjectData (name) {
      Capability.forEach(itemFe => {
        if (this.language === 'cn') {
          if (name === itemFe.label[1]) {
            name = itemFe.label[0]
          }
        } else {
          if (name === itemFe.label[0]) {
            name = itemFe.label[1]
          }
        }
      })
      return name
    },
    downloadSDKApi () {
      let lan = this.codeLanguage.toLowerCase()
      sessionStorage.setItem('lan', lan)
      sessionStorage.setItem('sdkFileId', this.apiFileId)
      return Api.downloadSDKApi(this.apiFileId, lan)
    },
    async getApiFileId () {
      this.apiFileIdArr = []
      let projectId = sessionStorage.getItem('mecDetailID')
      let getGroupid = async (groupId) => {
        await Workspace.getServiceListApi(groupId).then(res => {
          let data = res.data
          data.capabilityDetailList.forEach(service => {
            this.apiFileIdArr.push(service.apiFileId)
          })
        })
        let serviceCount = Number(sessionStorage.getItem('serviceCount'))
        if (this.apiFileIdArr.length === serviceCount) {
          this.getSampleCode(this.apiFileIdArr)
        }
      }

      await Workspace.getProjectInfoApi(projectId, this.userId).then(res => {
        let data = res.data.capabilityList
        if (data.length === 0) {
          this.$message.warning(this.$t('promptMessage.sampleCodeInfo'))
        } else {
          data.forEach(dataItem => {
            getGroupid(dataItem.groupId)
          })
        }
      })
    },
    getSampleCode (apiFileIdArr) {
      Workspace.getSampleCodeApi(apiFileIdArr)
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
  #swagger-ui{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .swagger-ui .info{
      margin: 10px 0;
    }
  }
  .service_div{
    padding-left: 20px;
    .api_top{
      line-height: 25px;
    }
    .title{
      font-size: 15px;
      margin-top: 15px;
    }
    .el-row{
      font-size: 13px;
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
