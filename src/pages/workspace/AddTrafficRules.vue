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
  <div class="addTrafficRules">
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
              <el-form-item :label="$t('workspace.appRelease.trafficRuleId')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="trafficRule.trafficRuleId"
                />
              </el-form-item>
              <el-form-item :label="$t('workspace.appRelease.priority')">
                <el-input-number
                  v-model="trafficRule.priority"
                  :min="1"
                  :max="255"
                  label="1-255"
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

        <!-- 新增Filter -->
        <div>
          <p class="title">
            {{ $t('workspace.appRelease.trafficFilter') }}
            <el-button-group class="rt">
              <el-button
                type="text"
                class="btn"
                @click="addNewFilter()"
              >
                {{ $t('workspace.appRelease.addFilter') }}
              </el-button>
            </el-button-group>
          </p>

          <!-- filter table -->
          <el-table
            class="mt20"
            :data="filterTableData"
            border
            size="small"
            style="width: 100%;"
          >
            <el-table-column
              prop="srcAddress"
              :label="$t('workspace.appRelease.srcAddress')"
              width="120px"
            />
            <el-table-column
              prop="srcPort"
              :label="$t('workspace.appRelease.srcPort')"
            />
            <el-table-column
              prop="dstAddress"
              :label="$t('workspace.appRelease.dstAddress')"
              width="120px"
            />
            <el-table-column
              prop="dstPort"
              :label="$t('workspace.appRelease.dstPort')"
            />
            <el-table-column
              prop="dstTunnelAddress"
              label="隧道目的地址"
            />
            <el-table-column
              prop="dstTunnelPort"
              label="隧道目的端口"
              width="120px"
            />
            <el-table-column
              prop="srcTunnelAddress"
              label="隧道源地址"
              width="120px"
            />
            <el-table-column
              prop="srcTunnelPort"
              label="隧道源端口"
              width="120px"
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
              width="120"
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

        <!-- 新增interface -->
        <div v-if="trafficRule.action==='FORWARD_DECAPSULATED'||trafficRule.action==='FORWARD_AS_IS'">
          <p class="title">
            转发接口信息
            <el-button-group class="rt">
              <el-button
                type="text"
                class="btn"
                @click="addNewInterface()"
              >
                新增接口信息
              </el-button>
            </el-button-group>
          </p>

          <!-- interface table -->
          <div>
            <el-table
              class="mt20"
              :data="interfaceTableData"
              border
              size="small"
              style="width: 100%;"
            >
              <el-table-column
                prop="interfaceType"
                label="接口类型"
              />
              <el-table-column
                prop="tunnelInfo.tunnelType"
                label="隧道类型"
              />
              <el-table-column
                prop="tunnelInfo.tunnelDstAddress"
                label="隧道目的地址"
                width="120px"
              />
              <el-table-column
                prop="tunnelInfo.tunnelSrcAddress"
                label="隧道源地址"
              />
              <el-table-column
                prop="tunnelInfo.tunnelSpecificData"
                label="隧道指定参数"
              />
              <el-table-column
                prop="dstMACAddress"
                label="目的MAC地址"
              />
              <el-table-column
                prop="srcMACAddress"
                label="源MAC地址"
              />
              <el-table-column
                prop="dstIPAddress"
                label="目的IP地址"
              />
              <el-table-column
                :label="$t('workspace.operation')"
                width="120"
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

        <!-- Filter dialog -->
        <el-dialog
          width="50%"
          title="分流规则"
          :visible.sync="innerFilterVisible"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-row>
            <el-form label-width="125px">
              <el-col :span="12">
                <el-form-item :label="$t('workspace.appRelease.srcAddress')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.srcAddress"
                    placeholder="多个IP请用','分割"
                  />
                </el-form-item>
                <el-form-item :label="$t('workspace.appRelease.srcPort')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.srcPort"
                    placeholder="多个端口请用','分割"
                  />
                </el-form-item>
                <el-form-item :label="$t('workspace.appRelease.dstAddress')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dstAddress"
                    placeholder="多个IP请用','分割"
                  />
                </el-form-item>
                <el-form-item :label="$t('workspace.appRelease.dstPort')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dstPort"
                    placeholder="多个端口请用','分割"
                  />
                </el-form-item>
                <el-form-item label="标签">
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
              </el-col>
              <el-col :span="12">
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
                <el-form-item label="隧道目的地址">
                  <el-input
                    v-model="trafficFilter.dstTunnelAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道目的端口">
                  <el-input
                    v-model="trafficFilter.dstTunnelPort"
                  />
                </el-form-item>
                <el-form-item label="隧道源地址">
                  <el-input
                    v-model="trafficFilter.srcTunnelAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道源端口">
                  <el-input
                    v-model="trafficFilter.srcTunnelPort"
                  />
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="cancelEditFilter()">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="confirmToAddFilter()"
            >
              确认
            </el-button>
          </div>
        </el-dialog>

        <!-- interface dialog -->
        <el-dialog
          width="30%"
          title="接口信息"
          :visible.sync="innerInterfaceVisible"
          append-to-body
          :close-on-click-modal="false"
        >
          <el-row>
            <el-form label-width="125px">
              <p class="title">
                接口信息
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
              <div v-if="dstInterface.interfaceType==='TUNNEL'">
                <p class="title">
                  隧道信息
                </p>
                <el-form-item label="隧道类型">
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
                <el-form-item label="隧道源地址">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelSrcAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道目的地址">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelDstAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道指定参数">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelSpecificData"
                  />
                </el-form-item>
              </div>
              <div v-if="dstInterface.interfaceType==='MAC'">
                <p class="title">
                  MAC信息
                </p>
                <el-form-item label="源MAC地址">
                  <el-input
                    v-model="dstInterface.srcMACAddress"
                  />
                </el-form-item>
                <el-form-item label="目的MAC地址">
                  <el-input
                    v-model="dstInterface.dstMACAddress"
                  />
                </el-form-item>
              </div>
              <div v-if="dstInterface.interfaceType==='IP'">
                <p class="title">
                  IP信息
                </p>
                <el-form-item label="目的IP地址">
                  <el-input
                    v-model="dstInterface.dstIPAddress"
                  />
                </el-form-item>
              </div>
            </el-form>
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="cancelEditInterface()">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="confirmToAddInterface()"
            >
              确认
            </el-button>
          </div>
        </el-dialog>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogVisible = false"
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
      default: () => { }
    }
  },
  data () {
    return {
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
      trafficRule: {
        action: '',
        filterType: '',
        priority: 125,
        trafficRuleId: '',
        trafficFilter: [
          {
            srcAddress: [],
            srcPort: [],
            dstAddress: [],
            dstPort: [],
            protocol: [],
            qci: '1',
            dscp: '0',
            tc: '1',
            srcTunnelAddress: '',
            srcTunnelPort: '',
            dstTunnelAddress: '',
            dstTunnelPort: ''
          }
        ],
        dstInterface: [
          {
            interfaceType: '',
            tunnelInfo: {
              tunnelType: '',
              tunnelDstAddress: '',
              tunnelsrcAddress: '',
              tunnelSpecificData: ''
            },
            srcMACAddress: '',
            dstMACAddress: '',
            dstIPAddress: ''
          }
        ]
      },
      filterTableData: [],
      trafficFilter: {
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: 'ANY',
        qci: '1',
        dscp: '0',
        tc: '1',
        tag: '',
        srcTunnelAddress: '',
        srcTunnelPort: '',
        dstTunnelAddress: '',
        dstTunnelPort: ''
      },
      dstInterface: {
        interfaceType: '',
        tunnelInfo: {
          tunnelType: '',
          tunnelDstAddress: '',
          tunnelsrcAddress: '',
          tunnelSpecificData: ''
        },
        srcMACAddress: '',
        dstMACAddress: '',
        dstIPAddress: ''
      },
      middleData: {
        ipAddressType: '',
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: 'ANY',
        qci: '1',
        dscp: '0',
        tc: '1'
      },
      interfaceTableData: []
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeFatherDialog', false)
      this.$emit('input', false)
    },
    // 获取规则列表
    getAllListData () {
      if (sessionStorage.getItem('filterData')) {
        this.filterTableData = JSON.parse(sessionStorage.getItem('filterData'))
      } else {
        this.filterTableData = []
      }
      if (sessionStorage.getItem('interfaceData')) {
        this.interfaceTableData = JSON.parse(sessionStorage.getItem('configData'))
      } else {
        this.interfaceTableData = []
      }
    },
    addNewFilter () {
      this.trafficFilter = {
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: 'ANY',
        qci: '1',
        dscp: '0',
        tc: '1',
        srcTunnelAddress: '',
        srcTunnelPort: '',
        dstTunnelAddress: '',
        dstTunnelPort: ''
      }
      this.innerFilterVisible = true
      this.addType = 1
    },
    addNewInterface () {
      this.dstInterface = {
        interfaceType: '',
        tunnelInfo: {
          tunnelType: '',
          tunnelDstAddress: '',
          tunnelsrcAddress: '',
          tunnelSpecificData: ''
        },
        srcMACAddress: '',
        dstMACAddress: '',
        dstIPAddress: ''
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
      sessionStorage.setItem('filterData', JSON.stringify(this.interfaceTableData))
    },
    cancelEditFilter () {
      this.innerFilterVisible = false
    },
    cancelEditInterface () {
      this.innerInterfaceVisible = false
    },
    addTrafficRules () {
      this.$emit('getAddTrafficData', this.trafficRule)
      this.handleClose()
    }
  },
  mounted () {
    this.getAllListData()
  }
}
</script>
<style lang='less' scoped>
  .title{
    margin:15px 3px;
    font-size:18px;
    text-align: left;
  }
  .title::before{
    content:'';
    display:inline-block;
    width:3px;
    height:17px;
    margin-right:3px;
    background: #409EFF;
    position: relative;
    top:2px;
  }
  .btn{
    position: relative;
    top: -10px;
    padding-right: 7px;;
  }
</style>
