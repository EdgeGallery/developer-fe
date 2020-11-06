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
    <div
      class="mep-main clear"
      ref="meptree"
    >
      <div
        class="mep-tree"
        :class="{'scroll-top':scrollTop}"
      >
        <el-tree
          v-if="abilityList.length>0"
          :data="abilityList"
          default-expand-all
          :indent="0"
          ref="tree"
          :highlight-current="true"
          :props="defaultProps"
          @node-click="handleNodeClick"
          v-loading="treeDataLoading"
        />
      </div>
      <div
        class="doc-div"
        :class="{'doc-left':scrollTop,'doc-right':apiPage}"
      >
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
import { Api } from '../../tools/api.js'
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
      servicePath: '',
      language: localStorage.getItem('language'),
      abilityList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      openMepName: [
        {
          label: '服务列表',
          children: []
        }
      ],
      apiFileId: '',
      treeDataLoading: true,
      scrollTop: false
    }
  },
  methods: {
    handleNodeClick (val) {
      document.getElementsByClassName('el-main')[0].scrollTop = 0
      let pos = ApiInfo[1].label.indexOf(val.label)
      if (pos === -1) {
        this.activeName = val.label
        this.servicePath = val.servicePath
        this.apiFileId = val.apiFileId
        // 点击的是否是“服务介绍”
        let pos2 = ApiInfo[0].label.indexOf(val.label)
        if (pos2 !== -1) {
          this.apiPage = false
        } else {
          this.apiPage = true
        }
      }
    },
    // 获取Mep服务列表
    getMepService () {
      this.abilityList = this.openMepName
      this.abilityList[0].children = []
      Api.getMepServiceApi().then(res => {
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
          this.abilityList[0].children.push(obj)
        })
        if (dataTemp.length > 0) {
          this.$nextTick().then(() => {
            const firstNode = document.querySelector('.el-tree-node__children .el-tree-node')
            firstNode.click()
          })
        }
        this.treeDataLoading = false
        this.$nextTick(function () {
          this.divHeight('el-tree-node__children', 0, 260)
          let oDiv = document.getElementsByClassName('el-tree-node__content')
          oDiv[0].style.borderBottom = '1px solid #ddd'
        })
        this.divHeight('mep-tree', 0, 195)
        this.divHeight('el-tree-node__children', 0, 280)
      })
    },
    checkApiTitle () {
      if (this.language === 'en') {
        this.abilityList[0].label = ApiInfo[1].label[1]
      } else if (this.language === 'cn') {
        this.abilityList[0].label = ApiInfo[1].label[0]
      }
    },
    // 获取树状导航距离顶部高度
    getTreeTop () {
      let treeTop = this.$refs.meptree.getBoundingClientRect().top
      if (treeTop > 85) {
        this.scrollTop = false
        this.divHeight('mep-tree', 0, 185)
        this.divHeight('el-tree-node__children', 0, 280)
      } else {
        this.scrollTop = true
        this.divHeight('mep-tree', 0, 105)
        this.divHeight('el-tree-node__children', 0, 190)
      }
    },
    // 设置元素的高度
    divHeight (className, num, height) {
      let oDiv = document.getElementsByClassName(className)
      let clientHeight = document.documentElement.clientHeight
      oDiv[num].style.height = Number(clientHeight) - height + 'px'
    }
  },
  mounted () {
    this.getMepService()
    window.addEventListener('scroll', this.getTreeTop, true)
    window.onresize = () => {
      return (() => {
        this.getTreeTop()
      })()
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getTreeTop, true)
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
  *{
    box-sizing: border-box;
  }
  .mep-main{
    background-color: #fff;
    padding: 40px 40px 0;
    position: relative;
    .mep-tree{
      float: left;
      width: 270px;
      padding: 20px 0px;
      background-color: #f7f7f7;
      overflow-y: hidden;
    }
    .mep-tree.scroll-top{
      position: fixed;
      top: 85px;
      z-index: 9999;
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
        margin: 0 0 0 25px;
        overflow-y: auto;
        .el-tree-node__expand-icon{
          display: none;
        }
        .el-tree-node__label{
          padding-left: 10px;
        }
      }
      .el-tree-node__children:nth-child(1){
        overflow-y: visible;
      }
      .el-tree-node__children:nth-child(1)::-webkit-scrollbar{
        width: 6px;
      }
      .el-tree-node__children:nth-child(1)::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background: rgba(0,0,0,0.1);
      }
    }
    .doc-div{
      float: left;
      width: calc(100% - 270px);
    }
    .doc-div.doc-left{
      margin-left: 270px;
    }
    .doc-div.doc-right{
      width: calc(100% - 770px);
    }
    .api-div{
      float: left;
      width: 500px;
    }
    @media screen and (max-width: 1380px) {
      .mep-tree{
        width: 300px;
      }
      .doc-div.doc-right{
        width: calc(100% - 800px);
      }
    }
  }
}

</style>
