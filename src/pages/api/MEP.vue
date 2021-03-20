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
        {{ $t('nav.mepApi') }}
      </el-breadcrumb-item>
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
          :data="treeData.cnData"
          default-expand-all
          :indent="10"
          ref="tree"
          :highlight-current="true"
          :props="defaultProps"
          @node-click="handleTreeNodeClick"
          v-loading="treeDataLoading"
          v-if="language==='cn'"
        />
        <el-tree
          :data="treeData.enData"
          default-expand-all
          :indent="10"
          ref="tree"
          :highlight-current="true"
          :props="defaultProps"
          @node-click="handleTreeNodeClick"
          v-loading="treeDataLoading"
          v-else
        />
      </div>
      <div
        class="service-content"
      >
        <div
          class="serviceSelctor"
          v-if="showServiceList && serviceList.length > 0"
        >
          <div class="selectLabel">
            {{ $t('api.serviceSelection') }}
          </div>
          <el-radio-group
            v-model="selectedService"
            @change="serviceSelectedChange"
            size="medium"
          >
            <el-radio-button
              v-for="item in serviceList"
              :key="item.service"
              :label="item.service"
            >
              {{ item.service }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <div
            class="doc-div"
            :class="{'doc-left':scrollTop,'doc-right':showApiPage}"
          >
            <Document
              :guide-file-idprop="guideFileId"
              v-if="guideFileId"
            />
            <div
              v-else
              class="noServiceInfo"
            >
              {{ $t('api.noDataNotice') }}
            </div>
          </div>
          <div
            class="api-div"
            v-if="showApiPage"
          >
            <API
              :api-file-idprop="apiFileId"
              :service-detailprop="serviceDetail"
              :is-delete-apiprop="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Document from './Document.vue'
import API from './API.vue'
import { Capability } from '../../tools/project_data.js'
import { Api } from '../../tools/api.js'
import en from '../../locales/en.js'
import cn from '../../locales/cn.js'

export default {
  name: 'Mepapi',
  components: {
    Document,
    API
  },
  data () {
    return {
      showServiceList: false,
      showApiPage: false,
      guideFileId: '',
      language: localStorage.getItem('language'),
      treeData: {
        cnData: [],
        enData: []
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      serviceDetail: {
        capabilityType: '',
        serviceName: '',
        uploadTime: '',
        version: ''
      },
      apiFileId: '',
      treeDataLoading: true,
      scrollTop: false,
      serviceList: [],
      selectedService: ''
    }
  },
  methods: {
    insetNewNode (groupData, tempTreeData, lan) {
      let firstLevelName = groupData.oneLevelName
      let secondLevelName = groupData.twoLevelName
      let thirdLevelName = groupData.threeLevelName
      let obj = {
        key: '',
        label: '',
        children: []
      }
      if (secondLevelName) {
        if (thirdLevelName) {
          let secondeLevelChildren = []
          secondeLevelChildren.push({ key: thirdLevelName, label: this.getCapabilityLabel(thirdLevelName, lan), groupId: groupData.groupId })
          obj.children.push({
            key: secondLevelName,
            label: this.getCapabilityLabel(secondLevelName, lan),
            children: secondeLevelChildren
          })
        } else {
          obj.children.push({
            key: secondLevelName,
            label: this.getCapabilityLabel(secondLevelName, lan),
            groupId: groupData.groupId
          })
        }
      }
      obj.key = firstLevelName
      obj.label = this.getCapabilityLabel(firstLevelName, lan)
      tempTreeData.push(obj)
      return tempTreeData
    },
    showUsageInstru () {
      this.showServiceList = false
      this.guideFileId = 'competenceCenterUsageInstruction'
      this.showApiPage = false
    },
    handleTreeNodeClick (val) {
      if (val.isInstruction) {
        this.showUsageInstru()
      } else {
        if (!val.children) {
          this.showServiceList = true
          Api.getServiceListApi(val.groupId).then(res => {
            if (res.data && res.data.capabilityDetailList) {
              let tmpServiceList = res.data.capabilityDetailList
              tmpServiceList = tmpServiceList.filter((item) => {
                return item.service
              })
              if (tmpServiceList.length > 0) {
                this.serviceList = tmpServiceList
                this.serviceDetail.capabilityType = res.data.twoLevelName
                this.selectedService = tmpServiceList[0].service
                this.$nextTick().then(() => {
                  this.serviceSelectedChange(this.selectedService)
                })
              } else {
                this.serviceList = []
                this.guideFileId = ''
                this.showApiPage = false
              }
            } else {
              this.serviceList = []
              this.guideFileId = ''
              this.showApiPage = false
            }
          })
          this.checkProjectData()
          document.getElementsByClassName('el-main')[0].scrollTop = 0
        }
      }
    },
    serviceSelectedChange (seletedLabel) {
      for (let i = 0; i < this.serviceList.length; i++) {
        if (this.serviceList[i].service === seletedLabel) {
          this.guideFileId = this.serviceList[i].guideFileId
          this.apiFileId = this.serviceList[i].apiFileId
          this.showApiPage = true
          this.serviceDetail.serviceName = this.serviceList[i].service
          this.serviceDetail.uploadTime = this.dateChange(this.serviceList[i].uploadTime)
          this.serviceDetail.version = this.serviceList[i].version
          break
        }
      }
      this.checkProjectData()
      document.getElementsByClassName('el-main')[0].scrollTop = 0
    },
    getTreeData (groupDataFromServer, lan) {
      let tempTreeData = []
      for (let i = 0; i < groupDataFromServer.length; i++) {
        let firstLevelName = groupDataFromServer[i].oneLevelName
        let secondLevelName = groupDataFromServer[i].twoLevelName
        let thirdLevelName = groupDataFromServer[i].threeLevelName
        let sameFirstNameItem = tempTreeData.filter(function (item) {
          if (item.key === firstLevelName) {
            return item
          }
        })
        if (sameFirstNameItem.length > 0) {
          let sameSecondNameItem = sameFirstNameItem[0].children.filter(function (item) {
            if (item.key === secondLevelName) {
              return item
            }
          })
          if (sameSecondNameItem.length > 0) {
            if (thirdLevelName) {
              if (sameSecondNameItem[0].children) {
                sameSecondNameItem[0].children.push({
                  key: thirdLevelName,
                  label: this.getCapabilityLabel(thirdLevelName, lan),
                  groupId: groupDataFromServer[i].groupId
                })
              } else {
                sameSecondNameItem[0].children = [].concat({
                  key: thirdLevelName,
                  label: this.getCapabilityLabel(thirdLevelName, lan),
                  groupId: groupDataFromServer[i].groupId
                })
              }
            }
          } else {
            if (thirdLevelName) {
              sameFirstNameItem[0].children.push({
                key: secondLevelName,
                label: this.getCapabilityLabel(secondLevelName, lan),
                groupId: groupDataFromServer[i].groupId,
                children: { key: thirdLevelName, label: this.getCapabilityLabel(thirdLevelName, lan), groupId: groupDataFromServer[i].groupId }
              })
            } else {
              sameFirstNameItem[0].children.push({
                key: secondLevelName,
                label: this.getCapabilityLabel(secondLevelName, lan),
                groupId: groupDataFromServer[i].groupId
              })
            }
          }
        } else {
          tempTreeData = this.insetNewNode(groupDataFromServer[i], tempTreeData, lan)
        }
      }
      tempTreeData = [{
        key: 'usageInstruction',
        label: lan === 'en' ? en.api['usageInstruction'] : cn.api['usageInstruction'],
        isInstruction: true
      }].concat(tempTreeData)
      return tempTreeData
    },
    // 获取所有能力组
    getCapabilityGroups () {
      Api.getCapabilityGroupsApi().then(res => {
        let groupDataFromServer = res.data
        this.treeData.enData = this.getTreeData(groupDataFromServer, 'en')
        this.treeData.cnData = this.getTreeData(groupDataFromServer, 'cn')
        this.$nextTick().then(() => {
          const firstNode = document.querySelector('.el-tree-node__content')
          firstNode.click()
        })
      })
      this.checkProjectData()
      this.divHeight('mep-tree', 0, 195)
      this.divHeight('el-tree', 0, 255)
      this.treeDataLoading = false
    },
    // 获取树状导航距离顶部高度
    getTreeTop () {
      let treeTop = this.$refs.meptree.getBoundingClientRect().top
      if (treeTop > 85) {
        this.scrollTop = false
        this.divHeight('mep-tree', 0, 185)
        this.divHeight('el-tree', 0, 245)
      } else {
        this.scrollTop = true
        this.divHeight('mep-tree', 0, 105)
        this.divHeight('el-tree', 0, 165)
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
        return Y + '-' + (M > 9 ? M : ('0' + M)) + '-' + (D > 9 ? D : ('0' + D)) + ' '
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
      })
    },
    getCapabilityLabel (val, lan) {
      let label = val
      let resData = Capability.filter((res) => {
        return res.value === val
      })
      if (resData.length > 0) {
        if (lan === 'en') {
          label = resData[0].label[1]
        } else {
          label = resData[0].label[0]
        }
      }
      return label
    }
  },
  mounted () {
    this.getCapabilityGroups()
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
      padding-left: 30px;
      overflow-y: auto;
      .el-tree-node__expand-icon.is-leaf{
        display: none;
      }
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
      }
    }
    .el-tree::-webkit-scrollbar{
      width: 6px;
    }
    .el-tree::-webkit-scrollbar-thumb{
      border-radius: 10px;
      background: rgba(0,0,0,0.1);
    }
    .service-content{
      margin-left: 270px;
      .serviceSelctor{
        width: 100%;
        padding: 0.5rem;
        .selectLabel{
          margin-bottom: 0.5rem;
        }
      }
    }
    .doc-div{
      float: left;
      width: 100%;
      .noServiceInfo{
        text-align: center;
      }
    }
    .doc-div.doc-right{
      width: calc(100% - 500px);
      .noServiceInfo{
        text-align: center;
      }
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
