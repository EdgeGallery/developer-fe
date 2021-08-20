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
  <div class="main">
    <div class="prompt_content">
      <div>
        <img
          src="../../../assets/images/capability_hint.png"
          class="tip"
          alt=""
        >
        <p class="capabilityInfo fontUltraLight">
          {{ $t('workspace.capabilityInfo1') }}
        </p>
        <p class="capabilityInfo fontUltraLight">
          {{ $t('workspace.capabilityInfo2') }}
        </p>
      </div>
      <div class="upper-ability">
        <label class="selected-service defaultFont">{{ $t("workspace.selectedService") }}: </label>
        <el-tag
          v-for="tag in tags"
          :key="tag.id"
          :closable="isClosable"
          class="defaultFontLight"
          @close="handleDeleteTag(tag)"
          style="margin-left: 10px;"
        >
          {{ language === 'en' ? tag.nameEn : tag.name }}
        </el-tag>
      </div>
    </div>
    <div class="api">
      <div
        v-loading="apiDataLoading"
        v-if="hasService"
        class="clear"
      >
        <div class="api_left">
          <el-tree
            :check-strictly="true"
            :props="defaultProps"
            :render-after-expand="false"
            :show-checkbox="showCheckbox"
            :default-expand-all="isExpandAll"
            :default-expanded-keys="defaultShowNodes"
            accordion
            node-key="id"
            ref="treeList"
            lazy
            :load="loadNode"
            highlight-current
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
            icon-class="none"
            class="api_tree defaultFontLight"
          >
            <span
              class="el-tree-node__label"
              slot-scope="{ node, data }"
            >
              <el-tooltip
                popper-class="atooltip"
                class="item"
                :content="node.label"
                placement="right"
              >
                <span>
                  <img
                    class="oneLevelIcon"
                    :src="data.icon"
                  > {{ node.label }} </span>
              </el-tooltip>
            </span>
          </el-tree>
        </div>
        <div class="api_right">
          <div
            class="swagger-wrapper"
          >
            <div class="service_div">
              <p class="api_top defaultFont">
                {{ $t('workspace.apiTopText') }}
              </p>
              <p class="title defaultFontBlod">
                {{ $t('workspace.serviceDetails') }}
              </p>
              <el-row class="service_info">
                <el-col :span="12">
                  <span class="defaultFontBlod">{{ $t('workspace.servicename') }} ：</span>{{ language === 'en' ? serviceDetail.serviceNameEn : serviceDetail.serviceName }}
                </el-col>
                <el-col :span="12">
                  <span class="defaultFontBlod">{{ $t('workspace.version') }} ：</span>{{ serviceDetail.version }}
                </el-col>
              </el-row>
              <el-row class="service_info">
                <el-col :span="12">
                  <span class="defaultFontBlod">{{ $t('workspace.releaseTime') }} ：</span>{{ formatDate(serviceDetail.uploadTime) }}
                </el-col>
                <el-col :span="12">
                  <span class="defaultFontBlod">{{ $t('test.testApp.type') }} ：</span>{{ serviceDetail.capabilityType }}
                </el-col>
              </el-row>
              <el-row class="service_info">
                <el-col :span="24">
                  <span class="defaultFontBlod">SDK {{ $t('common.download') }} ：</span>
                  <el-select
                    v-model="codeLanguage"
                    name="codeLanguage"
                    popper-class="setSelect"
                    :popper-append-to-body="false"
                    class="list-select defaultFont"
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
                  <el-tooltip
                    popper-class="atooltip"
                    class="item"
                    :content="$t('workspace.sdkDownload')"
                    placement="right"
                  >
                    <span>
                      <el-link
                        class="download_sdk"
                        :underline="false"
                        :href="downloadSDKApi()"
                      />
                    </span>
                  </el-tooltip>
                  <el-tooltip
                    popper-class="atooltip"
                    class="item"
                    :content="$t('api.installGuide')"
                    placement="right"
                  >
                    <el-link
                      :href="guideUrl"
                      target="_blank"
                      :underline="false"
                      type="primary"
                      class="guide_url"
                    />
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>

            <div id="swagger-ui" />
          </div>
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
      <div
        class="select_initialization"
        v-if="!hasNoSelect"
      >
        <img
          src="../../../assets/images/select_initialization.png"
          alt="a"
        >
        <p>{{ $t('workspace.appRelease.selectInitialization') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Workspace, Api, Capability } from '../../../tools/api.js'
import { common } from '../../../tools/common.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  props: {
    showCapability: {
      type: Boolean,
      required: true
    }
  },
  name: '',
  data () {
    return {
      apiDataLoading: false,
      treeData: [],
      isExpandAll: false,
      defaultShowNodes: [],
      toDetailType: sessionStorage.getItem('toDetailType'),
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
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
        id: '',
        capabilityType: '',
        serviceName: '',
        serviceNameEn: '',
        uploadTime: 0,
        version: ''
      },
      language: localStorage.getItem('language'),
      downloadUrl: '',
      api_div: true,
      env_div: false,
      apiFileIdArr: [],
      secondStepSelect: {
        capabilitySelected: []
      },
      thirdStepSelection: [],
      guideUrl: 'https://gitee.com/edgegallery/docs/blob/master/Projects/Developer/SDK_Guide.md',
      hasService: true,
      hasNoSelect: true,
      groups: [],
      tree: [],
      capabilityList: [],
      groupId: '',
      capa: {},
      tags: [],
      treeLoad: {
        node: null,
        resolve: null
      },
      showCheckbox: true,
      isClosable: true,
      capabilityIcon: {
        'Platform services': {
          icon: require('../../../assets/images/capalist_icon2_default.png'),
          iconSelect: require('../../../assets/images/capalist_icon2_select.png')
        },
        'Telecom network': {
          icon: require('../../../assets/images/capalist_icon3_default.png'),
          iconSelect: require('../../../assets/images/capalist_icon3_select.png')
        },
        'Ascend AI': {
          icon: require('../../../assets/images/capalist_icon4_default.png'),
          iconSelect: require('../../../assets/images/capalist_icon4_select.png')
        },
        'AI capabilities': {
          icon: require('../../../assets/images/capalist_icon5_default.png'),
          iconSelect: require('../../../assets/images/capalist_icon5_select.png')
        },
        'Video processing': {
          icon: require('../../../assets/images/capalist_icon6_default.png'),
          iconSelect: require('../../../assets/images/capalist_icon6_select.png')
        },
        'DateBase': {
          icon: require('../../../assets/images/capalist_icon7_default.png'),
          iconSelect: require('../../../assets/images/capalist_icon7_select.png')
        },
        'Public framework': {
          icon: require('../../../assets/images/capalist_icon8_default.png'),
          iconSelect: require('../../../assets/images/capalist_icon8_select.png')
        }
      }
    }
  },
  methods: {
    formatDate (timestamp) {
      return common.formatDate(timestamp)
    },

    loadNode (node, resolve) {
      if (node.level === 0) {
        this.treeLoad.node = node
        this.treeLoad.resolve = resolve
      }
      if (this.isReadOnly()) {
        this.loadQueryCapabilityNode(node, resolve)
        return
      }
      if (this.isCreate()) {
        this.loadNewCapabilityNode(node, resolve)
        return
      }

      if (this.isEdit()) {
        this.loadEditCapabilityNode(node, resolve)
      }
    },
    loadQueryCapabilityNode (node, resolve) {
      if (node.level === 0) {
        let projectId = sessionStorage.getItem('mecDetailID')
        let groupMap = new Map()
        Capability.getCapabilityByProjectId(projectId).then(result => {
          let capabilities = result.data
          this.hasService = capabilities.length > 0
          capabilities.forEach(capability => {
            capability.label = this.language === 'en' ? capability.nameEn : capability.name
            capability.leaf = true
            let groupId = capability.groupId
            if (groupMap.has(groupId)) {
              let group = groupMap.get(groupId)
              capability.leaf = true
              group.children.push(capability)
            } else {
              let group = capability.group
              group.children = []
              group.children.push(capability)
              groupMap.set(capability.groupId, capability.group)
            }
          })
          let capabilityGroups = []
          groupMap.forEach((group, key) => {
            group.leaf = false
            group.label = this.language === 'en' ? group.nameEn : group.name
            capabilityGroups.push(group)
          })
          resolve(capabilityGroups)
          this.apiDataLoading = false
          this.$nextTick(() => {
            this.expandRootNodeAndSelectFirstLeafNode()
          })
        })
      }
      if (node.level > 1) return resolve([])

      if (node.level === 1) {
        return resolve(node.data.children)
      }
    },
    expandRootNodeAndSelectFirstLeafNode () {
      let rootNodes = {}
      if (this.$refs.treeList) {
        rootNodes = this.$refs.treeList.root
      }

      for (let rootNode of rootNodes.childNodes) {
        rootNode.expand()
        for (let leafNode of rootNode.childNodes) {
          leafNode.setChecked(true)
          this.handleCheckChange(leafNode.data, true)
        }
      }
      if (rootNodes.childNodes.length > 0) {
        let firstRootNode = rootNodes.childNodes[0]
        let firstLeafNode = firstRootNode.childNodes[0]
        this.$refs.treeList.setCurrentKey(firstLeafNode.data.id)
        this.handleNodeClick(firstLeafNode.data, firstLeafNode)
      }
    },
    loadNewCapabilityNode (node, resolve) {
      if (node.level === 0) {
        Capability.getAllCapabilityGroup().then(result => {
          let groups = result.data
          this.groups = groups
          groups.forEach(group => {
            group.label = this.language === 'en' ? group.nameEn : group.name
            group.leaf = false
          })
          resolve(groups)
          let rootNodes = this.$refs.treeList.root
          if (rootNodes.childNodes.length > 0) {
            let firstRootNode = rootNodes.childNodes[0]
            firstRootNode.expand()
          }
        })
      }
      if (node.level > 1) return resolve([])

      if (node.level === 1) {
        let groupId = node.data.id
        Capability.getCapabilityByGroupId(groupId).then(result => {
          let capabilities = result.data
          this.capaList = capabilities
          capabilities.forEach(capa => {
            capa.label = this.language === 'en' ? capa.nameEn : capa.name
            capa.leaf = true
          })
          resolve(capabilities)
          this.$nextTick(() => {
            let currentKey = this.$refs.treeList.getCurrentKey()
            if (!currentKey) {
              let rootNodes = this.$refs.treeList.root
              if (rootNodes.childNodes.length > 0) {
                let firstRootNode = rootNodes.childNodes[0]
                let firstLeafNode = firstRootNode.childNodes[0]
                this.$refs.treeList.setCurrentKey(firstLeafNode.data.id)
                this.handleNodeClick(firstLeafNode.data, firstLeafNode)
              }
            }
          })
        })
      }
    },
    loadEditCapabilityNode (node, resolve) {
      if (node.level === 0) {
        let projectId = sessionStorage.getItem('mecDetailID')
        let groupMap = new Map()
        Capability.getCapabilityByProjectId(projectId).then(result => {
          let capabilities = result.data
          this.hasService = capabilities.length > 0
          capabilities.forEach(capability => {
            capability.label = this.language === 'en' ? capability.nameEn : capability.name
            capability.leaf = true
            let groupId = capability.groupId
            if (groupMap.has(groupId)) {
              let group = groupMap.get(groupId)
              capability.leaf = true
              group.children.push(capability)
            } else {
              let group = capability.group
              group.children = []
              group.children.push(capability)
              groupMap.set(capability.groupId, capability.group)
            }
          })
        }).then(() => {
          Capability.getAllCapabilityGroup().then(result => {
            let groups = result.data
            this.groups = groups
            groups.forEach(group => {
              group.label = this.language === 'en' ? group.nameEn : group.name
              group.leaf = false
              let groupId = group.id
              if (groupMap.has(groupId)) {
                let selectedCapabilities = groupMap.get(groupId).children
                group.selectedCapabilities = selectedCapabilities
              }
            })
            resolve(groups)

            // expand
            groupMap.forEach((item, key) => {
              let groupNode = this.$refs.treeList.getNode(item.id)
              groupNode.expand()
            })
          })
        })
      }
      if (node.level > 1) return resolve([])

      if (node.level === 1) {
        let groupId = node.data.id
        Capability.getCapabilityByGroupId(groupId).then(result => {
          let capabilities = result.data
          this.capaList = capabilities
          capabilities.forEach(capa => {
            capa.label = this.language === 'en' ? capa.nameEn : capa.name
            capa.leaf = true
          })
          resolve(capabilities)

          // select leaf node
          if (node.data.selectedCapabilities) {
            node.data.selectedCapabilities.forEach(capability => {
              let leafNode = this.$refs.treeList.getNode(capability.id)
              leafNode.setChecked(true)
              this.handleCheckChange(leafNode.data, true)
              let currentKey = this.$refs.treeList.getCurrentKey()
              if (!currentKey) {
                this.$refs.treeList.setCurrentKey(leafNode.data.id)
                this.handleNodeClick(leafNode.data, leafNode)
              }
            })
          }
        })
      }
    },
    // edit projectDetail
    async editProjectDetail () {
      this.tree = []
      // await this.loadNewCapabilityNode()
      let projectId = sessionStorage.getItem('mecDetailID')
      Workspace.getProjectInfoApi(projectId, this.userId).then(res => {
        this.hasService = true
        Capability.getCapabilityByProjectId(projectId).then(result => {
          let capaList = result.data
          let firstSelected = true
          capaList.forEach(capa => {
            this.$nextTick(() => {
              this.$refs.treeList.setCurrentKey(capa.id)
              this.$refs.treeList.setChecked(capa.id, true)
              if (firstSelected) {
                let node = this.$refs.treeList.getNode(capa.id)
                this.handleNodeClick(node.data, node)
                firstSelected = false
              }
              this.defaultShowNodes.push(capa.id)
            })
          })
          this.apiType = res.data.type
          this.apiDataLoading = false
        })
      })
    },
    // Fetch project detail
    getProjectDetail () {
      this.tree = []
      let projectId = sessionStorage.getItem('mecDetailID')
      let groupMap = new Map()
      Capability.getCapabilityByProjectId(projectId).then(result => {
        let capabilities = result.data
        this.hasService = capabilities.length > 0
        capabilities.forEach(capability => {
          let groupId = capability.groupId
          if (groupMap.has(groupId)) {
            let group = groupMap.get(groupId)
            group.children.push(capability)
          } else {
            let group = capability.group
            group.children = []
            groupMap.set(capability.groupId, capability.group)
          }
        })
        groupMap.forEach((item, key) => {
          this.tree.push(item)
        })
        this.apiDataLoading = false
      })
    },
    async handleNodeClick (data, node, self) {
      this.hasNoSelect = false
      if (data.leaf) {
        let apiUrl = ''
        this.groupId = data.groupId
        this.serviceDetail.id = data.id
        this.serviceDetail.capabilityType = data.group.type
        this.serviceDetail.serviceName = data.name
        this.serviceDetail.serviceNameEn = data.nameEn
        this.serviceDetail.uploadTime = data.uploadTime
        this.serviceDetail.version = data.version
        this.apiFileId = data.apiFileId
        apiUrl = Workspace.getApiUrl(this.apiFileId, this.userId, data.group.type)
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
    downloadSDKApi () {
      let lan = this.codeLanguage.toLowerCase()
      sessionStorage.setItem('lan', lan)
      sessionStorage.setItem('sdkFileId', this.apiFileId)
      return Api.downloadSDKApi(this.apiFileId, lan)
    },
    async handleCheckChange (data, is) {
      if (is) {
        this.tags.push(data)
      } else {
        let index = this.tags.indexOf(data)
        if (index !== -1) {
          this.tags.splice(index, 1)
        }
      }
      this.updateCapabilitySelected()
      this.updateThirdStepSelection()
    },
    async handleDeleteTag (tag) {
      let index = this.tags.indexOf(tag)
      if (index !== -1) {
        this.tags.splice(index, 1)
      }

      this.$refs.treeList.setChecked(tag.id, false)
      this.updateCapabilitySelected()
      this.updateThirdStepSelection()
    },
    updateCapabilitySelected () {
      let cachedCapabilitySelected = []
      for (let capability of this.tags) {
        cachedCapabilitySelected.push(capability)
      }
      this.secondStepSelect.capabilitySelected = Array.from(new Set([...cachedCapabilitySelected]))
    },
    updateThirdStepSelection () {
      let cachedThirdStepSelection = []
      for (let capability of this.tags) {
        cachedThirdStepSelection.push(capability)
      }
      this.thirdStepSelection = cachedThirdStepSelection
    },
    emitStepData () {
      this.$emit('getFormData', { data: this.secondStepSelect, step: 'second' })
      this.$emit('getFormData', { data: this.thirdStepSelection, step: 'third' })
    },
    isReadOnly () {
      return this.showCapability
    },
    isCreate () {
      return this.toDetailType === 'addNewPro'
    },
    isEdit () {
      return this.toDetailType === 'editNewPro'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.defaultProps.label = this.language === 'en' ? 'nameEn' : 'name'
    },
    showCapability: {
      deep: true,
      handler (newVal, oldVal) {
        this.tags = []
        if (newVal) {
          this.showCheckbox = false
          this.isClosable = false
          if (this.isEdit() || this.isCreate()) {
            let rootNodes = this.$refs.treeList.root.childNodes
            rootNodes.splice(0, rootNodes.length)
            if (this.treeLoad.node) {
              this.loadNode(this.treeLoad.node, this.treeLoad.resolve)
            }
          }
        }
      }
    }
  },
  mounted () {
    this.tags = []
    if (!this.showCapability && this.toDetailType === 'addNewPro') {
      // this.getCapabilityGroups()
    } else if (!this.showCapability && this.toDetailType === 'editNewPro') {
      // this.editProjectDetail()
    } else {
      // this.getProjectDetail()
      this.showCheckbox = false
      this.isClosable = false
    }
    this.setApiHeight()
    let _this = this
    window.onresize = function () {
      _this.setApiHeight()
    }
  }
}

</script>
<style lang="less">
.main{
  padding-top: 19px;
  .tip{
    float: left;
    padding-top: 10px;
    padding-right: 16px;
  }
  .oneLevelIcon {
    display: inline-block;
    padding-right: 5px;
    vertical-align: middle;
  }
  .capabilityInfo{
    font-size: 12px;
    color: #5e40c8;
    letter-spacing: 1px;
    line-height: 24.07px;
  }
  .upper-ability{
    min-height:35px !important;
    margin-left: 42px;
    margin-top: 34px;
    margin-bottom: 36px;
    margin-right: 13px;
  }
  .selected-service{
    color: #5e40c8;
    font-size: 16px;
  }
  .el-tag .el-icon-close {
    border-radius: 50%;
    text-align: center;
    position: relative;
    cursor: pointer;
    font-size: 12px;
    height: 20px;
    width: 20px;
    margin-right: -12px;
    line-height: 20px;
    vertical-align: middle;
    top: -15px;
    background-color: red;
    right: -4px;
  }
  .el-select-dropdown__item{
    font-size: 12px;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #efeef5;
    color: #5844be;
    border: 0px;
  }
  .el-select-dropdown__item.selected {
    color: #5844be;;
    font-weight: normal;
  }
  .el-icon-close:before {
    color: #fbf8f8 !important;
  }
  .el-tree-node .el-tree-node__content .el-tree-node__label{
    font-size: 20px !important;
  }
  .el-tree-node .el-tree-node__children .el-tree-node__content .el-tree-node__label{
    font-size: 16px !important;
  }
  .el-tree-node:focus>.el-tree-node__content{
    background-color: #e6e8f3 !important;
    color: #409eff !important;
  }
  .el-tag--light{
    background-color: #5e40c8 !important;
    height: 33px !important;
    padding: 0 16px !important;
    line-height: 30px !important;
    font-size: 14px !important;
    color: #ffffff !important;
    border-radius: 15.5px !important;
  }
  .el-select-dropdown{
    border-radius: 8px;
  }
  .atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow {
    border-right-color: #5e40c8;
  }
  .atooltip.el-tooltip__popper[x-placement^="right"] .popper__arrow:after {
    border-right-color: #5e40c8;
  }
  .atooltip {
    background: #5e40c8 !important;
  }

  .api{
    border: 1px solid #ddd;
    background: #f8f8f8;
    border-radius: 16px;
    height: 469px;
    box-shadow: 6px -1px 40px 0 rgba(36, 20, 119, 0.11) inset;
    .api_left{
      float: left;
      width: 320px;
    }
    .api_right{
      float: left;
      width: calc(100% - 320px);
      border-radius: 16px;
      padding: 25px 0px 0 0;
      height: 467px;
    }
    .api_tree{
      max-height: 445px;
      width: 269px;
      overflow: scroll;
      display: inline-block;
      border-radius: 16px 0 0 0px;
      .el-tree-node__label {
        font-size:20px;
        color: #7a6e8a;
      }
    }
    .api_tree::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .el-tree-node__children>.el-tree-node .el-tooltip.item {
      display:inline-block;
      width: 115px !important;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-top: 10px;
    }
    .el-tree{
      background-color:transparent;
      padding-top: 12px;
    }
    .el-tree-node__content {
      padding-left: 23px !important;
    }
    .el-tree-node.is-expanded.is-focusable {
      padding-right: 51px;
      border-radius: 0 26px 26px 0;
      padding-bottom: 15px;
    }
    .el-tree-node__expand-icon.is-leaf {
      padding-left: 54px!important;
    }
    .el-tree-node__children {
      .el-tree-node.is-expanded.is-focusable {
        padding-right: 0px;
        padding-bottom: 0px;
      }
    }
    .el-tree-node__children>.el-tree-node {
      padding-top: 0px;
      height: 35px;
      .el-tree-node__content {
        height: 35px;
      }
    }
    .el-tree-node {
      padding-top: 0px;
      padding-bottom: 0px;
      .el-tree-node__content {
        height: 48px;
      }
    }
    .el-tree-node.is-expanded.is-focusable {
      border-radius: 0 26px 26px 0;
      background-image: linear-gradient(to right, #e6e6ef 0%, #f1f2fa 8%,#fdfeff 30%,#fefeff 80%) !important;
    }
    .el-tree-node.is-expanded.is-focusable .el-tree-node__content,.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      background-color: transparent !important;
      border-radius: 0 26px 26px 0;
    }
    .el-tree-node__children .el-tree-node.is-current>.el-tree-node__content {
      background-image: linear-gradient(to right, #e6e7f3 , #f0f0f7) !important;
      border-radius: 0 8px 8px 0 !important;
    }
    .el-tree-node__children>.el-tree-node>.el-tree-node__content:hover {
      background-image: linear-gradient(to right, #e6e7f3 , #f0f0f7) !important;
      border-radius: 0 8px 8px 0 !important;
    }
    .el-tree-node__children>.el-tree-node.is-current>.el-tree-node__content:hover {
      background-image: linear-gradient(to right, #e6e7f3 , #f0f0f7) !important;
      border-radius: 0 8px 8px 0 !important;
    }
    .el-tree-node__content:hover {
      border-radius: 0 26px 26px 0;
      background-image: linear-gradient(to right, #e6e6ef 0%, #f1f2fa 8%,#fdfeff 30%,#fefeff 80%) !important;
    }
    .el-tree-node.is-current>.el-tree-node__content:hover {
      border-radius: 0 26px 26px 0;
      background-image: linear-gradient(to right, #e6e6ef 0%, #f1f2fa 8%,#fdfeff 30%,#fefeff 80%) !important;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner{
      border-color: #55d8bf;
      background-color: #55d8bf;
    }

    .el-checkbox__input .el-checkbox__inner{
      border-color: #a19aac;
      background-color: #ffffff;
    }
    .el-checkbox__inner:hover {
      border-color: #a19aac;
      background-color: #ffffff;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner::after {
      display: none;
    }
    .setSelect {
      .el-scrollbar__view .el-select-dropdown__item:nth-child(2){
        border-top: 1px solid #efeef5;
        border-bottom: 1px solid #efeef5;
      }
    }
    .swagger-wrapper {
      height: 100%;
      overflow-y: auto;
      width: 100%;
    }
    .swagger-wrapper::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    #swagger-ui{
      width: 100%;
      height: auto !important;
      overflow-x: scroll;
      overflow-y: hidden;
      margin-top: 20px;
      .swagger-ui{
        width: 575px;
      }
      .swagger-ui .info{
        margin: -25px 0;
      }
    }
    .service_div{
      padding-left: 20px;
      .api_top{
        line-height: 25px;
        font-size: 14px;
        letter-spacing: 1.5px;
        color: #536170;
        padding-right: 16px;
      }
      .service_info{
        span{
          color: #536170;
          font-size: 14px;
        }
      }
      .title{
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 0px;
        letter-spacing: 1.5px;
      }
      .el-row{
        font-size: 14px;
        .el-col{
          padding-top: 5px;
          padding-left: 0px;
        }
        .el-select{
          width: 65px;
          .el-input__icon{
            width: 15px;
            line-height: 22px;
          }
          .el-input__inner{
            padding: 0 6px;
          }
          .el-input--suffix .el-input__inner{
            padding-right: 8px;
            border-radius: 8px;
            font-size: 12px;
            width: 66px;
            color: #5844be;
            height: 22px !important;
            line-height: 22px !important;
          }
        }
      }
      .download_sdk{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../../assets/images/download_new.png') center center no-repeat;
        background-color: #5e40c8;
        border-radius: 50%;
        margin-left: 14px;
      }
      .guide_url{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../../assets/images/guide_new.png') center center no-repeat;
        background-color: #5e40c8;
        border-radius: 50%;
        margin-left: 10px;
        margin-top: 1px;
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
    .el-popper[x-placement^="bottom"] {
      margin-top: 12px;
      border-radius: 8px;
    }
    .el-tree-node {
      .is-leaf + .el-checkbox .el-checkbox__inner {
        display:inline-block;
      }
      .el-checkbox__input> .el-checkbox__inner {
        display:none;
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
}
</style>
