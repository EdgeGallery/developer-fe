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
  <div class="appapi">
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
      <el-breadcrumb-item>{{ $t('breadCrumb.mepecoapi') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="mep-main clear"
      ref="meptree"
    >
      <div
        class="mep-tree"
        :class="{'scroll-top':scrollTop}"
      >
        <div class="treetop_tit">
          <p
            @click="showServiceIntro"
            :class="{'is-current':isServiceIntro}"
          >
            {{ $t('api.serviceIntroduction') }}
          </p>
          <p>
            {{ $t('api.serviceList') }}
          </p>
        </div>
        <el-tree
          :data="treeData"
          default-expand-all
          :indent="10"
          ref="tree"
          :highlight-current="true"
          :props="defaultProps"
          @node-click="handleNodeClick"
          v-loading="treeDataLoading"
          :class="{'isService':isServiceIntro}"
        />
      </div>
      <div
        class="doc-div"
        :class="{'doc-left':scrollTop,'doc-right':apiPage}"
        v-if="docPage"
      >
        <Document
          :guide-file-idprop="guideFileId"
        />
      </div>
      <div
        class="api-div"
        v-if="apiPage"
      >
        <API
          :api-file-idprop="apiFileId"
          :service-detailprop="serviceDetail"
          :is-delete-apiprop="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Document from './Document.vue'
import API from './API.vue'
import { Capability } from '../../tools/project_data.js'
import { Api } from '../../tools/api.js'
export default {
  name: 'Appapi',
  components: {
    Document,
    API
  },
  data () {
    return {
      docPage: true,
      apiPage: false,
      activeName: '',
      guideFileId: 'c437b9ac-f2c6-41db-bf5e-f9d86d856c46',
      language: localStorage.getItem('language'),
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      serviceDetail: {
        capabilityType: '',
        serviceName: '',
        uploadTime: '',
        version: '',
        userId: '',
        detailId: ''
      },
      apiFileId: '',
      treeDataLoading: false,
      scrollTop: false,
      isServiceIntro: true
    }
  },
  methods: {
    handleNodeClick (val) {
      this.isServiceIntro = false
      this.docPage = false
      if (!val.children) {
        this.guideFileId = val.docId
        this.apiFileId = val.apiFileId
        this.apiPage = true
        this.serviceDetail.capabilityType = val.capabilityType
        this.serviceDetail.serviceName = val.label
        this.serviceDetail.uploadTime = val.uploadTime
        this.serviceDetail.version = val.version
        this.serviceDetail.userId = val.userId
        this.serviceDetail.detailId = val.detailId
      }
      this.checkProjectData()
      document.getElementsByClassName('el-main')[0].scrollTop = 0
    },
    showServiceIntro () {
      this.isServiceIntro = true
      this.docPage = true
      this.apiPage = false
      this.guideFileId = 'c437b9ac-f2c6-41db-bf5e-f9d86d856c46'
    },
    // 获取服务列表
    getServiceList () {
      Api.getServiceApi('OPENMEP_ECO').then(res => {
        let treeDataTemp = []
        treeDataTemp = res.data.openCapability
        for (let i in treeDataTemp) {
          let obj = {
            label: '',
            children: []
          }
          let type = treeDataTemp[i].type
          this.checkProjectData()
          obj.label = treeDataTemp[i].name
          let serviceTemp = treeDataTemp[i].capabilityDetailList
          for (let j in serviceTemp) {
            let subObj = {
              id: 0,
              label: '',
              apiFileId: '',
              userId: '',
              type: '',
              capabilityType: '',
              uploadTime: '',
              version: '',
              docId: '',
              detailId: ''
            }
            subObj.id = j
            subObj.label = serviceTemp[j].service
            subObj.apiFileId = serviceTemp[j].apiFileId
            subObj.userId = serviceTemp[j].userId
            subObj.type = type
            subObj.capabilityType = treeDataTemp[i].name
            let timeStr = this.dateChange(serviceTemp[j].uploadTime)
            subObj.uploadTime = timeStr
            subObj.version = serviceTemp[j].version
            subObj.docId = serviceTemp[j].guideFileId
            subObj.detailId = serviceTemp[j].detailId
            obj.children.push(subObj)
          }
          this.treeData.push(obj)
        }
        this.checkProjectData()
        this.divHeight('mep-tree', 0, 195)
        this.divHeight('el-tree', 0, 285)
        this.treeDataLoading = false
      })
    },
    // 获取树状导航距离顶部高度
    getTreeTop () {
      let treeTop = this.$refs.meptree.getBoundingClientRect().top
      if (treeTop > 85) {
        this.scrollTop = false
        this.divHeight('mep-tree', 0, 185)
        this.divHeight('el-tree', 0, 275)
      } else {
        this.scrollTop = true
        this.divHeight('mep-tree', 0, 105)
        this.divHeight('el-tree', 0, 195)
      }
    },
    // 设置元素的高度
    divHeight (className, num, height) {
      let oDiv = document.getElementsByClassName(className)
      let clientHeight = document.documentElement.clientHeight
      oDiv[num].style.height = Number(clientHeight) - height + 'px'
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
    }
  },
  mounted () {
    this.getServiceList()
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
      this.checkProjectData()
    }
  }
}
</script>

<style lang="less">
.appapi{
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
      .treetop_tit{
        font-size: 14px;
        border-bottom: 1px solid #ddd;
        p{
          height: 35px;
          line-height: 35px;
          padding-left: 25px;
          border-left: 2px solid #f7f7f7;
        }
        p:first-child{
          cursor: pointer;
        }
        p.is-current{
          background-color: #d3f1f0;
          border-left: 2px solid #6c9c9c;
        }
      }
    }
    .mep-tree.scroll-top{
      position: fixed;
      top: 85px;
      z-index: 9999;
    }
    .el-tree{
      background-color: #f7f7f7;
      overflow-y: auto;
      .el-tree-node__content{
        height: 35px;
        line-height: 35px;
        border-left: 2px solid #f7f7f7;
      }
      .el-tree-node.is-current>.el-tree-node__content{
        background-color: #c3e2e1;
        border-left: 2px solid #6c9c9c;
      }
      .el-tree-node__children{
        margin: 0 0 0 25px;
        .el-tree-node__expand-icon{
          display: none;
        }
        .el-tree-node__label{
          padding-left: 10px;
        }
      }
    }
    .el-tree.isService{
      .el-tree-node.is-current>.el-tree-node__content{
        background-color: #f7f7f7;
        border-left: 2px solid #f7f7f7;
      }
    }
    .el-tree::-webkit-scrollbar{
      width: 6px;
    }
    .el-tree::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background: rgba(0,0,0,0.1);
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
      // width: 500px;
      width: calc(100% - 270px);
    }
    @media screen and (max-width: 1380px) {
      .mep-tree{
        width: 300px;
      }
      .doc-div.doc-right{
        width: calc(100% - 800px);
      }
      .api-div{
      width: calc(100% - 300px);
    }
    }
  }
}

</style>
