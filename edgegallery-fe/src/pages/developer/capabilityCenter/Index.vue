<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div
    class="common-div-bg capability-index"
  >
    <div class="prompt_content">
      <div>
        <img
          src="../../../assets/images/capability/capability_tip.png"
          class="tip"
          alt=""
        >
        <p class="capabilityInfo fontUltraLight">
          {{ $t('service.serviceTip') }}
        </p>
      </div>
      <div class="upper-ability">
        <label class="selected-service defaultFont">{{ $t('service.chosenService') }}</label>
        <el-tag
          v-for="tag in selectedService"
          :key="tag.id"
          :closable="isClosable"
          style="margin-left: 10px;"
          class="defaultFontLight"
          @close="handleDeleteTag(tag)"
        >
          <span>{{ isClosable === true ? '&nbsp;&nbsp;' : "" }}</span>{{ tag.name||tag.twoLevelName }}
        </el-tag>
      </div>
    </div>
    <h3 class="common-dlg-title">
      {{ $t('service.chooseServices') }}
    </h3>
    <div class="api">
      <div
        v-loading="apiDataLoading"
        v-if="hasService"
        class="clear"
      >
        <div class="capability-left">
          <el-tree
            :check-strictly="true"
            :render-after-expand="false"
            :show-checkbox="showCheckbox"
            :props="defaultProps"
            :default-expand-all="isExpandAll"
            :default-expanded-keys="defaultShowNodes"
            :check-on-click-node="clickIsSelected"
            accordion
            node-key="id"
            lazy
            highlight-current
            icon-class="none"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
            class="capability-tree defaultFontLight"
            :load="loadNode"
            ref="treeList"
          >
            <span
              class="el-tree-node__label"
              slot-scope="{ node, data }"
            >
              <el-tooltip
                popper-class="atooltip"
                class="tooltip-item"
                :content="node.label"
                :disabled="getTipDisabled(node, data)"
                placement="right"
              >
                <span>
                  <img
                    class="oneLevelIcon"
                    :src="data.icon"
                    alt=""
                  > {{ node.label }}  </span>
              </el-tooltip>
            </span>
          </el-tree>
        </div>
        <div class="capability-right">
          <div
            class="swagger-wrapper"
          >
            <div class="service_div">
              <p class="capability-top defaultFont">
                {{ $t('service.apiMonitor') }}
              </p>
              <p class="title ">
                {{ $t('service.serviceDetail') }}
              </p>
              <el-row class="service_info">
                <el-col :span="12">
                  <span class=""> {{ $t('service.serviceName1') }}</span>{{ serviceDetail.serviceName }}
                </el-col>
                <el-col :span="12">
                  <span class=""> {{ $t('service.version1') }}</span>{{ serviceDetail.version }}
                </el-col>
              </el-row>
              <el-row class="service_info">
                <el-col :span="12">
                  <span class="">{{ $t('service.publishTime') }}</span>{{ serviceDetail.uploadTime }}
                </el-col>
                <el-col :span="12">
                  <span class="">{{ $t('service.type') }}</span>{{ serviceDetail.capabilityType }}
                </el-col>
              </el-row>
            </div>
            <div id="swagger-ui" />
          </div>
        </div>
      </div>
    </div>
    <div class="capability-publish">
      <h3 class="common-dlg-title service-publish">
        {{ $t('service.servicePublish') }}
        <el-button
          class="common-btn rt add-service"
          @click="publishService()"
        >
          {{ $t('service.addServiceConfig') }}
        </el-button>
      </h3>
      <el-table
        class="common-table"
        :data="serviceTableData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{textAlign: 'center'}"
      >
        <el-table-column
          prop="serviceName"
          :label="$t('service.serviceName')"
        />
        <el-table-column
          prop="oneLevelName"
          :label="$t('service.firLevel')"
        />
        <el-table-column
          prop="twoLevelName"
          :label="$t('service.secLevel')"
        />
        <el-table-column
          prop="internalPort"
          :label="$t('service.internalPort')"
        />
        <el-table-column
          prop="version"
          :label="$t('incubation.version')"
        />
        <el-table-column
          prop="protocol"
          :label="$t('service.protocol')"
        />
        <el-table-column
          :label="$t('common.operation')"
          width="120px"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              class="operation-btn-text"
              @click="publishService(scope.row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              type="text"
              class="operation-btn-text"
              @click="deletePublishedService(scope.row.appServiceProducedId)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="rt">
      <el-button
        class="common-btn"
        @click="$router.go(-1)"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        class="common-btn"
        @click="doNext(2)"
      >
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { applicationApi } from '../../../api/developerApi.js'
import { formatDate } from '../../../tools/common.js'
import SwaggerUIBundle from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: 'CapabilityCenter',
  data () {
    return {
      codeLanguage: 'JAVA',
      optionsLanguage: [
        {
          value: 0,
          label: 'JAVA'
        },
        {
          value: 1,
          label: 'Python'
        },
        {
          value: 2,
          label: 'Go'
        }
      ],
      serviceDetail: {
        id: '',
        capabilityType: '',
        serviceName: '',
        serviceNameEn: '',
        uploadTime: '',
        version: ''
      },
      isClosable: true,
      selectedService: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      apiDataLoading: false,
      treeData: [],
      isExpandAll: false,
      clickIsSelected: false,
      defaultShowNodes: [],
      defaultExpandKeys: [],
      hasService: true,
      showCheckbox: true,
      guideUrl: 'https://gitee.com/edgegallery/docs/blob/master/Projects/Developer/SDK_Guide.md',
      capabilityIcon: {
        'Platform services': {
          icon: require('../../../assets/images/capability/capability_icon2_default.png'),
          iconSelect: require('../../../assets/images/capability/capability_icon2_select.png')
        },
        'Telecom network': {
          icon: require('../../../assets/images/capability/capability_icon3_default.png'),
          iconSelect: require('../../../assets/images/capability/capability_icon3_select.png')
        },
        'Ascend AI': {
          icon: require('../../../assets/images/capability/capability_icon4_default.png'),
          iconSelect: require('../../../assets/images/capability/capability_icon4_select.png')
        },
        'AI capabilities': {
          icon: require('../../../assets/images/capability/capability_icon5_default.png'),
          iconSelect: require('../../../assets/images/capability/capability_icon5_select.png')
        },
        'Video processing': {
          icon: require('../../../assets/images/capability/capability_icon6_default.png'),
          iconSelect: require('../../../assets/images/capability/capability_icon6_select.png')
        },
        'DateBase': {
          icon: require('../../../assets/images/capability/capability_icon7_default.png'),
          iconSelect: require('../../../assets/images/capability/capability_icon7_select.png')
        },
        'Public framework': {
          icon: require('../../../assets/images/capability/capability_icon8_default.png'),
          iconSelect: require('../../../assets/images/capability/capability_icon8_select.png')
        }
      },
      treeLoad: {
        node: null,
        resolve: null
      },
      serviceTableData: [],
      capaList: [],
      hasNoSelect: false,
      groupId: '',
      appId: sessionStorage.getItem('applicationId'),
      oneLevelName: '',
      oneLevelNameEn: ''
    }
  },
  methods: {
    doNext (type) {
      sessionStorage.setItem('isCapabilityActive', true)
      this.$store.commit('changeFlow', '2')
      this.$message.success('操作成功！')
      this.$router.push('/EG/developer/home')
    },
    publishService  (service) {
      if (service) {
        this.$router.push({ path: '/EG/developer/capabilityPublish', query: service })
      } else {
        this.$router.push('/EG/developer/capabilityPublish')
      }
    },
    getTipDisabled (node, data) {
      return data.children || (!data.children && node.label.length < 7)
    },
    getPublishedService () {
      applicationApi.getPublishedService(this.appId).then(res => {
        this.serviceTableData = res.data
      })
    },
    async handleDeleteTag (tag) {
      let index = this.selectedService.indexOf(tag)
      if (index !== -1) {
        this.selectedService.splice(index, 1)
      }
      this.$refs.treeList.setChecked(tag.id, false)
      this.deleteServices(tag.id)
    },
    deleteServices (serId) {
      applicationApi.deleteService(this.appId, serId).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    deletePublishedService (id) {
      this.$confirm(this.$t('service.deleteServiceTip'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        applicationApi.deletePublishedService(this.appId, id).then(res => {
          this.$message.success(this.$t('incubation.deleted'))
          this.getPublishedService()
        })
      })
    },
    async handleNodeClick (data) {
      if (data.leaf) {
        this.hasNoSelect = true
        let apiUrl = ''
        this.groupId = data.groupId
        this.serviceDetail.id = data.id
        this.serviceDetail.capabilityType = data.group.type
        this.serviceDetail.serviceName = data.name
        this.serviceDetail.serviceNameEn = data.nameEn
        this.serviceDetail.uploadTime = formatDate(data.uploadTime)
        this.serviceDetail.version = data.version
        this.apiFileId = data.apiFileId
        apiUrl = applicationApi.getApiUrl(this.apiFileId)
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
    async handleCheckChange (data, isNewService) {
      if (data.leaf) {
        if (isNewService) {
          this.selectedService.push(data)
          let params = {
            serName: data.host,
            version: data.version,
            appId: data.appId,
            packageId: data.packageId,
            id: data.id,
            oneLevelName: this.oneLevelName,
            oneLevelNameEn: this.oneLevelNameEn,
            twoLevelName: data.name,
            twoLevelNameEn: data.nameEn,
            requestedPermissions: true
          }
          applicationApi.addService(this.appId, params).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          this.handleNodeClick(data)
        } else {
          this.selectedService.forEach((ser, index) => {
            if (ser.id === data.id) {
              this.selectedService.splice(index, 1)
              this.deleteServices(ser.id)
            }
          })
        }
      }
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        this.treeLoad.node = node
        this.treeLoad.resolve = resolve
      }
      this.initCapabilityList(node, resolve)
    },
    initCapabilityList (node, resolve) {
      if (node.level && node.level > 1) {
        return resolve([])
      }
      if (node.level === 0) {
        applicationApi.getServiceList().then(res => {
          let groups = res.data
          this.groups = groups
          groups.forEach(group => {
            group.label = group.name
            group.leaf = false
            if (this.capabilityIcon[group.nameEn]) {
              group.icon = this.capabilityIcon[group.nameEn].iconSelect
            }
          })
          this.getDependencies()
          resolve(groups)
        }).catch(err => {
          console.log(err)
        })
      }
      if (node.level === 1) {
        this.oneLevelName = node.data.name
        this.oneLevelNameEn = node.data.nameEn
        let groupId = node.data.id
        applicationApi.getCapabilityByGroupId(groupId).then(result => {
          let capabilities = result.data
          this.capaList = capabilities
          capabilities.forEach(capa => {
            capa.label = this.language === 'en' ? capa.nameEn : capa.name
            capa.leaf = true
          })
          resolve(capabilities)
          this.selectedService.forEach(ser => {
            let leafNode = this.$refs.treeList.getNode(ser.id)
            leafNode.setChecked(true)
          })
        })
      }
    },
    getDependencies () {
      applicationApi.getServiceDependencies(this.appId).then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(ser => {
            this.selectedService.push(ser)
          })
          this.groups.forEach(group => {
            if (group.name === this.selectedService[0].oneLevelName) {
              applicationApi.getCapabilityByGroupId(group.id).then(result => {
                if (result.data) {
                  result.data.forEach(data => {
                    if (data.name === this.selectedService[0].twoLevelName) {
                      this.serviceDetail.capabilityType = data.group.type
                      this.serviceDetail.serviceName = data.name
                      this.serviceDetail.serviceNameEn = data.nameEn
                      this.serviceDetail.uploadTime = formatDate(data.uploadTime)
                      this.serviceDetail.version = data.version
                      this.apiFileId = data.apiFileId
                      let apiUrl = applicationApi.getApiUrl(this.apiFileId)
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
                    }
                  })
                }
              })
            }
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getPublishedService()
  }
}

</script>
<style lang="less">
.capability-index{
  position: absolute;
  top: 1%;
  left: 12%;
  width: 76%;
  padding: 35px 35px 35px 4%;
  .tip{
    float: left;
    width: 40px;
    height: 40px;
    position: relative;
    top: -6px;
    margin-right: 10px;
  }
  .oneLevelIcon {
    display: inline-block;
    padding-right: 5px;
    vertical-align: middle;
  }
  .capabilityInfo{
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 24.07px;
  }
  .upper-ability{
    min-height:35px !important;
    margin: 15px 13px 15px 0px;
    clear: both;
  }
  .selected-service{
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
    color: #5844be;
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
    background-color: rgba(255,225,255,0.3) !important;
    height: 33px !important;
    white-space: pre;
    padding: 0 16px !important;
    line-height: 30px !important;
    font-size: 14px !important;
    color: #ffffff !important;
    border-radius: 4px !important;
    border: none!important;
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
    background: #9b94c0;
    border-radius: 16px;
    margin-right: 2%;
    color: #000000;
    margin-bottom: 15px;
    .capability-left{
      float: left;
      width: 20%;
    }
    .capability-right{
      float: left;
      width: 80%;
      border-radius: 16px;
      padding: 25px 0px 0 0;
      height: 425px;
      .select_initialization{
        padding-top: 100px;
        text-align: center;
        .select_initialization_text{
          padding-top: 5px;
          font-size: 12px;
          color: #7a6e8a;
        }
      }
    }
    .capability-tree{
      max-height: 445px;
      width: 269px;
      overflow: scroll;
      display: inline-block;
      border-radius: 16px 0 0 0px;
      .el-tree-node__label {
        font-size:20px;
        color: #000000;
      }
    }
    .capability-tree::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .el-tree-node__children>.el-tree-node .el-tooltip.item {
      display:inline-block;
      width: 115px !important;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-top: 10px;
      img{
        position: relative;
      }
    }
    .el-tree{
      background-color: transparent;
      padding-top: 12px;
    }
    .el-tree-node__content {
      padding-left: 23px !important;
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

    .el-tree-node .el-tree-node__content {
      height: 48px;
    }
    .el-tree-node.is-expanded.is-focusable {
      padding-right: 51px;
      padding-bottom: 15px;
      border-radius: 0 26px 26px 0;
    }
    .el-tree-node.is-expanded.is-focusable .el-tree-node__content,.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      background-color: transparent !important;
      border-radius: 0 26px 26px 0;
    }
    .el-tree-node__children .el-tree-node.is-current>.el-tree-node__content {
      border-radius: 0 8px 8px 0 !important;
    }
    .el-tree-node__children>.el-tree-node>.el-tree-node__content:hover {
      border-radius: 0 8px 8px 0 !important;
      color: #fff !important;
      background: transparent !important;
    }
    .el-tree-node__children>.el-tree-node.is-current>.el-tree-node__content:hover {
      border-radius: 0 8px 8px 0 !important;
      color: #fff !important;
      background: transparent !important;
    }
    .el-tree-node__content:hover {
      border-radius: 0 26px 26px 0;
      color: #fff !important;
      background: transparent !important;
    }
    .el-tree-node.is-current>.el-tree-node__content:hover {
      border-radius: 0 26px 26px 0;
      color: #fff !important;
      background: transparent !important;
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
      padding: 40px 0 0 20px;
      .swagger-ui{
        width: 860px;
      }
      .swagger-ui .info{
        margin: -25px 0;
      }
    }
    .service_div{
      padding-left: 20px;
      .capability-top{
        line-height: 25px;
        font-size: 16px;
        letter-spacing: 1.5px;
        padding-right: 16px;
      }
      .service_info{
        span{
          font-size: 16px;
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
          width: 80px;
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
            width: 80px;
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
        background: url('../../../assets/images/capability/capability_download.png') center center no-repeat;
        background-color: #5e40c8;
        border-radius: 50%;
        margin-left: 14px;
      }
      .guide_url{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../../assets/images/capability/capability_guide.png') center center no-repeat;
        background-color: #5e40c8;
        border-radius: 50%;
        margin-left: 5px;
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
      padding-top: 0px;
      padding-bottom: 0px;
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
.el-icon-arrow-up:before{
  color: #5e40c8;
}
.capability-publish{
  clear: both;
}
.service-publish{
  padding-right: 1%;
}
</style>
