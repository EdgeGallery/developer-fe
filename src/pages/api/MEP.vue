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
      <el-breadcrumb-item :to="{ path: '/mecDeveloper/api/docs' }">
        API
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('nav.mepApi') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mep-main">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item,index) in openMepName"
          :key="index"
          :label="item"
          :name="item"
          lazy
        />
      </el-tabs>
      <tableList
        :tab-label="activeName"
        ref="tablist"
      />
    </div>
  </div>
</template>

<script>
import { Get } from '../../tools/tool.js'
import tableList from './TableList.vue'
export default {
  name: 'Mepapi',
  components: {
    tableList
  },
  data () {
    return {
      activeName: '',
      openMepName: [],
      openMep: []
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/api/detail') === -1) {
      sessionStorage.removeItem('currentPage')
      sessionStorage.removeItem('activeNameApi')
    }
    next()
  },
  methods: {
    handleClick (tab) {
      sessionStorage.setItem('activeNameApi', tab.name)
      sessionStorage.setItem('currentPage', 1)
    },
    getOpenMepName () {
      Get('mec/developer/v1/capability-groups/openmep-api').then(res => {
        this.openMep = res.data.openMeps
        this.openMep.forEach(item => {
          this.openMepName.push(item.name)
        })
        this.openMepName = [...new Set(this.openMepName)]
        this.activeName = this.openMepName[0]
      })
    }
  },
  mounted () {
    this.getOpenMepName()
  },
  created () {
    let tabSelect = sessionStorage.getItem('activeNameApi')
    tabSelect = tabSelect || this.activeName
    this.activeName = this.activeName === tabSelect ? this.activeName : tabSelect
  }
}
</script>

<style lang="less">
.mepapi{
  .mep-main{
    background-color: #fff;
    padding: 40px;
    .el-tabs__item.is-active{
      color: #6c92fa;
    }
    .el-tabs__item:hover{
      color: #6c92fa;
    }
    .el-tabs__active-bar{
      background-color: #6c92fa;
    }
    .tablelist{
      .el-table thead{
        th,tr{
          background-color:#f0f3fa;
          padding: 6px 0;
        }
      }
      .el-table{
        .el-button--text{
          color: #6c92fa;
        }
      }
    }
    .tablelist:after{
      content: '';
      display: block;
      clear: both;
    }
  }
  .el-tab-pane{
    padding-top: 20px;
  }
}

</style>
