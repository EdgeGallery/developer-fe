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
    >
      <el-col :span="6">
        <el-tree
          ref="treeList"
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          node-key="id"
          :highlight-current="true"
          :default-expanded-keys="defaultExpandKeys"
          :current-node-key="0"
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
                :href="getDownloadUrl()"
              />
            </el-col>
          </el-row>
        </div>

        <div id="swagger-ui" />
      </el-col>
    </el-row>
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
      language: localStorage.getItem('language')
    }
  },
  methods: {
    getProjectDetail () {
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getProjectInfoApi(projectId, this.userId).then(res => {
        this.apiType = res.data.type
        let treeDataTemp = []
        treeDataTemp = res.data.capabilityList
        let userId = res.data.userId
        let serviceCount = 0
        for (let i in treeDataTemp) {
          let obj = {
            label: '',
            children: []
          }
          let type = treeDataTemp[i].type
          this.checkProjectData()
          obj.label = treeDataTemp[i].name
          let serviceTemp = treeDataTemp[i].capabilityDetailList
          let hasService = false
          for (let j in serviceTemp) {
            serviceCount++
            sessionStorage.setItem('serviceCount', serviceCount)
            let subHasService = false
            let subObj = {
              id: 0,
              label: '',
              apiFileId: '',
              userId: '',
              type: '',
              capabilityType: '',
              uploadTime: '',
              version: ''
            }
            subObj.id = j
            subObj.label = serviceTemp[j].service
            subObj.userId = userId
            subObj.type = type
            subObj.capabilityType = treeDataTemp[i].name
            let timeStr = this.dateChange(serviceTemp[j].uploadTime)
            subObj.uploadTime = timeStr
            subObj.version = serviceTemp[j].version
            if (subObj.label) {
              subHasService = true
              hasService = true
            }
            subObj.apiFileId = serviceTemp[j].apiFileId
            if (subHasService) obj.children.push(subObj)
          }
          if (hasService) this.treeData.push(obj)
        }
        this.defaultExpandKeys.push(this.treeData[0].children[0].id)
        if (this.treeData.length > 0) {
          this.$nextTick().then(() => {
            const firstNode = document.querySelector('.el-tree-node__children .el-tree-node__content')
            firstNode.click()
          })
        }
        this.checkProjectData()
        this.apiDataLoading = false
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.apiDataLoading = false
        }, 2000)
      })
    },
    handleNodeClick (data) {
      this.apiFileId = data.apiFileId
      this.serviceDetail.capabilityType = data.capabilityType
      this.serviceDetail.serviceName = data.label
      this.serviceDetail.uploadTime = data.uploadTime
      this.serviceDetail.version = data.version
      this.checkProjectData()
      if (!data.children) {
        let apiUrl = Workspace.getApiUrl(data.apiFileId, data.userId, data.type)
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
      const oApi = document.getElementById('swagger-ui')
      const deviceHeight = document.documentElement.clientHeight
      const oDivHeight = document.getElementsByClassName('service_div')[0].offsetHeight
      oApi.style.height = Number(deviceHeight) - 260 - oDivHeight + 'px'
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
    checkProjectData () {
      Capability.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.serviceDetail.capabilityType === itemFe.label[1]) {
            this.serviceDetail.capabilityType = itemFe.label[0]
          }
        } else {
          if (this.serviceDetail.capabilityType === itemFe.label[0]) {
            this.serviceDetail.capabilityType = itemFe.label[1]
          }
        }
        this.treeData.forEach(itemBe => {
          if (itemBe.label === itemFe.label[1] && this.language === 'cn') {
            itemBe.label = itemFe.label[0]
          } else if (itemBe.label === itemFe.label[0] && this.language === 'en') {
            itemBe.label = itemFe.label[1]
          }
        })
      })
    },
    getDownloadUrl () {
      this.codeLanguage = this.codeLanguage.toLowerCase()
      return Api.downloadSDKApi(this.apiFileId, this.codeLanguage)
    }
  },
  created () {
    this.getProjectDetail()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.checkProjectData()
    }
  },
  mounted () {
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

}
</style>
