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
  <div class="local">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">
        API
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.applicationApi') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
      class="api_div"
      v-loading="apiDataLoading"
    >
      <el-col :span="4">
        <div>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            node-key="id"
            :highlight-current="true"
            :current-node-key="0"
          />
        </div>
      </el-col>
      <el-col :span="20">
        <div id="swagger-ui-mec" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { urlPrefix } from '../../tools/tool.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: 'Local',
  data () {
    return {
      apiDataLoading: true,
      treeData: [
        {
          id: '0',
          label: 'projects'
        },
        {
          id: '1',
          label: 'plugin'
        },
        {
          id: '2',
          label: 'hosts'
        },
        {
          id: '3',
          label: 'testapp'
        },
        {
          id: '4',
          label: 'files'
        },
        {
          id: '5',
          label: 'capability-groups'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
    function apiHeight () {
      const oApi = document.getElementById('swagger-ui-mec')
      const deviceHeight = document.documentElement.clientHeight
      oApi.style.height = (Number(deviceHeight) - 230) + 'px'
    }
    apiHeight()
    window.onresize = function () {
      apiHeight()
    }
    this.handleNodeClick(this.treeData[0])
  },
  methods: {
    getApiUrl (filename) {
      let apiUrl = urlPrefix + 'mec/developer/v1/localapi/' + filename
      return apiUrl
    },
    handleNodeClick (data) {
      let apiUrl = this.getApiUrl(data.label)
      this.apiDataLoading = false
      SwaggerUIBundle({
        url: apiUrl,
        dom_id: '#swagger-ui-mec',
        deepLinking: false,
        presets: [
          SwaggerUIBundle.presets.apis
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ]
      })
    }
  }
}
</script>
<style lang="less">
.local{
  .api_div{
    background-color: #fff;
    padding: 20px 10px 10px;
  }
  #swagger-ui-mec{
    width: 100%;
    height: 100%;
    overflow: auto;
    .swagger-ui .info{
      margin: 10px 0;
    }
  }
  .is-current .el-tree-node__content{
    background-color: blue;
  }
  .el-tree-node__content{
    height: 35px;
    line-height: 35px;
    span{
      padding-left: 20px;
    }
  }
  .el-tree-node__content span:first-child{
    display: none;
  }
}
</style>
