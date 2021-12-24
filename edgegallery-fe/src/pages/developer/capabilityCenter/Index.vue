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
    <el-collapse
      v-model="activeName"
      accordion
    >
      <el-collapse-item
        :title="$t('service.chooseServices')"
        name="chooseServices"
      >
        <div class="prompt_content">
          <div class="upper-ability">
            <label class="selected-service defaultFont">{{ $t('service.chosenService') }}</label>
            <el-tag
              v-for="tag in selectedServices"
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
        <div
          v-loading="apiDataLoading"
          v-if="hasService"
          class="clear service-container"
        >
          <div class="capability-left">
            <div
              v-for="service in groups"
              :key="service.id"
              class="service-group"
              :class="service.isSeviceSelected?'service-group-active':''"
              @click="getServices(service)"
            >
              <img
                :src="service.icon"
                :alt="service.name"
              >
              <span>
                {{ language==='cn'?service.name:service.nameEn }}
              </span>
              <span class="rt">
                {{ service.capabilityCount }}
              </span>
            </div>
          </div>
          <div class="capability-right">
            <CapabilityServiceList
              :capability-service-list="capabilityServiceList"
              :selected-services="selectedServices"
              :language="language"
              v-if="capabilityServiceList.length>0"
            />
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item
        :title="$t('service.servicePublish')"
        name="servicePublish"
      >
        <div class="add-service">
          <el-button
            class="common-btn"
            @click="publishService()"
          >
            {{ $t('service.addServiceConfig') }}
          </el-button>
        </div>
        <div class="capability-publish">
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
      </el-collapse-item>
    </el-collapse>
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
import CapabilityServiceList from './CapabilityServiceList.vue'
export default {
  name: 'CapabilityCenter',
  components: { CapabilityServiceList },
  data () {
    return {
      capabilityServiceList: [],
      language: localStorage.getItem('language') || 'cn',
      serviceDetail: {
        id: '',
        capabilityType: '',
        serviceName: '',
        serviceNameEn: '',
        uploadTime: '',
        version: ''
      },
      isClosable: true,
      selectedServices: [],
      apiDataLoading: false,
      hasService: true,
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
      serviceTableData: [],
      hasNoSelect: false,
      groupId: '',
      appId: sessionStorage.getItem('applicationId'),
      oneLevelName: '',
      oneLevelNameEn: '',
      groups: [],
      activeName: 'chooseServices'
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  methods: {
    doNext (type) {
      sessionStorage.setItem('isCapabilityActive', true)
      this.$message.success(this.$t('order.success'))
      this.$router.push('/EG/developer/home')
    },
    publishService  (service) {
      if (service) {
        this.$router.push({ path: '/EG/developer/capabilityPublish', query: service })
      } else {
        this.$router.push('/EG/developer/capabilityPublish')
      }
    },
    getPublishedService () {
      applicationApi.getPublishedService(this.appId).then(res => {
        this.serviceTableData = res.data
      })
    },
    async handleDeleteTag (tag) {
      let index = this.selectedServices.indexOf(tag)
      if (index !== -1) {
        this.selectedServices.splice(index, 1)
      }
      this.capabilityServiceList.forEach(item => {
        if (item.id === tag.id) {
          item.selected = false
        }
      })
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
      this.$confirm(this.$t('service.deleteServiceTip'), this.$t('homePromptMessage.prompt'), {
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
    getServices (node) {
      this.groups.forEach(ser => {
        if (ser.id === node.id) {
          ser.isSeviceSelected = true
        } else {
          ser.isSeviceSelected = false
        }
      })
      this.oneLevelName = node.name
      this.oneLevelNameEn = node.nameEn
      let groupId = node.id
      applicationApi.getCapabilityByGroupId(groupId).then(result => {
        this.capabilityServiceList = result.data
        this.capabilityServiceList.forEach(item => {
          this.selectedServices.forEach(ser => {
            if (item.id === ser.id) {
              item.selected = true
            }
          })
        })
      })
    },
    initGroupList () {
      applicationApi.getServiceList().then(res => {
        this.groups = res.data
        this.groups.forEach(group => {
          group.label = group.name
          if (this.capabilityIcon[group.nameEn]) {
            group.icon = this.capabilityIcon[group.nameEn].iconSelect
            group.isSeviceSelected = false
          }
        })
        this.getDependencies()
        this.getServices(this.groups[0])
      }).catch(err => {
        console.log(err)
      })
    },
    getDependencies () {
      applicationApi.getServiceDependencies(this.appId).then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(ser => {
            this.selectedServices.push(ser)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getPublishedService()
    this.initGroupList()
  }
}

</script>
<style lang="less">
.capability-index{
  position: absolute;
  top: 2%;
  left: 12%;
  width: 76%;
  padding: 35px 35px 35px 4%;
  .el-collapse {
    border: none;
    padding: 0;
    .el-collapse-item {
      margin-bottom: 15px;
      .el-collapse-item__content{
        padding: 0;
      }
      .el-collapse-item__header{
        font-weight: normal;
        font-size: 25px;
        margin-bottom: 12px;
        height: 60px;
        padding-left: 15px;
        font-size: 19px;
        color: #fff;
        border: none;
        background-color: #5F499D;
        border-radius: 60px;
      }
      .el-collapse-item__header:before{
        display: inline-block;
        content: '';
        width: 12px;
        height: 12px;
        background: #76E1E9;
        border-radius: 50%;
        position: relative;
        top: 0px;
        left: -6px;
      }
      .el-collapse-item__wrap{
        padding-left: 15px;
        background-color: transparent;
        border: none;
      }
    }
  }
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
    color: #fff;
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
    background: #4E3494;
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
      max-height: 500px;
      overflow: auto;
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
    #swagger-ui::-webkit-scrollbar-thumb {
      box-shadow: 0 0 0 3px #7656cc inset;
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
  margin-top: 15px;
}
.add-service{
  text-align: right;
  .common-btn{
    color: #fff !important;
    background: #4E3494;
    border-radius: 26px;
    font-size: 16px !important;
  }
}
.service-publish{
  padding-right: 1%;
}
.service-container{
  background: #5f499d;
  border-radius: 12px;
  padding: 25px;
  display: flex;
}
.service-group{
  height: 45px;
  width: 240px;
  line-height: 45px;
  border-radius: 12px;
  padding: 0 15px;
  cursor: pointer;
  margin: 10px 0;
  span{
    font-size: 24px;
    color: #fff;
    margin-left: 10px;
    font-weight: normal;
  }
}
.service-group-active, .service-group:hover{
  background: #a19aac;
}
.capability-right{
  width: calc(100% - 230px);
  padding-left: 15px;
}
</style>
