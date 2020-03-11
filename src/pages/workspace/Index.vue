<template>
  <div class="workspace">
    <el-breadcrumb separator="/" class="bread-crumb">
      <el-breadcrumb-item :to="{ path: '/mecDeveloper' }">{{$t('breadCrumb.mecDeveloper')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('breadCrumb.workspace')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="32" class="workcon">
      <el-col :span="16">
        <div class="graybg">
          <div class="title">
            {{$t('workspace.myProjectList')}}
            <el-input id="inputProjectName" suffix-icon="el-icon-search"></el-input>
          </div>
          <div class="list">
            <projectList ref="projectList"></projectList>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="graybg add-project">
          <div class="title">{{$t('workspace.addNewProject')}}</div>
          <div id="project-add" class="project-add" @click="dialogVisible=true">
            <div class="img-box">
              <img src="../../assets/images/workAdd.png" alt="">
            </div>
            <p>{{$t('workspace.clickHereToAddNewProject')}}</p>
          </div>
          <el-dialog
            :title="$t('workspace.addNewProject')"
            :visible.sync="dialogVisible"
            width="50%">
            <el-row :gutter="20">
              <el-col :span="12">
                <div id="addNewProject" class="project-add add" @click="addNewProject">
                  <img src="../../assets/images/newProject_create.svg" alt="">
                  <p>{{$t('workspace.createProject')}}</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div id="migrationProject" class="project-add add" @click="migrationProject">
                  <img src="../../assets/images/newProject_migration.svg" alt="">
                  <p>{{$t('workspace.migrationProject')}}</p>
                </div>
              </el-col>
            </el-row>
          </el-dialog>
        </div>
        <div class="graybg project-status">
          <div class="title">{{$t('workspace.projectStatus')}}</div>
          <div class="work-tab">
            <ve-pie :data="chartData" :settings="chartSettings" :extend='chartExtend' height="260px"></ve-pie>
          </div>
        </div>
        <div v-if="newprojectDialog">
          <newProject
            v-model="newprojectDialog"
            :fourthstepTitleprop="fourthstepTitleprop"
            :newProjectFourthprop="newProjectFourthprop"
            v-on:closeFatherDialog="closeDialog"
            :getprojectTypeprop="getprojectTypeprop">
          </newProject>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Get } from '../../tools/tool.js'
import projectList from './ProjectList.vue'
import newProject from './NewProject.vue'

export default {
  name: 'workspace',
  components: {
    projectList,
    newProject
  },
  data () {
    return {
      getprojectTypeprop: '',
      newprojectDialog: false,
      fourthstepTitleprop: '',
      newProjectFourthprop: true,
      chartData: {
        columns: ['Status', 'Number'],
        rows: [
          { 'Status': 'ONLINE', 'Number': 2 },
          { 'Status': 'DEPLOYING', 'Number': 4 },
          { 'Status': 'DEPLOYED', 'Number': 6 },
          { 'Status': 'DEPLOYFAILED', 'Number': 0 },
          { 'Status': 'TESTED', 'Number': 5 }
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
      dialogVisible: false
    }
  },
  mounted () {
    if (this.$route.params.from === 'index') this.dialogVisible = true
    this.getProjectListData()
    // console.log(this.chartData)
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/work/detail') === -1) {
      sessionStorage.removeItem('currentPage')
    }
    next()
  },
  methods: {
    addNewProject () {
      this.newprojectDialog = true
      this.fourthstepTitleprop = this.$t('workspace.projectLink')
      this.newProjectFourthprop = true
      this.getprojectTypeprop = 'CREATE_NEW'
    },
    migrationProject () {
      this.newprojectDialog = true
      this.fourthstepTitleprop = this.$t('workspace.toolChain')
      this.newProjectFourthprop = false
      this.getprojectTypeprop = 'MIGRATE'
    },
    closeDialog (data) {
      this.dialogVisible = data
      this.$refs.projectList.getProjectListData()
    },
    getProjectListData () {
      Get('mec/developer/v1/projects').then(res => {
        // console.log(res.data)
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
          } else if (dataTotal[i].status === 'DEPLOYFAILED') {
            deployfailedNum++
            this.chartData.rows[3].Number = deployfailedNum
          } else if (dataTotal[i].status === 'TESTED') {
            testedNum++
            this.chartData.rows[4].Number = testedNum
          }
        }
        // console.log(this.chartData)
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
      .title{
        font-size: 20px;
        color: #282B33;
        position: relative;
        line-height: 24px;
        .el-input{
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
        }
        .el-input__inner{
          height: 30px;
        }
        .el-input__icon{
          line-height: 30px;
        }
      }
      .list{
        margin-top: 20px;
      }
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
      overflow: auto;
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
