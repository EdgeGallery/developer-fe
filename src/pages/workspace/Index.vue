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
  <div class="workspace">
    <el-breadcrumb
      separator="/"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">
        {{ $t('breadCrumb.mecDeveloper') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('breadCrumb.workspace') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row
      :gutter="32"
      class="workcon"
    >
      <el-col :span="16">
        <div class="graybg">
          <div class="list">
            <projectList ref="projectList" />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="graybg add-project">
          <div class="title">
            {{ $t('workspace.addNewProject') }}
          </div>
          <div
            id="project-add"
            class="project-add"
            @click="addNewProject"
          >
            <div class="img-box">
              <img
                src="../../assets/images/workAdd.png"
                alt=""
              >
            </div>
            <p>{{ $t('workspace.clickHereToAddNewProject') }}</p>
          </div>
        </div>
        <div class="graybg project-status">
          <div class="title">
            {{ $t('workspace.projectStatus') }}
          </div>
          <div class="work-tab">
            <ve-pie
              :data="chartData"
              :settings="chartSettings"
              :extend="chartExtend"
              height="260px"
            />
          </div>
        </div>
        <div v-if="newprojectDialog">
          <newProject
            v-model="newprojectDialog"
            :fourthstep-titleprop="fourthstepTitleprop"
            :new-project-fourthprop="newProjectFourthprop"
            @closeFatherDialog="closeDialog"
            :getproject-typeprop="getprojectTypeprop"
            :active-projectprop="activeProjectprop"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Workspace } from '../../tools/api.js'
import projectList from './ProjectList.vue'
import newProject from './NewProject.vue'

export default {
  name: 'Workspace',
  components: {
    projectList,
    newProject
  },
  data () {
    return {
      getprojectTypeprop: '',
      activeProjectprop: 3,
      newprojectDialog: false,
      fourthstepTitleprop: '',
      newProjectFourthprop: true,
      chartData: {
        columns: ['Status', 'Number'],
        rows: [
          { 'Status': 'ONLINE', 'Number': 0 },
          { 'Status': 'DEPLOYING', 'Number': 0 },
          { 'Status': 'DEPLOYED', 'Number': 0 },
          { 'Status': 'DEPLOYED_FAILED', 'Number': 0 },
          { 'Status': 'TESTED', 'Number': 0 }
        ]
      },
      chartSettings: {
        radius: 70,
        offsetY: 140,
        label: {
          formatter: '{b} : {c}' + '\n\r' + '({d}%)',
          lineHeight: 18
        }
      },
      chartExtend: {
        color: ['#5ab1ef', '#ffb980', '#19d4ae', '#f37f7f', '#67c23a']
      },
      userId: sessionStorage.getItem('userId')
    }
  },
  mounted () {
    if (this.$route.params.from === 'index') {
      this.newprojectDialog = true
    }
    this.getProjectListData()
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/work/detail') === -1) {
      sessionStorage.removeItem('currentPage')
    }
    next()
  },
  methods: {
    // 新建项目
    addNewProject () {
      this.newprojectDialog = true
      this.fourthstepTitleprop = this.$t('workspace.projectLink')
      this.newProjectFourthprop = true
      this.getprojectTypeprop = 'CREATE_NEW'
      this.activeProjectprop = 3
    },
    // 关闭弹框
    closeDialog (data) {
      this.$refs.projectList.getProjectListData()
    },
    // 获取项目列表
    getProjectListData () {
      Workspace.getProjectListApi(this.userId).then(res => {
        let dataTotal = res.data
        let onlineNum = 0
        let deployingNum = 0
        let deployedNum = 0
        let deployfailedNum = 0
        let testedNum = 0
        for (let i = 0; i < dataTotal.length; i++) {
          if (dataTotal[i].status === 'ONLINE') {
            onlineNum++
            this.chartData.rows[0].Number = onlineNum
          } else if (dataTotal[i].status === 'DEPLOYING') {
            deployingNum++
            this.chartData.rows[1].Number = deployingNum
          } else if (dataTotal[i].status === 'DEPLOYED') {
            deployedNum++
            this.chartData.rows[2].Number = deployedNum
          } else if (dataTotal[i].status === 'DEPLOYED_FAILED') {
            deployfailedNum++
            this.chartData.rows[3].Number = deployfailedNum
          } else if (dataTotal[i].status === 'TESTED') {
            testedNum++
            this.chartData.rows[4].Number = testedNum
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.workspace{
  .workcon{
    height: 800px;
    overflow: hidden;
    .graybg{
      background-color: white;
      border-radius: 8px;
      padding: 32px;
      margin-bottom: 16px;
      .project-add{
        .img-box{
          height: 128px;
          width: 128px;
          margin: 0 auto;
          background: rgba(216,216,216,0.30);
          border: 2px dashed #D4D9E6;
          border-radius: 16px;
          padding-top: 24px;
          box-sizing: border-box;
        }
        text-align:center;
        padding: 50px 0;
        cursor: pointer;
        p{
          font-size: 20px;
          color: black;
          margin-top: 20px;
        }
      }
      .add{
        background-color: rgba(245, 245, 245, 0.5);
        padding:50px 20px;
        img{
          width: 30%;
          max-width: 90px;
        }
      }
      .work-tab{
        padding: 30px 0;
        .el-tabs__content img{
          width: 100%;
        }
      }
      .el-dialog{
        .el-dialog__body{
          padding: 40px 30px;
          padding-top: 40px!important
        }
        p{
          font-size: 20px;
          margin-top: 10px;
        }
      }
    }
    .el-col-16{
      height: 100%;
      overflow-y: auto;
      background-color: white;
    }
    .add-project{
      height: 300px;
      overflow: hidden;
    }
    .project-status{
      height: 400px;
      overflow: hidden;
    }
  }
}
</style>
