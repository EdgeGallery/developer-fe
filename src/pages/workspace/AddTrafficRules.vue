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
  <div class="addTrafficRules defaultFontLight">
    <el-dialog
      :title="$t('workspace.add')+$t('workspace.trafficRules')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      :before-close="handleClose"
      center
    >
      <div id="rule">
        <p class="title">
          {{ $t('workspace.appRelease.trafficRule') }}
        </p>
        <el-form label-width="120px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('workspace.appRelease.trafficRuleId')"
              >
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficRule.trafficRuleId"
                />
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.priority')">
                <el-input-number
                  placeholder="1~255"
                  :min="1"
                  :max="255"
                  :controls="false"
                  v-model="trafficRule.priority"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('workspace.appRelease.action')"
              >
                <el-select
                  v-model="trafficRule.action"
                  :placeholder="$t('common.select')"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in action"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('workspace.appRelease.filterType')"
              >
                <el-select
                  v-model="trafficRule.filterType"
                  :placeholder="$t('common.select')"
                  :popper-append-to-body="false"
                >
                  <el-option
                    v-for="item in filterType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- Add new filter -->
        <div>
          <p class="title">
            {{ $t('workspace.appRelease.trafficFilter') }}
          </p>
          <!-- filter table -->
          <div class="tableSubTitle fontUltraLight">
            <span>{{ $t('workspace.appRelease.trafficFilter') }}</span>
            <el-button-group class="rt">
              <i class="el-icon-circle-plus-outline" />
              <el-button
                type="text"
                class="btn"
                @click="addNewFilter()"
              >
                {{ $t('workspace.appRelease.addFilter') }}
              </el-button>
            </el-button-group>
          </div>
          <el-table
            class="mt20"
            :data="filterTableData"
            size="small"
            style="width: 100%;"
          >
            <el-table-column
              prop="srcAddress"
              :label="$t('workspace.appRelease.srcAddress')"
              width="100%"
            />
            <el-table-column
              prop="srcPort"
              :label="$t('workspace.appRelease.srcPort')"
            />
            <el-table-column
              prop="dstAddress"
              :label="$t('workspace.appRelease.dstAddress')"
              width="100%"
            />
            <el-table-column
              prop="dstPort"
              :label="$t('workspace.appRelease.dstPort')"
            />
            <el-table-column
              width="125%"
              prop="tgtTunnelAddress"
              :label="$t('workspace.appRelease.tgtTunnelAddress')"
            />
            <el-table-column
              prop="dstTunnelPort"
              :label="$t('workspace.appRelease.dstTunnelPort')"
              width="125%"
            />
            <el-table-column
              prop="srcTunnelAddress"
              :label="$t('workspace.appRelease.srcTunnelAddress')"
              width="95%"
            />
            <el-table-column
              prop="srcTunnelPort"
              :label="$t('workspace.appRelease.srcTunnelPort')"
              width="95%"
            />
            <el-table-column
              prop="tag"
              label="Tag"
            />
            <el-table-column
              prop="qci"
              label="QCI"
            />
            <el-table-column
              prop="dscp"
              label="DSCP"
            />
            <el-table-column
              prop="tc"
              label="TC"
            />
            <el-table-column
              :label="$t('workspace.operation')"
              width="120px"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  class="editBtn"
                  @click="modifyFilterLines(scope.$index, scope.row)"
                >
                  {{ $t('api.modify') }}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  class="deleteBtn"
                  @click="deleteFilterLines(scope.$index, scope.row)"
                >
                  {{ $t('devTools.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- Add new interface -->
        <div v-if="trafficRule.action==='FORWARD_DECAPSULATED'||trafficRule.action==='FORWARD_AS_IS'">
          <p class="title">
            {{ $t('workspace.appRelease.forwardInterface') }}
          </p>
          <div class="tableSubTitle fontUltraLight">
            <span>{{ $t('workspace.appRelease.forwardInterfaceTabTitle') }}</span>
            <el-button-group class="rt">
              <i class="el-icon-circle-plus-outline forwardInterfaceIcon" />
              <el-button
                type="text"
                class="btn"
                @click="addNewInterface()"
              >
                {{ $t('workspace.appRelease.newInterface') }}
              </el-button>
            </el-button-group>
          </div>

          <!-- interface table -->
          <div>
            <el-table
              class="mt20"
              :data="interfaceTableData"
              size="small"
              style="width: 100%;"
            >
              <el-table-column
                width="100%"
                prop="interfaceType"
                :label="$t('workspace.appRelease.interfaceType')"
              />
              <el-table-column
                width="100%"
                prop="tunnelInfo.tunnelType"
                :label="$t('workspace.appRelease.tunnelType')"
              />
              <el-table-column
                width="125%"
                prop="tunnelInfo.tunnelDstAddress"
                :label="$t('workspace.appRelease.tgtTunnelAddress')"
              />
              <el-table-column
                width="95%"
                prop="tunnelInfo.tunnelSrcAddress"
                :label="$t('workspace.appRelease.srcTunnelAddress')"
              />
              <el-table-column
                width="115%"
                prop="tunnelInfo.tunnelSpecificData"
                :label="$t('workspace.appRelease.tunnelParams')"
              />
              <el-table-column
                width="115%"
                prop="dstMACAddress"
                :label="$t('workspace.appRelease.macAddress')"
              />
              <el-table-column
                width="95%"
                prop="srcMACAddress"
                :label="$t('workspace.appRelease.sourceMacAddress')"
              />
              <el-table-column
                width="100%"
                prop="dstIPAddress"
                :label="$t('workspace.appRelease.dstAddress')"
              />
              <el-table-column
                :label="$t('workspace.operation')"
                width="100%"
                fixed="right"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    class="editBtn"
                    @click="modifyInterfaceLines(scope.$index, scope.row)"
                  >
                    {{ $t('api.modify') }}
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    class="deleteBtn"
                    @click="deleteInterfaceLines(scope.$index, scope.row)"
                  >
                    {{ $t('devTools.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <span
        :class="{'button_en':language==='en'}"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          size="medium"
          class="cancel"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="addTrafficRules"
          size="medium"
          class="confirm"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
    <div id="filterSubDialog">
      <!-- Filter dialog -->
      <el-dialog
        width="50%"
        :title="$t('workspace.appRelease.trafficRule')"
        :visible.sync="innerFilterVisible"
        :close-on-click-modal="false"
      >
        <p class="title">
          {{ $t('workspace.appRelease.trafficRule') }}
        </p>
        <el-row>
          <el-form
            label-width="125px"
            class="filter_add"
            :class="{'filter_add_en':language==='en'}"
          >
            <el-col
              :span="24"
            >
              <el-form-item
                :label="$t('workspace.appRelease.srcAddress')"
              >
                <el-input
                  id=""
                  maxlength="20"
                  v-model="trafficFilter.srcAddress"
                />
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="this.$t('workspace.appRelease.multipleIP') "
                  placement="right"
                >
                  <em class="el-icon-info" />
                </el-tooltip>
                <!-- <p class="input_promt">
                  {{ $t('workspace.appRelease.multipleIP') }}
                </p> -->
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.srcPort')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficFilter.srcPort"
                />
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="this.$t('workspace.appRelease.multiplePort') "
                  placement="right"
                >
                  <em class="el-icon-info" />
                </el-tooltip>
                <!-- <p class="input_promt">
                  {{ $t('workspace.appRelease.multiplePort') }}
                </p> -->
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.dstAddress')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficFilter.dstAddress"
                />
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="this.$t('workspace.appRelease.multipleIP')"
                  placement="right"
                >
                  <em class="el-icon-info" />
                </el-tooltip>
                <!-- <p class="input_promt">
                  {{ $t('workspace.appRelease.multipleIP') }}
                </p> -->
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.dstPort')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficFilter.dstPort"
                />
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="this.$t('workspace.appRelease.multiplePort')"
                  placement="right"
                >
                  <em class="el-icon-info" />
                </el-tooltip>
                <!-- <p class="input_promt">
                  {{ $t('workspace.appRelease.multiplePort') }}
                </p> -->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="$t('workspace.appRelease.tag')">
                <el-input
                  v-model="trafficFilter.tag"
                />
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.protocol')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficFilter.protocol"
                />
              </el-form-item>
              <el-form-item label="QCI">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficFilter.qci"
                />
              </el-form-item>
              <el-form-item label="DSCP">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficFilter.dscp"
                />
              </el-form-item>
              <el-form-item label="TC">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficFilter.tc"
                />
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item :label="$t('workspace.appRelease.tgtTunnelAddress')">
                <el-input
                  v-model="trafficFilter.tgtTunnelAddress"
                />
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.dstTunnelPort')">
                <el-input
                  v-model="trafficFilter.dstTunnelPort"
                />
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.srcTunnelAddress')">
                <el-input
                  v-model="trafficFilter.srcTunnelAddress"
                />
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.srcTunnelPort')">
                <el-input
                  v-model="trafficFilter.srcTunnelPort"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div
          :class="{'button_en':language==='en'}"
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="cancelEditFilter()">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button
            type="primary"
            @click="confirmToAddFilter()"
          >
            {{ $t('common.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
    <div id="interfaceSubDialog">
      <!-- interface dialog -->
      <el-dialog
        width="50%"
        :title="$t('workspace.appRelease.interfaceInfo')"
        :visible.sync="innerInterfaceVisible"
        :close-on-click-modal="false"
      >
        <el-row>
          <el-form
            label-width="125px"
            :class="{'interface_dialog_en':language==='en'}"
          >
            <p class="title">
              {{ $t('workspace.appRelease.interfaceInfo') }}
            </p>
            <el-form-item
              label="interfaceType"
            >
              <el-select
                v-model="dstInterface.interfaceType"
                :placeholder="$t('common.select')"
              >
                <el-option
                  v-for="item in interfaceType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <div class="interfaceSubFormitem">
              <div v-if="dstInterface.interfaceType==='TUNNEL'">
                <p class="title">
                  {{ $t('workspace.appRelease.tunnelInfo') }}
                </p>
                <el-form-item :label="$t('workspace.appRelease.tunnelType')">
                  <el-select
                    v-model="dstInterface.tunnelInfo.tunnelType"
                    :placeholder="$t('common.select')"
                  >
                    <el-option
                      v-for="item in tunnelType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('workspace.appRelease.srcTunnelAddress')">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelSrcAddress"
                  />
                </el-form-item>
                <el-form-item :label="$t('workspace.appRelease.tgtTunnelAddress')">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelDstAddress"
                  />
                </el-form-item>
                <el-form-item :label="$t('workspace.appRelease.tunnelParams')">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelSpecificData"
                  />
                </el-form-item>
              </div>
              <div v-if="dstInterface.interfaceType==='MAC'">
                <p class="title">
                  {{ $t('workspace.appRelease.macInfo') }}
                </p>
                <el-form-item :label="$t('workspace.appRelease.sourceMacAddress')">
                  <el-input
                    v-model="dstInterface.srcMACAddress"
                  />
                </el-form-item>
                <el-form-item :label="$t('workspace.appRelease.macAddress')">
                  <el-input
                    v-model="dstInterface.dstMACAddress"
                  />
                </el-form-item>
              </div>
              <div v-if="dstInterface.interfaceType==='IP'">
                <p class="title">
                  {{ $t('workspace.appRelease.ipInfo') }}
                </p>
                <el-form-item :label="$t('workspace.appRelease.dstAddress')">
                  <el-input
                    v-model="dstInterface.dstIPAddress"
                  />
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-row>
        <div
          :class="{'button_en':language==='en'}"
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="cancelEditInterface()">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button
            type="primary"
            @click="confirmToAddInterface()"
          >
            {{ $t('common.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rule',
  components: {
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    editRuleDataprop: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      dialogVisible: this.value,
      innerFilterVisible: false,
      innerInterfaceVisible: false,
      activeName: 'dns',
      addType: 1,
      editIndex: 0,
      filterType: [
        {
          value: 'FLOW',
          label: 'FLOW'
        },
        {
          value: 'PACKET',
          label: 'PACKET'
        }
      ],
      action: [
        {
          value: 'DROP',
          label: 'DROP'
        },
        {
          value: 'FORWARD_DECAPSULATED',
          label: 'FORWARD_DECAPSULATED'
        },
        {
          value: 'FORWARD_AS_IS',
          label: 'FORWARD_AS_IS'
        },
        {
          value: 'PASSTHROUGH',
          label: 'PASSTHROUGH'
        },
        {
          value: 'SUPLICATED_DECAPSULATED',
          label: 'SUPLICATED_DECAPSULATED'
        }

      ],
      interfaceType: [
        {
          value: 'TUNNEL',
          label: 'TUNNEL'
        },
        {
          value: 'MAC',
          label: 'MAC'
        },
        {
          value: 'IP',
          label: 'IP'
        }
      ],
      tunnelType: [
        {
          value: 'GTP-U',
          label: 'GTP-U'
        },
        {
          value: 'GRE',
          label: 'GRE'
        }
      ],
      trafficRule: JSON.parse(JSON.stringify(this.editRuleDataprop)),
      filterTableData: [],
      trafficFilter: {
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: '',
        tag: '',
        qci: 1,
        dscp: 0,
        tc: 1,
        srcTunnelAddress: '',
        srcTunnelPort: '',
        tgtTunnelAddress: '',
        dstTunnelPort: ''
      },
      dstInterface: {
        interfaceType: '',
        srcMACAddress: '',
        dstMACAddress: '',
        dstIPAddress: '',
        tunnelInfo: {
          tunnelType: '',
          tunnelDstAddress: '',
          tunnelsrcAddress: '',
          tunnelSpecificData: ''
        }
      },
      middleData: {
        ipAddressType: '',
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: 'ANY',
        qci: 1,
        dscp: 0,
        tc: 1
      },
      interfaceTableData: []
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    // Fetch rule list
    getAllListData () {
      if (sessionStorage.getItem('filterData')) {
        this.filterTableData = JSON.parse(sessionStorage.getItem('filterData'))
      } else {
        this.filterTableData = []
      }
      if (sessionStorage.getItem('interfaceData')) {
        this.interfaceTableData = JSON.parse(sessionStorage.getItem('interfaceData'))
      } else {
        this.interfaceTableData = []
      }
    },
    addNewFilter () {
      this.trafficFilter = {
        srcAddress: '0.0.0.0/0',
        srcPort: '8080',
        dstAddress: '0.0.0.0/0',
        dstPort: '8080',
        protocol: 'ANY',
        tag: '1234',
        qci: 1,
        dscp: 0,
        tc: 1,
        srcTunnelAddress: '0.0.0.0',
        srcTunnelPort: '8080',
        tgtTunnelAddress: '0.0.0.0',
        dstTunnelPort: '8080'
      }
      this.innerFilterVisible = true
      this.addType = 1
    },
    addNewInterface () {
      this.dstInterface = {
        interfaceType: '',
        srcMACAddress: '',
        dstMACAddress: '',
        dstIPAddress: '',
        tunnelInfo: {
          tunnelType: '',
          tunnelDstAddress: '',
          tunnelsrcAddress: '',
          tunnelSpecificData: ''
        }
      }
      this.innerInterfaceVisible = true
      this.addType = 1
    },
    confirmToAddFilter () {
      let data = JSON.parse(JSON.stringify(this.trafficFilter))
      if (this.addType === 1) {
        this.filterTableData.push(data)
      } else {
        this.filterTableData.splice(this.editIndex, 1, data)
      }
      this.innerFilterVisible = false
      sessionStorage.setItem('filterData', JSON.stringify(this.filterTableData))
    },
    confirmToAddInterface () {
      let data = JSON.parse(JSON.stringify(this.dstInterface))
      if (this.addType === 1) {
        this.interfaceTableData.push(data)
      } else {
        this.interfaceTableData.splice(this.editIndex, 1, data)
      }
      this.innerInterfaceVisible = false
      sessionStorage.setItem('interfaceData', JSON.stringify(this.interfaceTableData))
    },
    modifyFilterLines (index, rows) {
      this.addType = 2
      this.editIndex = index
      this.innerFilterVisible = true
      this.middleData = JSON.parse(JSON.stringify(rows))
      this.trafficFilter = this.middleData
    },
    modifyInterfaceLines (index, rows) {
      this.addType = 2
      this.editIndex = index
      this.innerInterfaceVisible = true
      this.middleData = JSON.parse(JSON.stringify(rows))
      this.dstInterface = this.middleData
    },
    deleteFilterLines (index, rows) {
      this.filterTableData.splice(index, 1)
      this.$message.success(this.$t('devTools.deleteSucc'))
      sessionStorage.setItem('filterData', JSON.stringify(this.filterTableData))
    },
    deleteInterfaceLines (index, rows) {
      this.interfaceTableData.splice(index, 1)
      this.$message.success(this.$t('devTools.deleteSucc'))
      sessionStorage.setItem('interfaceData', JSON.stringify(this.interfaceTableData))
    },
    cancelEditFilter () {
      this.innerFilterVisible = false
    },
    cancelEditInterface () {
      this.innerInterfaceVisible = false
    },
    addTrafficRules () {
      this.trafficRule.trafficFilter = this.filterTableData
      if (this.trafficRule.action === 'FORWARD_DECAPSULATED' || this.trafficRule.action === 'FORWARD_AS_IS') {
        this.trafficRule.dstInterface = this.interfaceTableData
      } else {
        this.trafficRule.dstInterface = []
      }
      this.$emit('getAddTrafficData', this.trafficRule)
      this.handleClose()
    }
  },
  mounted () {
    console.log(this.language)
    this.getAllListData()
  }
}
</script>
<style lang='less' scoped>
.addTrafficRules{
 .filter_add_en{
    /deep/.el-form-item__label{
      padding-right:21px !important;
     }
    /deep/.el-col-12{
       /deep/.el-form-item__label{
          line-height:20px;
          vertical-align: middle;
       }
      }
    }
 .interface_dialog_en{
   /deep/.el-form-item__label{
      width:226px !important;
     }
   /deep/.el-form-item__content{
     margin-left:226px !important;
   }
 }
  #filterSubDialog{
    /deep/.el-icon-info{
          position: relative;
          top: -26px;
          right: 1%;
          float: right;
          font-size: 16px;
          color: #5344be;
    }

    /deep/.el-form-item__label{
          padding-right:25px;
    }
     /deep/.el-form-item__label_en{
          padding-right:21px;
    }

    // /deep/.el-input__suffix{
    //   right:85px;
    // }
    .title{
      margin-bottom:25px !important;
    }
     /deep/.el-col-24{
        /deep/.el-form-item{
        margin-bottom:0px !important;
        /deep/.el-input__inner{
        width:96%;
      }
      }
    }
    /deep/.el-col-10{
        .el-form-item{
        margin-bottom:20px;
      }

    }
    /deep/.el-col-14{
        .el-form-item{
        margin-bottom:20px;
      }
       .el-form-item__label{
        width:214px !important;
      }
      .el-form-item__content{
        margin-left:214px !important;
      }
    }
    /deep/.el-input{
        width:100%;
      }
  }
  #interfaceSubDialog{
    .el-form-item{
      margin-bottom:40px;
    }

    /deep/.el-input__suffix{
      right:11%;
    }

    /deep/.el-form-item__label{
      padding-right:25px;
    }
    .interfaceSubFormitem{
      .el-form-item{
      margin-bottom:25px;
     }
    }
  }
  /deep/.el-form-item__label{
    font-size:16px;
    color:#380879;
    padding-right:8px;
  }
  /deep/.el-input__inner{
    font-family: defaultFontLight;
    font-size:16px;
    color:#5743bc;
    width:90%;
    border-radius:8px;
    height:36px;
    line-height:36px;
    border:1px solid #efefef;
    text-align:left;
    padding-right:25px;
  }
  /deep/.el-input__icon{
    width:20px;
    line-height:36px;
  }
  /deep/.el-select .el-input .el-select__caret{
    color:#000;
  }
  /deep/.el-input__suffix{
  right:7%;
  }
  /deep/.el-icon-arrow-up:before{
    font-size:14px;
  }
  /deep/ .el-select-dropdown {
    text-align:left;
    min-width: 278px !important;
    left: 5% !important;
    position:absolute !important;
  }
  /deep/.el-input-number{
    width:100%;
  }
  /deep/.el-input-number__decrease {
    display:none;
  }
  /deep/.el-input-number__increase{
    display:none;
  }
  /deep/.el-form{
    margin-bottom:15px;
  }
  /deep/.el-button-group{
    position:relative;
    top:20px;
    left:20px;
  }
  /deep/.el-button--text{
    color:#fbfbfb !important;
  }
  /deep/.el-icon-circle-plus-outline{
    color:#fbfbfb;
    position:relative;
    right:100%;
    top:-19px;
    font-size:15px;
  }
  /deep/.el-table{
    background-color: #efefef;
    margin-top:0px !important;
    margin-bottom: 40px !important;
    /deep/.el-button--text{
      color:#62571a;
      font-size:14px;
    }
  }
  /deep/.el-dialog__footer{
     padding-bottom:0px;
  }
  /deep/.mt20{
    margin:0px;
  }
  /deep/.el-table th{
    background-color: #dedae9;
    padding:6px 4px;
    font-size:14px;
    font-weight:500;
    color:#62517a;
  }
  /deep/.el-table__header-wrapper{
    border-radius:0px;
  }
  /deep/.el-table th>.cell{
    padding-left:0px;
    padding-right:0px;
  }
  /deep/.el-table--scrollable-x .el-table__body-wrapper{    -index:9;
    background-color: #f1f2f6;
    border-radius: 0 0 12px 12px;
    box-shadow: inset 0px 0px 0px 0px #000, inset 0px -20px 27px -19px #d9d9dc;
  }
 /deep/.el-table__fixed::before, .el-table__fixed-right::before{
  height:0px !important;
}
  .forwardInterfaceIcon{
    right:100%;
  }

}

.tableSubTitle{
  width:100%;
  height:35px;
  line-height:35px;
  background-color: #9f97cb;
  border-radius:12px 12px 0px 0px;
  margin:0;
  padding:0 15px;
}
.tableSubTitle span{
  float:left;
  color:#fefefe;
  font-size:16px;
}

  .btn{
    position: relative;
    top: -10px;
    padding-right: 7px;
  }
  .el-form-item__content{
    line-height: none;
  }
  .input_promt{
    position:relative;
    top:-38px;
    left:90px;
    font-size: 16px;
    color: #ccc;
    height: 15px;
    margin-top: 5px;
  }

</style>
