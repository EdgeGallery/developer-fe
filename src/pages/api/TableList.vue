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
  <div class="tablelist clear">
    <el-table
      v-loading="dataLoading"
      :data="currentData"
      style="width: 100%"
    >
      <el-table-column
        prop="service"
        :label="$t('api.name')"
        width="260"
      />
      <el-table-column
        prop="description"
        :label="$t('api.description')"
      />
      <el-table-column
        label=""
        width="160"
      >
        <template slot-scope="scope">
          <el-button
            id="detailBtn"
            type="text"
            class="btn"
            @click="toDetail(scope.row)"
          >
            {{ $t('api.apiDetail') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagebar">
      <pagination
        :table-data="listData"
        @getCurrentPageData="getCurrentPageData"
      />
    </div>
  </div>
</template>

<script>
import { Capability, Type } from '../../tools/project_data.js'
import { Get } from './../../tools/tool.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  name: 'Tablelist',
  props: {
    tabLabel: {
      type: String,
      default: ''
    }
  },
  components: { pagination },
  data () {
    return {
      listData: [],
      dataLoading: true,
      currentData: [],
      openMeps: [],
      routerPath: this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1),
      labelTemp: this.tabLabel
    }
  },
  watch: {
    tabLabel (newVal) {
      this.labelTemp = newVal
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
    sessionStorage.setItem('routerPath', this.routerPath)
  },
  created () {
  },
  methods: {
    getCurrentPageData (val) {
      this.currentData = val
    },
    toDetail (item) {
      let mecDetailID = item.apiFileId
      sessionStorage.setItem('mecDetailID', mecDetailID)
      this.$router.push({
        name: 'apidetail'
      })
    },
    getListData () {
      if (this.routerPath === 'mep') {
        Get('mec/developer/v1/capability-groups/openmep-api').then(res => {
          this.openMeps = res.data.openMeps
          this.listData = []
          this.checkProjectData()
          this.openMeps.forEach(item => {
            if (item.name === this.labelTemp) {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        }).catch(err => {
          console.log(err)
          setTimeout(() => {
            this.dataLoading = false
          }, 2000)
        })
      } else if (this.routerPath === 'mep-eco') {
        Get('mec/developer/v1/capability-groups/openmepeco-api').then(res => {
          this.openMeps = res.data.openMepEcos
          this.listData = []
          this.checkProjectData()
          this.openMeps.forEach(item => {
            if (item.name === this.labelTemp) {
              this.listData.push(item)
            }
          })
          this.dataLoading = false
        }).catch(err => {
          console.log(err)
          setTimeout(() => {
            this.dataLoading = false
          }, 2000)
        })
      }
    },
    checkProjectData () {
      Capability.forEach(itemFe => {
        if (this.labelTemp === itemFe.label[0]) {
          this.labelTemp = itemFe.label[1]
        }
      })
      Type.forEach(itemFe => {
        if (this.labelTemp === itemFe.label[0]) {
          this.labelTemp = itemFe.label[1]
        }
      })
    }
  }
}
</script>
