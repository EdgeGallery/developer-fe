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
  <div class="workspace padding_default">
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
          >
            <div class="img-box clear">
              <div @click="addNewProject('CREATE_NEW')">
                <img
                  src="../../assets/images/kaifa.png"
                  alt=""
                >
                <p>{{ $t('workspace.appDevelopment') }}</p>
              </div>
              <div @click="addNewProject('INTEGRATED')">
                <img
                  src="../../assets/images/jicheng.png"
                  alt=""
                >
                <p>{{ $t('workspace.appIntegration') }}</p>
              </div>
            </div>
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
            :new-project-titleprop="newProjectTitleprop"
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
import locale from '../../locales/i18n.js'

export default {
  name: 'Workspace',
  components: {
    projectList,
    newProject
  },
  data () {
    return {
      getprojectTypeprop: 'CREATE_NEW',
      activeProjectprop: 3,
      newprojectDialog: false,
      newProjectFourthprop: true,
      chartData: {
        columns: ['Status', 'Number'],
        rows: [
          { 'Status': locale.t('workspace.projectStatusEnum.createNew'), 'Number': 0 },
          { 'Status': locale.t('workspace.projectStatusEnum.testing'), 'Number': 0 },
          { 'Status': locale.t('workspace.projectStatusEnum.tested'), 'Number': 0 },
          { 'Status': locale.t('workspace.projectStatusEnum.released'), 'Number': 0 }
        ]
      },
      chartSettings: {
        radius: 70,
        bottom: 10,
        offsetY: 140,
        label: {
          formatter: '{b} : {c}' + '({d}%)',
          lineHeight: 18,
          show: true,
          fontSize: 16
        }
      },
      chartExtend: {
        color: ['#5ab1ef', '#ffb980', '#19d4ae', '#f37f7f', '#67c23a']
      },
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName')
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.checkProjectStatus()
    }
  },
  mounted () {
    if (this.$route.params.from === 'Development') {
      this.newprojectDialog = true
      this.addNewProject('CREATE_NEW')
    } else if (this.$route.params.from === 'Integrate') {
      this.newprojectDialog = true
      this.addNewProject('INTEGRATED')
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
    // Create a new project
    addNewProject (projectType) {
      if (this.userName === 'guest') {
        this.$message.error(this.$t('promptMessage.guestPrompt'))
      } else {
        this.newprojectDialog = true
        if (projectType === 'CREATE_NEW') {
          this.newProjectTitleprop = this.$t('workspace.createProject')
        } else {
          this.newProjectTitleprop = this.$t('workspace.migrationProject')
        }

        this.newProjectFourthprop = true
        this.getprojectTypeprop = projectType
        this.activeProjectprop = 3
      }
    },
    // Close diglog
    closeDialog (data) {
      this.$refs.projectList.getProjectListData()
    },
    // Get project list
    getProjectListData () {
      Workspace.getProjectListApi(this.userId).then(res => {
        let dataTotal = res.data
        let createNew = 0
        let testingNum = 0
        let releasedNum = 0
        let testedNum = 0
        for (let item of dataTotal) {
          if (item.status === 'ONLINE') {
            createNew++
            this.chartData.rows[0].Number = createNew
          } else if (item.status === 'DEPLOYING' || item.status === 'DEPLOYED' || item.status === 'DEPLOYED_FAILED') {
            testingNum++
            this.chartData.rows[1].Number = testingNum
          } else if (item.status === 'TESTED') {
            testedNum++
            this.chartData.rows[2].Number = testedNum
          } else if (item.status === 'RELEASED') {
            releasedNum++
            this.chartData.rows[3].Number = releasedNum
          }
        }
      })
    },
    checkProjectStatus () {
      this.chartData.rows[0].Status = this.$t('workspace.projectStatusEnum.createNew')
      this.chartData.rows[1].Status = this.$t('workspace.projectStatusEnum.testing')
      this.chartData.rows[2].Status = this.$t('workspace.projectStatusEnum.tested')
      this.chartData.rows[3].Status = this.$t('workspace.projectStatusEnum.released')
    }
  }
}
</script>

<style lang="less">
.workspace{
  .workcon{
    min-height: 743px;
    overflow: hidden;
    .graybg{
      background-color: white;
      border-radius: 8px;
      padding: 32px;
      margin-bottom: 16px;
      .project-add{
        .img-box{
          width: 100%;
          margin: 0 auto;
          border-radius: 16px;
          box-sizing: border-box;
          div{
            float: left;
            width: 50%;
            padding: 20px;
            img{
              width: 100%;
              max-width: 150px;
              margin-bottom: 20px;
            }
            p{
              margin-top: 0;
              font-size: 16px;
            }
          }
          div:hover{
            box-shadow:0 1px 5px 0 rgba(0,0,0,0.2);
            p{
              color: #63b6f7;
            }
          }
        }
        text-align:center;
        padding: 35px 0 0;
        cursor: pointer;
        p{
          font-size: 20px;
          color: black;
          margin-top: 20px;
        }
      }
      @media screen and (max-width: 1050px){
        .project-add{
          padding: 10px 0 0;
          .img-box{
            div{
              width: 80%;
              margin: 0 10%;
              padding:10px;
              max-width: 105px;
              img{
                width: 80%;
                margin: 0 10%;
              }
            }
          }

        }
      }
      @media screen and (max-width: 1380px){
        .project-add{
          padding: 40px 0 0;
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
      min-height: 500px;
      background-color: white;
    }
    .el-col-8{
      height: 100%;
    }
    .add-project{
      height: 45%;
      overflow: hidden;
    }
    .project-status{
      height: 55%;
      overflow: hidden;
    }
  }
}
</style>
