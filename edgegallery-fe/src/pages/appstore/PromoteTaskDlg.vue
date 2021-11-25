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
  <div class="promTask">
    <el-dialog
      :title="$t('apppromotion.pushResult')"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div
        class="app-prom"
      >
        <el-table
          :data="appData"
          style="width: 100%"
          class="common-table"
        >
          <el-table-column
            prop="name"
            :label="$t('apppromotion.appName')"
          />
          <el-table-column
            v-for="item in promStoreList"
            :key="item.number"
            :label="item.label"
            :prop="item.label"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row[scope.column.property] === 'false'"
                class="push-fail"
                title="false"
              >{{ $t('appstoreSystem.error') }}</span>
              <span
                v-else-if="scope.row[scope.column.property] === 'true' "
                class="push-success"
                title="succeed"
              >{{ $t('appstoreSystem.success') }}</span>
              <span
                v-else-if="scope.row[scope.column.property] === 'start'"
                class="push-prepare"
                title="start"
              >{{ $t('apppromotion.prepare') }}</span>
              <span
                v-else-if="scope.row[scope.column.property] === 'inProgress'"
                class="push-loading"
                title="inProgress"
              >{{ $t('apppromotion.pushing') }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="common-btn"
          @click="handleCloseDirect"
        >关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { appstoreApi } from '../../api/appstoreApi.js'
export default {
  name: 'PromoteTaskDlg',
  props: {
    promStoreList: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: true,
      appData: [
        {
          name: 'test'
        }
      ],
      packageIds: [],
      selectData: [],
      language: localStorage.getItem('language')
    }
  },
  methods: {
    getTableData () {
      let tempData = JSON.parse(sessionStorage.getItem('appstordetail'))
      if (tempData instanceof Array) {
        this.selectData = tempData
      } else {
        this.selectData.push(tempData)
      }
      this.selectData.forEach(selectItem => {
        this.promStoreList.forEach(platformItem => {
          // Assign 'start' value to all attribute
          let attr = platformItem.label
          selectItem[attr] = 'start'
        })
      })
      this.appData = this.selectData
    },
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    handleCloseDirect () {
      this.dialogVisible = false
      this.$emit('input', false)
    },
    handleExecute () {
      this.promTask()
    },
    changeToProcess () {
      for (let i = 0; i < this.appData.length; i++) {
        for (let j = 0; j < this.promStoreList.length; j++) {
          this.appData[i][this.promStoreList[j].label] = 'inProgress'
        }
      }
      let tempTableData = JSON.parse(JSON.stringify(this.appData))
      this.appData = []
      for (let arr of tempTableData) {
        this.appData.push(arr)
      }
    },
    updateResult () {
      let tempRes = JSON.parse(JSON.stringify(this.appData))
      this.appData = []
      for (let tempArr of tempRes) {
        this.appData.push(tempArr)
      }
      this.$emit('refreshAppPromInfo', true)
    },
    fillResultData (index, result) {
      let reData = result.join(',').split(',')
      for (let j = 0; j < reData.length; j++) {
        this.appData[index][this.promStoreList[j].label] = reData[j]
      }
    },
    promTask () {
      let target = []
      this.promStoreList.forEach(item => {
        target.push(item.value)
      })
      let param = {
        targetPlatform: target
      }
      this.changeToProcess()
      let tempData = this.appData
      let _timer = setTimeout(() => {
        let flagNumber = 0
        for (let i = 0; i < tempData.length; i++) {
          appstoreApi.promTask(tempData[i].packageId, param).then((res) => {
            if (res.data) {
              this.fillResultData(i, res.data)
            }
            flagNumber++
            if (flagNumber === tempData.length) {
              this.updateResult()
            }
          }).catch(() => {
          })
        }
        clearTimeout(_timer)
      }, 2000)
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
    },
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="less">
.promTask {
  .el-dialog__wrapper{
    top: 10%;
  }
  .el-dialog{
    border-radius: 16px;
    background: rgba(46,20,124,.7);
    backdrop-filter: blur(6px);
  }
  .el-dialog__header{
    border-radius: 16px 16px 0 0 !important;
    background-color: transparent !important;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__title::before{
    content: '';
    display:inline-block;
    width:9px;
    height:9px;
    border-radius: 50%;
    margin-right: 11px;
    background-color: #76E1E9;
  }
  .app-prom {
    overflow:auto;
    .el-icon-close:before{
      font-size: 25px;
      color: #d8363e;
    }
    .el-table th > .cell {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
    }
    .push-success,.push-prepare,.push-fail,.push-loading{
      padding-left: 30px;
    }
    .push-success::before{
      content: '';
      display:inline-block;
      width:20px;
      height:20px;
      background-image: url('../../assets/images/appstore/push_suc.png');
      background-size: cover;
      position: absolute;
      top: 15px;
      left: 10px;
    }
    .push-fail::before{
      content: '';
      display:inline-block;
      width:20px;
      height:20px;
      background-image: url('../../assets/images/appstore/push_fail.png');
      background-size: cover;
      position: absolute;
      top: 15px;
      left: 10px;
    }
    .push-prepare::before{
      content: '';
      display:inline-block;
      width:20px;
      height:20px;
      background-image: url('../../assets/images/appstore/push_pre.png');
      background-size: cover;
      position: absolute;
      top: 15px;
      left: 10px;
    }
    .push-loading::before{
      content: '';
      display:inline-block;
      width:20px;
      height:20px;
      background-image: url('../../assets/images/appstore/push_loading.png');
      background-size: cover;
      position: absolute;
      top: 15px;
      left: 10px;
      animation: rotate 2s infinite linear ;
    }
    @keyframes rotate {
      from {
          transform: rotate(0deg);
      }
      to {
          transform: rotate(360deg);
      }
    }
  }

  .el-dialog__footer {
    text-align: center;
  }
  .el-icon-loading {
    color: #607B36;
    font-size: 25px;
  }
  .el-icon-check {
    color: #40BF90;
    font-size: 25px;
  }
  .el-icon-finished{
    font-size: 25px;
    color: darkgrey;
  }
  .execute_style {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
}
</style>
