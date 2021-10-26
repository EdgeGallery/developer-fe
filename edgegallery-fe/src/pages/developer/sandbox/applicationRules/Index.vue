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
  <div class="application-rules padding_default">
    <div class="rules-config">
      <h3 class="rules-title">
        应用规则配置
      </h3>
      <h4 class="rules-title-sub clear">
        流量规则
        <el-button class="common-btn rt">
          添加流量规则
        </el-button>
      </h4>
      <el-table
        class="common-table"
        :data="trafficListData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{textAlign: 'center'}"
      >
        <el-table-column
          prop="trafficRuleId"
          label="流规则标识"
          min-width="20%"
        />
        <el-table-column
          prop="action"
          label="过滤类型"
          min-width="20%"
        />
        <el-table-column
          prop="priority"
          label="优先级"
          min-width="20%"
        />
        <el-table-column
          prop="filterType"
          label="规则动作"
          min-width="20%"
        />
        <el-table-column
          label="操作"
          min-width="20%"
        >
          <template>
            <el-button
              type="text"
              class="operation-btn-text"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              class="operation-btn-text"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <h4 class="rules-title-sub clear">
        DNS规则
        <el-button class="common-btn rt">
          添加DNS规则
        </el-button>
      </h4>
      <el-table
        class="common-table"
        :data="dnsListData"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{textAlign: 'center'}"
      >
        <el-table-column
          prop="dnsRuleId"
          label="DNS规则标识"
          min-width="20%"
        />
        <el-table-column
          prop="domainName"
          label="FQDN域名"
          min-width="20%"
        />
        <el-table-column
          prop="ipAddressType"
          label="IP地址类型"
          min-width="20%"
        />
        <el-table-column
          prop="ttl"
          label="TTL"
          min-width="20%"
        />
        <el-table-column
          label="操作"
          min-width="20%"
        >
          <template>
            <el-button
              type="text"
              class="operation-btn-text"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              class="operation-btn-text"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="btn-container">
        <el-button class="common-btn">
          取消
        </el-button>
        <el-button class="common-btn">
          确认
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      trafficListData: [
        {
          action: 'PASSTHROUGH',
          filterType: 'FLOW',
          priority: '1',
          trafficRuleId: 'tr1'
        }
      ],
      dnsListData: [
        {
          dnsRuleId: 'dd1',
          domainName: 'domainName',
          ipAddressType: 'IP_V4',
          ttl: '85000'
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less">
.application-rules{
  padding: 0 20%;
  .rules-config{
    background: url('../../../../assets/images/div-bg.png');
    margin-top: 110px;
    padding: 55px 120px;
    border: 1px solid #8f80d9;
    border-radius: 16px;
    box-shadow: 60px 70px 75px rgba(36,20,119,.25);
    .rules-title{
      font-weight: normal;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .rules-title:before{
      display: inline-block;
      content: '';
      width: 9px;
      height: 9px;
      background: #5944C0;
      border-radius: 50%;
      position: relative;
      top: -2px;
    }
    .rules-title-sub{
      font-weight: normal;
      font-family: defaultFontLight, Arial, Helvetica, sans-serif;
      padding-left: 15px;
      margin: 10px 0 25px;
    }
    .el-table{
      width: calc(100% - 35px);
      margin-left: 35px;
    }
  }
}
@media screen and (max-width:1600px){
  .application-rules{
    padding: 0 10%;
  }
}
</style>
