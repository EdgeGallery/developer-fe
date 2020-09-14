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
  <div class="mepapi">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/mep' }">
        API
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('nav.mepApi') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mep-main">
      <div class="mep-tree">
        <el-tree
          v-if="abilityList.length>0"
          :data="abilityList"
          default-expand-all
          :indent="0"
          ref="tree"
          :highlight-current="true"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </div>
      <div class="doc-div">
        <Document
          :service-path="servicePath"
        />
      </div>
      <div
        class="api-div"
        v-if="apiPage"
      >
        <API :api-file-idprop="apiFileId" />
      </div>
    </div>
  </div>
</template>

<script>
import Document from './Document.vue'
import API from './API.vue'
import { ApiInfo } from '../../tools/project_data.js'
import { Get } from '../../tools/tool.js'
export default {
  name: 'Mepapi',
  components: {
    Document,
    API
  },
  data () {
    return {
      apiPage: false,
      activeName: '',
      servicePath: './mep_Introduction.md',
      language: localStorage.getItem('language'),
      abilityList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      openMepName: [
        {
          label: '服务介绍',
          servicePath: './mep_Introduction.md'
        },
        {
          label: 'API参考',
          children: []
        }
      ],
      apiFileId: ''
    }
  },
  methods: {
    handleNodeClick (val) {
      let pos = ApiInfo[1].label.indexOf(val.label)
      if (pos === -1) {
        this.activeName = val.label
        this.servicePath = val.servicePath
        this.apiFileId = val.apiFileId
        let pos2 = ApiInfo[0].label.indexOf(val.label)
        if (pos2 !== -1) {
          this.apiPage = false
        } else {
          this.apiPage = true
        }
      }
    },
    getOpenMepName () {
      this.abilityList = this.openMepName
      this.abilityList[1].children = []
      Get('mec/developer/v1/capability-groups/openmep-api').then(res => {
        let dataTemp = res.data.openMeps
        dataTemp.forEach(item => {
          let obj = {
            label: '',
            apiFileId: ''
          }
          obj.label = item.service
          obj.apiFileId = item.apiFileId
          if (item.service === 'Face Recognition service') {
            obj.servicePath = './face_recognition_plus.md'
          } else if (item.service === 'Face Recognition service plus') {
            obj.servicePath = './face_recognition_plus.md'
          } else if (item.service === 'Service Discovery') {
            obj.servicePath = './service_discovery.md'
          } else if (item.service === 'Bandwidth service') {
            obj.servicePath = './bandwidth_service.md'
          } else if (item.service === 'Location service') {
            obj.servicePath = './location_service.md'
          } else if (item.service === 'Traffic service') {
            obj.servicePath = './trafficrules_service.md'
          }
          this.abilityList[1].children.push(obj)
        })
        if (dataTemp.length > 0) {
          this.$nextTick().then(() => {
            const firstNode = document.querySelector('.el-tree-node')
            firstNode.click()
          })
        }
      })
    },
    checkApiTitle () {
      if (this.language === 'en') {
        this.abilityList[0].label = ApiInfo[0].label[1]
        this.abilityList[1].label = ApiInfo[1].label[1]
      } else if (this.language === 'cn') {
        this.abilityList[0].label = ApiInfo[0].label[0]
        this.abilityList[1].label = ApiInfo[1].label[0]
      }
    }
  },
  mounted () {
    this.getOpenMepName()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.checkApiTitle()
    }
  }
}
</script>

<style lang="less">
.mepapi{
  .mep-main{
    background-color: #fff;
    padding: 40px;
    display: flex;
    .mep-tree{
      width: 270px;
      padding: 20px 10px;
      background-color: #f7f7f7;
      position: relative;
    }
    .el-tree{
      background-color: #f7f7f7;
      .el-tree-node__content{
        height: 35px;
        line-height: 35px;
        border-left: 2px solid #f7f7f7;
      }
      .el-tree-node.is-current>.el-tree-node__content{
        background-color: #d3f1f0;
        border-left: 2px solid #6c9c9c;
      }
      .el-tree-node__children{
        margin: 0 25px;
        .el-tree-node__expand-icon{
          display: none;
        }
        .el-tree-node__label{
          padding-left: 10px;
        }
      }
    }
    @media screen and (max-width: 1380px) {
      .mep-tree{
        width: 300px;
      }
    }
    .doc-div{
      flex-grow: 1;
    }
    .api-div{
      flex-grow: 1;
      width: 450px;
    }
  }
}

</style>
