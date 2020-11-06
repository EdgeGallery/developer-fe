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
        <div id="swagger-ui" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Workspace } from '../../../tools/api.js'
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
      projectId: '',
      userId: sessionStorage.getItem('userId'),
      projectType: 'CREATE_NEW'
    }
  },
  methods: {
    getProjectDetail () {
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getProjectInfoApi(projectId, this.userId).then(res => {
        let treeDataTemp = []
        treeDataTemp = res.data.capabilityList
        this.projectId = res.data.id
        this.projectType = res.data.projectType
        let userId = res.data.userId
        let serviceCount = 0
        for (let i in treeDataTemp) {
          let obj = {
            label: '',
            children: []
          }
          let type = treeDataTemp[i].type
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
              type: ''
            }
            subObj.id = j
            subObj.label = serviceTemp[j].service
            subObj.userId = userId
            subObj.type = type
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
        this.apiDataLoading = false
      }).catch(err => {
        console.log(err)
        setTimeout(() => {
          this.apiDataLoading = false
        }, 2000)
      })
    },
    handleNodeClick (data) {
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
      oApi.style.height = Number(deviceHeight) - 330 + 'px'
    }
  },
  created () {
    this.getProjectDetail()
  },
  mounted () {
    this.setApiHeight()
    window.onresize = function () {
      this.setApiHeight()
    }
    this.$emit('getProjectType', this.projectType)
  }
}

</script>
<style lang='less' scoped>
.api{
  #swagger-ui{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .swagger-ui .info{
      margin: 10px 0;
    }
  }
}
</style>
